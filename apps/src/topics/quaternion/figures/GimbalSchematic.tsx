/** ジンバルロックの模式図。3本の軸のうち2本が重なると、回せる向きが1つ減る */
export function GimbalSchematic() {
  const arrow = (id: string, cls: string) => (
    <marker id={id} markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
      <path d="M0,0 L9,4.5 L0,9 z" class={cls} />
    </marker>
  );
  return (
    <svg
      viewBox="0 0 360 150"
      role="img"
      aria-label="左はふだんの状態で3本の軸が別々の向き。右はロックした状態で赤と青の軸が重なっている"
    >
      <defs>
        {arrow('gs-x', 'f-x')}
        {arrow('gs-y', 'f-y')}
        {arrow('gs-z', 'f-z')}
      </defs>

      {/* ふだん */}
      <line class="s-x" x1="80" y1="80" x2="150" y2="80" marker-end="url(#gs-x)" />
      <line class="s-y" x1="80" y1="80" x2="80" y2="18" marker-end="url(#gs-y)" />
      <line class="s-z" x1="80" y1="80" x2="36" y2="116" marker-end="url(#gs-z)" />
      <text class="t-x" x="156" y="76">
        X
      </text>
      <text class="t-y" x="88" y="22">
        Y
      </text>
      <text class="t-z" x="22" y="124">
        Z
      </text>
      <text class="t" x="90" y="144" text-anchor="middle">
        ふだん: 3つの向きに回せる
      </text>

      {/* ロック */}
      <line class="s-x" x1="250" y1="77" x2="320" y2="77" marker-end="url(#gs-x)" />
      <line class="s-z" x1="250" y1="84" x2="320" y2="84" marker-end="url(#gs-z)" />
      <line class="s-y" x1="250" y1="80" x2="250" y2="18" marker-end="url(#gs-y)" />
      <text class="t-x" x="326" y="72">
        X
      </text>
      <text class="t-z" x="326" y="96">
        Z
      </text>
      <text class="t-y" x="258" y="22">
        Y
      </text>
      <text class="t" x="270" y="144" text-anchor="middle">
        ロック: X と Z が同じ向き
      </text>
    </svg>
  );
}
