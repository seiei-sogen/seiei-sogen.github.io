import type { LinkProps } from '@tanstack/solid-router';

type Topic = {
  /** トピックの入口のパス（src/routes/ の下のフォルダ名と同じ） */
  to: LinkProps['to'];
  title: string;
  description: string;
};

/**
 * et-cetera に置いているトピックの一覧。トップページ（/et-cetera/）に並ぶ。
 * トピックを足したら、ここに1件追加する。
 */
export const TOPICS: readonly Topic[] = [
  {
    to: '/code-vipassana',
    title: 'Code Vipassana',
    description:
      'OSSの実コードを1画面ぶん読んで、4択で答えるコードリーディングの練習問題。初級から上級まで全10問。',
  },
  {
    to: '/quaternion',
    title: 'クォータニオンを手で回す',
    description:
      'ものの向きを表す4つの数が何をしているのかを、3Dで動かして確かめる。軸と角度、二重被覆、オイラー角、四次元の球。',
  },
];
