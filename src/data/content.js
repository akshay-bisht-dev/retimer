// All page copy lives here so it can be edited without touching layout code.
// Health copy is kept to what the official site states. Avoid adding outcome promises.
import { assets } from './assets.js';

export const chapters = [
  { id: 'top', label: 'Opening' },
  { id: 'rhythm', label: 'Out of sync' },
  { id: 'product', label: 'The product' },
  { id: 'science', label: 'The science' },
  { id: 'features', label: 'Features' },
  { id: 'life', label: 'Real life' },
  { id: 'research', label: 'Research' },
  { id: 'buy', label: 'Get retimer' },
  { id: 'final', label: 'Final frame' },
];

export const navLinks = [
  { href: '#product', label: 'Product' },
  { href: '#science', label: 'Science' },
  { href: '#features', label: 'Features' },
  { href: '#life', label: 'Life' },
  { href: '#research', label: 'Research' },
];

export const hero = {
  eyebrow: 'Introducing retimer light therapy',
  headline: ['Find your', 'rhythm.'],
  copy: 'Light therapy designed to help your body find its natural rhythm.',
  primary: { label: 'Discover retimer', href: '#product' },
  secondary: { label: 'How it works', href: '#science' },
};

export const problem = {
  label: 'Chapter 02 — Out of sync',
  headlineA: 'Your world moves fast.',
  headlineB: 'Your body has its own time.',
  copy: 'Early starts, changing schedules, and long-distance travel can challenge your natural sleep-wake rhythm.',
  scenes: [
    { time: '23:48', caption: 'Screens keep the evening bright.', image: assets.problemScreens },
    { time: '05:30', caption: 'The alarm arrives before the sun.', image: assets.problemNight },
    { time: '07:10', caption: 'Winter mornings stay dark.', image: assets.problemDarkMorning },
    { time: 'GMT+10', caption: 'New time zone. Same internal clock.', image: assets.problemSunrise },
  ],
};

export const reveal = {
  label: 'Chapter 03 — The product',
  headline: ['Meet a different', 'kind of light.'],
  copy: "retimer is a wearable light therapy device designed around your body's internal clock.",
  // Positions are percentages of the trimmed hero-product image.
  annotations: [
    { id: 'light', x: 63, y: 84, title: 'Light-delivery area', text: '4 LEDs and a diffuser direct blue-green light upward, from below the eyes.' },
    { id: 'pads', x: 76, y: 70, title: 'Adjustable nose pads', text: 'Soft silicone, with three nosepieces in the box.' },
    { id: 'button', x: 27, y: 61, title: 'One-button control', text: 'Start a session without reaching for your phone.' },
  ],
};

export const science = {
  label: 'Chapter 04 — The science of light',
  headline: ['Light is more than', 'what you see.'],
  copy: 'Light exposure at specific times can influence circadian rhythms — the internal timing system that helps regulate your sleep and wake cycle.',
  disclaimer: 'Conceptual illustration. Not a medical or biological simulation.',
  steps: [
    { kicker: '01 — The clock', title: 'Inside you, a 24-hour rhythm.', text: 'Your body runs on an internal clock that shapes when you feel alert and when you feel sleepy.' },
    { kicker: '02 — The signal', title: 'Light is its strongest cue.', text: 'Light reaching the eyes is one of the main signals the brain uses to set that clock.' },
    { kicker: '03 — The wavelength', title: 'Blue-green, around 500 nm.', text: 'retimer delivers light in the blue-green range — a part of the spectrum the circadian system responds to.' },
    { kicker: '04 — The timing', title: 'When matters as much as how.', text: 'Morning light tends to shift the clock earlier. Light later in the day can shift it later.' },
    { kicker: '05 — In short', title: 'The right light, at the right time.', text: 'Your best timing depends on your schedule and goals. The retimer app helps you plan it.' },
  ],
};

