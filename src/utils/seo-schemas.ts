import type { CollectionEntry } from 'astro:content';
import { siteConfig } from '@/site-config';

/**
 * Generates Schema.org/FAQPage JSON-LD
 */
export function getFaqSchema(faqs: CollectionEntry<'faq'>[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.data.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.data.answer,
      },
    })),
  };
}

/**
 * Generates Schema.org/Service JSON-LD
 */
export function getServiceSchema(service: CollectionEntry<'services'>) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.data.title,
    "description": service.data.summary,
    "provider": {
      "@type": "Person",
      "name": siteConfig.profile.name,
      "url": siteConfig.site.url,
    },
    "url": `${siteConfig.site.url}/services/${service.id}`,
  };
}

/**
 * Generates Schema.org/CreativeWork JSON-LD for Projects
 */
export function getProjectSchema(project: CollectionEntry<'projects'>) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.data.title,
    "description": project.data.description,
    "datePublished": project.data.date.toISOString(),
    "author": {
      "@type": "Person",
      "name": siteConfig.profile.name,
      "url": siteConfig.site.url,
    },
    "keywords": project.data.technologies.join(', '),
    "url": `${siteConfig.site.url}/projects/${project.id}`,
    "image": project.data.image ? `${siteConfig.site.url}${project.data.image.src}` : undefined,
  };
}
