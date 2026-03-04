export const footer = {
  newsletter: {
    title: 'Subscribe Our Newsletter',
    excerpt: "We'll Send you a nice letter once per week. No spam",
    placeholder: 'Enter your email'
  },
  columns: [
    {
      title: 'Quick Links',
      links: [
        [
          { label: 'Home V1', href: '/' },
          { label: 'About Us', href: '/about' },
          { label: 'Features', href: '/features' },
          { label: 'Team', href: '/team' }
        ],
        [
          { label: 'Blog', href: '/blog' },
          { label: 'Pricing', href: '/pricing' },
          { label: 'Integration', href: '/integration' },
          { label: 'Contact', href: '/contact-us' }
        ]
      ]
    },
    {
      title: 'CMS Pages',
      links: [
        [
          { label: 'Blog Details', href: '/blog/maximizing-efficiency-with-saas-tools' },
          { label: 'Feature Details', href: '/features/task-automation' },
          { label: 'Team Details', href: '/team/emily-johnson' },
          { label: 'Integration Details', href: '/integration/floxity' }
        ]
      ]
    },
    {
      title: 'Utility Pages',
      links: [
        [
          { label: '404 Not Found', href: '/404' },
          { label: 'Password Protected', href: '/401' },
          { label: 'Style Guide', href: '#' },
          { label: 'Licenses', href: '#' },
          { label: 'Changelog', href: '#' }
        ]
      ]
    },
    {
      title: 'Contact Us',
      links: [
        [
          { label: 'contact@saaxent.com', href: 'mailto:contact@saaxent.com' },
          { label: '(316) 555-0116', href: 'tel:3165550116' }
        ]
      ],
      address: '1901 Thornridge Cir. Shiloh, Hawaii 81063'
    }
  ],
  copyright: {
    text: 'Copyright ©',
    brandName: 'SaaXent',
    brandHref: '/',
    designedBy: 'Hasthemes',
    designedByHref: 'https://hasthemes.com/',
    poweredBy: 'Astro',
    poweredByHref: 'https://astro.build/'
  }
};
