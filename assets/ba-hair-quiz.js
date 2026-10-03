/* "Is a hair system right for you?" quiz. Ported from the Claude Design page "Hair Replacement". */
(function () {
  var box = document.querySelector('[data-ba-hair-quiz]');
  if (!box) return;
  var C = 'https://book.squareup.com/appointments/a9bstwwcb18jn4/location/LFBJAQ8MMHY0Z/services/2J5WIMODVBVMZAOQKH2UIMHU';
  var Q = [
    ['How much hair have you lost?', [['A little at the temples', 0], ['Thinning on top or at the crown', 1], ['Receding and thinning on top', 2], ['Mostly bald on top', 4]]],
    ['How long has it been changing?', [['Just started in the last year', 0], ['1–3 years', 1], ['More than 3 years', 1], ['Not sure', 0]]],
    ['What have you tried so far?', [['Nothing yet', 0], ['Minoxidil or finasteride', 1], ['Fibers, concealers or wearing a hat', 1], ['A hair transplant', 2]]],
    ['How much does it bother you?', [['A little', 0], ['A fair amount', 1], ['I think about it most days', 2]]],
    ['What do you want?', [['Make the hair I have look better', 0], ['Not sure yet', 1], ['A full head of hair again', 2]]],
    ['A system needs upkeep every 2–4 weeks, in the shop or at home. Would you keep that up?', [['Yes, in the shop', 0, 'shop'], ['Yes, I’d learn to do it at home', 0, 'home'], ['Maybe', 0, 'maybe'], ['Probably not', 0, 'no']]],
    ['Wearing each system about 6 months, your first year can cost as little as $5.07 a day. Does that fit your budget?', [['Yes', 0], ['Maybe', 0], ['Not right now', 0, 'nobudget']]]
  ];
  var a = [];
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function vals() {
    var i = a.length;
    var doubt = 'If you’re in doubt, just book a free consultation. It’s no pressure, and you’ll leave knowing your options.';
    if (i < Q.length) return { asking: true, step: 'Question ' + (i + 1) + ' of ' + Q.length, q: Q[i][0], canBack: i > 0, opts: Q[i][1] };
    var pick = function (n) { return Q[n][1][a[n]]; };
    var score = [0, 1, 2, 3, 4].reduce(function (t, n) { return t + pick(n)[1]; }, 0);
    var upkeep = pick(5)[2], budget = pick(6)[2];
    var note = upkeep === 'home' ? 'Doing your own maintenance at home is the lowest-cost way to wear a system, as low as $5.07 a day. We’ll show you how.' : upkeep === 'shop' ? 'Maintenance with us is $175 a visit, every 2–4 weeks.' : 'We’ll go through maintenance, in the shop or at home, at the consultation.';
    var base = { done: true, doubt: doubt };
    var haircut = { primary: 'BOOK A SIGNATURE HAIRCUT', primaryHref: 'https://book.squareup.com/appointments/vmqe6cigusj6yl/location/LFBJAQ8MMHY0Z/services/COXNLW42DT56FAK7ZESHNUVQ', secondary: 'Book a free consultation', secondaryHref: C };
    var o = function () { var r = {}; for (var k = 0; k < arguments.length; k++) for (var p in arguments[k]) r[p] = arguments[k][p]; return r; };
    if (upkeep === 'no' || budget === 'nobudget') return o(base, haircut, { title: 'Start with the right haircut for now.', body: 'A hair system only works if it’s kept up, and it’s an ongoing cost. Until that fits, a Signature Haircut with Bryton is the best next step. He specializes in receding hairlines and thinning hair.', note: 'A haircut can change how thinning hair looks. It won’t stop or reverse hair loss.' });
    if (score <= 3 || pick(0)[1] === 0) return o(base, haircut, { title: 'Book a Signature Haircut with Bryton.', body: 'You probably don’t need a hair system yet. Bryton specializes in receding hairlines and thinning hair, and the Signature Haircut gives him time to look at your hairline and density and cut something that works with it.', note: 'A haircut can change how thinning hair looks. It won’t stop or reverse hair loss. If it progresses, the hair system consultation is free.' });
    if (score <= 5) return o(base, { price: true, title: 'You could be a good candidate.', body: 'Your answers sit in between. Some clients at this stage do well with the right haircut, others are ready for a system. A free consultation is the quickest way to find out. Bryton will look at your hair and tell you straight.', note: note, primary: 'BOOK A FREE CONSULTATION', primaryHref: C, secondary: 'Or book a Signature Haircut', secondaryHref: 'https://book.squareup.com/appointments/vmqe6cigusj6yl/location/LFBJAQ8MMHY0Z/services' });
    return o(base, { price: true, title: 'You’re a good fit for a hair system.', body: pick(4)[1] === 2 ? 'You want a full head of hair back, and a non-surgical hair system is how we get you there. At the free consultation Bryton looks at your hair loss, matches color and density, and tells you exactly what it will look like.' : 'With this much hair loss, a haircut alone won’t get you far. A hair system gives you hair to cut and style again. At the free consultation Bryton looks at your hair loss, matches color, and tells you what to expect.', note: note, primary: 'BOOK A FREE CONSULTATION', primaryHref: C, secondary: 'See prices', secondaryHref: '#prices' });
  }
  function render() {
    var v = vals();
    if (v.asking) {
      box.innerHTML = '<div style="display:flex;flex-direction:column;gap:20px;border-top:2px solid var(--ink);padding-top:24px">' +
        '<div style="display:flex;justify-content:space-between;gap:16px"><p class="ba-label">' + esc(v.step) + '</p>' +
        (v.canBack ? '<button type="button" data-hq-back style="background:none;border:0;padding:0;min-height:44px;cursor:pointer;font:600 13px/16px var(--font-sans);letter-spacing:.18em;text-transform:uppercase;color:var(--ink)">← Back</button>' : '') + '</div>' +
        '<h3 style="font:800 clamp(24px,2.8vw,34px)/1.1 var(--font-display);letter-spacing:-.02em;text-transform:uppercase;text-wrap:balance">' + esc(v.q) + '</h3>' +
        '<div style="display:flex;flex-direction:column;border-top:1px solid var(--line)">' +
        v.opts.map(function (o, k) { return '<button type="button" class="ba-hq-opt" data-hq-pick="' + k + '" style="display:flex;justify-content:space-between;align-items:center;gap:16px;min-height:64px;padding:16px 0;background:none;border:0;border-bottom:1px solid var(--line);cursor:pointer;text-align:left;font:500 17px/26px var(--font-sans);color:var(--ink)"><span>' + esc(o[0]) + '</span><span aria-hidden="true" class="ba-label">→</span></button>'; }).join('') +
        '</div></div>';
    } else {
      box.innerHTML = '<div style="display:flex;flex-direction:column;gap:20px;background:var(--band);color:var(--on-band);padding:clamp(28px,4vw,48px)">' +
        '<p class="ba-label" style="color:var(--on-band);opacity:.78">Our recommendation</p>' +
        '<h3 class="ba-display" style="color:var(--on-band);font-size:clamp(32px,4vw,52px);max-width:16ch">' + esc(v.title) + '</h3>' +
        (v.price ? '<p class="ba-label" style="color:var(--on-band)">As low as $5.07 a day · Skip the energy drinks. Get a non-surgical hair system.</p>' : '') +
        '<p style="font-size:17px;line-height:28px;opacity:.85;max-width:560px;text-wrap:pretty">' + esc(v.body) + '</p>' +
        '<p style="font-size:15px;line-height:24px;opacity:.78;max-width:560px;text-wrap:pretty">' + esc(v.note) + '</p>' +
        '<p style="font-size:15px;line-height:24px;max-width:560px;border-top:1px solid var(--line-strong);padding-top:16px;text-wrap:pretty">' + esc(v.doubt) + '</p>' +
        '<div style="display:flex;flex-wrap:wrap;gap:16px 24px;align-items:center;padding-top:8px">' +
        '<a href="' + esc(v.primaryHref) + '" class="ba-btn ba-btn-primary ba-on-dark">' + esc(v.primary) + '</a>' +
        '<a href="' + esc(v.secondaryHref) + '" class="ba-btn ba-btn-text ba-on-dark">' + esc(v.secondary) + '</a>' +
        '<button type="button" data-hq-restart style="background:none;border:0;padding:0;min-height:44px;cursor:pointer;font:600 13px/16px var(--font-sans);letter-spacing:.18em;text-transform:uppercase;color:var(--on-band);opacity:.78">Start over</button>' +
        '</div></div>';
    }
  }
  function scrollToQuiz() {
    var el = document.getElementById('quiz'); if (!el) return;
    var r = el.getBoundingClientRect(); var hdr = document.querySelector('[data-hdr="site"]');
    var off = hdr ? hdr.getBoundingClientRect().height : 120;
    if (r.top < off || r.top > window.innerHeight * 0.6) window.scrollTo({ top: Math.max(0, r.top + window.scrollY - off - 8), behavior: 'smooth' });
  }
  box.addEventListener('click', function (e) {
    var p = e.target.closest('[data-hq-pick]');
    if (p) { a.push(+p.getAttribute('data-hq-pick')); render(); scrollToQuiz(); return; }
    if (e.target.closest('[data-hq-back]')) { a.pop(); render(); scrollToQuiz(); return; }
    if (e.target.closest('[data-hq-restart]')) { a = []; render(); scrollToQuiz(); }
  });
  render();
})();
