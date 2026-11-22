import { Show } from 'solid-js';
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
export function HalfAngleDial(props: Props) {
  const half = () => rad(props.theta) / 2;
  const px = () => C + R * Math.cos(half());
  const py = () => C - R * Math.sin(half());
  const arc = () => {
    const steps = Math.max(2, Math.ceil(props.theta / 6));
    return Array.from({ length: steps + 1 }, (_, i) => {
      const a = (half() * i) / steps;
      return `${(C + 20 * Math.cos(a)).toFixed(1)},${(C - 20 * Math.sin(a)).toFixed(1)}`;
    }).join(' ');
  };

  return (
    <figure class="dial">
      <svg
        viewBox="0 0 200 200"
        role="img"
        aria-label={`文字盤。針は θ/2 = ${props.theta / 2}° の位置`}
      >
        <line class="dial-axis" x1={C - R - 8} y1={C} x2={C + R + 8} y2={C} />
        <line class="dial-axis" x1={C} y1={C - R - 8} x2={C} y2={C + R + 8} />
        <circle class="dial-circle" cx={C} cy={C} r={R} />

        {/* 目盛りは機体の回転角 θ */}
        <text class="dial-label" x={C + R + 11} y={C + 4} text-anchor="start">
          0°
        </text>
        <text class="dial-label" x={C} y={C - R - 13} text-anchor="middle">
          180°
        </text>
        <text class="dial-label" x={C - R - 11} y={C + 4} text-anchor="end">
          360°
        </text>
        <Show when={props.full}>
          <text class="dial-label" x={C} y={C + R + 21} text-anchor="middle">
            540°
          </text>
        </Show>

        <polyline class="dial-arc" points={arc()} />
        <line class="dial-w" x1={C} y1={C} x2={px()} y2={C} />
        <line class="dial-v" x1={px()} y1={C} x2={px()} y2={py()} />
        <line class="dial-radius" x1={C} y1={C} x2={px()} y2={py()} />
        <Show when={props.full}>
          <circle class="dial-antipode" cx={2 * C - px()} cy={2 * C - py()} r={5} />
        </Show>
        <circle class="dial-point" cx={px()} cy={py()} r={5.5} />
      </svg>
      <figcaption>
        <span>
          針の傾き = <var>θ</var> の半分 = {props.theta / 2}°
        </span>
        <span>
          <span class="key key-w" aria-hidden="true" />
          横の影 = <var>w</var> = {fmt(Math.cos(half()))}
        </span>
        <span>
          <span class="key key-v" aria-hidden="true" />
          縦の影 = {fmt(Math.sin(half()))}
        </span>
        <Show when={props.full}>
          <span>
            <span class="key key-antipode" aria-hidden="true" />−<var>q</var> の位置
          </span>
        </Show>
        <span class="dial-note">外の目盛りは機体の回転角 θ</span>
      </figcaption>
    </figure>
  );
}
