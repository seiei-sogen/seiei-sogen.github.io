import { lazy, useMemo, useState } from 'react';
import { HalfAngleDial } from '../components/HalfAngleDial';
import { QuatReadout } from '../components/QuatReadout';
import { Slider } from '../components/Slider';
import { Stage } from '../components/Stage';
import { fromAxisAngle, neg, rad } from '../lib/quat';
import { useTween } from '../lib/useTween';

const DoubleCoverScene = lazy(() => import('../scenes/DoubleCoverScene'));

const easeInOut = (p: number) => (1 - Math.cos(Math.PI * p)) / 2;

function status(theta: number, untangle: number): string {
  if (theta === 0) return '出発点。機体も q も動いていない。';
  if (theta < 360) return '機体が回るあいだ、q は文字盤の上を半分の角度しか進まない。';
  if (theta === 360)
    return '機体は元の姿勢に戻った。でも q は −1 で、板の列には1回ぶんのひねりが残っている。';
  if (theta < 720)
    return `機体の姿勢は θ = ${theta - 360}° のときと同じ。q は、そのときの q の符号を逆にしたもの。`;
  if (untangle >= 1) return '壁も機体も動かしていないのに、ひねりが消えた。';
  return 'q も 1 に戻った。板の列は2回ひねれているが、このひねりはほどける。';
}

export function DoubleCover() {
  const [theta, setThetaRaw] = useState(90);
  const untangle = useTween();

  const setTheta = (v: number) => {
    untangle.set(0);
    setThetaRaw(v);
  };

  const q = useMemo(() => fromAxisAngle([1, 0, 0], rad(theta)), [theta]);
  const canUntangle = theta === 720;

  return (
    <section className="demo" aria-labelledby="double-cover">
      <header className="demo-head">
        <h2 id="double-cover">360°では元に戻らない</h2>
        <p>
          機体を 360° 回すと見た目は元通りになる。ところが <var>q</var> は (−1, 0, 0, 0)
          で、出発点の (1, 0, 0, 0) とは符号が逆。<var>q</var> まで元に戻るのは 720°
          回したときになる。
        </p>
      </header>

      <Stage label="壁と機体を板の列でつなぎ、機体を回すと板の列がひねれていく3D図">
        <DoubleCoverScene angle={rad(theta)} untangle={untangle.value} q={q} />
      </Stage>

      <div className="panel">
        <div className="controls">
          <Slider label="角度 θ" value={theta} min={0} max={720} onChange={setTheta} />
          <div className="buttons" role="group" aria-label="角度をそろえる">
            <button type="button" aria-pressed={theta === 360} onClick={() => setTheta(360)}>
              360°にする
            </button>
            <button type="button" aria-pressed={theta === 720} onClick={() => setTheta(720)}>
              720°にする
            </button>
          </div>
          <div className="buttons">
            {untangle.value >= 1 ? (
              <button type="button" className="primary" onClick={() => untangle.set(0)}>
                ひねりを戻す
              </button>
            ) : (
              <button
                type="button"
                className="primary"
                disabled={!canUntangle || untangle.running}
                onClick={() => untangle.play(3200, easeInOut)}
              >
                ひねりをほどく
              </button>
            )}
          </div>
          {!canUntangle && (
            <p className="hint">「ひねりをほどく」は θ が 720° のときだけ押せます。</p>
          )}
          <p className="status" aria-live="polite">
            {status(theta, untangle.value)}
          </p>
        </div>

        <div className="readout">
          <QuatReadout q={q} />
          <QuatReadout q={neg(q)} name="−q" />
          <HalfAngleDial theta={theta} showAntipode />
        </div>
      </div>

      <div className="notes">
        <p>
          <var>q</var> と −<var>q</var> は同じ姿勢を表す。
          <span className="formula-inline">
            (−<var>q</var>) <var>v</var> (−<var>q</var>)<sup>−1</sup> = <var>q</var> <var>v</var>{' '}
            <var>q</var>
            <sup>−1</sup>
          </span>{' '}
          で、マイナスが2つ打ち消し合うから。1つの姿勢に2つの <var>q</var>{' '}
          が対応するので、これを二重被覆と呼ぶ。
        </p>
        <p>
          板の列は「機体が何回ひねられたか」を覚えている。360°
          のひねりは、両端を固定したままではどうやってもほどけない。720° のひねりはほどける。
          <var>q</var> が −1 で終わるか 1
          に戻るかの違いが、そのまま板の列に現れている（ディラックのベルトと呼ばれる実験）。
        </p>
      </div>
    </section>
  );
}
