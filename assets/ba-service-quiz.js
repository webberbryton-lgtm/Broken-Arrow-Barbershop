/* Four-question service picker. Ported from the Claude Design pages "Services" and "Service Quiz". */
(function () {
  var S = {
    sig: { name: 'Signature Haircut', price: '$65', href: 'https://book.squareup.com/appointments/a9bstwwcb18jn4/location/LFBJAQ8MMHY0Z/services/COXNLW42DT56FAK7ZESHNUVQ' },
    beard: { name: 'Haircut + Beard', price: '$65', href: 'https://book.squareup.com/appointments/a9bstwwcb18jn4/location/LFBJAQ8MMHY0Z/services/SMNS7RO5ETWVT5AYBLLPYKLR' },
    classic: { name: 'Classic Haircut', price: '$40', href: 'https://book.squareup.com/appointments/a9bstwwcb18jn4/location/LFBJAQ8MMHY0Z/services/7T6J5FCSOTULAKKXBJQXL2H5' }
  };
  var KEYS = ['first', 'length', 'want', 'beard'];
  function pickResult(a) {
    if (!KEYS.every(function (k) { return a[k]; })) return null;
    function r(s, why) { return { name: s.name, price: s.price, href: s.href, why: why }; }
    if (a.beard === 'yes') return r(S.beard, 'Your haircut plus a beard trim and shaping, done in one visit.');
    if (a.length === 'mid') return r(S.sig, 'Mid-length and longer styles like a flow, warrior cut or modern mullet get the detail work they need, and since they don’t need cutting as often, it usually costs about the same over a year.');
    if (a.want === 'new') return r(S.sig, 'A new style needs the extra consultation and detail work. After that, the Classic Haircut keeps it in shape.');
    if (a.first === 'yes') return r(S.sig, 'Start with the Signature Haircut on your first visit so your barber can learn your hair. After that, the Classic Haircut keeps it in shape.');
    return r(S.classic, 'You know the style you like. This keeps it looking the way it should.');
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function resultHtml(res, band) {
    if (band) return '<div aria-live="polite" data-ba-quiz-result style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:20px 32px;padding:24px;margin-top:24px;background:var(--band);color:var(--on-band)">' +
      '<div style="display:flex;flex-direction:column;gap:6px;flex:1 1 300px"><p class="ba-label" style="color:var(--on-band);opacity:.78">We recommend</p>' +
      '<p style="font:800 clamp(24px,2.6vw,32px)/1.1 var(--font-display);letter-spacing:-.02em;text-transform:uppercase">' + esc(res.name) + ' · ' + esc(res.price) + '</p>' +
      '<p style="font-size:15px;line-height:24px;opacity:.85;text-wrap:pretty">' + esc(res.why) + '</p></div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:16px 24px;align-items:center"><a href="' + esc(res.href) + '" class="ba-btn ba-btn-primary ba-on-dark">BOOK NOW</a>' +
      '<button type="button" data-ba-quiz-reset style="background:none;border:0;padding:12px 0;min-height:44px;cursor:pointer;font:600 13px/16px var(--font-sans);letter-spacing:.18em;text-transform:uppercase;color:var(--on-band);opacity:.78">Start over</button></div></div>';
    return '<div aria-live="polite" data-ba-quiz-result style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:20px 32px;padding:24px 0;border-bottom:1px solid var(--line)">' +
      '<div style="display:flex;flex-direction:column;gap:6px;flex:1 1 300px"><p class="ba-label" style="color:var(--green)">Book this</p>' +
      '<p style="font:800 clamp(24px,2.6vw,32px)/1.1 var(--font-display);letter-spacing:-.02em;text-transform:uppercase">' + esc(res.name) + ' · ' + esc(res.price) + '</p>' +
      '<p style="font-size:15px;line-height:24px;color:var(--ink-muted);text-wrap:pretty">' + esc(res.why) + '</p></div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:16px 24px;align-items:center"><a href="' + esc(res.href) + '" class="ba-btn ba-btn-primary">BOOK NOW</a>' +
      '<button type="button" data-ba-quiz-reset style="background:none;border:0;padding:12px 0;min-height:44px;cursor:pointer;font:600 13px/16px var(--font-sans);letter-spacing:.18em;text-transform:uppercase;color:var(--ink-muted)">Start over</button></div></div>';
  }
  document.querySelectorAll('[data-ba-service-quiz]').forEach(function (box) {
    var band = box.getAttribute('data-ba-service-quiz') === 'band';
    var a = {};
    function render() {
      box.querySelectorAll('[data-ba-q]').forEach(function (b) {
        var on = a[b.getAttribute('data-ba-q')] === b.getAttribute('data-ba-v');
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        b.style.background = on ? 'var(--ink)' : 'var(--canvas)';
        b.style.color = on ? 'var(--canvas)' : 'var(--ink)';
        b.style.borderColor = on ? 'var(--ink)' : 'var(--line-strong)';
      });
      var old = box.querySelector('[data-ba-quiz-result]');
      if (old) old.remove();
      var res = pickResult(a);
      if (res) box.insertAdjacentHTML('beforeend', resultHtml(res, band));
    }
    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-ba-q]');
      if (b) { a[b.getAttribute('data-ba-q')] = b.getAttribute('data-ba-v'); render(); return; }
      if (e.target.closest('[data-ba-quiz-reset]')) {
        a = {}; render();
        if (band) window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
})();
