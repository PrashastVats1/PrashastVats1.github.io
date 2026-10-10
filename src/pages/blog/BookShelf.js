const WIDTH = 1200;
const HEIGHT = 60;
const COLOURS = ["#6b1c26", "#1f3a5c", "#2a4f36", "#5a3a22", "#4a3860", "#7a5a26", "#3d2318", "#24304a"];

// A fixed seed keeps the shelf identical on every render and in every test.
function buildSpines() {
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const spines = [];
  for (let x = 6; x < WIDTH - 6; ) {
    if (rand() < 0.06) {
      x += 18 + rand() * 30;
      continue;
    }
    const w = 9 + Math.round(rand() * 13);
    const h = 30 + Math.round(rand() * 22);
    spines.push({
      x,
      w,
      h,
      fill: COLOURS[Math.floor(rand() * COLOURS.length)],
      bands: rand() < 0.55,
    });
    x += w + 1;
  }
  return spines;
}

const SPINES = buildSpines();

/** A row of books along the top of the Archive; purely decorative. */
export default function BookShelf() {
  return (
    <svg
      className="pv-archive__shelf"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      {SPINES.map(({ x, w, h, fill, bands }) => (
        <g key={x}>
          <rect x={x} y={HEIGHT - 6 - h} width={w} height={h} rx="1" fill={fill} />
          <rect x={x} y={HEIGHT - 6 - h} width={w} height={h} rx="1" fill="url(#pv-shelf-shade)" />
          {bands && (
            <>
              <rect x={x + 1} y={HEIGHT - h + 2} width={w - 2} height="1.5" fill="#c9a043" opacity="0.75" />
              <rect x={x + 1} y={HEIGHT - 16} width={w - 2} height="1.5" fill="#c9a043" opacity="0.75" />
            </>
          )}
        </g>
      ))}
      <defs>
        <linearGradient id="pv-shelf-shade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.35" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#000" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <rect x="0" y={HEIGHT - 6} width={WIDTH} height="6" fill="#3a281a" />
      <rect x="0" y={HEIGHT - 6} width={WIDTH} height="1" fill="#c9a043" opacity="0.35" />
    </svg>
  );
}
