<div class="lead">

**ひとことで言うと**: `parse` が受け付けるのは「**数字1つ ＋ 単位1つ**」だけです。`'1h30m'` は単位が2つ（`h` と `m`）あるので形に合わず、`NaN` になります。

</div>

### まず、言葉の確認

**`ms` ライブラリ** は、`'2h'` や `'10 minutes'` のような「人間が読みやすい時間」を **ミリ秒**（1000分の1秒）の数値に変えるライブラリです。`parse('1s')` は `1000` を返します。

**`NaN`**（Not a Number）は「数値になれなかった」ことを表す特別な値です。この関数では「読めない文字列だった」という意味で返されます。

**正規表現** は「文字列の形」を表す小さな言語です。`/…/.exec(str)` で、`str` がその形に合うかを調べます。合わなければ `null` が返ります。この問題で出てくる記号は次のとおりです。

| 記号 | 意味 | 例 |
| --- | --- | --- |
| `^` と `$` | 文字列の **最初** と **最後**。両方あると「全体がこの形」という意味 | `^ab$` は `'ab'` だけに合う |
| `\d` | 数字1文字（0〜9） | |
| `?` | 直前のものが **0個か1個**（あってもなくてもよい） | `-?` は「マイナスがあってもなくてもよい」 |
| `*` | 直前のものが **0個以上** | ` *` は「空白がいくつあってもよい（なくてもよい）」 |
| `+` | 直前のものが **1個以上** | `\d+` は「数字が1文字以上」 |
| `(a\|b)` | a か b のどちらか | |
| `i`（末尾） | 大文字・小文字を区別しない | `MINUTES` も `minutes` も合う |

### 図で見る：78行目の正規表現を部品に分ける

78行目の長い正規表現は、次の部品が上から順に並んだものです。文字列の頭から1文字ずつ、部品に当てはめていきます。

<figure class="fig">
<svg viewBox="0 0 340 300" width="340" role="img" aria-label="正規表現の部品。最初、数値、空白0個以上、単位1つ省略可、最後、の順に並ぶ。">
<defs><marker id="p003-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="ah"/></marker></defs>
<rect x="10" y="8" width="320" height="40" rx="8" class="b"/>
<text x="24" y="33" class="mono bold">^</text>
<text x="60" y="33">文字列の最初から</text>
<line x1="170" y1="48" x2="170" y2="64" class="l" marker-end="url(#p003-ah)"/>
<rect x="10" y="66" width="320" height="52" rx="8" class="ba"/>
<text x="24" y="88" class="mono sm">-?\d*\.?\d+</text>
<text x="24" y="108" class="sm">数値（例: 10、.5、-3、1.5）</text>
<line x1="170" y1="118" x2="170" y2="134" class="l" marker-end="url(#p003-ah)"/>
<rect x="10" y="136" width="320" height="40" rx="8" class="b"/>
<text x="24" y="161" class="mono"> *</text>
<text x="60" y="161">空白（0個でも何個でもよい）</text>
<line x1="170" y1="176" x2="170" y2="192" class="l" marker-end="url(#p003-ah)"/>
<rect x="10" y="194" width="320" height="52" rx="8" class="ba"/>
<text x="24" y="216" class="mono sm">(?&lt;unit&gt;ms|s|m|h|…)?</text>
<text x="24" y="236" class="sm">単位を <tspan class="bold ta">1つだけ</tspan>（なくてもよい）</text>
<line x1="170" y1="246" x2="170" y2="262" class="l" marker-end="url(#p003-ah)"/>
<rect x="10" y="264" width="320" height="32" rx="8" class="b"/>
<text x="24" y="285" class="mono bold">$</text>
<text x="60" y="285">ここで文字列が終わっていること</text>
</svg>
<figcaption>単位の部品は1回しか出てこない。だから単位を2つ並べることはできない</figcaption>
</figure>

### 図で見る：4つの選択肢を部品に当てはめる

