import type { ReactNode } from 'react';

/** 「やってみよう」: 3Dを実際に触って確かめる手順。子は <li> */
export function TryIt({ children }: { children: ReactNode }) {
  return (
    <section className="tryit">
      <h3>やってみよう</h3>
      <ol>{children}</ol>
    </section>
  );
}

/** 式や用語は折りたたんでおく。読まなくても先へ進める */
export function Deeper({
  title = '式で見たい人へ',
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <details className="deeper">
      <summary>{title}</summary>
      <div className="deeper-body">{children}</div>
    </details>
  );
}

/** 説明用の図と、その説明文 */
export function Fig({ caption, children }: { caption: ReactNode; children: ReactNode }) {
  return (
    <figure className="fig">
      {children}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
