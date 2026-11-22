import { For } from 'solid-js';
import { Link, Outlet, createFileRoute } from '@tanstack/solid-router';
import { ThemeToggle } from '../../shared/theme';
import quaternionCss from '../../topics/quaternion/styles.css?url';

// クォータニオンのトピック全体の枠（冒頭の図解・タブ・フッター）。
// CSS はここで読み込むので、このトピックのページを開いているあいだだけ効く。

export const SITE_TITLE = 'クォータニオンを手で回す';
const DESCRIPTION =
  'ものの向きを表す4つの数 q = (w, x, y, z) が何をしているのかを、3Dで動かして確かめるページ。軸と角度、二重被覆、オイラー角との比較、四次元の球。';

export const Route = createFileRoute('/quaternion')({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: 'description', content: DESCRIPTION },
      { name: 'theme-color', content: '#0d1220' },
    ],
    links: [{ rel: 'stylesheet', href: quaternionCss }],
  }),
  component: QuaternionLayout,
});

const TABS = [
  { to: '/quaternion', no: 1, label: '軸と角度' },
  { to: '/quaternion/double-cover', no: 2, label: 'ふた回り' },
  { to: '/quaternion/euler', no: 3, label: 'オイラー角' },
  { to: '/quaternion/hypersphere', no: 4, label: '四次元' },
] as const;

function QuaternionLayout() {
  let tabsTop: HTMLDivElement | undefined;

  // タブを切り替えてもページの先頭には戻さない。
  // ただしタブより下までスクロールしていたら、新しい実験の頭が見える位置に合わせる。
  const alignToTabs = () => {
    if (!tabsTop) return;
    const y = tabsTop.getBoundingClientRect().top + window.scrollY;
    if (window.scrollY > y) window.scrollTo(0, y);
  };

  return (
    <>
      <header class="hero wrap">
        <ThemeToggle />
        <h1>
          <span>クォータニオンを</span>
          <span>手で回す</span>
        </h1>
        <p class="hero-lead">
          ゲームやCGで、ものの「向き」を表すのに使う4つの数がクォータニオン。式を追う前に、まず自分の手で回して感じをつかむためのページ。
        </p>
        <div
          class="hero-q"
          role="img"
          aria-label="q = (w, x, y, z)。w はどれだけ回したか、x・y・z はどの軸のまわりに回したかを表す"
        >
          <span aria-hidden="true">
            <var>q</var> = (
          </span>
          <span class="hq-group" aria-hidden="true">
            <span class="hq-sym c-w">w</span>
            <span class="hq-cap">
              どれだけ
              <br />
              回したか
            </span>
          </span>
          <span aria-hidden="true">,</span>
          <span class="hq-group" aria-hidden="true">
            <span class="hq-sym">
              <span class="c-x">x</span>, <span class="c-y">y</span>, <span class="c-z">z</span>
            </span>
            <span class="hq-cap">
              どの軸のまわりに
              <br />
              回したか
            </span>
          </span>
          <span aria-hidden="true">)</span>
        </div>
      </header>

      <div ref={tabsTop} />
      <nav class="tabbar" aria-label="実験を選ぶ">
        <div class="wrap">
          <For each={TABS}>
            {(tab) => (
              <Link
                to={tab.to}
                activeOptions={{ exact: true }}
                resetScroll={false}
                onClick={alignToTabs}
              >
                <span class="tab-no">{tab.no}</span>
                {tab.label}
              </Link>
            )}
          </For>
        </div>
      </nav>

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
