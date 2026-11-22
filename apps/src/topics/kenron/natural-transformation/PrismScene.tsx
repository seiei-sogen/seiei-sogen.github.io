import { For, Show, createMemo } from 'solid-js';
import type { Vec3 } from '../../quaternion/lib/quat';
import { Label, SceneCanvas, T, xyz } from '../../quaternion/scenes/common';
import { Arrow, PAINT, lerp3, walk } from './parts';

type Props = {
  /** 光らせる壁（WALLS の何番目か） */
  wall: number;
  /** 0→1。2つの点が壁のまわりを進んだ割合 */
  t: number;
};

// 点 A・B・C と矢印 f・g・g∘f を、F で下の階に、G で上の階に写す。
// 各点から上の階へ立てる柱 α_A・α_B・α_C が自然変換
const Y0 = -0.9;
const H = 1.9;
const SPOT = { A: [-1.8, 0.9], B: [1.8, 0.9], C: [0, -1.3] } as const;
type Spot = keyof typeof SPOT;
const SPOTS: readonly Spot[] = ['A', 'B', 'C'];
const atF = (s: Spot): Vec3 => [SPOT[s][0], Y0, SPOT[s][1]];
const atG = (s: Spot): Vec3 => [SPOT[s][0], Y0 + H, SPOT[s][1]];
const mid = (a: Vec3, b: Vec3) => lerp3(a, b, 0.5);

/** NaturalTransformation.tsx の壁ボタンと同じ順 */
const WALLS = [
  { name: 'f', from: 'A', to: 'B' },
  { name: 'g', from: 'B', to: 'C' },
  { name: 'g∘f', from: 'A', to: 'C' },
] as const;

export default function PrismScene(props: Props) {
  const wall = () => WALLS[props.wall] ?? WALLS[0];

  // 光らせる壁の辺: ピンクは「F の矢印 → 柱」、水色は「柱 → G の矢印」
  const floorColor = (floor: 'F' | 'G', i: number) =>
    i !== props.wall ? PAINT.edge : floor === 'F' ? PAINT.a : PAINT.b;
  const pillarColor = (s: Spot) =>
    s === wall().to ? PAINT.a : s === wall().from ? PAINT.b : PAINT.alpha;

  const dots = createMemo(() => {
    const { second, move } = walk(props.t);
    const { from, to } = wall();
    return {
      pink: second ? lerp3(atF(to), atG(to), move) : lerp3(atF(from), atF(to), move),
      cyan: second ? lerp3(atG(from), atG(to), move) : lerp3(atF(from), atG(from), move),
    };
  });

  return (
    <SceneCanvas camera={[4.2, 2.8, 6.4]}>
      {/* 下の階（F）と上の階（G）の床 */}
      <T.Mesh position={[0, Y0 - 0.03, -0.2]}>
        <T.BoxGeometry args={[5, 0.02, 3.6]} />
        <T.MeshBasicMaterial color="#26315a" transparent opacity={0.7} depthWrite={false} />
      </T.Mesh>
      <T.Mesh position={[0, Y0 + H - 0.03, -0.2]}>
        <T.BoxGeometry args={[5, 0.02, 3.6]} />
        <T.MeshBasicMaterial color="#26315a" transparent opacity={0.22} depthWrite={false} />
      </T.Mesh>
      <Label text="F で写した絵" position={[-2.5, Y0, -1.9]} size={0.28} />
      <Label text="G で写した絵" position={[-2.5, Y0 + H, -1.9]} size={0.28} />

      {/* 壁。光らせる壁だけ濃くする */}
      <For each={WALLS}>
        {(w, i) => {
          const a = atF(w.from);
          const b = atF(w.to);
          const dx = b[0] - a[0];
          const dz = b[2] - a[2];
          return (
            <T.Mesh
              position={[(a[0] + b[0]) / 2, Y0 + H / 2, (a[2] + b[2]) / 2]}
              rotation={[0, Math.atan2(-dz, dx), 0]}
            >
              <T.BoxGeometry args={[Math.hypot(dx, dz), H, 0.004]} />
              <T.MeshBasicMaterial
                color="#ffffff"
                transparent
                opacity={i() === props.wall ? 0.13 : 0.025}
                depthWrite={false}
              />
            </T.Mesh>
          );
        }}
      </For>

      {/* 2つの階の矢印 F(f)・G(f) など */}
      <For each={WALLS}>
        {(w, i) => (
          <>
            <Arrow from={atF(w.from)} to={atF(w.to)} color={floorColor('F', i())} trim={0.2} />
            <Arrow from={atG(w.from)} to={atG(w.to)} color={floorColor('G', i())} trim={0.2} />
          </>
        )}
      </For>
      <Show when={wall()} keyed>
        {(w) => (
          <>
            <Label
              text={`F(${w.name})`}
              position={mid(atF(w.from), atF(w.to))}
              color={PAINT.a}
              math
              size={0.3}
            />
            <Label
              text={`G(${w.name})`}
              position={mid(atG(w.from), atG(w.to))}
              color={PAINT.b}
              math
              size={0.3}
            />
          </>
        )}
      </Show>

      {/* 点と柱 */}
      <For each={SPOTS}>
        {(s) => (
          <>
            <T.Mesh position={xyz(atF(s))}>
              <T.SphereGeometry args={[0.09, 20, 14]} />
              <T.MeshStandardMaterial color="#e8ecf5" />
            </T.Mesh>
            <T.Mesh position={xyz(atG(s))}>
              <T.SphereGeometry args={[0.09, 20, 14]} />
              <T.MeshStandardMaterial color="#e8ecf5" />
            </T.Mesh>
            <Label text={`F(${s})`} position={atF(s)} math size={0.3} />
            <Label text={`G(${s})`} position={atG(s)} math size={0.3} />
            <Arrow from={atF(s)} to={atG(s)} color={pillarColor(s)} trim={0.16} width={4} />
            <Label
              text={`α_${s}`}
              position={mid(atF(s), atG(s))}
              color={PAINT.alpha}
              math
              size={0.28}
            />
          </>
        )}
      </For>

      {/* 2つの道を進む点。着いたら1つの緑の点にする */}
      <Show
        when={props.t < 1}
        fallback={
          <T.Mesh position={xyz(atG(wall().to))}>
            <T.SphereGeometry args={[0.18, 24, 16]} />
            <T.MeshBasicMaterial color={PAINT.ok} />
          </T.Mesh>
        }
      >
        <T.Mesh position={xyz(dots().pink)}>
          <T.SphereGeometry args={[0.14, 24, 16]} />
          <T.MeshBasicMaterial color={PAINT.a} />
        </T.Mesh>
        <T.Mesh position={xyz(dots().cyan)}>
          <T.SphereGeometry args={[0.12, 24, 16]} />
          <T.MeshBasicMaterial color={PAINT.b} />
        </T.Mesh>
      </Show>
    </SceneCanvas>
  );
}
