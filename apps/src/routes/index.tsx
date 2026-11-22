import { For } from 'solid-js';
import { Link, createFileRoute } from '@tanstack/solid-router';
import homeCss from '../shared/home.css?url';
import { TOPICS } from '../topics';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      {
        name: 'description',
        content: 'ブログの記事には収まらない、動かして確かめるページの置き場。',
      },
      { name: 'theme-color', content: '#0d1220' },
    ],
    links: [{ rel: 'stylesheet', href: homeCss }],
  }),
  component: Home,
});

function Home() {
  return (
    <main class="home">
      <h1>et cetera</h1>
      <p class="home-lead">ブログの記事には収まらない、動かして確かめるページの置き場。</p>
      <ul class="home-list">
        <For each={TOPICS}>
          {(topic) => (
            <li>
              {/* トピックをまたぐリンクはページごと読み込み直す（前のページの CSS を残さないため） */}
              <Link to={topic.to} reloadDocument>
                {topic.title}
              </Link>
              <p>{topic.description}</p>
            </li>
          )}
        </For>
      </ul>
      <p class="home-back">
        <a href="/">seiei-sogen.dev に戻る</a>
      </p>
    </main>
  );
}
