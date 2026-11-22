import { For } from 'solid-js';
import { createFileRoute } from '@tanstack/solid-router';
import {
  CHAPTER_PAGES,
  TOPIC_PATH,
} from '../../topics/designing-data-intensive-applications-2nd/chapters';

export const Route = createFileRoute('/designing-data-intensive-applications-2nd/')({
  component: DdiaIndex,
});

/** 章のページは静的な HTML なので、<Link> ではなくふつうの <a> で開く（ページごと読み込み直す） */
const pageHref = (slug: string) => `${import.meta.env.BASE_URL}${TOPIC_PATH}/${slug}/`;

function DdiaIndex() {
  return (
    <article>
      <header class="ddia-hero">
        <p class="ddia-kicker">図解ノート</p>
        <h1>
          <span>データ指向</span>
          <span>アプリケーション</span>
          <span>デザイン 第2版</span>
        </h1>
        <p class="ddia-lead">
          『データ指向アプリケーションデザイン 第2版』（Martin Kleppmann、Chris Riccomini 著、斉藤
          太郎 訳、オライリー・ジャパン）を読みながら、章ごとに作った図解ノート。
        </p>
        <p class="ddia-note">
          図は本の図を写したものではなく、本文の説明をもとに描き直したもの。たとえ話や補足など本にない内容は、各ページの中でそう書いている。
        </p>
      </header>

      <ol class="ddia-list">
        <For each={CHAPTER_PAGES}>
          {(page) => (
            <li>
              <span class="ddia-label">{page.label}</span>
              <div>
                <a href={pageHref(page.slug)}>{page.title}</a>
                <p>{page.description}</p>
              </div>
            </li>
          )}
        </For>
      </ol>

      <p class="ddia-book">
        <a href="https://www.oreilly.co.jp/books/9784814401802">本の紹介ページ（オライリー・ジャパン）</a>
      </p>
    </article>
  );
}
