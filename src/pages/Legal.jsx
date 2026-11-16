import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SiteChrome from '../components/SiteChrome';
import Linkify from '../components/Linkify';
import { Reveal } from '../components/Motion';
import { useLang } from '../i18n/LangContext';
import { legal, LAST_UPDATED } from '../i18n/legal';
import { pageText } from '../i18n/pages';

const slug = (i) => `section-${i + 1}`;

function Paragraphs({ lines }) {
  // group consecutive "• " lines into a list
  const blocks = [];
  lines.forEach((line) => {
    if (line.startsWith('• ')) {
      const last = blocks[blocks.length - 1];
      if (last && last.type === 'ul') last.items.push(line.slice(2));
      else blocks.push({ type: 'ul', items: [line.slice(2)] });
    } else blocks.push({ type: 'p', text: line });
  });
  return blocks.map((b, i) =>
    b.type === 'ul' ? (
      <ul key={i}>
        {b.items.map((it, k) => (
          <li key={k}><Linkify text={it} /></li>
        ))}
      </ul>
    ) : (
      <p key={i}><Linkify text={b.text} /></p>
    )
  );
}

/** product: 'hub' | 'business'; kind: 'privacy' | 'terms' */
export default function Legal({ product, kind }) {
  const { lang, to } = useLang();
  const doc = legal[product][kind][lang];
  const ui = pageText[lang].legal;
  const base = product === 'business' ? '/for-business' : '';
  const otherKind = kind === 'privacy' ? 'terms' : 'privacy';

  const jump = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <SiteChrome product={product}>
      <section className={`legal-hero legal-hero--${product}`}>
        <div className="container legal-hero__inner">
          <Reveal as="span" className="chip-label">{product === 'business' ? ui.business : ui.hub}</Reveal>
          <Reveal as="h1" delay={0.05}>{doc.title}</Reveal>
          <Reveal as="p" className="legal-hero__updated" delay={0.1}>
            {ui.updated}: {LAST_UPDATED[lang]}
          </Reveal>
        </div>
      </section>

      <section className="legal">
        <div className="container legal__inner">
          <aside className="legal__toc">
            <span>{ui.onThisPage}</span>
            <nav>
              {doc.sections.map((s, i) => (
                <a key={s.h} href={`#${slug(i)}`} onClick={(e) => jump(e, slug(i))}>
                  {s.h}
                </a>
              ))}
            </nav>
          </aside>

          <article className="legal__body">
            <Reveal as="p" className="legal__intro"><Linkify text={doc.intro} /></Reveal>
            {doc.sections.map((s, i) => (
              <motion.section
                key={s.h}
                id={slug(i)}
                className="legal__section"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5 }}
              >
                <h2><span className="legal__num">{i + 1}.</span> {s.h}</h2>
                <Paragraphs lines={s.p} />
              </motion.section>
            ))}

            <div className="legal__footer-card">
              <div>
                <strong>{ui.questions}</strong>
                <Link className="text-link" to={to(`${base}/${otherKind}`)}>{ui.other[kind]}</Link>
              </div>
              <Link className="btn btn--dark" to={to(`${base}/contact`)}>{ui.contactCta}</Link>
            </div>
          </article>
        </div>
      </section>
    </SiteChrome>
  );
}
