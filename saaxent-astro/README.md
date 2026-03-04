# SaaXent — Modern Dark SaaS Website Template

A modern, dark-themed SaaS website template built with **Astro 5** and **Tailwind CSS v3**. Includes 43 pre-built pages, fully responsive design, SEO optimization, and accessibility features.

![SaaXent Preview](public/preview.png)

## Features

- **43 Pages** — 2 home variants, about, pricing, features, blog, contact, team, integration + detail pages + utility pages
- **Dark Theme** — Professional dark navy design with purple accent colors
- **Fully Responsive** — Optimized for 6 breakpoints (479px, 767px, 991px, 1280px, 1440px, 1920px)
- **SEO Ready** — Unique meta tags, Open Graph, Twitter Cards, Schema.org JSON-LD, sitemap
- **Accessible** — Semantic HTML, skip-to-content, aria attributes, keyboard navigation, reduced-motion support
- **Performance Optimized** — Zero JS bundles, optimized images via Astro `<Image>`, self-hosted fonts, lazy loading
- **Scroll Animations** — Reveal-on-scroll effects with IntersectionObserver
- **No jQuery** — Pure vanilla JavaScript, no external frameworks
- **Self-Hosted Fonts** — Outfit font family (4 weights) in WOFF2 format

## Pages Included

### Main Pages
- Home V1 (`/`)
- Home V2 (`/home-v2`)
- About (`/about`)
- Pricing (`/pricing`)
- Features (`/features`)
- Blog (`/blog`)
- Contact (`/contact-us`)
- Team (`/team`)
- Integration (`/integration`)

### Detail Pages
- Blog Post Detail (`/blog/[slug]`)
- Feature Detail (`/features/[slug]`)
- Team Member Detail (`/team/[slug]`)
- Integration Detail (`/integration/[slug]`)
- Blog Author (`/author/[slug]`)
- Blog Category (`/category/[slug]`)

### Utility Pages
- 404 Not Found
- 401 Password Protected
- Style Guide (`/template-info/style-guide`)
- Changelog (`/template-info/changelog`)
- Licenses (`/template-info/licenses`)

## Tech Stack

- [Astro 5](https://astro.build/) — Static site generator
- [Tailwind CSS v3](https://tailwindcss.com/) — Utility-first CSS
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- Vanilla JavaScript — No frameworks

## Quick Start

```bash
# Clone the repository
git clone https://github.com/AH-Developer/saaxent.git

# Navigate to the project
cd saaxent

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

## Commands

| Command | Action |
|:--------|:-------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally |
| `npm run check` | Run Astro type checking |

## Project Structure

```
saaxent/
├── public/
│   ├── fonts/              # Self-hosted Outfit font files (woff2)
│   ├── images/             # Static images (CSS backgrounds, SVGs)
│   ├── favicon.svg
│   └── webclip.svg
├── src/
│   ├── assets/images/      # Optimized images (processed by Astro)
│   ├── components/         # 40 Astro components (flat structure)
│   ├── data/               # Static content data files (TypeScript)
│   ├── layouts/            # BaseLayout + PageLayout
│   ├── pages/              # All page routes
│   ├── styles/             # Global CSS with Tailwind
│   └── utils/              # Utility functions (resolveImage)
├── astro.config.mjs
├── tailwind.config.js
├── postcss.config.cjs
└── tsconfig.json
```

## Customization

### Changing Site Info
Edit `src/data/site.ts` to update the site name, description, phone, and URL.

### Changing Colors
Edit `tailwind.config.js` to modify the color palette under the `colors` key. The main brand color is `brand.primary` (`#5542f6`).

### Changing Fonts
1. Replace font files in `public/fonts/`
2. Update `@font-face` declarations in `src/styles/global.css`
3. Update `fontFamily` in `tailwind.config.js`

### Changing Content
All page content is stored in `src/data/` as TypeScript files. Edit these files to update text, images, and links.

### Adding Pages
1. Create a new `.astro` file in `src/pages/`
2. Import `PageLayout` and section components
3. Add content data in `src/data/`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the [MIT License](LICENSE).

## Author

**Aslam Hasib**

---

Built with [Astro](https://astro.build/)
