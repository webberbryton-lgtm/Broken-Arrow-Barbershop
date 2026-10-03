/* @ds-bundle: {"format":4,"namespace":"BrokenArrowDesignSystem_3f23b6","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"ServiceList","sourcePath":"components/content/ServiceList.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"SectionHeader","sourcePath":"components/layout/SectionHeader.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"b68db5eee7a2","components/content/ServiceList.jsx":"569a172f8053","components/forms/Checkbox.jsx":"6bbac4ba4540","components/forms/TextField.jsx":"8941ddf1e495","components/layout/SectionHeader.jsx":"5680842232d3","ui_kits/website/Apply.jsx":"428ff97b5253","ui_kits/website/Barber.jsx":"b9668a975df2","ui_kits/website/Chrome.jsx":"4927bd5cc81f","ui_kits/website/HairReplacement.jsx":"bf332ca30395","ui_kits/website/Home.jsx":"c999c24755c3","ui_kits/website/Products.jsx":"3cdc81b51aa6"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BrokenArrowDesignSystem_3f23b6 = window.BrokenArrowDesignSystem_3f23b6 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function cx(...a) {
  return a.filter(Boolean).join(' ');
}
function Button({
  variant = 'primary',
  tone = 'light',
  href,
  loading,
  state,
  className,
  children,
  ...rest
}) {
  const cls = cx('ba-btn', 'ba-btn-' + variant, tone === 'dark' && 'ba-on-dark', state && 'is-' + state, className);
  const p = {
    ...rest,
    className: cls
  };
  if (loading) {
    p['aria-busy'] = 'true';
    p.disabled = true;
  }
  if (href && !p.disabled) return /*#__PURE__*/React.createElement("a", _extends({
    href: href
  }, p), children);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: p.type || 'button'
  }, p), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/content/ServiceList.jsx
