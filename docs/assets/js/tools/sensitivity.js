/* 感度変換（外部ライブラリなし）
   計算式（ページ内「計算式と出典」と同じ）:
     1カウントあたりの回転角（度） = ヨー値 × ゲーム内感度
     振り向き（cm/360） = 360 ÷ (ヨー値 × 感度 × DPI) × 2.54
     変換後の感度 = (変換元ヨー × 変換元感度 × 変換元DPI) ÷ (変換先ヨー × 変換先DPI)
     振り向きから逆算 = 360 × 2.54 ÷ (cm/360 × 変換先ヨー × 変換先DPI)
   ヨー値: VALORANT 0.07（Riot 非公表。ページ内の手順で実測して確かめられる値）、CS2 0.022（m_yaw の初期値）
   根拠のある係数が確かめられないゲームはここに足さない（白石の確認が先）。
   入力は URL の ?from=cs2&to=valorant&sens=1&dpi=800&dpi2=800（cm モードは &cm=52）で再現できる。計算はブラウザの中だけ。
   アドレスバーは書き換えず、数値は「結果の URL をコピー」で作るリンクにだけ入る（そのリンクを開くと GA4 にページ URL として残ることがある）。 */
(function () {
  'use strict';
  var form = document.getElementById('sens-form');
  if (!form) return;

  var GAMES = {
    valorant: { name: 'VALORANT', yaw: 0.07 },
    cs2: { name: 'CS2', yaw: 0.022 }
  };
  var CM_PER_INCH = 2.54;
  var DPI_MAX = 100000, SENS_MAX = 1000, CM_MAX = 10000;

  var fromEl = document.getElementById('sens-from');
  var toEl = document.getElementById('sens-to');
  var sensEl = document.getElementById('sens-sens');
  var dpiEl = document.getElementById('sens-dpi');
  var cmEl = document.getElementById('sens-cm');
  var dpi2El = document.getElementById('sens-dpi2');
  var sensField = document.getElementById('sens-field-sens');
  var dpiField = document.getElementById('sens-field-dpi');
  var cmField = document.getElementById('sens-field-cm');
  var sensLabel = document.getElementById('sens-sens-label');
  var dpi2Help = document.getElementById('sens-dpi2-help');
  var label = document.getElementById('sens-label');
  var out = document.getElementById('sens-out');
  var sub = document.getElementById('sens-sub');
  var cmOut = document.getElementById('sens-cm-out');
  var edpiOut = document.getElementById('sens-edpi-out');
  var err = document.getElementById('sens-error');
  var copyBtn = document.getElementById('sens-copy');

  function num(v) {
    var s = String(v == null ? '' : v);
    if (s.normalize) s = s.normalize('NFKC');
    s = s.replace(/,/g, '').trim();
    if (s === '') return NaN;
    var n = parseFloat(s);
    return isFinite(n) ? n : NaN;
  }
  /* 感度: 小数第3位まで。0.001 未満の小さな値は 0 と出ないよう有効数字3桁 */
  function fmtSens(n) {
    if (n > 0 && n < 0.001) return String(Number(n.toPrecision(3)));
    return (Math.round(n * 1000) / 1000).toLocaleString('ja-JP', { maximumFractionDigits: 3 });
  }
  /* 丸める前の値（白石・読者が手計算と照らし合わせる用）: 有効数字6桁 */
  function fmtRaw(n) { return String(Number(n.toPrecision(6))); }
  /* 振り向き: 手で測る距離なので小数第1位まで */
  function fmtCm(n) {
    if (n > 0 && n < 0.1) return String(Number(n.toPrecision(2)));
    return (Math.round(n * 10) / 10).toLocaleString('ja-JP', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  }
  /* eDPI: edpi.js と同じく小数第2位まで */
  function fmtEdpi(n) {
    if (n > 0 && n < 0.01) return String(Number(n.toPrecision(3)));
    return (Math.round(n * 100) / 100).toLocaleString('ja-JP', { maximumFractionDigits: 2 });
  }
  function roundSens(n) {
    if (n > 0 && n < 0.001) return Number(n.toPrecision(3));
    return Math.round(n * 1000) / 1000;
  }
  function cm360(yaw, sens, dpi) { return 360 / (yaw * sens * dpi) * CM_PER_INCH; }

  function isCmMode() { return fromEl.value === 'cm360'; }

  function updateFields() {
    var cmMode = isCmMode();
    sensField.hidden = cmMode;
    dpiField.hidden = cmMode;
    cmField.hidden = !cmMode;
    if (!cmMode) sensLabel.textContent = '今の感度（' + GAMES[fromEl.value].name + '）';
    dpi2Help.textContent = cmMode
      ? '変換先のゲームで使うマウスの DPI を入れてください。'
      : '空欄なら今の DPI と同じとして計算します。DPI を変えるときだけ入れてください。';
  }

  function fail(msg) {
    err.textContent = msg;
    err.hidden = false;
    out.textContent = '—';
    sub.textContent = '';
    cmOut.textContent = '';
    edpiOut.textContent = '';
    return false;
  }

  function calc() {
    var to = GAMES[toEl.value];
    if (!to) return fail('変換先のゲームを選んでください。');
    var cmMode = isCmMode();
    var from = cmMode ? null : GAMES[fromEl.value];
    if (!cmMode && !from) return fail('変換元のゲームを選んでください。');

    var sens, dpi, cm, dpi2;
    if (cmMode) {
      cm = num(cmEl.value);
      if (!(cm > 0) || cm > CM_MAX) return fail('振り向き（cm/360）は 0 より大きく 10000 以下の数字を入れてください。');
    } else {
      sens = num(sensEl.value);
      dpi = num(dpiEl.value);
      if (!(sens > 0) || sens > SENS_MAX) return fail('今の感度は 0 より大きく 1000 以下の数字を入れてください。');
      if (!(dpi >= 1) || dpi > DPI_MAX) return fail('今の DPI は 1〜100000 の数字を入れてください。');
    }
    var dpi2Raw = String(dpi2El.value).trim();
    /* type="number" に数字以外を入れると value が空になるので、空欄と区別する */
    if (dpi2Raw === '' && dpi2El.validity && dpi2El.validity.badInput) return fail('変換先の DPI は 1〜100000 の数字を入れてください。');
    if (dpi2Raw === '') {
      if (cmMode) return fail('変換先の DPI を入れてください。');
      dpi2 = dpi;
    } else {
      dpi2 = num(dpi2Raw);
      if (!(dpi2 >= 1) || dpi2 > DPI_MAX) return fail('変換先の DPI は 1〜100000 の数字を入れてください。');
    }

    var target, cmExact;
    if (cmMode) {
      cmExact = cm;
      target = 360 * CM_PER_INCH / (cm * to.yaw * dpi2);
    } else {
      target = (from.yaw * sens * dpi) / (to.yaw * dpi2);
      cmExact = cm360(from.yaw, sens, dpi);
    }

    err.hidden = true;
    label.textContent = '変換後の感度（' + to.name + '・' + dpi2 + ' DPI）';
    out.textContent = fmtSens(target);
    sub.textContent = '丸める前の値: ' + fmtRaw(target) +
      (cmMode ? '（振り向き ' + cm + ' cm から逆算）' : '（' + from.name + ' ' + sens + '・' + dpi + ' DPI から）');

    var cmText = '振り向き: ' + fmtCm(cmExact) + ' cm/360（' + fmtCm(cmExact / CM_PER_INCH) + ' インチ）';
    var rounded = roundSens(target);
    if (rounded > 0) {
      var cmRounded = cm360(to.yaw, rounded, dpi2);
      if (fmtCm(cmRounded) !== fmtCm(cmExact)) cmText += '。丸めた感度 ' + fmtSens(rounded) + ' では ' + fmtCm(cmRounded) + ' cm';
    }
    cmOut.textContent = cmText;
    edpiOut.textContent = '変換先の eDPI: ' + fmtEdpi(target * dpi2) + '（' + to.name + ' の中でだけ比べられる値）';
    return true;
  }

  /* URL から入力を再現（許可した値だけ受け付ける） */
  var q = new URLSearchParams(location.search);
  var qFrom = q.get('from'), qTo = q.get('to');
  if (qFrom && (GAMES[qFrom] || qFrom === 'cm360')) fromEl.value = qFrom;
  if (qTo && GAMES[qTo]) toEl.value = qTo;
  if (q.get('sens')) sensEl.value = q.get('sens');
  if (q.get('dpi')) dpiEl.value = q.get('dpi');
  if (q.get('cm')) cmEl.value = q.get('cm');
  if (q.get('dpi2')) dpi2El.value = q.get('dpi2');
  updateFields();
  calc();

  /* アドレスバーの URL は一切書き換えない（アクセス解析に数値入りの URL が残らないように） */
  form.addEventListener('input', function () { calc(); });
  form.addEventListener('change', function () { updateFields(); calc(); });
  form.addEventListener('submit', function (e) { e.preventDefault(); calc(); });

  copyBtn.addEventListener('click', function () {
    if (!calc()) return;
    var u = new URL(location.href);
    ['from', 'to', 'sens', 'dpi', 'cm', 'dpi2'].forEach(function (k) { u.searchParams.delete(k); });
    u.searchParams.set('from', fromEl.value);
    u.searchParams.set('to', toEl.value);
    if (isCmMode()) {
      u.searchParams.set('cm', String(num(cmEl.value)));
    } else {
      u.searchParams.set('sens', String(num(sensEl.value)));
      u.searchParams.set('dpi', String(num(dpiEl.value)));
    }
    if (String(dpi2El.value).trim() !== '') u.searchParams.set('dpi2', String(num(dpi2El.value)));
    var url = u.href;
    var done = function () { copyBtn.textContent = 'コピーしました'; setTimeout(function () { copyBtn.textContent = '結果の URL をコピー'; }, 2000); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done, function () { window.prompt('この URL をコピーしてください', url); });
    } else {
      window.prompt('この URL をコピーしてください', url);
    }
  });
})();
