# ブログ編集部システム

架空の編集部メンバー8人が、互いの成果物を監視・補完しながら毎日1記事を作る仕組み。
目的は **PVを増やすこと**。広告（AdSense）は後から設定1行で付けられる。

## 使い方

| やりたいこと | Claude Code で |
|-------------|---------------|
| 今日の記事を作る | `/daily-post`（キーワード指定するなら `/daily-post 〇〇 やり方`） |
| 週次の振り返り・ルール改善 | `/weekly-review` |
| テーマを決める | `/daily-post`（`data/topics.md` が未定なら最初にテーマ案を出す） |

## フォルダ構成

```
.claude/agents/       メンバー7人（サブエージェント）の人物像・仕事・自己監査・監視対象
.claude/skills/       /daily-post（編集長の進行手順）, /weekly-review
system/               チーム表と相互監視マトリクス、フロー、レビュー書式、PV戦略、公開手順、設定
data/                 トピック、ネタ帳、アクセスデータ、学び（全員が読む共有知識）
drafts/               作業中の記事（キーワード→構成→本文→レビュー）
logs/                 記事ごとの制作ログ（決定と理由の要約。修正時はここを見る）
promo/                SNS投稿文
reports/              週次レポート
docs/                 ブログ本体（Jekyll / GitHub Pages）
```

## 編集部

| 名前 | 役割 |
|------|------|
| 葛城 ミナト | 編集長（進行・最終判断。灰島と白石に監視される） |
| 早瀬 ヒカリ | リサーチャー（キーワード選定） |
| 柚木 ハル | ライター（構成・本文） |
| 鳴海 レン | SEO（タイトル・見出し・内部リンク） |
| 白石 シズク | 校閲（事実・権利・広告ポリシー。拒否権あり） |
| 日向 ナナ | 読者代弁者（読みやすさ・満足度・クリック欲） |
| 朝倉 ツバサ | 拡散（SNS文面） |
| 灰島 ケイ | アナリスト（数字・学び・編集長の監査） |

詳細は [system/team.md](system/team.md)。

## 修正したいとき

- 誰かの振る舞いを変える → `.claude/agents/<その人>.md`
- 流れを変える → `.claude/skills/daily-post/SKILL.md` と `system/workflow.md`
- ある記事がなぜそうなったか → `logs/<日付>-<slug>.md`

## 公開の準備

[system/publishing-setup.md](system/publishing-setup.md) を参照（GitHub アカウント・Pages 設定・Search Console 登録）。
