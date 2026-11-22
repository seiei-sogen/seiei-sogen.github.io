import type { ProblemInput } from '../types';

export const problem: ProblemInput = {
  id: '006-debounce',
  level: 'intermediate',
  kind: 'output',
  title: 'debounce: 張り直されるタイマー',
  question:
    '`const f = debounce(fn, 100)`（`immediate` なし）とし、`f()` を t = 0ms, 50ms, 120ms の3回だけ呼んだ。`fn` はいつ、何回実行されるか。タイマーは指定どおりの時刻に発火するものとする。',
  language: 'js',
  choices: [
    {
      text: '1回。t = 220ms に、3回目の呼び出しの引数で',
      why: '最後の呼び出し（120ms）から100ms経った時点で初めて34行目の条件が偽になり、40行目で実行される。',
    },
    {
      text: '1回。t = 150ms に、2回目の呼び出しの引数で',
      why: '56行目で3回目（120ms）も timestamp を更新する。150ms の later では経過が30msしかなく、またタイマーを張り直す。',
    },
    {
      text: '2回。t = 100ms と t = 220ms',
      why: '100ms の later では最後の呼び出し（50ms）から50msしか経っておらず、34〜35行目でタイマーを張り直すだけ。',
    },
    {
      text: '3回。t = 100ms, 150ms, 220ms（各呼び出しの100ms後）',
      why: '60行目で、タイマーが動いている間は新しいタイマーを作らない。タイマーは常に1本。',
    },
  ],
  answer: 0,
  evidenceLines: [32, 34, 35, 56, 60, 61],
  source: {
    repo: 'sindresorhus/debounce',
    commit: '02f1816e7ec6982a0817ecfbb48756d11af9617f',
    path: 'index.js',
    lines: [1, 70],
    license: 'MIT',
    licenseKey: 'debounce',
    modified: false,
  },
};
