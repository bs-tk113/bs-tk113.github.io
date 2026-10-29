# 画像の置き場所と一覧（docs/assets/img/）

作成: 水瀬カナデ 2026-10-28 ／ ルール: `drafts/2026-10-28-redesign/image-rules.md`（白石）

- このファイルはサイトには出ない（`_config.yml` の exclude に入れてある）。
- **外部への直リンク禁止。** 必ずここにコピーして置く。パスは `_data/agents.yml` `_data/maps.yml` に書いてあるので、**ファイル名をそのまま合わせれば表示される**（テンプレートの変更は不要）。
- ファイルがまだ無くても表示は崩れない（サムネはカテゴリ色のグラデーション、アイコンは頭文字の輪、ヒーローは自作の光のグラデーションだけになる）。
- 取得元は **playvalorant.com の公式ページに限る**。非公式 API（valorant-api.com）・他のファンサイト・攻略サイトの画像は使わない。
- **使わない**: VALORANT ロゴ・Riot の拳ロゴ・大会ロゴ・チームロゴ・選手写真。画像の中に写り込んでいる場合は切り抜いて外す。© 表記・透かしは消さない。
- 置いたら、出典台帳（どのファイルを、どの公式ページから、いつ取ったか）に1行ずつ残す。`_data/*.yml` の `source:` が記事の出典欄に出る。

## 形式と重さの目安
- 形式は WebP（アイコン・全身像は透過を残す）。
- 1ページの画像の合計は 400KB 以内。
- 縮小・WebP 化は自前で（例: squoosh.app などブラウザで完結するもの。元画像は残しておく）。

## 必要な画像

### 1. エージェントのアイコン（12枚）`agents/<キー>-icon.webp`
用途: カードのサムネ右下・人気ランキング・トップの「エージェント別 調整履歴」アイコン列（表示は 40〜84px）
推奨: **96×96px、8KB 以下、透過 WebP**（顔が中央に来るよう正方形に切り抜く）

| ファイル名 | エージェント | 取得元の候補ページ |
|---|---|---|
| agents/jett-icon.webp | ジェット | https://playvalorant.com/ja-jp/agents/jett/ |
| agents/reyna-icon.webp | レイナ | https://playvalorant.com/ja-jp/agents/reyna/ |
| agents/raze-icon.webp | レイズ | https://playvalorant.com/ja-jp/agents/raze/ |
| agents/neon-icon.webp | ネオン | https://playvalorant.com/ja-jp/agents/neon/ |
| agents/sova-icon.webp | ソーヴァ | https://playvalorant.com/ja-jp/agents/sova/ |
| agents/fade-icon.webp | フェイド | https://playvalorant.com/ja-jp/agents/fade/ |
| agents/omen-icon.webp | オーメン | https://playvalorant.com/ja-jp/agents/omen/ |
| agents/viper-icon.webp | ヴァイパー | https://playvalorant.com/ja-jp/agents/viper/ |
| agents/astra-icon.webp | アストラ | https://playvalorant.com/ja-jp/agents/astra/ |
| agents/killjoy-icon.webp | キルジョイ | https://playvalorant.com/ja-jp/agents/killjoy/ |
| agents/cypher-icon.webp | サイファー | https://playvalorant.com/ja-jp/agents/cypher/ |
| agents/sage-icon.webp | セージ | https://playvalorant.com/ja-jp/agents/sage/ |

エージェントを増やすときは `_data/agents.yml` に1件足して、同じ命名でファイルを置く。一覧ページ: https://playvalorant.com/ja-jp/agents/

### 2. ヒーローの全身像（1枚）`agents/<キー>-portrait.webp`
用途: トップページのヒーロー右側（`_data/hero.yml` の agent で指定したものだけ使う）
推奨: **幅 900px（高さは元の比率のまま。テンプレートは 900×817 で枠を取る）、80KB 以下、透過 WebP**

| ファイル名 | エージェント | 取得元の候補ページ |
|---|---|---|
| agents/jett-portrait.webp | ジェット | https://playvalorant.com/ja-jp/agents/jett/ |

ヒーローのエージェントを替えるなら、そのエージェントの `portrait:` を `_data/agents.yml` に足してファイルを置き、`hero.yml` の `agent:` を変える。

### 3. マップの帯画像（9枚）`maps/<キー>-banner.webp`
用途: 合成サムネの背景・カテゴリタイル・ヒーローのぼかし背景（16:9 に切り抜いて使う）
推奨: **640×360px、30KB 以下、WebP**（ロゴや文字が写っていない部分を切り抜く）

| ファイル名 | マップ | 主な使い道 | 取得元の候補ページ |
|---|---|---|---|
| maps/ascent-banner.webp | アセント | ヒーローの背景 | https://playvalorant.com/ja-jp/maps/ |
| maps/lotus-banner.webp | ロータス | 大会ハブの既定 | https://playvalorant.com/ja-jp/maps/ |
| maps/bind-banner.webp | バインド | ロスター・移籍の既定 | https://playvalorant.com/ja-jp/maps/ |
| maps/pearl-banner.webp | パール | パッチ履歴の既定 | https://playvalorant.com/ja-jp/maps/ |
| maps/icebox-banner.webp | アイスボックス | 週まとめの既定 | https://playvalorant.com/ja-jp/maps/ |
| maps/sunset-banner.webp | サンセット | ツールの既定 | https://playvalorant.com/ja-jp/maps/ |
| maps/haven-banner.webp | ヘイヴン | 用語・仕組み解説の既定 | https://playvalorant.com/ja-jp/maps/ |
| maps/breeze-banner.webp | ブリーズ | 記事ごとの指定用 | https://playvalorant.com/ja-jp/maps/ |
| maps/split-banner.webp | スプリット | 記事ごとの指定用 | https://playvalorant.com/ja-jp/maps/ |

マップの個別ページは公式サイトに無い（2026-10-28 確認。一覧ページのみ）。壁紙が必要なら https://playvalorant.com/ja-jp/media/ 、古い素材は https://playvalorant.com/ja-jp/news/game-updates/valorant-asset-kit/ （ロゴは使わない）。

### 4. SNS 用の共通 OG 画像（7枚・自作。まだテンプレートからは参照していない）`og/`
用途: X などで共有されたときの画像。静的サイトでは自動生成できないので自作する（白石の確認後に、記事の `image:` か `_config.yml` の defaults で指定する）
推奨: **1200×630px、100KB 以下、PNG か JPEG**（SNS が WebP を読まないことがあるため）

| ファイル名 | 用途 |
|---|---|
| og/default.png | トップ・固定ページ |
| og/tournaments.png | 大会ハブ |
| og/roster.png | ロスター・移籍 |
| og/patch.png | パッチ履歴 |
| og/weekly.png | 週まとめ |
| og/tools.png | ツール |
| og/glossary.png | 用語・仕組み解説 |

公式ロゴ・公式風の書体・赤＋斜めカット（公式の告知に見える加工）は使わない。公式の画像を合成するなら © Riot Games を入れる。

## 画像を置かない部品
- サイトのマーク（ヘッダー左の角丸四角）は CSS だけで描いている（画像なし）。
- 記事ごとのアイキャッチは作らなくてよい（front matter の `thumb_map:` `thumb_agent:` で合成サムネになる）。専用の画像を使うときだけ `image:` に `assets/img/posts/` のパスを書く（1200×675px、100KB 以下）。
