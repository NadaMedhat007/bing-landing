import { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { content } from './content';

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const { pathname } = useLocation();
  const lang = pathname === '/ar' || pathname.startsWith('/ar/') ? 'ar' : 'en';
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  // Path of the same page in the other language
  const base = lang === 'ar' ? pathname.replace(/^\/ar/, '') || '/' : pathname;
  const otherPath = lang === 'ar' ? base : `/ar${base === '/' ? '' : base}`;
  const to = (p) => (lang === 'ar' ? `/ar${p === '/' ? '' : p}` : p);

  return (
    <LangContext.Provider value={{ lang, dir, t: content[lang], otherPath, to, isRtl: lang === 'ar' }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
