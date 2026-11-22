import { Link, createFileRoute } from '@tanstack/react-router';
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
    <main className="home">
      <h1>et cetera</h1>
      <p className="home-lead">ブログの記事には収まらない、動かして確かめるページの置き場。</p>
      <ul className="home-list">
        {TOPICS.map((topic) => (
          <li key={topic.to}>
            {/* トピックをまたぐリンクはページごと読み込み直す（前のページの CSS を残さないため） */}
            <Link to={topic.to} reloadDocument>
              {topic.title}
            </Link>
            <p>{topic.description}</p>
          </li>
        ))}
      </ul>
      <p className="home-back">
        <a href="/">seiei-sogen.dev に戻る</a>
      </p>
    </main>
  );
}
