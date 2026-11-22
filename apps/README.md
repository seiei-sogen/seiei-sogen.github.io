# apps — et cetera

ブログの `/et-cetera/` 配下で配信する、動かして確かめるページ置き場。
TanStack Start（React）のアプリはこの `apps/` 1つだけで、トピック（クォータニオンなど）はその下の階層として足していく。依存のインストールもビルドも1回で済む。

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

## いまあるトピック

### quaternion — クォータニオンを手で回す

クォータニオン（四元数）を3Dで動かして確かめる。3D は React Three Fiber（three.js）。

```
src/routes/quaternion/       route = 枠（冒頭の図解とタブ） ・ index = 1 軸と角度 ・ double-cover = 2 ふた回り
                             euler = 3 オイラー角 ・ hypersphere = 4 四次元
src/topics/quaternion/
  sections/                  実験ごとの状態・操作盤・説明文
  scenes/                    3Dシーン（遅延読み込み。three.js を使うのはここだけ）
  figures/                   説明用の静的な図（SVG）
  components/                スライダー、q の表示、半角の文字盤、ステージ枠、「やってみよう」など
  lib/quat.ts                四元数の計算（three.js 非依存）
  lib/stereo.ts              立体射影の計算
  styles.css                 このトピックの CSS
```

説明は中学生でも読めることを目標にしている。式は「式で見たい人へ」に折りたたむ。
