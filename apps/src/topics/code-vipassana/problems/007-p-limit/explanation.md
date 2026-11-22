<div class="lead">

**ひとことで言うと**: `fn` を実際に呼ぶのは **34行目** の `function_(...arguments_)` です。23行目の `.run()` は名前がそっくりですが、**`fn` を呼ぶのではなく「呼び鈴を鳴らすだけ」** の別物です。

</div>

### まず、言葉の確認

- **p-limit**: 非同期の処理を「同時に最大○個まで」に制限するライブラリです。`const limit = pLimit(2)` なら、`limit(fn)` で頼んだ仕事は同時に2つまでしか動きません。3つ目以降は順番待ちになります
- **同時実行数（`concurrency`）と `activeCount`**: お店の「席の数」と「今座っている人数」です。`activeCount < concurrency` なら空席あり
- **キュー（`queue`）**: 順番待ちの列です。先に並んだものから先に出てきます（`enqueue` で並ぶ、`dequeue` で先頭が出る）
- **Promise**: 「あとで結果が届く引換券」です。`resolve()` を呼ぶと引換券が「受け取りOK」になります
- **`.then(関数)`**: 「引換券が受け取りOKになったら、この関数を呼んで」という予約です。予約した関数は、**今の処理がひと段落した直後** に呼ばれます（これを **マイクロタスク** といいます）

<figure class="fig">
<svg viewBox="0 0 340 120" width="420" role="img" aria-label="同時実行数2の例。実行中の席は2つで両方埋まっている。待ち行列に3つ並んでいて、席が空くと先頭から入る">
<text x="4" y="16" class="sm tm">実行中（上限 2）</text>
<rect x="4" y="24" width="120" height="76" rx="6" class="b"/>
<rect x="14" y="34" width="100" height="26" rx="4" class="bok"/><text x="64" y="52" text-anchor="middle" class="sm">仕事 A</text>
<rect x="14" y="66" width="100" height="26" rx="4" class="bok"/><text x="64" y="84" text-anchor="middle" class="sm">仕事 B</text>
<text x="190" y="16" class="sm tm">待ち行列（キュー）</text>
<rect x="190" y="46" width="44" height="30" rx="4" class="ba"/><text x="212" y="66" text-anchor="middle" class="sm">C</text>
<rect x="240" y="46" width="44" height="30" rx="4" class="ba"/><text x="262" y="66" text-anchor="middle" class="sm">D</text>
<rect x="290" y="46" width="44" height="30" rx="4" class="ba"/><text x="312" y="66" text-anchor="middle" class="sm">E</text>
<defs><marker id="m007s" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="aha"/></marker></defs>
<line x1="184" y1="61" x2="132" y2="61" class="la" marker-end="url(#m007s)"/>
<text x="230" y="102" text-anchor="middle" class="sm tm">先頭から、席が空いたら入る</text>
</svg>
<figcaption>A か B が終わると席が1つ空き、待ち行列の先頭 C が実行に移る</figcaption>
</figure>

### 図で見る：`limit(fn)` から `fn` が動くまで

空席があるとき、`limit(fn)` を呼んでから `fn` が動くまでには、これだけの段階があります。

