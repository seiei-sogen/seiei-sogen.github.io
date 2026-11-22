import { useId } from 'react';

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

export function Slider({ label, value, min, max, step = 1, unit = '°', swatch, onChange }: Props) {
  const id = useId();
  return (
    <div className="slider">
      <label htmlFor={id}>
        {swatch && <span className="swatch" style={{ background: swatch }} aria-hidden="true" />}
        {label}
      </label>
      <output htmlFor={id}>
        {value}
        {unit}
      </output>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.currentTarget.value))}
      />
    </div>
  );
}
