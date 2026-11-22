import { createFileRoute } from '@tanstack/solid-router';
import { For } from 'solid-js';
import { licenses } from '../../topics/code-vipassana/licenses';
import { problems } from '../../topics/code-vipassana/problems';

export const Route = createFileRoute('/code-vipassana/licenses')({
  head: () => ({ meta: [{ title: '出典とライセンス — Code Vipassana' }] }),
  component: Licenses,
});

function Licenses() {
  return (
    <main class="page wrap">
      <h1>出典とライセンス</h1>
      <p>
        問題のコードは、以下のオープンソースソフトウェアから抜粋しています。各問題はコミットを固定して引用しており、
        「一部改変」と表示した問題はコメントの削除などの手を加えています。
      </p>
      <For each={licenses}>
        {(l) => (
          <section class="license" id={l.key}>
            <h2>{l.name}</h2>
            <p class="license-meta">
              <a href={`https://github.com/${l.repo}`} rel="noopener">
                github.com/{l.repo}
              </a>
              <span>
                使用した問題:{' '}
                {problems
                  .filter((p) => p.source.licenseKey === l.key)
                  .map((p) => p.id)
                  .join(', ')}
              </span>
            </p>
            <pre class="license-text">{l.text}</pre>
          </section>
        )}
      </For>
    </main>
  );
}
