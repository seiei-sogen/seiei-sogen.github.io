/// <reference types="vite/client" />
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';
import appCss from '../styles.css?url';

export const SITE_TITLE = 'クォータニオンを手で回す';
const DESCRIPTION =
  '回転を表す4つの数 q = (w, x, y, z) が何をしているのかを、3Dで動かして確かめるページ。軸と角度、二重被覆、オイラー角との比較。';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: SITE_TITLE },
      { name: 'description', content: DESCRIPTION },
      { name: 'theme-color', content: '#0d1220' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      // ブログ本体（サイトのルート）のファビコンを借りる
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: () => (
    <p>
      ページが見つかりません。<Link to="/">最初の実験に戻る</Link>
    </p>
  ),
});

const THEME_KEY = 'quaternion:theme';

// 既定はダーク。前回ライトを選んだ人だけ、描画前に切り替える（ちらつき防止のため head に直接置く）
const applySavedTheme = `try{if(localStorage.getItem('${THEME_KEY}')==='light')document.documentElement.dataset.theme='light'}catch(e){}`;

function RootDocument({ children }: { children: ReactNode }) {
  return (
    // data-theme は上のスクリプトが書き換えるので、ハイドレーションの差分警告を止める
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

function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    if (document.documentElement.dataset.theme === 'light') setTheme('light');
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (next === 'light') document.documentElement.dataset.theme = 'light';
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // 保存できなくても、このページを開いているあいだは切り替わる
    }
  };

  return (
    <button type="button" className="theme-toggle" onClick={toggle}>
      {theme === 'dark' ? 'ライトモードにする' : 'ダークモードにする'}
    </button>
  );
}

const TABS = [
  { to: '/', no: 1, label: '軸と角度' },
  { to: '/double-cover', no: 2, label: '二重被覆' },
  { to: '/euler', no: 3, label: 'オイラー角' },
] as const;

function RootLayout() {
  const tabsTop = useRef<HTMLDivElement>(null);

  // タブを切り替えてもページの先頭には戻さない。
  // ただしタブより下までスクロールしていたら、新しい実験の頭が見える位置に合わせる。
  const alignToTabs = () => {
    const top = tabsTop.current;
    if (!top) return;
    const y = top.getBoundingClientRect().top + window.scrollY;
    if (window.scrollY > y) window.scrollTo(0, y);
  };

  return (
    <>
      <header className="hero wrap">
        <ThemeToggle />
        <h1>
          <span>クォータニオンを</span>
          <span>手で回す</span>
        </h1>
        <p className="hero-lead">回転を表す4つの数が何をしているのかを、3つの実験で確かめる。</p>
        <p className="hero-formula" aria-label="q = cos(θ/2) + sin(θ/2)(nx i + ny j + nz k)">
          <span aria-hidden="true">
            <var>q</var> ={' '}
            <span className="c-w">
              cos(<var>θ</var>/2)
            </span>{' '}
            + sin(<var>θ</var>/2)
            <wbr />(
            <span className="c-x">
              <var>n</var>
              <sub>x</sub>
              <b>i</b>
            </span>{' '}
            +{' '}
            <span className="c-y">
              <var>n</var>
              <sub>y</sub>
              <b>j</b>
            </span>{' '}
            +{' '}
            <span className="c-z">
              <var>n</var>
              <sub>z</sub>
              <b>k</b>
            </span>
            )
          </span>
        </p>
        <ul className="legend" aria-label="色の対応">
          <li>
            <span className="swatch" style={{ background: 'var(--w)' }} aria-hidden="true" />w
          </li>
          <li>
            <span className="swatch" style={{ background: 'var(--x)' }} aria-hidden="true" />x
          </li>
          <li>
            <span className="swatch" style={{ background: 'var(--y)' }} aria-hidden="true" />y
          </li>
          <li>
            <span className="swatch" style={{ background: 'var(--z)' }} aria-hidden="true" />z
          </li>
        </ul>
      </header>

      <div ref={tabsTop} />
      <nav className="tabbar" aria-label="実験を選ぶ">
        <div className="wrap">
          {TABS.map((tab) => (
            <Link
              key={tab.to}
              to={tab.to}
              activeOptions={{ exact: true }}
              resetScroll={false}
              onClick={alignToTabs}
            >
              <span className="tab-no">{tab.no}</span>
              {tab.label}
            </Link>
          ))}
        </div>
      </nav>

      <main className="wrap">
        <Outlet />
      </main>

      <footer className="site-footer wrap">
        <a href="/">seiei-sogen.dev に戻る</a>
      </footer>
    </>
  );
}
