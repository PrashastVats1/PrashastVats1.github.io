import SafeImage from "../../components/fantasy/SafeImage";
import { ARTIFACT_WIDTHS, variantSrcSet } from "../../assets/manifest";

// Intrinsic size of the supplied artwork (5:4); reserves space before it loads.
export const ARTWORK_WIDTH = 1402;
export const ARTWORK_HEIGHT = 1122;

/** An empty display niche: brass arch, pedestal, and an engraved medallion. */
function ArtifactPlaceholder({ monogram }) {
  const small = monogram.length > 2;
  return (
    <svg className="pv-artifact-art__placeholder" viewBox="0 0 400 300" aria-hidden="true" focusable="false" data-placeholder="true">
      <g className="pv-artifact-art__rays">
        <path d="M200 0 L140 300 H260 Z" />
        <path d="M200 0 L90 300 H130 Z" opacity="0.5" />
        <path d="M200 0 L270 300 H310 Z" opacity="0.5" />
      </g>
      <g className="pv-artifact-art__arch">
        <path d="M96 286 V128 A104 104 0 0 1 304 128 V286" />
        <path d="M110 286 V130 A90 90 0 0 1 290 130 V286" strokeWidth="0.8" opacity="0.6" />
        <path d="M196 30 L200 22 L204 30 L200 38 Z" className="pv-artifact-art__fill" />
      </g>
      <g className="pv-artifact-art__medallion">
        <circle cx="200" cy="150" r="58" strokeWidth="0.8" strokeDasharray="2 6" opacity="0.7" />
        <circle cx="200" cy="150" r="48" />
        <circle cx="200" cy="150" r="41" strokeWidth="0.8" opacity="0.7" />
        <text x="200" y="150" dy="0.36em" textAnchor="middle" className="pv-artifact-art__monogram" fontSize={small ? 24 : 34}>
          {monogram}
        </text>
      </g>
      <g className="pv-artifact-art__pedestal">
        <path d="M150 226 H250 L242 238 H158 Z" />
        <path d="M166 238 H234 V270 H166 Z" />
        <path d="M146 270 H254 L262 284 H138 Z" />
      </g>
    </svg>
  );
}

/**
 * Artwork slot for an artifact. Renders the supplied image when
 * public/<artwork.src> exists, otherwise the designed placeholder.
 */
export default function ArtifactArt({ artifact, eager = false }) {
  const { artwork = {}, accent, monogram } = artifact;
  return (
    <div className="pv-artifact-art" data-accent={accent}>
      <SafeImage
        path={artwork.src}
        alt={artwork.alt || ""}
        className="pv-artifact-art__image"
        srcSet={artwork.src ? variantSrcSet(artwork.src.replace(/\.webp$/, ""), ARTIFACT_WIDTHS) : undefined}
        sizes="(max-width: 480px) 90vw, 450px"
        width={ARTWORK_WIDTH}
        height={ARTWORK_HEIGHT}
        loading={eager ? "eager" : "lazy"}
        fetchpriority={eager ? "high" : "auto"}
        decoding="async"
        keepLayout
        fallback={<ArtifactPlaceholder monogram={monogram} />}
      />
    </div>
  );
}
