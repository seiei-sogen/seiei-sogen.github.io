import { Show, createUniqueId } from 'solid-js';

type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  /** ラベルの左に付ける色見本（CSS の色） */
  swatch?: string;
  onChange: (value: number) => void;
};

export function Slider(props: Props) {
  const id = createUniqueId();
  return (
    <div class="slider">
      <label for={id}>
        <Show when={props.swatch}>
          <span class="swatch" style={{ background: props.swatch }} aria-hidden="true" />
        </Show>
        {props.label}
      </label>
      <output for={id}>
        {props.value}
        {props.unit ?? '°'}
      </output>
      <input
        id={id}
        type="range"
        min={props.min}
        max={props.max}
        step={props.step ?? 1}
        value={props.value}
        onInput={(e) => props.onChange(Number(e.currentTarget.value))}
      />
    </div>
  );
}
