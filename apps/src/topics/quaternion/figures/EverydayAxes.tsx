import { For } from 'solid-js';

/** 身近な「軸」: ドア・地球儀・タイヤ。黄色が回転の軸 */
export function EverydayAxes() {
  return (
    <svg viewBox="0 0 360 172" role="img" aria-label="ドア、地球儀、タイヤと、それぞれの回転の軸">
      <defs>
        <marker id="ea-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" class="f-muted" />
        </marker>
      </defs>

      {/* ドア: 軸はちょうつがい（縦） */}
      <polygon class="s-ink" points="36,34 86,46 86,122 36,110" />
      <circle class="f-ink" cx="78" cy="84" r="2.5" />
      <line class="s-w" x1="36" y1="14" x2="36" y2="130" />
      <path class="s-muted" d="M 96 118 A 62 62 0 0 1 64 136" marker-end="url(#ea-arrow)" />
      <text class="t" x="60" y="154" text-anchor="middle">
        ドア
      </text>
      <text class="t-small" x="60" y="168" text-anchor="middle">
        軸はちょうつがい
      </text>

      {/* 地球儀: 軸は地軸（斜め） */}
      <circle class="s-ink" cx="180" cy="72" r="40" />
      <ellipse class="s-ink-thin" cx="180" cy="72" rx="40" ry="11" transform="rotate(-21 180 72)" />
      <line class="s-w" x1="158" y1="15" x2="202" y2="129" />
      <path class="s-muted" d="M 146 32 A 17 6 -21 1 0 178 20" marker-end="url(#ea-arrow)" />
      <text class="t" x="180" y="154" text-anchor="middle">
        地球儀
      </text>
      <text class="t-small" x="180" y="168" text-anchor="middle">
        軸は北極と南極を結ぶ線
      </text>

      {/* タイヤ: 軸は車軸（こちら向き） */}
      <circle class="s-ink" cx="300" cy="72" r="40" />
      <circle class="s-ink-thin" cx="300" cy="72" r="27" />
      <For each={[0, 72, 144, 216, 288]}>
        {(a) => (
          <line
            class="s-ink-thin"
            x1="300"
            y1="72"
            x2={300 + 27 * Math.cos((a * Math.PI) / 180)}
            y2={72 + 27 * Math.sin((a * Math.PI) / 180)}
          />
        )}
      </For>
      <circle class="f-w" cx="300" cy="72" r="6" />
      <path class="s-muted" d="M 324 28 A 50 50 0 0 1 349 62" marker-end="url(#ea-arrow)" />
      <text class="t" x="300" y="154" text-anchor="middle">
        タイヤ
      </text>
      <text class="t-small" x="300" y="168" text-anchor="middle">
        軸は車軸（手前向き）
      </text>
    </svg>
  );
}
