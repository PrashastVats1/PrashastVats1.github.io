import { useState } from "react";
import { assetUrl, hasAsset } from "../../assets/manifest";

/**
 * Renders an asset slot. Shows `fallback` when the file is absent from the
 * asset manifest, while it is still loading, or if it fails to load, so a
 * broken-image icon is never visible.
 */
export default function SafeImage({ path, alt, fallback = null, className = "", ...rest }) {
  const [status, setStatus] = useState("loading");
  if (!path || !hasAsset(path) || status === "error") return fallback;

  return (
    <>
      {status !== "loaded" && fallback}
      <img
        src={assetUrl(path)}
        alt={alt}
        className={className}
        hidden={status !== "loaded"}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        {...rest}
      />
    </>
  );
}