export const features = {
  label: 'Chapter 05 — Engineered for everyday life',
  headline: ['Advanced light.', 'Everyday freedom.'],
  items: [
    {
      id: 'light',
      index: '01',
      title: 'Targeted light delivery',
      text: 'retimer 3 sits below your line of sight and directs blue-green light upward toward the eyes, so you can keep seeing what you are doing.',
      notes: ['500–504 nm', '4 LEDs · diffuser', 'UV-free'],
      image: assets.featureLight,
      tone: '#0a1a22',
    },
    {
      id: 'wearable',
      index: '02',
      title: 'Lightweight, wearable design',
      text: 'At 36 grams it is light enough to wear while you make breakfast or get ready. It also fits over prescription glasses.',
      notes: ['36 g', 'Over prescription glasses', 'Adjustable nose pads'],
      image: assets.featureWearable,
      tone: '#12161a',
    },
    {
      id: 'portable',
      index: '03',
      title: 'Designed for portability',
      text: 'Up to 5.6 hours of use per charge, USB-C charging in under two hours, and a travel case to carry it between home, work and flights.',
      notes: ['Up to 5.6 h', 'USB-C', 'Travel case'],
      tone: '#0d1418',
    },
    {
      id: 'research',
      index: '04',
      title: 'Research-informed technology',
      text: 'Built on 25+ years of research and development in Australian light science. retimer devices have been used in 20+ clinical research studies.',
      notes: ['25+ years R&D', '20+ studies'],
      tone: '#07121c',
    },
    {
      id: 'app',
      index: '05',
      title: 'A connected experience',
      text: 'The retimer app for iOS and Android helps plan when to use your light, and syncs with Apple Health and Health Connect.',
      notes: ['iOS & Android', 'Apple Health', 'Health Connect'],
      image: assets.productApp,
      tone: '#0b1622',
    },
  ],
};

export const lifestyle = {
  label: 'Chapter 06 — Designed around real life',
  scenes: [
    {
      id: 'morning',
      kicker: 'The morning',
      headline: ['Make space for a', 'better morning.'],
      text: 'Wear it while you check the day ahead or make breakfast. Sessions often start at around 20–30 minutes.',
      image: assets.lifestyleMorning,
      warmth: 'morning',
    },
    {
      id: 'journey',
      kicker: 'The journey',
      headline: ['Take your rhythm', 'with you.'],
      text: 'Plan light around a trip — before you fly, in transit and after you land. The app helps you map the timing.',
      image: assets.lifestyleTravel,
      warmth: 'journey',
    },
    {
      id: 'everyday',
      kicker: 'The everyday',
      headline: ['Light that fits', 'your life.'],
      text: 'Read, sip a tea, answer a few emails. Hands-free light that stays below your line of sight.',
      image: assets.lifestyleEveryday,
      warmth: 'everyday',
    },
  ],
};

export const research = {
  label: 'Chapter 07 — Research and credibility',
  headline: ['Science, built', 'into the design.'],
  intro: 'retimer grew out of decades of sleep and light research. Here is what the company publishes about its evidence base — with links, so you can read it yourself.',
  studiesHeading: 'Published research involving retimer devices',
  note: 'Studies were conducted in specific populations, sometimes with earlier retimer models. Individual results vary.',
};

export const purchase = {
  label: 'Chapter 08 — Get retimer 3',
  headline: ['Your next chapter', 'starts with light.'],
  copy: 'Explore a wearable approach to light therapy designed to fit into your routine.',
};

export const finale = {
  headline: ['Reset your relationship', 'with light.'],
  copy: 'Discover retimer light therapy.',
  cta: 'Explore retimer',
};

export const healthNotice =
  'retimer is a light therapy device and is not intended to diagnose, treat, cure or prevent any disease. Results vary between individuals. If you have retinal disease or another eye condition, photosensitivity, bipolar disorder or any other medical condition, talk to a qualified healthcare professional before use.';
