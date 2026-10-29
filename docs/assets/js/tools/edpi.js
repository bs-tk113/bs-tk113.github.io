/* eDPI 計算（外部ライブラリなし）
   計算式: eDPI = マウスの DPI × ゲーム内感度（ページ内「計算式と出典」と同じ式）
   入力は URL の ?dpi=800&sens=0.4 で再現できる。数値はどこにも送信しない。 */
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
  /* 小数の誤差（0.1 + 0.2 など）を見せないため、小数第2位までに丸める */
  function fmt(n) {
    return (Math.round(n * 100) / 100).toLocaleString('ja-JP', { maximumFractionDigits: 2 });
  }
  function calc(updateUrl) {
    var dpi = num(dpiEl.value);
    var sens = num(sensEl.value);
    if (!(dpi > 0) || !(sens > 0)) {
      err.textContent = 'DPI と感度には 0 より大きい数字を入れてください。';
      err.hidden = false;
      out.textContent = '—';
      sub.textContent = '';
      return;
    }
    err.hidden = true;
    out.textContent = fmt(dpi * sens);
    sub.textContent = dpi + ' DPI × ' + sens;
    if (updateUrl && window.history && history.replaceState) {
      var u = new URL(location.href);
      u.searchParams.set('dpi', String(dpi));
      u.searchParams.set('sens', String(sens));
      history.replaceState(null, '', u);
    }
  }

  var q = new URLSearchParams(location.search);
  if (q.get('dpi')) dpiEl.value = q.get('dpi');
  if (q.get('sens')) sensEl.value = q.get('sens');
  calc(false);

  form.addEventListener('input', function () { calc(true); });
  form.addEventListener('submit', function (e) { e.preventDefault(); calc(true); });

  copyBtn.addEventListener('click', function () {
    calc(true);
    var url = location.href;
    var done = function () { copyBtn.textContent = 'コピーしました'; setTimeout(function () { copyBtn.textContent = '結果の URL をコピー'; }, 2000); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done, function () { window.prompt('この URL をコピーしてください', url); });
    } else {
      window.prompt('この URL をコピーしてください', url);
    }
  });
})();
