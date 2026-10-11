import { useState } from "react";
import { assetUrl, hasAsset } from "../../assets/manifest";

/**
 * Renders an asset slot. Shows `fallback` when the file is absent from the
 * asset manifest, while it is still loading, or if it fails to load, so a
 * broken-image icon is never visible.
 *
 * `keepLayout` leaves the loading image rendered (marked with data-loading for
 * CSS to hide) instead of setting `hidden`: browsers never fetch a lazy image
 * that is not rendered.
 */
export default function SafeImage({ path, alt, fallback = null, className = "", keepLayout = false, srcSet, sizes, loading: loadingMode, ...rest }) {
  const [status, setStatus] = useState("loading");
  if (!path || !hasAsset(path) || status === "error") return fallback;

  const loading = status !== "loaded";
  // Attribute order matters: React sets them in prop order, and a browser can
  // start fetching `src` before it sees `srcset`/`sizes` or `loading="lazy"`.
  return (
    <>
      {loading && fallback}
      <img
        loading={loadingMode}
        srcSet={srcSet}
        sizes={sizes}
        src={assetUrl(path)}
        alt={alt}
        className={className}
        hidden={loading && !keepLayout}
        data-loading={loading && keepLayout ? "true" : undefined}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        {...rest}
      />
    </>
  );
}
