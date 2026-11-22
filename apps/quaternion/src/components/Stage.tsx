import { Suspense, type ReactNode } from 'react';
import { ClientOnly } from '@tanstack/react-router';

type Props = {
  /** スクリーンリーダー向けの、この3D図の説明 */
  label: string;
  children: ReactNode;
};

/**
 * 3Dシーンの枠。three.js はブラウザでだけ読み込む（プリレンダーされた HTML には枠だけが入る）。
 */
export function Stage({ label, children }: Props) {
  const loading = <p className="stage-loading">3Dを読み込んでいます</p>;
  return (
    <div className="stage" role="img" aria-label={label}>
      <ClientOnly fallback={loading}>
        <Suspense fallback={loading}>{children}</Suspense>
      </ClientOnly>
      <p className="stage-hint" aria-hidden="true">
        ドラッグで視点を回せます
      </p>
    </div>
  );
}
