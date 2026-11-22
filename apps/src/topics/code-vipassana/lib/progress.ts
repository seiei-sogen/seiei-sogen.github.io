import { createSignal } from 'solid-js';

/**
 * クリア状況。localStorage に問題IDごとに保存する。
 * - 'wrong' : 回答したがまだ正解していない（表示上は未クリア）
 * - 'first' : 初回で正解
 * - 'retry' : 2回目以降で正解
 */
export type Status = 'wrong' | 'first' | 'retry';
type Progress = Record<string, Status>;

const KEY = 'code-vipassana:progress:v1';

const [progress, setProgress] = createSignal<Progress>({});
const [loaded, setLoaded] = createSignal(false);

function read(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? (parsed as Progress) : {};
  } catch {
    return {};
  }
}

function write(p: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // プライベートモードなどで保存できなくても遊べるようにする
  }
}

/** クライアントでマウントされた後に1回呼ぶ（SSR と初回描画を一致させるため） */
export function loadProgress() {
  if (loaded()) return;
  setProgress(read());
  setLoaded(true);
}

export const statusOf = (id: string): Status | undefined => progress()[id];

export const isCleared = (s: Status | undefined) => s === 'first' || s === 'retry';

export const clearedCount = () => Object.values(progress()).filter(isCleared).length;

/** 回答を記録する。一度クリアした問題の記録は後の不正解で下げない */
export function recordAnswer(id: string, correct: boolean) {
  const prev = read()[id];
  let next: Status;
  if (isCleared(prev)) next = prev!;
  else if (correct) next = prev === 'wrong' ? 'retry' : 'first';
  else next = 'wrong';
  const updated = { ...read(), [id]: next };
  write(updated);
  setProgress(updated);
}

export function resetProgress() {
  write({});
  setProgress({});
}
