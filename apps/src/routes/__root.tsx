/// <reference types="vite/client" />
import type { ReactNode } from 'react';
import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router';
import { applySavedTheme } from '../shared/theme';

// et-cetera 全体の外枠。ここにはトピック固有のものを置かない。
// 見た目（CSS）やレイアウトは、各トピックの routes/<トピック名>/route.tsx が持つ。

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'et cetera | seiei-sogen.dev' },
    ],
    links: [
      // ブログ本体（サイトのルート）のファビコンを借りる
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: () => (
    <p style={{ padding: 20 }}>
      ページが見つかりません。
      <Link to="/" reloadDocument>
        一覧に戻る
      </Link>
    </p>
  ),
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    // data-theme は下のスクリプトが書き換えるので、ハイドレーションの差分警告を止める
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: applySavedTheme }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
