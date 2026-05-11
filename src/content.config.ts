import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1, 'El título es obligatorio'),
      description: z.string().min(1, 'La descripción corta es obligatoria'),
      technologies: z.array(z.string()).min(1, 'Añade al menos una tecnología en formato de array'),
      repo: z.string().url('Debes proporcionar una URL válida para el repositorio').optional(),
      live: z.string().url('Debes proporcionar una URL válida para el link en vivo').optional(),
      image: image().optional(),
      date: z.coerce.date(),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(1, 'El título es obligatorio'),
    date: z.coerce.date(),
    summary: z.string().min(1, 'El resumen (summary) es obligatorio'),
    draft: z.boolean().default(false),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/services' }),
  schema: z.object({
    title: z.string().min(1, 'El título del servicio es obligatorio'),
    summary: z.string().min(1, 'El resumen del servicio es obligatorio'),
    description: z.string().min(1, 'La descripción larga es obligatoria'),
    icon: z.string().min(1, 'Debes buscar un nombre de ícono (ej. ph:code)'),
    order: z.number().default(0),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/testimonials' }),
  schema: z.object({
    author: z.string().min(1, 'El nombre del autor es obligatorio'),
    role: z.string().min(1, 'El cargo o rol (role) es obligatorio'),
    content: z.string().min(1, 'El contenido del testimonio es obligatorio'),
    avatar: z.string().optional(),
    company: z.string().optional(),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/faq' }),
  schema: z.object({
    question: z.string().min(1, 'La pregunta (question) es obligatoria'),
    answer: z.string().min(1, 'La respuesta (answer) es obligatoria'),
    order: z.number().default(0),
  }),
});

const changelog = defineCollection({
  loader: glob({ pattern: '**/history.md', base: './src/content/changelog' }),
  schema: z.object({
    title: z.string().optional(),
  }),
});

export const collections = { projects, blog, services, testimonials, faq, changelog };
