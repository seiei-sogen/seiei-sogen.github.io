// ビーズの入れ物と、その「塗りかえ」「取りかえ」。three.js に依存しないので、プリレンダー時にも読み込める。

export type BeadColor = 'r' | 'b' | 'y';
export type Bead = { readonly id: number; readonly color: BeadColor };
/** 入れ物とその中身。list = 何個でも並ぶ列、box = 0 個か 1 個しか入らない箱 */
export type Frame = { readonly kind: 'list' | 'box'; readonly beads: readonly Bead[] };
/** はじめ → 1つ目の操作のあと → 2つ目の操作のあと */
export type Path = readonly [Frame, Frame, Frame];

/** 中身（色）だけを変える操作。圏論でいう「矢印 f」 */
export type Recolor = {
  readonly label: string;
  readonly short: string;
  readonly map: Readonly<Record<BeadColor, BeadColor>>;
};

/** 入れ物を取りかえる操作。自然変換の候補 */
export type Swap = {
  readonly label: string;
  readonly short: string;
  readonly run: (beads: readonly Bead[]) => Frame;
};

export const RECOLORS: readonly Recolor[] = [
  { label: '赤→青→黄→赤 と回す', short: '回す', map: { r: 'b', b: 'y', y: 'r' } },
  { label: '全部を黄色に', short: '全部黄', map: { r: 'y', b: 'y', y: 'y' } },
  { label: '青だけ黄色に', short: '青→黄', map: { r: 'r', b: 'y', y: 'y' } },
];

export const SWAPS: readonly Swap[] = [
  {
    label: '先頭の1個だけ箱に入れる',
    short: '先頭だけ',
    run: (beads) => ({ kind: 'box', beads: beads.slice(0, 1) }),
  },
  {
    label: '逆さに並べる',
    short: '逆さ',
    run: (beads) => ({ kind: 'list', beads: [...beads].reverse() }),
  },
  {
    label: '赤だけ残す',
    short: '赤だけ',
    run: (beads) => ({ kind: 'list', beads: beads.filter((b) => b.color === 'r') }),
  },
];

const listOf = (colors: readonly BeadColor[]): Frame => ({
  kind: 'list',
  beads: colors.map((color, id) => ({ id, color })),
});

export const INITIAL = listOf(['r', 'b', 'y', 'r']);

const ALL_COLORS = ['r', 'b', 'y'] as const;

/** 3〜5個のビーズをでたらめに並べる。比べがいがあるように、赤を1個以上・色を2種類以上にする */
export function randomList(): Frame {
  for (;;) {
    const colors = Array.from(
      { length: 3 + Math.floor(Math.random() * 3) },
      () => ALL_COLORS[Math.floor(Math.random() * 3)]!
    );
    if (colors.includes('r') && new Set(colors).size > 1) return listOf(colors);
  }
}

const recolor = (frame: Frame, rule: Recolor): Frame => ({
  kind: frame.kind,
  beads: frame.beads.map((b) => ({ id: b.id, color: rule.map[b.color] })),
});

/** 見た目（入れ物の形と色の並び）が同じか。どのビーズが来たか（id）は問わない */
const sameLook = (a: Frame, b: Frame) =>
  a.kind === b.kind &&
  a.beads.length === b.beads.length &&
  a.beads.every((bead, i) => bead.color === b.beads[i]?.color);

/** 2つの道。colorFirst = 先に塗りかえる道、swapFirst = 先に取りかえる道 */
export function runPaths(start: Frame, rule: Recolor, swap: Swap) {
  const painted = recolor(start, rule);
  const swapped = swap.run(start.beads);
  const colorFirst: Path = [start, painted, swap.run(painted.beads)];
  const swapFirst: Path = [start, swapped, recolor(swapped, rule)];
  return { colorFirst, swapFirst, same: sameLook(colorFirst[2], swapFirst[2]) };
}

// ページの説明文が前提にしている結果を、ビルド（プリレンダー）時に確かめる。
// 「先頭だけ」「逆さ」はどの塗りかえとも順番を入れかえられ、「赤だけ」は「回す」「全部黄」とぶつかる
const clashes = SWAPS.flatMap((s) =>
  RECOLORS.filter((r) => !runPaths(INITIAL, r, s).same).map((r) => `${s.short}/${r.short}`)
).join();
if (clashes !== '赤だけ/回す,赤だけ/全部黄')
  throw new Error(`自然性の表が想定とちがう: ${clashes}`);
