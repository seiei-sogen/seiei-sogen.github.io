<div class="lead">

**ひとことで言うと**: 73行目は「中身が同じか」ではなく **「同じオブジェクトそのものか」** だけを見ています。これでうまくいくのは、「状態を変えるときは、元のオブジェクトを書き換えずに **新しいオブジェクトを作る**」という約束があるからです。

</div>

### まず、言葉の確認

**ストア（store）** は、アプリの「状態（state）」を1か所にしまっておく入れ物です。たとえば `{ count: 0 }` のようなオブジェクトが状態です。

**リスナー** は「状態が変わったら教えてね」と登録しておく関数です。`subscribe` で登録し（89行目）、状態が変わると79行目で呼ばれます。画面の再描画などに使われます。

**参照** は、オブジェクトの「置き場所」のことです。変数にオブジェクトを入れるとき、実際に入るのはオブジェクトそのものではなく、その置き場所を指す **矢印** のようなものです。

<div class="note">

**たとえ**: オブジェクトはロッカーの中身、変数はロッカーの番号札です。`Object.is(a, b)` は「2枚の番号札が **同じロッカー** を指しているか」を見るだけで、ロッカーを開けて中身を比べたりはしません。だから一瞬で終わります。

</div>

**イミュータブル（immutable）な更新** とは、「元のオブジェクトは書き換えず、変えたいときは新しいオブジェクトを作る」やり方です。zustand はこれを前提にしています。

### 図で見る：Object.is が見ているもの

`{ count: 0 }` の状態に、3通りの `setState` をしたときの様子です。矢印が「どのオブジェクトを指しているか」を表します。

<figure class="fig">
<svg viewBox="0 0 320 392" width="320" role="img" aria-label="1つ目、s をそのまま返すと state と nextState は同じオブジェクトを指し通知なし。2つ目、新しい空オブジェクトを渡すと別のオブジェクトなので通知あり。3つ目、s を書き換えて返すと同じオブジェクトを指すので通知なしだが中身は変わっている">
<defs><marker id="m009a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="ah"/></marker></defs>
<text x="4" y="16" class="mono sm bold">① setState((s) =&gt; s)</text>
<rect x="4" y="26" width="86" height="28" rx="6" class="b"/>
<text x="47" y="45" text-anchor="middle" class="mono sm">state</text>
<rect x="4" y="62" width="86" height="28" rx="6" class="b"/>
<text x="47" y="81" text-anchor="middle" class="mono sm">nextState</text>
<rect x="176" y="38" width="140" height="40" rx="8" class="b"/>
<text x="246" y="63" text-anchor="middle" class="mono sm">{ count: 0 }</text>
<line x1="90" y1="40" x2="174" y2="52" class="l" marker-end="url(#m009a)"/>
<line x1="90" y1="76" x2="174" y2="64" class="l" marker-end="url(#m009a)"/>
<text x="4" y="110" class="sm tm">同じオブジェクト → true →</text>
<text x="316" y="110" text-anchor="end" class="sm bold">通知しない</text>
<text x="4" y="146" class="mono sm bold">② setState({})</text>
<rect x="4" y="156" width="86" height="28" rx="6" class="b"/>
<text x="47" y="175" text-anchor="middle" class="mono sm">state</text>
<rect x="4" y="192" width="86" height="28" rx="6" class="b"/>
<text x="47" y="211" text-anchor="middle" class="mono sm">nextState</text>
<rect x="176" y="156" width="140" height="28" rx="6" class="b"/>
<text x="246" y="175" text-anchor="middle" class="mono sm">{ count: 0 }</text>
<rect x="176" y="192" width="140" height="28" rx="6" class="ba"/>
<text x="246" y="211" text-anchor="middle" class="mono sm">{ }</text>
<line x1="90" y1="170" x2="174" y2="170" class="l" marker-end="url(#m009a)"/>
<line x1="90" y1="206" x2="174" y2="206" class="l" marker-end="url(#m009a)"/>
<text x="4" y="240" class="sm tm">別のオブジェクト → false →</text>
<text x="316" y="240" text-anchor="end" class="sm bold tok">通知する</text>
<text x="4" y="276" class="mono sm bold">③ (s) =&gt; { s.count = 1; return s }</text>
<rect x="4" y="286" width="86" height="28" rx="6" class="b"/>
<text x="47" y="305" text-anchor="middle" class="mono sm">state</text>
<rect x="4" y="322" width="86" height="28" rx="6" class="b"/>
<text x="47" y="341" text-anchor="middle" class="mono sm">nextState</text>
<rect x="176" y="298" width="140" height="40" rx="8" class="bev"/>
<text x="246" y="323" text-anchor="middle" class="mono sm">{ count: 1 }</text>
<line x1="90" y1="300" x2="174" y2="312" class="l" marker-end="url(#m009a)"/>
<line x1="90" y1="336" x2="174" y2="324" class="l" marker-end="url(#m009a)"/>
<text x="4" y="370" class="sm tm">同じオブジェクト → true →</text>
<text x="316" y="370" text-anchor="end" class="sm bold tng">通知しない</text>
<text x="316" y="388" text-anchor="end" class="sm tng">でも中身は 0 → 1 に変わっている！</text>
</svg>
<figcaption>Object.is は矢印の先が同じかどうかだけを見る。③は約束違反なので、変化を見逃す</figcaption>
</figure>

