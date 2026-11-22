# クォータニオンを手で回す

クォータニオン（四元数）を3Dで動かして確かめるページ。ブログの `/et-cetera/quaternion/` で配信する。

- TanStack Start（React）で全ページをビルド時にプリレンダーする静的サイト。サーバー処理なし
- 3つの実験はタブで切り替える。タブごとにURLがある（`/`・`/double-cover`・`/euler`）
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
src/routes/__root.tsx    共通の枠（冒頭の式とタブ）
src/routes/              index = 1 軸と角度 ・ double-cover = 2 二重被覆 ・ euler = 3 オイラー角
src/sections/            実験ごとの状態・操作盤・説明文
  AxisAngle.tsx          1 軸と角度
  DoubleCover.tsx        2 二重被覆（360°では元に戻らない）
  EulerCompare.tsx       3 オイラー角との比較（ジンバルロック / 補間）
src/scenes/              3Dシーン（遅延読み込み。three.js を使うのはここだけ）
src/components/          スライダー、q の表示、半角の文字盤、ステージ枠
src/lib/quat.ts          四元数の計算
```
