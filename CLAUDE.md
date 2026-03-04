# SaaXent — Webflow-to-Astro Conversion Guide

> Complete conversion plan for the SaaXent SaaS website template.
> Reference project: `buildo-astro` — follow its file structure and code conventions exactly.

---

## 1. Project Overview

- **Source:** `saaxent-webflow/` (Webflow HTML export — 21 HTML pages, 12,889 lines CSS, 223 images)
- **Target:** `saaxent-astro/` (Astro 5.x + Tailwind CSS v3, static output)
- **Font:** Outfit (400 Regular, 500 Medium, 600 SemiBold, 700 Bold) — self-hosted woff2
- **No jQuery, no external JS frameworks** — vanilla JS only

---

## 2. File & Folder Structure

Follow the `buildo-astro` pattern exactly:

```
saaxent-astro/
├── astro.config.mjs
├── tailwind.config.js          # module.exports format
├── postcss.config.cjs
├── tsconfig.json
├── package.json
├── public/
│   ├── favicon.svg
│   ├── webclip.svg
│   └── fonts/
│       ├── Outfit-Regular.woff2
│       ├── Outfit-Medium.woff2
│       ├── Outfit-SemiBold.woff2
│       └── Outfit-Bold.woff2
├── src/
│   ├── assets/
│   │   └── images/              # ALL images here (Astro optimizes them)
│   ├── components/              # FLAT — NO subdirectories
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Container.astro
│   │   ├── PrimaryButton.astro
│   │   ├── OutlineButton.astro
│   │   ├── BreadcrumbHero.astro
│   │   ├── CtaSection.astro
│   │   ├── SectionTitle.astro
│   │   ├── HeroV1.astro
│   │   ├── HeroV2.astro
│   │   ├── FeaturesSection.astro
│   │   ├── FeatureCard.astro
│   │   ├── AboutSection.astro
│   │   ├── AboutV2Section.astro
│   │   ├── PricingSection.astro
│   │   ├── PricingCard.astro
│   │   ├── IntegrationSection.astro
│   │   ├── BlogSection.astro
│   │   ├── BlogCard.astro
│   │   ├── TeamSection.astro
│   │   ├── TeamCard.astro
│   │   ├── OurValuesSection.astro
│   │   ├── FaqSection.astro
│   │   ├── FaqItem.astro
│   │   ├── ContactSection.astro
│   │   ├── FunFactCounter.astro
│   │   ├── ... (more as needed)
│   │   └── (all .astro files at root level)
│   ├── data/                    # Static content per page/feature
│   │   ├── site.ts
│   │   ├── nav.ts
│   │   ├── footer.ts
│   │   ├── cta.ts
│   │   ├── home-v1.ts
│   │   ├── home-v2.ts
│   │   ├── about.ts
│   │   ├── pricing.ts
│   │   ├── features.ts
│   │   ├── blog.ts
│   │   ├── team.ts
│   │   ├── integrations.ts
│   │   └── contact.ts
│   ├── layouts/
│   │   ├── BaseLayout.astro     # HTML shell, meta, scripts, global.css
│   │   └── PageLayout.astro     # BaseLayout + Header + main + Footer
│   ├── pages/
│   │   ├── index.astro          # Home V1
│   │   ├── home-v2.astro
│   │   ├── about.astro
│   │   ├── pricing.astro
│   │   ├── features.astro
│   │   ├── blog.astro
│   │   ├── contact-us.astro
│   │   ├── team.astro
│   │   ├── integration.astro
│   │   ├── 401.astro
│   │   ├── 404.astro
│   │   └── (detail pages as needed)
│   ├── styles/
│   │   └── global.css           # @font-face + @tailwind + @layer base + reveal classes
│   └── utils/
│       └── resolveImage.ts      # import.meta.glob image resolver
```

### Key Rules

- **Components are FLAT** — all `.astro` files directly inside `src/components/`, no subdirectories.
- **Section components import their own data** — each section file imports from `src/data/`.
- **Pages only compose sections** — pages import `PageLayout` + section components, nothing else.
- **Data files use `resolveImage()`** for all image paths.

---

## 3. Core File Patterns

### 3.1 `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://example.com',
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false    // Tailwind preflight DISABLED
      }
    }),
    sitemap()
  ]
});
```

### 3.2 `postcss.config.cjs`

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
```

### 3.3 `src/utils/resolveImage.ts`

```ts
import type { ImageMetadata } from 'astro';

const imageModules = import.meta.glob('/src/assets/images/**/*', {
  eager: true,
  import: 'default'
}) as Record<string, ImageMetadata>;

export const resolveImage = (path: string) => {
  if (typeof path !== 'string') return path as ImageMetadata;
  if (!path.startsWith('/images/')) return path;
  const key = `/src/assets${path}`;
  return imageModules[key] ?? path;
};
```

### 3.4 `src/data/site.ts`

```ts
export const site = {
  name: 'SaaXent',
  description: 'SaaXent is a modern SaaS website template built with Astro and Tailwind CSS.',
  locale: 'en',
  phone: '+1 (555) 123-4567',
  url: 'https://example.com'
};
```

### 3.5 `src/layouts/BaseLayout.astro`

Pattern from buildo-astro:
- Imports: `resolveImage`, `site` data, `global.css`
- Props: `title`, `description`, `url`, `image`
- Head: charset, viewport, favicon, apple-touch-icon, generator, title, description, canonical
- Font preloads: all woff2 files
- OG tags: title, description, url, image, type
- Twitter card: summary_large_image
- Schema.org JSON-LD: Organization type
- `<slot name="head" />` for page-specific head content
- Body: `<slot />`
- Scripts:
  - IntersectionObserver for reveal animations (threshold: 0.15)
  - Counter animation script (for fun-fact numbers)

### 3.6 `src/layouts/PageLayout.astro`

Pattern from buildo-astro:
- Wraps `BaseLayout`
- Props: `title`, `description`, `url`, `image`, `footerPaddingTop`, `footerVariant`
- Includes: skip-to-content link (sr-only), Header, `<main id="main-content">`, Footer
- Header/Footer accept variant props for different page styles

### 3.7 `src/components/Container.astro`

```astro
---
const {
  as = 'div',
  class: className = '',
  ...rest
} = Astro.props;
const Tag = as;
---

<Tag
  class={`mx-auto w-full max-w-container px-15 xl:max-w-page ${className}`.trim()}
  {...rest}
>
  <slot />
</Tag>
```

### 3.8 Page Pattern (e.g., `src/pages/index.astro`)

```astro
---
import PageLayout from '../layouts/PageLayout.astro';
import { resolveImage } from '../utils/resolveImage';
import HeroV1 from '../components/HeroV1.astro';
import FeaturesSection from '../components/FeaturesSection.astro';
import AboutSection from '../components/AboutSection.astro';
import PricingSection from '../components/PricingSection.astro';
import IntegrationSection from '../components/IntegrationSection.astro';
import BlogSection from '../components/BlogSection.astro';
import CtaSection from '../components/CtaSection.astro';
---

<PageLayout
  title="SaaXent - SaaS Website Template"
  description="Modern SaaS solutions for your business."
  image={resolveImage('/images/og-default.webp')}
>
  <HeroV1 />
  <FeaturesSection />
  <AboutSection />
  <PricingSection />
  <IntegrationSection />
  <BlogSection />
  <CtaSection />
</PageLayout>
```

### 3.9 Data File Pattern (e.g., `src/data/home-v1.ts`)

```ts
import { resolveImage } from '../utils/resolveImage';

export const heroV1 = {
  subtitle: 'Welcome to SaaXent',
  title: 'Build Amazing SaaS Products',
  description: 'Description text here...',
  primaryCta: { label: 'Get Started', href: '#' },
  secondaryCta: { label: 'Learn More', href: '#' },
  images: {
    banner: {
      src: resolveImage('/images/hero-v1-banner.png'),
      alt: 'SaaXent Hero Banner'
    }
  }
};
```

---

## 4. Tailwind Configuration

### 4.1 Design Tokens (from saaxent.webflow.css)

All values below are extracted from the Webflow CSS. Map them into `tailwind.config.js`.

#### Breakpoints (Desktop-First)

```js
screens: {
  'max-991': { max: '991px' },
  'max-767': { max: '767px' },
  'max-479': { max: '479px' },
  'min-992': { min: '992px' },
  'min-1280': { min: '1280px' },
  'min-1440': { min: '1440px' },
  'min-1920': { min: '1920px' }
}
```

#### Colors

```js
colors: {
  brand: {
    primary: '#5542f6',
    'primary-hover': '#4845c6',
    'primary-glow': '#5542f64d',
    blue: '#5b93ff',
    green: '#43ba7f',
    'green-light': '#6fc519',
    violet: '#7b55ff',
    lavender: '#a45aff',
    orange: '#ff602e',
    salmon: '#ff8f76',
    amber: '#ffb223',
    gold: '#ffd50d',
    star: '#fabb18',
    red: '#ff453a',
    cyan: '#3ec5ff',
    pink: '#c345c6'
  },
  ink: {
    body: 'gainsboro',
    heading: '#ffffff',
    muted: '#6a6877',
    'muted-dark': '#4b5565',
    placeholder: '#6b6b6b',
    copyright: '#c3c3c3',
    'footer-link': '#dcdcdc',
    dark: '#121212'
  },
  surface: {
    body: '#031422',
    primary: '#071e31',
    secondary: '#101512',
    'navy-mid': '#082642',
    'navy-card': '#162342',
    'navy-deep': '#19244c',
    'navy-active': '#1d2659',
    'dark-teal': '#07263f',
    'review-card': '#2b2742',
    white: '#ffffff',
    'light-gray': '#f4f5fa',
    'soft-purple': '#f5f3fa',
    'soft-green': '#f7faf4',
    'soft-yellow': '#fbf7ee',
    'soft-peach': '#faf1ef',
    'nav-dropdown': '#fbfbfb'
  },
  border: {
    light: '#dcdcdc',
    dark: '#0d1218',
    footer: '#465561',
    input: '#9aa4b2',
    style: '#d0d0d0',
    quote: '#e2e2e2'
  },
  glass: {
    'white-10': '#ffffff1a',
    'white-15': '#ffffff26',
    'white-35': '#ffffff57',
    'white-58': '#ffffff94',
    'border-alpha': '#dcdcdc33',
    'border-muted': '#dcdcdc99'
  },
  neutral: {
    50: '#eee',
    100: '#d0d0d0',
    200: '#c3c3c3',
    300: '#9aa4b2',
    400: '#6b6b6b',
    500: '#4f4f4f',
    600: '#4b5565',
    700: '#4d4d4d'
  }
}
```

