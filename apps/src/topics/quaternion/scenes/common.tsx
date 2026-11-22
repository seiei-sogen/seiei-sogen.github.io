import { createEffect, onCleanup, type JSX } from 'solid-js';
import { Canvas, Entity, createT, useThree } from 'solid-three';
import {
  AmbientLight,
  BoxGeometry,
  CanvasTexture,
  CircleGeometry,
  Color,
  ConeGeometry,
  DirectionalLight,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  SRGBColorSpace,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  TorusGeometry,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import type { Vec3 } from '../lib/quat';

// three.js のうち、このトピックで JSX として使うものだけを登録する（使わない分をバンドルに入れない）
export const T = createT({
  AmbientLight,
  BoxGeometry,
  CircleGeometry,
  ConeGeometry,
  DirectionalLight,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  SphereGeometry,
  TorusGeometry,
});

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
  children: JSX.Element;
  camera?: [number, number, number];
};

/**
 * 共通のキャンバス。frameloop="demand" なので、値が変わったときと
 * 視点をドラッグしたときだけ描画する（スクロール中に電池を使わない）。
 */
export function SceneCanvas(props: SceneCanvasProps) {
  return (
    <Canvas
      frameloop="demand"
      defaultCamera={{ position: props.camera ?? [3.4, 2.4, 4.6], fov: 38 }}
      scene={{ background: new Color(COLOR.stage) }}
      style={{ width: '100%', height: '100%' }}
    >
      <T.AmbientLight intensity={1.1} />
      <T.DirectionalLight position={[3, 5, 4]} intensity={1.8} />
      <T.DirectionalLight position={[-4, -2, -3]} intensity={0.5} />
      <DragToOrbit />
      {props.children}
    </Canvas>
  );
}

/** ドラッグで視点を回す。拡大縮小と平行移動は、ページのスクロールとぶつかるので切る */
function DragToOrbit() {
  const three = useThree();
  createEffect(() => {
    const controls = new OrbitControls(three.currentCamera, three.canvas);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.addEventListener('change', () => three.requestRender());
    onCleanup(() => controls.dispose());
  });
  return null;
}

type FatLineProps = {
  points: readonly Vec3[];
  color: string;
  /** 画面上の太さ（px） */
  width?: number;
  opacity?: number;
  dashed?: boolean;
};

/** 太さを指定できる折れ線（three.js の Line2）。points が変わると形を作り直す */
export function FatLine(props: FatLineProps) {
  const three = useThree();
  const material = new LineMaterial({
    color: props.color,
    linewidth: props.width ?? 1,
    transparent: props.opacity !== undefined,
    opacity: props.opacity ?? 1,
    dashed: props.dashed ?? false,
    dashSize: 0.08,
    gapSize: 0.06,
  });
  const line = new Line2(new LineGeometry(), material);

  createEffect(() => {
    const points = props.points;
    line.visible = points.length > 1;
    if (points.length > 1) {
      const geometry = new LineGeometry();
      geometry.setPositions(points.flatMap((p) => [p[0], p[1], p[2]]));
      line.geometry.dispose();
      line.geometry = geometry;
      if (props.dashed) line.computeLineDistances();
    }
    three.requestRender();
  });
  onCleanup(() => {
    line.geometry.dispose();
    material.dispose();
  });

  return <Entity from={line} />;
}