<figure class="fig">
<table style="white-space:nowrap">
<thead><tr><th>入力</th><th>数値</th><th>空白</th><th>単位</th><th>余った文字</th><th>結果</th></tr></thead>
<tbody>
<tr><td><code>'1h30m'</code></td><td><code>1</code></td><td>なし</td><td><code>h</code></td><td><span class="tag ng">30m</span></td><td><span class="tag ng">NaN</span></td></tr>
<tr><td><code>'.5s'</code></td><td><code>.5</code></td><td>なし</td><td><code>s</code></td><td>なし</td><td><span class="tag ok">500</span></td></tr>
<tr><td><code>'10 MINUTES'</code></td><td><code>10</code></td><td>1個</td><td><code>MINUTES</code></td><td>なし</td><td><span class="tag ok">600000</span></td></tr>
<tr><td><code>'5&nbsp;&nbsp;sec'</code></td><td><code>5</code></td><td>2個</td><td><code>sec</code></td><td>なし</td><td><span class="tag ok">5000</span></td></tr>
</tbody>
</table>
<figcaption>「余った文字」があると、最後の <code>$</code> に合わないので一致しない</figcaption>
</figure>

`'1h30m'` を1文字ずつ見ると、こうなります。

<figure class="fig">
<svg viewBox="0 0 340 150" width="340" role="img" aria-label="1h30m の各文字。1 が数値、h が単位に当てはまり、残りの 3、0、m は余って最後の $ に合わない。">
<rect x="20" y="20" width="50" height="50" rx="6" class="ba"/>
<text x="45" y="52" text-anchor="middle" class="mono bold">1</text>
<rect x="76" y="20" width="50" height="50" rx="6" class="bok"/>
<text x="101" y="52" text-anchor="middle" class="mono bold">h</text>
<rect x="152" y="20" width="50" height="50" rx="6" class="bng"/>
<text x="177" y="52" text-anchor="middle" class="mono bold">3</text>
<rect x="208" y="20" width="50" height="50" rx="6" class="bng"/>
<text x="233" y="52" text-anchor="middle" class="mono bold">0</text>
<rect x="264" y="20" width="50" height="50" rx="6" class="bng"/>
<text x="289" y="52" text-anchor="middle" class="mono bold">m</text>
<text x="45" y="92" text-anchor="middle" class="sm">数値</text>
<text x="101" y="92" text-anchor="middle" class="sm">単位</text>
<line x1="139" y1="12" x2="139" y2="100" class="lng dash"/>
<text x="139" y="118" text-anchor="middle" class="sm tng bold">ここで終わってほしい（$）</text>
<text x="233" y="92" text-anchor="middle" class="sm tng">余った！</text>
<text x="170" y="142" text-anchor="middle" class="sm">→ 一致しない → 82〜83行目で NaN</text>
</svg>
</figure>

### コードを順番に追う（`parse('1h30m')` の場合）

**① 72行目**: 文字列かどうか、長さが0や100超えでないかを調べます。`'1h30m'` は5文字なので通過します。

**② 78行目**: 正規表現で形を調べます。数値 `1`、単位 `h` までは合いますが、その後ろに `30m` が残っています。正規表現の最後は `$`（ここで終わり）なので、**一致に失敗** します。`exec` は `null` を返します。

**③ 82〜83行目**: `match?.groups` は `null` から取り出そうとしても `undefined` になるだけ（エラーにならない）です。`!undefined` は真なので、`return NaN` します。

一致した場合は次のように進みます（`'10 MINUTES'` の例）。

- **88行目**: 正規表現の名前つきグループから `value = '10'`、`unit = 'MINUTES'` を取り出す。単位が書かれていなければ `'ms'` になる
- **93行目**: `parseFloat('10')` で数値の `10` にする
- **95行目**: `'MINUTES'.toLowerCase()` で `'minutes'` にする
- **98〜128行目**: `switch` で `'minutes'` の `case` に入り、`10 * m`（`m` は1分のミリ秒 = 60000）で `600000` を返す

### ここがポイント

- `NaN` を返す場所は **82〜83行目の1か所だけ**。「正規表現に合わなかったとき」だけ `NaN` になる
- 正規表現の `^…$` は「**文字列全体** がこの形」という意味。前や後ろに余計な文字があるとダメ
- 単位の部品は1回きり。「1時間30分」を表したいなら `'1.5h'` や `'90m'` と書く

### もっと知りたい人へ

- `switch` の `default`（141〜145行目）は、型の上では絶対に来ない場所。`satisfies never` は「ここに来る単位が残っていたら型エラーにしてね」という TypeScript への指示
- 72行目は `str.length > 100` で弾いているので、長さ100ちょうどの文字列は通る。エラーメッセージの「between 1 and 99」と1文字ずれている
