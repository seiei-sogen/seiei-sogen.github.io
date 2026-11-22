import type { ProblemInput } from '../types';

export const problem: ProblemInput = {
  id: '010-react-scheduler',
  level: 'advanced',
  kind: 'line',
  title: 'React Scheduler: 最小ヒープの順序',
  question:
    '`siftDown` で、左右の子がどちらも `node` より小さいとき、小さいほうの子と入れ替えることでヒープの順序（親 ≤ 子）を保っている。その「小さいほう」を選んでいるのは何行目の判定か。',
  language: 'js',
  choices: [
    { text: '71行目', why: '右の子が存在し、かつ右 < 左 なら右と、そうでなければ左と入れ替える。' },
    {
      text: '70行目',
      why: '左の子が `node` より小さいかを見るだけで、左右の大小はまだ比べていない。',
    },
    {
      text: '80行目',
      why: '左が `node` 以上のときに右だけを見る分岐。左右どちらも小さいケースはここに来ない。',
    },
    {
      text: '63行目',
      why: 'ループの継続条件。子を持つ位置（配列の前半）だけを回るための判定で、子どうしは比べない。',
    },
  ],
  answer: 0,
  evidenceLines: [70, 71, 72, 73, 74],
  source: {
    repo: 'facebook/react',
    commit: 'cb7c59ecdb7b620ed3d6ce0bf669d7502daedf13',
    path: 'packages/scheduler/src/SchedulerMinHeap.js',
    lines: [17, 95],
    license: 'MIT',
    licenseKey: 'react',
    modified: false,
  },
};
