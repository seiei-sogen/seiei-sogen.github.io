import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';

// ブログの /et-cetera/quaternion/ 配下に置くため、取り込み時は BASE_PATH を渡す。
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
    viteReact(),
  ],
});
