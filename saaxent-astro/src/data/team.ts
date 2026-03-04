import { resolveImage } from '../utils/resolveImage';

export const teamMembers = [
  {
    name: 'David Wilson',
    role: 'Chief Executive Officer',
    image: {
      src: resolveImage('/images/david-wilson.png'),
      alt: 'David Wilson'
    },
    href: '/team/david-wilson'
  },
  {
    name: 'Emily Johnson',
    role: 'Chief Technology Officer',
    image: {
      src: resolveImage('/images/emily-johnson.png'),
      alt: 'Emily Johnson'
    },
    href: '/team/emily-johnson'
  },
  {
    name: 'Michael Brown',
    role: 'Head of Product',
    image: {
      src: resolveImage('/images/michael-brown.png'),
      alt: 'Michael Brown'
    },
    href: '/team/michael-brown'
  },
  {
    name: 'John Doe',
    role: 'Lead Designer',
    image: {
      src: resolveImage('/images/john-doe.png'),
      alt: 'John Doe'
    },
    href: '/team/john-doe'
  },
  {
    name: 'Lisa Martinez',
    role: 'Marketing Director',
    image: {
      src: resolveImage('/images/lisa-martinez.png'),
      alt: 'Lisa Martinez'
    },
    href: '/team/lisa-martinez'
  }
];
