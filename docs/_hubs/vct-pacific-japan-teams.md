---
# チームカードは _includes/team-cards.html（本文の中で include。データは下の team_cards と _data/players.yml）。
# 2026-10-30 初版（柚木）。白石の校閲（5r）を通してから編集長が published: false を外す。
published: true
date: 2026-10-30
title: VCT Pacific 日本のチーム一覧（2027）｜パートナー・2026年成績・所属選手
short_title: VCT Pacific 日本のチーム一覧
description: VCT 2027 の Pacific を目指す日本のチームを、パートナー入りを発表したチーム（ZETA・CR）、2026年に Pacific のリーグで戦ったチーム（DFM・VARREL）、国内 Challengers のチーム（REJECT・FENNEL など）に分けて一覧に。2026年の主な成績と所属選手を、公式の発表・結果ページで確かめてまとめます。
category: tournaments
tag: vct-2027
order: 15
thumb_map: lotus
thumb_agent: jett
last_modified_at: 2026-10-31 00:18:00 +0900
period: "2027年シーズン（2026年10月30日時点の情報）"
summary:
  - "2027年の VCT Pacific で、日本のチームでパートナーに入ったと発表しているのは ZETA DIVISION と Crazy Raccoon の2チームです（2026年10月30日確認）。"
  - "2026年に Pacific のリーグで戦った DFM はパートナーに選ばれなかったと発表し、2027年は日本予選から挑みます。VARREL の2027年の立場は、チームの公式発表がまだ見つかっていません。"
  - "国内の Challengers では、2026年の Season Finals で REJECT が準優勝、FENNEL と IGZIST が3位でした（優勝は QT DIG∞）。"
team_cards:
  - key: zeta
    group: partner
    status: "パートナー（Riot とのパートナー契約を再び結んだと発表）"
    status_src: {title: "ZETA DIVISION 公式（2026年10月19日）", url: "https://zetadivision.com/news/2026/10/19/47797"}
    results:
      - text: "VCT Pacific 2026 Kickoff 9-10位"
        src: {title: "ZETA DIVISION 公式の結果報告", url: "https://zetadivision.com/news/2026/02/15/41480"}
      - text: "VCT Pacific 2026 Stage 1 9-10位"
        src: {title: "ZETA DIVISION 公式の結果報告", url: "https://zetadivision.com/news/2026/05/17/44781"}
      - text: "VCT Pacific 2026 Stage 2 7-8位（Champions への出場はならず）"
        src: {title: "ZETA DIVISION 公式の結果報告", url: "https://zetadivision.com/news/2026/09/06/46999"}
  - key: cr
    group: partner
    status: "パートナー（VCT 2027 のパートナーに選ばれたと発表）"
    status_src: {title: "Crazy Raccoon 公式 X（2026年10月20日）", url: "https://x.com/crazyraccoon406/status/2112548170773520557"}
    note: "VALORANT 部門の選手・コーチは、10月30日時点でまだ発表されていません。"
  - key: dfm
    group: pacific2026
    status: "パートナーに選ばれず。部門は続けると発表"
    status_src: {title: "DFM VALORANT 公式 X（2026年10月19日）", url: "https://x.com/DFM_VALORANT/status/2112093915297784227"}
    results:
      - text: "VCT Pacific 2026 Stage 1 グループ（Omega）4位・2勝3敗"
        src: {title: "VCT 公式 Stage 1 順位表", url: "https://valorantesports.com/en-US/tournament/115577110529168808/stage/115577110529430953"}
      - text: "VCT Pacific 2026 Stage 2 プレイインで ZETA DIVISION に 2-0 で勝利"
        src: {title: "ZETA DIVISION 公式の結果報告", url: "https://zetadivision.com/news/2026/09/06/46999"}
    note: "10月29日、VCT 2027 に向けた選手・コーチ・アナリストの募集を公式サイトで開始。"
  - key: varrel
    group: pacific2026
    results:
      - text: "VCT Pacific 2026 に参戦（Ascension Pacific 2025 を勝った SLT のロスターが VARREL として出場）"
        src: {title: "VCT 公式（2025年12月12日）", url: "https://valorantesports.com/en-AU/news/slt-seongnam-to-compete-as-varrel-in-2026-article"}
      - text: "VCT Pacific 2026 Stage 1 グループ（Omega）6位・0勝5敗"
        src: {title: "VCT 公式 Stage 1 順位表", url: "https://valorantesports.com/en-US/tournament/115577110529168808/stage/115577110529430953"}
    note: "2027年にパートナーかどうかについて、10月30日時点でチームの公式発表は見つかっていません。"
  - key: reject
    group: challengers
    results:
      - text: "VCJ 2026 Split 2 Main Stage 1位通過（リーグ戦7戦全勝）"
        src: {title: "REJECT のプレスリリース（2026年6月29日）", url: "https://prtimes.jp/main/html/rd/p/000000577.000050979.html"}
      - text: "VCJ 2026 Season Finals 準優勝"
        src: {title: "VCJ 2026 実行委員会のプレスリリース（2026年8月4日）", url: "https://prtimes.jp/main/html/rd/p/000000028.000155470.html"}
  - key: fennel
    group: challengers
    results:
      - text: "VCJ 2026 Season Finals 3位（IGZIST と同順位）"
        src: {title: "VCJ 2026 実行委員会のプレスリリース（2026年8月4日）", url: "https://prtimes.jp/main/html/rd/p/000000028.000155470.html"}
  - key: igzist
    group: challengers
    results:
      - text: "VCJ 2026 Season Finals 3位（FENNEL と同順位）"
        src: {title: "VCJ 2026 実行委員会のプレスリリース（2026年8月4日）", url: "https://prtimes.jp/main/html/rd/p/000000028.000155470.html"}
    note: "10月26日、選手4人とコーチ・アナリスト3人の契約満了による退団を発表。"
  - key: murash
    group: challengers
    note: "7月27日、チーム再編のため VALORANT 部門の選手・コーチの募集を公式サイトで告知。"
