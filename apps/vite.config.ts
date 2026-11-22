import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/solid-start/plugin/vite';
import viteSolid from 'vite-plugin-solid';
import { problemAssets } from './plugins/problem-assets';

// ブログの /et-cetera/ 配下に置くため、取り込み時は BASE_PATH=/et-cetera/ を渡す。
// ローカル開発では "/"。
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base,
  server: { port: 3000 },
  plugins: [
    // Code Vipassana の問題（コードのハイライトと解説の Markdown）をビルド時に変換する
    problemAssets(),
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
