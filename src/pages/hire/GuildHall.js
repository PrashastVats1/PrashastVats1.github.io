import SafeImage from "../../components/fantasy/SafeImage";
import { SCENES, hasAsset } from "../../assets/manifest";

/**
 * The guild hall: a timber-and-stone room whose notice board holds the
 * recruitment notice. Uses the optional hire scene artwork if it is ever
 * supplied; otherwise the room is drawn in CSS.
 */
export default function GuildHall({ children }) {
  const scene = hasAsset(SCENES.hire);
  return (
    <>
      {scene && (
        <div className="pv-guild-scene" aria-hidden="true">
          <SafeImage path={SCENES.hire} alt="" className="pv-guild-scene__image" decoding="async" fetchpriority="low" keepLayout />
        </div>
      )}
      <div className={`pv-guild${scene ? " pv-guild--scene" : ""}`}>
        <div className="pv-guild__beam" aria-hidden="true" />
        <div className="pv-guild__content">{children}</div>
      </div>
    </>
  );
}
