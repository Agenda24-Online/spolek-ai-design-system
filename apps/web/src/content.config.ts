import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const publicContent = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/public' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    module: z.enum([
      'brand',
      'design-system',
      'business-os',
      'ai-team',
      'workflow',
      'marketing',
      'knowledge-base',
      'decision-log',
      'future-ideas',
      'asset-library'
    ]),
    status: z.enum(['draft', 'review', 'approved', 'deprecated', 'archived']),
    visibility: z.literal('public'),
    version: z.string(),
    owners: z.array(z.string()).min(1),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    relations: z.array(z.string()).default([])
  })
});

export const collections = { public: publicContent };