/** ワールド座標軸。正の向きに小さな矢じりを付ける */
export function WorldAxes(props: { size?: number }) {
  const size = () => props.size ?? 2;
  return (
    <T.Group>
      <FatLine
        points={[
          [-size(), 0, 0],
          [size(), 0, 0],
        ]}
        color={COLOR.x}
        opacity={0.55}
      />
      <FatLine
        points={[
          [0, -size(), 0],
          [0, size(), 0],
        ]}
        color={COLOR.y}
        opacity={0.55}
      />
      <FatLine
        points={[
          [0, 0, -size()],
          [0, 0, size()],
        ]}
        color={COLOR.z}
        opacity={0.55}
      />
      <T.Mesh position={[size(), 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <T.ConeGeometry args={[0.05, 0.16, 12]} />
        <T.MeshBasicMaterial color={COLOR.x} />
      </T.Mesh>
      <T.Mesh position={[0, size(), 0]}>
        <T.ConeGeometry args={[0.05, 0.16, 12]} />
        <T.MeshBasicMaterial color={COLOR.y} />
      </T.Mesh>
      <T.Mesh position={[0, 0, size()]} rotation={[Math.PI / 2, 0, 0]}>
        <T.ConeGeometry args={[0.05, 0.16, 12]} />
        <T.MeshBasicMaterial color={COLOR.z} />
      </T.Mesh>
    </T.Group>
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
export function Aircraft(props: AircraftProps) {
  const Skin = (skin: { color: string }) =>
    props.ghost ? (
      <T.MeshBasicMaterial color={COLOR.faint} transparent opacity={0.22} depthWrite={false} />
    ) : (
      <T.MeshStandardMaterial color={props.tint ?? skin.color} roughness={0.55} metalness={0.05} />
    );
  return (
    <T.Group>
      <T.Mesh rotation={[0, 0, -Math.PI / 2]}>
        <T.ConeGeometry args={[0.17, 1.5, 20]} />
        <Skin color={COLOR.hull} />
      </T.Mesh>
      <T.Mesh position={[-0.08, 0, 0]}>
        <T.BoxGeometry args={[0.42, 0.04, 1.5]} />
        <Skin color={COLOR.wing} />
      </T.Mesh>
      <T.Mesh position={[-0.62, 0, 0]}>
        <T.BoxGeometry args={[0.2, 0.03, 0.62]} />
        <Skin color={COLOR.wing} />
      </T.Mesh>
      <T.Mesh position={[-0.6, 0.2, 0]}>
        <T.BoxGeometry args={[0.28, 0.36, 0.04]} />
        <Skin color={COLOR.w} />
      </T.Mesh>
      {!props.ghost && (
        <>
          <T.Mesh position={[-0.08, 0, 0.75]}>
            <T.SphereGeometry args={[0.06, 12, 12]} />
            <T.MeshBasicMaterial color={COLOR.y} />
          </T.Mesh>
          <T.Mesh position={[-0.08, 0, -0.75]}>
            <T.SphereGeometry args={[0.06, 12, 12]} />
            <T.MeshBasicMaterial color={COLOR.x} />
          </T.Mesh>
        </>
      )}
    </T.Group>
  );
}

/** readonly の3つ組を、three.js の props が受け取る可変の3つ組にする */
export const xyz = (v: Vec3): [number, number, number] => [v[0], v[1], v[2]];

export const NOSE: Vec3 = [0.75, 0, 0];
export const RIGHT_WING_TIP: Vec3 = [-0.08, 0, 0.75];

type LabelProps = {
  text: string;
  position: Vec3;
  /** 数式の記号（1、i、j、k など）は斜体のセリフ体で描く */
  math?: boolean;
  /** ワールド座標での文字の高さ */
  size?: number;
  /** 文字の色（既定は COLOR.hull） */
  color?: string;
};

/**
 * 3D空間内の点に付ける文字ラベル。2Dキャンバスに描いた文字をスプライトにして貼る。
 * 常にこちらを向き、ほかの物に隠れない。点の右どなりに出る。
 */
export function Label(props: LabelProps) {
  const canvas = document.createElement('canvas');
  const font = props.math
    ? "italic 700 60px 'STIX Two Text', 'Times New Roman', serif"
    : "600 46px 'Hiragino Sans', 'Yu Gothic UI', 'Noto Sans JP', 'Noto Sans CJK JP', sans-serif";
  const pad = 16;
  const measure = canvas.getContext('2d')!;
  measure.font = font;
  canvas.width = Math.ceil(measure.measureText(props.text).width) + pad * 2;
  canvas.height = 84;
  // 幅を変えると描画設定が初期化されるので、取り直す
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = 'rgba(23, 32, 56, 0.8)';
  ctx.beginPath();
  ctx.roundRect(0, 0, canvas.width, canvas.height, 14);
  ctx.fill();
  ctx.font = font;
  ctx.textBaseline = 'middle';
  ctx.fillStyle = props.color ?? COLOR.hull;
  ctx.fillText(props.text, pad, canvas.height / 2 + 3);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  const material = new SpriteMaterial({
    map: texture,
    depthTest: false,
    depthWrite: false,
    transparent: true,
  });
  const sprite = new Sprite(material);
  const aspect = canvas.width / canvas.height;
  const size = props.size ?? 0.34;
  sprite.scale.set(size * aspect, size, 1);
  sprite.center.set(-0.2 / aspect, 0.5);
  sprite.renderOrder = 10;
  onCleanup(() => {
    texture.dispose();
    material.dispose();
  });

  return <Entity from={sprite} position={xyz(props.position)} />;
}
