/* Topic tabs that filter a list of cards (Journal, Learn, Shop). Ported from the Claude Design pages. */
(function () {
  document.querySelectorAll('[data-ba-filter]').forEach(function (tabs) {
    var style = tabs.getAttribute('data-ba-filter');
    var page = tabs.closest('.ba-page') || document;
    var items = page.querySelectorAll('[data-ba-cat]');
    function set(id) {
      tabs.querySelectorAll('[data-ba-tab]').forEach(function (b) {
        var on = b.getAttribute('data-ba-tab') === id;
        b.setAttribute('aria-selected', on ? 'true' : 'false');
        if (style === 'pill') {
          b.style.background = on ? 'var(--ink)' : 'transparent';
          b.style.color = on ? 'var(--canvas)' : 'var(--ink)';
          b.style.borderColor = on ? 'var(--ink)' : 'var(--line-strong)';
        } else {
          b.style.borderBottomColor = on ? 'var(--green)' : 'transparent';
        }
      });
      items.forEach(function (it) { it.hidden = !(id === 'all' || it.getAttribute('data-ba-cat') === id); });
    }
    tabs.addEventListener('click', function (e) { var b = e.target.closest('[data-ba-tab]'); if (b) set(b.getAttribute('data-ba-tab')); });
    var hashIds = (tabs.getAttribute('data-ba-filter-hash') || '').split(',').filter(Boolean);
    if (hashIds.length) {
      var onHash = function () { var h = (location.hash || '').slice(1); set(hashIds.indexOf(h) > -1 ? h : 'all'); };
      window.addEventListener('hashchange', onHash); onHash();
    }
  });
})();
