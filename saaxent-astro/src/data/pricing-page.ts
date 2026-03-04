export const pricingBreadcrumb = {
  badge: 'Pricing',
  title: 'Flexible',
  highlight: 'Pricing',
  titleAfter: 'Plans to Suit Every Business'
};

export const mainPricing = {
  badge: 'Pricing Plans',
  title: 'Choose the Perfect Plan for Your Business',
  description:
    'Whether you\'re just starting out or running an enterprise, SaaXent has a plan tailored for you.',
  plans: [
    {
      name: 'Starter Plan',
      description: 'Perfect for small businesses and startups.',
      price: '$190',
      period: '/month',
      features: [
        'Access to all basic tools',
        'Task automation',
        'Customizable reports',
        'Secure cloud storage',
        'Email support'
      ],
      cta: { label: 'Get Started', href: '/contact-us' }
    },
    {
      name: 'Business Plan',
      description: 'Ideal for growing businesses needing more advanced capabilities.',
      price: '$290',
      period: '/month',
      features: [
        'Everything in the Starter Plan',
        'Comprehensive CRM system',
        'Project management suite',
        'Secure cloud storage',
        'Priority email and chat support'
      ],
      cta: { label: 'Get Started', href: '/contact-us' }
    },
    {
      name: 'Business Plan',
      description: 'Designed for large businesses with complex needs.',
      price: '$290',
      period: '/month',
      features: [
        'Everything in the Professional Plan',
        'Advanced analytics and reporting',
        'Custom workflows and automations',
        'Secure cloud storage',
        '24/7 phone and email support'
      ],
      cta: { label: 'Get Started', href: '/contact-us' }
    }
  ]
};

export const comparisonTable = {
  title: 'Feature Plan',
  columns: [
    { name: 'Starter Plan', price: '$190', period: '/month' },
    { name: 'Business Plan', price: '$290', period: '/month' },
    { name: 'Business Plan', price: '$290', period: '/month' }
  ],
  features: [
    { name: 'Access to all basic tools', starter: true, professional: true, enterprise: true },
    { name: 'Automations', starter: true, professional: true, enterprise: true },
    { name: 'Task automation', starter: true, professional: true, enterprise: true },
    { name: 'Customizable reports', starter: true, professional: true, enterprise: true },
    { name: 'Secure cloud storage', starter: true, professional: true, enterprise: true },
    { name: 'Comprehensive CRM system', starter: false, professional: true, enterprise: true },
    { name: 'Project management suite', starter: false, professional: true, enterprise: true },
    { name: 'Priority email & chat support', starter: false, professional: true, enterprise: true },
    { name: 'Advanced analytics & reporting', starter: false, professional: false, enterprise: true },
    { name: 'Custom workflows & automations', starter: false, professional: false, enterprise: true },
    { name: '24/7 phone and email support', starter: false, professional: false, enterprise: true }
  ],
  cta: { label: 'Get Plan', href: '/contact-us' }
};
