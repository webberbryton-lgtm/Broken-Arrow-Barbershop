/* Matte clay product page: photo thumbnails, set picker, one-time vs subscribe, delivery frequency and add to cart.
   Ported from the Claude Design page "Product - Matte Clay". The design notes that bundle discounts and the
   subscribe rate are placeholders until they're set in Shopify. When this page is the product template and the
   product has variants, "Add to cart" adds variant 1, 2 or 3 for the chosen set (and a selling plan when
   "Subscribe and save" is chosen and the product has one). */
(function () {
  var page = document.querySelector('[data-ba-page="matte-clay"]');
  if (!page) return;
  var productEl = page.parentNode.querySelector('[data-mc-product]') || document.querySelector('[data-mc-product]');
  var product = null;
  try { product = productEl ? JSON.parse(productEl.textContent) : null; } catch (e) {}

  var SETS = [{ full: 28, price: 28 }, { full: 56, price: 50.4 }, { full: 84, price: 71.4 }];
  var SUB = 0.20, FREQ = ['30 days', '60 days', '90 days'];
  var st = { set: 0, sub: false, freq: 1, photo: 0, justAdded: false };
  function money(n) { return '$' + (Math.round(n * 100) % 100 ? n.toFixed(2) : String(Math.round(n))); }
  var $ = function (s) { return page.querySelector(s); };
  var $$ = function (s) { return page.querySelectorAll(s); };

  var thumbs = $$('[data-mc-thumb]');
  var main = $('[data-mc-photo]');
  var dotHtml = '<span style="width:10px;height:10px;border-radius:50%;background:var(--ink)"></span>';
  var t;

  function renderPhoto() {
    var th = thumbs[st.photo]; if (!th || !main) return;
    var img = th.querySelector('div[aria-hidden="true"]');
    var label = th.getAttribute('aria-label') || '';
    main.innerHTML = img
      ? '<div role="img" aria-label="' + ('Broken Arrow Grooming ' + label.toLowerCase()).replace(/"/g, '&quot;') + '" style="position:absolute;inset:0;background-image:' + img.style.backgroundImage.replace(/"/g, '&quot;') + ';background-size:cover;background-position:center"></div>'
      : '<img src="' + main.getAttribute('data-mark') + '" alt="" style="width:40px;opacity:.9"><p class="ba-label" style="color:var(--ink-muted)">' + label + '</p>';
    thumbs.forEach(function (b, i) { b.setAttribute('aria-pressed', i === st.photo ? 'true' : 'false'); b.style.borderColor = i === st.photo ? 'var(--ink)' : 'transparent'; });
  }
  function render() {
    var cur = SETS[st.set], sub = cur.price * (1 - SUB), now = st.sub ? sub : cur.price;
    var head = $('[data-mc-head]'); if (head) head.textContent = money(now) + (st.sub ? ' every ' + FREQ[st.freq] : '');
    $$('[data-mc-set]').forEach(function (b, i) {
      var on = i === st.set;
      b.setAttribute('aria-checked', on ? 'true' : 'false');
      b.style.background = on ? 'var(--ink)' : 'var(--canvas)'; b.style.color = on ? 'var(--canvas)' : 'var(--ink)'; b.style.borderColor = on ? 'var(--ink)' : 'var(--line-strong)';
    });
    var once = $('[data-mc-once]'), subBtn = $('[data-mc-sub]'), box = $('[data-mc-subbox]');
    if (once) { once.setAttribute('aria-checked', st.sub ? 'false' : 'true'); once.style.border = st.sub ? '1px solid var(--line-strong)' : '2px solid var(--ink)'; }
    if (subBtn) subBtn.setAttribute('aria-checked', st.sub ? 'true' : 'false');
    if (box) box.style.border = st.sub ? '2px solid var(--ink)' : '1px solid var(--line-strong)';
    var d1 = $('[data-mc-dot="once"]'), d2 = $('[data-mc-dot="sub"]');
    if (d1) d1.innerHTML = st.sub ? '' : dotHtml;
    if (d2) d2.innerHTML = st.sub ? dotHtml : '';
    $$('[data-mc-onceprice], [data-mc-subwas]').forEach(function (e) { e.textContent = money(cur.price); });
    var sp = $('[data-mc-subprice]'); if (sp) sp.textContent = money(sub);
    $$('[data-mc-freq]').forEach(function (b, i) {
      var on = i === st.freq;
      b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.style.background = on ? 'var(--ink)' : 'transparent'; b.style.color = on ? 'var(--canvas)' : 'var(--ink)';
    });
    var add = $('[data-mc-add]'); if (add) add.textContent = st.justAdded ? 'ADDED TO CART' : 'ADD TO CART — ' + money(now);
  }
  function updateCartCount() {
    fetch('/cart.js', { headers: { Accept: 'application/json' } }).then(function (r) { return r.json(); }).then(function (c) {
      document.querySelectorAll('[data-ba-cart-count]').forEach(function (a) { a.textContent = 'CART (' + c.item_count + ')'; });
    }).catch(function () {});
  }
  function addToCart() {
    var variant = product && product.variants && (product.variants[st.set] || product.variants[0]);
    var flash = function () { st.justAdded = true; render(); clearTimeout(t); t = setTimeout(function () { st.justAdded = false; render(); }, 2000); };
    if (!variant) { flash(); return; }
    var item = { id: variant.id, quantity: 1 };
    if (st.sub && product.selling_plan_groups && product.selling_plan_groups.length) {
      var plans = product.selling_plan_groups[0].selling_plans || [];
      var plan = plans[st.freq] || plans[0];
      if (plan) item.selling_plan = plan.id;
    }
    fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ items: [item] }) })
      .then(function (r) { if (!r.ok) throw new Error('add failed'); flash(); updateCartCount(); })
      .catch(function () { var add = $('[data-mc-add]'); if (add) add.textContent = 'SOLD OUT'; });
  }
  page.addEventListener('click', function (e) {
    var b;
    if ((b = e.target.closest('[data-mc-thumb]'))) { st.photo = +b.getAttribute('data-mc-thumb'); renderPhoto(); return; }
    if ((b = e.target.closest('[data-mc-set]'))) { st.set = +b.getAttribute('data-mc-set'); render(); return; }
    if (e.target.closest('[data-mc-once]')) { st.sub = false; render(); return; }
    if (e.target.closest('[data-mc-sub]')) { st.sub = true; render(); return; }
    if ((b = e.target.closest('[data-mc-freq]'))) { st.freq = +b.getAttribute('data-mc-freq'); st.sub = true; render(); return; }
    if (e.target.closest('[data-mc-add]')) addToCart();
  });
  render();
})();
