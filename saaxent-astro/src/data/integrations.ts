import { resolveImage } from '../utils/resolveImage';

export const integrationBreadcrumb = {
  badge: 'Integration',
  title: 'Seamless',
  highlight: 'Integration',
  titleAfter: 'With Your Favorite Tools'
};

export const integrationItems = [
  {
    name: 'Plaxota',
    type: 'CRM Platform',
    description:
      'Connect SaaXent with Plaxota to streamline your customer relationship management and boost sales efficiency.',
    icon: resolveImage('/images/plaxota.svg'),
    href: '/integration/plaxota'
  },
  {
    name: 'Intraxon',
    type: 'Communication',
    description:
      'Integrate with Intraxon for seamless team communication and real-time collaboration across your organization.',
    icon: resolveImage('/images/intraxon.svg'),
    href: '/integration/intraxon'
  },
  {
    name: 'Appixy',
    type: 'Automation',
    description:
      'Connect SaaXent with Appixy to automate workflows and eliminate repetitive tasks across your business processes.',
    icon: resolveImage('/images/appixy.svg'),
    href: '/integration/appixy'
  },
  {
    name: 'Floxity',
    type: 'Project Management',
    description:
      'Integrate with Floxity to manage projects effectively and keep your teams aligned on goals and deadlines.',
    icon: resolveImage('/images/floxity.svg'),
    href: '/integration/floxity'
  },
  {
    name: 'Astronyx',
    type: 'Cloud Storage',
    description:
      'Connect with Astronyx for secure cloud storage solutions that keep your files safe and accessible anywhere.',
    icon: resolveImage('/images/astronyx.svg'),
    href: '/integration/astronyx'
  },
  {
    name: 'Aliestra',
    type: 'Analytics',
    description:
      'Integrate with Aliestra to unlock powerful analytics and gain deeper insights into your business performance.',
    icon: resolveImage('/images/aliestra.svg'),
    href: '/integration/aliestra'
  },
  {
    name: 'Krafton',
    type: 'Marketing',
    description:
      'Connect SaaXent with Krafton to supercharge your marketing campaigns and reach your target audience effectively.',
    icon: resolveImage('/images/krafton.svg'),
    href: '/integration/krafton'
  },
  {
    name: 'Urpaxon',
    type: 'Finance',
    description:
      'Integrate with Urpaxon for streamlined financial management, invoicing, and expense tracking capabilities.',
    icon: resolveImage('/images/urpaxon.svg'),
    href: '/integration/urpaxon'
  },
  {
    name: 'Profly',
    type: 'HR Management',
    description:
      'Connect with Profly to simplify human resource management, from recruitment to employee engagement.',
    icon: resolveImage('/images/profly.svg'),
    href: '/integration/profly'
  }
];
