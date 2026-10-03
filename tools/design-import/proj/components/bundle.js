/* @ds-bundle: {"format":4,"namespace":"BrokenArrow","components":[{"name":"Button"},{"name":"SectionHeader"},{"name":"ServiceList"},{"name":"TextField"},{"name":"Checkbox"}]} */
(function(){
  var R = window.React, h = R.createElement;
  function cx(){ return Array.prototype.filter.call(arguments, Boolean).join(' '); }
  function omit(p, keys){ var o = {}; for (var k in p) if (keys.indexOf(k) < 0) o[k] = p[k]; return o; }
  var uid = 0; function useId(given){ var r = R.useRef(null); if (!r.current) r.current = given || ('ba-' + (++uid)); return r.current; }

  function Button(p){
    var variant = p.variant || 'primary', tone = p.tone || 'light';
    var rest = omit(p, ['variant','tone','className','children','href','loading','state']);
    rest.className = cx('ba-btn', 'ba-btn-' + variant, tone === 'dark' && 'ba-on-dark', p.state && ('is-' + p.state), p.className);
    if (p.loading) { rest['aria-busy'] = 'true'; rest.disabled = true; }
    if (p.href && !rest.disabled) { rest.href = p.href; return h('a', rest, p.children); }
    if (!rest.type) rest.type = 'button';
    return h('button', rest, p.children);
  }

  function pad(n){ return (n < 10 ? '0' : '') + n; }
  function SectionHeader(p){
    return h('header', { className: cx('ba-sh', p.tone === 'dark' && 'ba-on-dark', p.className) },
      h('div', { className: 'ba-sh-text' },
        h('p', { className: 'ba-label' }, pad(p.index || 1) + ' / ' + p.label),
        h(p.as || 'h2', { className: 'ba-display' }, p.title)),
      p.action ? h('div', { className: 'ba-sh-action' }, p.action) : null);
  }

  function ServiceList(p){
    var items = p.items || [], dark = p.tone === 'dark';
    return h('ol', { className: cx('ba-services', dark && 'ba-on-dark', p.className) },
      items.map(function(it, i){
        return h('li', { key: it.name || i, className: 'ba-service' },
          h('span', { className: 'ba-service-n' }, pad(i + 1) + ' /'),
          h('h3', { className: 'ba-service-name' }, it.name),
          it.description ? h('p', { className: 'ba-service-desc' }, it.description) : null,
          (it.price || it.duration || it.bookHref) ? h('div', { className: 'ba-service-meta' },
            it.price ? h('span', { className: 'ba-price' }, it.price) : null,
            it.duration ? h('span', null, it.duration) : null,
            it.bookHref ? h(Button, { variant: 'text', tone: dark ? 'dark' : 'light', href: it.bookHref, className: 'ba-service-book', 'aria-label': (it.bookLabel || 'Book now') + ': ' + it.name }, it.bookLabel || 'Book now') : null) : null);
      }));
  }

  function TextField(p){
    var id = useId(p.id), hintId = id + '-hint', errId = id + '-err';
    var describedBy = cx(p.hint && hintId, p.error && errId) || undefined;
    var inputProps = omit(p, ['label','hint','error','multiline','className','state','id']);
    inputProps.id = id;
    inputProps.className = cx('ba-field-input', p.state && ('is-' + p.state));
    if (p.error) inputProps['aria-invalid'] = 'true';
    if (describedBy) inputProps['aria-describedby'] = describedBy;
    return h('div', { className: cx('ba-field', p.className) },
      h('label', { className: 'ba-field-label', htmlFor: id }, p.label, p.required ? h('span', { className: 'ba-field-req', 'aria-hidden': 'true' }, '*') : null),
      p.hint ? h('p', { className: 'ba-field-hint', id: hintId }, p.hint) : null,
      h(p.multiline ? 'textarea' : 'input', inputProps),
      p.error ? h('p', { className: 'ba-field-error', id: errId }, p.error) : null);
  }

  function Checkbox(p){
    var inputProps = omit(p, ['label','type','className','state','invalid']);
    inputProps.type = p.type === 'radio' ? 'radio' : 'checkbox';
    return h('label', { className: cx('ba-check', p.type === 'radio' && 'ba-check-radio', p.state && ('is-' + p.state), p.className), 'data-invalid': p.invalid ? 'true' : undefined },
      h('input', inputProps),
      h('span', { className: 'ba-check-box', 'aria-hidden': 'true' }),
      h('span', null, p.label));
  }

  window.BrokenArrow = Object.assign(window.BrokenArrow || {}, { Button: Button, SectionHeader: SectionHeader, ServiceList: ServiceList, TextField: TextField, Checkbox: Checkbox });
})();
