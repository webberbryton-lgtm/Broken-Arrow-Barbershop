/* FAQ toggles used across the Broken Arrow pages (one open at a time when data-ba-accordion="single"). */
(function () {
  document.querySelectorAll('[data-ba-accordion]').forEach(function (acc) {
    var single = acc.getAttribute('data-ba-accordion') === 'single';
    function set(item, open) {
      var btn = item.querySelector('[data-ba-acc-btn]'), panel = item.querySelector('[data-ba-acc-panel]'), sign = item.querySelector('[data-ba-acc-sign]');
      if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (panel) panel.hidden = !open;
      if (sign) {
        if (sign.hasAttribute('data-rot-open')) sign.style.transform = sign.getAttribute(open ? 'data-rot-open' : 'data-rot-closed');
        else sign.textContent = open ? (acc.getAttribute('data-acc-open') || '–') : (acc.getAttribute('data-acc-closed') || '+');
      }
    }
    acc.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-ba-acc-btn]');
      if (!btn || !acc.contains(btn)) return;
      var item = btn.closest('[data-ba-acc-item]');
      var open = btn.getAttribute('aria-expanded') !== 'true';
      if (single) acc.querySelectorAll('[data-ba-acc-item]').forEach(function (it) { if (it !== item) set(it, false); });
      set(item, open);
    });
  });
})();
