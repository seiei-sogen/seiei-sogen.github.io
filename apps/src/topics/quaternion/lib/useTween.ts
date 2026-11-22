import { useCallback, useEffect, useRef, useState } from 'react';

/** 0→1 を一定時間かけて進める値。スライダーで直接動かすこともできる */
export function useTween() {
  const [value, setValue] = useState(0);
  const [running, setRunning] = useState(false);
  const raf = useRef(0);

  const stop = useCallback(() => {
    cancelAnimationFrame(raf.current);
    setRunning(false);
  }, []);

  const play = useCallback((durationMs: number, ease: (p: number) => number = (p) => p) => {
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    setRunning(true);
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - start) / durationMs));
      setValue(ease(p));
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setRunning(false);
    };
    raf.current = requestAnimationFrame(tick);
  }, []);

  const set = useCallback(
    (v: number) => {
      stop();
      setValue(v);
    },
    [stop]
  );

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return { value, running, play, set };
}
