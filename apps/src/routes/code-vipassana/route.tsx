import { onMount } from 'solid-js';
import { Link, Outlet, createFileRoute } from '@tanstack/solid-router';
import { ThemeToggle } from '../../shared/theme';
import { loadProgress } from '../../topics/code-vipassana/lib/progress';
import vipassanaCss from '../../topics/code-vipassana/styles.css?url';

// Code Vipassana のトピック全体の枠（ヘッダーとフッター）。
// CSS はここで読み込むので、このトピックのページを開いているあいだだけ効く。

export const SITE_NAME = 'Code Vipassana';

export const Route = createFileRoute('/code-vipassana')({
  head: () => ({
    meta: [
      { title: `${SITE_NAME} — OSSのコードを読む練習` },
      {
        name: 'description',
        content: 'OSSの実コードを1画面ぶん読み、4択の設問に答えるコードリーディング練習サイト。',
      },
      { name: 'theme-color', content: '#15140f' },
    ],
    links: [{ rel: 'stylesheet', href: vipassanaCss }],
  }),
  component: VipassanaLayout,
  notFoundComponent: () => (
    <main class="page wrap">
      <p>ページが見つかりません。</p>
      <Link to="/code-vipassana">問題一覧へ</Link>
    </main>
  ),
});

function VipassanaLayout() {
  // クリア状況は localStorage にある。最初の HTML と食い違わないよう、表示してから読み込む
  onMount(loadProgress);
  return (
    <>
      <header class="site-header">
        <div class="wrap">
          <Link to="/code-vipassana" class="brand">
            <span class="brand-mark" aria-hidden="true">
              ◐
            </span>
            {SITE_NAME}
          </Link>
          <span class="brand-sub">OSSのコードを、ありのままに読む</span>
          <ThemeToggle />
        </div>
      </header>
      <Outlet />
      <footer class="site-footer">
        <div class="wrap">
          <span>コードは各OSSの著作物です。</span>
          <Link to="/code-vipassana/licenses">出典とライセンス</Link>
          {/* トピックの外へ出るリンクはページごと読み込み直す（このトピックの CSS を残さないため） */}
          <Link to="/" reloadDocument>
            et cetera の一覧を見る
          </Link>
        </div>
      </footer>
    </>
  );
}
