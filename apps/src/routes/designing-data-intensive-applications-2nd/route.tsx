import { Link, Outlet, createFileRoute } from '@tanstack/solid-router';
import ddiaCss from '../../topics/designing-data-intensive-applications-2nd/styles.css?url';

// 『データ指向アプリケーションデザイン 第2版』の図解ノートの枠（上の帯とフッター）。
// 各章のページはルーターを通さない静的な HTML（apps/public/ の下）なので、ここで扱うのは目次だけ。
// 章のページがダークモード専用なので、目次もダークだけにしている（テーマの切り替えは置かない）。

export const SITE_TITLE = 'データ指向アプリケーションデザイン 第2版 図解ノート';

export const Route = createFileRoute('/designing-data-intensive-applications-2nd')({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      {
        name: 'description',
        content:
          '『データ指向アプリケーションデザイン 第2版』を読みながら、章ごとに作った図解ノート。',
      },
      { name: 'theme-color', content: '#0f1420' },
    ],
    links: [{ rel: 'stylesheet', href: ddiaCss }],
  }),
  component: DdiaLayout,
});

function DdiaLayout() {
  return (
    <>
      <main class="ddia-wrap">
        <Outlet />
      </main>

      <footer class="ddia-footer ddia-wrap">
        {/* トピックの外へ出るリンクはページごと読み込み直す（このトピックの CSS を残さないため） */}
        <Link to="/" reloadDocument>
          et cetera の一覧を見る
        </Link>
        <a href="/">seiei-sogen.dev に戻る</a>
      </footer>
    </>
  );
}
