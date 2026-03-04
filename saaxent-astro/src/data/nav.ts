export const nav = {
  primaryCta: {
    label: 'Get Started',
    href: '/contact-us'
  },
  items: [
    {
      label: 'Home',
      type: 'dropdown' as const,
      children: [
        { label: 'Home One', href: '/' },
        { label: 'Home Two', href: '/home-v2' }
      ]
    },
    { label: 'About Us', type: 'link' as const, href: '/about' },
    { label: 'Features', type: 'link' as const, href: '/features' },
    {
      label: 'Pages',
      type: 'mega' as const,
      columns: [
        {
          sections: [
            {
              heading: 'Pages',
              links: [
                { label: 'Features', href: '/features' },
                { label: 'Integration', href: '/integration' },
                { label: 'Blog', href: '/blog' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'Contact', href: '/contact-us' }
              ]
            },
            {
              heading: 'Utility Pages',
              links: [
                { label: '404 Page', href: '/404' },
                { label: 'Password Protected', href: '/401' }
              ]
            }
          ]
        },
        {
          sections: [
            {
              heading: 'CMS Pages',
              links: [
                { label: 'Feature Details', href: '/features/task-automation' },
                { label: 'Team Details', href: '/team/david-wilson' },
                { label: 'Integration Details', href: '/integration/floxity' },
                { label: 'Blog Details', href: '/blog/maximizing-efficiency-with-saas-tools' }
              ]
            },
            {
              heading: 'Template Info',
              links: [
                { label: 'Style Guide', href: '/template-info/style-guide' },
                { label: 'Changelog', href: '/template-info/changelog' },
                { label: 'Licenses', href: '/template-info/licenses' }
              ]
            }
          ]
        }
      ]
    },
    { label: 'Team', type: 'link' as const, href: '/team' }
  ]
};
