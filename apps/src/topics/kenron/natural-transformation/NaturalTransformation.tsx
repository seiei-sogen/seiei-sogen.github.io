import { For, Show, createMemo, createSignal, lazy, onCleanup, onMount } from 'solid-js';
// shortcut: 説明の部品・3Dの枠・tween はクォータニオンのトピックから借りている。圏論のページが増えたら src/shared/ に移す
import { Deeper, Fig, TryIt } from '../../quaternion/components/Explain';
import { Stage } from '../../quaternion/components/Stage';
import { createTween } from '../../quaternion/lib/tween';
import { INITIAL, RECOLORS, SWAPS, randomList, runPaths } from './beads';
import { Beads, Flow, FrameBeads, SquareFigure } from './figures';

const SquareScene = lazy(() => import('./SquareScene'));
const PrismScene = lazy(() => import('./PrismScene'));

/** PrismScene の壁と同じ順 */
const WALLS = ['f', 'g', 'g∘f'] as const;

/** 3Dが画面に入ったら1回だけ動かす（動きを減らす設定の人には動かさない） */
function playWhenSeen(el: Element, play: () => void) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      play();
    },
    { threshold: 0.6 }
  );
  io.observe(el);
  onCleanup(() => io.disconnect());
}

export function NaturalTransformation() {
  const [list, setList] = createSignal(INITIAL);
  // aria-pressed ではオブジェクト同士を === で比べない（プリレンダーでは両辺が文字列にされて全部一致する）。label で比べる
  const [swap, setSwap] = createSignal(SWAPS[0]!);
  const [rule, setRule] = createSignal(RECOLORS[0]!);
  const run = createTween();
  const paths = createMemo(() => runPaths(list(), rule(), swap()));
  const done = () => run.value() >= 1;
  const start = () => run.play(6000);

  const [wall, setWall] = createSignal(0);
  const climb = createTween();
  const showWall = (i: number) => {
    setWall(i);
    climb.play(4000);
  };

  let squareStage: HTMLDivElement | undefined;
  let prismStage: HTMLDivElement | undefined;
  onMount(() => {
    if (squareStage) playWhenSeen(squareStage, start);
    if (prismStage) playWhenSeen(prismStage, () => showWall(0));
  });

  const status = () => {
    if (done())
      return paths().same
        ? 'どちらの道を通っても、同じ結果になった。'
        : '通った道によって、結果がちがう。';
    if (run.running())
      return run.value() < 0.5 ? '1つ目の操作をしているところ。' : '2つ目の操作をしているところ。';
    return '「スタート」を押すと、同じ列が2つ、それぞれの道を進む。';
  };

  return (
    <article class="page">
      <header class="hero">
        <p class="hero-kicker">圏論 その1</p>
        <h1>
          <span>自然変換</span>
        </h1>
        <p class="hero-lead">
          圏論でいちばん大事な考え方のひとつが「自然変換」。名前はむずかしそうだけど、言っていることは
          <strong>「先にやっても、あとにやっても、同じになる」</strong>
          というだけ。ビーズを動かして確かめてみよう。
        </p>
      </header>

      <section class="block" aria-labelledby="nt-container">
        <h2 id="nt-container">「入れ物」と「中身」</h2>
        <p>ビーズを1列に並べたものを考える。並べている「列」が入れ物で、ビーズの色が中身。</p>
        <p>
          入れ物にはいろいろな形がある。何個でも並べられる「列」。1個しか入らない「箱」（空っぽのこともある）。
        </p>
        <Fig caption="左が「列」、右が「箱」。">
          <div class="flow">
            <Beads colors="rbyr" />
            <Beads colors="b" box />
          </div>
        </Fig>
        <p>
          ここで、中身だけを変える操作を考える。たとえば「赤を青に、青を黄に、黄を赤に塗りかえる」。列に使うと、ビーズを1個ずつ塗りかえる。並び方も個数も変わらない。箱に使っても、中のビーズが塗りかわるだけ。
        </p>
        <Fig caption="塗りかえても、入れ物の形はそのまま。">
          <Flow from={<Beads colors="rbyr" />} op="塗りかえ" to={<Beads colors="byrb" />} />
          <Flow from={<Beads colors="r" box />} op="塗りかえ" to={<Beads colors="b" box />} />
        </Fig>
        <p>
          どんな中身にも使えて、中身の塗りかえを、形をこわさずにそのまま受けとめられる入れ物。圏論では、こういう入れ物の作り方を
          <dfn>関手</dfn>（かんしゅ）と呼ぶ。「列にする」も「箱に入れる」も関手のひとつ。
        </p>
      </section>

      <section class="block" aria-labelledby="nt-swap">
        <h2 id="nt-swap">入れ物を取りかえる</h2>
        <p>次は、中身ではなく入れ物のほうを変える操作を考える。</p>
        <Fig caption="上は「先頭の1個だけ箱に入れる」、下は「逆さに並べる」。">
          <Flow from={<Beads colors="rbyr" />} op="先頭だけ" to={<Beads colors="r" box />} />
          <Flow from={<Beads colors="rbyr" />} op="逆さ" to={<Beads colors="rybr" />} />
        </Fig>
        <p>
          どちらも、列を別の入れ物（または並びのちがう列）に取りかえている。この「入れ物の取りかえ」が、自然変換の候補になる。
        </p>
        <p>
          候補、と言ったのは、ある条件を満たすものだけが「自然」と呼ばれるから。その条件を、次の実験で見てみよう。
        </p>
      </section>

      <section class="block" aria-labelledby="nt-square">
        <h2 id="nt-square">順番を入れかえても同じ？</h2>
        <p>塗りかえと取りかえ。この2つをやる順番は2通りある。</p>
        <ul class="ways">
          <li>
            <span class="c-a">ピンクの道</span>：先に塗りかえて、あとで取りかえる
          </li>
          <li>
            <span class="c-b">水色の道</span>：先に取りかえて、あとで塗りかえる
          </li>
        </ul>
        <p>
          どちらの道を通っても同じ結果になるなら、その取りかえは「自然」。同じ列を2つ用意して、それぞれの道を歩かせてみる。左手前がスタート、右奥がゴール。
        </p>

        <div ref={squareStage}>
          <Stage label="同じビーズの列が2つ、ピンクの道（先に塗りかえる）と水色の道（先に取りかえる）を進んで、右奥のゴールで結果を見比べる3D図">
            <SquareScene
              colorFirst={paths().colorFirst}
              swapFirst={paths().swapFirst}
              same={paths().same}
              t={run.value()}
            />
          </Stage>
        </div>

        <div class="panel">
          <div class="buttons" role="group" aria-label="取りかえ方">
            <span class="group-label">取りかえ方</span>
            <For each={SWAPS}>
              {(s) => (
                <button
                  type="button"
                  aria-pressed={swap().label === s.label}
                  onClick={() => {
                    run.set(0);
                    setSwap(s);
                  }}
                >
                  {s.label}
                </button>
              )}
            </For>
          </div>
          <div class="buttons" role="group" aria-label="塗りかえ方">
            <span class="group-label">塗りかえ方</span>
            <For each={RECOLORS}>
              {(r) => (
                <button
                  type="button"
                  aria-pressed={rule().label === r.label}
                  onClick={() => {
                    run.set(0);
                    setRule(r);
                  }}
                >
                  {r.label}
                </button>
              )}
            </For>
          </div>
          <div class="buttons">
            <button type="button" class="primary" disabled={run.running()} onClick={start}>
              {done() ? 'もう一度' : 'スタート'}
            </button>
            <button
              type="button"
              onClick={() => {
                run.set(0);
                setList(randomList());
              }}
            >
              ビーズを並べなおす
            </button>
          </div>
          <div
            class="status"
            classList={{
              'status-ok': done() && paths().same,
              'status-ng': done() && !paths().same,
            }}
            aria-live="polite"
          >
            <p>{status()}</p>
            <Show when={done()}>
              <div class="results">
                <div>
                  <span class="c-a">ピンクの道</span>
                  <FrameBeads frame={paths().colorFirst[2]} />
                </div>
                <div>
                  <span class="c-b">水色の道</span>
                  <FrameBeads frame={paths().swapFirst[2]} />
                </div>
              </div>
            </Show>
          </div>
        </div>

        <TryIt>
          <li>「先頭の1個だけ箱に入れる」のまま「スタート」。2つの道の結果が同じになる。</li>
          <li>塗りかえ方を変えて、もう一度。やっぱり同じになる。</li>
          <li>「逆さに並べる」でもためす。これも、どの塗りかえでも同じになる。</li>
          <li>「赤だけ残す」に変えて「スタート」。今度は結果がちがう。</li>
          <li>
            「赤だけ残す」のまま「青だけ黄色に」にする。なぜか同じになる。でも、これは「たまたま」。理由は次で。
          </li>
        </TryIt>
      </section>

      <section class="block" aria-labelledby="nt-why">
        <h2 id="nt-why">自然な取りかえは、中身を見ない</h2>
        <p>
          いまの列で、取りかえ方と塗りかえ方の組み合わせを全部ためすと、こうなる。○は2つの道が同じになったところ。
        </p>
        <div class="table-wrap">
          <table class="nat-table">
            <thead>
              <tr>
                <th scope="col">
                  <span class="visually-hidden">取りかえ方＼塗りかえ方</span>
                </th>
                <For each={RECOLORS}>{(r) => <th scope="col">{r.short}</th>}</For>
              </tr>
            </thead>
            <tbody>
              <For each={SWAPS}>
                {(s) => (
                  <tr>
                    <th scope="row">{s.short}</th>
                    <For each={RECOLORS}>
                      {(r) => {
                        const same = () => runPaths(list(), r, s).same;
                        return (
                          <td class={same() ? 'cell-ok' : 'cell-ng'}>
                            {same() ? '○' : '×'}
                            <span class="visually-hidden">{same() ? '同じ' : 'ちがう'}</span>
                          </td>
                        );
                      }}
                    </For>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
        <p>
          「先頭だけ」と「逆さ」は、どの塗りかえと組み合わせても○。「赤だけ」は×がある。何がちがうのか。
        </p>
        <p>
          「先頭だけ」と「逆さ」は、ビーズの色を一度も見ていない。何番目にあるかだけで決めている。だから、色を先に塗っても、あとで塗っても関係ない。
        </p>
        <p>
          「赤だけ残す」は、色を見て決めている。先に塗りかえると、赤だったビーズが赤でなくなり、残るビーズが変わってしまう。
        </p>
        <p>
          「青だけ黄色に」で○になったのは、この塗りかえが赤に手を出さず、ほかの色を赤にもしないから。ぶつからない塗りかえを選べば、たまたま同じになることはある。でも自然変換と呼べるのは、
          <strong>どんな塗りかえとも、いつでも</strong>
          順番を入れかえられるものだけ。
        </p>
        <p class="takeaway">
          自然変換とは、中身に手を出さずに、入れ物だけを取りかえるやり方のこと。
        </p>
      </section>

      <section class="block" aria-labelledby="nt-words">
        <h2 id="nt-words">圏論のことばで言うと</h2>
        <p>ここまでの話を、圏論ではこう言う。</p>
        <dl class="terms">
          <div>
            <dt>圏（けん）</dt>
            <dd>
              点と矢印の集まり。矢印はつなげられる。ここでは「ビーズの色の集まり」が点で、「塗りかえ」が矢印。
            </dd>
          </div>
          <div>
            <dt>
              関手 <var>F</var>, <var>G</var>
            </dt>
            <dd>
              点を点に、矢印を矢印に、つながり方をこわさずに写すもの。ここでは <var>F</var>{' '}
              が「列にする」、<var>G</var> が「箱に入れる」。塗りかえ <var>f</var>{' '}
              を写したものが、列の塗りかえ <var>F</var>(<var>f</var>) と箱の塗りかえ <var>G</var>(
              <var>f</var>)。
            </dd>
          </div>
          <div>
            <dt>
              自然変換 <var>α</var> : <var>F</var> ⇒ <var>G</var>
            </dt>
            <dd>
              点 <var>A</var> ごとに1本ずつ選んだ、<var>F</var>(<var>A</var>) から <var>G</var>(
              <var>A</var>) への矢印 <var>α</var>
              <sub>A</sub> の組。ここでは「先頭の1個を箱に入れる」。
            </dd>
          </div>
          <div>
            <dt>自然性の四角</dt>
            <dd>
              どの矢印 <var>f</var> : <var>A</var> → <var>B</var>{' '}
              についても、2つの道が同じになること。これが「自然」の条件。
            </dd>
          </div>
        </dl>
        <Fig caption="左下 F(A) がはじめの列、右上 G(B) がゴール。ピンクが「先に塗りかえる道」、水色が「先に取りかえる道」。どちらを通っても同じなら自然。">
          <div class="square-fig">
            <SquareFigure />
          </div>
        </Fig>
        <p>
          点と矢印がもっと多くても、話は同じ。下の3Dは、点 <var>A</var>, <var>B</var>, <var>C</var>{' '}
          と矢印 <var>f</var>, <var>g</var> を、<var>F</var> で下の階に、<var>G</var>{' '}
          で上の階に写したもの。自然変換は、下の階の各点から上の階へ立てた柱 <var>α</var>
          <sub>A</sub>, <var>α</var>
          <sub>B</sub>, <var>α</var>
          <sub>C</sub> の組。
        </p>

        <div ref={prismStage}>
          <Stage label="点 A・B・C と矢印を F で下の階、G で上の階に写し、各点を柱 α でつないだ三角柱の3D図。壁のまわりを2つの点が別々の道で進み、同じところに着く">
            <PrismScene wall={wall()} t={climb.value()} />
          </Stage>
        </div>
        <div class="panel">
          <div class="buttons" role="group" aria-label="壁を選んで動かす">
            <span class="group-label">壁を選んで動かす</span>
            <For each={WALLS}>
              {(name, i) => (
                <button type="button" aria-pressed={wall() === i()} onClick={() => showWall(i())}>
                  {name} の壁
                </button>
              )}
            </For>
          </div>
        </div>
        <p>
          柱と矢印で囲まれた壁は、どれも四角になっている。自然変換の条件は、
          <strong>どの壁でも</strong>
          「横に進んでから柱を登る道」と「柱を登ってから横に進む道」が同じになること。
        </p>
        <p>
          点として同じところに着くのは、図を見ればあたりまえ。大事なのは、運んだ中身まで同じになること。さっきのビーズの実験で確かめたのが、まさにそれ。
        </p>

        <Deeper title="プログラムで見たい人へ">
          <p>
            Haskell で書くと、列は <code>[a]</code>、箱は <code>Maybe a</code>
            。先頭を箱に入れる取りかえは、こう書ける。
          </p>
          <pre>
            <code>{`safeHead :: [a] -> Maybe a
safeHead []    = Nothing
safeHead (x:_) = Just x`}</code>
          </pre>
          <p>
            自然であるとは、どんな関数 <code>f :: a -&gt; b</code> についても次が成り立つこと。
          </p>
          <pre>
            <code>{`fmap f . safeHead  ==  safeHead . fmap f`}</code>
          </pre>
          <p>
            左が水色の道（先に取りかえる）、右がピンクの道（先に塗りかえる）。式で書けば{' '}
            <span class="formula-inline">
              <var>G</var>(<var>f</var>) ∘ <var>α</var>
              <sub>A</sub> = <var>α</var>
              <sub>B</sub> ∘ <var>F</var>(<var>f</var>)
            </span>
            。
          </p>
          <p>
            型が <code>[a] -&gt; Maybe a</code> のように「どんな <code>a</code>{' '}
            でもよい」と書かれた関数は、<code>a</code>{' '}
            の中身を調べられない。だから、この式は型だけから自動的に成り立つ（Wadler の「Theorems
            for
            free!」）。「赤だけ残す」は中身が色だと知っていないと書けないので、この型にならない。
          </p>
        </Deeper>
      </section>

      <section class="block" aria-labelledby="nt-summary">
        <h2 id="nt-summary">まとめ</h2>
        <p>
          自然変換は、入れ物 <var>F</var> から入れ物 <var>G</var>{' '}
          への取りかえ方のうち、中身の塗りかえと順番を入れかえても結果が変わらないもの。
        </p>
        <p>
          この先に出てくる米田の補題は、この自然変換を道具にして「ものは、ほかのものとの関係を全部見れば決まる」ことを言う定理。
        </p>
      </section>
    </article>
  );
}
