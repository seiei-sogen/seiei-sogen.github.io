import { For, Index, Show, createMemo } from 'solid-js';
import { DoubleSide } from 'three';
import { fromAxisAngle, rad, rotate, type Vec3 } from '../lib/quat';
import { projectS2, splitRuns } from '../lib/stereo';
import { COLOR, FatLine, Label, SceneCanvas, T, xyz } from './common';

type Props = {
  /** 球を回す角度（ラジアン）。北極「1」が +X のほうへ倒れていく */
  alpha: number;
};

const N = 240;
const ring = (f: (t: number) => Vec3): Vec3[] =>
  Array.from({ length: N + 1 }, (_, i) => f((2 * Math.PI * i) / N));

// 緯線（北ほど暖色、南ほど寒色）
const LATITUDES = [
  { lat: 50, color: '#ffe3a3' },
  { lat: 25, color: COLOR.w },
  { lat: 0, color: COLOR.hull },
  { lat: -25, color: COLOR.z },
  { lat: -50, color: '#4b7fe0' },
].map(({ lat, color }) => {
  const c = Math.cos(rad(lat));
  const s = Math.sin(rad(lat));
  return { color, points: ring((t) => [c * Math.cos(t), s, c * Math.sin(t)]) };
});

// 経線（北極と南極を通る大きな輪）
const MERIDIANS = [0, 45, 90, 135].map((lon) => {
  const c = Math.cos(rad(lon));
  const s = Math.sin(rad(lon));
  return {
    color: COLOR.faint,
    points: ring((t) => [Math.sin(t) * c, Math.cos(t), Math.sin(t) * s]),
  };
});

const CURVES = [...MERIDIANS, ...LATITUDES];
const EYE: Vec3 = [0, -1, 0];
const UNIT_CIRCLE = ring((t) => [Math.cos(t), 0, Math.sin(t)]);

export default function StereoSphereScene(props: Props) {
  const turn = createMemo(() => fromAxisAngle([0, 0, 1], -props.alpha));
  const pole = createMemo(() => rotate(turn(), [0, 1, 0]));
  const poleImage = createMemo(() => projectS2(pole()));

  return (
    <SceneCanvas camera={[4.4, 4.8, 7.2]}>
      {/* 写す先の板（赤道の高さ） */}
      <T.Mesh rotation={[-Math.PI / 2, 0, 0]}>
        <T.CircleGeometry args={[4.6, 64]} />
        <T.MeshBasicMaterial
          color={COLOR.faint}
          transparent
          opacity={0.13}
          side={DoubleSide}
          depthWrite={false}
        />
      </T.Mesh>
      <FatLine points={UNIT_CIRCLE} color={COLOR.hull} opacity={0.35} dashed />

      {/* 球 */}
      <T.Mesh>
        <T.SphereGeometry args={[1, 32, 24]} />
        <T.MeshBasicMaterial color={COLOR.faint} transparent opacity={0.1} depthWrite={false} />
      </T.Mesh>

      <For each={CURVES}>
        {(curve) => {
          const onSphere = createMemo(() => curve.points.map((p) => rotate(turn(), p)));
          const onPlane = createMemo(() => splitRuns(onSphere().map(projectS2)));
          return (
            <>
              <FatLine points={onSphere()} color={curve.color} opacity={0.55} />
              <Index each={onPlane()}>
                {(run) => <FatLine points={run()} color={curve.color} width={2.25} />}
              </Index>
            </>
          );
        }}
      </For>

      {/* 目（南極 = −1）と、北極「1」の写り先 */}
      <T.Mesh position={xyz(EYE)}>
        <T.SphereGeometry args={[0.07, 16, 16]} />
        <T.MeshBasicMaterial color={COLOR.x} />
      </T.Mesh>
      <Label text="−1（目）" position={EYE} size={0.36} />
      <FatLine points={[EYE, poleImage() ?? pole(), pole()]} color="#ffffff" opacity={0.7} />
      <T.Mesh position={xyz(pole())}>
        <T.SphereGeometry args={[0.055, 16, 16]} />
        <T.MeshBasicMaterial color="#ffffff" />
      </T.Mesh>
      <Show when={poleImage()}>
        {(at) => (
          <>
            <T.Mesh position={xyz(at())}>
              <T.SphereGeometry args={[0.085, 16, 16]} />
              <T.MeshBasicMaterial color="#ffffff" />
            </T.Mesh>
            <Label text="1" position={at()} math size={0.42} />
          </>
        )}
      </Show>
    </SceneCanvas>
  );
}
