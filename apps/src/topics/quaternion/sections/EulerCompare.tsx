import { Show, createMemo, createSignal, lazy } from 'solid-js';
import { Deeper, Fig, TryIt } from '../components/Explain';
import { QuatReadout } from '../components/QuatReadout';
import { Slider } from '../components/Slider';
import { Stage } from '../components/Stage';
import { GimbalSchematic } from '../figures/GimbalSchematic';
import { PathCompare } from '../figures/PathCompare';
import { IDENTITY, angleBetween, deg, fromEulerXYZ, rad, slerp, type Quat } from '../lib/quat';
import { createTween } from '../lib/tween';

const GimbalScene = lazy(() => import('../scenes/GimbalScene'));
const InterpScene = lazy(() => import('../scenes/InterpScene'));

type Mode = 'gimbal' | 'interp';

export function EulerCompare() {
  const [mode, setMode] = createSignal<Mode>('gimbal');

  return (
    <section class="demo" aria-labelledby="euler-compare">
      <header class="demo-head">
        <h2 id="euler-compare">
          <span>3つの角度で表すと、</span>
          <span>困ることがある</span>
        </h2>
        <p>
          向きを表すいちばん身近な方法は、角度を3つ使うやり方。人の頭でいえば「首を横に振る」「うなずく」「首をかしげる」の3つを、決まった順番で行う。これをオイラー角という。
        </p>
        <p>
          わかりやすいけれど、困ることが2つある。ある向きで軸どうしが重なってしまうことと、2つの向きのあいだをきれいにつなげないこと。クォータニオンはこの2つを解決するために使われている。
        </p>
        <div class="buttons subtabs" role="group" aria-label="見る実験を選ぶ">
          <button
            type="button"
            aria-pressed={mode() === 'gimbal'}
            onClick={() => setMode('gimbal')}
          >
            困りごと1: 軸が重なる
          </button>
          <button
            type="button"
            aria-pressed={mode() === 'interp'}
            onClick={() => setMode('interp')}
          >
            困りごと2: 遠回りする
          </button>
        </div>
      </header>

      <Show when={mode() === 'gimbal'} fallback={<Interp />}>
        <Gimbal />
      </Show>
    </section>
  );
}

