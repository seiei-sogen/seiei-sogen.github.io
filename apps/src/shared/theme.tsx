import { createSignal, onMount } from 'solid-js';

// 表示モード（ダーク／ライト）は et-cetera 全体で共有する。
// <html data-theme="light"> のときがライト。属性がなければダーク（既定）。
// 各トピックの CSS は :root をダーク、:root[data-theme='light'] をライトとして色を決める。

const THEME_KEY = 'et-cetera:theme';

/**
 * 前回ライトを選んだ人だけ、描画前に切り替える。
 * ちらつきを防ぐため、ルートの <head> に直接置く。
 */
export const applySavedTheme = `try{if(localStorage.getItem('${THEME_KEY}')==='light')document.documentElement.dataset.theme='light'}catch(e){}`;

/** モード切り替えボタン。見た目は各トピックの CSS（button.theme-toggle）で決める */
export function ThemeToggle() {
  const [theme, setTheme] = createSignal<'dark' | 'light'>('dark');

  onMount(() => {
    if (document.documentElement.dataset.theme === 'light') setTheme('light');
  });

  const toggle = () => {
    const next = theme() === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (next === 'light') document.documentElement.dataset.theme = 'light';
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // 保存できなくても、このページを開いているあいだは切り替わる
    }
  };

  return (
    <button type="button" class="theme-toggle" onClick={toggle}>
      {theme() === 'dark' ? 'ライトモードにする' : 'ダークモードにする'}
    </button>
  );
}
