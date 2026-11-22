import type { ProblemInput } from '../types';

export const problem: ProblemInput = {
  id: '004-mitt',
  level: 'beginner',
  kind: 'line',
  title: 'mitt: ワイルドカードのハンドラ',
  question:
    "`emitter.emit('foo', 42)` を呼んだとき、`emitter.on('*', h)` で登録したハンドラ `h` が実際に呼び出されるのは何行目か。",
  language: 'ts',
  choices: [
    {
      text: '118行目',
      why: "`all.get('*')` で取り出した配列の各ハンドラを `handler(type, evt!)` で呼ぶ。",
    },
    {
      text: '109行目',
      why: "これは `'foo'` に登録したハンドラの呼び出し。`on` は type ごとに別の配列に入れるので、`h` はここにいない。",
    },
    { text: '113行目', why: "`'*'` のハンドラ配列を取り出しているだけで、まだ呼んでいない。" },
    { text: '69行目', why: '`on` で配列に追加する行。登録であって呼び出しではない。' },
  ],
  answer: 0,
  evidenceLines: [113, 118],
  source: {
    repo: 'developit/mitt',
    commit: '6b41670516ed8e8b738612f60491995470aa63b3',
    path: 'src/index.ts',
    lines: [46, 123],
    license: 'MIT',
    licenseKey: 'mitt',
    modified: false,
  },
};
