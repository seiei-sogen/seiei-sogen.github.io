import { For } from 'solid-js';
import { rotate, toXYZW, type Quat, type Vec3 } from '../lib/quat';
import { Aircraft, COLOR, FatLine, NOSE, SceneCanvas, T, WorldAxes, xyz } from './common';

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
function Pointer(props: { q: Quat; color: string }) {
  return (
    <T.Group quaternion={toXYZW(props.q)}>
      <T.Group scale={[AIRCRAFT_SCALE, AIRCRAFT_SCALE, AIRCRAFT_SCALE]}>
        <Aircraft tint={props.color} />
      </T.Group>
      <FatLine points={[[NOSE[0] * AIRCRAFT_SCALE, 0, 0], NOSE]} color={props.color} width={1.5} />
      <T.Mesh position={xyz(NOSE)}>
        <T.SphereGeometry args={[0.04, 12, 12]} />
        <T.MeshBasicMaterial color={props.color} />
      </T.Mesh>
    </T.Group>
  );
}

export default function InterpScene(props: Props) {
  // 機首の先端が単位球の上に描く道
  const slerpTrail = () => props.slerpPath.map((q) => rotate(q, NOSE));
  const eulerTrail = () => props.eulerPath.map((q) => rotate(q, NOSE));
  const ends = (): Vec3[] => {
    const trail = slerpTrail();
    return [trail[0] as Vec3, trail[trail.length - 1] as Vec3];
  };

  return (
    <SceneCanvas camera={[3.4, 2.6, 4.4]}>
      <WorldAxes size={1.9} />
      <T.Group scale={[SCALE, SCALE, SCALE]}>
        <T.Mesh>
          <T.SphereGeometry args={[NOSE[0], 24, 16]} />
          <T.MeshBasicMaterial color={COLOR.faint} wireframe transparent opacity={0.16} />
        </T.Mesh>

        <FatLine points={eulerTrail()} color={EULER_COLOR} width={2.5} />
        <FatLine points={slerpTrail()} color={SLERP_COLOR} width={2.5} />
        <For each={ends()}>
          {(p) => (
            <T.Mesh position={xyz(p)}>
              <T.SphereGeometry args={[0.03, 12, 12]} />
              <T.MeshBasicMaterial color={COLOR.hull} />
            </T.Mesh>
          )}
        </For>

        <Pointer q={props.eulerNow} color={EULER_COLOR} />
        <Pointer q={props.slerpNow} color={SLERP_COLOR} />
      </T.Group>
    </SceneCanvas>
  );
}