try { (() => {
function pad(n) {
  return (n < 10 ? '0' : '') + n;
}
function ServiceList({
  items = [],
  tone,
  className
}) {
  const dark = tone === 'dark';
  return /*#__PURE__*/React.createElement("ol", {
    className: ['ba-services', dark && 'ba-on-dark', className].filter(Boolean).join(' ')
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: it.name || i,
    className: "ba-service"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ba-service-n"
  }, pad(i + 1), " /"), /*#__PURE__*/React.createElement("h3", {
    className: "ba-service-name"
  }, it.name), it.description ? /*#__PURE__*/React.createElement("p", {
    className: "ba-service-desc"
  }, it.description) : null, it.price || it.duration || it.bookHref ? /*#__PURE__*/React.createElement("div", {
    className: "ba-service-meta"
  }, it.price ? /*#__PURE__*/React.createElement("span", {
    className: "ba-price"
  }, it.price) : null, it.duration ? /*#__PURE__*/React.createElement("span", null, it.duration) : null, it.bookHref ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "text",
    tone: dark ? 'dark' : 'light',
    href: it.bookHref,
    className: "ba-service-book",
    "aria-label": (it.bookLabel || 'Book now') + ': ' + it.name
  }, it.bookLabel || 'Book now') : null) : null)));
}
Object.assign(__ds_scope, { ServiceList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ServiceList.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  type,
  invalid,
  state,
  className,
  ...rest
}) {
  const radio = type === 'radio';
  return /*#__PURE__*/React.createElement("label", {
    className: ['ba-check', radio && 'ba-check-radio', state && 'is-' + state, className].filter(Boolean).join(' '),
    "data-invalid": invalid ? 'true' : undefined
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: radio ? 'radio' : 'checkbox'
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "ba-check-box",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
let uid = 0;
function TextField({
  label,
  hint,
  error,
  multiline,
  state,
  className,
  id,
  ...rest
}) {
  const ref = React.useRef(null);
  if (!ref.current) ref.current = id || 'ba-f' + ++uid;
  const fid = ref.current,
    hintId = fid + '-hint',
    errId = fid + '-err';
  const describedBy = [hint && hintId, error && errId].filter(Boolean).join(' ') || undefined;
  const props = {
    ...rest,
    id: fid,
    className: ['ba-field-input', state && 'is-' + state].filter(Boolean).join(' '),
    'aria-describedby': describedBy
  };
  if (error) props['aria-invalid'] = 'true';
  const Tag = multiline ? 'textarea' : 'input';
  return /*#__PURE__*/React.createElement("div", {
    className: ['ba-field', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("label", {
    className: "ba-field-label",
    htmlFor: fid
  }, label, rest.required ? /*#__PURE__*/React.createElement("span", {
    className: "ba-field-req",
    "aria-hidden": "true"
  }, "*") : null), hint ? /*#__PURE__*/React.createElement("p", {
    className: "ba-field-hint",
    id: hintId
  }, hint) : null, /*#__PURE__*/React.createElement(Tag, props), error ? /*#__PURE__*/React.createElement("p", {
    className: "ba-field-error",
    id: errId
  }, error) : null);
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/layout/SectionHeader.jsx
try { (() => {
function pad(n) {
  return (n < 10 ? '0' : '') + n;
}
function SectionHeader({
  index = 1,
  label,
  title,
  action,
  tone,
  as = 'h2',
  className
}) {
  const H = as;
  return /*#__PURE__*/React.createElement("header", {
    className: ['ba-sh', tone === 'dark' && 'ba-on-dark', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("div", {
    className: "ba-sh-text"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ba-label"
  }, pad(index), " / ", label), /*#__PURE__*/React.createElement(H, {
    className: "ba-display"
  }, title)), action ? /*#__PURE__*/React.createElement("div", {
    className: "ba-sh-action"
  }, action) : null);
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Apply.jsx
try { (() => {
const {
  Button: ABtn,
  TextField: ATF,
  Checkbox: ACB
} = window.BrokenArrowDesignSystem_3f23b6;
const HAIR_OPTS = ['Longer or grown out', 'Thinning or receding', 'Curly or textured', 'Cowlicks or difficult growth', "Haven't had a good cut in a while", 'Ready for a big change', 'Other'];
const FREEDOM = ['Do whatever you think works', 'Some, within limits', 'I know exactly what I want'];
function ApplyPage({
  go
}) {
  const [v, setV] = React.useState({
    name: '',
    email: '',
    city: '',
    want: '',
    agree: false
  });
  const [errors, setErrors] = React.useState({});
  const [state, setState] = React.useState('form');
  const set = k => e => setV({
    ...v,
    [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
  });
  function submit(e) {
    e.preventDefault();
    const er = {};
    if (!v.name) er.name = 'Add your name so we know who applied.';
    if (!v.email) er.email = 'Add an email so we can contact you if you\u2019re picked.';
    if (!v.city) er.city = 'Add your city so we know you can get to the shop.';
    if (!v.want) er.want = 'Tell us a little about what you want from your haircut.';
    if (!v.agree) er.agree = 'Tick the filming agreement to apply.';
    setErrors(er);
    if (Object.keys(er).length) return;
    setState('sending');
    setTimeout(() => setState('done'), 1200);
  }
  if (state === 'done') return /*#__PURE__*/React.createElement("section", {
    className: "kit-container kit-sec kit-split",
    style: {
      minHeight: 480
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "ba-label"
  }, "Free haircut / Applied"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "ba-display"
  }, "Thanks for applying."), /*#__PURE__*/React.createElement("p", {
    className: "kit-body-lg",
    style: {
      margin: '24px 0 40px',
      maxWidth: 560
    }
  }, "We'll be in touch if you're picked for a filming spot. If you don't hear from us this month, apply again next month."), /*#__PURE__*/React.createElement(ABtn, {
    variant: "secondary",
    onClick: () => go('home')
  }, "Back to the home page")));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "kit-container kit-sec kit-split"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ba-label"
  }, "Free haircut"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "ba-display",
    style: {
      fontSize: 80,
      lineHeight: .92
    }
  }, "Apply for a free haircut"), /*#__PURE__*/React.createElement("ul", {
    className: "kit-list"
  }, /*#__PURE__*/React.createElement("li", null, "The haircut is free because the appointment is being filmed. It will be filmed and photographed at Broken Arrow Barbershop in Orem, Utah, and used on our YouTube and social media."), /*#__PURE__*/React.createElement("li", null, "This is an application, not a booking. We have a limited number of filming spots each month and can't take everyone."), /*#__PURE__*/React.createElement("li", null, "We'll only contact you if you're picked. If you're not picked this time, you're welcome to apply again next month."), /*#__PURE__*/React.createElement("li", null, "Interested in a hair system? ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('hair');
    }
  }, "Book a free consultation"), " instead.")))), /*#__PURE__*/React.createElement("section", {
    className: "kit-container kit-split",
    style: {
      paddingBottom: 96
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "ba-label"
  }, "Required fields are marked *"), /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    noValidate: true,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 32,
      maxWidth: 680
    }
  }, /*#__PURE__*/React.createElement(ATF, {
    label: "Name",
    required: true,
    value: v.name,
    onChange: set('name'),
    error: errors.name
  }), /*#__PURE__*/React.createElement(ATF, {
    label: "Email",
    type: "email",
    required: true,
    value: v.email,
    onChange: set('email'),
    error: errors.email
  }), /*#__PURE__*/React.createElement(ATF, {
    label: "Phone number",
    type: "tel"
  }), /*#__PURE__*/React.createElement("fieldset", {
    className: "kit-fs"
  }, /*#__PURE__*/React.createElement("legend", {
    className: "ba-field-label"
  }, "Are you 18 or older?", /*#__PURE__*/React.createElement("span", {
    className: "ba-field-req"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement(ACB, {
    type: "radio",
    name: "adult",
    label: "Yes",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(ACB, {
    type: "radio",
    name: "adult",
    label: "No"
  }))), /*#__PURE__*/React.createElement(ATF, {
    label: "Where do you live?",
    required: true,
    hint: "City and state, so we know you can get to the shop in Orem.",
    value: v.city,
    onChange: set('city'),
    error: errors.city
  }), /*#__PURE__*/React.createElement(ATF, {
    label: "What do you want from your haircut?",
    required: true,
    multiline: true,
    hint: "Give us as much as you can: the style you're after, anything you like or don't like about your hair now, how much time you spend on it in the morning.",
    value: v.want,
    onChange: set('want'),
    error: errors.want
  }), /*#__PURE__*/React.createElement("fieldset", {
    className: "kit-fs"
  }, /*#__PURE__*/React.createElement("legend", {
    className: "ba-field-label"
  }, "Which of these describe your hair?"), /*#__PURE__*/React.createElement("div", {
    className: "kit-checks"
  }, HAIR_OPTS.map(o => /*#__PURE__*/React.createElement(ACB, {
    key: o,
    label: o
  })))), /*#__PURE__*/React.createElement("fieldset", {
    className: "kit-fs"
  }, /*#__PURE__*/React.createElement("legend", {
    className: "ba-field-label"
  }, "How much creative freedom are you willing to give the barber?", /*#__PURE__*/React.createElement("span", {
    className: "ba-field-req"
  }, "*")), /*#__PURE__*/React.createElement("div", null, FREEDOM.map((o, i) => /*#__PURE__*/React.createElement(ACB, {
    key: o,
    type: "radio",
    name: "freedom",
    label: o,
    defaultChecked: i === 1
  })))), /*#__PURE__*/React.createElement(ATF, {
    label: "When was your last haircut?",
    required: true,
    hint: "Add anything we should know about it, like only the sides were cut or you have an undercut."
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ACB, {
    checked: v.agree,
    onChange: set('agree'),
    invalid: !!errors.agree,
    label: "I understand the haircut is free because the appointment will be filmed and photographed, and that the footage and photos may be used on Broken Arrow's YouTube, social media and website. *"
  }), errors.agree ? /*#__PURE__*/React.createElement("p", {
    className: "ba-field-error"
  }, errors.agree) : null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ABtn, {
    type: "submit",
    loading: state === 'sending'
  }, "Apply")))));
}
Object.assign(window, {
  ApplyPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Apply.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Barber.jsx
try { (() => {
const {
  Button: BBtn,
  SectionHeader: BSH,
  ServiceList: BSL
} = window.BrokenArrowDesignSystem_3f23b6;
const BARBERS = {
  bryton: {
    name: 'Bryton',
    role: 'Owner & Licensed Barber Instructor',
    href: 'https://book.squareup.com/appointments/vmqe6cigusj6yl/location/LFBJAQ8MMHY0Z/services',
    bio: "Bryton owns Broken Arrow. He's a licensed barber instructor and educator, and splits his time between working behind the chair and training other barbers. Most of his clients come to him for haircuts, beard work and bigger changes — especially when they're not sure yet what they want. Before moving to Orem, he built Broken Arrow in Payson, where clients left him more than 230 five-star Google reviews.",
    forList: ["Bigger changes, when you're not sure what you want yet.", 'Haircut and beard together.', 'Hair systems — he does all of our hair system work.'],
    hair: true
  },
  connor: {
    name: 'Connor',
    role: 'Barber',
    href: 'https://book.squareup.com/appointments/cnl05yngyr8vhx/location/LFBJAQ8MMHY0Z/services',
    bio: "Connor is a Utah County local, born and raised. Most of his work is medium to longer haircuts — keeping the length and giving it shape. He got into barbering because he likes helping people feel good about how they look. He takes his time, gets the details right, and makes sure you're comfortable in the chair.",
    forList: ['Medium-length cuts that still look good as they grow out.', 'Longer hair that needs shape without losing length.', 'Taking the time to get the details right.']
  },
  elise: {
    name: 'Elise',
    role: 'Barber',
    href: 'https://book.squareup.com/appointments/wkoxhle5mmhzak/location/LFBJAQ8MMHY0Z/services',
    bio: "Elise specializes in medium-length styles and curly hair, and she likes flow cuts and longer, natural looks. Her cuts are clean and detailed. She takes the time to understand what you want and how you actually style your hair day to day, so the cut works with your routine. If you're not sure what you want, she'll help you figure it out.",
    forList: ['Curly hair.', 'Medium-length and flow cuts.', 'Help finding a style that fits your routine.']
  }
};
const WORK_CAPTIONS = ['Grown-out cut, shaped and thinned', 'Taper on the sides, length on top', 'Curly hair, cut dry', 'Beard shaped to the jawline', 'Flow cut, weight removed', 'Low fade (short at the bottom, blending up)'];
function BarberPage({
  id,
  go
}) {
  const b = BARBERS[id];
  const upper = b.name.toUpperCase();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "kit-band"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-container",
    style: {
      padding: '64px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 48,
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    label: 'Photo: ' + b.name + ' behind the chair',
    ratio: "4 / 5"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 16
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "ba-label",
    style: {
      marginBottom: 16
    }
  }, "The team / ", b.name), /*#__PURE__*/React.createElement("h1", {
    className: "ba-display",
    style: {
      fontSize: 104,
      lineHeight: .9,
      letterSpacing: '-.045em'
    }
  }, b.name), /*#__PURE__*/React.createElement("p", {
    className: "kit-body-lg",
    style: {
      color: 'var(--on-band)',
      margin: '20px 0 36px'
    }
  }, b.role), /*#__PURE__*/React.createElement(BBtn, {
    tone: "dark",
    href: b.href,
    target: "_blank"
  }, "Book with ", b.name)))), /*#__PURE__*/React.createElement("section", {
    className: "kit-container kit-sec kit-split"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ba-label"
  }, "01 / About"), /*#__PURE__*/React.createElement("p", {
    className: "kit-body-lg",
    style: {
      maxWidth: 680
    }
  }, b.bio)), /*#__PURE__*/React.createElement("section", {
    className: "kit-container kit-sec kit-split",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "ba-label"
  }, "02 / Book ", b.name, " for"), /*#__PURE__*/React.createElement("ol", {
    className: "kit-for"
  }, b.forList.map(f => /*#__PURE__*/React.createElement("li", {
    key: f,
    className: "kit-heading"
  }, f)))), b.hair ? /*#__PURE__*/React.createElement("section", {
    className: "kit-container",
    style: {
      padding: '0 64px 96px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--canvas-raised)',
      border: '1px solid var(--line)',
      padding: 32,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "kit-body-lg",
    style: {
      margin: 0,
      maxWidth: 560
    }
  }, "Thinking about a hair system? Bryton does all of our hair system work. Start with a free consultation."), /*#__PURE__*/React.createElement(BBtn, {
    variant: "secondary",
    onClick: () => go('hair')
  }, "Book a free consultation"))) : null, /*#__PURE__*/React.createElement("section", {
    className: "kit-container kit-sec",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement(BSH, {
    index: 3,
    label: "The work",
    title: b.name + "'s work"
  })), /*#__PURE__*/React.createElement("div", {
    className: "kit-grid3"
  }, WORK_CAPTIONS.map(c => /*#__PURE__*/React.createElement(Photo, {
    key: c,
    label: "Photo: client cut",
    caption: c
  })))), /*#__PURE__*/React.createElement("section", {
    className: "kit-container kit-sec",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement(BSH, {
    index: 4,
    label: "Services",
    title: "Services"
  })), /*#__PURE__*/React.createElement(BSL, {
    items: window.SERVICES.map(s => ({
      ...s,
      bookHref: b.href
    }))
  })), /*#__PURE__*/React.createElement(BookBand, {
    title: 'Book with ' + b.name,
    href: b.href,
    label: 'Book with ' + b.name,
    secondary: /*#__PURE__*/React.createElement(BBtn, {
      tone: "dark",
      variant: "text",
      onClick: () => go('team')
    }, "Or see the rest of the team")
  }));
}
Object.assign(window, {
  BarberPage,
  BARBERS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Barber.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Chrome.jsx
try { (() => {
const {
  Button
} = window.BrokenArrowDesignSystem_3f23b6;
const BOOK = 'https://book.squareup.com/appointments/a9bstwwcb18jn4/location/LFBJAQ8MMHY0Z/services';
function SiteHeader({
  page,
  go
}) {
  const nav = [['home', 'Home'], ['services', 'Services'], ['team', 'The team'], ['hair', 'Hair replacement'], ['visit', 'Visit'], ['products', 'Products']];
  return /*#__PURE__*/React.createElement("header", {
    className: "kit-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-container kit-header-in"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('home');
    },
    "aria-label": "Broken Arrow Barbershop home"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/lockup-barbershop-black.svg",
    alt: "Broken Arrow Barbershop",
    style: {
      width: 168,
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("nav", {
    className: "kit-nav"
  }, nav.map(([id, l]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: "#",
    className: 'kit-nav-a' + (page === id ? ' is-on' : ''),
    onClick: e => {
      e.preventDefault();
      go(id);
    }
  }, l))), /*#__PURE__*/React.createElement(Button, {
    href: BOOK,
    target: "_blank"
  }, "Book now")));
}
function SiteFooter({
  go
}) {
  return /*#__PURE__*/React.createElement("footer", {
    className: "kit-band"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-container",
    style: {
      padding: '64px 64px 40px',
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr 1fr 1fr',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/lockup-barbershop-offwhite.svg",
    alt: "Broken Arrow Barbershop",
    style: {
      width: 200
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "kit-foot-col"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ba-label"
  }, "Visit"), /*#__PURE__*/React.createElement("p", null, "375 E 800 S, Suite 12", /*#__PURE__*/React.createElement("br", null), "Orem, UT 84097"), /*#__PURE__*/React.createElement("p", null, "(801) 709-1280")), /*#__PURE__*/React.createElement("div", {
    className: "kit-foot-col"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ba-label"
  }, "Hours"), /*#__PURE__*/React.createElement("p", null, "Tue 10 AM \u2013 6 PM", /*#__PURE__*/React.createElement("br", null), "Wed\u2013Fri 10 AM \u2013 7:30 PM", /*#__PURE__*/React.createElement("br", null), "Sat 10 AM \u2013 5:30 PM", /*#__PURE__*/React.createElement("br", null), "Sun\u2013Mon closed")), /*#__PURE__*/React.createElement("div", {
    className: "kit-foot-col"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ba-label"
  }, "More"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('hair');
    }
  }, "Hair replacement"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('apply');
    }
  }, "Apply for a free haircut"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('products');
    }
  }, "Products"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('team');
    }
  }, "The team"))), /*#__PURE__*/React.createElement("div", {
    className: "kit-container",
    style: {
      padding: '20px 64px 32px',
      borderTop: '1px solid var(--line-strong)',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "ba-label"
  }, "Daily Herald Readers' Choice \xB7 Best Barbershop in Utah Valley \xB7 2023, 2024, 2026"), /*#__PURE__*/React.createElement("p", {
    className: "ba-label"
  }, "\xA9 Broken Arrow Barbershop")));
}
function BookBand({
  title = 'Book a haircut',
  line,
  label = 'Book now',
  href = BOOK,
  secondary
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "kit-band"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-container kit-sec",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 32,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "ba-display",
    style: {
      maxWidth: 560
    }
  }, title), line ? /*#__PURE__*/React.createElement("p", {
    className: "kit-body-lg",
    style: {
      color: 'var(--on-band)',
      opacity: .78,
      marginTop: 16
    }
  }, line) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      alignItems: 'center'
    }
  }, secondary, /*#__PURE__*/React.createElement(Button, {
    tone: "dark",
    href: href,
    target: "_blank"
  }, label))));
}
function Photo({
  label,
  ratio = '1 / 1',
  src,
  caption
}) {
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: label,
    style: {
      width: '100%',
      aspectRatio: ratio,
      objectFit: 'cover',
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    className: "kit-ph",
    style: {
      aspectRatio: ratio
    }
  }, /*#__PURE__*/React.createElement("span", null, label)), caption ? /*#__PURE__*/React.createElement("figcaption", {
    className: "kit-cap"
  }, caption) : null);
}
Object.assign(window, {
  SiteHeader,
  SiteFooter,
  BookBand,
  Photo,
  BOOK
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HairReplacement.jsx
try { (() => {
const {
  Button: RBtn,
  SectionHeader: RSH
} = window.BrokenArrowDesignSystem_3f23b6;
const CONSULT = 'https://book.squareup.com/appointments/vmqe6cigusj6yl/location/LFBJAQ8MMHY0Z/services';
const HR_STEPS = [['Free consultation and color match', 'Start here — new clients book this before any other hair replacement service. We talk through what you want, look at your hair and scalp, explain options, pricing and maintenance, and match the system, color and density.', 'Free'], ['First installation', 'The system is customized, installed, cut and blended into your existing hair. A $1,200 rate is available if you agree to be filmed and photographed for our content. This is optional, and saying no changes nothing about the service.', '$1,350'], ['Maintenance', 'Every 2–4 weeks the system is removed and cleaned, your scalp is prepared, fresh adhesive is applied, and the system is reinstalled. We recommend learning to do this yourself — we\u2019ll teach you in person.', '$175'], ['Replacing the system', 'Hair systems aren\u2019t permanent. A system typically lasts 2–6 months, depending on the system and how much wear it gets.', 'From $500']];
const PRICES = [['Free consultation and color match', 'Everyone new — the required first step', 'Free'], ['First installation', 'New clients, after the consultation', '$1,350'], ['First installation — filmed', 'New clients who agree to be filmed and photographed', '$1,200'], ['Re-application (maintenance)', 'Existing clients', '$175'], ['1 new hair system', 'Existing clients', '$650'], ['3 new hair systems', 'Existing clients', '$1,500 ($500 each)'], ['6 new hair systems — about a year\u2019s supply', 'Existing clients', '$3,000 ($500 each)']];
const FAQ = [['Does it look real? Can people tell?', 'We match the color, density and texture to your hair and cut the system into your existing hair, so it looks like your own hair.'], ['How is it attached?', 'With tape or glue, depending on you and your lifestyle. We\u2019ll decide which at your consultation.'], ['Can I shower in it? Can I exercise in it?', 'Yes. Wait 48 hours after it\u2019s attached before getting it wet; after that, live normally.'], ['What happens to my existing hair?', 'The hair where the system sits is shaved so it attaches securely. The rest of your hair stays and is blended into the system.'], ['How long does a system last?', 'Usually 2–6 months, depending on the system and how much wear it gets.']];
function Faq() {
  const [open, setOpen] = React.useState(0);
  return /*#__PURE__*/React.createElement("div", {
    className: "kit-faq"
  }, FAQ.map(([q, a], i) => /*#__PURE__*/React.createElement("div", {
    key: q,
    className: "kit-faq-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "kit-faq-q",
    "aria-expanded": open === i,
    onClick: () => setOpen(open === i ? -1 : i)
  }, /*#__PURE__*/React.createElement("span", null, q), /*#__PURE__*/React.createElement("span", {
    className: "ba-label"
  }, open === i ? 'Close' : 'Open')), open === i ? /*#__PURE__*/React.createElement("p", {
    className: "kit-body",
    style: {
      margin: '0 0 24px',
      maxWidth: 680,
      color: 'var(--ink-muted)'
    }
  }, a) : null)));
}
function HairReplacementPage() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "kit-band"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-container",
    style: {
      padding: '128px 64px 96px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "ba-label",
    style: {
      marginBottom: 24
    }
  }, "Hair replacement"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: '800 104px/.9 var(--font-display)',
      letterSpacing: '-.045em',
      textTransform: 'uppercase',
      color: 'var(--on-band)',
      maxWidth: 820
    }
  }, "Losing your hair doesn't mean you have to shave it."), /*#__PURE__*/React.createElement("p", {
    className: "kit-body-lg",
    style: {
      color: 'var(--on-band)',
      maxWidth: 560,
      margin: '28px 0 40px'
    }
  }, "Hair replacement can restore the appearance of a full head of hair without surgery. All hair system work is done by Bryton."), /*#__PURE__*/React.createElement(RBtn, {
    tone: "dark",
    href: CONSULT,
    target: "_blank"
  }, "Book a free consultation"))), /*#__PURE__*/React.createElement("section", {
    className: "kit-container kit-sec"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement(RSH, {
    index: 1,
    label: "How it works",
    title: "Four steps"
  })), /*#__PURE__*/React.createElement("ol", {
    className: "kit-hr-steps"
  }, HR_STEPS.map(([t, d, p], i) => /*#__PURE__*/React.createElement("li", {
    key: t
  }, /*#__PURE__*/React.createElement("span", {
    className: "ba-label"
  }, "0", i + 1, " /"), /*#__PURE__*/React.createElement("h3", {
    className: "kit-heading"
  }, t), /*#__PURE__*/React.createElement("p", {
    className: "kit-body",
    style: {
      color: 'var(--ink-muted)'
    }
  }, d), /*#__PURE__*/React.createElement("span", {
    className: "ba-price"
  }, p))))), /*#__PURE__*/React.createElement("section", {
    className: "kit-container kit-sec",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement(RSH, {
    index: 2,
    label: "Prices",
    title: "Hair system prices"
  })), /*#__PURE__*/React.createElement("table", {
    className: "kit-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Service"), /*#__PURE__*/React.createElement("th", null, "Who it's for"), /*#__PURE__*/React.createElement("th", null, "Price"))), /*#__PURE__*/React.createElement("tbody", null, PRICES.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r[0]
  }, /*#__PURE__*/React.createElement("td", null, r[0]), /*#__PURE__*/React.createElement("td", null, r[1]), /*#__PURE__*/React.createElement("td", {
    className: "ba-price"
  }, r[2])))))), /*#__PURE__*/React.createElement("section", {
    className: "kit-sunk"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-container kit-sec kit-split"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ba-label"
  }, "03 / What it costs"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "ba-display"
  }, "About $8 a day."), /*#__PURE__*/React.createElement("p", {
    className: "kit-body-lg",
    style: {
      margin: '16px 0 12px'
    }
  }, "Skip the morning Starbucks. Keep the hair."), /*#__PURE__*/React.createElement("p", {
    className: "kit-cap",
    style: {
      maxWidth: 560
    }
  }, "Based on the 6-system package with maintenance done at home. Doesn't include your first installation or supplies. Your own number depends on how long your systems last.")))), /*#__PURE__*/React.createElement("section", {
    className: "kit-container kit-sec kit-split"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ba-label"
  }, "04 / Questions"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Faq, null), /*#__PURE__*/React.createElement("p", {
    className: "kit-cap",
    style: {
      marginTop: 24
    }
  }, "Before-and-after photos are shared only with permission. Clients who want privacy are just as welcome."))), /*#__PURE__*/React.createElement(BookBand, {
    title: "Start with a free consultation",
    line: "Not sure what to do about thinning hair? We can walk you through your options.",
    label: "Book a free consultation",
    href: CONSULT
  }));
}
Object.assign(window, {
  HairReplacementPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HairReplacement.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
const {
  Button: HBtn,
  SectionHeader: HSH,
  ServiceList: HSL
} = window.BrokenArrowDesignSystem_3f23b6;
const SERVICES = [{
  name: 'Haircut',
  description: 'A haircut designed to fit your face shape, hair, routine, and lifestyle.',
  price: '$40',
  bookHref: '#'
}, {
  name: 'Haircut + Beard',
  description: 'For when you want your haircut and beard done together in one visit.',
  price: '$65',
  bookHref: '#'
}, {
  name: 'Extended Service Haircut',
  description: "If you're ready for a bigger change, book this so we have more time to work through it.",
  price: '$65',
  bookHref: '#'
}];
const TEAM = [{
  id: 'bryton',
  name: 'Bryton',
  role: 'Owner & Licensed Barber Instructor',
  line: 'Owner and licensed barber instructor. Big changes, haircut and beard.'
}, {
  id: 'connor',
  name: 'Connor',
  role: 'Barber',
  line: 'Medium to longer hair. Utah County local.'
}, {
  id: 'elise',
  name: 'Elise',
  role: 'Barber',
  line: 'Curly hair, medium-length and flow cuts.'
}];
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    className: "kit-band",
    style: {
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/photos/shop-interior.jpg",
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: .42
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(0deg, var(--band) 0%, rgba(22,23,26,.2) 70%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "kit-container",
    style: {
      position: 'relative',
      padding: '128px 64px 96px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "ba-label",
    style: {
      marginBottom: 24
    }
  }, "Orem, Utah \xB7 By appointment"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: '800 104px/.9 var(--font-display)',
      letterSpacing: '-.045em',
      textTransform: 'uppercase',
      color: 'var(--on-band)',
      maxWidth: 720
    }
  }, "Not sure what you want?"), /*#__PURE__*/React.createElement("p", {
    className: "kit-body-lg",
    style: {
      color: 'var(--on-band)',
      maxWidth: 520,
      margin: '28px 0 40px'
    }
  }, "Not sure what to do with your hair? We'll help you figure it out."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 32,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(HBtn, {
    tone: "dark",
    href: window.BOOK,
    target: "_blank"
  }, "Book now"), /*#__PURE__*/React.createElement(HBtn, {
    tone: "dark",
    variant: "text",
    href: "#services"
  }, "View services"))));
}
function HowItWorks() {
  const steps = [['Tell us about your hair', 'Face shape, hair type, hairline, and how much time you want to spend on it in the morning.'], ['We plan the cut', "If you're not sure what you want, we'll help you figure it out before we start."], ['Style it at home', "We'll show you how to style it at home, with what you already have."]];
  return /*#__PURE__*/React.createElement("section", {
    className: "kit-container kit-sec kit-split"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ba-label"
  }, "01 / How it works"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "ba-display",
    style: {
      maxWidth: 560
    }
  }, "Good grooming starts with being understood."), /*#__PURE__*/React.createElement("p", {
    className: "kit-body-lg",
    style: {
      margin: '24px 0 48px'
    }
  }, "Every cut starts from the person in the chair: your hair, your routine, and what you can realistically keep up with."), /*#__PURE__*/React.createElement("ol", {
    className: "kit-steps"
  }, steps.map(([t, d], i) => /*#__PURE__*/React.createElement("li", {
    key: t
  }, /*#__PURE__*/React.createElement("span", {
    className: "ba-label"
  }, "0", i + 1, " /"), /*#__PURE__*/React.createElement("h3", {
    className: "kit-heading"
  }, t), /*#__PURE__*/React.createElement("p", {
    className: "kit-body",
    style: {
      color: 'var(--ink-muted)'
    }
  }, d))))));
}
function Services({
  go
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "services",
    className: "kit-container kit-sec"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement(HSH, {
    index: 2,
    label: "Services",
    title: "Pick a service"
  })), /*#__PURE__*/React.createElement(HSL, {
    items: SERVICES
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      paddingTop: 24,
      borderTop: '1px solid var(--line)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 24,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "kit-body"
  }, "Thinning hair or a receding hairline? You have more options than you might think."), /*#__PURE__*/React.createElement(HBtn, {
    variant: "text",
    onClick: () => go('hair')
  }, "Hair replacement")));
}
function Team({
  go
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "kit-container kit-sec"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement(HSH, {
    index: 3,
    label: "The team",
    title: "Three barbers, one shop"
  })), /*#__PURE__*/React.createElement("div", {
    className: "kit-team"
  }, TEAM.map(b => /*#__PURE__*/React.createElement("article", {
    key: b.id
  }, /*#__PURE__*/React.createElement(Photo, {
    label: 'Photo: ' + b.name + ' working',
    ratio: "4 / 5"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "kit-heading",
    style: {
      marginTop: 20
    }
  }, b.name), /*#__PURE__*/React.createElement("p", {
    className: "ba-label",
    style: {
      margin: '6px 0 10px'
    }
  }, b.role), /*#__PURE__*/React.createElement("p", {
    className: "kit-body",
    style: {
      color: 'var(--ink-muted)',
      marginBottom: 12
    }
  }, b.line), /*#__PURE__*/React.createElement(HBtn, {
    variant: "text",
    onClick: () => go(b.id)
  }, "See ", b.name, "'s work")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48
    }
  }, /*#__PURE__*/React.createElement(HBtn, {
    href: window.BOOK,
    target: "_blank"
  }, "Book now")));
}
function Visit() {
  const hours = [['Tuesday', '10 AM – 6 PM'], ['Wednesday', '10 AM – 7:30 PM'], ['Thursday', '10 AM – 7:30 PM'], ['Friday', '10 AM – 7:30 PM'], ['Saturday', '10 AM – 5:30 PM'], ['Sunday', 'Closed'], ['Monday', 'Closed']];
  return /*#__PURE__*/React.createElement("section", {
    className: "kit-sunk"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-container kit-sec kit-split"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ba-label"
  }, "04 / Visit"), /*#__PURE__*/React.createElement("div", {
    className: "kit-visit"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "ba-display",
    style: {
      fontSize: 48
    }
  }, "Walk-ins: by appointment or luck."), /*#__PURE__*/React.createElement("p", {
    className: "kit-body",
    style: {
      margin: '20px 0'
    }
  }, "Walk-ins are welcome when we have an opening, but we're usually booked. Booking online is the best way to get a spot."), /*#__PURE__*/React.createElement("p", {
    className: "kit-body"
  }, "375 E 800 S, Suite 12, Orem, UT 84097. The shop is tough to find, so arrive 5\u201310 minutes early."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      marginTop: 28,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(HBtn, {
    variant: "secondary",
    href: "tel:8017091280"
  }, "Call the shop"), /*#__PURE__*/React.createElement(HBtn, {
    variant: "text",
    href: "#"
  }, "Get directions"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("table", {
    className: "kit-hours"
  }, /*#__PURE__*/React.createElement("tbody", null, hours.map(([d, h]) => /*#__PURE__*/React.createElement("tr", {
    key: d
  }, /*#__PURE__*/React.createElement("td", null, d), /*#__PURE__*/React.createElement("td", null, h))))), /*#__PURE__*/React.createElement("p", {
    className: "kit-cap"
  }, "These are our regular hours, and we keep to them. We're a small shop, so on holidays or when several of us are away, hours may change. The booking page always shows our real availability.")))));
}
function HomePage({
  go,
  anchor
}) {
  React.useEffect(() => {
    if (anchor) {
      const el = document.getElementById(anchor);
      if (el) window.scrollTo(0, el.offsetTop - 100);
    }
  }, [anchor]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(HowItWorks, null), /*#__PURE__*/React.createElement(Services, {
    go: go
  }), /*#__PURE__*/React.createElement("div", {
    id: "team"
  }, /*#__PURE__*/React.createElement(Team, {
    go: go
  })), /*#__PURE__*/React.createElement("div", {
    id: "visit"
  }, /*#__PURE__*/React.createElement(Visit, null)), /*#__PURE__*/React.createElement(BookBand, {
    title: "Book a haircut",
    line: "Real-time availability on the booking page.",
    secondary: /*#__PURE__*/React.createElement(HBtn, {
      tone: "dark",
      variant: "text",
      href: "tel:8017091280"
    }, "Call the shop")
  }));
}
Object.assign(window, {
  HomePage,
  SERVICES,
  TEAM
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Products.jsx
try { (() => {
const {
  Button: PBtn
} = window.BrokenArrowDesignSystem_3f23b6;
function ProductsPage({
  go
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "kit-band"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-container",
    style: {
      padding: '128px 64px 112px',
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      gap: 32,
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/lockup-grooming-offwhite.svg",
    alt: "Broken Arrow Grooming",
    style: {
      width: 240
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "ba-label",
    style: {
      marginBottom: 24
    }
  }, "Broken Arrow Grooming"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: '800 104px/.9 var(--font-display)',
      letterSpacing: '-.045em',
      textTransform: 'uppercase',
      color: 'var(--on-band)'
    }
  }, "Coming soon."), /*#__PURE__*/React.createElement("p", {
    className: "kit-body-lg",
    style: {
      color: 'var(--on-band)',
      maxWidth: 560,
      margin: '28px 0 40px'
    }
  }, "We're working on a small line of grooming products. Until then, the best thing we can sell you is a good haircut."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 32,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(PBtn, {
    tone: "dark",
    href: window.BOOK,
    target: "_blank"
  }, "Book now"), /*#__PURE__*/React.createElement(PBtn, {
    tone: "dark",
    variant: "text",
    onClick: () => go('services')
  }, "View services"))))));
}
Object.assign(window, {
  ProductsPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Products.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.ServiceList = __ds_scope.ServiceList;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

})();
