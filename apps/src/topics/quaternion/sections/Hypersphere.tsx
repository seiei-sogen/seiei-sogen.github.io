import { For, Match, Show, Switch, createMemo, createSignal, lazy } from 'solid-js';
import { Deeper, TryIt } from '../components/Explain';
import { QuatReadout } from '../components/QuatReadout';
import { Slider } from '../components/Slider';
import { Stage } from '../components/Stage';
import { fmt, fromAxisAngle, rad } from '../lib/quat';
import { projectS1 } from '../lib/stereo';
import { createTween } from '../lib/tween';

const StereoSphereScene = lazy(() => import('../scenes/StereoSphereScene'));
const HypersphereScene = lazy(() => import('../scenes/HypersphereScene'));

type Level = 1 | 2 | 3;

const LEVELS: { level: Level; label: string }[] = [
  { level: 1, label: '① 円を線に' },
  { level: 2, label: '② 球を板に' },
  { level: 3, label: '③ 4次元の球を空間に' },
];

export function Hypersphere() {
  const [level, setLevel] = createSignal<Level>(1);

  return (
    <section class="demo" aria-labelledby="hypersphere">
      <header class="demo-head">
        <h2 id="hypersphere">
          <span>4つの数は、</span>
          <span>4次元の球の上にいる</span>
        </h2>
        <p>
          クォータニオンは4つの数でできていて、それぞれを2乗して足すといつも 1
          になる。これは「4次元の世界にある球の表面にいる」ということ。その球の上で <var>q</var>{' '}
          がどう動くかが見えれば、ここまでの話が1枚の絵にまとまる。
        </p>
        <p>
          ただ、4次元は目で見られない。そこで、1つ低い次元に「写して」見る。いきなり4次元は難しいので、円、球、4次元の球の順に、同じやり方で1段ずつ上がっていく。
        </p>
        <div class="buttons subtabs" role="group" aria-label="段階を選ぶ">
          <For each={LEVELS}>
            {(l) => (
              <button
                type="button"
                aria-pressed={level() === l.level}
                onClick={() => setLevel(l.level)}
              >
                {l.label}
              </button>
            )}
          </For>
        </div>
      </header>

      <Switch>
        <Match when={level() === 1}>
          <CircleLevel onNext={() => setLevel(2)} />
        </Match>
        <Match when={level() === 2}>
          <SphereLevel onNext={() => setLevel(3)} />
        </Match>
        <Match when={level() === 3}>
          <HypersphereLevel />
        </Match>
      </Switch>
    </section>
  );
}

/** まん中からの距離の表示。写せないときは「無限の遠く」 */
const distanceText = (d: number | null) => (d === null || d > 99 ? '無限の遠く' : fmt(d, 2));

// ---------- ① 円を線に ----------

const CX = 200;
const CY = 125;
const UNIT = 62;
const DOTS = Array.from({ length: 12 }, (_, k) => k);

