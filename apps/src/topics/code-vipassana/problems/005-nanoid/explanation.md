<div class="lead">

**ひとことで言うと**: 256 通りの乱数を `%`（割り算の余り）で文字に割り当てると、割り切れないときに **一部の文字だけが出やすくなります**。それを防ぐため、割り切れない「はみ出し分」のバイトを **29行目** で捨てています。

</div>

### まず、言葉の確認

- **バイト**: 0〜255 の整数1つぶんのデータです。乱数バイトなら、0〜255 のどれかが同じ確率で出ます（全部で **256 通り**）
- **`%`（剰余、モジュロ）**: 割り算の余りです。`37 % 10` は `7`。どんな数でも `% 10` すると 0〜9 のどれかになります
- **`alphabet`**: ID に使ってよい文字を並べた文字列です。この解説では例として `alphabet = '0123456789'`（10文字）を使います。`alphabet[7]` は `'7'` です
- **偏り（バイアス）**: 本当は全部同じ確率で出てほしいのに、出やすいものと出にくいものができてしまうことです

<div class="note">

**たとえ話**: 256 枚のカードを 10 人に1枚ずつ順番に配ると、1人 25 枚ずつ配ったところで **6 枚余ります**。余りも配り続けると、最初の 6 人だけ 26 枚、残りの 4 人は 25 枚になって不公平です。公平にしたいなら、余った 6 枚は **配らずに捨てる** しかありません。nanoid がやっているのはこれです。

</div>

### 図で見る：どのバイトを捨てるのか

<figure class="fig">
<svg viewBox="-2 0 344 230" width="420" role="img" aria-label="0から255のバイトのうち、0から249は10文字に25通りずつ割り当てられる。250から255を使うと文字0から5だけ1通り多くなるので捨てる">
<text x="4" y="18" class="bold">乱数バイト（0〜255 の 256 通り）</text>
<rect x="4" y="28" width="262" height="34" rx="4" class="bok"/>
<text x="135" y="50" text-anchor="middle">0〜249（250 個）</text>
<rect x="268" y="28" width="68" height="34" rx="4" class="bng"/>
<text x="302" y="49" text-anchor="middle" class="sm">250〜255</text>
<text x="135" y="84" text-anchor="middle" class="tok bold">% 10 で文字へ</text>
<text x="302" y="84" text-anchor="middle" class="tng bold">捨てる</text>
<text x="4" y="106" class="tm">文字ごとのバイトの数</text>
<rect x="4" y="114" width="30" height="22" rx="3" class="bng dash"/><text x="19" y="130" text-anchor="middle" class="sm">+1</text>
<rect x="38" y="114" width="30" height="22" rx="3" class="bng dash"/><text x="53" y="130" text-anchor="middle" class="sm">+1</text>
<rect x="72" y="114" width="30" height="22" rx="3" class="bng dash"/><text x="87" y="130" text-anchor="middle" class="sm">+1</text>
<rect x="106" y="114" width="30" height="22" rx="3" class="bng dash"/><text x="121" y="130" text-anchor="middle" class="sm">+1</text>
<rect x="140" y="114" width="30" height="22" rx="3" class="bng dash"/><text x="155" y="130" text-anchor="middle" class="sm">+1</text>
<rect x="174" y="114" width="30" height="22" rx="3" class="bng dash"/><text x="189" y="130" text-anchor="middle" class="sm">+1</text>
<rect x="4" y="140" width="30" height="44" rx="3" class="bok"/><text x="19" y="167" text-anchor="middle">25</text>
<rect x="38" y="140" width="30" height="44" rx="3" class="bok"/><text x="53" y="167" text-anchor="middle">25</text>
<rect x="72" y="140" width="30" height="44" rx="3" class="bok"/><text x="87" y="167" text-anchor="middle">25</text>
<rect x="106" y="140" width="30" height="44" rx="3" class="bok"/><text x="121" y="167" text-anchor="middle">25</text>
<rect x="140" y="140" width="30" height="44" rx="3" class="bok"/><text x="155" y="167" text-anchor="middle">25</text>
<rect x="174" y="140" width="30" height="44" rx="3" class="bok"/><text x="189" y="167" text-anchor="middle">25</text>
<rect x="208" y="140" width="30" height="44" rx="3" class="bok"/><text x="223" y="167" text-anchor="middle">25</text>
<rect x="242" y="140" width="30" height="44" rx="3" class="bok"/><text x="257" y="167" text-anchor="middle">25</text>
<rect x="276" y="140" width="30" height="44" rx="3" class="bok"/><text x="291" y="167" text-anchor="middle">25</text>
<rect x="310" y="140" width="30" height="44" rx="3" class="bok"/><text x="325" y="167" text-anchor="middle">25</text>
<text x="19" y="204" text-anchor="middle" class="mono">'0'</text>
<text x="53" y="204" text-anchor="middle" class="mono">'1'</text>
<text x="87" y="204" text-anchor="middle" class="mono">'2'</text>
<text x="121" y="204" text-anchor="middle" class="mono">'3'</text>
<text x="155" y="204" text-anchor="middle" class="mono">'4'</text>
<text x="189" y="204" text-anchor="middle" class="mono">'5'</text>
<text x="223" y="204" text-anchor="middle" class="mono">'6'</text>
<text x="257" y="204" text-anchor="middle" class="mono">'7'</text>
<text x="291" y="204" text-anchor="middle" class="mono">'8'</text>
<text x="325" y="204" text-anchor="middle" class="mono">'9'</text>
<text x="170" y="225" text-anchor="middle" class="sm tm">（赤の幅は見やすいように誇張）</text>
</svg>
<figcaption>緑だけを使えば、どの文字もちょうど 25 通り。赤（250〜255）まで使うと、'0'〜'5' だけ 26 通りになって出やすくなる</figcaption>
</figure>

