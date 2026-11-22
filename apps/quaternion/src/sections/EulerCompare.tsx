import { lazy, useMemo, useState } from 'react';
import { QuatReadout } from '../components/QuatReadout';
import { Slider } from '../components/Slider';
import { Stage } from '../components/Stage';
import { IDENTITY, angleBetween, deg, fromEulerXYZ, rad, slerp, type Quat } from '../lib/quat';
import { useTween } from '../lib/useTween';

const GimbalScene = lazy(() => import('../scenes/GimbalScene'));
const InterpScene = lazy(() => import('../scenes/InterpScene'));

type Mode = 'gimbal' | 'interp';

export function EulerCompare() {
  const [mode, setMode] = useState<Mode>('gimbal');

  return (
    <section className="demo" aria-labelledby="euler-compare">
      <header className="demo-head">
        <h2 id="euler-compare">オイラー角とくらべる</h2>
        <p>
          オイラー角は、3つの軸を決まった順番で回して姿勢を表す。直感的だが弱点が2つある。ある姿勢で軸が重なってしまうことと、2つの姿勢のあいだをなめらかにつなげないこと。
        </p>
        <div className="buttons subtabs" role="group" aria-label="見る実験を選ぶ">
          <button type="button" aria-pressed={mode === 'gimbal'} onClick={() => setMode('gimbal')}>
            ジンバルロック
          </button>
          <button type="button" aria-pressed={mode === 'interp'} onClick={() => setMode('interp')}>
            補間をくらべる
          </button>
        </div>
      </header>

      {mode === 'gimbal' ? <Gimbal /> : <Interp />}
    </section>
  );
}

function Gimbal() {
  const [x, setX] = useState(30);
  const [y, setY] = useState(20);
  const [z, setZ] = useState(0);

  const q = useMemo(() => fromEulerXYZ(rad(x), rad(y), rad(z)), [x, y, z]);
  const gap = 90 - Math.abs(y);
  const locked = gap === 0;

  return (
    <>
      <Stage label="3つの入れ子の輪（ジンバル）の中に機体がある3D図">
        <GimbalScene x={rad(x)} y={rad(y)} z={rad(z)} />
      </Stage>

      <div className="panel">
        <div className="controls">
          <Slider
            label="外側の輪 X"
            value={x}
            min={-180}
            max={180}
            swatch="var(--x)"
            onChange={setX}
          />
          <Slider
            label="中間の輪 Y"
            value={y}
            min={-90}
            max={90}
            swatch="var(--y)"
            onChange={setY}
          />
          <Slider
            label="内側の輪 Z"
            value={z}
            min={-180}
            max={180}
            swatch="var(--z)"
            onChange={setZ}
          />
          <div className="buttons">
            <button
              type="button"
              className="primary"
              aria-pressed={y === 90}
              onClick={() => setY(90)}
            >
              中間の輪を 90° にする
            </button>
          </div>
        </div>

        <div className="readout">
          <p className="vec">X 軸と Z 軸のなす角 = {gap}°</p>
          <p className={locked ? 'status status-alert' : 'status'} aria-live="polite">
            {locked
              ? 'ロックした。X と Z のスライダーが同じ軸まわりの回転になり、機体を回せる向きが1つ減っている。'
              : gap <= 15
                ? '赤い軸と青い軸がほとんど重なっている。X と Z の効き方が似てきた。'
                : '3本の軸が別々の向きを向いているので、機体をどの向きにも回せる。'}
          </p>
          <QuatReadout q={q} />
        </div>
      </div>

      <div className="notes">
        <p>
          輪は外側から X・Y・Z の順に入れ子になっている。中間の輪を 90°
          倒すと、内側の輪の軸（青）が外側の輪の軸（赤）に重なる。3つあったはずの回転の自由が2つに減る。これがジンバルロック。
        </p>
        <p>
          クォータニオンは回転を「1本の軸と1つの角度」のまま持っているので、軸どうしが重なってつぶれる姿勢がない。上の{' '}
          <var>q</var> は、ロックした瞬間もふつうに1つの値を指している。
        </p>
      </div>
    </>
  );
}

