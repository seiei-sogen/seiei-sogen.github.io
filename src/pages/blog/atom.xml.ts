import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '@/site-config';

const escapeXml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL(siteConfig.site.url)).toString().replace(/\/$/, '');
  const selfHref = `${base}/blog/atom.xml`;

  const posts = (await getCollection('blog', (p) => !p.data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  const updated = posts[0]?.data.date ?? new Date();

  const entries = posts
    .map((post) => {
      const url = `${base}/blog/${post.id}/`;
      const iso = post.data.date.toISOString();
      return `
  <entry>
    <title>${escapeXml(post.data.title)}</title>
    <link href="${url}" rel="alternate" type="text/html"/>
    <id>${url}</id>
    <updated>${iso}</updated>
    <published>${iso}</published>
    <summary>${escapeXml(post.data.summary)}</summary>
  </entry>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${siteConfig.site.lang}">
  <title>${escapeXml(siteConfig.site.name)} — Blog</title>
  <subtitle>${escapeXml(siteConfig.seo.defaultDescription)}</subtitle>
  <link href="${base}/blog/" rel="alternate" type="text/html"/>
  <link href="${selfHref}" rel="self" type="application/atom+xml"/>
  <id>${selfHref}</id>
  <updated>${updated.toISOString()}</updated>
  <author>
    <name>${escapeXml(siteConfig.profile.name)}</name>
  </author>${entries}
</feed>
`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
};
