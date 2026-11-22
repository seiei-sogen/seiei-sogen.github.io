# apps — et cetera

ブログの `/et-cetera/` 配下で配信する、動かして確かめるページ置き場。
TanStack Start（SolidJS）のアプリはこの `apps/` 1つだけで、トピック（クォータニオンなど）はその下の階層として足していく。依存のインストールもビルドも1回で済む。

- 全ページをビルド時にプリレンダーする静的サイト。サーバー処理なし
- トピックごとに URL の階層・レイアウト・CSS が独立している（`/et-cetera/<トピック名>/…`）
- `/et-cetera/` はトピックの一覧

## 開発

リポジトリのルートで `just` を使う。

```sh
just apps-install   # 依存のインストール
just apps-dev       # http://localhost:3000
just apps-build     # ビルド → 型チェック → public/et-cetera/ に取り込み
```

`public/et-cetera/` はビルド成果物。直接編集せず、`just apps-build` で作り直してコミットする。

## 構成

```
src/routes/__root.tsx        全体の外枠（<html> とテーマの初期化だけ。トピック固有のものは置かない）
src/routes/index.tsx         /et-cetera/ … トピック一覧
src/routes/<トピック名>/      そのトピックの URL
  route.tsx                  トピックの枠（見出し・ナビなど）。CSS もここで読み込む
  index.tsx ほか             各ページ
src/topics/<トピック名>/      そのトピックの中身（コンポーネント、計算、CSS など。構成は自由）
src/topics.ts                トピック一覧のデータ
src/shared/                  トピックをまたいで使うもの（テーマ切り替えなど）
plugins/                     ビルド時の変換（Vite プラグイン）
```

## トピックを足すとき

1. `src/topics/<名前>/` に中身を作る。CSS もこの中に置く
2. `src/routes/<名前>/route.tsx` を作り、`head` の `links` でその CSS を読み込む。ページは同じフォルダに `index.tsx` などで足す
3. `src/topics.ts` に1件追加する（一覧に出る）
4. `just apps-build` で `public/et-cetera/` を作り直す
5. 検索エンジンに知らせたいページは、リポジトリのルートの `astro.config.mjs` の `sitemap.customPages` に足す

CSS はトピックの `route.tsx` で読み込んだものだけが効くので、色や書体はトピックごとに自由に決めてよい。
ただし、トピックをまたぐリンク（一覧 ↔ トピック、トピック ↔ 別のトピック）には `<Link reloadDocument>` を使うこと。ページを読み込み直さずに移動すると、前のトピックの CSS が残って混ざる。トピックの中のリンクはふつうの `<Link>` でよい。
ダーク／ライトは `<html data-theme="light">` の有無で決まる（既定はダーク）。CSS は `:root` をダーク、`:root[data-theme='light']` をライトとして書く。切り替えボタンは `src/shared/theme.tsx` の `ThemeToggle`。

重いライブラリ（three.js など）は `lazy(() => import(...))` で読み込み、そのトピックを開いたときだけ取りに行くようにする。

## SolidJS で書くときの注意

- SolidJS は 1.9 系（TanStack Solid Router が 1.x を前提にしているため）
- ページを読み込み直さない移動（タブ切り替えなど）では、ルートの `head()` の `title` が `<title>` に反映されない。`src/routes/__root.tsx` の `TitleSync` が `document.title` を合わせている

## いまあるトピック

### code-vipassana — Code Vipassana

OSSの実コードを1画面ぶん読み、4択の設問に答えるコードリーディング練習（全10問）。

- シンタックスハイライト（Shiki）と解説の Markdown 変換はビルド時に行い、ブラウザには HTML だけを送る（`plugins/problem-assets.ts`）
- 進捗は `localStorage`（`code-vipassana:progress:v1`）に「初回正解 / 再挑戦で正解 / 未正解」で保存

