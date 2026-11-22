const texts = import.meta.glob<string>('./*.txt', {
  eager: true,
  import: 'default',
  query: '?raw',
});

export type LicenseEntry = { key: string; name: string; repo: string; text: string };

const META: Omit<LicenseEntry, 'text'>[] = [
  { key: 'clsx', name: 'clsx', repo: 'lukeed/clsx' },
  { key: 'tiny-invariant', name: 'tiny-invariant', repo: 'alexreardon/tiny-invariant' },
  { key: 'ms', name: 'ms', repo: 'vercel/ms' },
  { key: 'mitt', name: 'mitt', repo: 'developit/mitt' },
  { key: 'nanoid', name: 'nanoid', repo: 'ai/nanoid' },
  { key: 'debounce', name: 'debounce', repo: 'sindresorhus/debounce' },
  { key: 'p-limit', name: 'p-limit', repo: 'sindresorhus/p-limit' },
  { key: 'dequal', name: 'dequal', repo: 'lukeed/dequal' },
  { key: 'zustand', name: 'zustand', repo: 'pmndrs/zustand' },
  { key: 'react', name: 'React (scheduler)', repo: 'facebook/react' },
];

export const licenses: LicenseEntry[] = META.map((m) => {
  const text = texts[`./${m.key}.txt`];
  if (text === undefined) throw new Error(`licenses/${m.key}.txt がありません`);
  return { ...m, text: text.trimEnd() };
});

export const hasLicense = (key: string) => licenses.some((l) => l.key === key);