次の図は、`setState` 全体の流れです。

<figure class="fig">
<svg viewBox="0 0 320 254" width="320" role="img" aria-label="69〜72行目で nextState を決める。73行目で state と同じなら何もしない。違えば75〜78行目で新しいオブジェクトを作り、79行目でリスナーに通知する">
<defs><marker id="m009b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="ah"/></marker></defs>
<rect x="4" y="6" width="312" height="36" rx="8" class="b"/>
<text x="16" y="29">69〜72行目: nextState を決める</text>
<line x1="40" y1="42" x2="40" y2="64" class="l" marker-end="url(#m009b)"/>
<rect x="4" y="66" width="206" height="40" rx="8" class="bev"/>
<text x="16" y="84" class="sm">73行目: state と</text>
<text x="16" y="100" class="sm">同じオブジェクト？</text>
<line x1="210" y1="86" x2="230" y2="86" class="l" marker-end="url(#m009b)"/>
<rect x="232" y="66" width="84" height="40" rx="8" class="b"/>
<text x="274" y="84" text-anchor="middle" class="sm">同じなら</text>
<text x="274" y="100" text-anchor="middle" class="sm">何もしない</text>
<line x1="40" y1="106" x2="40" y2="132" class="l" marker-end="url(#m009b)"/>
<text x="52" y="124" class="sm tm">違うなら</text>
<rect x="4" y="134" width="312" height="52" rx="8" class="ba"/>
<text x="16" y="155">75〜78行目: 新しいオブジェクトを作る</text>
<text x="16" y="176" class="mono sm">Object.assign({}, state, nextState)</text>
<line x1="40" y1="186" x2="40" y2="208" class="l" marker-end="url(#m009b)"/>
<rect x="4" y="210" width="312" height="36" rx="8" class="bok"/>
<text x="16" y="233">79行目: リスナーに知らせる</text>
</svg>
<figcaption>新しい状態は必ず新しいオブジェクトになる（78行目）。だから「矢印が変わった ＝ 状態が変わった」が成り立つ</figcaption>
</figure>

### コードを順番に追う

状態が `{ count: 0 }` のときに `setState({ count: 1 })` を呼んだとします。

1. **69〜72行目**: `partial`（渡したもの）が関数かどうかを見ます。今回は関数ではないので、`nextState` は `{ count: 1 }` そのものです。関数を渡した場合は、今の `state` を渡してその関数を呼び、戻り値を `nextState` にします（71行目）
2. **73行目**: `Object.is(nextState, state)` で、2つが同じオブジェクトかを見ます。`{ count: 1 }` は今作ったばかりの別のオブジェクトなので「違う」。`if` の中に入ります
3. **74行目**: 古い状態を `previousState` にとっておきます
4. **75〜78行目**: `replace` を指定していないので、78行目の `Object.assign({}, state, nextState)` を使います。これは「空のオブジェクト `{}` に、今の state を写し、その上から nextState を上書きする」という意味です。結果は **新しい** `{ count: 1 }` になります
5. **79行目**: 登録されているリスナーを全部呼び、「新しい状態」と「古い状態」を渡します

ポイントは4の **「必ず新しいオブジェクトを作る」** ところです。こうしておけば、`state` の矢印が別のものに変わったときだけ「状態が変わった」と言えます。だから73行目は、中身を1つずつ比べなくても、矢印の比較だけで済むわけです。

### ここがポイント

- `Object.is` は **中身ではなく「同じものか」** を見る。中身が大きくても一瞬で判定できる
- その代わり、③のように **元のオブジェクトを直接書き換えると、変化に気づけない**。React などの画面側も「矢印が変わったら描き直す」という同じ約束で動いているので、画面も更新されない
- zustand のドキュメントが「状態は書き換えず、新しいオブジェクトで返して」と求めるのは、この73行目のため
- 逆に②のように、中身が同じでも新しいオブジェクトを渡すと「変わった」と判断される。深く比べない代わりに、余計な通知は起こりうる、という割り切りです

### もっと知りたい人へ

- `Object.is` と `===` はほぼ同じですが、`Object.is(NaN, NaN)` は `true`（`===` だと `false`）、`Object.is(0, -0)` は `false`（`===` だと `true`）という違いがあります
- 76行目の `replace ?? (…)` は、`replace` を指定しなかったときの既定値です。`nextState` がオブジェクトでない（数値など）か `null` なら、混ぜずにそのまま置き換えます
