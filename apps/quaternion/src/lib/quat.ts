// 表示用の数値計算。three.js に依存しないので、プリレンダー時にも読み込める。

export type Vec3 = readonly [number, number, number];
export type Quat = {
  readonly w: number;
  readonly x: number;
  readonly y: number;
  readonly z: number;
};

export const IDENTITY: Quat = { w: 1, x: 0, y: 0, z: 0 };

export const rad = (deg: number) => (deg * Math.PI) / 180;
export const deg = (r: number) => (r * 180) / Math.PI;

/** 単位ベクトル axis のまわりに angle（ラジアン）回す四元数: (cos θ/2, sin θ/2 · n) */
export function fromAxisAngle(axis: Vec3, angle: number): Quat {
  const s = Math.sin(angle / 2);
  return { w: Math.cos(angle / 2), x: axis[0] * s, y: axis[1] * s, z: axis[2] * s };
}

/** ハミルトン積 a·b（b を先に適用し、次に a） */
export function mul(a: Quat, b: Quat): Quat {
  return {
    w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,
    x: a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
    y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
    z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
  };
}

export const neg = (q: Quat): Quat => ({ w: -q.w, x: -q.x, y: -q.y, z: -q.z });
export const conj = (q: Quat): Quat => ({ w: q.w, x: -q.x, y: -q.y, z: -q.z });
export const dot = (a: Quat, b: Quat) => a.w * b.w + a.x * b.x + a.y * b.y + a.z * b.z;

/** v′ = q v q⁻¹ */
export function rotate(q: Quat, v: Vec3): Vec3 {
  const p = mul(mul(q, { w: 0, x: v[0], y: v[1], z: v[2] }), conj(q));
  return [p.x, p.y, p.z];
}

/** オイラー角（ラジアン、XYZ 順 = 外側から X→Y→Z の入れ子）。three.js の Euler 'XYZ' と同じ */
export function fromEulerXYZ(x: number, y: number, z: number): Quat {
  return mul(
    mul(fromAxisAngle([1, 0, 0], x), fromAxisAngle([0, 1, 0], y)),
    fromAxisAngle([0, 0, 1], z)
  );
}

/** 球面線形補間。近いほうの符号を選んで最短経路を通る */
export function slerp(a: Quat, b: Quat, t: number): Quat {
  let d = dot(a, b);
  let end = b;
  if (d < 0) {
    d = -d;
    end = neg(b);
  }
  if (d > 0.9995) {
    const q = {
      w: a.w + (end.w - a.w) * t,
      x: a.x + (end.x - a.x) * t,
      y: a.y + (end.y - a.y) * t,
      z: a.z + (end.z - a.z) * t,
    };
    const n = Math.hypot(q.w, q.x, q.y, q.z);
    return { w: q.w / n, x: q.x / n, y: q.y / n, z: q.z / n };
  }
  const omega = Math.acos(d);
  const so = Math.sin(omega);
  const ka = Math.sin((1 - t) * omega) / so;
  const kb = Math.sin(t * omega) / so;
  return {
    w: ka * a.w + kb * end.w,
    x: ka * a.x + kb * end.x,
    y: ka * a.y + kb * end.y,
    z: ka * a.z + kb * end.z,
  };
}

/** 2つの姿勢のあいだの回転角（ラジアン、0〜π） */
export function angleBetween(a: Quat, b: Quat): number {
  return 2 * Math.acos(Math.min(1, Math.abs(dot(a, b))));
}

/** three.js の Quaternion.set / R3F の quaternion プロパティ用（x, y, z, w の順） */
export const toXYZW = (q: Quat): [number, number, number, number] => [q.x, q.y, q.z, q.w];

/** 表示用。−0.000 を出さず、マイナスは U+2212 */
export function fmt(n: number, digits = 3): string {
  const v = Math.abs(n) < 0.5 * 10 ** -digits ? 0 : n;
  return (v < 0 ? '−' : '') + Math.abs(v).toFixed(digits);
}
