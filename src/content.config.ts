import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const posts = defineCollection({
  // Load Markdown and MDX files in the `src/content/posts/` directory.
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: () =>
    z.object({
      title: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      image: z.string().optional()
    })
})

const about = defineCollection({
  // Load Markdown files in the `src/content/about/` directory.
  loader: glob({ base: './src/content/about', pattern: '**/*.md' }),
  // Type-check frontmatter using a schema
  schema: z.object({})
})

const work = defineCollection({
  // Load Markdown files in the `src/content/work/` directory.
  loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
  // Type-check frontmatter using a schema
  schema: z.object({})
})

const projects = defineCollection({
  // Load Markdown files in the `src/content/projects/` directory (main and side).
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      github: z.string().url().optional(),
      url: z.string().url().optional(),
      image: z.string().optional()
    })
})

const projectsIntro = defineCollection({
  // Load Markdown files in the `src/content/projects-intro/` directory.
  loader: glob({ base: './src/content/projects-intro', pattern: '**/*.md' }),
  // Type-check frontmatter using a schema
  schema: z.object({})
})

export const collections = { posts, about, work, projects, projectsIntro }
