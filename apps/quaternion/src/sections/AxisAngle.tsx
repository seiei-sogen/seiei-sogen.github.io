import { lazy, useMemo, useState } from 'react';
import { HalfAngleDial } from '../components/HalfAngleDial';
import { QuatReadout } from '../components/QuatReadout';
import { Slider } from '../components/Slider';
import { Stage } from '../components/Stage';
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
        <h2 id="axis-angle">軸と角度</h2>
        <p>
          どんな3D回転も「ある軸のまわりに、ある角度だけ回す」の一言で言い切れる。クォータニオンは、その軸{' '}
          <var>n</var> と角度 <var>θ</var> を4つの数にたたんだもの。
        </p>
      </header>

      <Stage label="黄色い軸のまわりに機体が回る3D図">
        <AxisAngleScene axis={axis} angle={rad(theta)} q={q} />
      </Stage>

      <div className="panel">
        <div className="controls">
          <Slider label="角度 θ" value={theta} min={0} max={360} onChange={setTheta} />
          <Slider
            label="軸の方位"
            value={azimuth}
            min={0}
            max={360}
            swatch="var(--w)"
            onChange={setAzimuth}
          />
          <Slider
            label="軸の仰角"
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
          <table className="breakdown">
            <caption className="hint">
              4つの数の内訳。sin に掛けているのは軸 <var>n</var> の成分
            </caption>
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
          <HalfAngleDial theta={theta} />
        </div>
      </div>

      <div className="notes">
        <dl className="parts">
          <div>
            <dt>
              <span className="c-w">w</span> は「どれだけ回したか」
            </dt>
            <dd>
              回していないとき 1、半回転（180°）で 0、1回転（360°）で −1。角度 <var>θ</var>{' '}
              だけで決まり、軸の向きには関係しない。上で軸のスライダーだけを動かしても{' '}
              <span className="c-w">w</span> は変わらない。
            </dd>
          </div>
          <div>
            <dt>
              (<span className="c-x">x</span>, <span className="c-y">y</span>,{' '}
              <span className="c-z">z</span>) は「どの軸で回したか」
            </dt>
            <dd>
              黄色い回転軸 <var>n</var> と同じ向きの矢印。長さは回した量で変わり、回していないとき
              0、半回転でいちばん長い 1 になる。
            </dd>
          </div>
        </dl>
        <p>
          文字盤は、この2つの取り分を表している。長さ 1 の針が <var>θ</var>/2 だけ傾き、針の横の影が{' '}
          <span className="c-w">w</span>、縦の影が (<span className="c-x">x</span>,{' '}
          <span className="c-y">y</span>, <span className="c-z">z</span>)
          の長さ。回すほど横の影が縮み、そのぶん縦の影が伸びる。針の長さは変わらないので、4つの数の2乗和はいつも
          1 になる。
        </p>
        <p>
          針の傾きが <var>θ</var> ではなく <var>θ</var>/2 なのは、ベクトル <var>v</var> を回すときに{' '}
          <span className="formula-inline">
            <var>v</var>′ = <var>q</var> <var>v</var> <var>q</var>
            <sup>−1</sup>
          </span>{' '}
          と <var>q</var> で両側からはさむから。片側が <var>θ</var>/2 ずつ受け持って、合わせて{' '}
          <var>θ</var> になる。
        </p>
      </div>
    </section>
  );
}
