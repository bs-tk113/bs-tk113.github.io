# 変更をまとめて commit して GitHub に push する（GitHub Pages が自動で作り直す）。
# 使い方: powershell -NoProfile -ExecutionPolicy Bypass -File scripts\publish.ps1 -Message "データ更新 2026-11-01"
# - git は GitHub Desktop に入っているものを使う（この PC には別の git が入っていないため）
# - 認証は Git Credential Manager に保存された GitHub のサインインを使う。保存されていなければ止まらずに失敗する（対話の入力は出さない）
# - system/config.md の auto_publish が true のときだけ push する
param([string]$Message = "")

$ErrorActionPreference = 'Continue'   # git が標準エラーに出す案内で止まらないように（成否は $LASTEXITCODE で見る）
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$cfg = Get-Content (Join-Path $root 'system\config.md') -Encoding UTF8 -Raw
if ($cfg -notmatch '(?m)^auto_publish:\s*true') { Write-Output 'SKIP: system/config.md の auto_publish が true ではないので push しません'; exit 0 }

$git = Get-ChildItem "$env:LOCALAPPDATA\GitHubDesktop" -Directory -Filter 'app-*' |
  Sort-Object { [version]($_.Name -replace '^app-','') } -Descending |
  ForEach-Object { Join-Path $_.FullName 'resources\app\git\cmd\git.exe' } |
  Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $git) { Write-Output 'ERROR: GitHub Desktop の git が見つかりません'; exit 1 }

$env:GCM_INTERACTIVE = 'never'
$env:GIT_TERMINAL_PROMPT = '0'

& $git add -A
$changes = & $git status --porcelain
if (-not $changes) { Write-Output 'NOCHANGE: 変更がないので push しません'; exit 0 }

if (-not $Message) { $Message = "サイト更新 $(Get-Date -Format 'yyyy-MM-dd HH:mm')" }
$msgFile = Join-Path $env:TEMP 'clutchnote-commit-msg.txt'
[IO.File]::WriteAllText($msgFile, "$Message`n`nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`n", (New-Object System.Text.UTF8Encoding($false)))
& $git commit -q -F $msgFile
if ($LASTEXITCODE -ne 0) { Write-Output 'ERROR: commit に失敗しました'; exit 1 }

# 先に GitHub 側の変更を取り込む（GitHub Desktop から別に push されていた場合に備える）
& $git pull --rebase -q origin main
if ($LASTEXITCODE -ne 0) { & $git rebase --abort; Write-Output 'ERROR: GitHub 側の変更と食い違いました。GitHub Desktop で確認してください（commit は手元に残っています）'; exit 1 }

& $git push -q origin main
if ($LASTEXITCODE -ne 0) { Write-Output 'ERROR: push に失敗しました（GitHub のサインインが保存されていない可能性。commit は手元に残っています）'; exit 1 }
Write-Output "PUSHED: $(& $git log -1 --format='%h %s')"
