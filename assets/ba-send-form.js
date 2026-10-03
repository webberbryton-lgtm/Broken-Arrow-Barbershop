(function () {
  var TO = 'brokenarrowbarbershoporem@gmail.com';
  var PHONE = '(801) 709-1280';
  function notice(subject, data) {
    var old = document.getElementById('ba-send-error');
    if (old) old.remove();
    var body = Object.keys(data).filter(function (k) { return k.charAt(0) !== '_'; }).map(function (k) { return k + ': ' + data[k]; }).join('\n');
    var mail = 'mailto:' + TO + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    var d = document.createElement('div');
    d.id = 'ba-send-error';
    d.setAttribute('role', 'alert');
    d.style.cssText = 'position:fixed;left:16px;right:16px;bottom:96px;z-index:200;max-width:560px;margin:0 auto;background:var(--canvas,#f1eee9);color:var(--ink,#16171a);border:2px solid var(--alert,#9b2c2c);padding:16px 18px;display:flex;flex-direction:column;gap:10px;font:400 15px/22px var(--font-sans,Inter,sans-serif)';
    d.innerHTML = '<strong style="font:600 13px/16px var(--font-sans,Inter,sans-serif);letter-spacing:.14em;text-transform:uppercase;color:var(--alert,#9b2c2c)">We couldn’t send that</strong>' +
      '<span>Your answers are still on the page. Email them to us instead, or call the shop at ' + PHONE + '.</span>' +
      '<span style="display:flex;flex-wrap:wrap;gap:16px;align-items:center"><a href="' + mail + '" style="color:var(--ink,#16171a);font-weight:600">Email your application</a><a href="tel:+18017091280" style="color:var(--ink,#16171a);font-weight:600">Call the shop</a><button type="button" style="margin-left:auto;background:none;border:0;padding:8px 0;cursor:pointer;font:600 12px/16px var(--font-sans,Inter,sans-serif);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted,#5b5c60)">Close</button></span>';
    d.querySelector('button').onclick = function () { d.remove(); };
    document.body.appendChild(d);
  }
  window.baSend = function (subject, data) {
    var payload = Object.assign({ _subject: subject, _template: 'table' }, data);
    return fetch('https://formsubmit.co/ajax/' + TO, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return r.ok && String(j.success) === 'true'; }); })
      .catch(function () { return false; })
      .then(function (ok) { if (!ok) notice(subject, data); else { var o = document.getElementById('ba-send-error'); if (o) o.remove(); } return ok; });
  };
})();
