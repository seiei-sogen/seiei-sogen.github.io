import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/solid-start/plugin/vite';
import viteSolid from 'vite-plugin-solid';

// ブログの /et-cetera/ 配下に置くため、取り込み時は BASE_PATH=/et-cetera/ を渡す。
// ローカル開発では "/"。
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base,
  server: { port: 3000 },
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
      },
    }),
    viteSolid({ ssr: true }),
  ],
});
