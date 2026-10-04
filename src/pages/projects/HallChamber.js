import SafeImage from "../../components/fantasy/SafeImage";
import { SCENES, hasAsset } from "../../assets/manifest";

/**
 * The Hall itself: the scene artwork fills the viewport behind the page as the
 * room you stand in, and the stone chamber holding the exhibits sits within it.
 * Until the scene is supplied, the chamber is drawn in CSS over the wood.
 */
export default function HallChamber({ children, className = "" }) {
  const scene = hasAsset(SCENES.projects);
  return (
    <>
      {scene && (
        <div className="pv-hall-scene" aria-hidden="true">
          <SafeImage
            path={SCENES.projects}
            alt=""
            className="pv-hall-scene__image"
            width={1672}
            height={941}
            decoding="async"
            fetchpriority="low"
            keepLayout
          />
        </div>
      )}
      <div className={`pv-chamber${scene ? " pv-chamber--scene" : ""} ${className}`.trim()}>
        <div className="pv-chamber__content">{children}</div>
      </div>
    </>
  );
}
