export const contactBreadcrumb = {
  badge: 'Contact Us',
  title: 'Get in Touch With the',
  highlight: 'SaaXent',
  titleAfter: 'Team'
};

export const contactInfo = {
  title: 'Information',
  cards: [
    {
      icon: 'phone',
      label: 'Phone Number',
      value: '+88040 4621 0013',
      href: 'tel:+8804046210013'
    },
    {
      icon: 'email',
      label: 'Email Address',
      value: 'contact@saaxent.com',
      href: 'mailto:contact@saaxent.com'
    },
    {
      icon: 'location',
      label: 'Location',
      value: '1901 Thornridge Cir. Shiloh, Hawaii 81063'
    }
  ],
  mapLocation: 'Our Location',
  mapCoords: { lat: 36.778261, lng: -119.4179324 }
};

export const contactForm = {
  fields: [
    { name: 'Full-Name', label: 'Name', type: 'text' as const, placeholder: 'Full name', required: true },
    {
      name: 'Email-Address',
      label: 'Email',
      type: 'email' as const,
      placeholder: 'Email address',
      required: true
    },
    {
      name: 'Location',
      label: 'Location',
      type: 'text' as const,
      placeholder: 'Write your location',
      required: false
    }
  ],
  textarea: {
    name: 'Message',
    label: 'Message',
    placeholder: 'Write what you want to know',
    maxLength: 5000
  },
  submitLabel: 'Send Message',
  successMessage: 'Thank you! Your submission has been received!',
  errorMessage: 'Oops! Something went wrong while submitting the form.'
};
