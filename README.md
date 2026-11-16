# Bing — Landing & Bing for Business (React)

React + Vite rebuild of [binghub.net](https://binghub.net/) and [binghub.net/for_business](https://binghub.net/for_business), in **English and Arabic (RTL)**, with Framer-style animations powered by [Framer Motion](https://www.framer.com/motion/).

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in /dist
npm run preview   # preview the build
```

## Routes

Every page exists in English and Arabic (add `/ar` in front for Arabic, e.g. `/ar/contact`).

| Page | Path |
|---|---|
| Home (app landing) | `/` |
| Contact (form → info@binghub.net) | `/contact` |
| Privacy Policy | `/privacy` |
| Terms & Conditions | `/terms` |
| Bing for Business | `/for-business` |
| Business contact (form → support@binghub.net) | `/for-business/contact` |
| Business Privacy Policy | `/for-business/privacy` |
| Business Terms & Conditions | `/for-business/terms` |

The language toggle switches to the same page in the other language. `<html dir>` and `lang` switch automatically (RTL for Arabic, Cairo font).

## Contact forms — one-time setup ⚠️
The forms are delivered by email through [FormSubmit](https://formsubmit.co) (no backend needed). Configure in `src/data/forms.jsx`.
1. After deploying, submit each form once (Bing contact and Business contact).
2. FormSubmit sends an **activation email** to `info@binghub.net` and to `support@binghub.net` — click **Activate Form** in each.
3. From then on, every submission arrives in the inbox. Visitors see an animated thank-you screen after sending.

## Legal pages
Privacy Policy and Terms & Conditions for both products, in English and Arabic, live in `src/i18n/legal.jsx`. Any email address in the text becomes a clickable `mailto:` link automatically. **Please have them reviewed by a legal advisor before publishing.**

## Project structure

```
src/
  i18n/content.jsx        ← page text (EN + AR). Edit copy here.
  i18n/pages.jsx          ← contact form + legal page UI text
  i18n/legal.jsx          ← Privacy Policy & Terms (Bing + Business, EN + AR)
  data/forms.jsx          ← where each contact form is delivered
  i18n/LangContext.jsx   ← language detection from URL, dir/lang handling
  data/assets.jsx         ← image URLs + external links (app stores, portal sign-up, socials)
  components/
    Motion.jsx           ← Reveal (fade-up on scroll), SplitText (word reveal), Float, stagger helpers
    Navbar.jsx           ← sticky navbar, hides on scroll down, blur on scroll, animated mobile menu
    Footer.jsx, Logo.jsx, Icon.jsx, StoreButtons.jsx
  pages/
    Home.jsx             ← hero (parallax phones + floating tags), services, community gallery
    Business.jsx         ← hero, 3D-tilt dashboard, marketing, interactive table mock,
                           ads/offers, pricing, FAQ accordion, testimonial marquee, CTA
  styles.css             ← design tokens + all styles (logical properties → RTL-safe)
```

## Animations included
- Word-by-word headline reveal on load
- Fade/slide-up reveal + staggered cards on scroll
- Hero phones/tablet parallax with scroll, floating tags & illustrations
- Dashboard screenshot 3D tilt-in on scroll
- Interactive reservation mock (Complete / Cancel / Confirm / Merge + animated success toast)
- Pricing cards lift on hover, rolling button text, pulsing "Best value" badge
- FAQ accordion (height animation)
- Infinite vertical testimonial marquee (pauses on hover)
- Honeycomb community gallery spring-in
- Page fade transitions, hide-on-scroll navbar, animated mobile menu
- Respects `prefers-reduced-motion` for the marquee

## Assets
- Brand illustrations provided by the design team live in `public/images/` (hero phone and floating cards, doodle pattern, bowl, cup, calendar, reservation mockup, ads/offers media).
- Remaining images (community photos, dashboard screenshot, tablet, testimonial avatars, CTA illustrations) still load from the Framer CDN — see `src/data/assets.jsx`. To self-host, download them into `public/images/` and update the paths there.
- App Store / Google Play badges are the official badges served by Apple and Google.

## Notes
- Typography and spacing were measured from the live Framer site at 1440px (Switzer, Inter Display, Satoshi, Cairo for Arabic).
- Arabic testimonials were translated (the live Arabic page shows them in English).
- Typo fixed from the live site: "Start your Free Trail" → "Start your Free Trial".

## Deploying
Any static host works (Vercel, Netlify, GitHub Pages). Run `npm run build` and upload the `dist/` folder. For GitHub Pages / any host, configure SPA fallback so `/ar` and `/for-business` resolve to `index.html` (Vercel/Netlify do this with a rewrite rule).
