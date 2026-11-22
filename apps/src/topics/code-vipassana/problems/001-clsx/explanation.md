<div class="lead">

**ひとことで言うと**: `clsx` は「渡されたものの中から、使えるものだけを拾って、空白でつなぐ」関数です。`0`・`null`・`e: 0` の3つが捨てられ、残りがつながって `"a b c d f 2"` になります。

</div>

### まず、言葉の確認

**falsy（フォルシー）** とは、`if (…)` の中に置いたとき「偽」として扱われる値のことです。JavaScript では次の値が falsy です。

<span class="tag ng">false</span> <span class="tag ng">0</span> <span class="tag ng">'' (空文字)</span> <span class="tag ng">null</span> <span class="tag ng">undefined</span> <span class="tag ng">NaN</span>

これ以外（`'a'`、`2`、`true`、配列、オブジェクトなど）は全部 **truthy（トゥルーシー、真として扱われる）** です。`clsx` は、この「falsy なら捨てる」を何度も使っています。

<div class="note">

**`clsx` は何に使う？** React などで HTML の `class` を組み立てるときに使います。`clsx('btn', isActive && 'active')` と書けば、`isActive` が `false` のときは `'active'` が消えて `"btn"` だけになります。「条件つきで入れたり消したりしたい」ので、falsy を捨てる作りになっているわけです。

</div>

### 図で見る：何が残って、何が捨てられるか

引数を1つずつ見ていきます。<span class="tag ok">残る</span> は結果に入るもの、<span class="tag ng">捨てる</span> は消えるものです。

<figure class="fig">
<ul class="tree">
<li><b>clsx( … ) の引数</b>
<ul>
<li><code>'a'</code> <span class="tag ok">残る → "a"</span> <span class="muted">文字列はそのまま（5行目）</span></li>
<li><code>0</code> <span class="tag ng">捨てる</span> <span class="muted">falsy なので入口で弾かれる（33行目）</span></li>
<li><code>['b', [ … ]]</code> <span class="tag acc">配列 → 中身を1つずつ見る</span> <span class="muted">（7〜16行目）</span>
<ul>
<li><code>'b'</code> <span class="tag ok">残る → "b"</span></li>
<li><code>[null, 'c', { … }]</code> <span class="tag acc">配列の中の配列 → また中身を見る</span>
<ul>
<li><code>null</code> <span class="tag ng">捨てる</span> <span class="muted">falsy（10行目）</span></li>
<li><code>'c'</code> <span class="tag ok">残る → "c"</span></li>
<li><code>{ d: true, e: 0 }</code> <span class="tag acc">オブジェクト → キーを見る</span> <span class="muted">（18〜23行目）</span>
<ul>
<li><code>d: true</code> <span class="tag ok">残る → "d"</span> <span class="muted">値が truthy なのでキー名を使う（19行目）</span></li>
<li><code>e: 0</code> <span class="tag ng">捨てる</span> <span class="muted">値が falsy（19行目）</span></li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li><code>{ f: 1 }</code> <span class="tag acc">オブジェクト</span>
<ul>
<li><code>f: 1</code> <span class="tag ok">残る → "f"</span></li>
</ul>
</li>
<li><code>2</code> <span class="tag ok">残る → "2"</span> <span class="muted">数値も文字列としてくっつく（5行目）</span></li>
</ul>
</li>
</ul>
<figcaption>残ったものを上から順に並べると a, b, c, d, f, 2</figcaption>
</figure>

### コードを順番に追う

**① 入口（`clsx` 本体、32〜39行目）**

`for` で引数を1つずつ取り出し、**33行目** の `if (tmp = arguments[i])` で falsy なものを捨てます。`0` はここで消えます。

この行は「`tmp` に代入して、その値で if 判定する」を1行でやっています。`==` の書き間違いではありません。

**② 中身の仕分け（`toVal`、1〜27行目）**

入口を通ったものは `toVal` に渡され、**型によって3通り** に分かれます。

| 渡されたもの | どうなる | 行 |
| --- | --- | --- |
| 文字列・数値 | そのまま文字にする | 4〜5行目 |
| 配列 | 中身を1つずつ見る。falsy は捨て、残りは **もう一度 `toVal` に渡す** | 7〜16行目 |
| オブジェクト | **値が truthy なキーの名前** だけを使う | 18〜23行目 |

配列の中身を `toVal` に渡し直す（11行目）ので、配列が何重に入れ子になっていても、奥のほうまで同じルールで処理されます。このように関数が自分自身を呼ぶことを **再帰** といいます。

**③ 空白でつなぐ**

`str && (str += ' ')` は「`str` にもう何か入っているときだけ、空白を1つ足す」という意味です。

| 足すもの | 足す前の str | 空白を足す？ | 足した後の str |
| --- | --- | --- | --- |
| `"a"` | `""`（空） | 足さない | `"a"` |
| `"b c d"` | `"a"` | 足す | `"a b c d"` |
| `"f"` | `"a b c d"` | 足す | `"a b c d f"` |
| `"2"` | `"a b c d f"` | 足す | `"a b c d f 2"` |

最初の1個のときは空白を足さないので、先頭に余計な空白がつきません。

### ここがポイント

- 数値の `0` は「数値だから残る」のではなく、**falsy だから先に捨てられる**。数値の処理（5行目）までたどり着かない
- オブジェクトは **値ではなくキーの名前** が出てくる。`{ d: true }` から出てくるのは `"d"`
- 中身が全部捨てられて空っぽ（`""`）になったものは、11行目・34行目の `if (y = toVal(…))` で弾かれる。だから空白が二重になることもない
