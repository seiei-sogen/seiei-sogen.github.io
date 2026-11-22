import type { Problem, ProblemInput, Level } from './types';
import { hasLicense } from '../licenses';

type Snippet = { code: string; lines: string[] };

// 1問 = 1ディレクトリ（problem.ts / snippet.{ts,js}.txt / explanation.md）。
// snippet と explanation.md は plugins/problem-assets.ts がビルド時に変換する。
const inputs = import.meta.glob<ProblemInput>('./*/problem.ts', { eager: true, import: 'problem' });
const snippets = import.meta.glob<Snippet>('./*/snippet.*.txt', {
  eager: true,
  import: 'default',
  query: '?code',
});
const explanations = import.meta.glob<string>('./*/explanation.md', {
  eager: true,
  import: 'default',
});

function build(path: string, input: ProblemInput): Problem {
  const dir = path.replace(/\/problem\.ts$/, '');
  const snippet = snippets[`${dir}/snippet.${input.language}.txt`];
  const explanation = explanations[`${dir}/explanation.md`];
  if (!snippet) throw new Error(`${dir}: snippet.${input.language}.txt がありません`);
  if (explanation === undefined) throw new Error(`${dir}: explanation.md がありません`);

  const problem: Problem = {
    ...input,
    code: snippet.code,
    codeLines: snippet.lines,
    firstLine: input.source.modified ? 1 : input.source.lines[0],
    explanation,
  };
  validate(dir, problem);
  return problem;
}

/** データの不整合はビルドを落とす（プリレンダー時に throw される） */
function validate(dir: string, p: Problem) {
  const errors: string[] = [];
  const n = p.codeLines.length;
  const last = p.firstLine + n - 1;

  if (`./${p.id}` !== dir) errors.push(`id "${p.id}" がディレクトリ名と一致しない`);
  if (n < 20 || n > 80) errors.push(`コードは20〜80行（現在 ${n} 行）`);
  if (p.evidenceLines.length === 0) errors.push('evidenceLines が空');
  for (const l of p.evidenceLines) {
    if (l < p.firstLine || l > last)
      errors.push(`evidenceLines ${l} が表示範囲 ${p.firstLine}-${last} の外`);
  }
  const [from, to] = p.source.lines;
  if (!p.source.modified && to - from + 1 !== n) {
    errors.push(`改変なしなのに source.lines (${from}-${to}) とコード行数 ${n} が合わない`);
  }
  if (p.source.modified && !p.source.modification) errors.push('modified なら modification を書く');
  if (!/^[0-9a-f]{40}$/.test(p.source.commit)) errors.push('source.commit は40桁のSHA');
  if (!hasLicense(p.source.licenseKey)) errors.push(`licenses/${p.source.licenseKey}.txt がない`);
  if (new Set(p.choices.map((c) => c.text)).size !== 4) errors.push('選択肢の本文が重複している');

  if (errors.length) throw new Error(`問題データ ${dir} が不正:\n  - ${errors.join('\n  - ')}`);
}

export const problems: Problem[] = Object.entries(inputs)
  .map(([path, input]) => build(path, input))
  .sort((a, b) => a.id.localeCompare(b.id));

export const problemById = (id: string) => problems.find((p) => p.id === id);

export const problemsByLevel = (level: Level) => problems.filter((p) => p.level === level);

/** 同じ級の次の問題。最後なら undefined */
export function nextInLevel(p: Problem): Problem | undefined {
  const list = problemsByLevel(p.level);
  return list[list.indexOf(p) + 1];
}
