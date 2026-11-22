import { For, Show, createMemo } from 'solid-js';
import { Color } from 'three';
import type { Vec3 } from '../../quaternion/lib/quat';
import { Label, SceneCanvas, T, xyz } from '../../quaternion/scenes/common';
import type { BeadColor, Frame, Path } from './beads';
import { Arrow, PAINT, lerp, lerp3, walk } from './parts';

type Props = {
  colorFirst: Path;
  swapFirst: Path;
  same: boolean;
  /** 0→1。2つの列が道を進んだ割合 */
  t: number;
};

const BEAD: Record<BeadColor, string> = { r: '#ff6b6b', b: '#6aa5ff', y: '#f5c451' };

// 正方形の左手前がスタート、右奥がゴール。
// ピンクの道は「手前を右へ → 右を奥へ」、水色の道は「左を奥へ → 奥を右へ」。
// 2つの列が重ならないように、ピンクは少し手前、水色は少し奥を通す
const X = 1.9;
const Z = 1.2;
const OFF = 0.42;
const PINK: readonly [Vec3, Vec3, Vec3] = [
  [-X, 0, Z + OFF],
  [X, 0, Z + OFF],
  [X, 0, -Z + OFF],
];
const CYAN: readonly [Vec3, Vec3, Vec3] = [
  [-X, 0, Z - OFF],
  [-X, 0, -Z - OFF],
  [X, 0, -Z - OFF],
];

const PITCH = 0.32;
const RADIUS = 0.12;
const TRAY = 0.06;
const BOX = 0.46;

/** 入れ物の大きさ。列は横長の台、箱は立方体 */
function shell(f: Frame) {
  return f.kind === 'list'
    ? { size: [Math.max(f.beads.length, 1) * PITCH + 0.1, TRAY, 0.4] as Vec3, opacity: 0.9 }
    : { size: [BOX, BOX, BOX] as Vec3, opacity: 0.2 };
}

/** i 番目のビーズの置き場所（入れ物の中心から見た位置） */
function slot(f: Frame, i: number): Vec3 {
  return f.kind === 'list'
    ? [(i - (f.beads.length - 1) / 2) * PITCH, TRAY + RADIUS, 0]
    : [0, BOX / 2, 0];
}

type Step = { from: Frame; to: Frame; morph: number };

function Traveler(props: {
  path: Path;
  corners: readonly [Vec3, Vec3, Vec3];
  t: number;
  tint: string;
}) {
  const step = createMemo(() => {
    const { second, move, morph } = walk(props.t);
    const [p0, p1, p2] = props.path;
    const [c0, c1, c2] = props.corners;
    return {
      at: second ? lerp3(c1, c2, move) : lerp3(c0, c1, move),
      from: second ? p1 : p0,
      to: second ? p2 : p1,
      morph,
    };
  });
  const box = createMemo(() => {
    const a = shell(step().from);
    const b = shell(step().to);
    const size = lerp3(a.size, b.size, step().morph);
    return { size, opacity: lerp(a.opacity, b.opacity, step().morph) };
  });
  const ids = createMemo(() => props.path[0].beads.map((b) => b.id));

  return (
    <T.Group position={xyz(step().at)}>
      <T.Mesh position={[0, box().size[1] / 2, 0]} scale={xyz(box().size)}>
        <T.BoxGeometry args={[1, 1, 1]} />
        <T.MeshStandardMaterial
          color={props.tint}
          transparent
          opacity={box().opacity}
          roughness={0.8}
        />
      </T.Mesh>
      <For each={ids()}>{(id) => <Bead id={id} step={step()} />}</For>
    </T.Group>
  );
}

function Bead(props: { id: number; step: Step }) {
  const state = createMemo(() => {
    const { from, to, morph } = props.step;
    const ia = from.beads.findIndex((b) => b.id === props.id);
    if (ia < 0) return undefined;
    const pa = slot(from, ia);
    const ca = BEAD[from.beads[ia]!.color];
    const ib = to.beads.findIndex((b) => b.id === props.id);
    // 取りかえで捨てられるビーズは、その場で小さくなって消える
    if (ib < 0) return { at: pa, scale: Math.max(1e-3, 1 - morph), color: ca };
    const pb = slot(to, ib);
    // 並べかえで左へ動くビーズは、右へ動くビーズの上を跳び越える
    const hop = pb[0] < pa[0] ? Math.sin(Math.PI * morph) * 0.32 : 0;
    const at = lerp3(pa, pb, morph);
    const color = new Color(ca).lerp(new Color(BEAD[to.beads[ib]!.color]), morph);
    return { at: [at[0], at[1] + hop, at[2]] as Vec3, scale: 1, color: `#${color.getHexString()}` };
  });
  return (
    <Show when={state()}>
      {(s) => (
        <T.Mesh position={xyz(s().at)} scale={[s().scale, s().scale, s().scale]}>
          <T.SphereGeometry args={[RADIUS, 24, 16]} />
          <T.MeshStandardMaterial color={s().color} roughness={0.4} />
        </T.Mesh>
      )}
    </Show>
  );
}

function Road(props: {
  from: Vec3;
  to: Vec3;
  color: string;
  trim: number;
  text: string;
  at: Vec3;
}) {
  return (
    <>
      <Arrow from={props.from} to={props.to} color={props.color} trim={props.trim} width={4} />
      <Label text={props.text} position={props.at} color={props.color} size={0.3} />
    </>
  );
}

export default function SquareScene(props: Props) {
  // 文字が変わったときだけラベルを作り直す（毎フレーム作らない）
  const goal = () => (props.t < 1 ? 'ゴール' : props.same ? '同じになった！' : 'ちがう結果！');
  const goalColor = (text: string) =>
    text === 'ゴール' ? PAINT.edge : props.same ? PAINT.ok : PAINT.ng;
  return (
    <SceneCanvas camera={[0.8, 4.6, 5.6]}>
      <T.Mesh position={[0, -0.03, 0]}>
        <T.BoxGeometry args={[2 * X + 2, 0.04, 2 * Z + 1.9]} />
        <T.MeshStandardMaterial color="#202b4d" roughness={1} />
      </T.Mesh>

      <Road
        from={PINK[0]}
        to={PINK[1]}
        color={PAINT.a}
        trim={1}
        text="① 塗りかえ"
        at={[-0.55, 0, Z + OFF + 0.05]}
      />
      <Road
        from={PINK[1]}
        to={PINK[2]}
        color={PAINT.a}
        trim={0.4}
        text="② 取りかえ"
        at={[X + 0.05, 0, OFF]}
      />
      <Road
        from={CYAN[0]}
        to={CYAN[1]}
        color={PAINT.b}
        trim={0.4}
        text="① 取りかえ"
        at={[-X + 0.05, 0, -OFF]}
      />
      <Road
        from={CYAN[1]}
        to={CYAN[2]}
        color={PAINT.b}
        trim={1}
        text="② 塗りかえ"
        at={[-0.55, 0, -Z - OFF - 0.05]}
      />

      <Label text="スタート" position={[-X - 0.6, 0.75, Z]} size={0.32} />
      <Show when={goal()} keyed>
        {(text) => (
          <Label text={text} position={[X - 0.6, 0.85, -Z]} color={goalColor(text)} size={0.36} />
        )}
      </Show>

      <Traveler path={props.colorFirst} corners={PINK} t={props.t} tint={PAINT.a} />
      <Traveler path={props.swapFirst} corners={CYAN} t={props.t} tint={PAINT.b} />
    </SceneCanvas>
  );
}