function CircleLevel(props: { onNext: () => void }) {
  const [alpha, setAlpha] = createSignal(40);
  const oneImage = () => projectS1(rad(alpha()));

  return (
    <>
      <div class="stage flat-stage">
        <svg
          viewBox="0 0 400 222"
          role="img"
          aria-label="円の上の点を、いちばん下から見て横線に写す図"
        >
          {/* 写す先の線と、円 */}
          <line x1={0} y1={CY} x2={400} y2={CY} stroke="#9aa6c8" stroke-width={1.5} />
          <circle cx={CX} cy={CY} r={UNIT} fill="none" stroke="#5b6890" stroke-width={1.5} />

          <For each={DOTS}>
            {(k) => {
              const main = k === 0;
              const color = main ? '#ffffff' : `hsl(${30 * k} 75% 68%)`;
              const phi = () => rad(30 * k + alpha());
              const px = () => CX + UNIT * Math.sin(phi());
              const py = () => CY - UNIT * Math.cos(phi());
              const ix = () => {
                const image = projectS1(phi());
                return image === null ? null : CX + UNIT * image;
              };
              // 目（円のいちばん下）から点を通ってのびる視線。遠くへ飛ぶ点は画面の外まで引く
              const end = (): [number, number] => {
                const lower = py() > CY;
                const x = ix();
                if (lower && x !== null) return [x, CY];
                if (lower) return [CX + (px() - CX) * 40, CY + UNIT + (py() - CY - UNIT) * 40];
                return [px(), py()];
              };
              return (
                <g>
                  <line
                    x1={CX}
                    y1={CY + UNIT}
                    x2={end()[0]}
                    y2={end()[1]}
                    stroke={color}
                    stroke-width={main ? 1.5 : 0.75}
                    opacity={main ? 0.9 : 0.35}
                  />
                  <circle cx={px()} cy={py()} r={main ? 6 : 3.5} fill={color} />
                  <Show when={ix() !== null}>
                    <circle
                      cx={ix() ?? 0}
                      cy={CY}
                      r={main ? 6 : 3.5}
                      fill={color}
                      stroke="#172038"
                      stroke-width={1.5}
                    />
                  </Show>
                  <Show when={main}>
                    <text x={px() + 9} y={py() - 7} fill="#ffffff" font-size="14" font-weight="700">
                      1
                    </text>
                  </Show>
                </g>
              );
            }}
          </For>

          {/* 目 */}
          <circle cx={CX} cy={CY + UNIT} r={5.5} fill="#ff6b6b" />
          <text x={CX} y={CY + UNIT + 22} fill="#e8ecf5" font-size="12" text-anchor="middle">
            −1（ここから見る）
          </text>
          <text x={394} y={CY - 8} fill="#9aa6c8" font-size="11" text-anchor="end">
            写す先の線
          </text>
        </svg>
      </div>

      <div class="panel">
        <div class="controls">
          <Slider label="円を回す角度" value={alpha()} min={0} max={360} onChange={setAlpha} />
        </div>
        <div class="readout">
          <p class="vec">
            白い点「1」が写る場所: まん中から{' '}
            {distanceText(oneImage() === null ? null : Math.abs(oneImage() as number))}
          </p>
        </div>
      </div>

      <div class="notes">
        <p>
          まずは円で練習する。円のいちばん下（−1）に目を置く。そこから円の上の点を見たとき、まん中を通る横線のどこに重なって見えるか。その場所に点を「写す」。図では、目から点へ引いた線が横線とぶつかる所に、同じ色の点を打ってある。
        </p>
        <TryIt>
          <li>スライダーを 0° にする。白い点「1」は円のてっぺんにいて、写る先は線のまん中。</li>
          <li>少しずつ回す。円の上の点はどれも同じ速さで回るのに、線の上の点は速さがばらばら。</li>
          <li>
            180°
            に近づける。白い点が目の場所（−1）に近づくにつれ、写る先はどんどん遠くへ飛んでいく。180°
            ちょうどで無限の遠く。
          </li>
          <li>180° を超える。白い点の写る先が、反対側の遠くから戻ってくる。</li>
        </TryIt>
        <h3>ここで覚えておくこと</h3>
        <ul class="plain-list">
          <li>てっぺんの「1」は、線のまん中に写る。</li>
          <li>円の上半分は線の内側（円の幅の中）に、下半分は外側に写る。</li>
          <li>
            いちばん下の「−1」は、無限の遠くに写る。線の右の果てと左の果ては、じつは同じ1点（−1）につながっている。
          </li>
        </ul>
        <div class="buttons">
          <button type="button" class="primary" onClick={props.onNext}>
            次の「② 球を板に」へ進む
          </button>
        </div>
      </div>
    </>
  );
}

// ---------- ② 球を板に ----------

