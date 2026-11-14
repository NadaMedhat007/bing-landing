import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

// Fade + slide up when scrolled into view (Framer "appear" effect)
export function Reveal({ children, delay = 0, y = 40, x = 0, scale = 1, className, as = 'div', amount = 0.25, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, delay, ease }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Staggered container + item
export const stagger = (gap = 0.1, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

// Word-by-word headline reveal
export function SplitText({ text, className, as = 'h1', delay = 0, wordClass }) {
  const Tag = motion[as];
  const words = Array.isArray(text) ? text : text.split(' ');
  return (
    <Tag className={className} initial="hidden" animate="show" variants={stagger(0.09, delay)}>
      {words.map((w, i) => (
        <span key={i} className="split-word">
          <motion.span
            className={typeof wordClass === 'function' ? wordClass(i) : wordClass}
            style={{ display: 'inline-block' }}
            variants={{ hidden: { y: '110%', opacity: 0 }, show: { y: '0%', opacity: 1, transition: { duration: 0.9, ease } } }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

// Gentle infinite float for decorative illustrations
export function Float({ children, className, range = 14, duration = 5, rotate = 4, delay = 0, style }) {
  return (
    <motion.div
      className={className}
      style={style}
      animate={{ y: [0, -range, 0], rotate: [0, rotate, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  );
}
