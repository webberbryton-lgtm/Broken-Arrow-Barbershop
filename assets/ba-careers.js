/* Careers form. Validation and baSend() call ported from the Claude Design page "Careers". */
(function () {
  var form = document.querySelector('[data-ba-form="careers"]');
  if (!form || !window.baForm) return;
  baForm(form, {
    busy: false,
    validate: function (v) {
      var er = {};
      if (!v.name.trim()) er.name = 'Add your name.';
      if (!baEmailOk(v.email)) er.email = 'Add an email address like name@example.com.';
      if (!v.ig.trim()) er.ig = 'Add a link to your work so we can see your cuts.';
      if (!v.stage) er.stage = 'Pick the one that fits you best.';
      return er;
    },
    send: function (v) { return window.baSend ? window.baSend('Careers inquiry', v) : Promise.resolve(false); }
  });
})();
