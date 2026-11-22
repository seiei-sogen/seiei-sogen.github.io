import { createMemo } from 'solid-js';
import { Quaternion, Vector3 } from 'three';
import { fromAxisAngle, rotate, toXYZW, type Quat, type Vec3 } from '../lib/quat';
import {
  Aircraft,
  COLOR,
  FatLine,
  NOSE,
  RIGHT_WING_TIP,
  SceneCanvas,
  T,
  WorldAxes,
  xyz,
} from './common';

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

export default function AxisAngleScene(props: Props) {
  const tipQuaternion = createMemo(() =>
    new Quaternion().setFromUnitVectors(UP, new Vector3(...props.axis))
  );
  const end = (): Vec3 => [
    props.axis[0] * AXIS_LENGTH,
    props.axis[1] * AXIS_LENGTH,
    props.axis[2] * AXIS_LENGTH,
  ];
  const start = (): Vec3 => [-end()[0], -end()[1], -end()[2]];

  return (
    <SceneCanvas camera={[2.9, 2.1, 3.9]}>
      <WorldAxes />
      <Aircraft ghost />

      {/* 回転軸 n */}
      <FatLine points={[start(), end()]} color={COLOR.w} width={3} />
      <T.Mesh position={xyz(end())} quaternion={tipQuaternion()}>
        <T.ConeGeometry args={[0.09, 0.26, 16]} />
        <T.MeshBasicMaterial color={COLOR.w} />
      </T.Mesh>

      {/* 機首と右翼端が通った道。どちらも軸を中心とする円弧になる */}
      <FatLine
        points={trail(NOSE, props.axis, props.angle)}
        color={COLOR.hull}
        width={1.5}
        opacity={0.8}
      />
      <FatLine
        points={trail(RIGHT_WING_TIP, props.axis, props.angle)}
        color={COLOR.y}
        width={1.5}
        opacity={0.8}
      />

      <T.Group quaternion={toXYZW(props.q)}>
        <Aircraft />
      </T.Group>
    </SceneCanvas>
  );
}
