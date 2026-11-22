type Props = {
  /** 回った角度の合計（度） */
  shortest: number;
  detour: number;
};

/** A から B への2つの行き方。まっすぐ行く道と、遠回りする道 */
export function PathCompare({ shortest, detour }: Props) {
  return (
    <svg
      viewBox="0 0 360 150"
      role="img"
      aria-label={`A から B へ、まっすぐ行く道は ${shortest} 度、遠回りの道は ${detour} 度`}
    >
      <path className="s-euler" d="M 60 92 C 76 -24, 156 6, 176 78 S 266 172, 300 92" />
      <path className="s-slerp" d="M 60 92 Q 180 72 300 92" />
      <circle className="f-ink" cx="60" cy="92" r="5" />
      <circle className="f-ink" cx="300" cy="92" r="5" />
      <text className="t" x="14" y="118">
        A（はじめの向き）
      </text>
      <text className="t" x="346" y="118" textAnchor="end">
        B（おわりの向き）
      </text>
      <text className="t-slerp" x="248" y="68" textAnchor="middle">
        まっすぐ {shortest}°
      </text>
      <text className="t-euler" x="122" y="12" textAnchor="middle">
        遠回り {detour}°
      </text>
    </svg>
  );
}
