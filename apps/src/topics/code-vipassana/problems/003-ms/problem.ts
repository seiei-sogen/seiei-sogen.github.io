import type { ProblemInput } from '../types';

export const problem: ProblemInput = {
  id: '003-ms',
  level: 'beginner',
  kind: 'output',
  title: 'ms: 単位つき文字列のパース',
  question: '次の `parse` の呼び出しのうち、`NaN` を返すものはどれか。',
  language: 'ts',
  choices: [
    {
      text: "`parse('1h30m')`",
      why: '正規表現は `^…$` で全体一致を求め、単位は1つしか書けない。`1h` の後ろの `30m` で一致に失敗する。',
    },
    { text: "`parse('.5s')`", why: '`\\d*` は0桁を許すので `.5` が数値として読める。500 を返す。' },
    {
      text: "`parse('10 MINUTES')`",
      why: '正規表現の `i` フラグで大文字も一致し、95行目で小文字にしてから switch する。600000 を返す。',
    },
    {
      text: "`parse('5  sec')`（空白2つ）",
      why: '数値と単位の間の ` *` は0個以上の空白を許す。5000 を返す。',
    },
  ],
  answer: 0,
  evidenceLines: [78, 82, 83],
  source: {
    repo: 'vercel/ms',
    commit: '4ff48cec099f0514c3e9bbca18706c9c21122bfb',
    path: 'src/index.ts',
    lines: [71, 147],
    license: 'MIT',
    licenseKey: 'ms',
    modified: false,
  },
};
