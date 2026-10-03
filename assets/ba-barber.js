/* Barber pages: live next opening and years of experience. Ported from the Claude Design page "Barber". */
(function () {
  var page = document.querySelector('[data-ba-barber]');
  if (!page) return;
  var id = page.getAttribute('data-ba-barber');
  var KEY = { bryton: 'Bryton', connor: 'Connor', elise: 'Elise' }[id];

  var yrs = (function () { var s = new Date(2023, 8, 1), n = new Date(); var y = n.getFullYear() - s.getFullYear(); if (n.getMonth() < s.getMonth()) y--; return Math.max(1, y); })();
  var byears = Math.ceil((Date.now() - new Date(2021, 10, 1)) / 31557600000);
  page.querySelectorAll('[data-ba-years]').forEach(function (p) {
    p.textContent = p.textContent
      .replace(/has (\d+|a) years? of experience/, 'has ' + (p.getAttribute('data-ba-years') === 'byears' ? byears + ' years' : (yrs === 1 ? 'a year' : yrs + ' years')) + ' of experience');
  });

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var ctrl = window.AbortController ? new AbortController() : null;
  var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 3000);
  fetch('https://barberavalibility.webberbryton.workers.dev/availability', { signal: ctrl && ctrl.signal, headers: { Accept: 'application/json' } })
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(function (data) {
      clearTimeout(timer);
      var s = data && data.perBarber && data.perBarber[KEY];
      if (!s || typeof s.label !== 'string' || !s.label.trim() || typeof s.bookUrl !== 'string') return;
      if (new URL(s.bookUrl).protocol !== 'https:') return;
      var slot = page.querySelector('[data-ba-avail-slot]');
      if (!slot) return;
      var label = s.label.trim();
      slot.insertAdjacentHTML('beforeend',
        '<a class="ba-avail-hero" href="' + esc(s.bookUrl) + '" aria-label="' + esc('Next opening with ' + KEY + ': ' + label + '. Book it.') + '" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px 16px;max-width:460px;min-height:56px;padding:12px 0;border-top:1px solid var(--line-strong);border-bottom:1px solid var(--line-strong);text-decoration:none;color:var(--on-band);font:600 13px/16px var(--font-sans);letter-spacing:.18em;text-transform:uppercase">' +
        '<span><span style="opacity:.7">Next opening: </span><span style="font-variant-numeric:tabular-nums">' + esc(label) + '</span></span><span>Book it →</span></a>');
    })
    .catch(function () { clearTimeout(timer); });
})();
