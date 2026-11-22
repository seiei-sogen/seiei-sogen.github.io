<div class="lead">

**ひとことで言うと**: `Object.create(null)` で作ったオブジェクトには `hasOwnProperty` というメソッドが **そもそも無い** のに、19行目でそれを呼んでしまい、エラー（TypeError）で止まります。

</div>

### まず、言葉の確認

**プロトタイプ** は、オブジェクトの「親」のようなものです。オブジェクトは、自分が持っていないプロパティを聞かれると、親（プロトタイプ）に探しに行きます。

ふつうに `{ x: 1 }` と書いたオブジェクトの親は `Object.prototype` です。`hasOwnProperty` や `constructor` は、実はこの **親が持っている** もので、子のオブジェクトは借りて使っているだけです。

**`Object.create(null)`** は「親を持たないオブジェクト」を作る書き方です。親がいないので、借りられるものも何もありません。キーと値を入れておくだけの「辞書」として使われることがあります。

<div class="note">

**たとえ**: ふつうのオブジェクトは「家に道具が無くても、親の家に借りに行ける子ども」です。`Object.create(null)` のオブジェクトは「親の家がない子ども」なので、`hasOwnProperty` という道具を借りに行けません。

</div>

**`hasOwnProperty(キー)`** は「そのキーを **自分自身が** 持っているか（親から借りたものではないか）」を調べるメソッドです。

**TypeError** は「関数ではないものを関数として呼んだ」ときなどに出るエラーです。`foo.hasOwnProperty` が `undefined` なのに `(...)` を付けて呼ぶと、`foo.hasOwnProperty is not a function` というエラーになります。

### 図で見る：2つのオブジェクトの違い

<figure class="fig">
<svg viewBox="0 0 320 214" width="320" role="img" aria-label="ふつうの x:1 は親の Object.prototype から hasOwnProperty を借りられる。Object.create(null) で作った x:1 は親が null なので借りられない">
<defs><marker id="m008a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="ah"/></marker></defs>
<text x="80" y="18" text-anchor="middle" class="bold">ふつうの { x: 1 }</text>
<text x="240" y="18" text-anchor="middle" class="bold">dict() の { x: 1 }</text>
<rect x="4" y="30" width="152" height="40" rx="8" class="b"/>
<text x="80" y="55" text-anchor="middle" class="mono">x: 1</text>
<rect x="164" y="30" width="152" height="40" rx="8" class="b"/>
<text x="240" y="55" text-anchor="middle" class="mono">x: 1</text>
<line x1="80" y1="70" x2="80" y2="104" class="l" marker-end="url(#m008a)"/>
<text x="88" y="92" class="sm tm">親</text>
<line x1="240" y1="70" x2="240" y2="104" class="l dash" marker-end="url(#m008a)"/>
<text x="248" y="92" class="sm tm">親</text>
<rect x="4" y="106" width="152" height="100" rx="8" class="bok"/>
<text x="80" y="128" text-anchor="middle" class="mono bold sm">Object.prototype</text>
<text x="12" y="152" class="mono sm">hasOwnProperty</text>
<text x="150" y="152" text-anchor="end" class="tok bold sm">あり</text>
<text x="12" y="174" class="mono sm">constructor</text>
<text x="150" y="174" text-anchor="end" class="tok bold sm">あり</text>
<text x="12" y="196" class="sm tm">toString なども</text>
<rect x="164" y="106" width="152" height="100" rx="8" class="bng"/>
<text x="240" y="128" text-anchor="middle" class="bold sm">null（親なし）</text>
<text x="172" y="152" class="mono sm">hasOwnProperty</text>
<text x="310" y="152" text-anchor="end" class="tng bold sm">なし</text>
<text x="172" y="174" class="mono sm">constructor</text>
<text x="310" y="174" text-anchor="end" class="tng bold sm">なし</text>
<text x="172" y="196" class="sm tm">何も借りられない</text>
</svg>
<figcaption>中身（x: 1）は同じでも、親がいるかどうかが違う。dict() は <code>Object.assign(Object.create(null), { x: 1 })</code></figcaption>
</figure>

次の図は、`dequal(dict(), dict())` がコードのどこを通って、どこで止まるかです。

