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
※ 2026-10-30 に全30体・JPEG（`agents/<キー>-icon.jpg`）で置いた。いまの一覧は `_data/agents.yml`、取得記録は下の「出典台帳」。下の表は当初の計画として残す。
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

## 出典台帳（取得記録）
2026-10-30 編集長が取得（運営者の許可あり）。形式は WebP ではなく JPEG（この PC に WebP 変換の道具がないため。サイズ目安は満たしている）。
| ファイル | 元ページ | 元画像 | 加工 |
|---|---|---|---|
| agents/<12体>-icon.jpg | https://playvalorant.com/ja-jp/agents/ （各エージェントのカード画像 616x822） | cmsassets.rgpub.io の news/<id>-616x822.png | 308幅に縮小→顔まわりを正方形に切り抜き 96x96（2.6〜4.1KB） |
| agents/jett-portrait.jpg | https://playvalorant.com/ja-jp/agents/ （ジェットのカード画像） | news/d41286dc9017bf79c0b4d907b7a260c27b0adb69-616x822.png | JPEG 化のみ 616x822（47KB）。背景は透過ではなく濃色 |
| maps/<9枚>-banner.jpg | https://playvalorant.com/ja-jp/maps/ （各マップのギャラリー先頭の横長画像） | news/…-3840x2160.png ほか | 中央 60% を切り出し 640x360、透過部分は #14123a で塗る（22〜46KB） |
ロゴ・© 表記・透かしの写り込みは目視で確認し、無し。

2026-10-30 紅林アヤが取得（運営者の許可あり）。取得方法: 公式ページの HTML（__NEXT_DATA__）に載っている画像 URL を、同じ CDN の縮小パラメータ（rect=切り抜き, w, h, fm=jpg, q）付きで PowerShell の Invoke-WebRequest で取得。全ファイルを System.Drawing で開けること（96×96 / 640×360）を確認し、一覧画像で目視確認した。
| ファイル | 元ページ | 元画像（https://cmsassets.rgpub.io/sanity/images/dsfx7636/ 以下） | 加工 |
|---|---|---|---|
| agents/<30体>-icon.jpg（既存12体も切り抜きをやり直して上書き） | https://playvalorant.com/ja-jp/agents/ （一覧のカード画像。役割は各エージェントページの「役割」で確認） | news/…-616x822.png（24体）・news/…-587x900.png / .jpg・news_live/…-587x900.png（6体: ヴァイス・ヴィトー・ウェイレイ・テホ・ハッシュ・ミクス） | 顔まわりを正方形（幅の34%）で切り抜き → 96×96 JPEG q82（2.3〜3.7KB）。切り抜き位置の一覧は下 |
| maps/summit-banner.jpg | https://playvalorant.com/ja-jp/maps/ （SUMMIT のギャラリー先頭の横長画像） | news_live/97986033c47822dad7ac5b1af24fa183b8b04983-915x515.jpg | rect=183,78,549,309（右下の白い装飾ブロックを避ける）→ 640×360 JPEG q72（31KB） |
| maps/corrode-banner.jpg | 同（カロード） | news_live/6e3e66577519c8290d874aa94d82e28aec2ccc3e-915x515.jpg | 中央60% rect=183,103,549,309 → 640×360（41KB） |
| maps/abyss-banner.jpg | 同（アビス） | news_live/53698d442a14b5a6be643d53eb970ac16442cb38-930x522.png | rect=186,82,558,313 → 640×360（36KB） |
| maps/fracture-banner.jpg | 同（フラクチャー） | news/983a6d66978aabd3ccd4e51517298d9a0b5467d9-3840x2160.png | 中央60% rect=768,432,2304,1296 → 640×360（35KB） |

ロゴ（VALORANT・Riot・大会）・© 表記・透かしの写り込み: 無し（目視）。マップ画像内の看板・壁の文字（例: フラクチャーの「ALPHA SECTOR」）はゲーム内の背景で、ロゴではない。
使っていないもの: 一覧ページ上部の横長の見出し画像（5120×574）、関連記事のサムネイル（大会のキービジュアルを含むため）。

エージェントのアイコンの切り抜き位置（元画像の px。rect=左,上,幅,高さ）:
jett 167,56,209 ／ reyna 284,99,209 ／ raze 130,31,209 ／ phoenix 142,50,209 ／ yoru 185,80,209 ／ neon 222,50,209 ／ iso 185,13,209 ／ waylay 211,12,200 ／ hush 194,170,200 ／
sova 185,13,209 ／ breach 173,56,209 ／ skye 296,50,209 ／ kayo 173,19,209 ／ fade 130,50,209 ／ gekko 50,31,209 ／ tejo 152,76,200 ／
brimstone 167,31,209 ／ viper 99,37,209 ／ omen 222,50,209 ／ astra 259,68,209 ／ harbor 204,31,209 ／ clove 284,80,209 ／ miks 158,82,200 ／
sage 259,68,209 ／ cypher 204,13,209 ／ killjoy 185,50,209 ／ chamber 204,31,209 ／ deadlock 222,13,209 ／ vyse 147,70,200 ／ veto 100,47,200

### アイコン（自作）`icons/icons.svg`
ロール・カテゴリ・状態などの線画アイコン 32 種を1ファイルの SVG スプライトにまとめた（紅林 2026-10-30・自作。公式のロールアイコンや他サイトのアイコンの形は参照していない）。
使い方は `_includes/icon.html`（`{% include icon.html name="duelist" %}`）と `_includes/role-icon.html`（ロールのアイコン＋ロール名）。

## 画像を置かない部品
- サイトのマーク（ヘッダー左の角丸四角）は CSS だけで描いている（画像なし）。
- 記事ごとのアイキャッチは作らなくてよい（front matter の `thumb_map:` `thumb_agent:` で合成サムネになる）。専用の画像を使うときだけ `image:` に `assets/img/posts/` のパスを書く（1200×675px、100KB 以下）。
