import { Aircraft, COLOR, FatLine, SceneCanvas, T } from './common';

type Props = {
  /** ラジアン。外側 X、中間 Y、内側 Z */
  x: number;
  y: number;
  z: number;
};

const R_OUTER = 1.95;
const R_MIDDLE = 1.7;
const R_INNER = 1.45;

function Ring(props: { radius: number; color: string }) {
  return (
    <T.Mesh>
      <T.TorusGeometry args={[props.radius, 0.03, 10, 96]} />
      <T.MeshStandardMaterial color={props.color} roughness={0.5} />
    </T.Mesh>
  );
}

/**
 * 入れ子の輪 = オイラー角 XYZ。Group の入れ子がそのまま R = Rx·Ry·Rz になる。
 * 各輪は「自分の回転軸」と「1つ内側の輪の回転軸」を含む平面に置く。
 */
export default function GimbalScene(props: Props) {
  return (
    <SceneCanvas camera={[3.6, 2.6, 5]}>
      {/* 外側の輪の軸（X）。台座に固定されていて動かない */}
      <FatLine
        points={[
          [-2.35, 0, 0],
          [2.35, 0, 0],
        ]}
        color={COLOR.x}
        width={2.5}
      />

      <T.Group rotation={[props.x, 0, 0]}>
        <Ring radius={R_OUTER} color={COLOR.x} />
        {/* 中間の輪の軸（Y） */}
        <FatLine
          points={[
            [0, -R_OUTER, 0],
            [0, R_OUTER, 0],
          ]}
          color={COLOR.y}
          width={2.5}
        />

        <T.Group rotation={[0, props.y, 0]}>
          <T.Group rotation={[0, Math.PI / 2, 0]}>
            <Ring radius={R_MIDDLE} color={COLOR.y} />
          </T.Group>
          {/* 内側の輪の軸（Z）。中間の輪を 90° 倒すと外側の X 軸に重なる */}
          <FatLine
            points={[
              [0, 0, -R_MIDDLE],
              [0, 0, R_MIDDLE],
            ]}
            color={COLOR.z}
            width={2.5}
          />

          <T.Group rotation={[0, 0, props.z]}>
            <T.Group rotation={[Math.PI / 2, 0, 0]}>
              <Ring radius={R_INNER} color={COLOR.z} />
            </T.Group>
            <T.Group scale={[1.25, 1.25, 1.25]}>
              <Aircraft />
            </T.Group>
          </T.Group>
        </T.Group>
      </T.Group>
    </SceneCanvas>
  );
}
