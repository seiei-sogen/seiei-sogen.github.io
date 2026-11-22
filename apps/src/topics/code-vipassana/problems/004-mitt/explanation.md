<div class="lead">

**ひとことで言うと**: `'*'` で登録したハンドラは、`'foo'` 用の名簿には入りません。`emit` が **最後に `'*'` の名簿も見に行き**、**118行目** の `handler(type, evt!)` で呼びます。

</div>

### まず、言葉の確認

**mitt** は「イベント」をやりとりするための小さなライブラリです。

- **`on(名前, 関数)`**: 「この名前のイベントが起きたら、この関数を呼んで」と **登録** する
- **`emit(名前, データ)`**: 「この名前のイベントが起きたよ」と **知らせる**。登録された関数が呼ばれる
- **ハンドラ**: `on` で登録する関数のこと
- **ワイルドカード `'*'`**: 「どんな名前のイベントでも呼んで」という特別な名前

<div class="note">

**たとえ話**: 学校の連絡網を想像してください。「サッカー部」の名簿、「美術部」の名簿があり、`emit('サッカー部', …)` はサッカー部の名簿の人に電話をかけます。`'*'` は「全部の連絡を聞きたい」人のための **別の名簿** です。サッカー部の名簿に名前を書き足すのではなく、電話係が毎回「最後に `'*'` の名簿にもかける」というルールになっています。

</div>

**`Map`** は「キー → 値」の組を入れておく入れ物です。mitt は「イベント名 → ハンドラの配列」を `all` という Map に入れています（52行目）。

### 図で見る：名簿（Map）の中身

次のコードを実行した直後の `all` の中身です。

```js
const emitter = mitt()
emitter.on('foo', f)
emitter.on('bar', g)
emitter.on('*', h)
```

<figure class="fig">
<svg viewBox="0 0 340 190" width="340" role="img" aria-label="all という Map の中身。キー foo には f、キー bar には g、キー * には h が入った配列が対応している。">
<defs><marker id="p004-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="ah"/></marker></defs>
<text x="10" y="20" class="sm tm">all（Map）</text>
<text x="40" y="44" text-anchor="middle" class="sm tm">キー</text>
<text x="230" y="44" text-anchor="middle" class="sm tm">ハンドラの配列</text>
<rect x="10" y="54" width="70" height="36" rx="6" class="b"/>
<text x="45" y="77" text-anchor="middle" class="mono">'foo'</text>
<line x1="80" y1="72" x2="148" y2="72" class="l" marker-end="url(#p004-ah)"/>
<rect x="150" y="54" width="160" height="36" rx="6" class="b"/>
<text x="166" y="77" class="mono">[ f ]</text>
<rect x="10" y="98" width="70" height="36" rx="6" class="b"/>
<text x="45" y="121" text-anchor="middle" class="mono">'bar'</text>
<line x1="80" y1="116" x2="148" y2="116" class="l" marker-end="url(#p004-ah)"/>
<rect x="150" y="98" width="160" height="36" rx="6" class="b"/>
<text x="166" y="121" class="mono">[ g ]</text>
<rect x="10" y="142" width="70" height="36" rx="6" class="ba"/>
<text x="45" y="165" text-anchor="middle" class="mono bold">'*'</text>
<line x1="80" y1="160" x2="148" y2="160" class="la" marker-end="url(#p004-ah)"/>
<rect x="150" y="142" width="160" height="36" rx="6" class="ba"/>
<text x="166" y="165" class="mono">[ h ]</text>
</svg>
<figcaption>h は 'foo' の配列にも 'bar' の配列にも入っていない。'*' という名前の、別の配列にいる</figcaption>
</figure>

### 図で見る：`emit('foo', 42)` は2段階

<figure class="fig">
<svg viewBox="0 0 340 290" width="340" role="img" aria-label="emit foo 42 の流れ。1段階目、104行目で foo の配列を取り出し、109行目で f(42) を呼ぶ。2段階目、113行目で * の配列を取り出し、118行目で h('foo', 42) を呼ぶ。">
<defs><marker id="p004-ah2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="ah"/></marker></defs>
<rect x="85" y="6" width="170" height="34" rx="8" class="b"/>
<text x="170" y="28" text-anchor="middle" class="mono">emit('foo', 42)</text>
<line x1="170" y1="40" x2="170" y2="58" class="l" marker-end="url(#p004-ah2)"/>
<rect x="10" y="60" width="320" height="90" rx="10" class="b"/>
<text x="22" y="82" class="sm bold">① 'foo' の名簿（104〜111行目）</text>
<text x="22" y="108" class="sm">104行目: <tspan class="mono">all.get('foo')</tspan> → <tspan class="mono">[ f ]</tspan></text>
<text x="22" y="134" class="sm">109行目: <tspan class="mono bold">f(42)</tspan> を呼ぶ</text>
<line x1="170" y1="150" x2="170" y2="168" class="l" marker-end="url(#p004-ah2)"/>
<rect x="10" y="170" width="320" height="110" rx="10" class="ba"/>
<text x="22" y="192" class="sm bold">② '*' の名簿（113〜120行目）</text>
<text x="22" y="218" class="sm">113行目: <tspan class="mono">all.get('*')</tspan> → <tspan class="mono">[ h ]</tspan></text>
<rect x="16" y="230" width="308" height="40" rx="6" class="bev"/>
<text x="22" y="255" class="sm">118行目: <tspan class="mono bold">h('foo', 42)</tspan> を呼ぶ ← 答え</text>
</svg>
<figcaption>どの名前で emit しても、② は毎回かならず実行される</figcaption>
</figure>

### コードを順番に追う

**① 登録するとき（`on`、66〜73行目）**

`on('*', h)` を呼ぶと、**67行目** で `all.get('*')` を見ます。まだ `'*'` の配列がなければ **71行目** で `[h]` を新しく作って入れ、すでにあれば **69行目** で `push` して後ろに足します。

どちらの場合も、`h` が入るのは **`'*'` というキーの配列だけ** です。`'foo'` の配列には入りません。

**② 知らせるとき（`emit`、103〜121行目）**

`emit('foo', 42)` を呼ぶと、次の順に動きます。

1. **104行目**: `all.get('foo')` で `'foo'` の配列 `[f]` を取り出す
2. **106〜110行目**: 配列の中のハンドラを1つずつ、**109行目** の `handler(evt!)` で呼ぶ → `f(42)`
3. **113行目**: 今度は `all.get('*')` で `'*'` の配列 `[h]` を取り出す（ここではまだ取り出しただけ）
4. **115〜119行目**: 1つずつ、**118行目** の `handler(type, evt!)` で呼ぶ → `h('foo', 42)`

### ここがポイント

- `'*'` は「全部の配列に登録される」のではなく、「`emit` が毎回最後に見に行く特別なキー」
- だから呼ばれる順番は必ず「**名前ごとのハンドラ → `'*'` のハンドラ**」
- `'*'` のハンドラだけは、1つ目の引数に **イベント名**（`'foo'`）を受け取る。どのイベントで呼ばれたかが分からないと困るから

### もっと知りたい人へ

- **107行目・116行目** の `.slice()` は配列のコピーを作る。ハンドラの中で `on` / `off` されても、いま回しているループには影響しない
- `forEach` ではなく `.map` を使っている（戻り値は捨てている）。サイズの小ささが売りのライブラリなので、圧縮後に数文字でも短くなる書き方を選んでいるのだろう
- **86行目** の `indexOf(handler) >>> 0` は、見つからないときの `-1` を `4294967295` という巨大な数に変える小技。`splice` がどこも消さずに空振りする
