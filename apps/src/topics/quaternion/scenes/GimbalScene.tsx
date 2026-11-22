import { Line } from '@react-three/drei';
import { Aircraft, COLOR, SceneCanvas } from './common';

type Props = {
  /** ラジアン。外側 X、中間 Y、内側 Z */
  x: number;
  y: number;
  z: number;
};

const R_OUTER = 1.95;
const R_MIDDLE = 1.7;
const R_INNER = 1.45;

function Ring({ radius, color }: { radius: number; color: string }) {
  return (
    <mesh>
      <torusGeometry args={[radius, 0.03, 10, 96]} />
      <meshStandardMaterial color={color} roughness={0.5} />
    </mesh>
  );
}

/**
 * 入れ子の輪 = オイラー角 XYZ。group の入れ子がそのまま R = Rx·Ry·Rz になる。
 * 各輪は「自分の回転軸」と「1つ内側の輪の回転軸」を含む平面に置く。
 */
export default function GimbalScene({ x, y, z }: Props) {
  return (
    <SceneCanvas camera={[3.6, 2.6, 5]}>
      {/* 外側の輪の軸（X）。台座に固定されていて動かない */}
      <Line
        points={[
          [-2.35, 0, 0],
          [2.35, 0, 0],
        ]}
        color={COLOR.x}
        lineWidth={2.5}
      />

      <group rotation={[x, 0, 0]}>
        <Ring radius={R_OUTER} color={COLOR.x} />
        {/* 中間の輪の軸（Y） */}
        <Line
          points={[
            [0, -R_OUTER, 0],
            [0, R_OUTER, 0],
          ]}
          color={COLOR.y}
          lineWidth={2.5}
        />

        <group rotation={[0, y, 0]}>
          <group rotation={[0, Math.PI / 2, 0]}>
            <Ring radius={R_MIDDLE} color={COLOR.y} />
          </group>
          {/* 内側の輪の軸（Z）。中間の輪を 90° 倒すと外側の X 軸に重なる */}
          <Line
            points={[
              [0, 0, -R_MIDDLE],
              [0, 0, R_MIDDLE],
            ]}
            color={COLOR.z}
            lineWidth={2.5}
          />

          <group rotation={[0, 0, z]}>
            <group rotation={[Math.PI / 2, 0, 0]}>
              <Ring radius={R_INNER} color={COLOR.z} />
            </group>
            <group scale={1.25}>
              <Aircraft />
            </group>
          </group>
        </group>
      </group>
    </SceneCanvas>
  );
}
