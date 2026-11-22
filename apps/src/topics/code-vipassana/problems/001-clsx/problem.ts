import type { ProblemInput } from '../types';

export const problem: ProblemInput = {
  id: '001-clsx',
  level: 'beginner',
  kind: 'output',
  title: 'clsx: 入れ子と falsy 値',
  question: "`clsx('a', 0, ['b', [null, 'c', { d: true, e: 0 }]], { f: 1 }, 2)` の戻り値はどれか。",
  language: 'js',
  choices: [
    {
      text: '`"a b c d f 2"`',
      why: '0 は33行目、null は10行目、e: 0 は19行目でそれぞれ落ちる。数値 2 は5行目で文字列に足される。',
    },
    {
      text: '`"a 0 b c d f 2"`',
      why: '4行目より先に33行目の `if (tmp = arguments[i])` で 0 は falsy として捨てられる。',
    },
    {
      text: '`"a b c d e f 2"`',
      why: 'オブジェクトはキーを全部並べるのではなく、19行目で値が truthy なキーだけを残す。',
    },
    {
      text: '`"a b f 2"`',
      why: '配列の要素は11行目で toVal を再帰的に呼ぶので、入れ子の配列の中身も展開される。',
    },
  ],
  answer: 0,
  evidenceLines: [5, 10, 19, 33],
  source: {
    repo: 'lukeed/clsx',
    commit: '925494cf31bcd97d3337aacd34e659e80cae7fe2',
    path: 'src/index.js',
    lines: [1, 43],
    license: 'MIT',
    licenseKey: 'clsx',
    modified: false,
  },
};
