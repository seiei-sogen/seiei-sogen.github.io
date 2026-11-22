import { createSignal, onCleanup } from 'solid-js';
import { isServer } from 'solid-js/web';

/** 0→1 を一定時間かけて進める値。スライダーで直接動かすこともできる */
export function createTween() {
  const [value, setValue] = createSignal(0);
  const [running, setRunning] = createSignal(false);
  let raf = 0;

  const stop = () => {
    cancelAnimationFrame(raf);
    setRunning(false);
  };

  const play = (durationMs: number, ease: (p: number) => number = (p) => p) => {
    cancelAnimationFrame(raf);
    const start = performance.now();
    setRunning(true);
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - start) / durationMs));
      setValue(ease(p));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setRunning(false);
    };
    raf = requestAnimationFrame(tick);
  };

  const set = (v: number) => {
    stop();
    setValue(v);
  };

  if (!isServer) onCleanup(() => cancelAnimationFrame(raf));

  return { value, running, play, set };
}
