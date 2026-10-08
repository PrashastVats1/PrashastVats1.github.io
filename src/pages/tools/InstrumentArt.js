import SafeImage from "../../components/fantasy/SafeImage";
import { labPath } from "../../assets/manifest";

// Recommended size for supplied instrument artwork (4:3); reserves space before it loads.
export const INSTRUMENT_ART_WIDTH = 1200;
export const INSTRUMENT_ART_HEIGHT = 900;

/* Designed stand-ins: brass line drawings with tinted glass, one apparatus per instrument. */
const APPARATUS = {
  "prompt-injection-inspector": (
    <>
      <path className="pv-apparatus__paper" d="M34 118 L112 108 L124 130 L46 140 Z" />
      <path className="pv-apparatus__line" d="M50 122 L104 115 M54 129 L96 124" />
      <ellipse className="pv-apparatus__brass" cx="150" cy="134" rx="24" ry="5" />
      <path className="pv-apparatus__brass" d="M150 129 V58 M150 62 H126" />
      <circle className="pv-apparatus__glass" cx="96" cy="66" r="30" />
      <circle className="pv-apparatus__brass" cx="96" cy="66" r="30" />
      <circle className="pv-apparatus__line" cx="96" cy="66" r="24" />
      <path className="pv-apparatus__sheen" d="M80 52 A20 20 0 0 1 98 44" />
      <path className="pv-apparatus__glow" d="M88 70 L104 68 M86 76 L100 75" />
    </>
  ),
  "regex-alchemist": (
    <>
      <path className="pv-apparatus__brass" d="M44 136 H136 M60 136 L66 124 H114 L120 136" />
      <path className="pv-apparatus__glass" d="M82 40 V70 A30 30 0 1 0 98 70 V40 Z" />
      <path className="pv-apparatus__brass" d="M82 40 V70 A30 30 0 1 0 98 70 V40 M78 40 H102" />
      <path className="pv-apparatus__liquid" d="M64 98 Q90 92 116 98 A28 28 0 0 1 64 98 Z" />
      <path className="pv-apparatus__brass" d="M98 50 C130 40 150 52 156 86" />
      <path className="pv-apparatus__glass" d="M146 86 H166 L170 120 H142 Z" />
      <path className="pv-apparatus__brass" d="M146 86 H166 L170 120 H142 Z" />
      <circle className="pv-apparatus__bubble" cx="84" cy="88" r="3" />
      <circle className="pv-apparatus__bubble" cx="96" cy="80" r="2" />
      <circle className="pv-apparatus__bubble" cx="90" cy="64" r="1.6" />
    </>
  ),
  "json-scribe": (
    <>
      <path className="pv-apparatus__paper" d="M38 46 H128 V128 H38 Z" />
      <path className="pv-apparatus__brass" d="M32 42 H134 M32 132 H134" />
      <path className="pv-apparatus__glow" d="M60 62 Q52 62 52 70 V80 Q52 86 46 87 Q52 88 52 94 V104 Q52 112 60 112" />
      <path className="pv-apparatus__glow" d="M106 62 Q114 62 114 70 V80 Q114 86 120 87 Q114 88 114 94 V104 Q114 112 106 112" />
      <path className="pv-apparatus__line" d="M66 76 H100 M66 87 H94 M66 98 H98" />
      <path className="pv-apparatus__glass" d="M140 112 H172 L168 136 H144 Z" />
      <path className="pv-apparatus__brass" d="M140 112 H172 L168 136 H144 Z M146 112 V106 H166 V112" />
      <path className="pv-apparatus__quill" d="M156 104 C150 74 160 40 184 22 C178 50 170 78 158 104 Z" />
      <path className="pv-apparatus__line" d="M157 102 C162 76 170 50 182 26" />
    </>
  ),
  "commit-scribe": (
    <>
      <path className="pv-apparatus__paper" d="M30 120 L118 112 L126 136 L38 142 Z" />
      <circle className="pv-apparatus__glass" cx="80" cy="126" r="13" />
      <circle className="pv-apparatus__brass" cx="80" cy="126" r="13" />
      <path className="pv-apparatus__glow" d="M74 126 L80 120 L86 126 L80 132 Z" />
      <path className="pv-apparatus__ribbon" d="M72 137 L66 150 L74 147 L78 152 L80 139 M88 137 L94 150 L86 147 L82 152" />
      <path className="pv-apparatus__brass" d="M134 112 H170 L166 102 H138 Z" />
      <path className="pv-apparatus__wood" d="M144 102 V84 Q144 78 148 76 V54 Q152 30 152 30 Q156 30 160 54 V76 Q164 78 164 84 V102 Z" />
      <circle className="pv-apparatus__brass" cx="152" cy="28" r="6" />
      <path className="pv-apparatus__line" d="M144 92 H164" />
    </>
  ),
  "prompt-debugger": (
    <>
      <path className="pv-apparatus__brass" d="M70 138 H130 M78 138 L84 120 H116 L122 138" />
      <circle className="pv-apparatus__glass" cx="100" cy="76" r="40" />
      <circle className="pv-apparatus__brass" cx="100" cy="76" r="40" />
      <path className="pv-apparatus__glow" d="M100 54 L104 72 L122 76 L104 80 L100 98 L96 80 L78 76 L96 72 Z" />
      <path className="pv-apparatus__sheen" d="M74 58 A30 30 0 0 1 94 42" />
      <path className="pv-apparatus__line" d="M70 98 Q100 110 130 98" />
      <circle className="pv-apparatus__bubble" cx="122" cy="56" r="2" />
      <circle className="pv-apparatus__bubble" cx="80" cy="94" r="1.6" />
    </>
  ),
  "code-review-rater": (
    <>
      <path className="pv-apparatus__brass" d="M100 34 V134 M72 140 H128 M86 134 H114" />
      <path className="pv-apparatus__brass" d="M52 54 L148 46" />
      <circle className="pv-apparatus__brass" cx="100" cy="30" r="5" />
      <path className="pv-apparatus__brass" d="M52 54 L38 92 M52 54 L66 92 M148 46 L134 84 M148 46 L162 84" />
      <path className="pv-apparatus__glass" d="M34 92 Q52 106 70 92 Z" />
      <path className="pv-apparatus__brass" d="M34 92 Q52 106 70 92 Z" />
      <path className="pv-apparatus__glass" d="M130 84 Q148 98 166 84 Z" />
      <path className="pv-apparatus__brass" d="M130 84 Q148 98 166 84 Z" />
      <path className="pv-apparatus__glow" d="M46 88 L40 84 L46 80 M58 80 L64 84 L58 88" />
      <path className="pv-apparatus__glow" d="M142 80 L146 72 L154 80" />
    </>
  ),
  "jira-ticket-scorer": (
    <>
      <path className="pv-apparatus__wood" d="M36 30 H164 V138 H36 Z" />
      <path className="pv-apparatus__paper" d="M56 42 L140 38 L144 126 L60 130 Z" />
      <circle className="pv-apparatus__brass" cx="98" cy="44" r="4" />
      <path className="pv-apparatus__line" d="M70 60 H124 M72 74 H114 M72 88 H120 M74 102 H110" />
      <path className="pv-apparatus__glow" d="M128 70 L132 75 L140 64 M126 96 L130 101 L138 90" />
      <path className="pv-apparatus__ribbon" d="M60 118 L50 146 L60 140 L66 148 L70 122" />
    </>
  ),
};

function ApparatusPlaceholder({ slug }) {
  return (
    <svg className="pv-instrument-art__placeholder" viewBox="0 0 200 160" aria-hidden="true" focusable="false" data-placeholder="true">
      <ellipse className="pv-apparatus__halo" cx="100" cy="86" rx="70" ry="56" />
      {APPARATUS[slug]}
    </svg>
  );
}

/** Artwork slot for an instrument: public/assets/lab/<slug>.webp when supplied, otherwise the drawn apparatus. */
export default function InstrumentArt({ instrument, className = "" }) {
  return (
    <div className={`pv-instrument-art ${className}`.trim()} data-accent={instrument.accent}>
      <SafeImage
        path={labPath(instrument.slug)}
        alt=""
        className="pv-instrument-art__image"
        width={INSTRUMENT_ART_WIDTH}
        height={INSTRUMENT_ART_HEIGHT}
        decoding="async"
        keepLayout
        fallback={<ApparatusPlaceholder slug={instrument.slug} />}
      />
    </div>
  );
}
