import { fmt, rad } from '../lib/quat';

type Props = {
  /** 回転角 θ（度） */
  theta: number;
  /** −q の位置も描く */
  showAntipode?: boolean;
};

const R = 70;
const C = 100;

/**
 * 半角の文字盤。物体が θ 回るあいだ、q は単位円の上を θ/2 しか進まない。
 * 横軸が w = cos(θ/2)、縦軸が (x, y, z) に掛かる係数 sin(θ/2)。
 */
export function HalfAngleDial({ theta, showAntipode = false }: Props) {
  const half = rad(theta) / 2;
  const px = C + R * Math.cos(half);
  const py = C - R * Math.sin(half);
  const steps = Math.max(2, Math.ceil(theta / 6));
  const arc = Array.from({ length: steps + 1 }, (_, i) => {
    const a = (half * i) / steps;
    return `${(C + 22 * Math.cos(a)).toFixed(1)},${(C - 22 * Math.sin(a)).toFixed(1)}`;
  }).join(' ');

  return (
    <figure className="dial">
      <svg viewBox="0 0 200 200" role="img" aria-label={`θ/2 = ${theta / 2}° の位置にある q`}>
        <line className="dial-axis" x1={C - R - 16} y1={C} x2={C + R + 16} y2={C} />
        <line className="dial-axis" x1={C} y1={C - R - 16} x2={C} y2={C + R + 16} />
        <circle className="dial-circle" cx={C} cy={C} r={R} />
        <text className="dial-label" x={C + R + 6} y={C + 16} textAnchor="middle">
          1
        </text>
        <text className="dial-label" x={C - R - 8} y={C + 16} textAnchor="middle">
          −1
        </text>

        <polyline className="dial-arc" points={arc} />
        <line className="dial-w" x1={C} y1={C} x2={px} y2={C} />
        <line className="dial-v" x1={px} y1={C} x2={px} y2={py} />
        <line className="dial-radius" x1={C} y1={C} x2={px} y2={py} />
        {showAntipode && <circle className="dial-antipode" cx={2 * C - px} cy={2 * C - py} r={5} />}
        <circle className="dial-point" cx={px} cy={py} r={5.5} />
      </svg>
      <figcaption>
        <span>
          <var>θ</var>/2 = {theta / 2}°
        </span>
        <span>
          <span className="key key-w" aria-hidden="true" />
          cos(<var>θ</var>/2) = {fmt(Math.cos(half))}
        </span>
        <span>
          <span className="key key-v" aria-hidden="true" />
          sin(<var>θ</var>/2) = {fmt(Math.sin(half))}
        </span>
        {showAntipode && (
          <span>
            <span className="key key-antipode" aria-hidden="true" />−<var>q</var>
          </span>
        )}
      </figcaption>
    </figure>
  );
}
