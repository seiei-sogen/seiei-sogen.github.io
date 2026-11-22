import { lazy, useMemo, useState } from 'react';
import { Deeper, Fig, TryIt } from '../components/Explain';
import { HalfAngleDial } from '../components/HalfAngleDial';
import { QuatReadout } from '../components/QuatReadout';
import { Slider } from '../components/Slider';
import { Stage } from '../components/Stage';
import { TurnStrip } from '../figures/TurnStrip';
import { fromAxisAngle, neg, rad } from '../lib/quat';
import { useTween } from '../lib/useTween';

const DoubleCoverScene = lazy(() => import('../scenes/DoubleCoverScene'));

const easeInOut = (p: number) => (1 - Math.cos(Math.PI * p)) / 2;

function status(theta: number, untangle: number): string {
  if (theta === 0) return '出発点。機体も q も動いていない。';
  if (theta < 360) return '機体が回るあいだ、文字盤の針は半分の角度しか進まない。';
  if (theta === 360)
    return '機体は最初と同じ向きに戻った。でも q は −1。板の列には1回ぶんのねじれが残っている。';
  if (theta < 720)
    return `機体の向きは θ = ${theta - 360}° のときと同じ。q は、そのときの q の符号を全部反対にしたもの。`;
  if (untangle >= 1) return '壁も機体も動かしていないのに、ねじれが消えた。';
  return 'q も 1 に戻った。板の列は2回ねじれているが、このねじれはほどける。';
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
        <h2 id="double-cover">
          <span>1回転では戻らない。</span>
          <span>2回転で元通り</span>
        </h2>
        <p>
          機体を1回転（360°）させると、見た目は最初と同じ向きに戻る。ところが4つの数は戻っていない。全部の符号が反対になっている。もう1回転して、合わせて2回転（720°）したとき、やっと数も元に戻る。
        </p>
        <Fig caption="上が機体の向き、下が針。機体が1回転（360°）しても針はまだ半周で、w は −1。機体が2回転（720°）して、針がやっと1周する。">
          <TurnStrip angles={[0, 180, 360, 540, 720]} />
        </Fig>
        <p>
          数が戻っていないことは、機体を見ているだけではわからない。そこで下の3Dでは、壁と機体を板の列でつないで、ねじれとして見えるようにした。
        </p>
      </header>

      <Stage label="壁と機体を板の列でつなぎ、機体を回すと板の列がねじれていく3D図">
        <DoubleCoverScene angle={rad(theta)} untangle={untangle.value} q={q} />
      </Stage>

      <div className="panel">
        <div className="controls">
          <Slider
            label="角度 θ（どれだけ回すか）"
            value={theta}
            min={0}
            max={720}
            onChange={setTheta}
          />
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
                ねじれを戻す
              </button>
            ) : (
              <button
                type="button"
                className="primary"
                disabled={!canUntangle || untangle.running}
                onClick={() => untangle.play(3200, easeInOut)}
              >
                ねじれをほどく
              </button>
            )}
          </div>
          {!canUntangle && (
            <p className="hint">「ねじれをほどく」は θ が 720° のときだけ押せます。</p>
          )}
          <p className="status" aria-live="polite">
            {status(theta, untangle.value)}
          </p>
        </div>

        <div className="readout">
          <QuatReadout q={q} />
          <QuatReadout q={neg(q)} name="−q" />
          <HalfAngleDial theta={theta} full />
        </div>
      </div>

      <div className="notes">
        <TryIt>
          <li>
            「360°にする」を押す。機体は最初と同じ向き。でも <var>q</var> は (−1, 0, 0, 0)
            で、板の列は1回ねじれている。
          </li>
          <li>
            「ねじれをほどく」を押そうとしても押せない。1回ぶんのねじれは、壁と機体を動かさないかぎり絶対にほどけない。
          </li>
          <li>
            「720°にする」を押す。<var>q</var> が (1, 0, 0, 0) に戻る。板の列は2回ねじれている。
          </li>
          <li>「ねじれをほどく」を押す。壁も機体も動いていないのに、ねじれがするすると消える。</li>
        </TryIt>

        <h3>自分の腕でもためせる</h3>
        <p>
          手のひらを上に向けて、その上に水の入ったコップが載っているつもりになる。こぼさないように手のひらを上に向けたまま、わきの下をくぐらせて手を1回転させる。腕がねじれて、ひじが上を向く。そこから同じ向きに、今度は頭の上を通してもう1回転させる。腕のねじれが取れて、最初の姿勢に戻る。
        </p>
        <p>
          手のひらは1回転で元の向きに戻るのに、腕は2回転しないと戻らない。板の列で起きていたのは、これと同じこと。
        </p>

        <h3>同じ向きに、数が2つある</h3>
        <p>
          <var>q</var> と、その符号を全部反対にした −<var>q</var>
          は、まったく同じ向きを表す。文字盤でいうと、針の先と、そのちょうど反対側の白丸。1つの向きに対して数が2通りあるので、これを「二重被覆」と呼ぶ。
        </p>
        <p>
          <var>q</var>{' '}
          は「向き」だけでなく、「そこまでに何回ねじったか（奇数回か偶数回か）」まで覚えている数、と考えるとわかりやすい。
        </p>

        <Deeper>
          <p>
            ベクトル <var>v</var> を回す式は{' '}
            <span className="formula-inline">
              <var>v</var>′ = <var>q</var> <var>v</var> <var>q</var>
              <sup>−1</sup>
            </span>
            。ここで <var>q</var> を −<var>q</var> に替えると、
          </p>
          <p className="formula">
            (−<var>q</var>) <var>v</var> (−<var>q</var>)<sup>−1</sup> = <var>q</var> <var>v</var>{' '}
            <var>q</var>
            <sup>−1</sup>
          </p>
          <p>
            となって、マイナスが2つ打ち消し合う。だから <var>q</var> と −<var>q</var>{' '}
            は同じ回転になる。
          </p>
          <p>
            板の列の実験は「ディラックのベルト」と呼ばれている。ほどけるかどうかは、
            <var>q</var> が −1 で終わるか 1 に戻るかで決まる。
          </p>
        </Deeper>
      </div>
    </section>
  );
}
