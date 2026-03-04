import { resolveImage } from '../utils/resolveImage';

export const heroV1 = {
  badge: 'Discover SaaXent',
  title: 'Simplifying Business With',
  titleHighlight: 'SaaXent',
  description:
    'At SaaXent, we are dedicated to streamlining and enhancing your business operations with our innovative Software as a Service (SaaS) solutions. Our platform is designed to simplify.',
  primaryCta: { label: 'Start Free Trial', href: '/contact-us' },
  secondaryCta: { label: 'Learn More', href: '/features' },
  images: {
    banner: {
      src: resolveImage('/images/hero-v1-growth-banner.png'),
      alt: 'Growth chart banner'
    },
    customerChart: {
      src: resolveImage('/images/customer-count-card.png'),
      alt: 'Customer count chart'
    },
    salesChart: {
      src: resolveImage('/images/sales-comparison-card.png'),
      alt: 'Sales comparison chart'
    }
  }
};

export const funFacts = [
  { value: 99, suffix: '.5%', label: 'Customers' },
  { value: 220, suffix: '%', label: 'Return on Investment' },
  { value: 24, suffix: '/7%', label: 'Customer Support' },
  { value: 3, suffix: '.5M', label: 'Social Followers' }
];

export const aboutUs = {
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
  images: {
    frame: {
      src: resolveImage('/images/about-banner-frame.png'),
      alt: 'About Us banner frame'
    },
    overlay: {
      src: resolveImage('/images/about-banner-overly.png'),
      alt: ''
    }
  }
};

export const featuresSection = {
  badge: 'Features',
  title: 'Manage Your Business Easily With Our',
  titleHighlight: 'Powerful Features',
  description:
    'At SaaXent, we provide a suite of powerful tools designed to simplify and enhance your business management.',
  cta: { label: 'View All Features', href: '/features' }
};

export const pricingSection = {
  badge: 'Pricing',
  title: 'Choose The',
  titleHighlight: 'Best Plan',
  titleAfter: 'For You',
  description:
    'At SaaXent, we believe in providing flexible and transparent pricing plans that cater to businesses of all sizes. We have a plan to suit your needs.'
};

export const integrationSection = {
  badge: 'Integration',
  title: 'Seamless',
  titleHighlight: 'Integration',
  titleAfter: 'with Your Favorite Tools',
  description:
    'Unlock the full potential of your business with SaaXent\'s seamless integration capabilities. Our platform effortlessly connects with a wide range of third-party applications.',
  cta: { label: 'All Integration', href: '/integration' }
};

export const blogSection = {
  badge: 'Our Blog',
  title: 'Explore Insights and',
  titleHighlight: 'Innovations',
  titleAfter: 'with the SaaXent Blog',
  cta: { label: 'View All Blog', href: '/blog' }
};
