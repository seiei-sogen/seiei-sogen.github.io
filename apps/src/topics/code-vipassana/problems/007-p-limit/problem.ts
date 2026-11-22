import type { ProblemInput } from '../types';

export const problem: ProblemInput = {
  id: '007-p-limit',
  level: 'intermediate',
  kind: 'line',
  title: 'p-limit: fn はどこで呼ばれるか',
  question:
    '同時実行数に空きがあるとき、`limit(fn)` に渡した `fn` が実際に呼び出されるのは何行目か。',
  language: 'js',
  choices: [
    {
      text: '34行目',
      why: '58行目の `.then` から呼ばれた `run` が、ここで `function_(...arguments_)` を実行する。',
    },
    {
      text: '23行目',
      why: 'この `.run()` は `queueItem.run`、つまり56行目で入れた `internalResolve`。32行目の `run` とは別物で、Promise を解決するだけ。',
    },
    {
      text: '58行目',
      why: '`.then` にコールバックを登録しているだけ。呼ばれるのは Promise が解決された後のマイクロタスク。',
    },
    {
      text: '62行目',
      why: '`resumeNext()` を呼び、その先の23行目で Promise を解決する。`fn` を直接は呼ばない。',
    },
  ],
  answer: 0,
  evidenceLines: [23, 34, 56, 58],
  source: {
    repo: 'sindresorhus/p-limit',
    commit: 'a8a6fbec4e0e866d6d779b10889bb4f5567e70eb',
    path: 'index.js',
    lines: [1, 68],
    license: 'MIT',
    licenseKey: 'p-limit',
    modified: false,
  },
};
