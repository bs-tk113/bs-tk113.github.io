/* サイト共通の JS（外部ライブラリなし・ビルド不要）
   - テーマ切替（ライト／ダーク。localStorage に保存。初期値は <head> の小さな script が先に当てる）
   - メニューの開閉
   - 目次（記事・ハブ本文の h2/h3 から作る。2つ未満なら出さない）
   - 絞り込みボタン（いまの話題・大会カレンダー・ボード）
   - 大会カレンダーの「今日」の印、トップの「今週の大会」の期間の絞り込み
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

  /* ---- 空になったまとまり（日付の見出しごと）を隠す ---- */
  function hideEmptyGroups(scope) {
    var groups = scope.querySelectorAll('.sched-day, .tl-day');
    for (var g = 0; g < groups.length; g++) {
      var vis = groups[g].querySelectorAll('[data-filter-item]:not([hidden]):not([data-out])');
      if (vis.length) groups[g].removeAttribute('hidden'); else groups[g].setAttribute('hidden', '');
    }
  }

  /* ---- 絞り込みボタン（いまの話題・大会カレンダー・ボード）。JS が無いときはボタンごと出さない ---- */
  var scopes = document.querySelectorAll('[data-filter-scope]');
  for (var si = 0; si < scopes.length; si++) {
    (function (scope) {
      var bar = scope.querySelector('.filter[data-filter-key]');
      if (!bar) return;
      var key = bar.getAttribute('data-filter-key');
      var btns = bar.querySelectorAll('.filter-btn');
      bar.removeAttribute('hidden');
      bar.addEventListener('click', function (e) {
        var b = e.target.closest ? e.target.closest('.filter-btn') : null;
        if (!b) return;
        var val = b.getAttribute('data-filter-value') || '';
        for (var k = 0; k < btns.length; k++) btns[k].setAttribute('aria-pressed', btns[k] === b ? 'true' : 'false');
        var its = scope.querySelectorAll('[data-filter-item]');
        for (var n = 0; n < its.length; n++) {
          var v = its[n].getAttribute('data-' + key) || '';
          if (val === '' || v === val) its[n].removeAttribute('hidden'); else its[n].setAttribute('hidden', '');
        }
        hideEmptyGroups(scope);
      });
    })(scopes[si]);
  }

  /* ---- 大会カレンダー: 「今日」の印・過ぎた日を薄く（日本時間で判定） ---- */
  var DAY = 24 * 3600 * 1000;
  var nowMs = Date.now();
  var todayJst = new Date(nowMs + 9 * 3600 * 1000).toISOString().slice(0, 10);
  var days = document.querySelectorAll('.sched-day[data-day]');
  var firstUpcoming = null;
  for (var di = 0; di < days.length; di++) {
    var dd = days[di].getAttribute('data-day');
    if (dd === todayJst) {
      days[di].classList.add('is-today');
      var tg = days[di].querySelector('.sched-today');
      if (tg) tg.removeAttribute('hidden');
    } else if (dd < todayJst) {
      days[di].classList.add('is-past');
    }
    if (!firstUpcoming && dd >= todayJst) firstUpcoming = days[di];
  }
  var jump = document.querySelector('[data-sched-jump]');
  if (jump && firstUpcoming && !firstUpcoming.closest('[data-sched-window]')) {
    if (!firstUpcoming.id) firstUpcoming.id = 'day-' + firstUpcoming.getAttribute('data-day');
    jump.setAttribute('href', '#' + firstUpcoming.id);
    if (firstUpcoming.getAttribute('data-day') !== todayJst) jump.textContent = '次の日程へ移動';
    jump.parentNode.removeAttribute('hidden');
  }

  /* ---- トップの「今週の大会」: 今日〜7日先の予定と、2日以内の結果だけ残す。何も残らなければ枠ごと隠す ---- */
  var wins = document.querySelectorAll('[data-sched-window]');
  for (var wi = 0; wi < wins.length; wi++) {
    var wdays = parseInt(wins[wi].getAttribute('data-sched-window'), 10) || 7;
    var wits = wins[wi].querySelectorAll('.sched-item[data-date]');
    var shown = 0;
    for (var x = 0; x < wits.length; x++) {
      var t = Date.parse(wits[x].getAttribute('data-date'));
      var hasRes = (wits[x].getAttribute('data-result') || '') !== '';
      var keep = !isNaN(t) && t <= nowMs + wdays * DAY && (hasRes ? t >= nowMs - 2 * DAY : t + 3 * 3600 * 1000 >= nowMs);
      if (keep) { wits[x].removeAttribute('data-out'); wits[x].removeAttribute('hidden'); shown++; }
      else { wits[x].setAttribute('data-out', ''); wits[x].setAttribute('hidden', ''); }
    }
    hideEmptyGroups(wins[wi]);
    if (!shown) {
      var box = wins[wi].closest('[data-sched-home]');
      if (box) box.setAttribute('hidden', '');
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