// 補間の例。A は基準の姿勢、B はオイラー角 (150°, 70°, 120°)
const B_EULER = [150, 70, 120] as const;
const Q_A = IDENTITY;
const Q_B = fromEulerXYZ(rad(B_EULER[0]), rad(B_EULER[1]), rad(B_EULER[2]));
const SAMPLES = 120;

const slerpAt = (t: number): Quat => slerp(Q_A, Q_B, t);
/** オイラー角の3つの数を別々に線形補間する */
const eulerAt = (t: number): Quat =>
  fromEulerXYZ(rad(B_EULER[0] * t), rad(B_EULER[1] * t), rad(B_EULER[2] * t));

const SLERP_PATH = Array.from({ length: SAMPLES + 1 }, (_, i) => slerpAt(i / SAMPLES));
const EULER_PATH = Array.from({ length: SAMPLES + 1 }, (_, i) => eulerAt(i / SAMPLES));

/** 道のりの合計（回った角度の総和、度） */
const travelled = (path: readonly Quat[]) =>
  deg(path.slice(1).reduce((sum, q, i) => sum + angleBetween(path[i] as Quat, q), 0));
const SLERP_TOTAL = travelled(SLERP_PATH);
const EULER_TOTAL = travelled(EULER_PATH);

/** t の時点での回転の速さ（度 / 全行程） */
function speedAt(at: (t: number) => Quat, t: number): number {
  const h = 0.002;
  const a = Math.max(0, t - h);
  const b = Math.min(1, t + h);
  return deg(angleBetween(at(a), at(b))) / (b - a);
}

function Interp() {
  const tween = useTween();
  const t = tween.value;
  const eulerSpeed = speedAt(eulerAt, t) / SLERP_TOTAL;

  return (
    <>
      <Stage label="2機の機体が同じ姿勢から同じ姿勢へ、別々の道を通って回る3D図">
        <InterpScene
          slerpNow={slerpAt(t)}
          eulerNow={eulerAt(t)}
          slerpPath={SLERP_PATH}
          eulerPath={EULER_PATH}
        />
      </Stage>

      <div className="panel">
        <div className="controls">
          <Slider
            label="進み具合 t"
            value={Math.round(t * 100)}
            min={0}
            max={100}
            unit="%"
            onChange={(v) => tween.set(v / 100)}
          />
          <div className="buttons">
            <button
              type="button"
              className="primary"
              disabled={tween.running}
              onClick={() => tween.play(4500)}
            >
              最初から再生する
            </button>
          </div>
        </div>

        <div className="readout">
          <table className="compare">
            <thead>
              <tr>
                <th scope="col">方法</th>
                <th scope="col">回った角度</th>
                <th scope="col">いまの速さ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <span
                    className="swatch"
                    style={{ background: 'var(--slerp)' }}
                    aria-hidden="true"
                  />
                  slerp
                </th>
                <td>{SLERP_TOTAL.toFixed(0)}°</td>
                <td>1.00</td>
              </tr>
              <tr>
                <th scope="row">
                  <span
                    className="swatch"
                    style={{ background: 'var(--euler)' }}
                    aria-hidden="true"
                  />
                  オイラー角
                </th>
                <td>{EULER_TOTAL.toFixed(0)}°</td>
                <td>{eulerSpeed.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <p className="hint">速さは slerp を 1 としたときの比。線は機首の先が通る道。</p>
        </div>
      </div>

      <div className="notes">
        <p>
          同じ出発の姿勢から同じ到着の姿勢へ、2通りの方法でつないでいる。オイラー角のほうは (0°, 0°,
          0°) から ({B_EULER[0]}°, {B_EULER[1]}°, {B_EULER[2]}°)
          まで、3つの角度を別々にまっすぐ増やす。クォータニオンのほうは slerp（球面線形補間）で、
          <var>q</var> を4次元の単位球の上の最短の弧に沿って動かす。
        </p>
        <p>
          slerp
          は1本の軸のまわりを一定の速さで回る。これが2つの姿勢を結ぶ最短の回り方になる。オイラー角の補間は途中で回る軸がぶれ、速さも変わり、遠回りをする。
        </p>
      </div>
    </>
  );
}
