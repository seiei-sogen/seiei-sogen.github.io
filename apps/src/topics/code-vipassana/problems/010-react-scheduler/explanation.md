<div class="lead">

**ひとことで言うと**: 親を子と入れ替えて下に沈めるとき、子が2人とも親より小さいなら、**小さいほうの子** を上に上げないとルールが崩れます。その「左と右、どっちが小さい？」を比べているのが **71行目** の `compare(right, left) < 0` です。

</div>

### まず、言葉の確認

**ヒープ** は「一番小さいものを、すぐ取り出せる」ように並べたデータの形です。React のスケジューラは、やるべき仕事（タスク）をヒープに入れ、一番急ぐものから順に実行します。急ぐほど `sortIndex` が小さくなります。

**最小ヒープのルール（不変条件）** はたった1つです。

<div class="note">

**どの親も、自分の子より小さいか同じ。**

トーナメント表を逆さにしたような木を思い浮かべてください。どの枝を見ても「上のほうが小さい」ので、**一番上（根）が全体で一番小さい** ことが保証されます。だから `peek`（23〜25行目）は `heap[0]` を返すだけで済みます。

</div>

**不変条件** とは「いつどんな操作をした後でも、必ず守られているルール」のことです。ヒープの関数は、どれもこのルールを壊さないように作られています。

**siftDown（シフトダウン）** は、ルールに合わない位置に置かれた要素を、子と入れ替えながら **下へ沈めていく** 処理です。逆に `siftUp`（42〜57行目）は **上へ浮かせる** 処理です。

### 図で見る①：木と配列の対応

ヒープは木の形で考えますが、実際には **ただの配列** に入っています。上の段から、左から右へ順に詰めていきます。

<figure class="fig">
<svg viewBox="0 0 320 262" width="320" role="img" aria-label="配列 1,3,2,7,4,5 を木にした図。0番の子は1番と2番、1番の子は3番と4番、2番の子は5番">
<line x1="160" y1="30" x2="90" y2="90" class="l"/>
<line x1="160" y1="30" x2="230" y2="90" class="l"/>
<line x1="90" y1="90" x2="50" y2="150" class="l"/>
<line x1="90" y1="90" x2="130" y2="150" class="l"/>
<line x1="230" y1="90" x2="190" y2="150" class="l"/>
<circle cx="160" cy="30" r="18" class="ba"/>
<text x="160" y="35" text-anchor="middle" class="bold">1</text>
<text x="184" y="26" class="sm tm mono">[0]</text>
<circle cx="90" cy="90" r="18" class="b"/>
<text x="90" y="95" text-anchor="middle">3</text>
<text x="56" y="86" class="sm tm mono">[1]</text>
<circle cx="230" cy="90" r="18" class="b"/>
<text x="230" y="95" text-anchor="middle">2</text>
<text x="254" y="86" class="sm tm mono">[2]</text>
<circle cx="50" cy="150" r="18" class="b"/>
<text x="50" y="155" text-anchor="middle">7</text>
<circle cx="130" cy="150" r="18" class="b"/>
<text x="130" y="155" text-anchor="middle">4</text>
<circle cx="190" cy="150" r="18" class="b"/>
<text x="190" y="155" text-anchor="middle">5</text>
<text x="50" y="184" text-anchor="middle" class="sm tm mono">[3]</text>
<text x="130" y="184" text-anchor="middle" class="sm tm mono">[4]</text>
<text x="190" y="184" text-anchor="middle" class="sm tm mono">[5]</text>
<rect x="22" y="204" width="46" height="34" class="ba"/>
<rect x="68" y="204" width="46" height="34" class="b"/>
<rect x="114" y="204" width="46" height="34" class="b"/>
<rect x="160" y="204" width="46" height="34" class="b"/>
<rect x="206" y="204" width="46" height="34" class="b"/>
<rect x="252" y="204" width="46" height="34" class="b"/>
<text x="45" y="226" text-anchor="middle" class="bold">1</text>
<text x="91" y="226" text-anchor="middle">3</text>
<text x="137" y="226" text-anchor="middle">2</text>
<text x="183" y="226" text-anchor="middle">7</text>
<text x="229" y="226" text-anchor="middle">4</text>
<text x="275" y="226" text-anchor="middle">5</text>
<text x="45" y="256" text-anchor="middle" class="sm tm mono">0</text>
<text x="91" y="256" text-anchor="middle" class="sm tm mono">1</text>
<text x="137" y="256" text-anchor="middle" class="sm tm mono">2</text>
<text x="183" y="256" text-anchor="middle" class="sm tm mono">3</text>
<text x="229" y="256" text-anchor="middle" class="sm tm mono">4</text>
<text x="275" y="256" text-anchor="middle" class="sm tm mono">5</text>
</svg>
<figcaption>上が木、下が実際の配列。[ ] の数字が配列の位置（インデックス）</figcaption>
</figure>

