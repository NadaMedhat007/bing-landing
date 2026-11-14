import { motion } from 'framer-motion';
import { links, badges } from '../data/assets';
import { useLang } from '../i18n/LangContext';

// Official App Store / Google Play badges (same as the live site)
export default function StoreButtons() {
  const { lang } = useLang();
  return (
    <div className="store-buttons">
      <motion.a whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} href={links.appStore} target="_blank" rel="noreferrer" aria-label="Download on the App Store">
        <img className="badge-apple" src={badges.appStore(lang)} alt="Download on the App Store" />
      </motion.a>
      <motion.a whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} href={links.googlePlay} target="_blank" rel="noreferrer" aria-label="Get it on Google Play">
        <img className="badge-google" src={badges.googlePlay(lang)} alt="Get it on Google Play" />
      </motion.a>
    </div>
  );
}
