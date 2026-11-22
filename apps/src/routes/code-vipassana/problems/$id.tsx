import { Link, createFileRoute, notFound } from '@tanstack/solid-router';
import { For, Show, createMemo, createSignal, onMount } from 'solid-js';
import { nextInLevel, problemById } from '../../../topics/code-vipassana/problems';
import { KIND_LABEL, LEVELS, type Problem } from '../../../topics/code-vipassana/problems/types';
import { Inline } from '../../../topics/code-vipassana/lib/inline';
import { recordAnswer } from '../../../topics/code-vipassana/lib/progress';
import { seededShuffle, shuffled } from '../../../topics/code-vipassana/lib/shuffle';

export const Route = createFileRoute('/code-vipassana/problems/$id')({
  // ローダーは問題データ（全問のコードと解説）を読むので、画面の部品と同じファイルに分けて出す。
  // こうしないと問題データが共通のファイルに入り、ほかのトピックを開いた人にも配られてしまう
  codeSplitGroupings: [['loader', 'component']],
  // 問題データは同じファイルに含まれているので、ローダーは存在確認だけ
  loader: ({ params }) => {
    const p = problemById(params.id);
    if (!p) throw notFound();
    return { title: p.title };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.title ?? '問題'} — Code Vipassana` }],
  }),
  component: ProblemPage,
});

function ProblemPage() {
  const params = Route.useParams();
  const problem = () => problemById(params().id);
  return (
    <Show when={problem()} keyed>
      {(p) => <ProblemView problem={p} />}
    </Show>
  );
}

const INDEXES = [0, 1, 2, 3] as const;

function ProblemView(props: { problem: Problem }) {
  const p = props.problem;
  const level = LEVELS.find((l) => l.level === p.level)!;
  const next = nextInLevel(p);
  const evidence = new Set(p.evidenceLines);

  // SSR と初回描画は ID から決まる並び、マウント後に毎回シャッフルし直す
  const [order, setOrder] = createSignal<number[]>(seededShuffle(INDEXES, p.id));
  const [selected, setSelected] = createSignal<number | null>(null);
  const [submitted, setSubmitted] = createSignal(false);
  const correct = createMemo(() => submitted() && selected() === p.answer);
  let resultRef: HTMLElement | undefined;

  onMount(() => setOrder(shuffled(INDEXES)));

  const submit = (e: Event) => {
    e.preventDefault();
    const s = selected();
    if (s === null || submitted()) return;
    recordAnswer(p.id, s === p.answer);
    setSubmitted(true);
    queueMicrotask(() => resultRef?.focus({ preventScroll: true }));
  };

  const retry = () => {
    setSubmitted(false);
    setSelected(null);
    setOrder(shuffled(INDEXES));
  };

  const [from, to] = p.source.lines;
  const sourceUrl = `https://github.com/${p.source.repo}/blob/${p.source.commit}/${p.source.path}#L${from}-L${to}`;

  return (
    <main class="page wrap problem">
      <nav class="crumbs">
        <Link to="/code-vipassana">問題一覧</Link>
        <span aria-hidden="true">/</span>
        <span>{level.label}</span>
      </nav>

      <header class="problem-head">
        <p class="problem-tags">
          <span class="tag">{level.label}</span>
          <span class="tag">{KIND_LABEL[p.kind]}</span>
          <span class="problem-id">#{p.id.slice(0, 3)}</span>
        </p>
        <h1>{p.title}</h1>
        <p class="question">
          <Inline text={p.question} />
        </p>
      </header>

      <figure class="code-frame">
        <figcaption class="code-caption">
          <span class="repo">{p.source.repo}</span>
          <span class="path">{p.source.path}</span>
          <Show when={p.source.modified}>
            <span class="badge" title={p.source.modification}>
              一部改変
            </span>
          </Show>
        </figcaption>
        <div class="code" tabindex="0" role="region" aria-label="問題のコード">
          <pre>
            <code>
              <For each={p.codeLines}>
                {(html, i) => {
                  const n = p.firstLine + i();
                  return (
                    <span class="line" classList={{ evidence: submitted() && evidence.has(n) }}>
                      <span class="ln" aria-hidden="true">
                        {n}
                      </span>
                      <span class="lc" innerHTML={html || ' '} />
                    </span>
                  );
                }}
              </For>
            </code>
          </pre>
        </div>
      </figure>

      <form class="choices" onSubmit={submit}>
        <fieldset disabled={submitted()}>
          <legend class="sr-only">選択肢</legend>
          <For each={order()}>
            {(idx) => {
              const c = p.choices[idx]!;
              const isAnswer = idx === p.answer;
              return (
                <label
                  class="choice"
                  classList={{
                    selected: selected() === idx,
                    'is-answer': submitted() && isAnswer,
                    'is-wrong': submitted() && selected() === idx && !isAnswer,
                  }}
                >
                  <input
                    type="radio"
                    name="choice"
                    value={idx}
                    checked={selected() === idx}
                    onChange={() => setSelected(idx)}
                  />
                  <span class="choice-body">
                    <span class="choice-text">
                      <Inline text={c.text} />
                    </span>
                    <Show when={submitted()}>
                      <span class="choice-why">
                        <span class="verdict">{isAnswer ? '正解' : '誤り'}</span>
                        <Inline text={c.why} />
                      </span>
                    </Show>
                  </span>
                </label>
              );
            }}
          </For>
        </fieldset>
        <Show when={!submitted()}>
          <button type="submit" class="btn btn-primary" disabled={selected() === null}>
            回答する
          </button>
        </Show>
      </form>

      <Show when={submitted()}>
        <section
          class="result"
          classList={{ ok: correct(), ng: !correct() }}
          tabindex="-1"
          ref={resultRef}
        >
          <h2>{correct() ? '正解' : '不正解'}</h2>
          <p class="evidence-note">
            根拠の行: {p.evidenceLines.join(', ')} 行目（コード上でハイライト）
          </p>
          <div class="prose" innerHTML={p.explanation} />

          <dl class="source">
            <dt>出典</dt>
            <dd>
              <a href={sourceUrl} rel="noopener">
                {p.source.repo} / {p.source.path} L{from}–{to}
              </a>{' '}
              <span class="commit">@{p.source.commit.slice(0, 7)}</span>
            </dd>
            <dt>ライセンス</dt>
            <dd>
              {p.source.license}（
              <Link to="/code-vipassana/licenses" hash={p.source.licenseKey}>
                全文
              </Link>
              ）
            </dd>
            <Show when={p.source.modified}>
              <dt>改変</dt>
              <dd>{p.source.modification}</dd>
            </Show>
          </dl>

          <div class="actions">
            <Show
              when={next}
              fallback={
                <Link to="/code-vipassana" class="btn btn-primary">
                  {level.label}はここまで。一覧へ
                </Link>
              }
            >
              {(n) => (
                <Link
                  to="/code-vipassana/problems/$id"
                  params={{ id: n().id }}
                  class="btn btn-primary"
                >
                  次の問題へ
                </Link>
              )}
            </Show>
            <button type="button" class="btn" onClick={retry}>
              もう一度解く
            </button>
          </div>
        </section>
      </Show>
    </main>
  );
}
