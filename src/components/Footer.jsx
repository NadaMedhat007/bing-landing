import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from './Logo';
import Icon, { Social } from './Icon';
import { useLang } from '../i18n/LangContext';
import { links } from '../data/assets';
import { Reveal } from './Motion';

/** variant "light" (home) or "red" (business). knowUs: list of {label, href|route} */
export default function Footer({ variant = 'light', knowUs, showBlurb = true, showSocial = false, topId }) {
  const { t, otherPath, to } = useLang();
  const f = t.footer;
  const linkEl = (it) =>
    it.route ? <Link key={it.label} to={to(it.route)}>{it.label}</Link> : <a key={it.label} href={it.href}>{it.label}</a>;

  return (
    <footer className={`footer footer--${variant}`}>
      <div className="container">
        <Reveal className="footer__grid" y={30}>
          <div className="footer__brand">
            <a href={`#${topId}`} aria-label="Back to top">
              <Logo color={variant === 'red' ? '#fff' : '#E10801'} height={44} />
            </a>
            {showBlurb && <p>{f.blurb}</p>}
            {showSocial && (
              <div className="footer__social">
                {['facebook', 'instagram', 'whatsapp'].map((s) => (
                  <motion.a key={s} href={links[s]} target="_blank" rel="noreferrer" aria-label={s} whileHover={{ y: -4, scale: 1.1 }}>
                    <Social name={s} />
                  </motion.a>
                ))}
              </div>
            )}
          </div>
          <div className="footer__col">
            <h5>{f.knowUs}</h5>
            {knowUs.map(linkEl)}
          </div>
          <div className="footer__col">
            <h5>{f.legal}</h5>
            <a href={links.privacy}>{f.privacy}</a>
            <a href={links.terms}>{f.terms}</a>
          </div>
          <div className="footer__col">
            <h5>{f.contact}</h5>
            <a href={`mailto:${links.email}`}>{links.email}</a>
          </div>
          <div className="footer__col footer__lang">
            <Link to={otherPath}>
              <Icon name="globe" size={16} /> {t.switchLabel}
            </Link>
          </div>
        </Reveal>
        <div className="footer__bottom">
          <span>{t.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
