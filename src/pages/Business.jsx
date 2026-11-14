import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Icon from '../components/Icon';
import { Reveal, SplitText, Float, stagger, fadeUp } from '../components/Motion';
import { useLang } from '../i18n/LangContext';
import { businessAssets as A, links } from '../data/assets';

/* ---------------- Hero ---------------- */
function Hero() {
  const { t, lang } = useLang();
  const h = t.business.hero;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const tabletY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const tabletRot = useTransform(scrollYProgress, [0, 1], [0, lang === 'ar' ? -6 : 6]);

  return (
    <section id="main" className="biz-hero" ref={ref}>
      <div className="biz-hero__glow" aria-hidden="true" />
      <div className="container biz-hero__inner">
        <div className="biz-hero__copy">
          <SplitText className="biz-hero__title" text={h.title} wordClass={(i) => (i > 0 ? 'is-fade' : '')} delay={0.1} />
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
            {h.text}
          </motion.p>
          <motion.a
            className="btn btn--white"
            href={links.signUp(lang)}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            {h.cta}
          </motion.a>
        </div>

        <motion.div
          className="biz-hero__visual"
          initial={{ opacity: 0, x: lang === 'ar' ? -120 : 120, rotate: lang === 'ar' ? -10 : 10 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img src={A.heroTablet} alt="Bing dashboard" style={{ y: tabletY, rotate: tabletRot }} />
        </motion.div>
      </div>

      <motion.div
        className="biz-hero__percent"
        initial={{ scale: 0 }}
        animate={{ scale: 1, y: [0, -14, 0], rotate: [-6, 6, -6] }}
        transition={{ scale: { delay: 0.9, type: 'spring' }, y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <img src={A.heroPercent} alt="" />
      </motion.div>
      <Float className="biz-hero__deco" range={12} rotate={-8} duration={7} delay={0.5}>
        <img src={A.heroDeco} alt="" />
      </Float>
    </section>
  );
}

/* ---------------- Dashboard ---------------- */
// Plain line icons for the 4 dashboard points
const FeatureIcon = ({ name }) => {
  const common = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  if (name === 'instant')
    return (
      <svg {...common}>
        <path d="M4 9V5h4M16 5h4v4M20 15v4h-4M8 19H4v-4" strokeDasharray="2 2.2" />
        <rect x="8.5" y="11" width="7" height="8" />
      </svg>
    );
  if (name === 'ready')
    return (
      <svg {...common}>
        <rect x="4" y="4" width="16" height="16" />
        <path d="M12 4v16M4 12h16M12 12l8-8M4 20l8-8M12 16l4-4" />
      </svg>
    );
  if (name === 'confirm')
    return (
      <svg {...common}>
        <path d="M4 12.5l5 5L20 6.5" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M12 20v-6" />
      <path d="M12 14c0-4.5-3-7-8-7 0 4.5 3 7 8 7z" />
      <path d="M12 14c0-5 3-8.5 8.5-8.5 0 5-3.5 8.5-8.5 8.5z" />
    </svg>
  );
};
const dashIcons = ['instant', 'ready', 'confirm', 'grow'];

function Dashboard() {
  const { t } = useLang();
  const d = t.business.dashboard;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);

  return (
    <section id="features" className="dashboard">
      <div className="container">
        <div className="center"><Reveal as="span" className="chip-label">{d.eyebrow}</Reveal></div>
        <Reveal as="h2" className="section-title" delay={0.05}>{d.title}</Reveal>
        <Reveal as="p" className="section-sub" delay={0.1}>{d.text}</Reveal>

        <div className="dashboard__frame-wrap" ref={ref}>
          <Float className="deco deco--dash-bowl" range={14} rotate={-6}>
            <img src={A.decoBowl} alt="" />
          </Float>
          <Float className="deco deco--dash-cup" range={16} rotate={8} duration={5.5} delay={0.6}>
            <img src={A.decoCup} alt="" />
          </Float>
          <motion.div className="dashboard__frame" style={{ rotateX, scale }}>
            <img src={A.dashboard} alt="Bing restaurant dashboard" loading="lazy" />
          </motion.div>
        </div>

        <motion.div className="dashboard__features" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger(0.12)}>
          {d.features.map((f, i) => (
            <motion.div key={f.title} className="feature" variants={fadeUp}>
              <motion.div className="feature__icon" whileHover={{ scale: 1.15, rotate: -6 }}>
                <FeatureIcon name={dashIcons[i]} />
              </motion.div>
              <h4>{f.title}</h4>
              <p>{f.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Marketing ---------------- */
function Marketing() {
  const { t } = useLang();
  const m = t.business.marketing;
  return (
    <section id="ourservices" className="marketing">
      <Float className="deco deco--mk-bowl" range={12} rotate={5}>
        <img src={A.decoBowl2} alt="" />
      </Float>
      <div className="container">
        <Reveal as="h2" className="section-title">{m.title}</Reveal>
        <motion.div className="services__grid" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger(0.1)}>
          {m.items.map((it) => (
            <motion.article key={it.title} className="service-col" variants={fadeUp}>
              <h4>{it.title}</h4>
              <p>{it.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Smart reservation ---------------- */
function Reservation() {
  const { t, lang, isRtl } = useLang();
  const r = t.business.reservation;
  return (
    <section className="reservation">
      <div className="container">
        <Reveal className="reservation__card" y={60} scale={0.96}>
          <div className="reservation__copy">
            <h2>{r.title}</h2>
            <motion.ul initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger(0.15, 0.2)}>
              {r.points.map(([title, text]) => (
                <motion.li key={title} variants={fadeUp}>
                  <span className="reservation__check"><Icon name="check" size={18} stroke={2.6} /></span>
                  <p><b>{title}</b>, {text}</p>
                </motion.li>
              ))}
            </motion.ul>
            <motion.a className="btn btn--white btn--block" href={links.signUp(lang)} target="_blank" rel="noreferrer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <span className="btn__dot" /> {r.cta}
            </motion.a>
          </div>
          <motion.div
            className="reservation__media"
            initial={{ opacity: 0, x: isRtl ? -80 : 80, y: 60 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={A.reservationMockup} alt="Bing reservation management dashboard" loading="lazy" />
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Ads / Offers split sections ---------------- */
const adIcons = ['search', 'filter', 'pin', 'bolt'];
const offerIcons = ['users', 'clock', 'repeat', 'star'];

function Split({ id, data, image, icons, reverse }) {
  const { isRtl } = useLang();
  const fromSide = (reverse ? 1 : -1) * (isRtl ? -1 : 1) * 80;
  return (
    <section id={id} className={`split ${reverse ? 'split--reverse' : ''}`}>
      <div className="container split__inner">
        <Reveal className="split__media" x={fromSide} y={0}>
          <motion.img src={image} alt="" loading="lazy" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 200 }} />
        </Reveal>
        <div className="split__copy">
          <Reveal as="span" className="eyebrow">{data.eyebrow}</Reveal>
          <Reveal as="h2" delay={0.05}>
            {data.mutedWord ? (<><span className="muted">{data.mutedWord}</span>{data.title.replace(data.mutedWord, '').trim()}</>) : data.title}
          </Reveal>
          <Reveal as="p" delay={0.1}>{data.text}</Reveal>
          <motion.div className="tags" initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger(0.08, 0.2)}>
            {data.tags.map((tag, i) => (
              <motion.span key={tag} className="tag" variants={fadeUp} whileHover={{ y: -4, scale: 1.04 }}>
                <Icon name={icons[i]} size={20} stroke={1.6} /> {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Pricing ---------------- */
function Pricing() {
  const { t, lang } = useLang();
  const p = t.business.pricing;
  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <div className="pricing__head">
          <div>
            <Reveal as="h2" className="section-title section-title--start">{p.title}</Reveal>
            <Reveal as="p" className="section-sub section-sub--start" delay={0.05}>{p.text}</Reveal>
          </div>
          <motion.ul className="pricing__features" initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger(0.07)}>
            {p.features.map((f) => (
              <motion.li key={f} variants={fadeUp}>
                <span className="pricing__check"><Icon name="check" size={12} stroke={3} /></span>
                {f}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.div className="pricing__grid" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger(0.12)}>
          {p.plans.map((pl) => (
            <motion.div key={pl.name} className={`plan ${pl.featured ? 'plan--featured' : ''}`} variants={fadeUp} whileHover={{ y: -12 }}>
              {pl.featured && <img className="plan__bg" src={A.pricingBg} alt="" />}
              {pl.badge && (
                <motion.span className="plan__badge" animate={pl.featured ? { scale: [1, 1.08, 1] } : {}} transition={{ duration: 2, repeat: Infinity }}>
                  {pl.featured && '🔥 '}{pl.badge}
                </motion.span>
              )}
              <h3>{pl.name}</h3>
              <p>{pl.text}</p>
              <div className="plan__price">
                {pl.old && <s>{pl.old}</s>}
                <strong>{pl.price}</strong>
                <small>{p.perMonth}</small>
              </div>
              <motion.a
                className="btn btn--outline btn--block"
                href={pl.plan ? links.signUpPlan(lang, pl.plan) : links.signUp(lang)}
                target="_blank"
                rel="noreferrer"
                whileTap={{ scale: 0.97 }}
              >
                <span className="btn__roll" data-text={pl.cta}>{pl.cta}</span>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function Faq() {
  const { t } = useLang();
  const f = t.business.faq;
  const [open, setOpen] = useState(0); // only one item open at a time
  return (
    <section id="faqs" className="faq">
      <div className="faq__inner">
        <Reveal as="span" className="faq__badge">{f.eyebrow}</Reveal>
        <Reveal as="h2" className="faq__title" delay={0.05}>{f.title}</Reveal>
        <Reveal as="p" className="faq__subtitle" delay={0.1}>{f.text}</Reveal>
        <motion.div className="faq__list" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger(0.08)}>
          {f.items.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <motion.div key={q} className={`faq__item ${isOpen ? 'is-open' : ''}`} variants={fadeUp}>
                <button className="faq__question" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                  {q}
                  <span className="faq__icon" aria-hidden="true" />
                </button>
                <div className="faq__answer">
                  <div><p>{a}</p></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials (vertical marquee) ---------------- */
function Testimonials() {
  const { t } = useLang();
  const tm = t.business.testimonials;
  const cols = [0, 1, 2].map((c) => tm.items.slice(c * 3, c * 3 + 3).map((it, k) => [...it, A.avatars[c * 3 + k]]));
  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="center"><Reveal as="span" className="chip-label">{tm.eyebrow}</Reveal></div>
        <Reveal as="h2" className="section-title section-title--xl" delay={0.05}>{tm.title}</Reveal>
        <Reveal className="testimonials__cols" y={60}>
          {cols.map((col, c) => (
            <div key={c} className={`marquee marquee--${c % 2 ? 'down' : 'up'}`} style={{ '--dur': `${28 + c * 6}s` }}>
              <div className="marquee__track">
                {[...col, ...col, ...col, ...col].map(([quote, name, role, avatar], k) => (
                  <figure key={k} className="testimonial">
                    <blockquote>{quote}</blockquote>
                    <figcaption>
                      <img src={avatar} alt="" loading="lazy" />
                      <span><b>{name}</b><small>{role}</small></span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function Cta() {
  const { t, lang } = useLang();
  const c = t.business.cta;
  return (
    <section className="cta">
      <Float className="cta__deco cta__deco--left" range={16} rotate={-8}>
        <motion.img src={A.ctaCalendar} alt="" initial={{ opacity: 0, x: -80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} />
      </Float>
      <Float className="cta__deco cta__deco--right" range={10} rotate={4} delay={0.8}>
        <motion.img src={A.ctaTable} alt="" initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} />
      </Float>
      <div className="container cta__inner">
        <Reveal as="h2" className="section-title">{c.title}</Reveal>
        <Reveal as="p" className="section-sub" delay={0.05}>{c.text}</Reveal>
        <Reveal className="cta__buttons" delay={0.15}>
          <motion.a className="btn btn--dark" href={links.signUp(lang)} target="_blank" rel="noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            {c.primary}
          </motion.a>
          <a className="btn btn--link" href="#features">
            {c.secondary} <span className="flip-rtl" style={{ display: 'inline-block' }}>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default function Business() {
  const { t, lang } = useLang();
  const n = t.business.nav;
  const navItems = [
    { label: n.benefits, href: '#benefits' },
    { label: n.pricing, href: '#pricing' },
    { label: n.faqs, href: '#faqs' },
    { label: n.testimonials, href: '#testimonials' },
    { label: n.contact, href: links.contactBusiness },
  ];
  return (
    <div className="page page--business">
      <Navbar variant="red" items={navItems} cta={{ label: n.cta, href: links.signUp(lang) }} />
      <main>
        <Hero />
        <Dashboard />
        <Marketing />
        <div id="benefits">
          <Reservation />
          <Split id="ads" data={t.business.ads} image={A.adsMedia} icons={adIcons} />
          <Split id="offers" data={t.business.offers} image={A.offersMedia} icons={offerIcons} reverse />
        </div>
        <Pricing />
        <Faq />
        <Testimonials />
        <Cta />
      </main>
      <Footer variant="red" topId="main" showBlurb={false} showSocial knowUs={navItems} />
    </div>
  );
}