#### Font Family

```js
fontFamily: {
  sans: ['Outfit', 'sans-serif']
}
```

#### Font Sizes

```js
fontSize: {
  // Body / UI
  'xs': ['14px', { lineHeight: '1.55', fontWeight: '400' }],
  'sm': ['16px', { lineHeight: '1.55', fontWeight: '400' }],
  'body': ['18px', { lineHeight: '1.55', fontWeight: '400' }],
  'lg': ['20px', { lineHeight: '1.4', fontWeight: '500' }],
  'xl': ['22px', { lineHeight: '1.4', fontWeight: '500' }],

  // Headings (desktop defaults)
  'h1': ['52px', { lineHeight: '1.23', fontWeight: '600' }],
  'h2': ['38px', { lineHeight: '1.22', fontWeight: '500' }],
  'h3': ['30px', { lineHeight: '1.27', fontWeight: '600' }],
  'h4': ['24px', { lineHeight: '1.33', fontWeight: '700' }],
  'h5': ['20px', { lineHeight: '1.4', fontWeight: '500' }],
  'h6': ['18px', { lineHeight: '1.55', fontWeight: '500' }],

  // Responsive heading sizes
  'h1-1440': ['76px', { lineHeight: '1.23', fontWeight: '600' }],
  'h1-1280': ['64px', { lineHeight: '1.23', fontWeight: '600' }],
  'h1-991': ['42px', { lineHeight: '1.23', fontWeight: '600' }],
  'h1-767': ['36px', { lineHeight: '1.23', fontWeight: '600' }],
  'h1-479': ['32px', { lineHeight: '1.23', fontWeight: '600' }],

  'h2-1440': ['44px', { lineHeight: '1.22', fontWeight: '500' }],
  'h2-1280': ['42px', { lineHeight: '1.22', fontWeight: '500' }],
  'h2-991': ['36px', { lineHeight: '1.22', fontWeight: '500' }],
  'h2-767': ['30px', { lineHeight: '1.22', fontWeight: '500' }],
  'h2-479': ['26px', { lineHeight: '1.22', fontWeight: '500' }],

  'h3-1440': ['36px', { lineHeight: '1.27', fontWeight: '600' }],
  'h3-1280': ['34px', { lineHeight: '1.27', fontWeight: '600' }],
  'h3-991': ['26px', { lineHeight: '1.27', fontWeight: '600' }],
  'h3-767': ['24px', { lineHeight: '1.27', fontWeight: '600' }],
  'h3-479': ['22px', { lineHeight: '1.27', fontWeight: '600' }],

  // Special
  'nav': ['18px', { lineHeight: '1.55', fontWeight: '500' }],
  'button': ['16px', { lineHeight: '1', fontWeight: '500' }],
  'label': ['16px', { lineHeight: '1', fontWeight: '600' }],
  'subtitle': ['16px', { lineHeight: '1.55', fontWeight: '500' }],
  'stat': ['48px', { lineHeight: '1', fontWeight: '600' }],
  'stat-sm': ['40px', { lineHeight: '1', fontWeight: '600' }],
  'tag': ['14px', { lineHeight: '1', fontWeight: '500' }]
}
```

#### Letter Spacing

```js
letterSpacing: {
  nav: '0.16px'
}
```

#### Spacing (px values)

```js
spacing: {
  '3': '3px',
  '4': '4px',
  '5': '5px',
  '6': '6px',
  '7': '7px',
  '8': '8px',
  '9': '9px',
  '10': '10px',
  '11': '11px',
  '12': '12px',
  '13': '13px',
  '14': '14px',
  '15': '15px',
  '16': '16px',
  '17': '17px',
  '18': '18px',
  '20': '20px',
  '22': '22px',
  '24': '24px',
  '25': '25px',
  '26': '26px',
  '28': '28px',
  '30': '30px',
  '32': '32px',
  '40': '40px',
  '42': '42px',
  '44': '44px',
  '46': '46px',
  '50': '50px',
  '60': '60px',
  '62': '62px',
  '70': '70px',
  '80': '80px',
  '90': '90px',
  '100': '100px',
  '110': '110px',
  '120': '120px',
  '130': '130px',
  '140': '140px',
  '160': '160px',
  '180': '180px',
  '210': '210px',
  '238': '238px'
}
```

#### Border Radius

```js
borderRadius: {
  '3': '3px',
  '4': '4px',
  '5': '5px',
  '6': '6px',
  '8': '8px',
  '9': '9px',
  '10': '10px',
  '11': '11px',
  '12': '12px',
  '13': '13px',
  '14': '14px',
  '16': '16px',
  '18': '18px',
  '19': '19px',
  '20': '20px',
  '21': '21px',
  '22': '22px',
  '24': '24px',
  '25': '25px',
  '26': '26px',
  '28': '28px',
  '29': '29px',
  '30': '30px',
  '32': '32px',
  '33': '33px',
  '35': '35px',
  '40': '40px',
  '47': '47px',
  '96': '96px',
  'blob': '999px'
}
```

#### Box Shadows

```js
boxShadow: {
  'hard': '5px 5px #0d1218',
  'chart': '7px 9px 30px #00000026',
  'primary': '0 16px 31px #5542f64d',
  'card': '4px 8px 40px #0000001a',
  'card-sm': '2px 6px 20px #00000014',
  'card-lg': '0 24px 32px #2128400d',
  'input': '0 4px 19px #162a3e26, 0 8px 12px #162a3e0a',
  'toggle': '0 2px 5px #0003',
  'tab': '0 8px 16px #21284033',
  'toolbar': '0 -1px 3px #eceff3, 0 1px 2px #0e094814, 0 0 4px #0e09480a',
  'xl': '0 36px 60px #222f4726',
  'responsive': '0 4px 16px #0000001a'
}
```

#### Max Widths (Container System)

```js
maxWidth: {
  'container': '990px',
  'container-lg': '1200px',
  'container-xl': '1320px',
  'container-md': '740px',
  'container-sm': '630px',
  'page': '1440px'
}
```

#### Background Images (Gradients)

```js
backgroundImage: {
  'breadcrumb': 'linear-gradient(#082a45, #082a4500)',
  'hero-v2': 'linear-gradient(#082a45, #04142400)',
  'shimmer': 'linear-gradient(134deg, #a69cfa66 19%, #fff0 50%, #a69cfa66 81%)',
  'glass': 'linear-gradient(111deg, #ffffff94, #ffffff57 100%, #fff)',
  'glass-overlay': 'linear-gradient(#ffffff26 10.77%, #9990)',
  'dark-overlay': 'linear-gradient(0deg, #12131805, #121318)'
}
```

### 4.2 Container Component

The saaxent container scales at each breakpoint:

| Breakpoint | max-width |
|------------|-----------|
| default    | 990px     |
| >=1280px   | 1200px    |
| >=1440px   | 1320px    |
| <=991px    | 740px     |
| <=767px    | 630px     |

Container.astro should use responsive `max-w-` classes:

```astro
<Tag
  class={`mx-auto w-full max-w-container max-991:max-w-container-md max-767:max-w-container-sm min-1280:max-w-container-lg min-1440:max-w-container-xl px-15 ${className}`.trim()}
  {...rest}
>
```

---

## 5. Global CSS (`src/styles/global.css`)

### Structure

```css
/* 1. @font-face declarations (4 weights) */
@font-face { font-family: 'Outfit'; src: url('/fonts/Outfit-Regular.woff2') format('woff2'); font-weight: 400; ... }
@font-face { font-family: 'Outfit'; src: url('/fonts/Outfit-Medium.woff2') format('woff2'); font-weight: 500; ... }
@font-face { font-family: 'Outfit'; src: url('/fonts/Outfit-SemiBold.woff2') format('woff2'); font-weight: 600; ... }
@font-face { font-family: 'Outfit'; src: url('/fonts/Outfit-Bold.woff2') format('woff2'); font-weight: 700; ... }

/* 2. Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 3. HTML overflow clip */
html { overflow-x: clip; }

/* 4. @layer base — element resets using @apply */
@layer base {
  body { @apply font-sans text-body text-ink-body bg-surface-body; margin: 0; overflow-x: clip; }
  h1 { @apply text-h1 text-ink-heading mt-0 mb-10; }
  h2 { @apply text-h2 text-ink-heading mt-0 mb-10; }
  h3 { @apply text-h3 text-ink-heading mt-0 mb-10; }
  h4 { @apply text-h4 text-ink-heading mt-0 mb-10; }
  h5 { @apply text-h5 text-ink-heading mt-0 mb-10; }
  h6 { @apply text-h6 text-ink-heading mt-0 mb-10; }
  p  { @apply text-body text-ink-body mb-10; }
  a  { @apply text-body text-ink-body no-underline; }
  h1 a, h2 a, h3 a, h4 a, h5 a, h6 a { font-size: inherit; line-height: inherit; font-weight: inherit; color: inherit; }
  ul { @apply mt-0 mb-0 pl-0 list-none; }
}

/* 5. Responsive heading overrides */
@media (min-width: 1440px) {
  h1 { font-size: 76px; line-height: 1.23; }
  h2 { font-size: 44px; line-height: 1.22; }
  h3 { font-size: 36px; line-height: 1.27; }
}
@media (min-width: 1280px) and (max-width: 1439px) {
  h1 { font-size: 64px; line-height: 1.23; }
  h2 { font-size: 42px; line-height: 1.22; }
  h3 { font-size: 34px; line-height: 1.27; }
}
@media (max-width: 991px) {
  h1 { font-size: 42px; line-height: 1.23; }
  h2 { font-size: 36px; line-height: 1.22; }
  h3 { font-size: 26px; line-height: 1.27; }
}
@media (max-width: 767px) {
  h1 { font-size: 36px; line-height: 1.23; }
  h2 { font-size: 30px; line-height: 1.22; }
  h3 { font-size: 24px; line-height: 1.27; }
}
@media (max-width: 479px) {
  h1 { font-size: 32px; line-height: 1.23; }
  h2 { font-size: 26px; line-height: 1.22; }
  h3 { font-size: 22px; line-height: 1.27; }
  body { font-size: 16px; }
}

/* 6. Mobile off-canvas nav */
.nav-open { transform: translateX(0) !important; box-shadow: 0 4px 30px 5px #0003 !important; }
.nav-overlay-visible { opacity: 1 !important; pointer-events: auto !important; }

/* 7. Reveal animation classes */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal.is-visible { opacity: 1; transform: translateY(0); }
.reveal-top { opacity: 0; transform: translateY(-100px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal-top.is-visible { opacity: 1; transform: translateY(0); }
.reveal-grow { opacity: 0; transform: scale(0.75); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal-grow.is-visible { opacity: 1; transform: scale(1); }
.reveal-bottom { opacity: 0; transform: translateY(100px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal-bottom.is-visible { opacity: 1; transform: translateY(0); }

/* 8. Reveal delay classes */
.reveal.delay-1, .reveal-top.delay-1, .reveal-grow.delay-1, .reveal-bottom.delay-1 { transition-delay: 0.1s; }
.reveal.delay-2, .reveal-top.delay-2, .reveal-grow.delay-2, .reveal-bottom.delay-2 { transition-delay: 0.2s; }
.reveal.delay-3, .reveal-top.delay-3, .reveal-grow.delay-3, .reveal-bottom.delay-3 { transition-delay: 0.3s; }
.reveal.delay-4, .reveal-top.delay-4, .reveal-grow.delay-4, .reveal-bottom.delay-4 { transition-delay: 0.4s; }
.reveal.delay-5, .reveal-top.delay-5, .reveal-grow.delay-5, .reveal-bottom.delay-5 { transition-delay: 0.5s; }
.reveal.delay-6, .reveal-top.delay-6, .reveal-grow.delay-6, .reveal-bottom.delay-6 { transition-delay: 0.6s; }

/* 9. Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal-top, .reveal-bottom, .reveal-grow {
    opacity: 1; transform: none; transition: none;
  }
}
```

