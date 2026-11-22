type Props = {
  /** 回った角度の合計（度） */
  shortest: number;
  detour: number;
};

/** A から B への2つの行き方。まっすぐ行く道と、遠回りする道 */
export function PathCompare(props: Props) {
  return (
    <svg
      viewBox="0 0 360 150"
      role="img"
      aria-label={`A から B へ、まっすぐ行く道は ${props.shortest} 度、遠回りの道は ${props.detour} 度`}
    >
      <path class="s-euler" d="M 60 92 C 76 -24, 156 6, 176 78 S 266 172, 300 92" />
      <path class="s-slerp" d="M 60 92 Q 180 72 300 92" />
      <circle class="f-ink" cx="60" cy="92" r="5" />
      <circle class="f-ink" cx="300" cy="92" r="5" />
      <text class="t" x="14" y="118">
        A（はじめの向き）
      </text>
      <text class="t" x="346" y="118" text-anchor="end">
        B（おわりの向き）
      </text>
      <text class="t-slerp" x="248" y="68" text-anchor="middle">
        まっすぐ {props.shortest}°
      </text>
      <text class="t-euler" x="122" y="12" text-anchor="middle">
        遠回り {props.detour}°
      </text>
    </svg>
  );
}
