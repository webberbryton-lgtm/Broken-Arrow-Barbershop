/* Free haircut application. Validation and baSend() call ported from the Claude Design page "Free Haircut".
   It also adds the applicant to Shopify Customers (tag free-haircut-applicant), as in the design's shopify/ folder. */
(function () {
  var form = document.querySelector('[data-ba-form="free-haircut"]');
  if (!form || !window.baForm) return;
  baForm(form, {
    validate: function (v) {
      var er = {};
      if (!v.name.trim()) er.name = 'Add your name so we know who applied.';
      if (!baEmailOk(v.email)) er.email = 'Add an email so we can contact you if you’re picked.';
      if (v.adult !== 'Yes') er.adult = 'You need to be 18 or older to apply. A parent or guardian can apply for you.';
      if (!v.city.trim()) er.city = 'Add your city so we know you can get to the shop in Orem.';
      if (!v.want.trim()) er.want = 'Tell us a little about what you want from your haircut.';
      if (!v.last.trim()) er.last = 'Add roughly when your last haircut was.';
      if (!v.big) er.big = 'Tick this to confirm you want a big change. We don’t film clean-up cuts.';
      if (!v.agree) er.agree = 'Tick the filming agreement to apply.';
      return er;
    },
    send: function (v) {
      var data = Object.assign({}, v, { hair: (v.hair || []).join(', ') });
      return window.baSend ? window.baSend('Free haircut application', data) : Promise.resolve(false);
    },
    after: function (v) {
      try {
        var name = (v.name || '').trim().split(' ');
        var body = new URLSearchParams({ form_type: 'customer', utf8: '✓', 'contact[email]': v.email, 'contact[first_name]': name[0] || '', 'contact[last_name]': name.slice(1).join(' '), 'contact[tags]': 'free-haircut-applicant' });
        navigator.sendBeacon('/contact#contact_form', body);
      } catch (e) {}
    }
  });
})();
