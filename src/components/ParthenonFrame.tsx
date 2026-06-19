import {
  motion,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { TEMPLE_BAYS, TEMPLE_VIEWBOX, type TempleBay } from '@/components/pillarGeometry';

const CYAN = '#38D6FF';
const BLUE = '#2F80FF';
const YELLOW = '#FFD600';
const LINE = 'rgba(86, 180, 255, 0.56)';
const LINE_SOFT = 'rgba(86, 180, 255, 0.27)';
const LINE_FAINT = 'rgba(86, 180, 255, 0.13)';
const GRID = 'rgba(86, 180, 255, 0.09)';

interface ParthenonFrameProps {
  activeIndex: number;
  progress: MotionValue<number>;
  reduce: boolean;
}

function columnTone(index: number, activeIndex: number) {
  if (index === activeIndex) {
    return {
      stroke: YELLOW,
      soft: 'rgba(255, 214, 0, 0.28)',
      opacity: 0.88,
      filter: 'url(#pillarGlowYellow)',
    };
  }

  if (index < activeIndex) {
    return {
      stroke: CYAN,
      soft: 'rgba(56, 214, 255, 0.24)',
      opacity: 0.62,
      filter: 'url(#pillarGlowCyan)',
    };
  }

  return {
    stroke: 'rgba(139, 173, 218, 0.34)',
    soft: 'rgba(139, 173, 218, 0.12)',
    opacity: 0.42,
    filter: undefined,
  };
}

function BlueprintPath({
  d,
  draw,
  stroke = LINE,
  strokeWidth = 1.4,
  opacity = 1,
  dash,
}: {
  d: string;
  draw: number | MotionValue<number>;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  dash?: string;
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      pathLength={draw}
      stroke={stroke}
      strokeDasharray={dash}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={opacity}
      strokeWidth={strokeWidth}
      vectorEffect="non-scaling-stroke"
    />
  );
}

function ColumnBlueprint({
  bay,
  activeIndex,
  draw,
}: {
  bay: TempleBay;
  activeIndex: number;
  draw: number | MotionValue<number>;
}) {
  const tone = columnTone(bay.index, activeIndex);
  const { left, right, capitalTop, shaftTop, shaftBottom, baseBottom } = bay.column;
  const center = bay.centerX;
  const card = bay.card;
  const flutes = [
    left + 18,
    left + 30,
    left + 42,
    right - 42,
    right - 30,
    right - 18,
  ];

  return (
    <motion.g opacity={tone.opacity} filter={tone.filter}>
      {bay.index === activeIndex && (
        <rect
          x={card.x - 13}
          y={card.y - 13}
          width={card.width + 26}
          height={card.height + 26}
          rx="19"
          fill="rgba(255, 214, 0, 0.025)"
          stroke="rgba(255, 214, 0, 0.42)"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
      )}

      <BlueprintPath
        d={`M${center} 104 V928`}
        draw={draw}
        stroke="rgba(86, 180, 255, 0.16)"
        strokeWidth={0.8}
        dash="5 12"
      />

      <BlueprintPath
        d={`M${left - 12} ${capitalTop + 6} H${right + 12} M${left - 4} ${capitalTop + 15} H${right + 4} M${left + 22} ${capitalTop + 30} H${right - 22}`}
        draw={draw}
        stroke={tone.stroke}
        strokeWidth={1.35}
      />
      <BlueprintPath
        d={`M${left + 12} ${capitalTop + 28} C${left + 24} ${capitalTop + 40}, ${right - 24} ${capitalTop + 40}, ${right - 12} ${capitalTop + 28}`}
        draw={draw}
        stroke={tone.soft}
        strokeWidth={1.1}
      />

      <BlueprintPath
        d={`M${left} ${shaftTop} V${shaftBottom} M${right} ${shaftTop} V${shaftBottom}`}
        draw={draw}
        stroke={tone.stroke}
        strokeWidth={1.45}
      />

      {flutes.map((x) => (
        <BlueprintPath
          key={`${bay.number}-${x}`}
          d={`M${x} ${shaftTop + 8} V${shaftBottom - 8}`}
          draw={draw}
          stroke={tone.soft}
          strokeWidth={0.9}
        />
      ))}

      <BlueprintPath
        d={`M${card.x - 8} ${card.y - 9} H${card.x + card.width + 8} M${card.x - 8} ${card.y + card.height + 9} H${card.x + card.width + 8}`}
        draw={draw}
        stroke={tone.stroke}
        strokeWidth={1.2}
      />

      <BlueprintPath
        d={`M${left + 18} ${shaftBottom + 7} H${right - 18} M${left + 7} ${shaftBottom + 20} H${right - 7} M${left - 10} ${shaftBottom + 35} H${right + 10} M${left - 18} ${baseBottom} H${right + 18}`}
        draw={draw}
        stroke={tone.stroke}
        strokeWidth={1.25}
      />
      <BlueprintPath
        d={`M${left - 18} ${shaftBottom + 35} V${baseBottom} M${right + 18} ${shaftBottom + 35} V${baseBottom}`}
        draw={draw}
        stroke={tone.soft}
        strokeWidth={1}
      />
    </motion.g>
  );
}

function ParthenonFrame({ activeIndex, progress, reduce }: ParthenonFrameProps) {
  const roofDrawValue = useTransform(progress, [0, 0.22], [0, 1]);
  const roofOpacityValue = useTransform(progress, [0, 0.16], [0, 1]);
  const entablatureDrawValue = useTransform(progress, [0.12, 0.34], [0, 1]);
  const entablatureOpacityValue = useTransform(progress, [0.1, 0.3], [0, 1]);
  const columnDrawValue = useTransform(progress, [0.25, 0.58], [0, 1]);
  const columnOpacityValue = useTransform(progress, [0.22, 0.48], [0, 1]);
  const baseDrawValue = useTransform(progress, [0.38, 0.66], [0, 1]);
  const baseOpacityValue = useTransform(progress, [0.34, 0.58], [0, 1]);

  const roofDraw = reduce ? 1 : roofDrawValue;
  const roofOpacity = reduce ? 1 : roofOpacityValue;
  const entablatureDraw = reduce ? 1 : entablatureDrawValue;
  const entablatureOpacity = reduce ? 1 : entablatureOpacityValue;
  const columnDraw = reduce ? 1 : columnDrawValue;
  const columnOpacity = reduce ? 1 : columnOpacityValue;
  const baseDraw = reduce ? 1 : baseDrawValue;
  const baseOpacity = reduce ? 1 : baseOpacityValue;

  return (
    <motion.svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      viewBox={`0 0 ${TEMPLE_VIEWBOX.width} ${TEMPLE_VIEWBOX.height}`}
    >
      <defs>
        <filter id="pillarGlowCyan" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="pillarGlowYellow" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="2.7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="pedimentStroke" x1="100" x2="1340" y1="285" y2="285" gradientUnits="userSpaceOnUse">
          <stop stopColor={BLUE} stopOpacity="0.15" />
          <stop offset="0.5" stopColor={CYAN} stopOpacity="0.72" />
          <stop offset="1" stopColor={BLUE} stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="templeFill" x1="720" x2="720" y1="40" y2="924" gradientUnits="userSpaceOnUse">
          <stop stopColor="rgba(47, 128, 255, 0.08)" />
          <stop offset="0.55" stopColor="rgba(7, 20, 43, 0.22)" />
          <stop offset="1" stopColor="rgba(3, 8, 20, 0.04)" />
        </linearGradient>
      </defs>

      <g opacity="0.8">
        <path d="M120 206 H1320 M102 286 H1338 M102 366 H1338 M122 904 H1318" stroke={GRID} strokeDasharray="5 13" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d="M96 286 V956 M1344 286 V956 M720 42 V956" stroke={GRID} strokeDasharray="5 13" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d="M70 318 H110 M70 904 H110 M1330 318 H1370 M1330 904 H1370" stroke={LINE_FAINT} strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d="M78 318 V904 M1362 318 V904" stroke={LINE_FAINT} strokeDasharray="4 9" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <text x="62" y="637" fill="rgba(56, 214, 255, 0.32)" fontFamily="'JetBrains Mono', monospace" fontSize="12" letterSpacing="2">3.2</text>
        <text x="1326" y="637" fill="rgba(56, 214, 255, 0.32)" fontFamily="'JetBrains Mono', monospace" fontSize="12" letterSpacing="2">4.8</text>
      </g>

      <motion.g opacity={roofOpacity}>
        <path d="M110 286 L720 42 L1330 286 Z" fill="url(#templeFill)" opacity="0.78" />
        <BlueprintPath d="M100 286 L720 38 L1340 286" draw={roofDraw} stroke="url(#pedimentStroke)" strokeWidth={2.1} />
        <BlueprintPath d="M126 270 L720 68 L1314 270" draw={roofDraw} stroke={LINE} strokeWidth={1.35} />
        <BlueprintPath d="M142 256 L720 93 L1298 256" draw={roofDraw} stroke={LINE_SOFT} strokeWidth={1.05} />
        <BlueprintPath d="M168 286 L720 126 L1272 286" draw={roofDraw} stroke={LINE_FAINT} strokeWidth={1} />
        <BlueprintPath d="M720 38 V300 M500 210 H940 M392 248 H1048" draw={roofDraw} stroke={LINE_FAINT} strokeWidth={0.9} />
        <BlueprintPath d="M100 286 H1340 M114 296 H1326 M126 306 H1314" draw={roofDraw} stroke={LINE} strokeWidth={1.25} />
        <BlueprintPath d="M720 24 V50 M100 286 V272 M1340 286 V272" draw={roofDraw} stroke={LINE} strokeWidth={1} />

        {[246, 380, 516, 924, 1060, 1194].map((x) => (
          <BlueprintPath
            key={`roof-tick-${x}`}
            d={`M${x} ${252 - Math.abs(720 - x) * 0.2} L${x + 10} ${246 - Math.abs(720 - x) * 0.2}`}
            draw={roofDraw}
            stroke={LINE_SOFT}
            strokeWidth={0.9}
          />
        ))}

        <BlueprintPath d="M720 120 V260 M640 190 H800" draw={roofDraw} stroke={GRID} strokeWidth={0.9} dash="4 9" />
      </motion.g>

      <motion.g opacity={columnOpacity}>
        {TEMPLE_BAYS.map((bay) => (
          <ColumnBlueprint key={bay.number} bay={bay} activeIndex={activeIndex} draw={columnDraw} />
        ))}
      </motion.g>

      <motion.g opacity={entablatureOpacity}>
        <rect x="112" y="298" width="1216" height="68" fill="rgba(3, 10, 24, 0.82)" stroke={LINE_SOFT} strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <BlueprintPath d="M106 310 H1334 M112 318 H1328 M120 356 H1320 M128 364 H1312" draw={entablatureDraw} stroke={LINE} strokeWidth={1.35} />
        <BlueprintPath d="M112 304 H1328 M128 372 H1312" draw={entablatureDraw} stroke={LINE_FAINT} strokeWidth={0.9} />
        {TEMPLE_BAYS.map((bay) => (
          <BlueprintPath
            key={`triglyph-${bay.number}`}
            d={`M${bay.centerX - 70} 304 V316 M${bay.centerX + 70} 304 V316 M${bay.centerX - 70} 354 V364 M${bay.centerX + 70} 354 V364`}
            draw={entablatureDraw}
            stroke={LINE_FAINT}
            strokeWidth={0.85}
          />
        ))}
      </motion.g>

      <motion.g opacity={baseOpacity}>
        <BlueprintPath d="M130 894 H1310" draw={baseDraw} stroke={LINE} strokeWidth={1.35} />
        <BlueprintPath d="M108 910 H1332 M108 910 V924 M1332 910 V924" draw={baseDraw} stroke={LINE_SOFT} strokeWidth={1.1} />
        <BlueprintPath d="M82 928 H1358 M82 928 V944 M1358 928 V944" draw={baseDraw} stroke={LINE} strokeWidth={1.25} />
        <BlueprintPath d="M54 948 H1386 M54 948 V960 M1386 948 V960 M28 962 H1412" draw={baseDraw} stroke={LINE} strokeWidth={1.25} />
        <BlueprintPath d="M130 894 L54 948 M1310 894 L1386 948 M82 944 H1358" draw={baseDraw} stroke={LINE_FAINT} strokeWidth={0.9} />
        <BlueprintPath d="M126 914 H1314 M106 934 H1334 M74 954 H1366" draw={baseDraw} stroke={LINE_FAINT} strokeWidth={0.8} dash="6 10" />
      </motion.g>
    </motion.svg>
  );
}

export default ParthenonFrame;
