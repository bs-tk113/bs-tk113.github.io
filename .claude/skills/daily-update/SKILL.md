---
name: daily-update
description: クラッチノートの「いまの話題」・大会カレンダー・LFT ボード・移籍トラッカー・選手名鑑のデータを、毎日決まった時間に公式発表と X の投稿で確かめて更新する。X の出典が消えていないかの確認もここで行う。「データ更新」「/daily-update」やスケジュールタスクから使う。
---

# 毎日のデータ更新（編集長・葛城ミナトとして実行する）

運営者の依頼（2026-10-31）: 「X の確認を自分がしなくてもいいように、毎日決まった時間にページの情報を更新できるようにしてほしい」。
最初に `CLAUDE.md` と `data/topics.md`（特に「選手・配信者・非公式大会」の8ルール）を読む。返答・ログはすべて日本語。

## 守ること
- **公開（push）は手順6の `scripts/publish.ps1` だけで行う**。auto_publish が false ならスクリプトが自動で止まる。SNS への投稿はしない。
- 新しいページは作らない。`published:` を変えない。`docs/_layouts`・`docs/_includes`・`docs/assets` は触らない（触るのはデータとハブの front matter だけ）。
- 噂・リーク・「関係者によると」・まとめサイト・Liquipedia・vlr.gg・Sheep Esports などの報道は、手がかりにしてよいが**出典にしない・書かない**。
- SNS は要約＋リンク。スクショ・全文の転載・元の言い回しの言い換えはしない。鍵アカウント・リプライ欄・一般ユーザーの投稿は扱わない。
- 白石（shiraishi-checker）の RED が出た変更は入れない。
- 迷ったものは入れずに、ログの「運営者に確認したいこと」に書く。

## 道具
- **X の投稿は内蔵ブラウザ（mcp__Claude_Browser__*）で読める**（ログインなし）。`navigate` で投稿の URL を開き、`get_page_text` で本文と投稿日時を読む。2026-10-31 に確認済み。
  - 個別の投稿は読める。プロフィールのタイムラインは一部（人気の投稿）しか出ないので、**新着の発見には使わず手がかり程度**にする。
  - 開いたタブは最後に閉じる（タブ数の上限があるため）。
  - 削除・非公開の判定: ページに「このポストは存在しません」「このページは存在しません」「ポストは削除されました」「非公開」などが出たら、時間をおいてもう一度開いて確かめる。2回とも同じなら削除扱い。
- WebFetch / WebSearch: 公式サイトのニュース、VCT 公式（valorantesports.com・playvalorant.com）、チーム公式サイト。

## 手順

### 1. X の出典の生存確認（毎回・必須）
1. `docs/_data/` の中にある X の投稿 URL（`x.com/.../status/` と `twitter.com/.../status/`）をすべて Grep で集める（now.yml・boards/*.yml・players.yml・hubs/*.yml）。ハブの front matter（`docs/_hubs/*.md` の sources）にある URL も含める。
2. 1件ずつ内蔵ブラウザで開き、消えていないか、内容がデータと合っているか（誰の名前が載っているか、日付）を確かめる。
3. 消えていたら data/topics.md ルール4 に従う: その出典に `deleted: "YYYY-MM-DD"` を書く（now.yml・ボード）。チームの公式サイトなどほかの公式の裏付けがあれば、それを出典に足す。裏付けがない話題は、すべての出典が deleted になれば表示から自動で外れる。
4. 確認できたものは、その項目の `checked`（確認日時）を今日の日時に更新する。

### 2. 新しい公式発表を探す
次を見て、前回の更新（now.yml の `updated`）より後に出た発表を探す。
- VCT 公式: https://valorantesports.com/ja-JP/news （Pacific・日本・オープン予選・パートナー）
- チーム公式サイトのニュース: `docs/_data/teams.yml` の各チームの url（ZETA・CR・DFM・FENNEL・REJECT・NORTHEPTION・IGZIST・MURASH・SCARZ・VARREL・Sengoku）
- 大会の主催者: `docs/_data/matches.yml` に載っている大会の公式ページ
- WebSearch（手がかり）: 「VALORANT 加入 発表」「VALORANT 脱退 契約満了」「VALORANT LFT」「VCT 2027 オープン予選 日本」など、直近の日付で
- 手がかりから見つけた X の投稿は、**内蔵ブラウザで元の投稿を開いて本文を読んだものだけ**使う（本人・チーム・主催者の公式アカウントのみ）。

### 3. データを更新する
書き方は各ファイルの先頭のコメントに従う。
- `docs/_data/now.yml`: 新しい話題を追加（見出し・要約は自分の言葉で、事実だけ）。`updated` を今日の日時に。古い話題は消さない。
- `docs/_data/matches.yml`: 新しく決まった日程、終わった試合の結果（主催者・公式の発表だけ）。
- `docs/_data/boards/lft-board.yml`: 本人の LFT 告知を追加。加入・引退が公式に出たら status を変える（joined・retired は本人とチームの両方がそろうまで「確定」にしない＝テンプレートが自動で表示を分ける）。
- `docs/_data/boards/roster-2027.yml`: チームの公式発表の加入・退団など。
- `docs/_data/players.yml`: 所属・状態が変わった選手（チーム公式サイトの選手一覧も見て、追加・削除を反映）。
- 中身を変えたハブ（`docs/_hubs/*.md`）は `last_modified_at` を**今より前の時刻**（+0900）にし、history に1行足す。
- VCT 2027 のオープン予選（日本）の詳細が公式に出たら、`docs/_hubs/vct-2027.md` の該当箇所を直し、運営者への報告で一番上に書く（PV の勝負どころ）。
- 何も新しくなければ、確認日時の更新だけでよい。

### 4. 白石の確認
変更が1件でもあれば、`shiraishi-checker` に「今日の変更点の一覧（ファイル・追加した文面・出典 URL）」を渡して確認してもらう（system/review-rubric.md の書式）。
- 要修正 → 指定の文面に直す。RED → その変更を取り消す。
- X の投稿を出典にしたものは、白石が開けないことがあるので、「編集長が内蔵ブラウザで本文を確認した（日時）」と、読んだ本文の要点を添えて渡す。

### 5. ログと報告
- `logs/daily-update/YYYY-MM-DD.md` に、確認した X の数（うち削除）、追加・変更した項目、出典、白石の判定、見送ったもの、運営者に確認したいことを書く（思考の全文ではなく要約）。
### 6. 公開（自動 push）
- 白石の RED が残っていないことを確かめてから、PowerShell で次を実行する:
  `powershell -NoProfile -ExecutionPolicy Bypass -File scripts\publish.ps1 -Message "データ更新 YYYY-MM-DD"`
- 結果の1行目で判断する: `PUSHED` = 公開した／`NOCHANGE` = 変更なし／`SKIP` = auto_publish が false／`ERROR` = 失敗（内容を運営者への報告の一番上に書く）。
- `PUSHED` のときは2分ほど後に https://bs-tk113.github.io/ の更新したページを内蔵ブラウザで開き、表示されているか確かめる（GitHub Pages のビルドが失敗すると前の版のままになる）。

- 最後の出力（運営者が読む）は日本語で短く:
  - 公開の結果（PUSHED / NOCHANGE / ERROR と、ERROR ならやってほしいこと）
  - 追加・変更した話題の見出し
  - 削除を見つけた出典
  - 運営者に確認したいこと（あれば）