sources:
  - title: "Introducing the VCT 2027 Partner Teams（VALORANT Esports 公式、2026年10月22日公開）"
    url: https://valorantesports.com/en-US/news/introducing-the-vct-2027-partner-teams
    note: "パートナーは各地域8チーム・2年ごとの更新（2026年10月30日確認）"
  - title: "VCT Pacific 2027 の形式（VALORANT Esports 公式・日本語、2026年10月28日公開）"
    url: https://valorantesports.com/ja-JP/news/vct-pacific-2027-primer
    note: "Kickoff は12チーム、Cups の日本枠は3（2026年10月30日確認）"
  - title: "The New VALORANT Champions Tour（VALORANT Esports 公式、2026年4月8日公開）"
    url: https://valorantesports.com/en-US/news/the-new-valorant-champions-tour
    note: "2026年までの昇格の仕組み（Ascension）と2027年の変更（2026年10月30日確認）"
  - title: "ZETA DIVISION 公式「Riot Gamesとのパートナーシップ再締結のお知らせ」（2026年10月19日）"
    url: https://zetadivision.com/news/2026/10/19/47797
    note: "2026年10月30日確認"
  - title: "ZETA DIVISION 公式 VCT Pacific 2026 の結果報告（Kickoff・Stage 1・Stage 2）"
    url: https://zetadivision.com/news/2026/09/06/46999
    note: "Kickoff https://zetadivision.com/news/2026/02/15/41480 、Stage 1 https://zetadivision.com/news/2026/05/17/44781 も確認（2026年10月30日確認）"
  - title: "Crazy Raccoon 公式 X の投稿（2026年10月20日）"
    url: https://x.com/crazyraccoon406/status/2112548170773520557
    note: "2026年10月30日確認（編集部）"
  - title: "DFM VALORANT 公式 X の投稿（2026年10月19日）"
    url: https://x.com/DFM_VALORANT/status/2112093915297784227
    note: "2026年10月30日確認（編集部）"
  - title: "DFM 公式ニュース「VCT 2027」に向けた選手・コーチ・アナリスト募集（2026年10月29日）"
    url: https://team-detonation.net/news/52622
    note: "2026年10月30日確認"
  - title: "VCT Pacific Stage 1 2026 順位表（VALORANT Esports 公式）"
    url: https://valorantesports.com/en-US/tournament/115577110529168808/stage/115577110529430953
    note: "グループステージの勝敗（2026年10月30日確認）"
  - title: "SLT Seongnam to compete as VARREL in 2026（VALORANT Esports 公式、2025年12月12日公開）"
    url: https://valorantesports.com/en-AU/news/slt-seongnam-to-compete-as-varrel-in-2026-article
    note: "2026年10月30日確認"
  - title: "VALORANT Challengers Japan 2026 Season Finals 結果（VCJ 2026 実行委員会のプレスリリース、2026年8月4日）"
    url: https://prtimes.jp/main/html/rd/p/000000028.000155470.html
    note: "大会公式サイト https://valesports.jp/2026_Season_Finals/ でも優勝チームを確認（2026年10月30日確認）"
  - title: "REJECT プレスリリース「VCJ Split 2 Main Stage を1位通過」（株式会社REJECT、2026年6月29日）"
    url: https://prtimes.jp/main/html/rd/p/000000577.000050979.html
    note: "2026年10月30日確認"
  - title: "IGZIST 公式 X の投稿（2026年10月26日、契約満了の発表・1件目）"
    url: https://x.com/IGZIST_GG/status/2114658298687627501
    note: "2026年10月30日確認（編集部）"
  - title: "IGZIST 公式 X の投稿（2026年10月26日、契約満了の発表・2件目）"
    url: https://x.com/IGZIST_GG/status/2114658545647997123
    note: "2026年10月30日確認（編集部）"
  - title: "MURASH GAMING 公式「チーム再編に伴う 選手・コーチ募集のお知らせ」（2026年7月27日）"
    url: https://murashgaming.co.jp/news/valorant_004/
    note: "2026年10月30日確認"
