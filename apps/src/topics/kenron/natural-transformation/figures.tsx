import { For, type JSX } from 'solid-js';
import type { BeadColor, Frame } from './beads';

// 説明用の静的な図。3Dを使わないので、プリレンダーされた HTML にそのまま入る。

const NAME: Record<BeadColor, string> = { r: '赤', b: '青', y: '黄' };

/** ビーズの列（box なら箱）。colors は 'rby' のように色の頭文字を並べる */
export function Beads(props: { colors: string; box?: boolean }) {
  const colors = () => [...props.colors] as BeadColor[];
  const label = () => {
    const names = colors()
      .map((c) => NAME[c])
      .join('・');
    if (props.box) return names ? `${names}が入った箱` : '空っぽの箱';
    return names ? `${names}の列` : '空っぽの列';
  };
  return (
    <span class={props.box ? 'beads beads-box' : 'beads'} role="img" aria-label={label()}>
      <For each={colors()}>{(c) => <span class={`bead bead-${c}`} />}</For>
    </span>
  );
}

export function FrameBeads(props: { frame: Frame }) {
  return (
    <Beads
      colors={props.frame.beads.map((b) => b.color).join('')}
      box={props.frame.kind === 'box'}
    />
  );
}

/** 「入れ物 —操作→ 入れ物」の1行 */
export function Flow(props: { from: JSX.Element; op: string; to: JSX.Element }) {
  return (
    <div class="flow">
      {props.from}
      <span class="flow-op">
        {props.op}
        <span aria-hidden="true"> →</span>
      </span>
      {props.to}
    </div>
  );
}

/**
 * 自然性の四角。下が F、上が G、上向きの矢印が自然変換の成分。
 * 3Dのシーン（下の階が F、上の階が G）と同じ向きにそろえている
 */
export function SquareFigure() {
  return (
    <svg
      viewBox="0 0 480 330"
      role="img"
      aria-label="自然性の四角。F(A) から G(B) へ、F(f) のあと α_B を通る道と、α_A のあと G(f) を通る道が同じになる"
    >
      <defs>
        <marker
          id="nt-head-a"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M0 0 L10 5 L0 10 z" class="m-a" />
        </marker>
        <marker
          id="nt-head-b"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M0 0 L10 5 L0 10 z" class="m-b" />
        </marker>
      </defs>
      {/* ピンク: F(f) → α_B */}
      <line x1="150" y1="262" x2="330" y2="262" class="s-a" marker-end="url(#nt-head-a)" />
      <line x1="400" y1="232" x2="400" y2="102" class="s-a" marker-end="url(#nt-head-a)" />
      {/* 水色: α_A → G(f) */}
      <line x1="80" y1="232" x2="80" y2="102" class="s-b" marker-end="url(#nt-head-b)" />
      <line x1="150" y1="70" x2="330" y2="70" class="s-b" marker-end="url(#nt-head-b)" />

      <text x="80" y="272" class="t-obj">
        F(A)
      </text>
      <text x="400" y="272" class="t-obj">
        F(B)
      </text>
      <text x="80" y="80" class="t-obj">
        G(A)
      </text>
      <text x="400" y="80" class="t-obj">
        G(B)
      </text>

      <text x="240" y="305" class="t-arrow t-a" text-anchor="middle">
        F(f)
      </text>
      <text x="240" y="45" class="t-arrow t-b" text-anchor="middle">
        G(f)
      </text>
      <text x="62" y="175" class="t-arrow t-b" text-anchor="end">
        α
        <tspan class="t-sub" dy="6">
          A
        </tspan>
      </text>
      <text x="418" y="175" class="t-arrow t-a" text-anchor="start">
        α
        <tspan class="t-sub" dy="6">
          B
        </tspan>
      </text>
    </svg>
  );
}