---

## 6. Animation Plan

### Webflow IX2 Animations → Vanilla JS Replacements

The Webflow export uses Webflow Interactions (IX2) for animations. Replace ALL with:

1. **Scroll reveal** → CSS `.reveal` classes + IntersectionObserver (in BaseLayout)
2. **Counter animations** (fun facts) → Vanilla JS counter with IntersectionObserver trigger
3. **FAQ accordion** → CSS + vanilla JS toggle (height: auto pattern)
4. **Mobile nav** → Vanilla JS toggle + CSS transitions
5. **Pricing tab toggle** (Monthly/Annual) → Vanilla JS tab switching
6. **Hover effects** → Pure CSS `:hover` transitions
7. **No parallax needed** in saaxent (unlike buildo — saaxent has no parallax in the original)

### IntersectionObserver Script (BaseLayout)

```js
const elements = document.querySelectorAll('.reveal, .reveal-top, .reveal-grow, .reveal-bottom');
if (!('IntersectionObserver' in window)) {
  elements.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  elements.forEach((el) => observer.observe(el));
}
```

### Counter Animation Script (BaseLayout)

```js
const counters = document.querySelectorAll('[data-counter]');
if (counters.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement;
        const target = parseInt(el.dataset.counter || '0', 10);
        const suffix = el.dataset.counterSuffix || '';
        const duration = 2000;
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(target * eased) + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  counters.forEach((el) => counterObserver.observe(el));
}
```

---

## 7. Page-to-Section Mapping

### Shared Components (used across multiple pages)

| Component | Used On |
|-----------|---------|
| Header | All pages (19 inner pages) |
| Footer | All pages (19 inner pages) |
| BreadcrumbHero | All inner pages except home-v1, home-v2 (17 pages) |
| CtaSection | 15+ inner pages |
| FeaturesSection | home-v1, home-v2, features.html, detail_features.html |
| BlogSection | home-v1, home-v2, blog.html, detail_blog-authors, detail_blog-categories |
| TeamSection | home-v2, about.html, team.html |
| OurValuesSection | about.html, team.html, integration.html |
| AllIntegrationsGrid | integration.html, detail_integration.html |

### Home V1 (`index.astro`)

1. HeroV1
2. FeaturesSection
3. AboutSection (with FunFactCounter)
4. PricingSection (with PricingCard)
5. IntegrationSection
6. BlogSection (with BlogCard)
7. CtaSection

### Home V2 (`home-v2.astro`)

1. HeroV2
2. AboutV2Section (with inline fun facts)
3. FeaturesSection
4. TeamSection (with TeamCard)
5. BlogSection
6. CtaSection

### About (`about.astro`)

1. BreadcrumbHero
2. WhatWeDoSection
3. OurValuesSection (with FunFactCounter)
4. OurMissionSection
5. OurVisionSection
6. TeamSection
7. CtaSection

### Pricing (`pricing.astro`)

1. BreadcrumbHero
2. MainPricingSection (tabbed: Monthly/Annual, with PricingCard)
3. PricingComparisonTable
4. CtaSection

### Features (`features.astro`)

1. BreadcrumbHero
2. FeaturesSection (with FeatureCard)
3. FaqSection (with FaqItem)
4. CtaSection

### Blog (`blog.astro`)

1. BreadcrumbHero
2. BlogSection (with BlogCard)
3. CtaSection

### Contact (`contact-us.astro`)

1. BreadcrumbHero
2. ContactSection (form + info cards)
3. CtaSection

### Team (`team.astro`)

1. BreadcrumbHero
2. TeamSection (with TeamCard)
3. OurValuesSection
4. CtaSection

### Integration (`integration.astro`)

1. BreadcrumbHero
2. AllIntegrationsGrid
3. OurValuesSection
4. CtaSection

### Detail Pages

- **detail_post** → BreadcrumbHero + BlogDetailsSection + CtaSection
- **detail_features** → BreadcrumbHero + FeatureDetailSection + FeaturesSection + CtaSection
- **detail_team** → BreadcrumbHero + TeamDetailSection + OtherTeamMembers + CtaSection
- **detail_integration** → BreadcrumbHero + IntegrationDetailSection + AllIntegrationsGrid + CtaSection
- **detail_blog-authors** → BreadcrumbHero (badge "Blog Author", contact variant max-w 600px) + BlogSection (showTitle=false, showCta=false, filtered posts) + CtaSection
- **detail_blog-categories** → BreadcrumbHero (badge "Blog Category") + BlogSection (filtered by category) + CtaSection

### Utility Pages

- **404** → standalone (no header/footer)
- **401** → standalone password form (no header/footer)

---

## 8. Section Padding System

The saaxent template uses a consistent section padding system:

| Breakpoint | padding-top | padding-bottom |
|------------|-------------|----------------|
| >= 1440px  | 130px       | 130px          |
| >= 1280px  | 110px       | 110px          |
| default    | 90px        | 90px           |
| <= 991px   | 70px        | 70px           |
| <= 767px   | 50px        | 50px           |

Use Tailwind classes: `py-90 min-1280:py-110 min-1440:py-130 max-991:py-70 max-767:py-50`

---

## 9. Image Handling

### Source Images

