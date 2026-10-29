/* サイト共通の JS（外部ライブラリなし・ビルド不要）
   - テーマ切替（ライト／ダーク。localStorage に保存。初期値は <head> の小さな script が先に当てる）
   - メニューの開閉
   - 目次（記事・ハブ本文の h2/h3 から作る。2つ未満なら出さない）
   - ティッカーの過ぎた予定を隠す
   - サイト内検索（/search/ で search.json を読んで絞り込む）
   JS が動かなくても本文・リンクはすべて読める作りにしてある。 */
(function () {
  'use strict';
  var root = document.documentElement;
  var KEY = 'theme';

  /* ---- テーマ切替 ---- */
  function currentTheme() {
    var t = root.getAttribute('data-theme');
    if (t === 'dark' || t === 'light') return t;
    return (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }
  function labelTheme(btn) {
    var t = currentTheme();
    btn.setAttribute('aria-label', t === 'dark' ? 'ライトモードに切り替える' : 'ダークモードに切り替える');
  }
  var themeBtn = document.getElementById('theme-btn');
  if (themeBtn) {
    labelTheme(themeBtn);
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      labelTheme(themeBtn);
    });
  }

  /* ---- メニュー ---- */
  var menuBtn = document.getElementById('menu-btn');
  var drawer = document.getElementById('drawer');
  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', function () {
      var open = drawer.hasAttribute('hidden');
      if (open) drawer.removeAttribute('hidden'); else drawer.setAttribute('hidden', '');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !drawer.hasAttribute('hidden')) {
        drawer.setAttribute('hidden', '');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.focus();
      }
    });
  }

  /* ---- 目次 ---- */
  var toc = document.getElementById('toc');
  var body = document.querySelector('[data-toc-source]');
  if (toc && body) {
    var heads = body.querySelectorAll('h2, h3');
    var h2count = body.querySelectorAll('h2').length;
    if (h2count >= 2) {
      var ol = toc.querySelector('ol');
      for (var i = 0; i < heads.length; i++) {
        var h = heads[i];
        if (!h.id) h.id = 'sec-' + (i + 1);
        var li = document.createElement('li');
        if (h.tagName === 'H3') li.className = 'toc-h3';
        var a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent;
        li.appendChild(a);
        ol.appendChild(li);
      }
      toc.removeAttribute('hidden');
    }
  }

  /* ---- ティッカー: 結果が無く、日時が過ぎた予定を隠す ---- */
  var items = document.querySelectorAll('.ticker-item[data-date]');
  if (items.length) {
    var now = Date.now(), visible = 0;
    for (var j = 0; j < items.length; j++) {
      var it = items[j];
      var d = Date.parse(it.getAttribute('data-date'));
      var hasResult = (it.getAttribute('data-result') || '') !== '';
      if (!hasResult && !isNaN(d) && d + 3 * 3600 * 1000 < now) it.setAttribute('hidden', '');
      else visible++;
    }
    if (!visible) {
      var tk = document.querySelector('.ticker');
      if (tk) tk.setAttribute('hidden', '');
    }
  }

  /* ---- サイト内検索 ---- */
  var sForm = document.getElementById('search-page-form');
  if (sForm) {
    var input = document.getElementById('search-page-q');
    var out = document.getElementById('search-results');
    var status = document.getElementById('search-status');
    var index = null;
    var params = new URLSearchParams(location.search);
    var initial = params.get('q') || '';
    input.value = initial;

    function norm(s) {
      return (s || '').toString().toLowerCase().normalize('NFKC');
    }
    function render(q) {
      out.innerHTML = '';
      var nq = norm(q).trim();
      if (!nq) { status.textContent = '探したい言葉を入れてください（チーム名・エージェント名・用語など）。'; return; }
      var words = nq.split(/\s+/);
      var hits = index.filter(function (d) {
        var hay = norm(d.t + ' ' + d.c + ' ' + d.d + ' ' + (d.k || ''));
        return words.every(function (w) { return hay.indexOf(w) !== -1; });
      });
      status.textContent = '「' + q + '」の検索結果: ' + hits.length + '件';
      hits.slice(0, 50).forEach(function (d) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = d.u;
        var st = document.createElement('strong');
        st.textContent = d.t;
        var sp = document.createElement('span');
        sp.textContent = (d.c ? d.c + ' ・ ' : '') + (d.d || '');
        a.appendChild(st); a.appendChild(sp); li.appendChild(a); out.appendChild(li);
      });
    }
    fetch(sForm.getAttribute('data-index'))
      .then(function (r) { return r.json(); })
      .then(function (data) { index = data; render(input.value); })
      .catch(function () { status.textContent = '検索データを読み込めませんでした。カテゴリ一覧から探してください。'; });

    sForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = input.value;
      var url = new URL(location.href);
      if (q) url.searchParams.set('q', q); else url.searchParams.delete('q');
      history.replaceState(null, '', url);
      if (index) render(q);
    });
  }
})();
