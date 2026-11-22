export type Level = 'beginner' | 'intermediate' | 'advanced';
export type Kind = 'output' | 'line' | 'bug' | 'intent';

export type Choice = {
  /** 選択肢の本文。`バッククォート` で囲んだ部分はインラインコードとして表示する */
  text: string;
  /** 正解/不正解の理由を1行で */
  why: string;
};

export type Source = {
  /** "lukeed/clsx" */
  repo: string;
  /** コミットSHA（タグではなく固定する） */
  commit: string;
  path: string;
  /** 元ファイルでの行範囲 */
  lines: [number, number];
  /** "MIT" */
  license: string;
  /** licenses/ 配下のライセンス全文のキー */
  licenseKey: string;
  /** 抜粋時に手を加えたか */
  modified: boolean;
  /** modified のとき、何をしたか */
  modification?: string;
};

/** 1問ぶんのデータ。problem.ts に書く部分（コードと解説は別ファイル） */
export type ProblemInput = {
  id: string;
  level: Level;
  kind: Kind;
  title: string;
  question: string;
  language: 'ts' | 'js';
  choices: [Choice, Choice, Choice, Choice];
  answer: 0 | 1 | 2 | 3;
  /** 解答後にハイライトする行（画面に表示される行番号で） */
  evidenceLines: number[];
  source: Source;
};

export type Problem = ProblemInput & {
  /** 表示するコードそのまま */
  code: string;
  /** ビルド時にハイライトした行ごとの HTML */
  codeLines: string[];
  /** 画面に出す最初の行番号。改変なしなら元ファイルの行番号に合わせる */
  firstLine: number;
  /** ビルド時に Markdown から変換した HTML */
  explanation: string;
};

export const LEVELS: { level: Level; label: string; note: string }[] = [
  { level: 'beginner', label: '初級', note: '関数1つ。上から順に読めば答えが出る' },
  { level: 'intermediate', label: '中級', note: '状態・クロージャ・非同期のどれかを追う' },
  { level: 'advanced', label: '上級', note: '複数の関数の関係や不変条件を掴む' },
];

export const KIND_LABEL: Record<Kind, string> = {
  output: '出力当て',
  line: '行特定',
  bug: 'バグ原因',
  intent: '意図当て',
};
