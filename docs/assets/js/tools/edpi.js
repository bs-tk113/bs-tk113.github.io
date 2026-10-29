/* eDPI 計算（外部ライブラリなし）
   計算式: eDPI = マウスの DPI × ゲーム内感度（ページ内「計算式と出典」と同じ式）
   入力は URL の ?dpi=800&sens=0.4 で再現できる。計算はブラウザの中だけ。
   アドレスバーは書き換えず、数値は「結果の URL をコピー」で作るリンクにだけ入る（そのリンクを開くと GA4 にページ URL として残ることがある）。 */
(function () {
  'use strict';
  var form = document.getElementById('edpi-form');
  if (!form) return;
  var dpiEl = document.getElementById('edpi-dpi');
  var sensEl = document.getElementById('edpi-sens');
  var out = document.getElementById('edpi-out');
  var sub = document.getElementById('edpi-sub');
  var err = document.getElementById('edpi-error');
  var copyBtn = document.getElementById('edpi-copy');

  function num(v) {
    var s = String(v);
    if (s.normalize) s = s.normalize('NFKC');
    var n = parseFloat(s.replace(/,/g, ''));
    return isFinite(n) ? n : NaN;
  }
  /* 小数の誤差（0.1 + 0.2 など）を見せないため、小数第2位までに丸める。
     0.01 未満になる小さな値は 0 と出ないよう、有効数字3桁で出す */
  function fmt(n) {
    if (n > 0 && n < 0.01) return String(Number(n.toPrecision(3)));
    return (Math.round(n * 100) / 100).toLocaleString('ja-JP', { maximumFractionDigits: 2 });
  }
  var DPI_MAX = 100000, SENS_MAX = 1000;
  function calc() {
    var dpi = num(dpiEl.value);
    var sens = num(sensEl.value);
    if (!(dpi >= 1) || !(sens > 0) || dpi > DPI_MAX || sens > SENS_MAX) {
      err.textContent = 'DPI は 1〜100000、感度は 0 より大きく 1000 以下の数字を入れてください。';
      err.hidden = false;
      out.textContent = '—';
      sub.textContent = '';
      return false;
    }
    err.hidden = true;
    out.textContent = fmt(dpi * sens);
    sub.textContent = dpi + ' DPI × ' + sens;
    return true;
  }

  var q = new URLSearchParams(location.search);
  if (q.get('dpi')) dpiEl.value = q.get('dpi');
  if (q.get('sens')) sensEl.value = q.get('sens');
  calc();

  /* アドレスバーの URL は一切書き換えない（アクセス解析に数値入りの URL が残らないように）。
     数値はコピーしたリンクの中にだけ入る */
  form.addEventListener('input', function () { calc(); });
  form.addEventListener('submit', function (e) { e.preventDefault(); calc(); });

  copyBtn.addEventListener('click', function () {
    if (!calc()) return;
    var u = new URL(location.href);
    u.searchParams.set('dpi', String(num(dpiEl.value)));
    u.searchParams.set('sens', String(num(sensEl.value)));
    var url = u.href;
    var done = function () { copyBtn.textContent = 'コピーしました'; setTimeout(function () { copyBtn.textContent = '結果の URL をコピー'; }, 2000); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done, function () { window.prompt('この URL をコピーしてください', url); });
    } else {
      window.prompt('この URL をコピーしてください', url);
    }
  });
})();
