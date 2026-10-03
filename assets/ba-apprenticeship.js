/* Apprenticeship application. Validation and baSend() call ported from the Claude Design page "Apprenticeship Application". */
(function () {
  var form = document.querySelector('[data-ba-form="apprenticeship"]');
  if (!form || !window.baForm) return;
  baForm(form, {
    busy: false,
    validate: function (v) {
      var er = {};
      if (!v.name.trim()) er.name = 'Add your full name.';
      if (v.phone.replace(/\D/g, '').length < 10) er.phone = 'Add a phone number with area code.';
      if (!baEmailOk(v.email)) er.email = 'Add an email address like name@example.com.';
      if (!v.city.trim()) er.city = 'Add your city so we know you can get to the shop in Orem.';
      if (v.why.trim().length < 20) er.why = 'Tell us a little more. A few sentences is plenty.';
      if (!v.commit) er.commit = 'Tick the box to confirm you understand the goal of the program.';
      return er;
    },
    send: function (v) { return window.baSend ? window.baSend('Apprenticeship application', v) : Promise.resolve(false); }
  });
})();
