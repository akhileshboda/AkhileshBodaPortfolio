export const TEMPLE_VIEWBOX = {
  width: 1440,
  height: 1000,
} as const;

export interface TempleBay {
  index: number;
  number: string;
  centerX: number;
  card: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  column: {
    left: number;
    right: number;
    capitalTop: number;
    shaftTop: number;
    shaftBottom: number;
    baseBottom: number;
  };
}

const centers = [220, 420, 620, 820, 1020, 1220];

export const TEMPLE_BAYS: TempleBay[] = centers.map((centerX, index) => ({
  index,
  number: String(index + 1).padStart(2, '0'),
  centerX,
  card: {
    x: centerX - 94,
    y: 392,
    width: 188,
    height: 490,
  },
  column: {
    left: centerX - 108,
    right: centerX + 108,
    capitalTop: 360,
    shaftTop: 390,
    shaftBottom: 890,
    baseBottom: 936,
  },
}));

export function xPct(value: number) {
  return `${(value / TEMPLE_VIEWBOX.width) * 100}%`;
}

export function yPct(value: number) {
  return `${(value / TEMPLE_VIEWBOX.height) * 100}%`;
}