history:
  - date: 2026-10-30
    note: "初版を作成（パートナー入りを発表した2・2026年に Pacific のリーグで戦った2・国内 Challengers 4チーム）"
  - date: 2026-10-22
    note: "公式: VCT 2027 のパートナー32チームを発表（各地域8チーム）"
---
2027年の VCT Pacific で、**日本のチームでパートナーに入ったと発表しているのは ZETA DIVISION と Crazy Raccoon の2チーム**です。
2026年に Pacific のリーグで戦った **DFM はパートナーから外れ**、ほかの国内チームと同じく日本予選から Kickoff や Cups を目指します。
このページでは、日本のチームの2027年の立場・2026年の主な成績・所属選手を、公式の発表と結果ページだけで確かめて並べています（2026年10月30日確認）。

<!-- 出典: https://zetadivision.com/news/2026/10/19/47797 -->
<!-- 出典: https://x.com/crazyraccoon406/status/2112548170773520557 -->
<!-- 出典: https://x.com/DFM_VALORANT/status/2112093915297784227 -->

## パートナー制度とは：大会で約束されるのは「Kickoff の席」だけ

つまり、どういうこと？　を先に言うと、**パートナーは「年始の大会に必ず出られる権利」を持つチーム**です。それ以外の大会は、パートナーでも成績しだいです。

| 項目 | パートナー | パートナー以外 |
|---|---|---|
| チーム数 | 各地域8チーム（Pacific も8） | 制限なし |
| 契約の期間 | 2年ごとに更新 | — |
| 年始の Kickoff | 自動で出場 | オープン予選を勝ち抜いた4チームだけ（Pacific 全体） |
| Cups（年2回の地域大会） | 日本予選・日本の Playoff を勝ち抜く必要あり（日本枠は3。Masters に出たチームは予選を飛ばして日本の Playoff から） | 同じ |

<!-- 出典: https://valorantesports.com/en-US/news/introducing-the-vct-2027-partner-teams -->
<!-- 出典: https://valorantesports.com/ja-JP/news/vct-pacific-2027-primer -->

2026年までは、パートナー以外のチームが Pacific のリーグに上がるには、Ascension で1シーズン戦って昇格する必要がありました。2027年からはリーグ戦が Cups に置き換わり、パートナー以外のチームも日本予選から Cups を狙えます。つまり、**パートナーかどうかより「その大会で勝ったか」が大事**になります。くわしい日程と流れは [VCT 2027 日程・形式まとめ]({{ '/hub/vct-2027/' | relative_url }}) にあります。
<!-- 出典: https://valorantesports.com/en-US/news/the-new-valorant-champions-tour -->
<!-- 出典: https://valorantesports.com/ja-JP/news/vct-pacific-2027-primer -->

