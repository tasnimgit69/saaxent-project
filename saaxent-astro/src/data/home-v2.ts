import { resolveImage } from '../utils/resolveImage';

export const heroV2 = {
  badge: 'Discover SaaXent',
  title: 'Streamlining The Business Process With',
  titleHighlight: 'SaaXent',
  description:
    'At SaaXent, we are dedicated to streamlining & enhancing your business operations with our innovative Software as a Service (SaaS) solutions. Our platform is designed to simplify.',
  primaryCta: { label: 'Start Free Trial', href: '/contact-us' },
  secondaryCta: { label: 'Learn More', href: '/features' },
  images: {
    growth: {
      src: resolveImage('/images/hero-v2-growth-banner.png'),
      alt: 'Growth banner'
    },
    customerSticker: {
      src: resolveImage('/images/hero-vs-customer-count-sticker.png'),
      alt: 'Customer count sticker'
    },
    salesComparison: {
      src: resolveImage('/images/hero-v2-sales-comparison.png'),
      alt: 'Sales comparison chart'
    },
    monthly: {
      src: resolveImage('/images/hero-v2-monthly-banner.png'),
      alt: 'Monthly analytics banner'
    }
  }
};

export const aboutV2 = {
  badge: 'About Us',
  title: 'Simplicity and Innovation in Business',
  titleHighlight: 'Management',
  description:
    'Welcome to SaaXent, where innovation meets simplicity in business management. Founded with a mission to empower business of all sizes, we specialize in providing cutting-edge Software as a Service (SaaS) solutions.',
  listItems: [
    'We understand the complexities of managing a modern business.',
    'Our platform is designed to simplify these challenges.',
    'Our solutions are crafted to make your business more efficient.'
  ],
  cta: { label: 'More About Us', href: '/about' },
  stats: [
    { value: 99, suffix: '.5%', label: 'Client Satisfaction' },
    { value: 220, suffix: '%', label: 'Return on Investment' },
    { value: 24, suffix: '/7%', label: 'Customer Support' }
  ],
  images: {
    banner: { 
      src: resolveImage('/images/about-v2-banner.png'),
      alt: 'About Us banner'
    },
    overlay: {
      src: resolveImage('/images/about-v2-banner-overly-img.png'),
      alt: 'Banner overlay image'
    }
  }
};

export const teamSection = {
  badge: 'Team',
  title: 'The',
  titleHighlight: 'Innovators',
  titleAfter: 'Behind Your Business Success',
  description:
    'At SaaXent, our success is driven by a dedicated and passionate team who are committed to delivering innovative SaaS solutions.',
  cta: { label: 'View All Members', href: '/team' }
};
