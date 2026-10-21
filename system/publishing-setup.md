# 公開先のセットアップ（GitHub Pages + 後からAdSense）

## なぜ GitHub Pages か

| 候補 | 広告 | 費用 | 自動投稿 | 判定 |
|------|------|------|----------|------|
| **GitHub Pages（Jekyll）** | AdSense可（自由に貼れる） | 無料 | ファイルを置いてpushするだけ | **採用** |
| はてなブログ | 無料版は運営の広告が入る。自分の広告は Pro（有料）推奨 | 無料〜 | API あり | 次点 |
| note | 自分の広告は貼れない | 無料 | 公式APIなし | 不可 |
| WordPress（レンタルサーバー） | 自由 | 月500〜1000円 | API あり | PVが出てから移行も可 |

記事は Markdown で持っているので、将来はてなブログや WordPress に移すことも容易。

## 初回だけユーザーがやること

1. **GitHub アカウント作成**（自分で）
2. **Git をインストール**（Git for Windows）※自動pushしたい場合
3. GitHub で新しいリポジトリを作る（Public）。このフォルダの中身をそこへ push する
4. リポジトリの Settings → Pages → Source: `Deploy from a branch`、Branch: `main` / フォルダ: `/docs`
5. `docs/_config.yml` の `url` と `baseurl` を書き換える
   - `https://<ユーザー名>.github.io/<リポジトリ名>/` なら `url: "https://<ユーザー名>.github.io"`、`baseurl: "/<リポジトリ名>"`
   - 独自ドメイン推奨（AdSense審査・長期のSEOで有利）。その場合 `baseurl: ""`
6. **Google Search Console** にサイトを登録し、`sitemap.xml` を送信（検索流入の計測に必須）
7. （任意）Google Analytics 4 を作成し、`docs/_config.yml` の `ga4_id` に `G-XXXX` を入れる

## 広告を付けるとき

1. 記事が20〜30本程度たまり、PVが出始めたら AdSense に申請
2. 発行されたパブリッシャーID（`ca-pub-XXXXXXXXXXXXXXXX`）を `docs/_config.yml` の `adsense_client` に入れる
   - これだけで自動広告のスクリプトと `ads.txt` が出力される
3. 手動枠を使う場合は `adsense_slots` の各スロットIDを入れる（記事上・記事下）
4. `docs/privacy.md` の広告の節が実態と合っているか確認

## 自動公開を有効にするとき

`system/config.md` の `auto_publish: true` にすると、`/daily-post` が最後に `git add / commit / push` まで実行する。
最初の1〜2週間は `false` のまま、記事を目で確認してから公開することを推奨。
