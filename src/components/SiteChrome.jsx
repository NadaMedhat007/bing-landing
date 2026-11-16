import Navbar from './Navbar';
import Footer from './Footer';
import { useLang } from '../i18n/LangContext';
import { links } from '../data/assets';

/** Navbar + footer for inner pages (contact, privacy, terms). product: 'hub' | 'business' */
export default function SiteChrome({ product = 'hub', children }) {
  const { t, lang } = useLang();

  if (product === 'business') {
    const n = t.business.nav;
    const items = [
      { label: n.benefits, route: '/for-business#benefits' },
      { label: n.pricing, route: '/for-business#pricing' },
      { label: n.faqs, route: '/for-business#faqs' },
      { label: n.testimonials, route: '/for-business#testimonials' },
      { label: n.contact, route: '/for-business/contact' },
    ];
    return (
      <div className="page page--business page--inner" id="page-top">
        <Navbar variant="red" items={items} cta={{ label: n.cta, href: links.signUp(lang) }} />
        <main>{children}</main>
        <Footer variant="red" product="business" topId="page-top" showBlurb={false} showSocial knowUs={items} />
      </div>
    );
  }

  const n = t.home.nav;
  return (
    <div className="page page--home page--inner" id="page-top">
      <Navbar
        variant="light"
        items={[
          { label: n.services, route: '/#ourservices' },
          { label: n.contact, route: '/contact' },
          { label: n.business, route: '/for-business', pill: true },
        ]}
      />
      <main>{children}</main>
      <Footer
        variant="light"
        product="hub"
        topId="page-top"
        knowUs={[
          { label: n.business, route: '/for-business' },
          { label: n.contact, route: '/contact' },
        ]}
      />
    </div>
  );
}
