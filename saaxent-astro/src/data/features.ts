import { resolveImage } from '../utils/resolveImage';

export const featureItems = [
  {
    tag: 'Task Automation',
    title: 'Streamline Your Workflow By Automating Repetitive Tasks.',
    description:
      'With SaaXent\'s Task Automation feature, you can streamline your workflow by automating repetitive and time-consuming tasks. This powerful tool helps reduce manual effort.',
    image: {
      src: resolveImage('/images/task-automation.png'),
      alt: 'Task Automation'
    },
    chart: {
      src: resolveImage('/images/task-automation-chart.png'),
      alt: 'Task automation chart'
    },
    href: '/features/task-automation',
    variant: 'featured'
  },
  {
    tag: 'Customizable Reports',
    title: 'Tailor Reports To Meet Your Specific Business Needs.',
    description:
      'Empower your business with SaaXent\'s customizable reports. Easily generate detailed and tailored reports to suit your unique needs, enabling you to track progress.',
    image: {
      src: resolveImage('/images/customizable-reports.png'),
      alt: 'Customizable Reports'
    },
    chart: {
      src: resolveImage('/images/customizable-reports-chart.png'),
      alt: 'Reports chart'
    },
    href: '/features/customizable-reports',
    variant: 'standard'
  },
  {
    tag: 'Project Management Suite',
    title: 'Assign Tasks, Set Deadlines, and Track Milestones Effortlessly.',
    description:
      'SaaXent\'s Project Management Suite offers everything you need to plan, execute, and monitor projects with precision and ease. Assign tasks, set deadlines, and track milestones seamlessly.',
    image: {
      src: resolveImage('/images/project-management-suite.png'),
      alt: 'Project Management Suite'
    },
    chart: {
      src: resolveImage('/images/3-banner-card.png'),
      alt: 'Project progress chart'
    },
    href: '/features/project-management-suite',
    variant: 'standard'
  }
];
