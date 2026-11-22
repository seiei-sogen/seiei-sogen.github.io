import type { ProblemInput } from '../types';

export const problem: ProblemInput = {
  id: '008-dequal',
  level: 'intermediate',
  kind: 'bug',
  title: 'dequal: 修正前の深い比較',
  question:
    'これは dequal の修正前のコードである。`const dict = () => Object.assign(Object.create(null), { x: 1 })` とする。次のうち正しく動かない（例外が出る、または誤った結果を返す）呼び出しはどれか。',
  language: 'js',
  choices: [
    {
      text: '`dequal(dict(), dict())`',
      why: 'プロトタイプのないオブジェクトには `hasOwnProperty` がないので、19行目で TypeError になる。',
    },
    {
      text: '`dequal([1, 2], [1, 2, 3])`',
      why: '10行目で長さが違うと while を回さず、13行目で `len === -1` が偽になって false。正しい。',
    },
    {
      text: '`dequal(NaN, NaN)`',
      why: 'NaN は falsy なので5行目を素通りし、26行目の `foo !== foo && bar !== bar` で true。正しい。',
    },
    {
      text: '`dequal(new Date(0), new Date(0))`',
      why: '6行目で `getTime()` を比べて true。正しい。',
    },
  ],
  answer: 0,
  evidenceLines: [5, 16, 18, 19],
  source: {
    repo: 'lukeed/dequal',
    commit: '7d090f46192843c6b35eca37045e5c3832ad8fd6',
    path: 'src/index.js',
    lines: [1, 27],
    license: 'MIT',
    licenseKey: 'dequal',
    modified: false,
  },
};