## パートナーの日本チーム（ZETA DIVISION・Crazy Raccoon）

ZETA DIVISION は10月19日に Riot とのパートナー契約を結び直したと発表し、2027年も Kickoff から戦います。Crazy Raccoon は10月20日、公式 X でパートナー入りを発表しました。Crazy Raccoon の VALORANT 部門の選手は、10月30日時点でチーム公式サイトに一覧がありません。
<!-- 出典: https://zetadivision.com/news/2026/10/19/47797 -->
<!-- 出典: https://x.com/crazyraccoon406/status/2112548170773520557 -->

{% include team-cards.html group="partner" %}

## 2026年に Pacific のリーグで戦ったチーム（DFM・VARREL）

DFM と VARREL は、2026年の VCT Pacific のリーグ戦に出ていたチームです。DFM は10月19日にパートナーに選ばれなかったと公式 X で伝え、10月29日には VCT 2027 に向けた選手・コーチ・アナリストの募集を始めました。VARREL の2027年の立場については、10月30日時点でチームの公式発表が見つかっていません（VCT 公式のパートナー発表には、各地域のチーム名が載っていません）。
<!-- 出典: https://x.com/DFM_VALORANT/status/2112093915297784227 -->
<!-- 出典: https://team-detonation.net/news/52622 -->
<!-- 出典: https://valorantesports.com/en-US/tournament/115577110529168808/stage/115577110529430953 -->
<!-- 出典: https://valorantesports.com/en-US/news/introducing-the-vct-2027-partner-teams -->
<!-- 出典: https://zetadivision.com/news/2026/09/06/46999 （Stage 2 プレイインの DFM 戦） -->

{% include team-cards.html group="pacific2026" %}

## 国内 Challengers のチーム（REJECT・FENNEL・IGZIST・MURASH GAMING）

2026年の国内大会 VALORANT Challengers Japan（VCJ）の Season Finals（7月25〜26日、アリーナ立川立飛）は、QT DIG∞ が優勝し、REJECT が準優勝、FENNEL と IGZIST が3位でした。2027年はこうした国内チームも、日本予選から Kickoff や Cups を直接狙えます。
優勝した QT DIG∞ のカードは、まだこのページに載せていません。
<!-- 出典: https://prtimes.jp/main/html/rd/p/000000028.000155470.html -->
<!-- 出典: https://valesports.jp/2026_Season_Finals/ -->

{% include team-cards.html group="challengers" %}

## 2027年に向けた見どころ

- **DFM の再編**: Pacific のリーグで戦ってきたチームが、日本予選からどこまで戻ってこられるか。選手の yatsuka と Caedye は本人が X でチーム募集（LFT）を告知しています（退団の発表ではありません。10月30日時点で DFM 公式サイトのメンバー一覧には名前があります）。
  <!-- 出典: https://x.com/yatsuka_07/status/2113191282822791427 -->
  <!-- 出典: https://team-detonation.net/teams -->
  <!-- 出典: https://x.com/CaedyeuS/status/2114365102971613218 -->
- **IGZIST・MURASH GAMING の組み直し**: IGZIST は選手4人とスタッフ3人の契約満了を発表し、MURASH GAMING は7月27日にチーム再編のための選手・コーチ募集を告知しました。
  <!-- 出典: https://x.com/IGZIST_GG/status/2114658298687627501 -->
  <!-- 出典: https://x.com/IGZIST_GG/status/2114658545647997123 -->
  <!-- 出典: https://murashgaming.co.jp/news/valorant_004/ -->
- **Crazy Raccoon のロスター発表**: パートナー入りは発表済みで、選手の発表はまだです。

移籍や退団の発表は [2027 国内チーム ロスター・移籍トラッカー]({{ '/hub/roster-tracker/' | relative_url }}) で日付順に追っています。

## 次に読む

- [日本の VALORANT プロ選手名鑑]({{ '/hub/players/' | relative_url }}): チーム別のロスターを表で
- [2027 国内チーム ロスター・移籍トラッカー]({{ '/hub/roster-tracker/' | relative_url }})
- [LFT・FA ボード]({{ '/hub/lft-board/' | relative_url }})
- [VCT 2027 日程・形式まとめ]({{ '/hub/vct-2027/' | relative_url }})
