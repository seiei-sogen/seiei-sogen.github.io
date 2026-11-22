import type { ProblemInput } from '../types';

export const problem: ProblemInput = {
  id: '009-zustand',
  level: 'advanced',
  kind: 'intent',
  title: 'zustand: 参照比較で決まる「変化」',
  question:
    '73行目では、状態を更新してリスナーに通知するかどうかを `Object.is(nextState, state)` だけで決めている。この設計の前提として最も適切なものはどれか。',
  language: 'ts',
  choices: [
    {
      text: '状態は書き換えず、変えるときは新しいオブジェクトを渡すという約束。だから参照が同じなら「変化なし」とみなせる',
      why: '中身を見ずに O(1) で判定できる。約束を破って同じオブジェクトを書き換えて返すと、通知されない。',
    },
    {
      text: '`Object.is` はオブジェクトの中身まで比べるので、値が同じなら通知を省ける',
      why: '`Object.is` は参照の比較。中身が同じでも別のオブジェクトなら「変化あり」になる。',
    },
    {
      text: '78行目でマージした結果と元の state を比べ、差分があるときだけ通知する',
      why: '比較（73行目）はマージ（78行目）より前。比べているのは渡された `nextState` そのもの。',
    },
    {
      text: '`NaN` や `-0` のような特殊な値を含む状態を、毎回「変化あり」として通知するため',
      why: '`Object.is(NaN, NaN)` は true。`===` と違い、NaN を同じ値とみなす比較。',
    },
  ],
  answer: 0,
  evidenceLines: [69, 70, 71, 72, 73, 78, 79],
  source: {
    repo: 'pmndrs/zustand',
    commit: '9fed2eb2f3af672da9f7bf694b996df3831fc207',
    path: 'src/vanilla.ts',
    lines: [60, 100],
    license: 'MIT',
    licenseKey: 'zustand',
    modified: false,
  },
};
