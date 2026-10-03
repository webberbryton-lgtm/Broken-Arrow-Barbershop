/* Wholesale sign in + application. Validation ported from the Claude Design page "Wholesale".
   Sign in uses Shopify customer accounts; the application creates a Shopify customer tagged "wholesale-pending"
   (approve it by changing the tag to "wholesale" in Admin > Customers) and, as in the design, also emails the
   answers to the shop with baSend(). */
(function () {
  if (!window.baForm) return;
  var CREDS = { ein: 'EIN', barber: 'Barber license', cosmo: 'Cosmetology license' };
  var login = document.getElementById('BaWholesaleLogin');
  if (login) baForm(login, {
    validate: function (v) {
      var er = {};
      if (!baEmailOk(v['customer[email]'])) er['customer[email]'] = 'Add the email you applied with.';
      if (!v['customer[password]']) er['customer[password]'] = 'Add your password.';
      return er;
    },
    send: function () { HTMLFormElement.prototype.submit.call(login); return false; }
  });

  var app = document.getElementById('BaWholesaleApply');
  if (!app) return;
  var credBox = app.querySelector('[data-ba-cred]');
  var credField = app.querySelector('[data-ba-credfield]');
  var stateField = app.querySelector('[data-ba-statefield]');
  function cred() { var c = app.querySelector('[data-cred]:checked'); return c ? c.getAttribute('data-cred') : 'barber'; }
  function syncCred() {
    var c = cred();
    if (credField) {
      var lab = credField.querySelector('.ba-field-label');
      if (lab) lab.firstChild.nodeValue = c === 'ein' ? 'EIN' : CREDS[c] + ' number';
      var hint = credField.querySelector('.ba-field-hint');
      if (hint) hint.textContent = c === 'ein' ? 'Your 9-digit federal Employer Identification Number.' : 'As it appears on your license.';
    }
    if (stateField) { stateField.hidden = c === 'ein'; if (c === 'ein') stateField.querySelector('input').value = ''; }
  }
  if (credBox) credBox.addEventListener('change', function (e) {
    if (e.target.hasAttribute('data-cred')) { var n = credField && credField.querySelector('input'); if (n) n.value = ''; syncCred(); }
  });
  var barber = app.querySelector('[data-cred="barber"]'); if (barber && !app.querySelector('[data-cred]:checked')) barber.checked = true;
  syncCred();

  var done = app.parentNode.querySelector('[data-ba-done]');
  try {
    if (/[?&]applied=1/.test(location.search) && done) {
      var saved = JSON.parse(sessionStorage.getItem('ba-wholesale-applied') || '{}');
      done.querySelectorAll('[data-ba-first]').forEach(function (s) { s.textContent = saved.first || 'there'; });
      done.querySelectorAll('[data-ba-cred-name]').forEach(function (s) { s.textContent = saved.cred || 'license'; });
      done.querySelectorAll('[data-ba-applied-email]').forEach(function (s) { s.textContent = saved.email || 'you'; });
      app.hidden = true; done.hidden = false;
    }
  } catch (e) {}

  baForm(app, {
    validate: function (v) {
      var er = {}, c = cred();
      if (!v['customer[note][Business name]'].trim()) er['customer[note][Business name]'] = 'Add your business name.';
      if (!v.ba_name.trim()) er.ba_name = 'Add your name so we know who to contact.';
      if (!baEmailOk(v['customer[email]'])) er['customer[email]'] = 'Add an email address like name@example.com.';
      if (v['customer[note][Phone]'].replace(/\D/g, '').length < 10) er['customer[note][Phone]'] = 'Add a phone number with area code.';
      if (!v['customer[note][Business address]'].trim()) er['customer[note][Business address]'] = 'Add your business address.';
      if (!v['customer[note][Business type]']) er['customer[note][Business type]'] = 'Pick the kind of business.';
      var num = v['customer[note][Credential number]'] || '';
      if (c === 'ein' && num.replace(/\D/g, '').length !== 9) er['customer[note][Credential number]'] = 'An EIN is 9 digits, like 12-3456789.';
      if (c !== 'ein' && num.trim().length < 3) er['customer[note][Credential number]'] = 'Add your license number as it appears on your license.';
      if (c !== 'ein' && !(v['customer[note][License state]'] || '').trim()) er['customer[note][License state]'] = 'Add the state that issued your license.';
      if (v['customer[password]'].length < 8) er['customer[password]'] = 'Use at least 8 characters.';
      if (v.ba_confirm !== v['customer[password]']) er.ba_confirm = 'The passwords don’t match.';
      if (!v['customer[note][Agreed to packs of 6]']) er['customer[note][Agreed to packs of 6]'] = 'Tick the box to confirm you understand the pack sizes.';
      return er;
    },
    send: function (v) {
      var parts = v.ba_name.trim().split(/\s+/);
      app.querySelector('[name="customer[first_name]"]').value = parts[0] || '';
      app.querySelector('[name="customer[last_name]"]').value = parts.slice(1).join(' ');
      var c = cred();
      try { sessionStorage.setItem('ba-wholesale-applied', JSON.stringify({ first: parts[0], email: v['customer[email]'], cred: CREDS[c].toLowerCase().replace('ein', 'EIN') })); } catch (e) {}
      var data = {};
      Object.keys(v).forEach(function (k) { if (!/password|ba_confirm/.test(k)) data[k.replace(/^customer\[(note\]\[)?|\]$/g, '').replace(/\]$/, '')] = Array.isArray(v[k]) ? v[k].join(', ') : v[k]; });
      var email = window.baSend ? window.baSend('Wholesale application', data) : Promise.resolve(true);
      var timeout = new Promise(function (r) { setTimeout(r, 2500); });
      return Promise.race([email, timeout]).then(function () { HTMLFormElement.prototype.submit.call(app); return false; });
    }
  });
})();
