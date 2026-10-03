/* Wholesale order builder: packs, order summary and checkout. Ported from the Claude Design page "Wholesale Shop";
   checkout adds each product to the Shopify cart in units of the pack size, then opens the cart. */
(function () {
  var sec = document.querySelector('[data-ba-wholesale]');
  if (!sec) return;
  var PACK = +sec.getAttribute('data-pack') || 6;
  var packs = {};
  var cards = sec.querySelectorAll('[data-ws-product]');
  function money(cents) { var n = cents / 100; return '$' + (Number.isInteger(n) ? n : n.toFixed(2)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function render() {
    var lines = [], units = 0, retail = 0, total = 0, count = 0;
    cards.forEach(function (c) {
      var id = c.getAttribute('data-variant'), n = packs[id] || 0, unit = +c.getAttribute('data-unit'), r = +c.getAttribute('data-retail');
      var q = c.querySelector('[data-ws-qty]');
      if (q) q.textContent = n ? n + (n === 1 ? ' pack · ' : ' packs · ') + n * PACK + ' units' : 'Add pack';
      if (n) { lines.push({ name: c.getAttribute('data-name'), packs: n, total: money(unit * PACK * n) }); units += n * PACK; retail += r * PACK * n; total += unit * PACK * n; count += n; }
    });
    var ul = sec.querySelector('[data-ws-lines]');
    ul.innerHTML = lines.map(function (l) { return '<li style="display:flex;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid var(--line);font-size:15px;line-height:22px"><span>' + esc(l.name) + ' <span style="color:var(--ink-muted)">× ' + l.packs + '</span></span><span style="font-variant-numeric:tabular-nums;white-space:nowrap">' + l.total + '</span></li>'; }).join('');
    ul.hidden = !lines.length;
    sec.querySelector('[data-ws-empty]').hidden = !!lines.length;
    sec.querySelector('[data-ws-units]').textContent = units;
    sec.querySelector('[data-ws-retail]').textContent = money(retail);
    sec.querySelector('[data-ws-total]').textContent = money(total);
    var btn = sec.querySelector('[data-ws-checkout]');
    btn.disabled = !lines.length; btn.textContent = 'CHECK OUT';
    document.querySelectorAll('[data-ba-cart-count]').forEach(function (a) { a.textContent = 'CART (' + count + ')'; });
  }
  sec.addEventListener('click', function (e) {
    var card = e.target.closest('[data-ws-product]');
    if (card) {
      var id = card.getAttribute('data-variant');
      if (e.target.closest('[data-ws-inc]')) { packs[id] = (packs[id] || 0) + 1; render(); }
      if (e.target.closest('[data-ws-dec]')) { packs[id] = Math.max(0, (packs[id] || 0) - 1); render(); }
      return;
    }
    var btn = e.target.closest('[data-ws-checkout]');
    if (btn && !btn.disabled) {
      var items = Object.keys(packs).filter(function (k) { return packs[k]; }).map(function (k) { return { id: +k, quantity: packs[k] * PACK }; });
      btn.setAttribute('aria-busy', 'true'); btn.disabled = true;
      fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ items: items }) })
        .then(function (r) { if (!r.ok) throw new Error(); location.href = '/cart'; })
        .catch(function () { btn.removeAttribute('aria-busy'); btn.disabled = false; btn.textContent = 'TRY AGAIN'; });
    }
  });
  render();
})();
