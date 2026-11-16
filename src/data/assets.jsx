// All images currently load from the live Framer CDN.
// To self-host: download each file into /public/images and replace the URL with "/images/<file>".
const CDN = 'https://framerusercontent.com/images/';
const img = (file) => CDN + file;

// Local brand assets (public/images)
export const local = {
  heroVisual: '/images/hero-visual.png',
  bowl: '/images/bowl.webp',
  calendar: '/images/calendar.webp',
};

export const homeAssets = {
  communityBg: '/images/community-bg.webp',
  heroVisual: local.heroVisual,
  heroPhone: '/images/hero-phone.webp',
  heroPhoneAr: '/images/hero-phone-ar.webp',
  heroBubbleOffersAr: '/images/hero-bubble-offers-ar.png',
  heroBubbleBookingAr: '/images/hero-bubble-booking-ar.png',
  heroDoodles: '/images/hero-pattern.webp',
  heroSlot: '/images/hero-slot.png',
  heroSlotAr: '/images/hero-slot-ar.png',
  heroRestaurants: '/images/hero-restaurants.png',
  heroRestaurantsAr: '/images/hero-restaurants-ar.png',
  heroBubbleOffers: '/images/hero-bubble-offers.png',
  heroBubbleBooking: '/images/hero-bubble-booking.png',
  heroPhoneBack: img('0YaLvQyGmUPlGUVFSRCR3xms.png'),
  heroPhoneFrontEn: img('hQ2lkofGL4GBebh2BbNjDPV6cw.png'),
  heroPhoneFrontAr: img('9C7LuQ6xyXnU4LskEvmtdqooe4.png'),
  heroPattern: img('f2e7fZPWQw0thnH6CvGsSqVH6M.svg'),
  decoCalendar: local.calendar,
  decoBowl: local.bowl,
  community: [
    '9f1l3IEYarkEvt5h7XZQVjcw.png',
    'eB6kpcw854jOvxbLsYQEelw.jpg',
    'VNiTx1SVjUi8spFXA3GFW1MJak.png',
    'd9tthnjeaTWfXfLAZYzjckWbkac.jpg',
    'EvfpYcs1TDo2ymDX3u0lDO84.png',
    'tpgHPUr6YZe1oDzcrgGen8z0Rw.png',
    'I7j3s0olHXHaROHujWvYV43uKDo.png',
    'dqr1jgSVZUF7CdhBdvo8mSBbj0.png',
    'KXhvEPQ4cBUbUgyJWje3e6kNzA.jpg',
    '1Rkn9ibHvU9IeivQVX2bnJ7qs.png',
    'BqO361x6x2xbRJfDGX6ChiUg.png',
    '09jYhuxbWxZPqDRnOFLcV3wzZE.jpg',
    'WOAaEStqMYsp1uqoG6djVZKlKA.jpg',
    'TR7fRSCgT0Ykr9XfapnOOaHY.jpg',
    'pf3M4v52aNkaav3kWUilk0LkiOs.png',
    'QHpJleLk1IT6GdIlbmqTTExkvek.png',
    'vB2v3FzYQ1YJN7BadvnwWebo8.jpg',
    'IKiLhy3oJhWwP4PDppgCjvYtxU.jpg',
    'WjIJzYFmdVGNO2Wdx3nDKolALk.jpg',
  ].map((f) => img(f) + '?width=400'),
};

export const businessAssets = {
  heroTablet: img('n4Jsdsyl0knNiJU5qQDh7lsc.svg'),
  heroPercent: img('K1V6pc0FWpkUooLau4di3P1wNg.svg'),
  heroDeco: img('BpU9MDworU4axwfFGBqcbavniw.svg'),
  dashboard: '/images/dashboard-en.webp',
  dashboardAr: '/images/dashboard-ar.webp',
  reservationMockup: '/images/reservation-mockup.webp',
  reservationMockupAr: '/images/reservation-mockup-ar.webp',
  decoCup: '/images/cup.webp',
  adsMedia: '/images/ads-media.webp',
  offersMedia: '/images/offers-media.webp',
  decoBowl: local.bowl,
  decoBowl2: local.bowl,
  adsScreen: img('YhQvNgA8eyH9hDMu0FfpxIpY2A.png'),
  offersScreen: img('5SEpSJius1QqscRUfSaKtq0MQUk.png'),
  pricingBg: img('AQB4clNgMZkuDaQ5JWQLcAaFDc.png'),
  ctaCalendar: img('PO8yYW8MHMxBP4S7ZuZ4W1Imjs.svg'),
  ctaTable: img('54PjJcq0uujo4kwTtHTwIB9CQs.svg'),
  // order = Sara, Ahmed, Omar, Khaled, Maha, Lina, Yousef, Dalia, Laila
  avatars: [
    'vMjrBFxjyplyz9BCRgJCLPhNpZ0.jpg',
    'YSfmocQwIgmmTlKzmi4rBm4iUQE.png',
    'wmAn2JUBtCnksRJYmJTzFUhY8jg.png',
    '8orWX6hzopbPXz7RF8sqfWwChcE.jpg',
    'cUd26uYjiCFUD3fYiNA7ZsWL7yQ.jpg',
    'YmY6b9NKP7RKURTf8oS8SHjs.jpg',
    'VvZiEUXeIwqAVEbO7i3weFwMOLA.png',
    '5v3N5AommD1iZ8Wu6yfrRQJJfa4.png',
    'hwEA4ElJ6LRJKHggSnCIVPDd1w.png',
  ].map((f) => img(f) + '?width=120'),
};

export const badges = {
  appStore: () => '/images/badge-appstore.png',
  googlePlay: () => '/images/badge-googleplay.png',
};

export const links = {
  appStore: 'https://apps.apple.com/eg/app/bing/id6758341192',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.binghub.bingapp',
  signUp: (lang) => `https://portal.binghub.net/${lang}/sign-up`,
  signUpPlan: (lang, days) => `https://portal.binghub.net/${lang}/sign-up?plan=${days}`,
  contactApp: 'https://binghub.net/app-contact',
  contactBusiness: 'https://binghub.net/business-contact',
  privacy: 'https://binghub.net/webprivacy-policy',
  terms: 'https://binghub.net/webterms-and-conditions',
  email: 'info@binghub.net',
  facebook: 'https://www.facebook.com/people/BingHub/61585048671080/',
  instagram: 'https://www.instagram.com/binghub',
  whatsapp: 'https://api.whatsapp.com/message/TWEIFZFGU3HNB1?autoload=1&app_absent=0',
};
