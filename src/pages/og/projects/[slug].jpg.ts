import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadDefaultJapaneseParser } from 'budoux';
import { siteConfig } from '@/site-config';

const fontPath = join(process.cwd(), 'src/assets/fonts/NotoSansJP-Bold.ttf');
const fontData = readFileSync(fontPath);
const parser = loadDefaultJapaneseParser();

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getCollection('projects');
  return projects.map((project) => ({
    params: { slug: project.id },
    props: { title: project.data.title, date: project.data.date },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { title, date } = props as { title: string; date: Date };
  const year = String(date.getFullYear());
  const segments = parser.parse(title);

  const titleChildren = segments.map((segment) => ({
    type: 'span',
    props: { children: segment },
  }));

  const tree = {
    type: 'div',
    props: {
      style: {
        height: '100%',
        width: '100%',
        display: 'flex',
        position: 'relative',
        background: '#21242d',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            },
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '100%',
              height: '100%',
              padding: '60px 70px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flex: 1,
                    alignItems: 'center',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontSize: title.length > 35 ? '54px' : '62px',
                          fontWeight: 'bold',
                          color: '#ffffff',
                          lineHeight: 1.35,
                          letterSpacing: '-0.02em',
                          display: 'flex',
                          flexWrap: 'wrap',
                        },
                        children: titleChildren,
                      },
                    },
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontSize: '32px',
                          fontWeight: 'bold',
                          color: '#ffffff',
                          letterSpacing: '-0.02em',
                        },
                        children: siteConfig.site.name,
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontSize: '28px',
                          color: '#a1a1aa',
                          fontWeight: 'bold',
                        },
                        children: year,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };

  const svg = await satori(tree as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Noto Sans JP',
        data: fontData,
        weight: 700,
        style: 'normal',
      },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  });
  const pngBuffer = resvg.render().asPng();
  const jpgBuffer = await sharp(pngBuffer).jpeg({ quality: 90 }).toBuffer();

  return new Response(jpgBuffer as unknown as BodyInit, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
