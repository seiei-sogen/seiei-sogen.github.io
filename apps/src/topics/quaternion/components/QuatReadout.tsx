import { fmt, type Quat } from '../lib/quat';

type Props = {
  q: Quat;
  /** 左辺の記号。既定は q */
  name?: string;
};

/** q = ( w, x, y, z ) を成分ごとの色で表示する */
export function QuatReadout(props: Props) {
  const name = () => props.name ?? 'q';
  return (
    <p class="quat" aria-label={`${name()} の成分`}>
      <var>{name()}</var> = (
      <span class="num c-w" title="w">
        {fmt(props.q.w)}
      </span>
      ,
      <span class="num c-x" title="x">
        {fmt(props.q.x)}
      </span>
      ,
      <span class="num c-y" title="y">
        {fmt(props.q.y)}
      </span>
      ,
      <span class="num c-z" title="z">
        {fmt(props.q.z)}
      </span>
      )
    </p>
  );
}