配列の位置だけで親子がわかるのがヒープの便利なところです。

- **左の子の位置** = `2 × i + 1`（例: 位置1の左の子は 3）… 64行目
- **右の子の位置** = 左の子 + 1（例: 位置1の右の子は 4）… 66行目
- **親の位置** = `(i − 1) ÷ 2` の切り捨て（例: 位置3や4の親は 1）… 45行目

64行目の `(index + 1) * 2 - 1` は、計算すると `2 * index + 1` と同じです。`>>> 1` は「2で割って小数点以下を切り捨てる」の短い書き方です。

### 図で見る②：なぜ「小さいほう」と入れ替えるのか

根に `5` が置かれ、子が `3` と `2` だったとします。どちらも `5` より小さいので、どちらかと入れ替えて `5` を沈めます。

<figure class="fig">
<svg viewBox="0 0 320 168" width="320" role="img" aria-label="入れ替える前は親5、子3と2。大きいほうの3と入れ替えると親3、子5と2になり、3が2より大きいのでルール違反。小さいほうの2と入れ替えると親2、子3と5になりルールを守れる">
<text x="53" y="14" text-anchor="middle" class="sm bold">入れ替える前</text>
<line x1="53" y1="42" x2="27" y2="98" class="l"/>
<line x1="53" y1="42" x2="79" y2="98" class="l"/>
<circle cx="53" cy="42" r="16" class="bev"/>
<text x="53" y="47" text-anchor="middle" class="bold">5</text>
<circle cx="27" cy="98" r="16" class="b"/>
<text x="27" y="103" text-anchor="middle">3</text>
<circle cx="79" cy="98" r="16" class="b"/>
<text x="79" y="103" text-anchor="middle">2</text>
<text x="53" y="138" text-anchor="middle" class="sm tm">左も右も</text>
<text x="53" y="156" text-anchor="middle" class="sm tm">5 より小さい</text>
<text x="160" y="14" text-anchor="middle" class="sm bold">3 と入れ替え</text>
<line x1="160" y1="42" x2="134" y2="98" class="l"/>
<line x1="160" y1="42" x2="186" y2="98" class="lng"/>
<circle cx="160" cy="42" r="16" class="bng"/>
<text x="160" y="47" text-anchor="middle" class="bold">3</text>
<circle cx="134" cy="98" r="16" class="b"/>
<text x="134" y="103" text-anchor="middle">5</text>
<circle cx="186" cy="98" r="16" class="bng"/>
<text x="186" y="103" text-anchor="middle">2</text>
<text x="160" y="138" text-anchor="middle" class="sm tng bold">✗ 親 3 ＞ 子 2</text>
<text x="160" y="156" text-anchor="middle" class="sm tng">ルール違反</text>
<text x="267" y="14" text-anchor="middle" class="sm bold">2 と入れ替え</text>
<line x1="267" y1="42" x2="241" y2="98" class="lok"/>
<line x1="267" y1="42" x2="293" y2="98" class="lok"/>
<circle cx="267" cy="42" r="16" class="bok"/>
<text x="267" y="47" text-anchor="middle" class="bold">2</text>
<circle cx="241" cy="98" r="16" class="b"/>
<text x="241" y="103" text-anchor="middle">3</text>
<circle cx="293" cy="98" r="16" class="b"/>
<text x="293" y="103" text-anchor="middle">5</text>
<text x="267" y="138" text-anchor="middle" class="sm tok bold">✓ 2 ≦ 3、2 ≦ 5</text>
<text x="267" y="156" text-anchor="middle" class="sm tok">ルールを守れる</text>
</svg>
<figcaption>小さいほうを上げれば、新しい親は残ったもう一方の子よりも必ず小さい</figcaption>
</figure>

