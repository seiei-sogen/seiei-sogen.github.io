import { lazy, useMemo, useState } from 'react';
import { Deeper, Fig, TryIt } from '../components/Explain';
import { HalfAngleDial } from '../components/HalfAngleDial';
import { QuatReadout } from '../components/QuatReadout';
import { Slider } from '../components/Slider';
import { Stage } from '../components/Stage';
import { EverydayAxes } from '../figures/EverydayAxes';
import { TurnStrip } from '../figures/TurnStrip';
import { fmt, fromAxisAngle, rad, type Vec3 } from '../lib/quat';

const AxisAngleScene = lazy(() => import('../scenes/AxisAngleScene'));

const PRESETS = [
  { label: 'X軸', azimuth: 0, elevation: 0 },
  { label: 'Y軸', azimuth: 0, elevation: 90 },
  { label: 'Z軸', azimuth: 90, elevation: 0 },
  { label: '斜め', azimuth: 45, elevation: 35 },
] as const;

export function AxisAngle() {
  const [azimuth, setAzimuth] = useState(45);
  const [elevation, setElevation] = useState(35);
  const [theta, setTheta] = useState(90);

  const axis = useMemo<Vec3>(() => {
    const ce = Math.cos(rad(elevation));
    return [ce * Math.cos(rad(azimuth)), Math.sin(rad(elevation)), ce * Math.sin(rad(azimuth))];
  }, [azimuth, elevation]);
  const q = useMemo(() => fromAxisAngle(axis, rad(theta)), [axis, theta]);
  const half = theta / 2;

  return (
    <section className="demo" aria-labelledby="axis-angle">
      <header className="demo-head">
        <h2 id="axis-angle">
          <span>回すには</span>
          <span>「軸」と「角度」がいる</span>
        </h2>
        <p>
          ドアはちょうつがいを軸にして開く。地球儀は北極と南極を結ぶ線を軸にして回る。タイヤは車軸のまわりを回る。ものを回すときには、かならず「どの線のまわりに（軸）」と「どれだけ（角度）」がある。
        </p>
        <Fig caption="黄色い線や点が、回転の軸。">
          <EverydayAxes />
        </Fig>
        <p>
          じつは3Dのどんな向きの変化も、軸を1本うまく選べば「その軸のまわりに何度か回す」の一言で言える。クォータニオンは、この軸と角度を4つの数{' '}
          (<span className="c-w">w</span>, <span className="c-x">x</span>,{' '}
          <span className="c-y">y</span>, <span className="c-z">z</span>)
          にまとめたもの。下の機体を回して、4つの数がどう変わるか見てみよう。
        </p>
      </header>

      <Stage label="黄色い軸のまわりに機体が回る3D図">
        <AxisAngleScene axis={axis} angle={rad(theta)} q={q} />
      </Stage>

      <div className="panel">
        <div className="controls">
          <Slider
            label="角度 θ（どれだけ回すか）"
            value={theta}
            min={0}
            max={360}
            onChange={setTheta}
          />
          <Slider
            label="軸の方位（軸を横に振る）"
            value={azimuth}
            min={0}
            max={360}
            swatch="var(--w)"
            onChange={setAzimuth}
          />
          <Slider
            label="軸の仰角（軸を縦に起こす）"
            value={elevation}
            min={-90}
            max={90}
            swatch="var(--w)"
            onChange={setElevation}
          />
          <div className="buttons" role="group" aria-label="軸をそろえる">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                aria-pressed={p.azimuth === azimuth && p.elevation === elevation}
                onClick={() => {
                  setAzimuth(p.azimuth);
                  setElevation(p.elevation);
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="readout">
          <QuatReadout q={q} />
          <HalfAngleDial theta={theta} />
        </div>
      </div>

      <div className="notes">
        <TryIt>
          <li>
            「角度 θ」だけを動かす。機体が黄色い軸のまわりを回り、<span className="c-w">w</span> が
            1 からだんだん小さくなる。
          </li>
          <li>
            θ を 180° にする。ちょうど半回転で、<span className="c-w">w</span> は 0 になる。
          </li>
          <li>
            θ はそのままで「軸の方位」を動かす。<span className="c-w">w</span> は変わらず、
            <span className="c-x">x</span>・<span className="c-y">y</span>・
            <span className="c-z">z</span> だけが変わる。
          </li>
          <li>
            「X軸」ボタンを押す。<span className="c-y">y</span> と <span className="c-z">z</span> が
            0 になり、<span className="c-x">x</span> だけが残る。
          </li>
        </TryIt>

        <h3>4つの数は、2つの役に分かれている</h3>
        <dl className="parts">
          <div>
            <dt>
              <span className="c-w">w</span> は「どれだけ回したか」
            </dt>
            <dd>
              回していないとき 1。半回転（180°）で 0。1回転（360°）で
              −1。軸がどっちを向いていても関係なく、回した量だけで決まる。
            </dd>
          </div>
          <div>
            <dt>
              (<span className="c-x">x</span>, <span className="c-y">y</span>,{' '}
              <span className="c-z">z</span>) は「どの軸のまわりに回したか」
            </dt>
            <dd>
              黄色い軸と同じ向きを指す矢印。軸が X の向きなら <span className="c-x">x</span>{' '}
              だけが大きくなる。矢印の長さは回した量で変わり、回していないとき
              0、半回転でいちばん長い 1 になる。
            </dd>
          </div>
        </dl>

        <h3>文字盤の読み方</h3>
        <p>
          <span className="c-w">w</span>{' '}
          と矢印の長さは、片方が減るともう片方が増える関係にある。文字盤はそれを1本の針で表している。針の長さはいつも
          1。針が寝ているほど横の影（<span className="c-w">w</span>
          ）が長く、針が立つほど縦の影（矢印の長さ）が長い。
        </p>
        <Fig caption="上が機体の向き、下が針。機体が半回転（180°）しても、針は 90° しか進まない。針は機体の半分の速さで回る。">
          <TurnStrip angles={[0, 90, 180, 270, 360]} />
        </Fig>
        <p>
          この「半分の速さ」がクォータニオンのいちばんの特徴で、次のタブ「ふた回り」の話につながる。
        </p>

        <Deeper>
          <p>
            軸の向きを長さ 1 の矢印 <var>n</var>、角度を <var>θ</var> とすると、
          </p>
          <p className="formula">
            <var>q</var> ={' '}
            <span className="c-w">
              cos(<var>θ</var>/2)
            </span>{' '}
            + sin(<var>θ</var>/2) (
            <span className="c-x">
              <var>n</var>
              <sub>x</sub> <b>i</b>
            </span>{' '}
            +{' '}
            <span className="c-y">
              <var>n</var>
              <sub>y</sub> <b>j</b>
            </span>{' '}
            +{' '}
            <span className="c-z">
              <var>n</var>
              <sub>z</sub> <b>k</b>
            </span>
            )
          </p>
          <p>いまのスライダーの値を当てはめると、こうなる。</p>
          <table className="breakdown">
            <tbody>
              <tr>
                <th scope="row" className="c-w">
                  w
                </th>
                <td className="how">cos({half}°)</td>
                <td className="val">{fmt(q.w)}</td>
              </tr>
              {(['x', 'y', 'z'] as const).map((k, i) => (
                <tr key={k}>
                  <th scope="row" className={`c-${k}`}>
                    {k}
                  </th>
                  <td className="how">
                    sin({half}°) × {fmt(axis[i] as number)}
                  </td>
                  <td className="val">{fmt(q[k])}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            cos と sin は、文字盤の針の「横の影」と「縦の影」の長さのこと。針の長さが 1
            なので、4つの数をそれぞれ2乗して足すといつも 1 になる。
          </p>
          <p>
            針の傾きが <var>θ</var> ではなく <var>θ</var>/2 なのは、ベクトル <var>v</var>{' '}
            を回すときに{' '}
            <span className="formula-inline">
              <var>v</var>′ = <var>q</var> <var>v</var> <var>q</var>
              <sup>−1</sup>
            </span>{' '}
            と <var>q</var> で両側からはさむから。片側が <var>θ</var>/2 ずつ受け持って、合わせて{' '}
            <var>θ</var> になる。
          </p>
        </Deeper>
      </div>
    </section>
  );
}
