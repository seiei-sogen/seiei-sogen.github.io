import { useMemo } from 'react';
import { Line } from '@react-three/drei';
import { mul, neg, type Quat, type Vec3 } from '../lib/quat';
import { projectS3, splitRuns } from '../lib/stereo';
import { COLOR, Label, SceneCanvas } from './common';

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
  { key: '1i', color: COLOR.x, width: 2.75, points: greatCircle(ONE, I) },
  { key: '1j', color: COLOR.y, width: 2.75, points: greatCircle(ONE, J) },
  { key: '1k', color: COLOR.z, width: 2.75, points: greatCircle(ONE, K) },
  { key: 'jk', color: COLOR.x, width: 1.5, points: greatCircle(J, K) },
  { key: 'ki', color: COLOR.y, width: 1.5, points: greatCircle(K, I) },
  { key: 'ij', color: COLOR.z, width: 1.5, points: greatCircle(I, J) },
];

const LANDMARKS = [
  { key: '1', label: '1', color: '#ffffff', p: ONE, size: 0.09 },
  { key: '-1', label: '−1', color: '#ffffff', p: neg(ONE), size: 0.06 },
  { key: 'i', label: 'i', color: COLOR.x, p: I, size: 0.07 },
  { key: 'j', label: 'j', color: COLOR.y, p: J, size: 0.07 },
  { key: 'k', label: 'k', color: COLOR.z, p: K, size: 0.07 },
];

export default function HypersphereScene({ q }: Props) {
  const drawn = useMemo(
    () =>
      CURVES.map((c) => {
        const images = c.points.map((p) => projectS3(mul(q, p)));
        return {
          ...c,
          runs: splitRuns(images),
          ticks: images.filter((v, n): v is Vec3 => v !== null && n % TICK_EVERY === 0 && n < N),
        };
      }),
    [q]
  );
  const landmarks = LANDMARKS.map((m) => ({ ...m, at: projectS3(mul(q, m.p)) }));

  return (
    <SceneCanvas camera={[4.2, 3.0, 5.8]}>
      {/* w = 0 の点が写る場所。動かない目印 */}
      <mesh>
        <sphereGeometry args={[1, 24, 16]} />
        <meshBasicMaterial color={COLOR.faint} wireframe transparent opacity={0.14} />
      </mesh>

      {drawn.map((c) => (
        <group key={c.key}>
          {c.runs.map((run, i) => (
            <Line key={i} points={run} color={c.color} lineWidth={c.width} />
          ))}
          {c.ticks.map((v, i) => (
            <mesh key={i} position={v}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshBasicMaterial color={c.color} />
            </mesh>
          ))}
        </group>
      ))}

      {landmarks.map(
        (m) =>
          m.at && (
            <group key={m.key}>
              <mesh position={m.at}>
                <sphereGeometry args={[m.size, 16, 16]} />
                <meshBasicMaterial color={m.color} />
              </mesh>
              <Label text={m.label} position={m.at} math />
            </group>
          )
      )}
    </SceneCanvas>
  );
}
