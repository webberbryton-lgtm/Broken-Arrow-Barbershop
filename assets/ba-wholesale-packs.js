/* Wholesale accounts buy in packs. Keeps every cart line a multiple of the pack size for customers tagged
   "wholesale" (loaded only for them by snippets/ba-wholesale-packs.liquid). Raising a quantity rounds up to the next
   pack and lowering it rounds down, so 6 -> 7 becomes 12 and 12 -> 11 becomes 6. */
(function () {
  var script = document.currentScript;
  var PACK = +(script && script.getAttribute('data-pack')) || 6;
  var KEY = 'ba-wholesale-cart';
  var origFetch = window.fetch.bind(window);
  var busy = false;

  function load() { try { return JSON.parse(sessionStorage.getItem(KEY) || 'null'); } catch (e) { return null; } }
  function save(cart) {
    var m = {}; cart.items.forEach(function (it) { m[it.key] = it.quantity; });
    try { sessionStorage.setItem(KEY, JSON.stringify(m)); } catch (e) {}
  }
  function target(q, prev) {
    if (q % PACK === 0) return q;
    if (prev != null && q < prev) return Math.floor(q / PACK) * PACK;
    return Math.ceil(q / PACK) * PACK;
  }
  function notice() {
    var d = document.createElement('div');
    d.setAttribute('role', 'status');
    d.style.cssText = 'position:fixed;left:16px;right:16px;bottom:24px;z-index:1000;max-width:480px;margin:0 auto;background:#16171a;color:#f1eee9;padding:14px 18px;font:500 15px/22px Inter,Helvetica,Arial,sans-serif;text-align:center';
    d.textContent = 'Wholesale orders come in packs of ' + PACK + '. We’ve adjusted your cart.';
    document.body.appendChild(d);
  }
  function enforce() {
    if (busy) return Promise.resolve();
    busy = true;
    var last = load();
    return origFetch('/cart.js', { headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (cart) {
        var updates = {}, changed = false;
        cart.items.forEach(function (it) {
          var q = target(it.quantity, last && last[it.key]);
          if (q !== it.quantity) { updates[it.key] = q; changed = true; }
        });
        if (!changed) { save(cart); return; }
        return origFetch('/cart/update.js', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ updates: updates }) })
          .then(function (r) { return r.json(); })
          .then(function (c) { save(c); notice(); setTimeout(function () { location.reload(); }, 1200); });
      })
      .catch(function () {})
      .then(function () { busy = false; });
  }
  // Check after every cart change the theme makes, and once on load (covers cart page form posts).
  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    var p = origFetch(input, init);
    if (!busy && /\/cart\/(add|change|update)(\.js)?(\?|$)/.test(url)) p.then(function () { setTimeout(enforce, 50); }, function () {});
    return p;
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enforce); else enforce();
  window.baWholesalePacks = { target: target, PACK: PACK };
})();
