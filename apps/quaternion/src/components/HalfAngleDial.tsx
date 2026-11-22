import { fmt, rad } from '../lib/quat';

type Props = {
  /** 回転角 θ（度） */
  theta: number;
  /** 1周ぶん（θ = 0〜720°）を使い、−q の位置も描く */
  full?: boolean;
};

const R = 62;
const C = 100;

/**
 * 半角の文字盤。長さ 1 の針が θ/2 だけ傾く。
 * 針の横の影が w = cos(θ/2)、縦の影が (x, y, z) に掛かる sin(θ/2)。
 * 外側の目盛りは機体の回転角 θ で振ってある（θ = 180° が真上）。
 */
export function HalfAngleDial({ theta, full = false }: Props) {
  const half = rad(theta) / 2;
  const px = C + R * Math.cos(half);
  const py = C - R * Math.sin(half);
  const steps = Math.max(2, Math.ceil(theta / 6));
  const arc = Array.from({ length: steps + 1 }, (_, i) => {
    const a = (half * i) / steps;
    return `${(C + 20 * Math.cos(a)).toFixed(1)},${(C - 20 * Math.sin(a)).toFixed(1)}`;
  }).join(' ');

  return (
    <figure className="dial">
      <svg viewBox="0 0 200 200" role="img" aria-label={`文字盤。針は θ/2 = ${theta / 2}° の位置`}>
        <line className="dial-axis" x1={C - R - 8} y1={C} x2={C + R + 8} y2={C} />
        <line className="dial-axis" x1={C} y1={C - R - 8} x2={C} y2={C + R + 8} />
        <circle className="dial-circle" cx={C} cy={C} r={R} />

        {/* 目盛りは機体の回転角 θ */}
        <text className="dial-label" x={C + R + 11} y={C + 4} textAnchor="start">
          0°
        </text>
        <text className="dial-label" x={C} y={C - R - 13} textAnchor="middle">
          180°
        </text>
        <text className="dial-label" x={C - R - 11} y={C + 4} textAnchor="end">
          360°
        </text>
        {full && (
          <text className="dial-label" x={C} y={C + R + 21} textAnchor="middle">
            540°
          </text>
        )}

        <polyline className="dial-arc" points={arc} />
        <line className="dial-w" x1={C} y1={C} x2={px} y2={C} />
        <line className="dial-v" x1={px} y1={C} x2={px} y2={py} />
        <line className="dial-radius" x1={C} y1={C} x2={px} y2={py} />
        {full && <circle className="dial-antipode" cx={2 * C - px} cy={2 * C - py} r={5} />}
        <circle className="dial-point" cx={px} cy={py} r={5.5} />
      </svg>
      <figcaption>
        <span>
          針の傾き <var>θ</var>/2 = {theta / 2}°
        </span>
        <span>
          <span className="key key-w" aria-hidden="true" />
          横の影 = <var>w</var> = {fmt(Math.cos(half))}
        </span>
        <span>
          <span className="key key-v" aria-hidden="true" />
          縦の影 = sin(<var>θ</var>/2) = {fmt(Math.sin(half))}
        </span>
        {full && (
          <span>
            <span className="key key-antipode" aria-hidden="true" />−<var>q</var>
          </span>
        )}
        <span className="dial-note">外の目盛りは機体の回転角 θ</span>
      </figcaption>
    </figure>
  );
}
