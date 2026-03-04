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
