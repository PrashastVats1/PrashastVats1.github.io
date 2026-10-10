import { useState } from "react";
import { imageUrl } from "./archive";

/** Quill and inkwell, shown for a folio without an illustration. */
function FolioEmblem() {
  return (
    <svg className="pv-plate__emblem" viewBox="0 0 120 80" aria-hidden="true" focusable="false">
      <ellipse cx="60" cy="68" rx="30" ry="4" fill="currentColor" opacity="0.18" />
      <path d="M46 52 h28 l-3 15 h-22 Z" fill="var(--pv-env-700)" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="51" y="46" width="18" height="7" rx="1.5" fill="var(--pv-env-700)" stroke="currentColor" strokeWidth="1.5" />
      <path d="M63 47 C70 30 82 16 98 8 C92 22 80 36 66 48" fill="var(--pv-parchment-100)" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M64 47 L92 13" stroke="currentColor" strokeWidth="1" />
      <path d="M22 30 h18 M18 38 h22 M24 46 h14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

/**
 * A post illustration set as a plate. Post images live outside the asset
 * manifest, so a failed load is caught here and the emblem takes its place.
 * `decorative` drops the alt text where the plate sits beside the title;
 * `omitIfMissing` removes an in-article figure rather than decorating the gap.
 */
export default function FolioPlate({ image, eager = false, decorative = false, omitIfMissing = false, className = "" }) {
  const [failed, setFailed] = useState(false);
  const show = image && !failed;
  if (!show && omitIfMissing) return null;
  return (
    <div className={`pv-plate${show ? "" : " pv-plate--emblem"} ${className}`.trim()}>
      {show ? (
        <img
          src={imageUrl(image.src)}
          alt={decorative ? "" : image.alt || ""}
          className="pv-plate__image"
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <FolioEmblem />
      )}
    </div>
  );
}
