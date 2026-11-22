import { Line } from '@react-three/drei';
import { fromAxisAngle, mul, toXYZW, type Quat } from '../lib/quat';
import { Aircraft, COLOR, SceneCanvas } from './common';

type Props = {
  /** 機体を X 軸まわりに回した角度（ラジアン、0〜4π） */
  angle: number;
  /** 720° のひねりをほどく進み具合（0〜1）。angle が 4π のときだけ意味を持つ */
  untangle: number;
  q: Quat;
};

const TILE_COUNT = 30;
const WALL_X = -2.3;
const CHAIN_END_X = 0.55;
const AIRCRAFT_X = 1.3;
const TILE_PITCH = (CHAIN_END_X - WALL_X) / TILE_COUNT;

/**
 * 壁（s=0）から機体（s=1）までの板の向き。
 * ふだんは exp(s·θ/2·i) = 「X 軸まわりに s·θ」。
 * ほどくときは γ_t(s) = exp(πs·n_t)·exp(πs·i)、n_t は i から −i へ半回転する。
 * t=0 で 720° のひねり、t=1 で全部の板がそろい、どの t でも両端（s=0, 1）は動かない。
 */
function tileOrientation(s: number, angle: number, untangle: number): Quat {
  if (untangle <= 0) return fromAxisAngle([1, 0, 0], s * angle);
  const a = Math.PI * untangle;
  return mul(
    fromAxisAngle([Math.cos(a), Math.sin(a), 0], 2 * Math.PI * s),
    fromAxisAngle([1, 0, 0], 2 * Math.PI * s)
  );
}

export default function DoubleCoverScene({ angle, untangle, q }: Props) {
  return (
    <SceneCanvas camera={[2.6, 2.3, 5.8]}>
      <group position={[0.15, 0.25, 0]}>
        {/* 回転軸 */}
        <Line
          points={[
            [WALL_X, 0, 0],
            [AIRCRAFT_X + 1.1, 0, 0],
          ]}
          color={COLOR.x}
          lineWidth={1}
          transparent
          opacity={0.5}
        />

        {/* 固定された壁 */}
        <mesh position={[WALL_X - 0.06, 0, 0]}>
          <boxGeometry args={[0.08, 1.7, 1.7]} />
          <meshStandardMaterial color={COLOR.faint} roughness={0.9} />
        </mesh>

        {/* 板の列。表と裏で色を変えて、ひねりが見えるようにする */}
        {Array.from({ length: TILE_COUNT }, (_, i) => {
          const s = (i + 0.5) / TILE_COUNT;
          return (
            <mesh
              key={i}
              position={[WALL_X + TILE_PITCH * (i + 0.5), 0, 0]}
              quaternion={toXYZW(tileOrientation(s, angle, untangle))}
            >
              <boxGeometry args={[TILE_PITCH * 0.8, 0.03, 0.8]} />
              <meshStandardMaterial attach="material-0" color={COLOR.faint} />
              <meshStandardMaterial attach="material-1" color={COLOR.faint} />
              <meshStandardMaterial attach="material-2" color={COLOR.hull} roughness={0.6} />
              <meshStandardMaterial attach="material-3" color="#2bb3a3" roughness={0.6} />
              <meshStandardMaterial attach="material-4" color={COLOR.faint} />
              <meshStandardMaterial attach="material-5" color={COLOR.faint} />
            </mesh>
          );
        })}

        <group position={[AIRCRAFT_X, 0, 0]} quaternion={toXYZW(q)}>
          <Aircraft />
        </group>
      </group>
    </SceneCanvas>
  );
}
