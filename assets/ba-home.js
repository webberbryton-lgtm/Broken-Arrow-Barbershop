/* Home page: today's hours line, today's row in the hours table, and live next openings.
   Ported from the Claude Design page "Home". Availability comes from the shop's Cloudflare Worker
   (no Square credentials in the browser). */
(function () {
  var page = document.querySelector('[data-ba-page="home"]');
  if (!page) return;
  var HOURS = { 2: '6 PM', 3: '7:30 PM', 4: '7:30 PM', 5: '7:30 PM', 6: '5:30 PM' };
  var d = new Date().getDay();
  var today = page.querySelector('[data-ba-today]');
  if (today) today.textContent = HOURS[d] ? 'Open today until ' + HOURS[d] : 'Closed today · Book online any time';
  page.querySelectorAll('[data-ba-day]').forEach(function (row) {
    row.style.fontWeight = +row.getAttribute('data-ba-day') === d ? '600' : '400';
  });

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function clean(s) {
    if (!s || typeof s.label !== 'string' || !s.label.trim() || typeof s.bookUrl !== 'string') return null;
    try { if (new URL(s.bookUrl).protocol !== 'https:') return null; } catch (e) { return null; }
    return { label: s.label.trim(), url: s.bookUrl, barber: typeof s.barber === 'string' ? s.barber.trim() : '' };
  }
  var ctrl = window.AbortController ? new AbortController() : null;
  var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 3000);
  fetch('https://barberavalibility.webberbryton.workers.dev/availability', { signal: ctrl && ctrl.signal, headers: { Accept: 'application/json' } })
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(function (data) {
      clearTimeout(timer);
      var pb = (data && data.perBarber) || {};
      var shop = clean(data && data.next);
      if (shop) {
        var slot = page.querySelector('[data-ba-avail-slot="shop"]');
        var label = shop.barber ? shop.label + ' with ' + shop.barber : shop.label;
        if (slot) slot.insertAdjacentHTML('beforeend',
          '<a class="ba-avail-shop" href="' + esc(shop.url) + '" data-availability="shop" aria-label="' + esc('Next opening: ' + label + '. Opens booking.') + '" style="margin-left:auto;display:flex;align-items:center;gap:12px;min-height:56px;padding:0 24px;border:2px solid var(--line-strong);text-decoration:none;font:600 13px/16px var(--font-sans);letter-spacing:.18em;text-transform:uppercase;color:var(--on-band);transition:border-color 150ms ease,background-color 150ms ease">' +
          '<span style="opacity:.78;white-space:nowrap">Next opening</span><span style="width:1px;height:20px;background:var(--line-strong)"></span><span style="font-variant-numeric:tabular-nums">' + esc(label) + '</span></a>');
      }
      [['bryton', 'Bryton'], ['connor', 'Connor'], ['elise', 'Elise']].forEach(function (b) {
        var s = clean(pb[b[1]]);
        var after = page.querySelector('[data-ba-avail-after="' + b[0] + '"]');
        if (!s || !after) return;
        after.insertAdjacentHTML('afterend',
          '<a class="ba-avail-barber" href="' + esc(s.url) + '" data-availability="' + b[0] + '" aria-label="' + esc('Next opening with ' + b[1] + ': ' + s.label + '. Opens booking.') + '" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px 16px;min-height:56px;padding:12px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);text-decoration:none;color:var(--ink);font:600 13px/16px var(--font-sans);letter-spacing:.18em;text-transform:uppercase">' +
          '<span><span style="color:var(--ink-muted)">Next opening: </span><span style="font-variant-numeric:tabular-nums">' + esc(s.label) + '</span></span><span>Book with ' + b[1] + '</span></a>');
      });
    })
    .catch(function () { clearTimeout(timer); });
})();
