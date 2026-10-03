/* Small form helper for the Broken Arrow pages. It reproduces what the design's React forms did:
   per-field error messages (ba-field-error), a busy submit button, and swapping the form for a
   thank-you block once window.baSend() (assets/ba-send-form.js) reports success. */
(function () {
  function values(form) {
    var v = {};
    form.querySelectorAll('[name]').forEach(function (el) {
      var k = el.name;
      if (el.type === 'radio') { if (el.checked) v[k] = el.value; else if (!(k in v)) v[k] = ''; }
      else if (el.type === 'checkbox') {
        var group = form.querySelectorAll('[name="' + k + '"]').length > 1;
        if (group) { v[k] = v[k] || []; if (el.checked) v[k].push(el.value); }
        else v[k] = el.checked;
      } else v[k] = el.value;
    });
    return v;
  }
  function clear(form, key) {
    form.querySelectorAll('[data-ba-err' + (key ? '="' + key + '"' : '') + ']').forEach(function (p) { p.remove(); });
    form.querySelectorAll((key ? '[name="' + key + '"]' : '[name]')).forEach(function (el) {
      el.removeAttribute('aria-invalid');
      var lab = el.closest('.ba-check'); if (lab) lab.removeAttribute('data-invalid');
      var d = (el.getAttribute('aria-describedby') || '').split(' ').filter(function (x) { return x && !/-err$/.test(x); }).join(' ');
      if (d) el.setAttribute('aria-describedby', d); else el.removeAttribute('aria-describedby');
    });
  }
  function show(form, key, msg) {
    var els = form.querySelectorAll('[name="' + key + '"]');
    if (!els.length) return;
    var el = els[0], p = document.createElement('p');
    p.className = 'ba-field-error'; p.setAttribute('data-ba-err', key); p.textContent = msg;
    if (el.type === 'radio' || (el.type === 'checkbox' && els.length > 1)) {
      var fs = el.closest('fieldset'); (fs || el.parentNode).appendChild(p);
    } else if (el.type === 'checkbox') {
      var lab = el.closest('.ba-check'); lab.setAttribute('data-invalid', 'true'); lab.insertAdjacentElement('afterend', p);
    } else {
      p.id = (el.id || key) + '-err';
      el.setAttribute('aria-invalid', 'true');
      el.setAttribute('aria-describedby', ((el.getAttribute('aria-describedby') || '') + ' ' + p.id).trim());
      el.insertAdjacentElement('afterend', p);
    }
  }
  function scrollTop(el) {
    var sec = el.closest('section') || el;
    var hdr = document.querySelector('[data-hdr]');
    var off = (hdr ? hdr.getBoundingClientRect().height : 120) + 16;
    window.scrollTo({ top: Math.max(0, sec.getBoundingClientRect().top + window.scrollY - off), behavior: 'smooth' });
  }
  window.baForm = function (form, opts) {
    if (!form) return;
    form.noValidate = true;
    form.addEventListener('input', function (e) { if (e.target.name) clear(form, e.target.name); });
    form.addEventListener('change', function (e) { if (e.target.name) clear(form, e.target.name); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = values(form);
      clear(form);
      var errs = opts.validate ? opts.validate(v) : {};
      var keys = Object.keys(errs);
      keys.forEach(function (k) { show(form, k, errs[k]); });
      if (keys.length) {
        var first = form.querySelector('[aria-invalid="true"], .ba-check[data-invalid="true"] input, [data-ba-err]');
        if (first && first.focus) first.focus({ preventScroll: false });
        return;
      }
      var btn = form.querySelector('[type="submit"]');
      if (btn && opts.busy !== false) { btn.setAttribute('aria-busy', 'true'); btn.disabled = true; }
      Promise.resolve(opts.send(v)).then(function (ok) {
        if (btn) { btn.removeAttribute('aria-busy'); btn.disabled = false; }
        if (!ok) return;
        var done = opts.done || (form.parentNode && form.parentNode.querySelector('[data-ba-done]'));
        if (done) {
          var first = (String(v.name || '').trim().split(' ')[0]) || 'there';
          done.querySelectorAll('[data-ba-first]').forEach(function (s) { s.textContent = first; });
          form.hidden = true; done.hidden = false;
          scrollTop(done);
        }
        if (opts.after) opts.after(v);
      });
    });
  };
  window.baEmailOk = function (s) { return /^\S+@\S+\.\S+$/.test(s || ''); };
})();
