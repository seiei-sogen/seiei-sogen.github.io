import { Link, createFileRoute } from '@tanstack/solid-router';
import { For, Show } from 'solid-js';
import { problems, problemsByLevel } from '../../topics/code-vipassana/problems';
import { KIND_LABEL, LEVELS } from '../../topics/code-vipassana/problems/types';
import {
  clearedCount,
  isCleared,
  statusOf,
  type Status,
} from '../../topics/code-vipassana/lib/progress';

export const Route = createFileRoute('/code-vipassana/')({ component: Home });

function Mark(props: { status: Status | undefined }) {
  return (
    <Show
      when={isCleared(props.status)}
      fallback={<span class="mark mark-none" aria-label="未クリア" />}
    >
      <span
        class={`mark ${props.status === 'first' ? 'mark-first' : 'mark-retry'}`}
        title={props.status === 'first' ? '初回で正解' : '2回目以降で正解'}
      >
        {props.status === 'first' ? '初回正解' : '正解'}
      </span>
    </Show>
  );
}

function Home() {
  return (
    <main class="page wrap">
      <section class="intro">
        <h1>OSSのコードを1画面ぶん読んで、4択で答える。</h1>
        <p>
          AIにコードを書かせる時代に、読む力を鍛え直すための練習問題です。1問3〜5分。
          不正解でもすぐに解説が読めます。
        </p>
        <p class="progress-summary">
          <strong>{clearedCount()}</strong> / {problems.length} 問クリア
        </p>
      </section>

      <For each={LEVELS}>
        {(lv) => (
          <section class="level">
            <header class="level-head">
              <h2>{lv.label}</h2>
              <p>{lv.note}</p>
            </header>
            <ol class="problem-list">
              <For each={problemsByLevel(lv.level)}>
                {(p) => (
                  <li>
                    <Link
                      to="/code-vipassana/problems/$id"
                      params={{ id: p.id }}
                      class="problem-card"
                    >
                      <span class="problem-no">{p.id.slice(0, 3)}</span>
                      <span class="problem-body">
                        <span class="problem-title">{p.title}</span>
                        <span class="problem-meta">
                          <span class="repo">{p.source.repo}</span>
                          <span class="tag">{KIND_LABEL[p.kind]}</span>
                        </span>
                      </span>
                      <Mark status={statusOf(p.id)} />
                    </Link>
                  </li>
                )}
              </For>
            </ol>
          </section>
        )}
      </For>
    </main>
  );
}
