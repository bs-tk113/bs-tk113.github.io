# 運用設定

編集長（`/daily-post`）は毎回最初にこのファイルを読む。

```yaml
blog_name: "観戦帖（KANSENCHO・かんせんちょう）"   # 2026-10-31 改名（旧「クラッチノート」は VALORANT の iPhone アプリ「Clutch Note」と名前がかぶるため。鳴海の推奨）
topic_status: decided          # undecided の間は /daily-post はテーマ決めから始める（2026-10-22 決定）
auto_publish: true             # true にすると記事作成・データ更新の後に scripts/publish.ps1 で commit & push まで行う（2026-10-31 運営者の依頼で true に）
target_length: 3000-5000       # 本文の文字数目安
posts_per_day: 1
max_revision_loops: 2
language: ja
```

## メモ
- トピックは `data/topics.md` で決める。
- 公開先の設定手順は `system/publishing-setup.md`。
