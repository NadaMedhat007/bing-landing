import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StoreButtons from '../components/StoreButtons';
import { Reveal, SplitText, Float, stagger, fadeUp } from '../components/Motion';
import { useLang } from '../i18n/LangContext';
import { homeAssets as A, links } from '../data/assets';

function Hero() {
  const { t, isRtl: isAr } = useLang();
  const h = t.home.hero;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const { scrollY } = useScroll();
  const phoneY = useTransform(scrollY, [0, 900], [0, -180]); // original: phone rises 0.2px per px scrolled
  const patternScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section id="hero" className="home-hero" ref={ref}>
      <div className="container home-hero__head">
        <SplitText className="home-hero__title" text={h.title} />
        <motion.div
          className="home-hero__side"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <p>{h.text}</p>
          <StoreButtons />
        </motion.div>
      </div>

      <motion.div className="container home-hero__stage" style={{ scale: cardScale }}>
        <motion.div
          className="home-hero__card"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Red gradient + food doodle pattern */}
          <motion.img
            className="home-hero__pattern"
            src={A.heroDoodles}
            alt=""
            style={{ scale: patternScale }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />

          {/* Phone */}
          <motion.img
            className="hero-el hero-el--phone"
            src={isAr ? A.heroPhoneAr : A.heroPhone}
            alt="Bing app"
            style={{ y: phoneY }}
            initial={{ opacity: 0, y: 220 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Floating UI elements */}
          {[
            { src: isAr ? A.heroSlotAr : A.heroSlot, cls: 'slot', delay: 1.0, float: 10, dur: 5 },
            { src: isAr ? A.heroBubbleBookingAr : A.heroBubbleBooking, cls: 'booking', delay: 1.2, float: 8, dur: 4 },
            { src: isAr ? A.heroRestaurantsAr : A.heroRestaurants, cls: 'restaurants', delay: 1.4, float: 12, dur: 6 },
            { src: isAr ? A.heroBubbleOffersAr : A.heroBubbleOffers, cls: 'offers', delay: 1.6, float: 9, dur: 4.5 },
          ].map((el) => (
            <motion.div
              key={el.cls}
              className={`hero-el hero-el--${el.cls}`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: el.delay, type: 'spring', stiffness: 160, damping: 14 }}
            >
              <motion.img
                src={el.src}
                alt=""
                animate={{ y: [0, -el.float, 0] }}
                transition={{ delay: el.delay + 0.5, duration: el.dur, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.06 }}
              />
            </motion.div>
          ))}
        </motion.div>
        <div className="home-hero__fade" />
      </motion.div>
    </section>
  );
}

function Services() {
  const { t } = useLang();
  const s = t.home.services;
  return (
    <section id="ourservices" className="services">
      <Float className="deco deco--calendar" range={16} rotate={6}>
        <img className="art art--calendar" src={A.decoCalendar} alt="" />
      </Float>
      <Float className="deco deco--bowl" range={12} rotate={-5} delay={1}>
        <img className="art art--bowl" src={A.decoBowl} alt="" />
      </Float>
      <div className="container">
        <Reveal as="h2" className="section-title">{s.title}</Reveal>
        <motion.div className="services__grid" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger(0.12)}>
          {s.items.map((it) => (
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

// Community gallery — pinned while scrolling (like the live site).
// The 16 faded photos are one background image that opens from the centre;
// the 3 highlighted photos sit on top. Reveal finishes in the first ~35% of the pin.
function Community() {
  const { t } = useLang();
  const c = t.home.community;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const bgScale = useTransform(scrollYProgress, [0, 0.35], [0.9, 1]);
  const bgClip = useTransform(scrollYProgress, [0, 0.35], ['circle(12% at 50% 50%)', 'circle(75% at 50% 50%)']);
  const centre = A.community.slice(16, 19);

  return (
    <div className="community-pin" ref={ref}>
      <section className="community">
        <div className="container community__head">
          <Reveal as="h2" className="section-title" y={24}>{c.title}</Reveal>
          <Reveal as="p" className="section-sub" delay={0.05} y={24}>{c.text}</Reveal>
        </div>
        <div className="community__gallery">
          <motion.img
            className="community__bg"
            src={A.communityBg}
            alt=""
            style={{ opacity: bgOpacity, scale: bgScale, clipPath: bgClip }}
          />
          {centre.map((src, i) => (
            <motion.div
              key={src}
              className={`community__center community__center--${i}`}
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18, delay: i * 0.08 }}
            >
              <img src={src} alt="" />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  const { t, lang } = useLang();
  const n = t.home.nav;
  return (
    <div className="page page--home">
      <Navbar
        variant="light"
        items={[
          { label: n.services, href: '#ourservices' },
          { label: n.contact, route: '/contact' },
          { label: n.business, route: '/for-business', pill: true },
        ]}
      />
      <main>
        <Hero />
        <Services />
        <Community />
      </main>
      <Footer
        variant="light"
        topId="hero"
        knowUs={[
          { label: n.business, route: '/for-business' },
          { label: n.contact, route: '/contact' },
        ]}
      />
    </div>
  );
}
