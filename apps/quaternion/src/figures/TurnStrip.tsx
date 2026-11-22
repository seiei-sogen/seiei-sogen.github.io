import { fmt, rad } from '../lib/quat';

type Props = {
  /** 並べる回転角（度） */
  angles: readonly number[];
};

const W = 360;

/** 1、0、−1 はそのまま、それ以外は小数2桁 */
const short = (v: number) => fmt(v, Math.abs(v * 100 - Math.round(v) * 100) < 1 ? 0 : 2);

/**
 * 機体の向き（上段）と、文字盤の針（下段）を回転角ごとに並べる。
 * 機体が θ 回るあいだに、針は θ/2 しか回らないことを見せる。
 */
export function TurnStrip({ angles }: Props) {
  const col = W / angles.length;
  return (
    <svg
      viewBox={`0 0 ${W} 168`}
      role="img"
      aria-label={`機体を ${angles.join('°、')}° 回したときの向きと、針の位置、w の値`}
    >
      {angles.map((a, i) => {
        const cx = col * (i + 0.5);
        const half = rad(a) / 2;
        const nx = 19 * Math.cos(half);
        const ny = -19 * Math.sin(half);
        return (
          <g key={a}>
            <text className="t" x={cx} y={14} textAnchor="middle">
              {a}°
            </text>

            {/* 上から見た機体。左回りに a 度 */}
            <g transform={`translate(${cx} 48) rotate(${-a})`}>
              <rect className="f-wing" x={-5} y={-15} width={9} height={30} rx={1} />
              <rect className="f-wing" x={-15} y={-7} width={5} height={14} rx={1} />
              <path className="f-ink" d="M 17 0 L -14 -4.5 L -14 4.5 z" />
            </g>

            {/* 針は a/2 度 */}
            <g transform={`translate(${cx} 112)`}>
              <circle className="s-ink-thin" r={19} />
              <line className="s-axis" x1={-23} y1={0} x2={23} y2={0} />
              <line className="s-w-thick" x1={0} y1={0} x2={nx} y2={0} />
              <line className="s-ink" x1={0} y1={0} x2={nx} y2={ny} />
              <circle className="f-ink" cx={nx} cy={ny} r={3} />
            </g>

            <text className="t" x={cx} y={156} textAnchor="middle">
              <tspan className="t-w">w</tspan> = {short(Math.cos(half))}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
