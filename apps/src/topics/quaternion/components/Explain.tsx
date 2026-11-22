import type { JSX } from 'solid-js';

/** 「やってみよう」: 3Dを実際に触って確かめる手順。子は <li> */
export function TryIt(props: { children: JSX.Element }) {
  return (
    <section class="tryit">
      <h3>やってみよう</h3>
      <ol>{props.children}</ol>
    </section>
  );
}

/** 式や用語は折りたたんでおく。読まなくても先へ進める */
export function Deeper(props: { title?: string; children: JSX.Element }) {
  return (
    <details class="deeper">
      <summary>{props.title ?? '式で見たい人へ'}</summary>
      <div class="deeper-body">{props.children}</div>
    </details>
  );
}

/** 説明用の図と、その説明文 */
export function Fig(props: { caption: JSX.Element; children: JSX.Element }) {
  return (
    <figure class="fig">
      {props.children}
      <figcaption>{props.caption}</figcaption>
    </figure>
  );
}
