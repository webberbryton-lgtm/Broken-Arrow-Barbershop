/* Broken Arrow headers (site + store): menu drawer, fixed-header spacer, per-page tab and booking link. */
(function () {
  function init(header) {
    var spacer = header.previousElementSibling && header.previousElementSibling.hasAttribute('data-ba-hdr-spacer') ? header.previousElementSibling : null;
    var btn = header.querySelector('[data-ba-menu]');
    var drawer = btn && document.getElementById(btn.getAttribute('aria-controls'));
    function measure() {
      if (!spacer || header.classList.contains('is-open')) return;
      var h = Math.round(header.getBoundingClientRect().height);
      if (h) { spacer.style.height = h + 'px'; document.documentElement.style.setProperty('--ba-hdr-h', h + 'px'); }
    }
    function setOpen(open) {
      if (!btn || !drawer) return;
      header.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'CLOSE' : 'MENU';
      drawer.hidden = !open;
    }
    if (btn) btn.addEventListener('click', function () { setOpen(!header.classList.contains('is-open')); });
    if (drawer) drawer.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', measure);
    if (window.ResizeObserver) new ResizeObserver(measure).observe(header);
    measure();

    var page = document.querySelector('.ba-page');
    if (page) {
      var key = page.getAttribute('data-ba-active');
      if (key) header.querySelectorAll('[data-ba-key]').forEach(function (a) {
        if (a.getAttribute('data-ba-key') === key) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
      });
      var book = page.getAttribute('data-ba-book');
      if (book) document.querySelectorAll('[data-ba-book]').forEach(function (a) { a.href = book; });
      var label = page.getAttribute('data-ba-book-label');
      if (label) document.querySelectorAll('[data-ba-book-bar]').forEach(function (a) { a.textContent = label; });
    }
  }
  function boot() { document.querySelectorAll('[data-ba-header]').forEach(init); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
