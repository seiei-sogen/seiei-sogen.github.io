import { Suspense, type JSX } from 'solid-js';
import { ClientOnly } from '@tanstack/solid-router';

type Props = {
  /** スクリーンリーダー向けの、この3D図の説明 */
  label: string;
  children: JSX.Element;
};

/**
 * 3Dシーンの枠。three.js はブラウザでだけ読み込む（プリレンダーされた HTML には枠だけが入る）。
 */
export function Stage(props: Props) {
  const loading = () => <p class="stage-loading">3Dを読み込んでいます</p>;
  return (
    <div class="stage" role="img" aria-label={props.label}>
      <ClientOnly fallback={loading()}>
        <Suspense fallback={loading()}>{props.children}</Suspense>
      </ClientOnly>
      <p class="stage-hint" aria-hidden="true">
        ドラッグで視点を回せます
      </p>
    </div>
  );
}