function Gimbal() {
  const [x, setX] = createSignal(30);
  const [y, setY] = createSignal(20);
  const [z, setZ] = createSignal(0);

  const q = createMemo(() => fromEulerXYZ(rad(x()), rad(y()), rad(z())));
  const gap = () => 90 - Math.abs(y());
  const locked = () => gap() === 0;

  return (
    <>
      <Stage label="3つの入れ子の輪（ジンバル）の中に機体がある3D図">
        <GimbalScene x={rad(x())} y={rad(y())} z={rad(z())} />
      </Stage>

      <div class="panel">
        <div class="controls">
          <Slider
            label="外側の輪 X"
            value={x()}
            min={-180}
            max={180}
            swatch="var(--x)"
            onChange={setX}
          />
          <Slider
            label="中間の輪 Y"
            value={y()}
            min={-90}
            max={90}
            swatch="var(--y)"
            onChange={setY}
          />
          <Slider
            label="内側の輪 Z"
            value={z()}
            min={-180}
            max={180}
            swatch="var(--z)"
            onChange={setZ}
          />
          <div class="buttons">
            <button
              type="button"
              class="primary"
              aria-pressed={y() === 90}
              onClick={() => setY(90)}
            >
              中間の輪を 90° にする
            </button>
          </div>
        </div>

        <div class="readout">
          <p class="vec">赤い軸（X）と青い軸（Z）の開き = {gap()}°</p>
          <p class={locked() ? 'status status-alert' : 'status'} aria-live="polite">
            {locked()
              ? 'ロックした。X と Z のスライダーが同じ回り方になり、機体を回せる向きが1つ減っている。'
              : gap() <= 15
                ? '赤い軸と青い軸がほとんど重なっている。X と Z の効き方が似てきた。'
                : '3本の軸が別々の向きを向いているので、機体をどの向きにも回せる。'}
          </p>
          <QuatReadout q={q()} />
        </div>
      </div>

      <div class="notes">
        <TryIt>
          <li>「内側の輪 Z」を動かす。機体が青い軸のまわりを回る。</li>
          <li>「外側の輪 X」を動かす。機体は赤い軸のまわりを回る。さっきとは違う動き。</li>
          <li>「中間の輪を 90° にする」を押す。青い軸が倒れて、赤い軸にぴったり重なる。</li>
          <li>
            もう一度 X と Z を動かす。どちらを動かしても、機体は同じ回り方しかしなくなっている。
          </li>
        </TryIt>

        <h3>何が起きたのか</h3>
        <p>
          輪は外側から X・Y・Z
          の順に入れ子になっていて、外の輪を回すと中の輪もいっしょに動く。だから中間の輪を 90°
          倒すと、内側の輪の軸（青）が外側の輪の軸（赤）と同じ向きになってしまう。
        </p>
        <Fig caption="軸は3本あるのに、2本が同じ向きになると、回せる向きは2つしか残らない。これをジンバルロックという。">
          <GimbalSchematic />
        </Fig>
        <p>
          カメラの三脚でも同じことが起きる。カメラを真上に向けると、「左右に振る」と「かたむける」が同じ動きになって、思った向きに動かせなくなる。
        </p>
        <p>
          クォータニオンは向きを「軸1本と角度1つ」でまとめて持っているので、軸どうしが重なるということが起きない。上の{' '}
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
  const tween = createTween();
  const t = tween.value;
  const eulerSpeed = () => speedAt(eulerAt, t()) / SLERP_TOTAL;

  return (
    <>
      <Stage label="2機の機体が同じ姿勢から同じ姿勢へ、別々の道を通って回る3D図">
        <InterpScene
          slerpNow={slerpAt(t())}
          eulerNow={eulerAt(t())}
          slerpPath={SLERP_PATH}
          eulerPath={EULER_PATH}
        />
      </Stage>

      <div class="panel">
        <div class="controls">
          <Slider
            label="進み具合 t"
            value={Math.round(t() * 100)}
            min={0}
            max={100}
            unit="%"
            onChange={(v) => tween.set(v / 100)}
          />
          <div class="buttons">
            <button
              type="button"
              class="primary"
              disabled={tween.running()}
              onClick={() => tween.play(4500)}
            >
              最初から再生する
            </button>
          </div>
        </div>

        <div class="readout">
          <table class="compare">
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
                  <span class="swatch" style={{ background: 'var(--slerp)' }} aria-hidden="true" />
                  クォータニオン
                </th>
                <td>{SLERP_TOTAL.toFixed(0)}°</td>
                <td>1.00</td>
              </tr>
              <tr>
                <th scope="row">
                  <span class="swatch" style={{ background: 'var(--euler)' }} aria-hidden="true" />
                  オイラー角
                </th>
                <td>{EULER_TOTAL.toFixed(0)}°</td>
                <td>{eulerSpeed().toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <p class="hint">速さは、黄色（クォータニオン）を 1 としたときの比。</p>
        </div>
      </div>

      <div class="notes">
        <TryIt>
          <li>「最初から再生する」を押す。2機が同じ向きから出発して、同じ向きに着く。</li>
          <li>黄色い機体（クォータニオン）を見る。1本の軸のまわりを、同じ速さですっと回る。</li>
          <li>
            ピンクの機体（オイラー角）を見る。途中でぐらっと大回りして、速くなったり遅くなったりする。
          </li>
          <li>表の「回った角度」をくらべる。ピンクのほうがずっと多く回っている。</li>
        </TryIt>

        <h3>何をくらべているのか</h3>
        <p>
          ゲームやアニメでは「向き A から向き B
          へ、なめらかに回す」ことがよくある。そのためには、途中の向きを少しずつ作らないといけない。
        </p>
        <Fig caption="同じ A から同じ B へ行くのに、道が2通りある。線は機首の先が通ったあと。">
          <PathCompare shortest={Math.round(SLERP_TOTAL)} detour={Math.round(EULER_TOTAL)} />
        </Fig>
        <p>
          オイラー角でやると、3つの角度を別々に少しずつ増やすことになる。3つの回転がばらばらに進むので、全体としては遠回りになる。
        </p>
        <p>
          クォータニオンでやると、A から B
          へいちばん短い道をまっすぐ進める。1本の軸のまわりを同じ速さで回るだけなので、動きが自然に見える。このつなぎ方を
          slerp（スラープ）という。
        </p>

        <Deeper>
          <p>
            オイラー角のほうは (0°, 0°, 0°) から ({B_EULER[0]}°, {B_EULER[1]}°, {B_EULER[2]}°)
            まで、3つの角度をそれぞれ線形補間している。
          </p>
          <p>
            slerp は球面線形補間（spherical linear interpolation）の略。<var>q</var>{' '}
            は4次元の球の上の点なので、2つの <var>q</var>{' '}
            を球の上の最短の弧で結ぶ。弧の上を一定の速さで進むと、回転も一定の速さになる。4次元の球については、次のタブ「四次元」で見る。
          </p>
        </Deeper>
      </div>
    </>
  );
}
