import { For } from 'solid-js';

/** `バッククォート` で囲んだ部分だけをインラインコードにする。HTML は解釈しない */
export function Inline(props: { text: string }) {
  const parts = () => props.text.split(/(`[^`]+`)/g).filter(Boolean);
  return (
    <For each={parts()}>
      {(part) =>
        part.startsWith('`') && part.endsWith('`') && part.length > 1 ? (
          <code class="inline-code">{part.slice(1, -1)}</code>
        ) : (
          part
        )
      }
    </For>
  );
}
