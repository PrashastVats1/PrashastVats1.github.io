import { navIconPath } from "../../assets/manifest";
import SafeImage from "./SafeImage";

const PATHS = {
  // open spellbook
  home: "M3 5.5c3-1 6-1 9 1 3-2 6-2 9-1v13c-3-1-6-1-9 1-3-2-6-2-9-1z M12 6.5v13",
  // rolled scroll
  resume: "M6 4h11a2 2 0 0 1 0 4H8 M6 4a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 0-4h-1V8 M11 11h5 M11 14h4",
  // faceted gem on a pedestal
  projects: "M7 4h10l3 4-8 9-8-9z M4 8h16 M10 4l-1 4 3 9 3-9-1-4 M8 20h8 M12 17v3",
  // alchemist flask
  tools: "M9 3h6 M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3 M7.5 14h9",
  // quill
  blog: "M20 3c-6 1-11 6-13 13l-2 5 M20 3c0 6-4 11-10 12 M9 9l4 4",
  // guild banner
  hire: "M5 21V3 M5 4h13l-3 4 3 4H5",
};

export default function NavIcon({ id }) {
  const inline = (
    <svg className="pv-nav-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={PATHS[id]} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return <SafeImage path={navIconPath(id)} alt="" className="pv-nav-icon" fallback={inline} />;
}
