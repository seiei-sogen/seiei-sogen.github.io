import type { ProblemInput } from '../types';

export const problem: ProblemInput = {
  id: '002-tiny-invariant',
  level: 'beginner',
  kind: 'intent',
  title: 'tiny-invariant: 本番で消えるメッセージ',
  question:
    '19〜21行目で、本番（`isProduction` が true）のときはメッセージを使わず `prefix` だけで throw している。主なねらいはどれか。',
  language: 'ts',
  choices: [
    {
      text: '本番ビルドで23行目以降を到達しないコードとして削除させ、バンドルを小さくするため',
      why: '24行目のコメントどおり。`NODE_ENV` が定数に置き換わると、20行目より後は消せるコードになる。',
    },
    {
      text: 'エラーメッセージに含まれる内部情報を、本番のユーザーに見せないため',
      why: '結果として表示はされないが、呼び出し側に書いたメッセージ文字列はバンドルに残る。隠す仕組みにはなっていない。',
    },
    {
      text: '本番では `condition` が常に真になるので、メッセージを組み立てる必要がないため',
      why: '13行目の判定は本番でも同じように行われる。偽なら20行目で throw される。',
    },
    {
      text: '`message` が関数のとき、本番で二重に呼ばれるのを防ぐため',
      why: '26行目で `message()` を呼ぶのはもともと1回だけ。二重呼び出しの問題はない。',
    },
  ],
  answer: 0,
  evidenceLines: [1, 19, 20, 24],
  source: {
    repo: 'alexreardon/tiny-invariant',
    commit: 'b5587cf4ba45e257bce49053c3345b6614324252',
    path: 'src/tiny-invariant.ts',
    lines: [1, 48],
    license: 'MIT',
    licenseKey: 'tiny-invariant',
    modified: true,
    modification: '関数の前の JSDoc コメント（元の4〜18行目）を省略',
  },
};
