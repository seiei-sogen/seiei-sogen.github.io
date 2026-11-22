import { For, Index, Show, createMemo, onCleanup } from 'solid-js';
import { MeshBasicMaterial, SphereGeometry } from 'three';
import { mul, neg, type Quat, type Vec3 } from '../lib/quat';
import { projectS3, splitRuns } from '../lib/stereo';
import { COLOR, FatLine, Label, SceneCanvas, T, xyz } from './common';

type Props = {
  /** すべての点に左から掛ける四元数 */
  q: Quat;
};

const ONE: Quat = { w: 1, x: 0, y: 0, z: 0 };
const I: Quat = { w: 0, x: 1, y: 0, z: 0 };
const J: Quat = { w: 0, x: 0, y: 1, z: 0 };
const K: Quat = { w: 0, x: 0, y: 0, z: 1 };

const N = 360;
const TICK_EVERY = 30;

/** a と b を通る、4次元の球の上の大きな輪 */
const greatCircle = (a: Quat, b: Quat): Quat[] =>
  Array.from({ length: N + 1 }, (_, n) => {
    const t = (2 * Math.PI * n) / N;
    const c = Math.cos(t);
    const s = Math.sin(t);
    return {
      w: a.w * c + b.w * s,
      x: a.x * c + b.x * s,
      y: a.y * c + b.y * s,
      z: a.z * c + b.z * s,
    };
  });

// 1 と −1 を通る輪は、写すと直線になる（−1 が無限の遠くにあるから）。
// w = 0 の輪は、写すと単位球の表面の輪になる。色は「取り巻いている軸」の色。
const CURVES = [
  { color: COLOR.x, width: 2.75, points: greatCircle(ONE, I) },
  { color: COLOR.y, width: 2.75, points: greatCircle(ONE, J) },
  { color: COLOR.z, width: 2.75, points: greatCircle(ONE, K) },
  { color: COLOR.x, width: 1.5, points: greatCircle(J, K) },
  { color: COLOR.y, width: 1.5, points: greatCircle(K, I) },
  { color: COLOR.z, width: 1.5, points: greatCircle(I, J) },
];

const LANDMARKS = [
  { label: '1', color: '#ffffff', p: ONE, size: 0.09 },
  { label: '−1', color: '#ffffff', p: neg(ONE), size: 0.06 },
  { label: 'i', color: COLOR.x, p: I, size: 0.07 },
  { label: 'j', color: COLOR.y, p: J, size: 0.07 },
  { label: 'k', color: COLOR.z, p: K, size: 0.07 },
];

export default function HypersphereScene(props: Props) {
  // 目盛りの小さな玉は数が多いので、形を1つだけ作って使い回す
  const tickGeometry = new SphereGeometry(0.035, 8, 8);
  onCleanup(() => tickGeometry.dispose());

  return (
    <SceneCanvas camera={[4.2, 3.0, 5.8]}>
      {/* w = 0 の点が写る場所。動かない目印 */}
      <T.Mesh>
        <T.SphereGeometry args={[1, 24, 16]} />
        <T.MeshBasicMaterial color={COLOR.faint} wireframe transparent opacity={0.14} />
      </T.Mesh>

      <For each={CURVES}>
        {(curve) => {
          const images = createMemo(() => curve.points.map((p) => projectS3(mul(props.q, p))));
          const runs = createMemo(() => splitRuns(images()));
          const ticks = createMemo(() =>
            images().filter((v, n): v is Vec3 => v !== null && n % TICK_EVERY === 0 && n < N)
          );
          const tickMaterial = new MeshBasicMaterial({ color: curve.color });
          onCleanup(() => tickMaterial.dispose());
          return (
            <>
              <Index each={runs()}>
                {(run) => <FatLine points={run()} color={curve.color} width={curve.width} />}
              </Index>
              <Index each={ticks()}>
                {(v) => (
                  <T.Mesh geometry={tickGeometry} material={tickMaterial} position={xyz(v())} />
                )}
              </Index>
            </>
          );
        }}
      </For>

      <For each={LANDMARKS}>
        {(mark) => {
          const at = createMemo(() => projectS3(mul(props.q, mark.p)));
          return (
            <Show when={at()}>
              {(v) => (
                <>
                  <T.Mesh position={xyz(v())}>
                    <T.SphereGeometry args={[mark.size, 16, 16]} />
                    <T.MeshBasicMaterial color={mark.color} />
                  </T.Mesh>
                  <Label text={mark.label} position={v()} math />
                </>
              )}
            </Show>
          );
        }}
      </For>
    </SceneCanvas>
  );
}