<figure class="fig">
<svg viewBox="0 0 320 356" width="320" role="img" aria-label="5行目で constructor が同じと判定、6・7行目と9行目は該当せず、16行目で中身を比べる分岐に入り、19行目で hasOwnProperty を呼んで TypeError になる">
<defs><marker id="m008b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="ah"/></marker></defs>
<rect x="4" y="8" width="312" height="36" rx="8" class="b"/>
<text x="24" y="31">5行目: constructor が同じ？</text>
<line x1="40" y1="44" x2="40" y2="66" class="l" marker-end="url(#m008b)"/>
<text x="52" y="60" class="sm tm">undefined === undefined →「はい」</text>
<rect x="4" y="68" width="312" height="36" rx="8" class="b"/>
<text x="24" y="91">6・7行目: Date？ RegExp？</text>
<line x1="40" y1="104" x2="40" y2="126" class="l" marker-end="url(#m008b)"/>
<text x="52" y="120" class="sm tm">いいえ</text>
<rect x="4" y="128" width="312" height="36" rx="8" class="b"/>
<text x="24" y="151">9行目: 配列？</text>
<line x1="40" y1="164" x2="40" y2="186" class="l" marker-end="url(#m008b)"/>
<text x="52" y="180" class="sm tm">いいえ</text>
<rect x="4" y="188" width="312" height="36" rx="8" class="ba"/>
<text x="24" y="211">16行目: <tspan class="mono">!ctor</tspan>（constructor が無い）？</text>
<line x1="40" y1="224" x2="40" y2="246" class="l" marker-end="url(#m008b)"/>
<text x="52" y="240" class="sm tm">はい → 中身を1つずつ比べる分岐へ</text>
<rect x="4" y="248" width="312" height="36" rx="8" class="bev"/>
<text x="24" y="271">19行目: <tspan class="mono">foo.hasOwnProperty('x')</tspan></text>
<line x1="40" y1="284" x2="40" y2="306" class="lng" marker-end="url(#m008b)"/>
<text x="52" y="300" class="sm tm">でも hasOwnProperty は無い…</text>
<rect x="4" y="308" width="312" height="40" rx="8" class="bng"/>
<text x="160" y="333" text-anchor="middle" class="tng bold">TypeError で止まる</text>
</svg>
<figcaption>constructor が無いオブジェクト用の分岐に入ったのに、その中で「親から借りる前提」のメソッドを呼んでいる</figcaption>
</figure>

### コードを順番に追う

`dict()` を2つ作り、`foo` と `bar` として `dequal` に渡します。中身はどちらも `{ x: 1 }` ですが、別々に作ったので **別のオブジェクト** です。

1. **3行目**: `foo === bar` は `false`（別のオブジェクトなので）。先に進みます
2. **5行目**: `foo.constructor` を見に行きます。親がいないので `undefined`。`bar.constructor` も `undefined`。`undefined === undefined` は `true` なので、`if` の中に入ります。このとき `ctor` には `undefined` が入ります
3. **6・7行目**: `ctor` は `Date` でも `RegExp` でもありません
4. **9行目**: `Array` でもありません
5. **16行目**: `!ctor` は `!undefined` なので `true`。「中身を1つずつ比べる」分岐に入ります
6. **18行目**: `for (ctor in foo)` でキーを順に取り出します。最初のキーは `'x'` です
7. **19行目**: `foo.hasOwnProperty('x')` を呼ぼうとします。ところが `foo.hasOwnProperty` は `undefined`。関数ではないものを呼んだので **TypeError** になります

ほかの選択肢は、どれもこのコードで正しく動きます。

- `dequal([1, 2], [1, 2, 3])` → 10行目で長さが違うので比べずに13行目へ。`false`（正しい）
- `dequal(NaN, NaN)` → NaN は falsy なので5行目を素通りして26行目へ。`true`（正しい）
- `dequal(new Date(0), new Date(0))` → 6行目で時刻どうしを比べる。`true`（正しい）

### ここがポイント

- **16行目の `!ctor` は、まさに「constructor の無いオブジェクト」のための条件**。なのに、その中の19行目で constructor と同じく親から借りる `hasOwnProperty` を使っている。この食い違いがバグの正体
- 「その分岐に入ってくる値は、分岐の中で使う機能を本当に持っているか？」と確かめると、こういうバグを見つけやすい
- `NaN` は自分自身とも `===` で等しくならない、ちょっと変わった値です。26行目の `foo !== foo` は「`foo` が NaN か？」を調べる定番の書き方です

### もっと知りたい人へ

このバグは次のコミット [c8b3ace](https://github.com/lukeed/dequal/commit/c8b3aceb0fb3cc685e489bceb0fed220ca907483)（*fix: support object dictionary*）で直されました。先頭に `var has = Object.prototype.hasOwnProperty;` を置き、`has.call(foo, ctor)` と呼ぶ形です。

これは「親の道具を、オブジェクト自身を通さずに直接持ってきて使う」書き方です。この形なら、親がいないオブジェクトでも、`{ hasOwnProperty: 1 }` のように同じ名前の別物を持っているオブジェクトでも壊れません。最近の JavaScript なら `Object.hasOwn(foo, ctor)` でも同じことができます。
