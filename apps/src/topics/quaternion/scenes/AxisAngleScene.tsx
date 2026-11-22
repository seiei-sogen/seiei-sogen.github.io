import { useMemo } from 'react';
import { Line } from '@react-three/drei';
import { Quaternion, Vector3 } from 'three';
import { fromAxisAngle, rotate, toXYZW, type Quat, type Vec3 } from '../lib/quat';
import { Aircraft, COLOR, NOSE, RIGHT_WING_TIP, SceneCanvas, WorldAxes } from './common';

type Props = {
  axis: Vec3;
  /** ラジアン */
  angle: number;
  q: Quat;
};

const UP = new Vector3(0, 1, 0);
const AXIS_LENGTH = 2.1;

/** 点 p が軸のまわりを 0→angle まで回るときの軌跡 */
function trail(p: Vec3, axis: Vec3, angle: number): Vec3[] {
  const steps = Math.max(2, Math.ceil(Math.abs(angle) / 0.06));
  return Array.from({ length: steps + 1 }, (_, i) =>
    rotate(fromAxisAngle(axis, (angle * i) / steps), p)
  );
}

export default function AxisAngleScene({ axis, angle, q }: Props) {
  const tipQuaternion = useMemo(
    () => new Quaternion().setFromUnitVectors(UP, new Vector3(...axis)),
    [axis]
  );
  const end: Vec3 = [axis[0] * AXIS_LENGTH, axis[1] * AXIS_LENGTH, axis[2] * AXIS_LENGTH];
  const start: Vec3 = [-end[0], -end[1], -end[2]];
  const noseTrail = useMemo(() => trail(NOSE, axis, angle), [axis, angle]);
  const wingTrail = useMemo(() => trail(RIGHT_WING_TIP, axis, angle), [axis, angle]);

  return (
    <SceneCanvas camera={[2.9, 2.1, 3.9]}>
      <WorldAxes />
      <Aircraft ghost />

      {/* 回転軸 n */}
      <Line points={[start, end]} color={COLOR.w} lineWidth={3} />
      <mesh position={end} quaternion={tipQuaternion}>
        <coneGeometry args={[0.09, 0.26, 16]} />
        <meshBasicMaterial color={COLOR.w} />
      </mesh>

      {/* 機首と右翼端が通った道。どちらも軸を中心とする円弧になる */}
      <Line points={noseTrail} color={COLOR.hull} lineWidth={1.5} transparent opacity={0.8} />
      <Line points={wingTrail} color={COLOR.y} lineWidth={1.5} transparent opacity={0.8} />

      <group quaternion={toXYZW(q)}>
        <Aircraft />
      </group>
    </SceneCanvas>
  );
}
