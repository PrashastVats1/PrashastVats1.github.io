import { CornerFlourish } from "./Ornaments";

/** The readable content surface. `torn` adds a small edge tear clear of the text. */
export default function ParchmentFrame({ children, torn = true, className = "", as: Tag = "div" }) {
  return (
    <div className="pv-parchment-wrap">
      <Tag className={`pv-parchment ${torn ? "pv-parchment--torn" : ""} ${className}`.replace(/\s+/g, " ").trim()}>
        <CornerFlourish position="tl" />
        <CornerFlourish position="tr" />
        <CornerFlourish position="bl" />
        <CornerFlourish position="br" />
        <div className="pv-parchment__content">{children}</div>
      </Tag>
    </div>
  );
}
