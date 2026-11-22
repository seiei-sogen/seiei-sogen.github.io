import { fmt, type Quat } from '../lib/quat';

type Props = {
  q: Quat;
  /** 左辺の記号。既定は q */
  name?: string;
};

/** q = ( w, x, y, z ) を成分ごとの色で表示する */
export function QuatReadout({ q, name = 'q' }: Props) {
  return (
    <p className="quat" aria-label={`${name} の成分`}>
      <var>{name}</var> = (
      <span className="num c-w" title="w">
        {fmt(q.w)}
      </span>
      ,
      <span className="num c-x" title="x">
        {fmt(q.x)}
      </span>
      ,
      <span className="num c-y" title="y">
        {fmt(q.y)}
      </span>
      ,
      <span className="num c-z" title="z">
        {fmt(q.z)}
      </span>
      )
    </p>
  );
}
