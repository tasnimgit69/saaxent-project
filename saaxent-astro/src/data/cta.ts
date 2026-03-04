import { resolveImage } from '../utils/resolveImage';

export const cta = {
  title: "Transform Your Business with SaaXent's Powerful Tools",
  description:
    "Take your business to the next level with SaaXent's comprehensive suite of SaaS solutions. Sign up now for a 30-day free trial.",
  cta: { label: 'Start Free Trial', href: '/contact-us' },
  images: {
    banner: {
      src: resolveImage('/images/cta-banner.png'),
      alt: 'CTA Banner'
    },
    expenses: {
      src: resolveImage('/images/cta-expenses-card.png'),
      alt: 'Expenses card'
    },
    bgCard: {
      src: resolveImage('/images/cta-bg-card.png'),
      alt: 'CTA background card'
    }
  }
};