大きいほう（3）を上げてしまうと、もう一方の子（2）のほうが小さいので「親 ≦ 子」が崩れます。小さいほう（2）を上げれば、2 は 3 よりも 5 よりも小さいので、ルールが守られます。

### コードを順番に追う

図①のヒープ `[1, 3, 2, 7, 4, 5]` から、一番小さい `1` を `pop` で取り出してみます。

1. **31行目**: 先頭の `1` を `first` にとっておきます
2. **32行目**: 末尾の `5` を配列から外します。配列は `[1, 3, 2, 7, 4]`
3. **35行目**: その `5` を先頭に置きます。配列は `[5, 3, 2, 7, 4]`。根が 5 なのでルールが崩れています
4. **37行目**: `siftDown` で 5 を沈めます

`siftDown` の中（`index` は 0、`length` は 5）:

1. **62〜63行目**: `halfLength = 5 >>> 1 = 2`。位置が 2 より小さい間だけ続けます。今は 0 なので続けます
2. **64〜67行目**: 左右の子を取り出します。左 = 位置1の `3`、右 = 位置2の `2`
3. **70行目**: 左は node（5）より小さい？ → 3 < 5 で「はい」
4. **71行目**: 右の子がいて、しかも **右 < 左**？ → 2 < 3 で「はい」
5. **72〜74行目**: 右と入れ替えます。配列は `[2, 3, 5, 7, 4]`、`index` は 2 になります
6. **63行目に戻る**: 2 < 2 ではないので終わり

結果は `[2, 3, 5, 7, 4]`。次に小さい `2` がちゃんと先頭に来ました。

`if` の分かれ方をまとめると次のとおりです。

- **70行目が「はい」**（左が node より小さい）→ **71行目** で左右を比べ、小さいほうと入れ替え（右なら72〜74行目、左なら76〜78行目）
- **70行目が「いいえ」** でも、右が node より小さければ **80行目** で右と入れ替え。左が node 以上なので、左右を比べるまでもなく右が小さい
- どちらの子も node 以上なら **86行目** で終わり。もう正しい位置です

### ここがポイント

- ヒープのルールは「どの親も子以下」だけ。左の子と右の子の大小は決まっていない
- だから沈めるときは、子どうしを比べて **小さいほう** を選ぶ必要がある。それが71行目
- 71行目の `rightIndex < length` は「右の子が本当にいるか」の確認。末尾の親は左の子しか持たないことがある

### もっと知りたい人へ

- **62〜63行目**: 配列の後ろ半分（位置 `length >>> 1` 以降）は子を持たない「葉」です。葉まで来たらそれ以上沈められないので、そこでループを止めます
- **91〜94行目**: `sortIndex` が同じなら `id` で比べます。`id` は登録順に増えるので、同じ急ぎ具合のタスクは先に入れたものから実行されます
- **42〜57行目**: `push` で使う `siftUp` は逆向きです。末尾に置いた要素を、親より小さい間だけ上へ浮かせます
- `pop` も `push` も、木の高さぶん（要素数 n に対して約 log₂ n 回）しか入れ替えないので、タスクが増えても速いままです
