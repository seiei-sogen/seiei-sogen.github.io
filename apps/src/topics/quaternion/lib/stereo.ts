// 立体射影。球の上の1点（−1、南極）から見て、まん中を通る面に写す。
import type { Quat, Vec3 } from './quat';

/** これより遠くに写る点は描かない（−1 に近い点は無限の遠くへ飛ぶ） */
export const FAR = 7;

/** 4次元の球の点 (w, x, y, z) を −1 から見て3次元へ: (x, y, z) / (1 + w) */
export function projectS3(p: Quat): Vec3 | null {
  const d = 1 + p.w;
  if (d < 1e-6) return null;
  const v: Vec3 = [p.x / d, p.y / d, p.z / d];
  return Math.hypot(v[0], v[1], v[2]) > FAR ? null : v;
}

/** 3次元の球の点を南極 (0, −1, 0) から見て、赤道の高さの板 y = 0 へ */
export function projectS2(p: Vec3): Vec3 | null {
  const d = 1 + p[1];
  if (d < 1e-6) return null;
  const v: Vec3 = [p[0] / d, 0, p[2] / d];
  return Math.hypot(v[0], v[2]) > FAR ? null : v;
}

/** 円の点（上から時計回りに phi ラジアン）を、いちばん下から見て横線へ: tan(phi / 2) */
export function projectS1(phi: number): number | null {
  const d = 1 + Math.cos(phi);
  if (d < 1e-6) return null;
  return Math.sin(phi) / d;
}

/** 描けない点（null）のところで折れ線を切る */
export function splitRuns(points: readonly (Vec3 | null)[]): Vec3[][] {
  const runs: Vec3[][] = [];
  let run: Vec3[] = [];
  for (const p of points) {
    if (p) {
      run.push(p);
    } else {
      if (run.length > 1) runs.push(run);
      run = [];
    }
  }
  if (run.length > 1) runs.push(run);
  return runs;
}
