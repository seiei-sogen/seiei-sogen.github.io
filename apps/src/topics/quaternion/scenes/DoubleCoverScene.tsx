import { For, onCleanup } from 'solid-js';
import { BoxGeometry, MeshStandardMaterial } from 'three';
import { fromAxisAngle, mul, toXYZW, type Quat } from '../lib/quat';
import { Aircraft, COLOR, FatLine, SceneCanvas, T } from './common';

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
const TILES = Array.from({ length: TILE_COUNT }, (_, i) => i);

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

export default function DoubleCoverScene(props: Props) {
  // 板は30枚とも同じ形・同じ色なので、形と素材を1組だけ作って使い回す。
  // 表（+Y）と裏（−Y）で色を変えて、ひねりが見えるようにする
  const tileGeometry = new BoxGeometry(TILE_PITCH * 0.8, 0.03, 0.8);
  const edge = new MeshStandardMaterial({ color: COLOR.faint });
  const top = new MeshStandardMaterial({ color: COLOR.hull, roughness: 0.6 });
  const bottom = new MeshStandardMaterial({ color: '#2bb3a3', roughness: 0.6 });
  const tileMaterials = [edge, edge, top, bottom, edge, edge];
  onCleanup(() => {
    tileGeometry.dispose();
    edge.dispose();
    top.dispose();
    bottom.dispose();
  });

  return (
    <SceneCanvas camera={[2.6, 2.3, 5.8]}>
      <T.Group position={[0.15, 0.25, 0]}>
        {/* 回転軸 */}
        <FatLine
          points={[
            [WALL_X, 0, 0],
            [AIRCRAFT_X + 1.1, 0, 0],
          ]}
          color={COLOR.x}
          opacity={0.5}
        />

        {/* 固定された壁 */}
        <T.Mesh position={[WALL_X - 0.06, 0, 0]}>
          <T.BoxGeometry args={[0.08, 1.7, 1.7]} />
          <T.MeshStandardMaterial color={COLOR.faint} roughness={0.9} />
        </T.Mesh>

        {/* 板の列 */}
        <For each={TILES}>
          {(i) => (
            <T.Mesh
              geometry={tileGeometry}
              material={tileMaterials}
              position={[WALL_X + TILE_PITCH * (i + 0.5), 0, 0]}
              quaternion={toXYZW(
                tileOrientation((i + 0.5) / TILE_COUNT, props.angle, props.untangle)
              )}
            />
          )}
        </For>

        <T.Group position={[AIRCRAFT_X, 0, 0]} quaternion={toXYZW(props.q)}>
          <Aircraft />
        </T.Group>
      </T.Group>
    </SceneCanvas>
  );
}
