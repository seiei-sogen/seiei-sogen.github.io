/// <reference types="vite/client" />
import { createEffect, type JSX } from 'solid-js';
import { HydrationScript } from 'solid-js/web';
import { HeadContent, Link, Scripts, createRootRoute, useMatches } from '@tanstack/solid-router';
import { applySavedTheme } from '../shared/theme';

// et-cetera 全体の外枠。ここにはトピック固有のものを置かない。
// 見た目（CSS）やレイアウトは、各トピックの routes/<トピック名>/route.tsx が持つ。

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charset: 'utf-8' },
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
    <p style={{ padding: '20px' }}>
      ページが見つかりません。
      <Link to="/" reloadDocument>
        一覧に戻る
      </Link>
    </p>
  ),
});

function RootDocument(props: { children: JSX.Element }) {
  return (
    <html lang="ja">
      <head>
        {/* 前回ライトを選んだ人は、描画前に data-theme を付ける */}
        <script innerHTML={applySavedTheme} />
        <HydrationScript />
        <HeadContent />
      </head>
      <body>
        <TitleSync />
        {props.children}
        <Scripts />
      </body>
    </html>
  );
}

/**
 * ページを読み込み直さずに移動したとき（タブの切り替えなど）に、タブのタイトルを合わせる。
 * 各ルートの head() の title は最初の HTML には入るが、移動のときには <title> が書き換わらないので、
 * いま表示しているルートのうち、いちばん内側の title を document.title に入れる。
 */
function TitleSync() {
  const matches = useMatches();
  createEffect(() => {
    let title: string | undefined;
    for (const match of matches()) {
      for (const meta of match.meta ?? []) {
        if (meta && 'title' in meta && typeof meta.title === 'string') title = meta.title;
      }
    }
    if (title) document.title = title;
  });
  return null;
}
