import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LangProvider } from './i18n/LangContext';
import Home from './pages/Home';
import Business from './pages/Business';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) return el.scrollIntoView({ behavior: 'smooth' });
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
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/for-business" element={<Page><Business /></Page>} />
          <Route path="/ar" element={<Page><Home /></Page>} />
          <Route path="/ar/for-business" element={<Page><Business /></Page>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </LangProvider>
  );
}
