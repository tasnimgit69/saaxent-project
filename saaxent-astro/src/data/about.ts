import { resolveImage } from '../utils/resolveImage';

export const aboutBreadcrumb = {
  badge: 'About Us',
  title: 'Simplicity and Innovation in Business',
  highlight: 'Management'
};

export const whatWeDo = {
  badge: 'What We Do',
  title: 'Managing a Modern Business Can be Challenging',
  description:
    'At SaaXent, we understand the challenges of managing a modern business. That\'s why we\'ve developed a comprehensive suite of tools designed to simplify complex processes.',
  goals: [
    {
      title: 'Scalable Solutions',
      description:
        'Our platform grows with your business, offering scalable solutions that ensure you have the tools you need.'
    },
    {
      title: 'Project Management Suite',
      description:
        'Plan, execute, and monitor projects efficiently with our robust project management tools.'
    },
    {
      title: 'Seamless Integration',
      description:
        'Connect SaaXent with your existing tools and systems effortlessly, creating a unified workflow.'
    }
  ],
  images: {
    businessCard: {
      src: resolveImage('/images/bussines-sucess-card.png'),
      alt: 'Business success card'
    },
    progressCard: {
      src: resolveImage('/images/progress-card.png'),
      alt: 'Progress card'
    },
    exportGraph: {
      src: resolveImage('/images/what-we-do-export-gharph.png'),
      alt: 'Export graph'
    }
  }
};

export const ourValues = {
  badge: 'Our Values',
  title: 'Our Values Are the Foundation of Everything We Do',
  description:
    'They guide our decisions, shape our culture, and drive our commitment to providing exceptional SaaS solutions.',
  values: [
    {
      title: 'Customer-Centricity',
      description:
        'Your success is our priority. We are dedicated to providing exceptional support & ensuring that.'
    },
    {
      title: 'Sustainability',
      description:
        'We are committed to sustainable practices that benefit our community & the ensuring long-term success.'
    },
    {
      title: 'Empowerment',
      description:
        'We empower our clients by providing them with the tools and knowledge they need to succeed, fostering growth.'
    }
  ],
  stats: [
    { value: 99, suffix: '.5%', label: 'Customers' },
    { value: 220, suffix: '%', label: 'Return on Investment' },
    { value: 24, suffix: '/7', label: 'Customer Support' },
    { value: 3, suffix: '.5M', label: 'Social Followers' }
  ]
};

export const ourMission = {
  badge: 'Our Mission',
  title: 'Empowering Businesses Through Innovation',
  description:
    'At SaaXent, our mission is to empower businesses with cutting-edge SaaS solutions that simplify operations, enhance productivity.',
  items: [
    {
      title: 'Simplify Complex Processes',
      description:
        'Our platform grows with your business, offering scalable solutions that ensure you have the tools you need.'
    },
    {
      title: 'Enhance Productivity',
      description:
        'Plan, execute, and monitor projects efficiently with our robust project management tools.'
    }
  ],
  images: {
    banner: {
      src: resolveImage('/images/our-mission-banner.png'),
      alt: 'Our mission banner'
    },
    chart1: {
      src: resolveImage('/images/jan-month-Cards.png'),
      alt: 'January data'
    },
    chart2: {
      src: resolveImage('/images/feb-month-Cards.png'),
      alt: 'February data'
    },
    chart3: {
      src: resolveImage('/images/march-month-Cards.png'),
      alt: 'March data'
    }
  }
};

export const ourVision = {
  badge: 'Our Vision',
  title: 'Leading the Future of Business Management',
  description:
    'Our vision is to be the leading provider of innovative SaaS solutions, transforming the way businesses operate and achieve success.',
  items: [
    {
      title: 'Industry Leadership',
      description:
        'Set benchmarks for quality and innovation in the SaaS industry.'
    },
    {
      title: 'Technological Advancement',
      description:
        'Invest in research and development to stay at the forefront.'
    }
  ],
  images: {
    banner: {
      src: resolveImage('/images/our-vision-banner.png'),
      alt: 'Our vision banner'
    },
    invoiceCard: {
      src: resolveImage('/images/our-vision-invoice-card.png'),
      alt: 'Invoice card'
    },
    amountCard: {
      src: resolveImage('/images/amount-card.png'),
      alt: 'Amount card'
    }
  }
};
