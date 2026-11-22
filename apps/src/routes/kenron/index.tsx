import { For } from 'solid-js';
import { Link, createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/kenron/')({
  component: KenronIndex,
});

/** 圏論のページの一覧。ページを足したらここに1件追加する */
const PAGES = [
  {
    to: '/kenron/natural-transformation',
    title: '自然変換',
    description: '「先にやっても、あとにやっても同じ」を、ビーズの列を3Dで動かして確かめる。',
  },
] as const;

function KenronIndex() {
  return (
    <article class="page">
      <header class="hero">
        <h1>
          <span>動かしてわかる</span>
          <span>圏論</span>
        </h1>
        <p class="hero-lead">
          圏論の考え方を、3Dの図を動かしながら、できるだけやさしく説明するページ。
        </p>
      </header>
      <ul class="page-list">
        <For each={PAGES}>
          {(page) => (
            <li>
              <Link to={page.to}>{page.title}</Link>
              <p>{page.description}</p>
            </li>
          )}
        </For>
      </ul>
    </article>
  );
}