<figure class="fig">
<svg viewBox="0 0 340 326" width="420" role="img" aria-label="limit(fn)を呼ぶ、呼び鈴つきでキューに並ぶ、鳴ったらrunを呼ぶよう予約、空きを確認して呼び鈴を鳴らす、予約が動いてrunが呼ばれる、34行目でfnを実行、の6段階">
<defs><marker id="m007f" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="ah"/></marker></defs>
<rect x="10" y="4" width="320" height="36" rx="6" class="b"/>
<text x="22" y="27" class="bold">① limit(fn) を呼ぶ</text><text x="318" y="27" text-anchor="end" class="sm tm">66〜67行目</text>
<line x1="170" y1="40" x2="170" y2="56" class="l" marker-end="url(#m007f)"/>
<rect x="10" y="58" width="320" height="36" rx="6" class="b"/>
<text x="22" y="81">② 呼び鈴つきで列に並ぶ</text><text x="318" y="81" text-anchor="end" class="sm tm">55〜57行目</text>
<line x1="170" y1="94" x2="170" y2="110" class="l" marker-end="url(#m007f)"/>
<rect x="10" y="112" width="320" height="36" rx="6" class="b"/>
<text x="22" y="135">③「鳴ったら run を呼んで」と予約</text><text x="318" y="135" text-anchor="end" class="sm tm">58行目</text>
<line x1="170" y1="148" x2="170" y2="164" class="l" marker-end="url(#m007f)"/>
<rect x="10" y="166" width="320" height="36" rx="6" class="ba"/>
<text x="22" y="189">④ 空席を確認して呼び鈴を鳴らす</text><text x="318" y="189" text-anchor="end" class="sm tm">21〜23行目</text>
<line x1="170" y1="202" x2="170" y2="230" class="l dash" marker-end="url(#m007f)"/>
<text x="180" y="221" class="sm tm">少しあと（マイクロタスク）</text>
<rect x="10" y="232" width="320" height="36" rx="6" class="b"/>
<text x="22" y="255">⑤ 予約が動いて run が呼ばれる</text><text x="318" y="255" text-anchor="end" class="sm tm">58 → 32行目</text>
<line x1="170" y1="268" x2="170" y2="284" class="l" marker-end="url(#m007f)"/>
<rect x="10" y="286" width="320" height="36" rx="6" class="bok"/>
<text x="22" y="309" class="bold">⑥ fn を実行！</text><text x="318" y="309" text-anchor="end" class="sm tm">34行目</text>
</svg>
<figcaption>オレンジの④で鳴らしているのは「呼び鈴」だけ。実際に fn が動くのは緑の⑥</figcaption>
</figure>

### 名前がそっくりな2つの `run`

この問題の一番の罠は、`run` という名前のものが **2つある** ことです。

<div class="cols">
<div class="fig">
<h4><code>queueItem.run</code>（56行目）＝ 呼び鈴</h4>
<p>中身は Promise の <code>resolve</code>（<code>internalResolve</code>）です。呼ぶと引換券が「受け取りOK」になるだけで、<b>fn は呼びません</b>。23行目の <code>queue.dequeue().run()</code> はこちら。</p>
</div>
<div class="fig">
<h4><code>run</code>（32行目）＝ 仕事をする本体</h4>
<p>58行目の <code>.then</code> で予約されていて、呼び鈴が鳴った後に呼ばれます。<b>34行目で fn を呼ぶ</b> のはこちら。</p>
</div>
</div>

### コードを順番に追う

`const limit = pLimit(2)` で、まだ何も動いていない状態（`activeCount = 0`）から `limit(fn)` を1回呼んだとします。

1. **66〜67行目**: `limit(fn)` は、呼んだ人に返す Promise を作り、`enqueue` を呼ぶ
2. **55〜57行目**: 新しい Promise（`internalResolve` つき）を作り、その `internalResolve` を `queueItem.run` にしまって、キューに並べる。これが「呼び鈴」
3. **58行目**: その Promise に `.then(run.bind(…))` で「解決したら32行目の `run` を呼んで」と予約する。**この時点ではまだ呼ばない**
4. **61〜62行目**: `activeCount`（0）が `concurrency`（2）より小さいので `resumeNext()` を呼ぶ
5. **21〜23行目**: もう一度空席を確かめ、`activeCount` を 1 に増やして、キューの先頭を取り出し `.run()`。これは `internalResolve()` なので、**Promise が解決するだけ**
6. **58行目 → 32行目**: 今の処理がひと段落すると、3で予約しておいた `run` が呼ばれる
7. **34行目**: `function_(...arguments_)`、つまり **`fn` がここで実行される**

### ここがポイント

- **「呼ぶ」と「予約する」を区別する**。58行目は `.then` で予約しているだけで、その場では呼ばない
- **同じ名前でも中身が同じとは限らない**。`queueItem.run` に何が入っているかは56行目を見ればわかる
- 迷ったら「その関数の **本当の中身** はどこで決まったか」までさかのぼって読む

### もっと知りたい人へ

- **わざわざ呼び鈴（Promise）を挟む理由**: 53〜54行目のコメントのとおり、`limit()` を呼んだ時点の非同期コンテキスト（Node.js の AsyncLocalStorage など）を `fn` に引き継ぐためです
- **上限を守る仕組み**: 判定と `activeCount++` が組になった **21〜22行目** で守っています。`activeCount--` は `fn` の完了を待った後（43行目の `await` → 47行目の `next()` → 28行目）なので、実行中の数を正しく数えられます
- **61行目の判定**: 21行目でも同じ判定をするので、なくても結果は同じです。空きがないときに `resumeNext()` を呼ぶ手間を省く前置きです
