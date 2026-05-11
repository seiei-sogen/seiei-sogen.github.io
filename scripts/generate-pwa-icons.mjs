/**
 * generate-pwa-icons.mjs
 * Generates 192x192 and 512x512 PNG icons from public/favicon.svg
 * Run: node scripts/generate-pwa-icons.mjs
 */

import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const sizes = [
  { width: 192, height: 192, name: 'icon-192x192.png' },
  { width: 512, height: 512, name: 'icon-512x512.png' },
  { width: 192, height: 192, name: 'apple-touch-icon.png' },
];

async function generate() {
  const svgPath = join(rootDir, 'public', 'favicon.svg');
  const svgBuffer = readFileSync(svgPath);

  for (const size of sizes) {
    const outputPath = join(rootDir, 'public', size.name);

    await sharp(svgBuffer)
      .resize(size.width, size.height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toFile(outputPath);

    console.log(`✓ Generated ${size.name} (${size.width}x${size.height})`);
  }

  console.log('\n✓ All PWA icons generated in /public/');
}

generate().catch(console.error);
