import { useMemo } from 'react';
import { Line } from '@react-three/drei';
import { rotate, toXYZW, type Quat, type Vec3 } from '../lib/quat';
import { Aircraft, COLOR, NOSE, SceneCanvas, WorldAxes } from './common';

type Props = {
  /** いまの姿勢 */
  slerpNow: Quat;
  eulerNow: Quat;
  /** t を 0→1 まで動かしたときの姿勢の列（軌跡を描くのに使う） */
  slerpPath: readonly Quat[];
  eulerPath: readonly Quat[];
};

const SLERP_COLOR = COLOR.w;
const EULER_COLOR = '#ff7ad9';

const SCALE = 1.9;
const AIRCRAFT_SCALE = 0.5;

/** 小さな機体と、その機首が球面のどこを指しているかを示す線 */
function Pointer({ q, color }: { q: Quat; color: string }) {
  return (
    <group quaternion={toXYZW(q)}>
      <group scale={AIRCRAFT_SCALE}>
        <Aircraft tint={color} />
      </group>
      <Line points={[[NOSE[0] * AIRCRAFT_SCALE, 0, 0], NOSE]} color={color} lineWidth={1.5} />
      <mesh position={NOSE}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

export default function InterpScene({ slerpNow, eulerNow, slerpPath, eulerPath }: Props) {
  // 機首の先端が単位球の上に描く道
  const slerpTrail = useMemo(() => slerpPath.map((q) => rotate(q, NOSE)), [slerpPath]);
  const eulerTrail = useMemo(() => eulerPath.map((q) => rotate(q, NOSE)), [eulerPath]);
  const from = slerpTrail[0] as Vec3;
  const to = slerpTrail[slerpTrail.length - 1] as Vec3;

  return (
    <SceneCanvas camera={[3.4, 2.6, 4.4]}>
      <WorldAxes size={1.9} />
      <group scale={SCALE}>
        <mesh>
          <sphereGeometry args={[NOSE[0], 24, 16]} />
          <meshBasicMaterial color={COLOR.faint} wireframe transparent opacity={0.16} />
        </mesh>

        <Line points={eulerTrail} color={EULER_COLOR} lineWidth={2.5} />
        <Line points={slerpTrail} color={SLERP_COLOR} lineWidth={2.5} />
        {[from, to].map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshBasicMaterial color={COLOR.hull} />
          </mesh>
        ))}

        <Pointer q={eulerNow} color={EULER_COLOR} />
        <Pointer q={slerpNow} color={SLERP_COLOR} />
      </group>
    </SceneCanvas>
  );
}