function SphereLevel(props: { onNext: () => void }) {
  const [alpha, setAlpha] = createSignal(0);
  const d = () => (Math.abs(alpha() - 180) < 0.5 ? null : Math.abs(Math.tan(rad(alpha()) / 2)));

  return (
    <>
      <Stage label="球の上の輪を、南極から見て赤道の高さの板に写す3D図">
        <StereoSphereScene alpha={rad(alpha())} />
      </Stage>

      <div class="panel">
        <div class="controls">
          <Slider label="球を回す角度" value={alpha()} min={0} max={360} onChange={setAlpha} />
        </div>
        <div class="readout">
          <p class="vec">白い点「1」が写る場所: まん中から {distanceText(d())}</p>
        </div>
      </div>

      <div class="notes">
        <p>
          次は球。やり方は円のときと同じで、球のいちばん下（南極、−1）に目を置き、球の上の点を、赤道の高さにある板に写す。丸い地球を1枚の地図にするのと同じ考え方。球の上の細い線が元の輪、板の上の太い線がその写った姿。
        </p>
        <TryIt>
          <li>
            まず 0°
            のまま見る。北半球の輪（黄色）は板の内側の小さな輪に、南半球の輪（青）は外側の大きな輪に写っている。
          </li>
          <li>
            球を回す。輪は球の上では形を変えずに回っているだけなのに、板の上では大きくなったり小さくなったりする。
          </li>
          <li>
            輪が目の場所（南極）を通る瞬間、板の上ではまっすぐな線になる。無限に大きい輪は、直線に見える。
          </li>
          <li>白い点「1」（北極）を追う。まん中から外へ出ていき、180° で無限の遠くへ飛ぶ。</li>
        </TryIt>
        <h3>ここで覚えておくこと</h3>
        <ul class="plain-list">
          <li>円のときと同じことが、1つ上の次元で起きている。</li>
          <li>北半球は点線の輪の内側、南半球は外側、南極「−1」は無限の遠く。</li>
          <li>目の場所を通る輪は、直線に写る。</li>
        </ul>
        <div class="buttons">
          <button type="button" class="primary" onClick={props.onNext}>
            次の「③ 4次元の球を空間に」へ進む
          </button>
        </div>
      </div>
    </>
  );
}

// ---------- ③ 4次元の球を空間に ----------

const AXES = [
  { key: 'i', axis: [1, 0, 0], color: 'var(--x)', name: '赤' },
  { key: 'j', axis: [0, 1, 0], color: 'var(--y)', name: '緑' },
  { key: 'k', axis: [0, 0, 1], color: 'var(--z)', name: '青' },
] as const;

function whereIsOne(theta: number, name: string): string {
  if (theta === 0) return '白い点「1」はまん中にいる。まだ何も回していない。';
  if (theta < 180) return `「1」が${name}の線に沿って、球の表面へ向かっている。`;
  if (theta === 180) return '「1」が球の表面に着いた。ここは半回転（180°）の場所で、w は 0。';
  if (theta < 360) return '球の外へ出た。ここから先は w がマイナスの世界。どんどん遠くへ行く。';
  if (theta === 360)
    return '「1」は無限の遠く（−1）へ飛んだ。機体は1回転して元の向きなのに、q はまん中の正反対にいる。';
  if (theta < 540) return '反対側の遠くから戻ってくる。';
  if (theta === 540) return '反対側から球の表面に戻ってきた。';
  if (theta < 720) return '球の内側に入った。まん中へ帰っていく。';
  return 'まん中に帰ってきた。2回転で、やっと元通り。';
}