```
src/routes/code-vipassana/   route = 枠（ヘッダーとフッター） ・ index = 問題一覧 ・ problems/$id = 問題 ・ licenses = 出典とライセンス
src/topics/code-vipassana/
  problems/
    types.ts                 Problem 型
    index.ts                 問題の集約と検証（不整合があるとビルドが落ちる）
    001-clsx/
      problem.ts             設問・選択肢・正解・根拠行・出典
      snippet.js.txt         表示するコードそのまま（拡張子の手前が言語）
      explanation.md         解説
  licenses/                  使用したOSSのライセンス全文
  lib/                       進捗の保存、選択肢のシャッフル、インラインコード
  styles.css                 このトピックの CSS
```

問題を足すとき:

1. `src/topics/code-vipassana/problems/NNN-name/` を作り、上の3ファイルを置く
2. `source.commit` はタグではなくコミットSHAで固定する
3. 抜粋に手を加えたら `modified: true` と `modification` を書く（画面に「一部改変」と出る）
4. 新しいOSSから引用するときは `licenses/` にライセンス全文を足し、`licenses/index.ts` に登録する

### quaternion — クォータニオンを手で回す

クォータニオン（四元数）を3Dで動かして確かめる。3D は three.js を [solid-three](https://github.com/solidjs-community/solid-three) 経由で JSX として書いている。

solid-three は開発版（`0.3.0-next.11`）を版を固定して使っている。配布されている README と実際の API が一部違う（例: `<Canvas>` のカメラ指定は `camera` ではなく `defaultCamera`、`useThree()` のカメラは `currentCamera`）。solid-three を直接使っているのは `scenes/` の中だけなので、差し替えるときはそこだけ見ればよい。太い線（`FatLine`）・視点のドラッグ・文字ラベルは three.js を直接使っている。

```
src/routes/quaternion/       route = 枠（冒頭の図解とタブ） ・ index = 1 軸と角度 ・ double-cover = 2 ふた回り
                             euler = 3 オイラー角 ・ hypersphere = 4 四次元
src/topics/quaternion/
  sections/                  実験ごとの状態・操作盤・説明文
  scenes/                    3Dシーン（遅延読み込み。three.js と solid-three を使うのはここだけ）
  figures/                   説明用の静的な図（SVG）
  components/                スライダー、q の表示、半角の文字盤、ステージ枠、「やってみよう」など
  lib/quat.ts                四元数の計算（three.js 非依存）
  lib/stereo.ts              立体射影の計算
  styles.css                 このトピックの CSS
```

説明は中学生でも読めることを目標にしている。式は「式で見たい人へ」に折りたたむ。

### designing-data-intensive-applications-2nd — データ指向アプリケーションデザイン 第2版 図解ノート

『データ指向アプリケーションデザイン 第2版』を章ごとに図解したページ。ダークモード専用、本文 27px 以上・行間 2。

目次（`/et-cetera/designing-data-intensive-applications-2nd/`）だけがルートで、各章のページはルーターを通さない1枚ものの HTML を `public/` にそのまま置いている。Vite が `public/` をビルド結果にコピーするので、`just apps-build` で `public/et-cetera/designing-data-intensive-applications-2nd/<slug>/` に出る。目次から章へは `<a>` で開く（`<Link>` は使わない）。

```
src/routes/designing-data-intensive-applications-2nd/   route = 枠（フッター） ・ index = 目次
src/topics/designing-data-intensive-applications-2nd/
  chapters.ts                目次に並べる章（slug・番号・題・説明）
  styles.css                 目次の CSS
public/designing-data-intensive-applications-2nd/
  <slug>/index.html          各章のページ（1枚もの。CSS もスクリプトもこの中）
```

章を足すとき:

1. `public/designing-data-intensive-applications-2nd/<slug>/index.html` に HTML を置く
2. 目次へ戻るリンクを入れる。既存の章のファイルから `etc-ddia-nav` の部分（`</head>` の直前の `<style>`、`<body>` の直後と `</body>` の直前の `<nav>`）をそのまま写す
3. `src/topics/designing-data-intensive-applications-2nd/chapters.ts` に1件追加する
4. リポジトリのルートの `astro.config.mjs` の `sitemap.customPages` の slug の並びに足す
