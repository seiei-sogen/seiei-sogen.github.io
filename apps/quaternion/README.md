# クォータニオンを手で回す

クォータニオン（四元数）を3Dで動かして確かめるページ。ブログの `/et-cetera/quaternion/` で配信する。

- TanStack Start（React）で全ページをビルド時にプリレンダーする静的サイト。サーバー処理なし
- 4つの実験をタブで切り替える。タブごとにURLがある（`/`・`/double-cover`・`/euler`・`/hypersphere`）
- 説明は中学生でも読めることを目標にしている。式は「式で見たい人へ」に折りたたむ
- 3D は React Three Fiber（three.js）。ブラウザでだけ遅延読み込みする
- 数値計算は `src/lib/quat.ts`（three.js 非依存）

## 開発

リポジトリのルートで `just` を使う。

```sh
just quaternion-install   # 依存のインストール
just quaternion-dev       # http://localhost:3000
just quaternion           # ビルド → 型チェック → public/et-cetera/quaternion/ に取り込み
```

`public/et-cetera/quaternion/` はビルド成果物。直接編集せず、`just quaternion` で作り直してコミットする。

## 構成

```
src/routes/__root.tsx    共通の枠（冒頭の図解とタブ）
src/routes/              index = 1 軸と角度 ・ double-cover = 2 ふた回り ・ euler = 3 オイラー角 ・ hypersphere = 4 四次元
src/sections/            実験ごとの状態・操作盤・説明文
  AxisAngle.tsx          1 軸と角度
  DoubleCover.tsx        2 二重被覆（1回転では戻らない）
  EulerCompare.tsx       3 オイラー角との比較（ジンバルロック / 補間）
  Hypersphere.tsx        4 立体射影（円→線、球→板、4次元の球→空間）
src/scenes/              3Dシーン（遅延読み込み。three.js を使うのはここだけ）
src/figures/             説明用の静的な図（SVG）
src/components/          スライダー、q の表示、半角の文字盤、ステージ枠、「やってみよう」など
src/lib/quat.ts          四元数の計算
src/lib/stereo.ts        立体射影の計算
```
