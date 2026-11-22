import { readFile } from 'node:fs/promises';
import { createHighlighter, type Highlighter } from 'shiki';
import { marked } from 'marked';
import type { Plugin } from 'vite';

/**
 * Code Vipassana（src/topics/code-vipassana）の問題データ用の Vite プラグイン。どちらもビルド時に処理し、
 * ブラウザにはハイライタも Markdown パーサも送らない。
 *
 * - `./snippet.ts.txt?code` → 行ごとのハイライト済み HTML 配列（言語は拡張子の手前から）
 * - `./explanation.md`          → HTML 文字列
 */
const LANGS = ['ts', 'js'] as const;
type Lang = (typeof LANGS)[number];

let highlighter: Promise<Highlighter> | undefined;
const getHighlighter = () =>
  (highlighter ??= createHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: [...LANGS],
  }));

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// --shiki-light / --shiki-dark を短い名前にしてバンドルを軽くする（styles.css の .lc span が参照）
const styleOf = (style: Record<string, string> | undefined) =>
  style
    ? Object.entries(style)
        .map(([k, v]) => `${k.replace('--shiki-light', '--l').replace('--shiki-dark', '--d')}:${v}`)
        .join(';')
    : '';

/** 末尾の改行だけを落とす（行数を正しく数えるため）。 */
export const normalizeSnippet = (raw: string) => raw.replace(/\r\n/g, '\n').replace(/\n+$/, '');

async function highlightLines(code: string, lang: Lang): Promise<string[]> {
  const hl = await getHighlighter();
  const { tokens } = hl.codeToTokens(code, {
    lang,
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  });
  return tokens.map((line) =>
    line
      .map((t) => {
        const style = styleOf(t.htmlStyle as Record<string, string>);
        const text = escapeHtml(t.content);
        // 空白だけのトークンは色が要らない
        return style && t.content.trim() ? `<span style="${style}">${text}</span>` : text;
      })
      .join('')
  );
}

export function problemAssets(): Plugin {
  return {
    name: 'code-vipassana:problem-assets',
    enforce: 'pre',
    async load(id) {
      const [file, query = ''] = id.split('?');
      if (!file) return null;
      const params = new URLSearchParams(query);

      if (params.has('code')) {
        const lang = /\.(\w+)\.txt$/.exec(file)?.[1] as Lang | undefined;
        if (!lang || !LANGS.includes(lang)) {
          this.error(`${file}: snippet.ts.txt か snippet.js.txt という名前にしてください`);
        }
        this.addWatchFile(file);
        const code = normalizeSnippet(await readFile(file, 'utf8'));
        const lines = await highlightLines(code, lang);
        return `export default ${JSON.stringify({ code, lines })}`;
      }

      if (file.endsWith('.md') && file.includes('/topics/code-vipassana/problems/')) {
        this.addWatchFile(file);
        const html = await marked.parse(await readFile(file, 'utf8'));
        return `export default ${JSON.stringify(html)}`;
      }
      return null;
    },
  };
}
