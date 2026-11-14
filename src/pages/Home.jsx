import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StoreButtons from '../components/StoreButtons';
import { Reveal, SplitText, Float, stagger, fadeUp } from '../components/Motion';
import { useLang } from '../i18n/LangContext';
import { homeAssets as A, links } from '../data/assets';

function Hero() {
  const { t } = useLang();
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
            src={A.heroPhone}
            alt="Bing app"
            style={{ y: phoneY }}
            initial={{ opacity: 0, y: 220 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Floating UI elements */}
          {[
            { src: A.heroSlot, cls: 'slot', delay: 1.0, float: 10, dur: 5 },
            { src: A.heroBubbleBooking, cls: 'booking', delay: 1.2, float: 8, dur: 4 },
            { src: A.heroRestaurants, cls: 'restaurants', delay: 1.4, float: 12, dur: 6 },
            { src: A.heroBubbleOffers, cls: 'offers', delay: 1.6, float: 9, dur: 4.5 },
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
        <img src={A.decoCalendar} alt="" />
      </Float>
      <Float className="deco deco--bowl" range={12} rotate={-5} delay={1}>
        <img src={A.decoBowl} alt="" />
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

// Community gallery — pinned while scrolling: starts with the 3 centre photos,
// the rest spring in ring by ring (same behaviour as the live site). 3 rows: 6 / 7 / 6.
const ROWS = [6, 7, 6];
const PITCH = 132; // px between circle centres (104px circle + 28px gap)

function CommunityItem({ src, progress, threshold, edge, center, lit }) {
  const scale = useTransform(progress, [threshold, threshold + 0.18], [center ? 1 : 0.4, 1]);
  const opacity = useTransform(progress, [threshold, threshold + 0.18], [center ? 1 : 0, 1 - edge * 0.6]);
  return (
    <motion.div className={`community__item ${center ? 'is-center' : ''} ${lit ? 'is-lit' : ''}`} style={{ scale, opacity }}>
      <img src={src} alt="" loading="lazy" />
    </motion.div>
  );
}

function Community() {
  const { t } = useLang();
  const c = t.home.community;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const galleryY = useTransform(scrollYProgress, [0, 1], [40, -20]);
  // softly light up 3 random faded photos every 2.2s (like the Framer animation)
  const [lit, setLit] = useState([]);
  useEffect(() => {
    const id = setInterval(() => setLit(Array.from({ length: 3 }, () => Math.floor(Math.random() * 16))), 2200);
    return () => clearInterval(id);
  }, []);

  // Build items with hex coordinates; centre = middle row, middle three.
  let k = 0;
  const items = [];
  ROWS.forEach((count, r) => {
    for (let i = 0; i < count; i++) {
      const x = (i - (count - 1) / 2) * PITCH; // horizontal offset from centre
      const y = (r - 1) * PITCH;
      const center = r === 1 && Math.abs(x) <= PITCH;
      items.push({ x, y, center, r, i });
    }
  });
  // centre photos use the last three images (as on the live site), the rest in order
  const outer = A.community.slice(0, 16);
  const mid = A.community.slice(16, 19);
  const maxDist = Math.hypot(3 * PITCH, PITCH);

  return (
    <div className="community-pin" ref={ref}>
      <section className="community">
        <div className="container community__head">
          <Reveal as="h2" className="section-title">{c.title}</Reveal>
          <Reveal as="p" className="section-sub" delay={0.1}>{c.text}</Reveal>
        </div>
        <motion.div className="community__gallery" style={{ y: galleryY }}>
          {ROWS.map((count, r) => (
            <div key={r} className="community__row">
              {items.filter((it) => it.r === r).map((it) => {
                const dist = Math.hypot(it.x, it.y) / maxDist; // 0 centre … 1 corner
                const outerIdx = it.center ? -1 : k++;
                const src = it.center ? mid[it.i - 2] : outer[outerIdx % outer.length];
                return (
                  <CommunityItem
                    key={it.i}
                    src={src}
                    progress={scrollYProgress}
                    center={it.center}
                    lit={lit.includes(outerIdx)}
                    threshold={it.center ? 0 : 0.05 + dist * 0.6}
                    edge={Math.min(1, Math.abs(it.x) / (3 * PITCH)) ** 2}
                  />
                );
              })}
            </div>
          ))}
        </motion.div>
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
          { label: n.contact, href: links.contactApp },
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
          { label: n.contact, href: links.contactApp },
        ]}
      />
    </div>
  );
}
