import { useMemo } from 'react';
import { Line } from '@react-three/drei';
import { DoubleSide } from 'three';
import { fromAxisAngle, rad, rotate, type Vec3 } from '../lib/quat';
import { projectS2, splitRuns } from '../lib/stereo';
import { COLOR, Label, SceneCanvas } from './common';

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
  return { key: `lat${lat}`, color, points: ring((t) => [c * Math.cos(t), s, c * Math.sin(t)]) };
});

// 経線（北極と南極を通る大きな輪）
const MERIDIANS = [0, 45, 90, 135].map((lon) => {
  const c = Math.cos(rad(lon));
  const s = Math.sin(rad(lon));
  return {
    key: `lon${lon}`,
    color: COLOR.faint,
    points: ring((t) => [Math.sin(t) * c, Math.cos(t), Math.sin(t) * s]),
  };
});

const CURVES = [...MERIDIANS, ...LATITUDES];
const EYE: Vec3 = [0, -1, 0];
const UNIT_CIRCLE = ring((t) => [Math.cos(t), 0, Math.sin(t)]);

export default function StereoSphereScene({ alpha }: Props) {
  const drawn = useMemo(() => {
    const turn = fromAxisAngle([0, 0, 1], -alpha);
    return {
      curves: CURVES.map((c) => {
        const onSphere = c.points.map((p) => rotate(turn, p));
        return { ...c, onSphere, onPlane: splitRuns(onSphere.map(projectS2)) };
      }),
      pole: rotate(turn, [0, 1, 0]),
    };
  }, [alpha]);
  const poleImage = projectS2(drawn.pole);

  return (
    <SceneCanvas camera={[4.4, 4.8, 7.2]}>
      {/* 写す先の板（赤道の高さ） */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4.6, 64]} />
        <meshBasicMaterial
          color={COLOR.faint}
          transparent
          opacity={0.13}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <Line
        points={UNIT_CIRCLE}
        color={COLOR.hull}
        lineWidth={1}
        transparent
        opacity={0.35}
        dashed
        dashSize={0.08}
        gapSize={0.06}
      />

      {/* 球 */}
      <mesh>
        <sphereGeometry args={[1, 32, 24]} />
        <meshBasicMaterial color={COLOR.faint} transparent opacity={0.1} depthWrite={false} />
      </mesh>

      {drawn.curves.map((c) => (
        <group key={c.key}>
          <Line points={c.onSphere} color={c.color} lineWidth={1} transparent opacity={0.55} />
          {c.onPlane.map((run, i) => (
            <Line key={i} points={run} color={c.color} lineWidth={2.25} />
          ))}
        </group>
      ))}

      {/* 目（南極 = −1）と、北極「1」の写り先 */}
      <mesh position={EYE}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={COLOR.x} />
      </mesh>
      <Label text="−1（目）" position={EYE} size={0.36} />
      <Line
        points={[EYE, poleImage ?? drawn.pole, drawn.pole]}
        color="#ffffff"
        lineWidth={1}
        transparent
        opacity={0.7}
      />
      <mesh position={drawn.pole}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {poleImage && (
        <>
          <mesh position={poleImage}>
            <sphereGeometry args={[0.085, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <Label text="1" position={poleImage} math size={0.42} />
        </>
      )}
    </SceneCanvas>
  );
}
