import { Link, Outlet, createFileRoute } from '@tanstack/solid-router';
import { ThemeToggle } from '../../shared/theme';
import kenronCss from '../../topics/kenron/styles.css?url';

// 圏論のトピック全体の枠（上の帯とフッター）。
// CSS はここで読み込むので、このトピックのページを開いているあいだだけ効く。

export const SITE_TITLE = '動かしてわかる圏論';

export const Route = createFileRoute('/kenron')({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      {
        name: 'description',
        content: '圏論の考え方を、3Dの図を動かしながら、できるだけやさしく説明するページ。',
      },
      { name: 'theme-color', content: '#0d1220' },
    ],
    links: [{ rel: 'stylesheet', href: kenronCss }],
  }),
  component: KenronLayout,
});

function KenronLayout() {
  return (
    <>
      <header class="topbar wrap">
        <Link to="/kenron" class="topbar-home" activeOptions={{ exact: true }}>
          {SITE_TITLE}
        </Link>
        <ThemeToggle />
      </header>

      <main class="wrap">
        <Outlet />
      </main>

      <footer class="site-footer wrap">
        {/* トピックの外へ出るリンクはページごと読み込み直す（このトピックの CSS を残さないため） */}
        <Link to="/" reloadDocument>
          et cetera の一覧を見る
        </Link>
        <a href="/">seiei-sogen.dev に戻る</a>
      </footer>
    </>
  );
}
