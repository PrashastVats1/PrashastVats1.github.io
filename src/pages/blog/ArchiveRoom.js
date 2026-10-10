import SafeImage from "../../components/fantasy/SafeImage";
import { SCENES, hasAsset } from "../../assets/manifest";
import BookShelf from "./BookShelf";

/**
 * The Archive itself: a panelled study lined with books. If the blog scene
 * artwork is supplied it fills the viewport behind the room, as in the Hall;
 * until then the room is drawn entirely in CSS and SVG.
 */
export default function ArchiveRoom({ children, className = "" }) {
  const scene = hasAsset(SCENES.blog);
  return (
    <>
      {scene && (
        <div className="pv-archive-scene" aria-hidden="true">
          <SafeImage path={SCENES.blog} alt="" className="pv-archive-scene__image" decoding="async" fetchpriority="low" keepLayout />
        </div>
      )}
      <div className={`pv-archive${scene ? " pv-archive--scene" : ""} ${className}`.trim()}>
        <BookShelf />
        <div className="pv-archive__content">{children}</div>
      </div>
    </>
  );
}
