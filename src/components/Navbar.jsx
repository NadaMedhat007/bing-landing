import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Logo from './Logo';
import Icon from './Icon';
import { useLang } from '../i18n/LangContext';

/**
 * variant "light" = home page (white bar, red logo)
 * variant "red"   = business page (red bar, white logo)
 * items: [{ label, href, external?, route? }]
 * cta:   optional { label, href }
 */
export default function Navbar({ variant = 'light', items, cta }) {
  const { t, otherPath, to } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 20);
    setHidden(y > 400 && y > prev && !open);
  });

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const renderLink = (it, onClick) =>
    it.route ? (
      <Link key={it.label} to={to(it.route)} onClick={onClick} className={it.pill ? 'nav-pill' : ''}>{it.label}</Link>
    ) : (
      <a key={it.label} href={it.href} onClick={onClick} target={it.external ? '_blank' : undefined} rel="noreferrer">{it.label}</a>
    );

  return (
    <>
      <motion.header
        className={`navbar navbar--${variant} ${scrolled ? 'is-scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container navbar__inner">
          <Link to={to('/')} className="navbar__logo" aria-label="Bing home">
            <Logo color={variant === 'red' ? '#fff' : '#E10801'} height={36} />
          </Link>
          <nav className="navbar__links">
            {items.map((it) => renderLink(it))}
            {cta && (
              <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="btn btn--white btn--sm" href={cta.href} target="_blank" rel="noreferrer">
                {cta.label}
              </motion.a>
            )}
            <Link to={otherPath} className="navbar__lang">
              <Icon name="globe" size={16} /> {t.switchLabel}
            </Link>
          </nav>
          <div className="navbar__mobile">
            <Link to={otherPath} className="navbar__lang">
              <Icon name="globe" size={16} /> {t.switchLabel}
            </Link>
            <button className="navbar__burger" onClick={() => setOpen(true)} aria-label="Open menu">
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div className={`mobile-menu mobile-menu--${variant}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="mobile-menu__top container">
              <Logo color={variant === 'red' ? '#fff' : '#E10801'} height={34} />
              <button className="navbar__burger" onClick={() => setOpen(false)} aria-label="Close menu">
                <Icon name="close" />
              </button>
            </div>
            <motion.nav initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}>
              {[...items, ...(cta ? [{ ...cta, external: true }] : [])].map((it) => (
                <motion.div key={it.label} variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}>
                  {renderLink(it, () => setOpen(false))}
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
