<div class="lead">

**ひとことで言うと**: 本番用にビルドすると、**20行目より後ろのコードが丸ごと消える** ように書かれています。メッセージを組み立てるコードがアプリに入らなくなり、ファイルが小さくなる。それがねらいです。

</div>

### まず、言葉の確認

**invariant（インバリアント）** は「絶対に成り立っているはずの条件」のことです。`invariant(user, 'user がいない')` と書くと、「`user` があるはず。なかったらバグなのでエラーにして止めて」という意味になります。

**ビルド** は、書いたソースコードを「ブラウザに配る用のファイル」に変換する作業です。このとき、たくさんのファイルを1つにまとめる道具を **バンドラ**（webpack、Vite など）といいます。

**`process.env.NODE_ENV`** は「いま開発中か、本番用か」を表す値です。本番ビルドでは、バンドラがこの部分を **文字列 `"production"` に書き換えて** しまいます。

**ミニファイ（minify）** は、配るファイルを小さくするために、空白や不要なコードを削る作業です。「絶対に実行されないコード」も削ってくれます。

<div class="note">

**たとえ話**: 引っ越しの荷造りで「この部屋はもう使わない」と決まっていたら、その部屋の荷物は箱に詰めませんよね。ミニファイも同じで、「絶対に通らない」と分かったコードは箱（配るファイル）に入れません。

</div>

### 図で見る：この関数の通り道

<figure class="fig">
<svg viewBox="0 0 340 330" width="340" role="img" aria-label="invariant の流れ図。条件が真なら return。偽なら本番かどうかを見て、本番なら20行目で Invariant failed を投げる。開発なら26から32行目でメッセージを作って投げる。本番では開発側の道に絶対に進まないので削除できる。">
<defs><marker id="p002-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="ah"/></marker></defs>
<rect x="30" y="6" width="160" height="34" rx="8" class="b"/>
<text x="110" y="28" text-anchor="middle" class="mono">invariant(…)</text>
<line x1="110" y1="40" x2="110" y2="58" class="l" marker-end="url(#p002-ah)"/>
<rect x="10" y="60" width="200" height="38" rx="8" class="b"/>
<text x="110" y="84" text-anchor="middle">条件は真？（13行目）</text>
<line x1="210" y1="79" x2="256" y2="79" class="l" marker-end="url(#p002-ah)"/>
<text x="233" y="71" text-anchor="middle" class="sm tok">はい</text>
<rect x="258" y="62" width="76" height="34" rx="8" class="bok"/>
<text x="296" y="84" text-anchor="middle" class="mono">return</text>
<line x1="110" y1="98" x2="110" y2="128" class="l" marker-end="url(#p002-ah)"/>
<text x="120" y="118" class="sm tng">いいえ</text>
<rect x="10" y="130" width="200" height="38" rx="8" class="ba"/>
<text x="110" y="154" text-anchor="middle">本番？（19行目）</text>
<line x1="110" y1="168" x2="110" y2="198" class="l" marker-end="url(#p002-ah)"/>
<text x="120" y="188" class="sm">はい</text>
<rect x="10" y="200" width="200" height="56" rx="8" class="bng"/>
<text x="110" y="222" text-anchor="middle" class="sm">20行目で throw</text>
<text x="110" y="243" text-anchor="middle" class="sm mono">Error('Invariant failed')</text>
<polyline points="210,149 279,149 279,198" class="l" marker-end="url(#p002-ah)"/>
<text x="245" y="141" text-anchor="middle" class="sm">いいえ</text>
<rect x="222" y="200" width="114" height="76" rx="8" class="b dash"/>
<text x="279" y="222" text-anchor="middle" class="sm">26〜32行目</text>
<text x="279" y="243" text-anchor="middle" class="sm">メッセージを</text>
<text x="279" y="264" text-anchor="middle" class="sm">作って throw</text>
<text x="170" y="302" text-anchor="middle" class="sm ta bold">本番では「いいえ」の道に絶対に進まない</text>
<text x="170" y="322" text-anchor="middle" class="sm ta bold">→ 点線の箱はまるごと削除できる</text>
</svg>
<figcaption>本番ビルドでは「本番？」の答えが常に「はい」に決まる</figcaption>
</figure>

### 図で見る：ビルドの前と後

本番ビルドで何が起きるかを、ざっくり並べると次のようになります（実際の出力はもっと短く圧縮されます）。

<figure class="fig">
<h4 style="margin:0 0 6px">① 書いたコード</h4>
<pre><code>const isProduction =
  process.env.NODE_ENV === 'production';
if (isProduction) {
  throw new Error(prefix);
}
const provided = …;
const value = …;
throw new Error(value);</code></pre>
<h4 style="margin:14px 0 6px">② バンドラが NODE_ENV を書き換えた後</h4>
<pre><code>const isProduction =
  'production' === 'production';
// ↑ いつでも true
if (true) {
  throw new Error(prefix);
}
const provided = …;  // 届かない
const value = …;     // 届かない
throw new Error(value); // 届かない</code></pre>
<h4 style="margin:14px 0 6px">③ ミニファイした後</h4>
<pre><code>throw new Error(prefix);
// 届かない行は全部消えた</code></pre>
<figcaption>メッセージを作るコード（26〜32行目）が配るファイルから消える</figcaption>
</figure>

### コードを順番に追う

**① 1行目**: `isProduction` は「`NODE_ENV` が `'production'` かどうか」です。本番ビルドではバンドラがここを文字列に置き換えるので、`isProduction` は **いつでも `true`** という定数になります。

**② 13〜15行目**: `condition` が真なら、何もせずに `return` します。問題がないときはここで終わりです。

**③ 19〜21行目**: 条件が偽で、しかも本番なら、`prefix`（`'Invariant failed'`）だけを入れたエラーを投げます。`throw` した時点で関数は終わります。

**④ 23〜32行目**: 開発中だけ通る部分です。**24行目のコメント** に *This block will be removed in production builds*（このブロックは本番ビルドで削除される）とはっきり書かれています。ここでメッセージを用意して、`'Invariant failed: user がいない'` のようなエラーを投げます。

本番では ③ で必ず `throw` するので、④ には絶対に届きません。届かないコードはミニファイで削除できます。これがこの問題の答えです。

### ここがポイント

- ねらいは **配るファイルを小さくすること**。省略した説明コメント（JSDoc）にも *to help keep bundles small*（バンドルを小さく保つため）と書かれている
- 「本番のユーザーにメッセージを隠すため」ではない。`invariant(x, '秘密の情報')` と書けば、`'秘密の情報'` という文字列は呼び出し側のコードに残っている。表示されないだけで、隠れてはいない
- コードの中のコメント（1行目・24行目）は、意図を知るための一番の手がかりになる

### もっと知りたい人へ

- **11行目**: `message` に関数も渡せるのは、メッセージ作りが重いときに「失敗したときだけ」作らせるため（**遅延評価** といいます）
- **12行目**: `asserts condition` と書いておくと、この関数を呼んだ後は TypeScript が「`condition` は真」とみなして型を絞り込んでくれる
- **6行目**: `message` に初期値を書かないのも、出力を少しでも小さくするため（コメントのとおり）
