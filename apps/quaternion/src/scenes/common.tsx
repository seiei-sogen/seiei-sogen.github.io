import { useEffect, useMemo, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { Line, OrbitControls } from '@react-three/drei';
import { CanvasTexture, SRGBColorSpace } from 'three';

// 3Dステージ上の色。軸の色はページ本文の x / y / z の色と対応させる
export const COLOR = {
  stage: '#172038',
  x: '#ff6b6b',
  y: '#4fd08a',
  z: '#6aa5ff',
  w: '#f5c451',
  hull: '#e8ecf5',
  wing: '#b9c4dc',
  faint: '#5b6890',
} as const;

type SceneCanvasProps = {
  children: ReactNode;
  camera?: [number, number, number];
};

/**
 * 共通のキャンバス。frameloop="demand" なので、props が変わったときと
 * 視点をドラッグしたときだけ描画する（スクロール中に電池を使わない）。
 */
export function SceneCanvas({ children, camera = [3.4, 2.4, 4.6] }: SceneCanvasProps) {
  return (
    <Canvas frameloop="demand" dpr={[1, 2]} camera={{ position: camera, fov: 38 }}>
      <color attach="background" args={[COLOR.stage]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 5, 4]} intensity={1.8} />
      <directionalLight position={[-4, -2, -3]} intensity={0.5} />
      {children}
      <OrbitControls enablePan={false} enableZoom={false} />
    </Canvas>
  );
}

/** ワールド座標軸。正の向きに小さな矢じりを付ける */
export function WorldAxes({ size = 2 }: { size?: number }) {
  return (
    <group>
      <Line
        points={[
          [-size, 0, 0],
          [size, 0, 0],
        ]}
        color={COLOR.x}
        lineWidth={1}
        transparent
        opacity={0.55}
      />
      <Line
        points={[
          [0, -size, 0],
          [0, size, 0],
        ]}
        color={COLOR.y}
        lineWidth={1}
        transparent
        opacity={0.55}
      />
      <Line
        points={[
          [0, 0, -size],
          [0, 0, size],
        ]}
        color={COLOR.z}
        lineWidth={1}
        transparent
        opacity={0.55}
      />
      <mesh position={[size, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.05, 0.16, 12]} />
        <meshBasicMaterial color={COLOR.x} />
      </mesh>
      <mesh position={[0, size, 0]}>
        <coneGeometry args={[0.05, 0.16, 12]} />
        <meshBasicMaterial color={COLOR.y} />
      </mesh>
      <mesh position={[0, 0, size]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.05, 0.16, 12]} />
        <meshBasicMaterial color={COLOR.z} />
      </mesh>
    </group>
  );
}

type AircraftProps = {
  /** 機体全体の色味。補間の比較で2機を見分けるのに使う */
  tint?: string;
  /** 元の姿勢を示す半透明の影として描く */
  ghost?: boolean;
};

/**
 * 向きが一目でわかる非対称な機体。機首 +X、上 +Y、右翼 +Z。
 * 翼端は航空機の航法灯と同じく 左=赤、右=緑。
 */
export function Aircraft({ tint, ghost = false }: AircraftProps) {
  const mat = (color: string) =>
    ghost ? (
      <meshBasicMaterial color={COLOR.faint} transparent opacity={0.22} depthWrite={false} />
    ) : (
      <meshStandardMaterial color={tint ?? color} roughness={0.55} metalness={0.05} />
    );
  return (
    <group>
      <mesh rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.17, 1.5, 20]} />
        {mat(COLOR.hull)}
      </mesh>
      <mesh position={[-0.08, 0, 0]}>
        <boxGeometry args={[0.42, 0.04, 1.5]} />
        {mat(COLOR.wing)}
      </mesh>
      <mesh position={[-0.62, 0, 0]}>
        <boxGeometry args={[0.2, 0.03, 0.62]} />
        {mat(COLOR.wing)}
      </mesh>
      <mesh position={[-0.6, 0.2, 0]}>
        <boxGeometry args={[0.28, 0.36, 0.04]} />
        {mat(COLOR.w)}
      </mesh>
      {!ghost && (
        <>
          <mesh position={[-0.08, 0, 0.75]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshBasicMaterial color={COLOR.y} />
          </mesh>
          <mesh position={[-0.08, 0, -0.75]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshBasicMaterial color={COLOR.x} />
          </mesh>
        </>
      )}
    </group>
  );
}

export const NOSE: [number, number, number] = [0.75, 0, 0];
export const RIGHT_WING_TIP: [number, number, number] = [-0.08, 0, 0.75];

type LabelProps = {
  text: string;
  position: readonly [number, number, number];
  /** 数式の記号（1、i、j、k など）は斜体のセリフ体で描く */
  math?: boolean;
  /** ワールド座標での文字の高さ */
  size?: number;
};

/**
 * 3D空間内の点に付ける文字ラベル。2Dキャンバスに描いた文字をスプライトにして貼る。
 * 常にこちらを向き、ほかの物に隠れない。点の右どなりに出る。
 */
export function Label({ text, position, math = false, size = 0.34 }: LabelProps) {
  const { texture, aspect } = useMemo(() => {
    const canvas = document.createElement('canvas');
    const font = math
      ? "italic 700 60px 'STIX Two Text', 'Times New Roman', serif"
      : "600 46px 'Hiragino Sans', 'Yu Gothic UI', 'Noto Sans JP', 'Noto Sans CJK JP', sans-serif";
    const measure = canvas.getContext('2d');
    if (!measure) return { texture: null, aspect: 1 };
    measure.font = font;
    const pad = 16;
    canvas.width = Math.ceil(measure.measureText(text).width) + pad * 2;
    canvas.height = 84;
    // 幅を変えると描画設定が初期化されるので、取り直す
    const ctx = canvas.getContext('2d');
    if (!ctx) return { texture: null, aspect: 1 };
    ctx.fillStyle = 'rgba(23, 32, 56, 0.8)';
    ctx.beginPath();
    ctx.roundRect(0, 0, canvas.width, canvas.height, 14);
    ctx.fill();
    ctx.font = font;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = COLOR.hull;
    ctx.fillText(text, pad, canvas.height / 2 + 3);
    const t = new CanvasTexture(canvas);
    t.colorSpace = SRGBColorSpace;
    return { texture: t, aspect: canvas.width / canvas.height };
  }, [text, math]);

  useEffect(() => () => texture?.dispose(), [texture]);

  if (!texture) return null;
  return (
    <sprite
      position={position}
      scale={[size * aspect, size, 1]}
      center={[-0.2 / aspect, 0.5]}
      renderOrder={10}
    >
      <spriteMaterial map={texture} depthTest={false} depthWrite={false} transparent />
    </sprite>
  );
}
