import type { ProblemInput } from '../types';

export const problem: ProblemInput = {
  id: '005-nanoid',
  level: 'intermediate',
  kind: 'intent',
  title: 'nanoid: 捨てられる乱数バイト',
  question:
    '29行目で、`safeByteCutoff` 以上のバイトを捨てている（IDに使わない）のはなぜか。2行目の計算とあわせて考えよ。',
  language: 'js',
  choices: [
    {
      text: '256 が `alphabet.length` で割り切れないとき、`%` の結果に偏りが出て一部の文字が出やすくなるのを防ぐため',
      why: '2行目の cutoff は length の倍数。0〜cutoff-1 のバイトだけを使えば、どの文字もちょうど同じ数のバイトに対応する。',
    },
    {
      text: '`bytes[i] % alphabet.length` が `alphabet` の範囲外を指すのを防ぐため',
      why: '`%` の結果は常に 0〜length-1 で、範囲外にはならない。',
    },
    {
      text: '捨てることで `getRandom` の呼び出し回数を減らし、速くするため',
      why: '逆に、捨てた分だけバイトが余計に要る。24行目で多めに要求しているのはそれを補うため。',
    },
    {
      text: '4行目の分岐と同じく、`%` を使わず `&` だけで計算を済ませるため',
      why: '30行目は `%` を使っている。`&` で済むのは4行目の分岐（長さが2のべき乗）のときだけ。',
    },
  ],
  answer: 0,
  evidenceLines: [2, 29, 30],
  source: {
    repo: 'ai/nanoid',
    commit: '055d1700cc67ac843e3efb5235d806b419ec7b2b',
    path: 'index.js',
    lines: [26, 84],
    license: 'MIT',
    licenseKey: 'nanoid',
    modified: true,
    modification:
      'customRandom 関数だけを抜粋し、行コメントをすべて削除（答えがコメントに書いてあるため）',
  },
};
