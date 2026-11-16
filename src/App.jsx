import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LangProvider } from './i18n/LangContext';
import Home from './pages/Home';
import Business from './pages/Business';
import Legal from './pages/Legal';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // wait for the page to render (page transitions), then scroll to the section
      let tries = 0;
      const id = setInterval(() => {
        const el = document.querySelector(hash);
        if (el || ++tries > 20) {
          clearInterval(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearInterval(id);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

const Page = ({ children }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
    {children}
  </motion.div>
);

export default function App() {
  const location = useLocation();
  return (
    <LangProvider>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {['', '/ar'].map((p) => [
            <Route key={p + 'home'} path={p || '/'} element={<Page><Home /></Page>} />,
            <Route key={p + 'contact'} path={`${p}/contact`} element={<Page><Contact product="hub" /></Page>} />,
            <Route key={p + 'privacy'} path={`${p}/privacy`} element={<Page><Legal product="hub" kind="privacy" /></Page>} />,
            <Route key={p + 'terms'} path={`${p}/terms`} element={<Page><Legal product="hub" kind="terms" /></Page>} />,
            <Route key={p + 'biz'} path={`${p}/for-business`} element={<Page><Business /></Page>} />,
            <Route key={p + 'bizcontact'} path={`${p}/for-business/contact`} element={<Page><Contact product="business" /></Page>} />,
            <Route key={p + 'bizprivacy'} path={`${p}/for-business/privacy`} element={<Page><Legal product="business" kind="privacy" /></Page>} />,
            <Route key={p + 'bizterms'} path={`${p}/for-business/terms`} element={<Page><Legal product="business" kind="terms" /></Page>} />,
          ])}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </LangProvider>
  );
}