たとえば 250 は `250 % 10 = 0` なので `'0'`、255 は `255 % 10 = 5` なので `'5'` になります。だから余りの 6 個は、全部 `'0'`〜`'5'` のどれかに上乗せされてしまうのです。

### コードを順番に追う

**① どこから先を捨てるか決める（2行目）**

```js
let safeByteCutoff = 256 - (256 % alphabet.length)
```

`alphabet.length` が 10 なら、`256 % 10 = 6`（余り6）なので `safeByteCutoff = 256 - 6 = 250`。「**250 未満なら使ってよい**」という境目です。250 は 10 で割り切れるので、0〜249 はどの文字にもちょうど 25 個ずつ対応します。

**② バイトを多めにもらう（24・26行目）**

捨てるバイトがあるので、ほしい文字数ぴったりのバイトでは足りなくなるかもしれません。そこで **24行目** で多めの個数 `step` を計算し、**26行目** でその数だけ乱数バイトをもらいます。

5文字の ID なら `step = Math.ceil(1.6 × 256 × 5 ÷ 250) = Math.ceil(8.192) = 9` で、9 バイトもらいます。

**③ 1バイトずつ、使うか捨てるか決める（28〜31行目）**

`while (i--)` なので、配列の **後ろから** 順に見ます。もらったバイトが `[37, 254, 120, 9, 251, 66, 200, 13, 88]` だったとすると:

| i | bytes[i] | 250 未満？（29行目） | 文字（30行目） | id |
| --- | --- | --- | --- | --- |
| 8 | 88 | はい | `88 % 10 = 8` → `'8'` | `"8"` |
| 7 | 13 | はい | `'3'` | `"83"` |
| 6 | 200 | はい | `'0'` | `"830"` |
| 5 | 66 | はい | `'6'` | `"8306"` |
| 4 | 251 | **いいえ → 捨てる** | — | `"8306"` |
| 3 | 9 | はい | `'9'` | `"83069"` |

5文字そろったので、**31行目** の `if (id.length >= size) return id` で `"83069"` を返します。残りのバイト（120、254、37）は使いません。もし途中でバイトが足りなくなったら、`while (true)`（25行目）で戻って、またバイトをもらい直します。

### ここがポイント

- `%` の結果は必ず `0`〜`length - 1` なので、**範囲外を指す心配はもともとない**。捨てる理由は「公平さ」のため
- ID は「推測されにくいこと」が命です。出やすい文字があると、そのぶん推測しやすくなってしまう
- 捨てるのは、割り切れない「はみ出し分」だけ。文字数によって捨てる割合は変わります

| 文字の種類（例） | 文字数 | `256 % 文字数` | `safeByteCutoff` | 捨てる割合 |
| --- | --- | --- | --- | --- |
| 数字だけ | 10 | 6 | 250 | 約 2.3% |
| 英小文字＋数字 | 36 | 4 | 252 | 約 1.6% |
| 英大小文字＋数字 | 62 | 8 | 248 | 約 3.1% |
| URL 用の 64 文字 | 64 | 0 | 256 | 0%（捨てない） |

### もっと知りたい人へ

- **4〜19行目**: 文字数が 2 のべき乗（64 など）なら 256 で割り切れるので、捨てるバイトがありません（`safeByteCutoff === 256`）。このときは `% length` の代わりに `& mask`（`mask = length - 1`）を使います。結果は同じで、計算がより軽くなります
- **24行目の `1.6`**: 使えるバイトの割合は `safeByteCutoff / 256` です。それで割って必要な個数を見積もり、さらに 1.6 倍の余裕を持たせています。1.6 はベンチマークで選んだ係数です（元のソースのコメントより）
- 元のソースでは、この理由がコメントで丁寧に説明されています。出典リンクから読み比べてみてください
