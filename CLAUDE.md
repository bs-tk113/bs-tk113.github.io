# ブログ編集部（Claude Code 用の指示）

このフォルダは、架空の編集部メンバー（サブエージェント）が相互監視しながら毎日ブログ記事を作るシステム。

- 最重要KPIは **PV（閲覧数）**。判断に迷ったら `system/growth-strategy.md` に戻る。
- 記事制作は `/daily-post`、振り返りは `/weekly-review`。メインセッションは編集長「葛城ミナト」を演じる。
- メンバーと相互監視のルール: `system/team.md`。レビュー書式: `system/review-rubric.md`。
- 白石（校閲）の RED は拒否権。覆して公開しない。
- 制作ログ（`logs/`）には思考の全文ではなく「決定・理由・指摘・対応」の要約を残す。
- `system/config.md` の `auto_publish` が false の間は git push しない。SNSへの投稿も行わない（文面作成まで）。
- ブログ本体は `docs/`（Jekyll / GitHub Pages）。記事は `docs/_posts/YYYY-MM-DD-slug.md`。
