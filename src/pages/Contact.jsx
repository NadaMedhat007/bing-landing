import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SiteChrome from '../components/SiteChrome';
import Icon from '../components/Icon';
import { Reveal } from '../components/Motion';
import { useLang } from '../i18n/LangContext';
import { pageText } from '../i18n/pages';
import { FORM_EMAIL, FORM_ENDPOINT } from '../data/forms';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s()-]{6,}$/;

/** Animated check mark for the thank-you screen */
function SuccessMark() {
  return (
    <motion.svg width="88" height="88" viewBox="0 0 88 88" initial="hidden" animate="show">
      <motion.circle
        cx="44" cy="44" r="40" fill="none" stroke="currentColor" strokeWidth="4"
        variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1, transition: { duration: 0.6 } } }}
      />
      <motion.path
        d="M27 45l12 12 23-25" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
        variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.45, delay: 0.5 } } }}
      />
    </motion.svg>
  );
}

function Field({ label, error, children, optional, full }) {
  return (
    <label className={`field ${error ? 'has-error' : ''} ${full ? 'field--full' : ''}`}>
      <span className="field__label">
        {label} {optional && <em>{optional}</em>}
      </span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span className="field__error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

/** product: 'hub' (form → info@binghub.net) | 'business' (form → support@binghub.net) */
export default function Contact({ product = 'hub' }) {
  const { lang, to } = useLang();
  const ui = pageText[lang].contact;
  const p = ui[product];
  const isBiz = product === 'business';
  const inbox = FORM_EMAIL[product];

  const empty = { name: '', email: '', phone: '', restaurant: '', branches: '', topic: '', message: '', _honey: '' };
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [sentTo, setSentTo] = useState('');

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!values.name.trim()) er.name = ui.required;
    if (!values.email.trim()) er.email = ui.required;
    else if (!EMAIL_RE.test(values.email.trim())) er.email = ui.invalidEmail;
    if (isBiz && !values.phone.trim()) er.phone = ui.required;
    else if (values.phone.trim() && !PHONE_RE.test(values.phone.trim())) er.phone = ui.invalidPhone;
    if (isBiz && !values.restaurant.trim()) er.restaurant = ui.required;
    if (!values.message.trim()) er.message = ui.required;
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (values._honey) return; // bot trap
    if (!validate()) return;
    setStatus('sending');
    const payload = {
      _subject: isBiz ? `Bing for Business – new enquiry from ${values.restaurant}` : `Bing – new message from ${values.name}`,
      _template: 'table',
      _replyto: values.email,
      Name: values.name,
      Email: values.email,
      Phone: values.phone || '-',
      ...(isBiz ? { Restaurant: values.restaurant, Branches: values.branches || '-' } : {}),
      Topic: values.topic || '-',
      Message: values.message,
      Language: lang === 'ar' ? 'Arabic' : 'English',
      Page: window.location.href,
    };
    try {
      const res = await fetch(FORM_ENDPOINT[product], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || 'failed');
      setSentTo(values.email);
      setValues(empty);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <SiteChrome product={product}>
      <section className={`contact contact--${product}`}>
        <div className="container contact__inner">
          <div className="contact__intro">
            <Reveal as="span" className="chip-label">{p.eyebrow}</Reveal>
            <Reveal as="h1" delay={0.05}>{p.title}</Reveal>
            <Reveal as="p" delay={0.1}>{p.sub}</Reveal>
            <Reveal className="contact__card" delay={0.15}>
              <span className="contact__icon"><Icon name="mail" size={20} /></span>
              <div>
                <small>{ui.emailUs}</small>
                <a className="text-link" href={`mailto:${inbox}`}>{inbox}</a>
                <small>{ui.reply}</small>
              </div>
            </Reveal>
          </div>

          <Reveal className="contact__panel" delay={0.1} y={40}>
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="thanks"
                  className="thanks"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  role="status"
                >
                  <div className="thanks__mark"><SuccessMark /></div>
                  <h2>{ui.thanks.title}</h2>
                  <p>
                    {ui.thanks.text} <a className="text-link" href={`mailto:${sentTo}`}>{sentTo}</a> {ui.thanks.soon}
                  </p>
                  <div className="thanks__actions">
                    <Link className="btn btn--dark" to={to(isBiz ? '/for-business' : '/')}>{ui.thanks.home}</Link>
                    <button type="button" className="btn btn--ghost" onClick={() => setStatus('idle')}>{ui.thanks.again}</button>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" className="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}>
                  <div className="form__grid">
                    <Field label={ui.name} error={errors.name}>
                      <input type="text" autoComplete="name" value={values.name} onChange={set('name')} />
                    </Field>
                    {isBiz && (
                      <Field label={p.restaurant} error={errors.restaurant}>
                        <input type="text" autoComplete="organization" value={values.restaurant} onChange={set('restaurant')} />
                      </Field>
                    )}
                    <Field label={ui.email} error={errors.email}>
                      <input type="email" autoComplete="email" dir="ltr" value={values.email} onChange={set('email')} />
                    </Field>
                    <Field label={ui.phone} optional={isBiz ? null : ui.optional} error={errors.phone}>
                      <input type="tel" autoComplete="tel" dir="ltr" value={values.phone} onChange={set('phone')} />
                    </Field>
                    {isBiz && (
                      <Field label={p.branches} optional={ui.optional}>
                        <select value={values.branches} onChange={set('branches')}>
                          <option value="">{ui.select}</option>
                          {p.branchOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </Field>
                    )}
                    <Field label={p.topicLabel} optional={ui.optional} full={!isBiz}>
                      <select value={values.topic} onChange={set('topic')}>
                        <option value="">{ui.select}</option>
                        {p.topics.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>
                    <Field label={ui.message} error={errors.message} full>
                      <textarea rows={5} placeholder={ui.messagePh} value={values.message} onChange={set('message')} />
                    </Field>
                    {/* honeypot field for bots — hidden from people */}
                    <input className="hp" tabIndex={-1} autoComplete="off" value={values._honey} onChange={set('_honey')} aria-hidden="true" />
                  </div>

                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.p className="form__error" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert">
                        {ui.failed} <a className="text-link" href={`mailto:${inbox}`}>{inbox}</a>
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button type="submit" className="btn btn--red btn--block" disabled={status === 'sending'} whileTap={{ scale: 0.98 }}>
                    {status === 'sending' ? (<><span className="spinner" /> {ui.sending}</>) : ui.send}
                  </motion.button>
                  <p className="form__note">
                    {ui.privacyNote} <Link className="text-link" to={to(`${isBiz ? '/for-business' : ''}/privacy`)}>{ui.privacy}</Link>.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </section>
    </SiteChrome>
  );
}
