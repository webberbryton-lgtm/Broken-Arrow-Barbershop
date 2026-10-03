/* "Get notified" email forms (Education). The design left a TODO to connect Shopify's email signup with the
   tag education-notify; this posts the address to Shopify Customers with that tag, then shows "You’re on the list." */
(function () {
  document.querySelectorAll('[data-ba-form="education-notify"]').forEach(function (form) {
    var tag = form.getAttribute('data-ba-tag') || 'education-notify';
    form.noValidate = true;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('[name="email"]');
      var old = form.querySelector('[data-ba-err]'); if (old) old.remove();
      if (!/^\S+@\S+\.\S+$/.test(input.value)) {
        var p = document.createElement('p');
        p.setAttribute('data-ba-err', ''); p.style.cssText = 'flex:1 1 100%;font-size:15px;line-height:24px;color:var(--on-band)';
        p.textContent = 'Add an email address like name@example.com.';
        form.appendChild(p); return;
      }
      var body = new URLSearchParams({ form_type: 'customer', utf8: '✓', 'contact[email]': input.value, 'contact[tags]': 'newsletter,' + tag, 'contact[accepts_marketing]': 'true' });
      fetch('/contact#contact_form', { method: 'POST', body: body, headers: { Accept: 'text/html' } }).catch(function () {});
      var done = form.parentNode.querySelector('[data-ba-done]');
      form.hidden = true; if (done) done.hidden = false;
    });
  });
  document.querySelectorAll('input[name="email"]').forEach(function (i) { i.addEventListener('input', function () { var f = i.form, o = f && f.querySelector('[data-ba-err]'); if (o) o.remove(); }); });
})();