function HypersphereLevel() {
  const [axisKey, setAxisKey] = createSignal<(typeof AXES)[number]['key']>('i');
  const tween = createTween();
  const theta = () => Math.round(tween.value() * 720);

  const axis = () => AXES.find((a) => a.key === axisKey()) ?? AXES[0];
  const q = createMemo(() => fromAxisAngle(axis().axis, rad(theta())));
  const d = () => (theta() === 360 ? null : Math.abs(Math.tan(rad(theta()) / 4)));

  return (
    <>
      <Stage label="4次元の球の上の輪を3次元の空間に写し、q を掛けると全体が動く3D図">
        <HypersphereScene q={q()} />
      </Stage>

      <div class="panel">
        <div class="controls">
          <div class="buttons" role="group" aria-label="どの軸で回すか">
            <For each={AXES}>
              {(a) => (
                <button
                  type="button"
                  aria-pressed={a.key === axisKey()}
                  onClick={() => setAxisKey(a.key)}
                >
                  <span class="swatch" style={{ background: a.color }} aria-hidden="true" />
                  {a.key} の軸
                </button>
              )}
            </For>
          </div>
          <Slider
            label="機体の回転角 θ"
            value={theta()}
            min={0}
            max={720}
            onChange={(v) => tween.set(v / 720)}
          />
          <div class="buttons">
            <button
              type="button"
              class="primary"
              disabled={tween.running()}
              onClick={() => tween.play(9000)}
            >
              0° から 720° まで再生する
            </button>
          </div>
          <p class="status" aria-live="polite">
            {whereIsOne(theta(), axis().name)}
          </p>
        </div>
        <div class="readout">
          <QuatReadout q={q()} />
          <p class="vec">白い点「1」が写る場所: まん中から {distanceText(d())}</p>
        </div>
      </div>

      <div class="notes">
        <p>
          いよいよ本番。4次元の球を、同じやり方で3次元の空間に写したのがこの図。目を置く場所は
          −1。球の表面にあったものは、今度は空間いっぱいに広がる。
        </p>
        <h3>この空間の読み方</h3>
        <ul class="plain-list">
          <li>
            まん中の白い点が <var>q</var> = 1。「回していない」を表す。
          </li>
          <li>
            うすい網の球の表面が、<span class="c-w">w</span> が 0
            の場所。半回転（180°）の回転がここに並んでいる。表面のどこにいるかが、軸の向き。
          </li>
          <li>
            球の内側は <span class="c-w">w</span> がプラス、外側は <span class="c-w">w</span>{' '}
            がマイナス。−1 は無限の遠く。
          </li>
          <li>
            赤・緑・青のまっすぐな線は、i・j・k
            の向き。本当は「1」と「−1」を通る大きな輪で、「−1」が無限の遠くにあるので直線に見えている（②で見たとおり）。
          </li>
        </ul>

        <TryIt>
          <li>
            「i の軸」を選んで再生する。機体を X 軸のまわりに回していくときの <var>q</var>{' '}
            を、全部の点に掛けている。
          </li>
          <li>
            白い点「1」を追う。赤い線に沿ってまん中から出発し、球の表面（180°）を通りぬけ、遠くへ飛んでいく（360°）。そして反対側から戻ってきて、720°
            でまん中に帰る。
          </li>
          <li>
            同時に、赤い輪の上の点（緑の j や青の k）が、輪に沿ってぐるっと回っているのを見る。
          </li>
          <li>「j の軸」「k の軸」に替えても、同じことが別の向きで起きる。</li>
        </TryIt>

        <h3>ここまでの話が、1枚の絵になる</h3>
        <ul class="plain-list">
          <li>
            タブ1の「<span class="c-w">w</span>{' '}
            はどれだけ回したか」は、ここでは「まん中からどれだけ離れたか」。
          </li>
          <li>
            タブ2の「1回転では戻らない」は、ここでは「360°
            ではまだ無限の遠くにいて、まん中に帰るには 720° かかる」。
          </li>
          <li>タブ3の slerp は、この空間の中の2点を、4次元の球の上でいちばん短い道で結ぶこと。</li>
        </ul>

        <h3>4次元の回転は、2つの回転が同時に起きる</h3>
        <p>
          3次元の回転は、1本の軸のまわりを回るだけだった。ところが <var>q</var>{' '}
          を掛けたときの動きは、「選んだ色の線に沿って点が流れる動き」と「その線を取り巻く同じ色の輪が回る動き」が、同じ速さで同時に起きている。4次元では、たがいに関係のない2つの回転を同時に行える。
        </p>

        <Deeper>
          <p>
            写し方は立体射影（ステレオ投影）という。4次元の球の点 (<var>w</var>, <var>x</var>,{' '}
            <var>y</var>, <var>z</var>) を、−1 から見て <var>w</var> = 0 の空間に写す。
          </p>
          <p class="formula">
            (<var>w</var>, <var>x</var>, <var>y</var>, <var>z</var>) → (<var>x</var>, <var>y</var>,{' '}
            <var>z</var>) / (1 + <var>w</var>)
          </p>
          <p>
            図では、全部の点 <var>p</var> に左から <var>q</var> を掛けた <var>q</var>
            <var>p</var> を写している。これは 1
            と軸を含む平面の回転と、それに直交する平面の回転が、同じ角度 <var>θ</var>/2
            だけ同時に起きる動きになる。
          </p>
          <p>
            機体を回すときの式は{' '}
            <span class="formula-inline">
              <var>q</var> <var>v</var> <var>q</var>
              <sup>−1</sup>
            </span>{' '}
            で、左からも右からも掛ける。すると「線に沿って流れる動き」は打ち消し合い、「輪が回る動き」は2倍になる。だから機体は軸のまわりに{' '}
            <var>θ</var>/2 の2倍、つまり <var>θ</var>{' '}
            だけ回る。半分の角度が出てくる理由がここにある。
          </p>
          <p>
            この見せ方は、3Blue1Brown と Ben Eater の「
            <a href="https://eater.net/quaternions" rel="noreferrer">
              Visualizing quaternions
            </a>
            」にならっている。
          </p>
        </Deeper>
      </div>
    </>
  );
}
