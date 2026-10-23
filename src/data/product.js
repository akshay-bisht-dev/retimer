// Verified product facts for retimer 3.
// Every value below was checked against the official site on 23 Oct 2026.
// Re-verify before each release — prices and claims change.
//
// Sources:
//   [P] https://www.retimer.com.au/product/retimer-3/
//   [S] https://www.retimer.com.au/technical-specifications/
//   [L] https://www.retimer.com.au/light-therapy/
//   [R] https://www.retimer.com.au/resources/research-papers/
//   [H] https://www.retimer.com.au/  (homepage testimonials)

const SITE = 'https://www.retimer.com.au';

export const links = {
  site: `${SITE}/`,
  product: `${SITE}/product/retimer-3/`,
  productV2: `${SITE}/product/re-timer/`,
  productOverview: `${SITE}/retimer-3/`,
  lightTherapy: `${SITE}/light-therapy/`,
  specs: `${SITE}/technical-specifications/`,
  research: `${SITE}/resources/research-papers/`,
  about: `${SITE}/about/`,
  faqs: `${SITE}/resources/faqs/`,
  contact: `${SITE}/contact/`,
  privacy: `${SITE}/delivery-policy/privacy-policy/`,
  terms: `${SITE}/terms-of-use/`,
  returns: `${SITE}/returns-and-refunds/`,
  manual: `${SITE}/resources/user-manual/`,
  appStore: 'https://apps.apple.com/in/app/retimer/id6475566801',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.re_timer',
};

export const product = {
  name: 'retimer 3',
  fullName: 'retimer 3 Light Therapy Glasses', // [P]
  tagline: 'Smart sleep tech wearable', // [P]
  // [P] / shop page: "$320.00". The store defaults to AUD with a currency selector.
  price: { amount: 320, display: '$320', currencyNote: 'AUD, as listed on the official store' },
  verifiedOn: '23 October 2026',
  warranty: '1-year technical warranty', // [P] [S]
};

export const specs = [
  { label: 'Light', value: 'Blue-green, 500–504 nm dominant wavelength' }, // [S]
  { label: 'Light source', value: '4 LEDs with diffuser cover' }, // [S]
  { label: 'Weight', value: '36 g (product only)' }, // [S]
  { label: 'Battery life', value: 'Up to 5.6 hours' }, // [S]
  { label: 'Charging', value: 'USB-C, under 2 hours' }, // [P]
  { label: 'Size', value: '174 × 166 × 25 mm' }, // [S]
  { label: 'LED life', value: 'More than 10,000 hours' }, // [S]
  { label: 'Warranty', value: '1 year' }, // [S]
];

export const highlights = [
  'Sits below the eyes and directs light upward', // [L] [P]
  'UV-free, flicker-free blue-green light', // [P]
  'Wearable over prescription glasses', // [P]
  'Adjustable silicone nose pads', // [P]
  'Companion app for iOS and Android', // [P]
  'Syncs with Apple Health and Health Connect', // [P]
];

export const inTheBox = [
  'retimer 3 light therapy glasses',
  'Travel case', // [S] [L]
  'USB-C charging cable', // [P]
  'Three nosepieces', // [P] [L]
  'User manual (English / Japanese)', // [S]
];

// [P] product page feature row
export const stats = [
  { value: 25, suffix: '+', label: 'Years of research and development' },
  { value: 20, suffix: '+', label: 'Clinical research studies involving its products' },
  { value: 200000, suffix: '+', label: 'Users, according to retimer' },
];

// [R] "Research involving retimer" — published studies using retimer devices.
export const studies = [
  {
    title: 'A placebo-controlled pilot study of a wearable morning bright light treatment for probable PTSD',
    authors: 'Zalta, Bravo, Valdespino-Hayden, Pollack & Burgess',
    year: 2019,
    url: `${SITE}/research-retimer/a-placebo-controlled-pilot-study-of-a-wearable-morning-bright-light-treatment-for-probable-ptsd/`,
  },
  {
    title: 'Successful sleep extension and phase advance in adolescents in response to a pilot sleep/circadian manipulation',
    authors: 'Hasler, Buysse, Ngari & Franzen',
    year: 2019,
    url: `${SITE}/research-retimer/successful-sleep-extension-and-phase-advance-in-adolescents-in-response-to-a-pilot-sleep-circadian-manipulation/`,
  },
  {
    title: 'Feasibility and preliminary efficacy of a bright light intervention in ovarian and endometrial cancer survivors',
    authors: 'Fox, Baik, McGinty, Garcia, Reid, Bovbjerg et al.',
    year: 2020,
    url: `${SITE}/research-retimer/feasibility-and-preliminary-efficacy-of-a-bright-light-intervention-in-ovarian-and-endometrial-cancer-survivors/`,
  },
  {
    title: 'Daily morning light therapy is associated with an increase in choroidal thickness in healthy young adults',
    authors: 'Read, Pieterse, Alonso-Caneiro et al.',
    year: 2018,
    url: `${SITE}/research-retimer/daily-morning-light-therapy-is-associated-with-an-increase-in-choroidal-thickness-in-healthy-young-adults/`,
  },
];

// [H] Verbatim quotes published on the official homepage.
export const testimonials = [
  {
    quote: 'I am shocked how well it keeps resetting my circadian rhythm.',
    name: 'Kris Gethin',
    role: 'Fitness coach',
  },
  {
    quote: 'retimer 3 has been a game-changer in helping me overcome jet lag.',
    name: 'Rodrigo Nascimento',
    role: 'UFC fighter, USA',
  },
];
