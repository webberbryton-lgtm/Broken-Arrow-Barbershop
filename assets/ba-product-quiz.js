/* Product quiz. Products, routines, questions and scoring ported from the Claude Design page "Product Quiz".
   Add a product by adding it to PRODUCTS and scores to the answers in QUESTIONS. */
(function () {
  var box = document.querySelector('[data-ba-product-quiz]');
  var start = document.querySelector('[data-ba-pq-start]');
  if (!box || !start) return;
  var PRODUCTS = {
    clay: { name: 'Hair Clay', img: box.getAttribute('data-img-clay'), href: '/products/matte-clay', cta: 'SHOP HAIR CLAY',
      headline: 'Control without looking overdone.',
      body: 'Our low-shine, medium-hold clay gives shorter and medium-length hair the control it needs while keeping the finished style natural. Work a small amount through your hair for definition, texture and an effortless finish.',
      benefits: ['Medium hold', 'Low shine', 'Best for short to medium hair'],
      step: 'Work a small amount through dry hair for control and definition.' },
    cream: { name: 'Cream', img: box.getAttribute('data-img-cream'), href: '/pages/shop#cream', cta: 'SHOP CREAM',
      headline: 'Work with your hair, not against it.',
      body: 'Our lightweight styling cream conditions, smooths and controls frizz while letting your natural texture do its thing. Low hold and a natural matte finish make it especially good for medium and longer styles that should still move.',
      benefits: ['Low hold, natural finish', 'Conditions and tames frizz', 'Best for medium to long hair'],
      step: 'Finish with cream for hydration, frizz control and a natural shape.' },
    salt: { name: 'Sea Salt Spray', img: box.getAttribute('data-img-salt'), href: '/pages/shop#salt', cta: 'SHOP SEA SALT SPRAY',
      headline: 'Give your hair something to work with.',
      body: 'Add texture, volume and that slightly lived-in feel hair gets after a day outside. Use it on its own for an effortless textured style or as a pre-styler before your Clay or Cream.',
      benefits: ['Texture and separation', 'Volume and body', 'Works alone or as a pre-styler'],
      step: 'Spray into damp hair first for volume and texture, then dry.' }
  };
  var ROUTINES = [
    { ids: ['salt', 'clay'], name: 'Sea Salt Spray + Hair Clay', headline: 'Texture + Control',
      body: 'Your hair needs lift and texture, and you want it to stay where you put it. Start with Sea Salt Spray as a pre-styler, then finish with Hair Clay for control and definition.' },
    { ids: ['salt', 'cream'], name: 'Sea Salt Spray + Cream', headline: 'Texture + Movement',
      body: 'Your hair needs more volume and texture but should stay soft and movable. Start with Sea Salt Spray for body, then finish with Cream for hydration, frizz control and a natural shape.' }
  ];
  var QUESTIONS = [
    { id: 'length', title: 'How long is your hair?', options: [
      { t: 'Short', s: 'Above roughly 3 inches', score: { clay: 2 }, why: 'shorter hair' },
      { t: 'Medium', s: 'Roughly 3–6 inches', score: { clay: 1, cream: 1, salt: 1 }, why: 'medium-length hair' },
      { t: 'Long', s: '6+ inches', score: { cream: 2 }, why: 'longer hair' }] },
    { id: 'goal', title: 'What do you want most from your hair?', options: [
      { t: 'More control and hold', score: { clay: 3 }, why: 'more control' },
      { t: 'More texture and volume', score: { salt: 3 }, why: 'more texture and volume' },
      { t: 'Less frizz and more hydration', score: { cream: 3 }, why: 'less frizz' },
      { t: 'A loose, natural look', score: { cream: 2, salt: 1 }, why: 'a loose, natural look' },
      { t: 'A little of everything', score: { clay: 1, cream: 1, salt: 1 }, why: 'a bit of everything' }] },
    { id: 'hold', title: 'How much hold do you want?', options: [
      { t: 'Very little', s: 'I want my hair to move', score: { cream: 2, salt: 1 }, why: 'light hold' },
      { t: 'Medium', s: 'Controlled but still natural', score: { clay: 2 }, why: 'medium hold' },
      { t: 'Texture over hold', s: 'I care more about texture', score: { salt: 2 }, why: 'texture over hold' }] },
    { id: 'finish', title: 'What finish do you prefer?', options: [
      { t: 'Matte', s: 'No shine', score: { clay: 1, cream: 1 }, why: 'a matte finish' },
      { t: 'Low shine', s: 'Natural', score: { clay: 1 }, why: 'a low-shine finish' },
      { t: 'I don’t really care', score: {} }] },
    { id: 'frustration', title: 'What’s your biggest hair frustration?', options: [
      { t: 'It falls flat', score: { salt: 2 }, why: 'hair that falls flat' },
      { t: 'It gets frizzy or dry', score: { cream: 2 }, why: 'frizz and dryness' },
      { t: 'It won’t stay put', score: { clay: 2 }, why: 'hair that won’t stay put' },
      { t: 'It needs more texture', score: { salt: 2 }, why: 'needing more texture' },
      { t: 'I want it to look naturally better', score: { cream: 1, salt: 1 }, why: 'wanting it to look naturally better' }] }
  ];
  var step = -1, answers = [], timer;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function pad(n) { return String(n).padStart(2, '0'); }
  function score() {
    var s = {}; Object.keys(PRODUCTS).forEach(function (k) { s[k] = 0; });
    answers.forEach(function (a, qi) { var o = QUESTIONS[qi].options[a]; if (o) Object.keys(o.score).forEach(function (k) { s[k] += o.score[k]; }); });
    return s;
  }
  function result() {
    var s = score();
    var ranked = Object.keys(s).sort(function (a, b) { return s[b] - s[a]; });
    var top = ranked[0], second = ranked[1];
    var combo = ROUTINES.filter(function (r) { return r.ids.indexOf(top) > -1 && r.ids.indexOf(second) > -1 && s[top] >= 4 && s[second] >= 4 && s[top] - s[second] <= 2; })[0];
    var whys = answers.map(function (a, qi) { return QUESTIONS[qi].options[a] && QUESTIONS[qi].options[a].why; }).filter(Boolean);
    var why = 'You told us you have ' + whys[0] + ', want ' + whys.slice(1, -1).join(', ') + (whys.length > 2 ? ', and' : '') + ' are dealing with ' + whys[whys.length - 1] + '.';
    function card(id, i) { var p = PRODUCTS[id]; return Object.assign({}, p, { alt: 'Broken Arrow Grooming ' + p.name, stepNum: '0' + (i + 1), stepLabel: 'Step ' + (i + 1) }); }
    if (combo) {
      var products = combo.ids.map(card);
      return { isCombo: true, kicker: 'Your routine', name: combo.name, headline: combo.headline, body: combo.body, why: why, products: products,
        benefits: [PRODUCTS[combo.ids[0]].benefits[0], PRODUCTS[combo.ids[1]].benefits[0], PRODUCTS[combo.ids[1]].benefits[2]],
        ctas: products.map(function (p, i) { return { label: p.cta, href: p.href, variant: i === 0 ? 'primary' : 'secondary' }; }) };
    }
    var p = card(top, 0);
    return { isCombo: false, kicker: 'Your match', name: p.name, headline: p.headline, body: p.body, why: why, products: [p], benefits: p.benefits, ctas: [{ label: p.cta, href: p.href, variant: 'primary' }] };
  }
  function questionHtml() {
    var n = QUESTIONS.length, q = QUESTIONS[step];
    return '<section data-screen-label="Quiz / Question" style="background:var(--canvas);min-height:clamp(560px,78vh,820px)">' +
      '<div style="max-width:960px;margin:0 auto;padding:clamp(40px,6vw,80px) clamp(16px,5vw,64px) clamp(56px,8vw,96px);display:flex;flex-direction:column;gap:40px">' +
      '<div style="display:flex;flex-direction:column;gap:14px"><div style="display:flex;justify-content:space-between;align-items:center;gap:16px">' +
      '<button type="button" class="ba-pq-link" data-pq-back style="background:none;border:0;padding:0;min-height:44px;cursor:pointer;font:600 13px/16px var(--font-sans);letter-spacing:.18em;text-transform:uppercase;color:var(--ink)">← Back</button>' +
      '<p class="ba-label" style="color:var(--ink-muted);font-variant-numeric:tabular-nums">' + pad(Math.min(step + 1, n)) + ' / ' + pad(n) + '</p></div>' +
      '<div style="height:2px;background:var(--line)"><div style="height:2px;background:var(--ink);width:' + ((Math.min(step, n) / n) * 100) + '%;transition:width 150ms ease"></div></div></div>' +
      '<h2 class="ba-display" style="font-size:clamp(36px,5vw,64px);max-width:16ch;text-wrap:balance">' + esc(q.title) + '</h2>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:12px">' +
      q.options.map(function (o, i) {
        var sel = answers[step] === i;
        return '<button type="button" class="ba-pq-opt" data-pq-pick="' + i + '" aria-pressed="' + sel + '" style="display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;gap:24px;min-height:136px;padding:22px;text-align:left;cursor:pointer;background:' + (sel ? 'var(--band)' : 'var(--canvas-raised, var(--canvas))') + ';color:' + (sel ? 'var(--on-band)' : 'var(--ink)') + ';border:1px solid ' + (sel ? 'var(--band)' : 'var(--line)') + ';transition:background-color 150ms ease,border-color 150ms ease,color 150ms ease">' +
          '<span class="ba-label" style="color:inherit;opacity:.7">' + String.fromCharCode(65 + i) + '</span><span style="display:flex;flex-direction:column;gap:6px">' +
          '<span style="font:800 22px/26px var(--font-display);letter-spacing:-.02em;text-transform:uppercase">' + esc(o.t) + '</span>' +
          (o.s ? '<span style="font-size:15px;line-height:22px;opacity:.75">' + esc(o.s) + '</span>' : '') + '</span></button>';
      }).join('') + '</div></div></section>';
  }
  function resultHtml() {
    var r = result();
    return '<section data-screen-label="Quiz / Result" style="background:var(--canvas)">' +
      '<div style="max-width:1280px;margin:0 auto;padding:clamp(40px,6vw,80px) clamp(16px,5vw,64px) clamp(56px,8vw,96px);display:flex;flex-wrap:wrap;gap:40px clamp(40px,6vw,80px);align-items:flex-start">' +
      '<div style="flex:1 1 420px;min-width:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:4px">' +
      r.products.map(function (p) {
        return '<figure style="position:relative;aspect-ratio:4/5;background:var(--canvas-sunk);overflow:hidden;margin:0"><div role="img" aria-label="' + esc(p.alt) + '" style="position:absolute;inset:0;background-image:url(&quot;' + esc(p.img) + '&quot;);background-size:cover;background-position:center"></div>' +
          (r.isCombo ? '<p class="ba-label" style="position:absolute;left:0;bottom:0;padding:10px 14px;background:var(--band);color:var(--on-band)">' + esc(p.stepLabel) + '</p>' : '') + '</figure>';
      }).join('') + '</div>' +
      '<div style="flex:1 1 440px;max-width:600px;display:flex;flex-direction:column;gap:24px">' +
      '<p class="ba-label">' + esc(r.kicker) + '</p>' +
      '<h1 class="ba-display" style="font-size:min(clamp(44px,6vw,80px),11vw);letter-spacing:-.045em;line-height:.92">' + esc(r.name) + '</h1>' +
      '<p style="font:800 clamp(22px,2.4vw,28px)/1.15 var(--font-display);letter-spacing:-.02em;text-transform:uppercase">' + esc(r.headline) + '</p>' +
      '<p style="font-size:17px;line-height:28px;text-wrap:pretty">' + esc(r.body) + '</p>' +
      (r.isCombo ? '<ol style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;border-top:2px solid var(--ink)">' + r.products.map(function (p) {
        return '<li style="display:grid;grid-template-columns:48px minmax(0,1fr);gap:12px;padding:18px 0;border-bottom:1px solid var(--line)"><span class="ba-label" style="padding-top:4px">' + esc(p.stepNum) + '</span><span style="display:flex;flex-direction:column;gap:4px"><span style="font:800 20px/24px var(--font-display);letter-spacing:-.02em;text-transform:uppercase">' + esc(p.name) + '</span><span style="font-size:15px;line-height:24px;color:var(--ink-muted)">' + esc(p.step) + '</span></span></li>';
      }).join('') + '</ol>' : '') +
      '<div style="display:flex;flex-direction:column;gap:10px;background:var(--canvas-sunk);padding:20px 22px"><p class="ba-label">Why it fits</p><p style="font-size:15px;line-height:24px;text-wrap:pretty">' + esc(r.why) + '</p></div>' +
      '<ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;border-top:1px solid var(--line)">' + r.benefits.map(function (b) {
        return '<li style="padding:14px 0;border-bottom:1px solid var(--line);font:600 13px/18px var(--font-sans);letter-spacing:.18em;text-transform:uppercase">' + esc(b) + '</li>';
      }).join('') + '</ul>' +
      '<div style="display:flex;flex-wrap:wrap;gap:16px 24px;align-items:center">' + r.ctas.map(function (c) {
        return '<a class="ba-btn ba-btn-' + c.variant + '" href="' + esc(c.href) + '">' + esc(c.label) + '</a>';
      }).join('') +
      '<button type="button" class="ba-pq-link" data-pq-restart style="background:none;border:0;padding:0;min-height:44px;cursor:pointer;font:600 13px/16px var(--font-sans);letter-spacing:.18em;text-transform:uppercase;color:var(--ink);text-decoration:underline;text-decoration-color:var(--green);text-underline-offset:6px">Retake the quiz</button></div>' +
      '<p style="font-size:14px;line-height:22px;color:var(--ink-muted)">Not sure? Ask your barber at your next appointment. They use all of these in the chair.</p>' +
      '</div></div></section>';
  }
  function render() {
    start.hidden = step >= 0;
    box.innerHTML = step < 0 ? '' : step < QUESTIONS.length ? questionHtml() : resultHtml();
    if (step >= 0) window.scrollTo({ top: 0 });
  }
  start.querySelector('[data-ba-pq-begin]').addEventListener('click', function () { step = 0; answers = []; render(); });
  box.addEventListener('click', function (e) {
    var p = e.target.closest('[data-pq-pick]');
    if (p) {
      var i = +p.getAttribute('data-pq-pick'), at = step;
      answers = answers.slice(0, at); answers[at] = i; render();
      clearTimeout(timer); timer = setTimeout(function () { step = at + 1; render(); }, 180);
      return;
    }
    if (e.target.closest('[data-pq-back]')) { step = step - 1; render(); return; }
    if (e.target.closest('[data-pq-restart]')) { step = 0; answers = []; render(); }
  });
})();
