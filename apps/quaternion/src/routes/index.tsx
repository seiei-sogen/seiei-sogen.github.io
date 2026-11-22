import { createFileRoute } from '@tanstack/react-router';
import { AxisAngle } from '../sections/AxisAngle';
import { DoubleCover } from '../sections/DoubleCover';
import { EulerCompare } from '../sections/EulerCompare';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
  return (
    <>
      <header className="hero wrap">
        <h1>
          <span>クォータニオンを</span>
          <span>手で回す</span>
        </h1>
        <p className="hero-lead">回転を表す4つの数が何をしているのかを、3つの実験で確かめる。</p>
        <p className="hero-formula" aria-label="q = cos(θ/2) + sin(θ/2)(nx i + ny j + nz k)">
          <span aria-hidden="true">
            <var>q</var> ={' '}
            <span className="c-w">
              cos(<var>θ</var>/2)
            </span>{' '}
            + sin(<var>θ</var>/2)
            <wbr />(
            <span className="c-x">
              <var>n</var>
              <sub>x</sub>
              <b>i</b>
            </span>{' '}
            +{' '}
            <span className="c-y">
              <var>n</var>
              <sub>y</sub>
              <b>j</b>
            </span>{' '}
            +{' '}
            <span className="c-z">
              <var>n</var>
              <sub>z</sub>
              <b>k</b>
            </span>
            )
          </span>
        </p>
        <ul className="legend" aria-label="色の対応">
          <li>
            <span className="swatch" style={{ background: 'var(--w)' }} aria-hidden="true" />w
          </li>
          <li>
            <span className="swatch" style={{ background: 'var(--x)' }} aria-hidden="true" />x
          </li>
          <li>
            <span className="swatch" style={{ background: 'var(--y)' }} aria-hidden="true" />y
          </li>
          <li>
            <span className="swatch" style={{ background: 'var(--z)' }} aria-hidden="true" />z
          </li>
        </ul>
      </header>

      <main className="wrap">
        <AxisAngle />
        <DoubleCover />
        <EulerCompare />
      </main>

      <footer className="site-footer wrap">
        <a href="/">seiei-sogen.dev に戻る</a>
      </footer>
    </>
  );
}