- All 223 images from `saaxent-webflow/images/` go to `src/assets/images/`
- **Skip** responsive variants (`-p-500`, `-p-800`, `-p-1080`) — Astro `<Image>` generates these
- Convert PNGs/JPGs to WebP where possible for better performance
- Keep SVGs as-is (they're already optimized)

### Using Images in Components

```astro
---
import { Image } from 'astro:assets';
import { resolveImage } from '../utils/resolveImage';
import { heroV1 } from '../data/home-v1';

const imgData = resolveImage('/images/hero-banner.png');
---

<Image src={imgData} alt="Hero banner" width={600} height={400} />
```

### In Data Files

```ts
import { resolveImage } from '../utils/resolveImage';

export const data = {
  image: {
    src: resolveImage('/images/feature-icon.png'),
    alt: 'Feature icon'
  }
};
```

---

## 10. Accessibility Requirements

### Must-Have

- Skip-to-content link (in PageLayout)
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- All images have descriptive `alt` text
- Form labels associated with inputs
- Focus-visible styles on interactive elements
- `aria-expanded` on accordion/FAQ toggles
- `aria-current="page"` on active nav links
- `role="tablist"` / `role="tab"` / `role="tabpanel"` on pricing tabs
- Keyboard navigation for mobile menu, tabs, accordions
- `prefers-reduced-motion` support (in global.css)
- Color contrast ratio >= 4.5:1 for body text, >= 3:1 for large text

### Heading Hierarchy

- Each page has exactly one `<h1>` (in hero or breadcrumb)
- Sections use `<h2>` for titles
- Cards/items use `<h3>`
- No heading level skips

---

## 11. SEO Checklist

- Unique `<title>` and `<meta name="description">` per page
- Canonical URLs
- Open Graph tags (title, description, image, url, type)
- Twitter Card meta (summary_large_image)
- Schema.org JSON-LD (Organization in BaseLayout)
- Sitemap via `@astrojs/sitemap`
- Semantic HTML structure
- Image alt text
- Proper heading hierarchy

---

## 12. Conversion Order

Convert in this exact order, validating each step:

### Phase 1: Foundation

1. Scaffold project (`npm create astro@latest saaxent-astro`)
2. Install dependencies (`@astrojs/tailwind`, `@astrojs/sitemap`, `tailwindcss`)
3. Create config files: `astro.config.mjs`, `tailwind.config.js`, `postcss.config.cjs`
4. Create `src/styles/global.css`
5. Create `src/utils/resolveImage.ts`
6. Create `src/data/site.ts`
7. Create `src/layouts/BaseLayout.astro`
8. Create `src/layouts/PageLayout.astro`
9. Copy fonts to `public/fonts/` (convert TTF → woff2)
10. Copy favicon/webclip to `public/`
11. Create `src/components/Container.astro`
12. Verify build passes

### Phase 2: Shared Components

13. Copy all images to `src/assets/images/` (skip `-p-500`/`-p-800`/`-p-1080` variants)
14. Create `src/data/nav.ts`
15. Create `src/components/Header.astro` (desktop nav + mobile off-canvas)
16. Create `src/data/footer.ts`
17. Create `src/components/Footer.astro`
18. Create `src/components/PrimaryButton.astro`
19. Create `src/components/OutlineButton.astro`
20. Create `src/components/SectionTitle.astro`
21. Create `src/components/BreadcrumbHero.astro`
22. Create `src/data/cta.ts`
23. Create `src/components/CtaSection.astro`
24. Verify build passes

### Phase 3: Home V1 (index page)

25. Create `src/data/home-v1.ts`
26. Create `src/components/HeroV1.astro`
27. Create `src/components/FeatureCard.astro`
28. Create `src/data/features.ts`
29. Create `src/components/FeaturesSection.astro`
30. Create `src/components/FunFactCounter.astro`
31. Create `src/components/AboutSection.astro`
32. Create `src/data/pricing.ts`
33. Create `src/components/PricingCard.astro`
34. Create `src/components/PricingSection.astro`
35. Create `src/data/integrations.ts`
36. Create `src/components/IntegrationSection.astro`
37. Create `src/components/BlogCard.astro`
38. Create `src/data/blog.ts`
39. Create `src/components/BlogSection.astro`
40. Create `src/pages/index.astro`
41. Verify build passes — visually verify all sections

### Phase 4: Home V2

42. Create `src/data/home-v2.ts`
43. Create `src/components/HeroV2.astro`
44. Create `src/components/AboutV2Section.astro`
45. Create `src/components/TeamCard.astro`
46. Create `src/data/team.ts`
47. Create `src/components/TeamSection.astro`
48. Create `src/pages/home-v2.astro`
49. Verify build passes

### Phase 5: Inner Pages

50. About page (WhatWeDoSection, OurValuesSection, OurMissionSection, OurVisionSection)
51. Pricing page (MainPricingSection with tabs, PricingComparisonTable)
52. Features page (reuse FeaturesSection + new FaqSection with FaqItem)
53. Blog page (reuse BlogSection)
54. Contact page (ContactSection with form)
55. Team page (reuse TeamSection + OurValuesSection)
56. Integration page (AllIntegrationsGrid)
57. Verify all inner pages build

### Phase 6: Detail Pages

58. Blog detail (BlogDetailsSection)
59. Feature detail (FeatureDetailSection)
60. Team detail (TeamDetailSection)
61. Integration detail (IntegrationDetailSection)

### Phase 7: Utility Pages

62. 404 page
63. 401 page

### Phase 8: Final Validation

64. Run full build — 0 errors
65. Check every page for visual accuracy
66. Lighthouse audit (Performance, Accessibility, SEO, Best Practices)
67. Verify responsive at all breakpoints (479, 767, 991, 1280, 1440, 1920)
68. Verify no unused images/assets
69. Verify all links work

---

## 13. Validation Checklist (Per Page)

For each completed page, verify:

- [ ] HTML structure uses semantic elements
- [ ] Heading hierarchy is correct (h1 → h2 → h3, no skips)
- [ ] All images have alt text
- [ ] All interactive elements are keyboard-accessible
- [ ] Reveal animations trigger on scroll
- [ ] Responsive layout matches Webflow at all breakpoints
- [ ] No Tailwind arbitrary values (`[value]`) — use config tokens
- [ ] No hardcoded text in components — all from data files
- [ ] Build passes with 0 errors/warnings
- [ ] No console errors in browser

---

## 14. CSS Class Mapping Reference

Key Webflow class → Tailwind class mappings:

| Webflow Class | Purpose | Tailwind Equivalent |
|---------------|---------|-------------------|
| `.container` | Page container | Container component |
| `.section-gap-y-axis-140px` | Section vertical padding | `py-90 min-1280:py-110 min-1440:py-130 max-991:py-70 max-767:py-50` |
| `.padding-top-140px` | Section top padding only | `pt-90 min-1280:pt-110 min-1440:pt-130 max-991:pt-70 max-767:pt-50` |
| `.padding-bottom-140px` | Section bottom padding only | `pb-90 min-1280:pb-110 min-1440:pb-130 max-991:pb-70 max-767:pb-50` |
| `.position-relative` | Relative positioning | `relative` |
| `.primary-button` | Primary CTA button | PrimaryButton component |
| `.outline-button` | Secondary CTA button | OutlineButton component |
| `.sub-title` | Section subtitle chip | SectionTitle component |
| `.title-shape` | Decorative SVG under heading | Inline in SectionTitle |
| `.w-inline-block` | Inline-block link | `inline-block` |
| `.grid-2-column` | 2-column grid | `grid grid-cols-2 max-767:grid-cols-1` |
| `.grid-3-column` | 3-column grid | `grid grid-cols-3 max-991:grid-cols-2 max-767:grid-cols-1` |
| `.grid-4-column` | 4-column grid | `grid grid-cols-4 max-991:grid-cols-2 max-479:grid-cols-1` |

---

## 15. Important Notes

- **Dark theme site** — body background is `#031422` (dark navy), text is `gainsboro`
- **No Webflow JS** — remove all `webflow.js`, `jquery.js` references completely
- **Image optimization** — use Astro's `<Image>` component for all raster images, raw `<img>` or inline for SVGs
- **No CSS-in-JS** — all styles via Tailwind utility classes + global.css
- **Transitions** — only `0.2s`, `0.3s`, `0.4s`, `0.5s` durations used, always `ease` timing
- **Glass morphism** — several cards use backdrop-blur + semi-transparent white backgrounds
- **Gradient backgrounds** — use `bg-gradient-to-*` or custom `backgroundImage` tokens
- **Keyframe animations** — Webflow IX2 infinite move animations converted to CSS `@keyframes` (FeatureCard floating charts, HeroV2 banner floats); all other motion via CSS transitions

---

## 16. Conversion Progress Tracker

### Phase 1: Foundation — COMPLETED

| # | Task | Status |
|---|------|--------|
| 1 | Scaffold project (`npm create astro@latest saaxent-astro`) | Done |
| 2 | Install dependencies (`@astrojs/tailwind`, `@astrojs/sitemap`, `tailwindcss`) | Done |
| 3 | Create config files: `astro.config.mjs`, `tailwind.config.js`, `postcss.config.cjs` | Done |
| 4 | Create `src/styles/global.css` | Done |
| 5 | Create `src/utils/resolveImage.ts` | Done |
| 6 | Create `src/data/site.ts` | Done |
| 7 | Create `src/layouts/BaseLayout.astro` | Done |
| 8 | Create `src/layouts/PageLayout.astro` | Done |
| 9 | Copy fonts to `public/fonts/` | Done |
| 10 | Copy favicon/webclip to `public/` | Done |
| 11 | Create `src/components/Container.astro` | Done |
| 12 | Verify build passes | Done |

### Phase 2: Shared Components — COMPLETED

| # | Task | Status |
|---|------|--------|
| 13 | Copy all images to `src/assets/images/` | Done |
| 14 | Create `src/data/nav.ts` | Done |
| 15 | Create `src/components/Header.astro` | Done |
| 16 | Create `src/data/footer.ts` | Done |
| 17 | Create `src/components/Footer.astro` | Done |
| 18 | Create `src/components/PrimaryButton.astro` | Done |
| 19 | Create `src/components/OutlineButton.astro` | Done |
| 20 | Create `src/components/SectionTitle.astro` | Done |
| 21 | Create `src/components/BreadcrumbHero.astro` | Done |
| 22 | Create `src/data/cta.ts` | Done |
| 23 | Create `src/components/CtaSection.astro` | Done |
| 24 | Verify build passes | Done |

### Phase 3: Home V1 (index page) — COMPLETED

| # | Task | Status |
|---|------|--------|
| 25 | Create `src/data/home-v1.ts` | Done |
| 26 | Create `src/components/HeroV1.astro` | Done |
| 27 | Create `src/components/FeatureCard.astro` | Done |
| 28 | Create `src/data/features.ts` | Done |
| 29 | Create `src/components/FeaturesSection.astro` | Done |
| 30 | Create `src/components/FunFactCounter.astro` | Done |
| 31 | Create `src/components/AboutSection.astro` | Done |
| 32 | Create `src/data/pricing.ts` | Done |
| 33 | Create `src/components/PricingCard.astro` | Done |
| 34 | Create `src/components/PricingSection.astro` | Done (rewritten to match Webflow exactly) |
| 35 | Create `src/data/integrations.ts` | Done |
| 36 | Create `src/components/IntegrationSection.astro` | Done (rewritten to match Webflow exactly) |
| 37 | Create `src/components/BlogCard.astro` | Done (hover color fix applied) |
| 38 | Create `src/data/blog.ts` | Done |
| 39 | Create `src/components/BlogSection.astro` | Done (rewritten to match Webflow exactly) |
| 40 | Create `src/pages/index.astro` | Done |
| 41 | Verify build passes — visually verify all sections | Done |

### Phase 4: Home V2 — COMPLETED

| # | Task | Status |
|---|------|--------|
| 42 | Create `src/data/home-v2.ts` | Done |
| 43 | Create `src/components/HeroV2.astro` | Done (complete rewrite + float animations) |
| 44 | Create `src/components/AboutV2Section.astro` | Done (complete rewrite to horizontal layout) |
| 45 | Create `src/components/TeamCard.astro` | Done (complete rewrite with slide-up hover) |
| 46 | Create `src/data/team.ts` | Done |
| 47 | Create `src/components/TeamSection.astro` | Done (complete rewrite with 3-column grid) |
| 48 | Create `src/pages/home-v2.astro` | Done |
| 49 | Verify build passes | Done |

### Phase 5: Inner Pages — COMPLETED

| # | Task | Status |
|---|------|--------|
| 50a | Create `src/data/about.ts` | Done |
| 50b | Create `src/components/WhatWeDoSection.astro` | Done (needs visual verification) |
| 50c | Create `src/components/OurValuesSection.astro` | Done (rewritten to match Webflow exactly) |
| 50d | Create `src/components/OurMissionSection.astro` | Done (rewritten to match Webflow exactly + scroll animations) |
| 50e | Create `src/components/OurVisionSection.astro` | Done (needs visual verification) |
| 50f | Create `src/pages/about.astro` | Done |
| 51a | Create `src/data/pricing-page.ts` | Done |
| 51b | Create `src/components/MainPricingSection.astro` | Done (needs visual verification) |
| 51c | Create `src/components/PricingComparisonTable.astro` | Done (needs visual verification) |
| 51d | Create `src/pages/pricing.astro` | Done |
| 52a | Create `src/data/features-page.ts` | Done |
| 52b | Create `src/components/FeaturesShowcase.astro` | Done (needs visual verification) |
| 52c | Create `src/components/FeaturesPageFaq.astro` | Done (needs visual verification) |
| 52d | ~~Create `src/components/FaqSection.astro`~~ | Merged into FeaturesPageFaq.astro (52c) |
| 52e | Create `src/components/FaqItem.astro` | Done |
| 52f | Create `src/pages/features.astro` | Done |
| 53 | Create `src/pages/blog.astro` (reuse BlogSection) | Done |
| 54a | Create `src/data/contact.ts` | Done |
| 54b | Create `src/components/ContactSection.astro` | Done (needs visual verification) |
| 54c | Create `src/pages/contact-us.astro` | Done |
| 55 | Create `src/pages/team.astro` (reuse TeamSection + OurValuesSection) | Done |
| 56a | Create `src/components/AllIntegrationsGrid.astro` | Done (needs visual verification) |
| 56b | Create `src/components/IntegrationCard.astro` | Done |
| 56c | Create `src/pages/integration.astro` | Done |
| 57 | Verify all inner pages build | Done (43 pages, 0 errors) |

### Phase 6: Detail Pages — COMPLETED

| # | Task | Status |
|---|------|--------|
| 58a | Create `src/data/blog-details.ts` | Done (rewritten: `body` HTML → `content` typed blocks + `detailImage` field added) |
| 58b | Create `src/components/BlogDetailsSection.astro` | Done (rewritten to match Webflow exactly — rich text blocks, author card, gradients, section lines) |
| 58c | Create `src/components/MoreBlogSection.astro` | Removed (not needed — removed from [slug].astro) |
| 58d | Create `src/pages/author/[slug].astro` (Blog Author page) | Done (BreadcrumbHero + filtered BlogSection + CtaSection) |
| 59a | Create `src/data/features-details.ts` | Done |
| 59b | Create `src/components/FeatureDetailsSection.astro` | Done (rewritten — sidebar sticky, box-border fix, Webflow-exact links/icons) |
| 59c | Create `src/components/MoreFeaturesSection.astro` | Done (rewritten — 2 standard FeatureCards V2+V3, pt-only padding) |
| 60a | Create `src/data/team-details.ts` | Done (restructured: skillsSection/experienceSection objects with items arrays) |
| 60b | Create `src/components/TeamDetailsSection.astro` | Done (complete Webflow-exact rewrite — profile grid, skills, experience, contact form, typography in Tailwind) |
| 61a | Create `src/data/integration-details.ts` | Done |
| 61b | Create `src/components/IntegrationDetailsSection.astro` | Done (Webflow-exact responsive fix applied) |
| 61c | Create `src/components/MoreIntegrationsSection.astro` | Done |

### Phase 7: Utility Pages — COMPLETED

| # | Task | Status |
|---|------|--------|
| 62 | Create `src/pages/404.astro` | Done |
| 63 | Create `src/pages/401.astro` | Done |

### Phase 8: Final Validation — IN PROGRESS (visual refinements ongoing)

| # | Task | Status |
|---|------|--------|
| 64 | Run full build — 0 errors | Done (43 pages, 0 errors, 10.35s) |
| 65 | Check every page for visual accuracy | In Progress (Webflow-exact CSS verified programmatically; visual fixes applied: BlogSection gradient shapes, button font-sizes, style-guide buttons, BlogCard zoom animation) |
| 66 | Lighthouse audit (Performance, Accessibility, SEO, Best Practices) | Pending (requires browser) |
| 67 | Verify responsive at all breakpoints (479, 767, 991, 1280, 1440, 1920) | In Progress (responsive CSS verified against Webflow; 992-1199px button fix applied) |
| 68 | Verify no unused images/assets | Done (78 unused images removed — 156 → 78, all public/ images verified used) |
| 69 | Verify all links work | Done (43 unique internal links, 1 broken link fixed: `/post/` → `/blog/`, `/404` is expected Astro behavior) |

### Sections That Need Webflow-Exact Rewrite (like OurValuesSection & OurMissionSection) — ALL DONE

All sections below have been verified against Webflow CSS and fixed/rewritten as needed:

- `WhatWeDoSection.astro` — Verified, already matches Webflow ✓
- `OurVisionSection.astro` — Verified, already matches Webflow ✓
- `MainPricingSection.astro` — Complete rewrite (tab layout: content LEFT, menu RIGHT, flex-flow reversal at max-991) ✓
- `PricingComparisonTable.astro` — Minor fix (removed fragile [data-astro-cid] selector) ✓
- `FeaturesShowcase.astro` — Banner dimension fixes (V1/V2/V3 sizes), added max-767 gap ✓
- `FeaturesPageFaq.astro` — CSS fixes (min-1280 padding, base gradient sizes) ✓
- `ContactSection.astro` — Responsive fixes (max-991/767 padding, map height, removed wrong 1440 font-size) ✓
- `AllIntegrationsGrid.astro` — Responsive fixes (max-767 keeps 2-col, added max-479 breakpoint) ✓
- `IntegrationDetailsSection.astro` — Fixed responsive breakpoints (icon sizes shifted from max-991 to max-767/479, title margin, rich text CSS) ✓

---

## 17. Important Implementation Notes (Lessons Learned)

### Preflight: false — Critical Gotchas

Since `corePlugins: { preflight: false }` is set in `tailwind.config.js`, browser defaults are NOT reset. This causes several issues:

1. **`border-style: none` by default** — Whenever using `border`, `border-2`, etc., you MUST also add `border-solid`. Otherwise borders won't render.
   ```
   border border-white          --> BROKEN (border invisible)
   border border-solid border-white --> CORRECT
   ```

2. **`box-sizing: content-box` by default** — Elements with explicit `width` + `padding` will render WIDER than expected. Add `box-border` to fix.
   ```
   w-[200px] p-[15px]           --> Renders ~230px wide
   w-[200px] p-[15px] box-border --> Renders exactly 200px
   ```

3. **Default margins on `<body>`, `<h1>`–`<h6>`, `<p>`, `<ul>`** — Handled in `global.css` via `@layer base` resets.

### Header Component (`Header.astro`) — Key Design Decisions

- **CTA "Get Started" button is OUTSIDE `<nav>`** — placed as a separate sibling `<div>` for semantic correctness
- **Dropdowns are CLICK-BASED** (not hover) — uses `data-desktop-dropdown` + `data-desktop-dropdown-menu` attributes with vanilla JS toggle logic (click to open, click outside to close, opening one closes others)
- **Dropdown width: `w-[200px] box-border`** — must include `box-border` due to preflight: false
- **Mega-menu width: `w-[400px]`**
- **Nav items: `font-normal`** (font-weight: 400)
- **CTA button hover effect:** left-to-right white background sweep using `before:` pseudo-element with `translateX` animation, `duration-[600ms]`
- **Mobile off-canvas:** buttons have `border-none bg-transparent cursor-pointer`

### HeroV1 Component (`HeroV1.astro`) — Key Design Decisions

- **Does NOT use PrimaryButton/OutlineButton components** — hero buttons have completely different sizing (24px font-size, 13px padding, overlay hover animation) compared to generic buttons (16px font-size, 16px padding, simple hover)
- **Hero buttons use `before:` pseudo-element** for left-to-right white sweep hover effect with `duration-[400ms]`
- **Button inner text uses `relative z-[2]`** to stay above the before pseudo-element overlay
- **Banner block uses `box-border`** because it has explicit width + padding
- **Background decoratives:** two SVG grid patterns (left/right) + two gradient blur shapes (`blur-[1204px]`/`blur-[1202px]` with `opacity-40 bg-brand-primary`)
- **Fully responsive** at all 6 breakpoints: base (992–1279), min-1280, min-1440, max-991, max-767, max-479
- **Wrapper uses `flex-wrap`** at max-991 (not `flex-col`) — matches Webflow behavior where items naturally wrap when space is insufficient

### Webflow CSS Quirks to Remember

- Webflow has intentional typos in class names: `.dispaly-flex` (not "display"), `.hero-v1-banner-coutomer-chart` (not "customer")
- Some Webflow `grid-column-gap`/`grid-row-gap` values translate to Tailwind `gap-{n}` (single property for both)
- Webflow's `inset: auto 0% -10px -24px` = `top: auto; right: 0; bottom: -10px; left: -24px`
- Webflow button overlay divs (`.primary-button-bg-color-overly`) are replaced with CSS `before:` pseudo-elements in Astro

### Container Component — box-border Fix

- **`Container.astro` MUST have `box-border`** — since preflight is off, `w-full` (100%) + `px-15` (30px padding) causes horizontal overflow (100% + 30px). Adding `box-border` fixes this.
- This fix applies globally to all pages/sections that use Container.

### FeatureCard Component (`FeatureCard.astro`) — Key Design Decisions

- **Three card variants:** featured (V1), standard-v2, standard-v3 — controlled by `variant` prop
- **Button hover animation:** overlay div at `translateX(-120%)` slides to `translateX(0)` on hover with `duration-500`
- **Floating chart image animations** using CSS `@keyframes` with `ease-in-out infinite`:
  - `featured-chart-float`: translates (-20px, -20px), 3s duration — for `task-automation-chart.png`
  - `std-chart-v2-float`: translates (-10px, -10px), 3s duration — for `customizable-reports-chart.png`
  - `std-chart-v3-float`: translates (-15px, -15px), 3s duration — for `3-banner-card.png`
- **Responsive:** featured card uses `flex-wrap` at max-991, standard cards switch to `flex-col` at max-991

### FeaturesSection Component (`FeaturesSection.astro`) — Key Design Decisions

- **Reveal animations** with staggered delays: section title (`reveal`), featured card (`reveal delay-1`), standard cards (`reveal delay-${i+2}`), CTA button (`reveal delay-4`)
- **CTA button** has custom sizing: `text-[24px] leading-[1.33] font-normal`

### AboutSection Component (`AboutSection.astro`) — Key Design Decisions

- **Fun Facts Row:** flex layout with `1px` dividers between items; switches to `grid grid-cols-2` at max-767, then `flex flex-col items-center` at max-479; dividers hidden at max-767
- **About content wrapper:** flex with `justify-between items-center gap-24`; responsive gap/margin scaling
- **List items:** use `bg-[url('/images/list-check-mark.svg')]` as background-image (SVG copied to `public/images/`)
- **Banner images:** frame image + absolute overlay image positioned via scoped `<style>` block
- **Decorative elements:** two SVG grid patterns (left/right) + two gradient blur shapes (brand-primary, `blur(800px)`, responsive sizing)
- **Background:** `bg-surface-primary` (#071e31)
- **Fully responsive** at all 6 breakpoints with scoped CSS media queries for overlay, grids, and gradient shapes

### FunFactCounter Component (`FunFactCounter.astro`) — Key Design Decisions

- **Font sizes:** 38px base → 44px at min-1280 → 34px at max-767 → 30px at max-479
- **Uses `data-counter` and `data-counter-suffix` attributes** for the counter animation script in BaseLayout
- **Initial display:** `0{suffix}` — counter animates from 0 to target value on scroll

### HeroV2 Component (`HeroV2.astro`) — Key Design Decisions

- **Vertical centered layout** (flex-column, items-center) — NOT horizontal split like HeroV1
- **Does NOT use PrimaryButton/OutlineButton components** — inline hero-style buttons with `before:` pseudo-element hover animation
- **3-column image grid** (`grid-template-columns: 1fr 1fr 1fr`, gap 16px) — at max-767 switches to `display: block; column-count: 2`
- **Banner image rotations:** customer-sticker `rotate(-6.24deg)`, sales-sticker `rotate(8.23deg)` with `margin-top: 20px`
- **Title max-width:** 650px (base) → 800px (min-1280) → 900px (min-1440)
- **Excerpt max-width:** 720px (base) → 750px (min-1280) → 825px (min-1440)
- **Section padding:** custom (NOT standard section-gap) — `pt-238/pb-130` (1440) → `pt-210/pb-130` (1280) → `pt-180/pb-100` (base) → `pt-160/pb-80` (991) → `pt-120/pb-60` (767) → `pb-50` (479)
- **Float animations** (Webflow IX2 replacements):
  - `hero-v2-banner-one-float`: translateY(0→20px→0), 4s ease-in-out infinite (growth-banner)
  - `hero-v2-banner-two-float`: translateY(0→-15px→0), 4s ease-in-out infinite (monthly-banner)
- **SVG grid decoratives:** 660x995 dimensions (different from other sections)
- **TypeScript type guards:** all `<Image>` components wrapped in `{typeof image.src !== 'string' && (<Image ... />)}`

### AboutV2Section Component (`AboutV2Section.astro`) — Key Design Decisions

- **Horizontal flex layout** (justify-between, items-center, gap 24/32/46px responsive) — NOT vertical like initial version
- **Left content block:** badge, title (with `section-title-highlight-shape.svg` bg-position 50% 90%, bg-size 100%), excerpt, checklist (with `list-check-mark.svg` background), inline fun facts (28px small variant, NOT FunFactCounter component), inline CTA button
- **Right banner block:** main image (rounded-14) + absolute overlay image (max-width 420/490/524px, bottom -20/-41px)
- **Fun facts inline (28px small font):** uses `data-counter` + `data-counter-suffix` attributes; border-bottom 1px #dcdcdc wrapper
- **Title max-width:** 450px → 557px (min-1280)
- **Excerpt max-width:** 500px → 600px (min-1280) → 660px (min-1440) → 600px (max-991)
- **At max-991:** flex-wrap, banner centered with auto margins
- **At max-767:** justify-center, banner max-width 450px, overlay max-width 90%
- **SVG grid decoratives:** 634x957 dimensions (different from hero and team sections)
- **Two different highlight SVGs used in project:**
  - `title-highlight-shape.svg` (bg-position: 50% 80%) — used in hero titles
  - `section-title-highlight-shape.svg` (bg-position: 50% 90%, bg-size: 100%) — used in section titles

### TeamCard Component (`TeamCard.astro`) — Key Design Decisions

- **Fixed-dimension card** — NOT fluid/responsive width
- **Dimensions:** 305x340 (base) → 365x410 (1280) → 410x465 (1440) → 340x340 (991) → 410x456 (767) → 280x340 (479)
- **Background:** `bg-surface-dark-teal` (#07263f), rounded-20, overflow-hidden
- **Layout:** `flex justify-between items-stretch`, padding-top 40px, padding-left/right 30px
- **Hover info block:** absolute, bottom 20px, backdrop-filter blur(10px), bg `#07263f99`
- **Hover animation:** `transform: translateY(120%) → translateY(0)`, `opacity: 0 → 1`, transitions 500ms/400ms ease
- **Name link:** white, hover:underline
- **Member name `<h3>`:** `font-weight: 500` (override from global h3's 600), `text-[inherit]` for color inheritance

### TeamSection Component (`TeamSection.astro`) — Key Design Decisions

- **3-column grid** (`1fr 1fr 1fr`), NOT 4 columns — `place-items: start center`, gap 20px (30px at 1440)
- **Grid responsive:** 2 columns at max-991, 1 column at max-767
- **Grid margin-top:** 40px (base) → 44px (1280) → 54px (1440) → 32px (767)
- **Background:** `bg-surface-primary` (#071e31)
- **CTA button margin-top:** 60px → 80px (1440) → 50px (991) → 40px (767) → 30px (479)
- **SVG grid decoratives:** 771x1164 dimensions (different from hero/about sections)
- **Props:** `showCta` (default true), `limit` (optional — home-v2 passes `limit={3}`)
- **SectionTitle props:** `titleClass="max-w-[500px] min-1280:max-w-[600px] max-767:max-w-[400px]"`, `descriptionClass="max-w-[585px]"`

### Button Font-Size Fix: 992px–1199px (All Primary/Outline Buttons)

All primary and outline buttons project-wide have `font-size: 20px` at `(min-width: 992px) and (max-width: 1199px)`:

- **PrimaryButton.astro** — scoped CSS on `.primary-btn-block`
- **OutlineButton.astro** — scoped CSS on `.outline-btn-block`
- **HeroV1.astro** — `.hero-inline-primary`, `.hero-inline-outline` classes on inline buttons + scoped CSS
- **HeroV2.astro** — `.hero-inline-primary`, `.hero-inline-outline` classes on inline buttons + scoped CSS
- **AboutV2Section.astro** — `.aboutv2-inline-primary` class on inline CTA button + scoped CSS
- **TeamSection.astro** — `.team-inline-primary` class on inline CTA button + scoped CSS

This ensures ALL button instances (both component-based and inline) have consistent 20px font at this breakpoint range.

### PricingSection Component (`PricingSection.astro`) — Key Design Decisions

- **Rewritten to match Webflow exactly** — tabbed Monthly/Annual toggle with PricingCard grid
- **"Get Started" button (`.pricing-cta-link`)** responsive font-sizes:
  - 768–991px: `font-size: 20px`
  - max-767: `font-size: 18px`

### BlogCard Component (`BlogCard.astro`) — Key Design Decisions

- **Hover color fix:** `<h2>` inside `<a>` must have `text-[inherit]` — otherwise global base style `text-ink-heading` (white) overrides parent `<a>`'s `hover:text-brand-primary`
- **Pattern:** When a heading is inside an anchor that has hover color, add `text-[inherit]` to the heading so it inherits from the parent
- **Scroll-into-view zoom-in animation:** `.blog-card-reveal` uses `transform: scale(0.75)` → `scale(1)` (not just opacity fade) — blog image scales up when entering viewport. Combined with opacity 0→1 transition. Already covered by `prefers-reduced-motion: reduce` fallback (`transform: none`)

### BlogSection Component (`BlogSection.astro`) — Key Design Decisions

- **Rewritten to match Webflow exactly** — 2-column grid with BlogCard components
- **Reuses BlogCard component** with proper props mapping
- **Props:** `showCta` (default true), `showTitle` (default true), `limit` (default 0), `posts` (optional — overrides internal blogPosts), `variant` ('default' | 'home')
- **See "BlogSection Component — Updated Props" section below for `posts` prop details**
- **`variant` prop for gradient shapes:**
  - `variant="home"` → renders 2 gradient shapes (`.blog-gradient-home-left`, `.blog-gradient-home-right`)
  - `variant="default"` → renders 4 gradient shapes (`.blog-gradient-left-top`, `.blog-gradient-left-bottom`, `.blog-gradient-right-top`, `.blog-gradient-right-bottom`)
  - Home left shape: `bottom: 25%`, `left: -420px` (base) — matches Webflow home page gradient positioning
  - Home right shape: `top: 15%`, `right: -300px` (base)
  - Both home shapes have full responsive CSS at min-1280, min-1440, max-991, max-767, max-479
  - `index.astro` and `home-v2.astro` pass `variant="home"`, all other blog pages use default

### IntegrationSection Component (`IntegrationSection.astro`) — Key Design Decisions

- **Rewritten to match Webflow exactly** — integration logo grid with hover effects

### CtaSection Component (`CtaSection.astro`) — Key Design Decisions

- **Rewritten to match Webflow exactly** — centered CTA block with decorative elements

### Footer Component (`Footer.astro`) — Key Design Decisions

- **Rewritten to match Webflow exactly** — multi-column footer layout with social links

### TypeScript Type Guard Pattern for Image Components

- `resolveImage()` returns `string | ImageMetadata` — Astro's `<Image>` component requires `ImageMetadata`
- **All `<Image>` components MUST be wrapped in type guard:** `{typeof image.src !== 'string' && (<Image src={image.src} alt={image.alt} ... />)}`
- This prevents TS2322 errors where `string` is not assignable to `ImageMetadata`

### SVG Grid Decorative Patterns — Per Section Dimensions

Different sections use different SVG grid pattern dimensions:
- **HeroV1 / HeroV2:** 660x995
- **AboutSection / AboutV2Section:** 634x957
- **TeamSection:** 771x1164
- Each section has unique gradient IDs to avoid SVG conflicts (e.g., `paint0_linear_team_left`, `paint0_linear_about_left`)

### OurValuesSection Component (`OurValuesSection.astro`) — Key Design Decisions

- **Complete rewrite** to match Webflow's about.html our-values section exactly
- **Section header:** flex-col items-center, outline badge (`border border-solid border-white rounded-19 px-20 py-3`), title (max-w 550→600→630px responsive), excerpt (max-w 570px)
- **Card wrapper:** `#07263f` bg, rounded-20, flex layout, padding 40px 30px → 50px 40px (1280) → 60px 55px (1440), gap 30→30→55px
- **3 value items** with 95px icon circles (`#0c3e67` bg), inline SVG icons (Customer-Centricity, Sustainability, Empowerment), vertical dividers between items
- **FunFactCounter stats** with `border-top: 1px solid #dcdcdc`, margin-top/padding-top 50→70px responsive
- **Background gradient shapes:** two gradient blur shapes (left/right), `blur(800px)`, brand-primary color
- **Responsive:** at max-991 card switches to `flex-col items-center text-center`, dividers become horizontal; at max-767 fun-fact wrapper gap reduces; at max-479 icon circles shrink to 80px
- **Linter modifications:** added `class="text-center"` to FunFactCounter, added scoped gap at max-991, removed gap from max-767 funfact-wrapper

### OurMissionSection Component (`OurMissionSection.astro`) — Key Design Decisions

- **Complete rewrite** to match Webflow's about.html our-mission section exactly
- **Wrapper:** `display: flex; flex-flow: wrap; justify-content: space-between; align-items: center; gap: 70px` — content block uses `flex: 1; min-width: 0` to prevent overflow
- **Left content block:** outline badge (reveal), title max-w 450→480px (reveal delay-1), description max-w 450→557px (reveal delay-2), mission items list with checkmarks
- **Mission items:** 32px check circles (`border-white bg-surface-body`) with 20px inner circle (`bg-brand-primary`), vertical dashed line connecting them (`border-left: 1px dashed #ffffff`, height 60%, left 16px), gap 24→32px, reveal delay-3/delay-4
- **Right banner block:** `#162242` bg, rounded-18, fixed dimensions 450x440 (base) → 500x490 (1280) → 538x509 (1440), `reveal-grow` animation
- **Chart cards:** 3 images with `om-chart-reveal` class that overrides default `translateY(24px)` to `translateX(80px)` for right-slide animation effect, staggered delays (delay-3/4/5)
- **Banner image:** absolute positioned, `reveal-bottom delay-2`
- **Responsive at max-991:** `display: block; gap: 30px`, banner auto-centered
- **Responsive at max-767:** banner 100% width, max-w 480px, charts centered
- **Responsive at max-479:** banner height 290px, banner image max-w 260px

### Additional Data Files Created

- `src/data/template-info.ts` — template metadata
- `src/data/blog-details.ts` — blog detail page data
- `src/data/features-details.ts` — feature detail page data
- `src/data/features-page.ts` — features inner page data
- `src/data/pricing-page.ts` — pricing inner page data
- `src/data/team-details.ts` — team detail page data
- `src/data/integration-details.ts` — integration detail page data

### Additional Components Created

- `AllIntegrationsGrid.astro` — full integrations grid for integration page
- `IntegrationCard.astro` — individual integration card
- `FeaturesShowcase.astro` — features showcase for features page
- `FeaturesPageFaq.astro` — FAQ section specific to features page
- ~~`MoreBlogSection.astro`~~ — removed (not needed on blog detail page)
- `MoreFeaturesSection.astro` — related features section for detail pages
- `MoreIntegrationsSection.astro` — related integrations section for detail pages
- `PricingComparisonTable.astro` — pricing comparison table for pricing page

### BlogDetailsSection Component (`BlogDetailsSection.astro`) — Key Design Decisions

- **Complete rewrite** to match Webflow's detail_post.html exactly
- **Content blocks pattern:** `blog-details.ts` uses typed content blocks array instead of raw HTML body string
  - Block types: `h2`, `h3`, `p`, `list` (items with HTML strings for `<strong>` support), `figure` (with `resolveImage` src), `blockquote`
  - `set:html` used on `<li>` elements to render HTML strings (for `<strong>` tags)
  - `:global(strong)` CSS selector for styling dynamically rendered `<strong>` elements
- **`detailImage` field:** separate from `thumbnail` — blog cards show `image`, detail pages show `detailImage` (larger version)
- **Rich text block CSS:** h2 margins, blockquote (bg images from `public/images/`, centered text, custom font, no left border, margin-left/right: 0), ul (flex column, gap, disc list-style), figure (max-width 100%, mx-auto, rounded-24)
- **Author card:** image (width/height auto), name, date, category badge, bio, social links (X/Twitter, Facebook SVGs)
  - Author card bg: `#071e31`, rounded-10, max-width 95% (base) → 1001px (1280+)
  - Social links: purple circles 40x40, hover white bg with purple icon
- **5 gradient blur shapes** + **14 section lines** (same pattern as other sections)
- **Blockquote background images:** `blog-quites-banner-shape-left.png` and `blog-quites-banner-shape-center-quttaion.png` — copied to `public/images/`
- **Fully responsive** at all breakpoints with scoped CSS media queries

### BlogSection Component (`BlogSection.astro`) — Updated Props

- **Added `posts` prop** (optional) — when provided, overrides internal `blogPosts` data
  - Used by author page to pass filtered posts: `<BlogSection showTitle={false} showCta={false} posts={filteredPosts} />`
  - Signature: `const { showCta = true, showTitle = true, limit = 0, posts: customPosts } = Astro.props;`
  - Logic: `const posts = customPosts ?? (limit > 0 ? blogPosts.slice(0, limit) : blogPosts);`
- **2-column grid** (not 3-column) — matches Webflow's `blog-collection-list` (1fr 1fr, gap 30px)
- **`blog-collection-list-no-title`** class removes margin-top when `showTitle={false}`

### Blog Author Page (`src/pages/author/[slug].astro`) — Key Design Decisions

- **Dynamic route** using `getStaticPaths()` — generates routes from unique authors in `blog.ts`
- **3 author routes:** `/author/leao-jardim` (2 posts), `/author/bruno-clymox` (2 posts), `/author/antonio-lrarko` (2 posts)
- **Structure:** BreadcrumbHero (badge "Blog Author", title = author name, `titleClass="max-w-[600px]"`) → BlogSection (showTitle=false, showCta=false, filtered posts) → CtaSection
- **Reuses BlogSection component** — same 2-column grid, gradient shapes, section lines, blog card animations as blog.astro page
- **Slugify function** generates author slugs from names: `name.toLowerCase().replace(/\s+/g, '-')`
- **SEO:** title `"{AuthorName} | SaaXent Blog Author"`, canonical URL `"{site.url}/author/{slug}"`

### blog.ts Data Updates

- **Author hrefs updated** from `#` to actual author page links: `/author/leao-jardim`, `/author/bruno-clymox`, `/author/antonio-lrarko`

### blog-details.ts Data Structure

- **Content blocks array** replaces raw HTML `body` string
- **`detailImage` field** added to all posts — separate larger image for detail page hero
- **Content block types:**
  ```ts
  type ContentBlock =
    | { type: 'h2'; text: string }
    | { type: 'h3'; text: string }
    | { type: 'p'; text: string }
    | { type: 'list'; items: string[] }        // items can contain HTML (e.g. <strong>)
    | { type: 'figure'; src: any; alt: string } // src via resolveImage()
    | { type: 'blockquote'; text: string }
  ```

### FeatureDetailsSection Component (`FeatureDetailsSection.astro`) — Key Design Decisions

- **Sidebar rewritten** to match Webflow's `.features-categories-block` exactly
- **Sidebar:** width 380px, border 1px solid #dcdcdc, rounded-16, padding 30px, `position: sticky; top: 120px` (desktop)
- **Sidebar links:** white bg (#fff), dark text (#031422), rounded-16, padding 13px 16px, font-size 20px, hover purple (#5542f6), double-chevron SVG arrow icon
- **Shows `f.tag`** (not `f.title`) in sidebar links — matches Webflow CMS short names
- **Wrapper:** `flex items-start gap-40 max-991:flex-col` — `items-start` prevents sidebar stretching to content height
- **At max-991:** width 100%, `box-sizing: border-box` (preflight off fix), `position: static`, 2-column grid
- **At max-767:** single column grid, padding 20px
- **At max-479:** padding 16px, font-size 18px
- **BreadcrumbHero:** `titleClass="max-w-[700px] min-1280:max-w-[900px] min-1440:max-w-[1100px] max-991:max-w-[600px]"`

### MoreFeaturesSection Component (`MoreFeaturesSection.astro`) — Key Design Decisions

- **Complete rewrite** — shows 2 standard FeatureCards (V2+V3), NOT the featured (V1) card
- **Imports:** Container, SectionTitle, FeatureCard, PrimaryButton, featuresSection, featureItems
- **Filters:** `featureItems.filter((f) => f.variant !== 'featured')`
- **Section padding:** `pt-90 min-1280:pt-110 min-1440:pt-130 max-991:pt-70 max-767:pt-50` — **NO bottom padding**
- **Includes:** 14 section line shapes + 2 gradient blur shapes
- **CTA button:** "View All Features" linking to `/features`, `text-[24px] leading-[1.33] font-normal`

### TeamDetailsSection Component (`TeamDetailsSection.astro`) — Key Design Decisions

- **Complete Webflow-exact rewrite** — matches `detail_team.html` structure and CSS
- **Profile card:** CSS Grid (`.7fr 1fr`), responsive columns at all breakpoints
  - Image wrap: `bg #071e31`, rounded-20, flex align-end, padding 30px/40px, max-width/height responsive (400x430 → 480x530 → 524x552)
  - Content panel: `bg #071e31`, `background-image: team-member-section-BG-shape.png` (right-aligned), rounded-20, padding 40px
  - Inner content: max-width 470px (100% at max-479)
- **Info detail list:** `<ul>` flex column, gap 16→20→24px responsive
  - `<li>`: white text, flex row, font-size 18→20px (1280) → 16px (479)
  - `<strong>`: min-width 140→160px (1280) → 110px (479), font-weight 500
  - `<a>`: white, hover purple, transition 0.3s
- **Social links:** circular icon buttons (40x40, `#dcdcdc33` bg, hover `#5542f6`), gap 30→20→14px responsive
  - Exact Webflow SVG icons: Facebook (26x26), X/Twitter (26x26, stroke), LinkedIn (25x25)
- **Separator lines:** `#4f4f4f4d` bg, 1px height, margin 20→26px (1440) → 15px (767)
- **Skills section:** 2x2 grid, gap 30px, margin-top 20→28px (1280)
  - Skill blocks: flex-col center, gap 15px, icon block 60x60 (`#2b2742` bg, rounded-8, shadow)
  - Skill title: `"{percentage} - {label}"`, font-size 18→20px (1280), font-weight 400
- **Experience section:** single column grid (2-col at 1280+), gap 25→30px (1280) → 15px (991) → 20px (767)
  - Experience blocks: flex, gap 16px, logo block 68x68 (52px at 767, 60px at 479), `#2b2742` bg
  - Rich text: h4 (20→18px at 767, weight 400) + p (16px, gainsboro) + strong (semibold, white)
- **Contact form:** `bg #071e31`, rounded-20, padding 40→60px (1440), margin-top 100→120→140px responsive
  - "Get Free Quote" badge, "Have a Project in Mind?" title
  - Form fields: 2-column rows (flex), single column at max-767 (flex-wrap gap 22px)
  - Input: white bg, rounded-12, min-height 68→60px, focus border purple
  - Textarea: 0.5px border #4f4f4f, min-height 236→180px
  - Submit button: `bg #5542f6`, rounded-8, hover white bg/dark text
- **Decorative elements:** 14 section lines + 4 gradient blur shapes (left-top, left-bottom, right-top, right-bottom)
- **Typography in Tailwind:** all text styles (font-size, font-weight, color, line-height, responsive overrides) use Tailwind utility classes on HTML elements, NOT scoped CSS
- **4 gradient blur shapes** (different from other sections):
  - left-top: top 300px, left -420px
  - left-bottom: bottom 10px, left -420px
  - right-top: top 50→80→63px, right -300→-360→-424px (z-index 1)
  - right-bottom: bottom 400→450→524px, right -300→-360→-424px

### team-details.ts Data Structure (Restructured)

- **Old structure:** name, slug, role, image, bio, summary, socials, skills (string[]), experience (string[])
- **New structure:**
  ```ts
  {
    name: string,
    slug: string,
    role: string,
    image: { src, alt },
    department: string,          // e.g. "Software Engineer"
    experienceYears: string,     // e.g. "4 Years"
    email: string,
    phone: string,
    socials: { facebook, twitter, linkedin },
    bio: string,
    skillsSection: {
      description: string,
      items: [{ icon: { src, alt }, percentage: string, label: string }]  // 4 items
    },
    experienceSection: {
      description: string,
      items: [{ icon: { src, alt }, title: string, dateRange: string, company: string }]  // 4 items
    }
  }
  ```
- **Detail images:** david-wilson-details.png, emily-johnson-large.png, michael-brown-large.png, john-doe-large.png, lisa-martinez-large.png
- **Skill icons:** satisfaction-icon.png, Maintenance-icon.png, compliance-icon.png, inspection-icon.png
- **Experience icons:** ex-icon-1.png through ex-icon-4.png
- **5 members:** David Wilson, Emily Johnson, Michael Brown, John Doe, Lisa Martinez

### MainPricingSection Component (`MainPricingSection.astro`) — Key Design Decisions (Rewritten)

- **Complete rewrite** — old version had wrong layout (flex content-left + tab-buttons-right with SectionTitle). New version matches Webflow exactly.
- **Tab structure:** `.mps-tabs` (flex, justify-between) → `.mps-tabs-content` (LEFT, 465px) + `.mps-tabs-menu` (RIGHT, 465px, flex-col, gap 30px)
- **Tab content pane:** white bg with shimmer gradient (`linear-gradient(134deg, #a69cfa66 19%, #fff0 50%, #a69cfa66 81%)`), rounded-20, feature list with SVG checkmark `background-image`, outline CTA button
- **Tab menu plan cards:** checkmark image toggling (dark/white variants), plan title/excerpt/price, active state = purple bg (#5542f6)
- **Checkmark images:** `Pricing-Menu-Check-Mark-dark.png` (inactive) / `Pricing-Menu-Check-Mark-white.png` (active), stored as frontmatter variables with type guards
- **CTA button:** border/text color is `#031422` (dark), purple overlay hover
- **Feature list items:** CSS `background-image: url('/images/pricing-content-list-check-mark.svg')`, padding-left 36px
- **Responsive widths:** 465px (base) → 570px (1280) → 630px (1440)
- **At max-991:** `flex-flow: row-reverse wrap-reverse`, both sides width 100%
- **Tab switching JS:** `is-active` class on menu items, `mps-pane-hidden` for panel visibility

### Files Copied to `public/images/` (Updated)

- `list-check-mark.svg` — used as CSS background-image in AboutSection and AboutV2Section list items
- `section-title-highlight-shape.svg` — used as background-image in SectionTitle component
- `blog-quites-banner-shape-left.png` — used as CSS background-image in BlogDetailsSection blockquote
- `blog-quites-banner-shape-center-quttaion.png` — used as CSS background-image in BlogDetailsSection blockquote
- `team-member-section-BG-shape.png` — used as CSS background-image in TeamDetailsSection content panel
- `pricing-content-list-check-mark.svg` — used as CSS background-image in MainPricingSection feature list items

### BreadcrumbHero — Per-Page titleClass Values

Different detail pages have different `.breadcrumb-title` max-widths in Webflow:
- **Features detail** (`.breadcrumb-title.features`): max-w 700px → 900px (1280) → 1100px (1440) → 600px (991)
- **Team detail** (`.breadcrumb-title.contact`): max-w 600px → 800px (1280) → 900px (1440)

### Pages Still To Create

- ~~**Blog Categories page** (`src/pages/category/[slug].astro`)~~ — DONE ✓
  - Already existed with correct structure: BreadcrumbHero (badge "Blog Category") + BlogSection (filtered by category) + CtaSection
  - 3 routes generated: `/category/saas-trends`, `/category/business`, `/category/automation`

### IntegrationDetailsSection Component (`IntegrationDetailsSection.astro`) — Key Design Decisions

- **Responsive breakpoint fix** — icon sizes, padding, gap were incorrectly applied at max-991 instead of max-767/max-479
- **Icon circles:** 120px (base through 991) → 100px (max-767) → 70px (max-479)
- **Icon image width:** 62px (base through 991) → 52px (max-767) → 45px (max-479)
- **Icon wrap padding:** 34px 40px (base through 991) → 28px 32px (max-767) → 20px 24px (max-479)
- **Icon wrap gap:** 40px (base through 991) → 30px (max-767) → 20px (max-479)
- **Title/detail block:** Added `max-767:mt-32` for responsive margin
- **Rich text CSS:** Split h2 from blockquote at max-991 (h2 stays at base 40px until max-767 where it drops to 30px)

### Final Validation Results

- **Build:** 43 pages, 0 errors, ~10s build time
- **Page count:** 43 HTML pages across all routes (index, home-v2, about, pricing, features, blog, contact-us, team, integration, + detail pages for blog/features/team/integration/author/category + 401/404 + template-info)
- **Internal links:** 43 unique, all valid (1 broken `/post/` link fixed → `/blog/`)
- **Images:** Cleaned from 156 → 78 files (removed 78 unused: duplicates, Webflow screenshots, landing page marketing images, CMS thumbnails, responsive variants)
- **Public images:** 9 files, all used via CSS `url()` paths
- **Remaining visual checks (browser-only):** Lighthouse audit, responsive breakpoint visual verification, visual accuracy check

### Visual Refinements Applied (Post-Phase 8)

1. **BlogSection gradient shapes** — Added `variant` prop ('default' | 'home'). Home pages show 2 shapes, blog pages show 4 shapes. Home left shape positioned at `bottom: 25%`. Full responsive CSS at all breakpoints.
2. **Button font-size 992-1199px** — All primary/outline buttons (6 files: PrimaryButton, OutlineButton, HeroV1, HeroV2, AboutV2Section, TeamSection) have `font-size: 20px` at `(min-width: 992px) and (max-width: 1199px)`.
3. **Style-guide buttons** — Replaced PrimaryButton/OutlineButton component imports with inline Webflow-exact buttons (24px font, 13px 22px padding, white sweep hover animation on both primary and outline).
4. **BlogCard zoom-in animation** — `.blog-card-reveal` changed from opacity-only to `scale(0.75) → scale(1)` + opacity transition for zoom-in effect on scroll-into-view.

### Style-Guide Page (`template-info/style-guide.astro`) — Button Rewrite

- **Does NOT use PrimaryButton/OutlineButton components** — style-guide buttons are Webflow-exact inline buttons with different sizing/behavior than generic components
- **CSS classes:** `.sg-primary-btn`, `.sg-outline-btn`, `.sg-primary-btn-overlay`, `.sg-outline-btn-overlay`, `.sg-btn-text-block`, `.sg-btn-arrow`
- **Primary button specs:** `border: 2px solid #5542f6`, `bg: #5542f6`, `padding: 13px 22px`, `font-size: 24px`, white text, `rounded-40`
- **Outline button specs:** `border: 1px solid white`, `color: white`, `padding: 13px 22px`, `font-size: 24px`, `bg: transparent`, `rounded-40`
- **Both buttons share white sweep hover animation:** overlay span with `translateX(-120%) → translateX(0)` on hover, `transition: transform 0.5s ease`
- **Outline button hover also:** border transitions to `#5542f6`, text transitions to `#5542f6` via `color` transition
- **Responsive:** max-991 (font-size 20px, padding 20px lr), max-479 (padding 11px 18px, font-size 18px primary / 20px outline)
- **Important:** Only style-guide.astro was changed — PrimaryButton/OutlineButton components remain unchanged for all other pages

### User Preferences

- **Do NOT auto-build the project** — only build when explicitly asked
- **Bengali instructions** — user communicates in Bengali, respond accordingly when needed
- **User's linter** automatically reformats Astro files (adds explicit border side resets, focus-visible styles, etc.) — do not be alarmed by these changes
