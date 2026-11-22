import { Show, createMemo } from 'solid-js';
import { Quaternion, Vector3 } from 'three';
import type { Vec3 } from '../../quaternion/lib/quat';
import { FatLine, T, xyz } from '../../quaternion/scenes/common';

// 2つの3Dシーンで共通に使う色と部品。three.js を使うので、遅延読み込みされるシーンからだけ読み込む。

/** styles.css の --path-a / --path-b / --alpha / --ok / --ng と同じ色（ダーク側） */
export const PAINT = {
  /** 先に塗りかえる道（先に F の矢印を進む道） */
  a: '#ff7ad9',
  /** 先に取りかえる道（先に柱を登る道） */
  b: '#5ad1e6',
  alpha: '#f5c451',
  edge: '#b9c4dc',
  ok: '#5fd693',
  ng: '#ff9f5a',
} as const;

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const ease = (p: number) => (1 - Math.cos(Math.PI * p)) / 2;
export const lerp = (a: number, b: number, m: number) => a + (b - a) * m;
export const lerp3 = (a: Vec3, b: Vec3, m: number): Vec3 => [
  lerp(a[0], b[0], m),
  lerp(a[1], b[1], m),
  lerp(a[2], b[2], m),
];

/**
 * 0→1 の時間を「1本目の矢印を進む → 角で一休み → 2本目の矢印を進む」に分ける。
 * move は矢印の上を進んだ割合、morph はその矢印の操作（塗りかえ・取りかえ）が済んだ割合
 */
export function walk(t: number) {
  const second = t >= 0.5;
  const leg = clamp01((t - (second ? 0.55 : 0)) / 0.45);
  return { second, move: ease(leg), morph: ease(clamp01((leg - 0.25) / 0.5)) };
}

const UP = new Vector3(0, 1, 0);
const HEAD = 0.22;

type ArrowProps = {
  from: Vec3;
  to: Vec3;
  color: string;
  /** 両端を縮める長さ（点や列に矢印が刺さらないように） */
  trim?: number;
  width?: number;
};

export function Arrow(props: ArrowProps) {
  const shape = createMemo(() => {
    const from = new Vector3(...props.from);
    const to = new Vector3(...props.to);
    const dir = to.clone().sub(from).normalize();
    const trim = props.trim ?? 0;
    const start = from.addScaledVector(dir, trim);
    const tip = to.addScaledVector(dir, -trim);
    const neck = tip.clone().addScaledVector(dir, -HEAD);
    return {
      line: [start.toArray(), neck.toArray()],
      cone: tip.addScaledVector(dir, -HEAD / 2).toArray(),
      turn: new Quaternion().setFromUnitVectors(UP, dir),
    };
  });
  return (
    <T.Group>
      {/* FatLine は色を作るときにしか読まないので、色が変わったら作り直す */}
      <Show when={props.color} keyed>
        {(color) => <FatLine points={shape().line} color={color} width={props.width ?? 3} />}
      </Show>
      <T.Mesh position={xyz(shape().cone)} quaternion={shape().turn}>
        <T.ConeGeometry args={[0.08, HEAD, 16]} />
        <T.MeshBasicMaterial color={props.color} />
      </T.Mesh>
    </T.Group>
  );
}
