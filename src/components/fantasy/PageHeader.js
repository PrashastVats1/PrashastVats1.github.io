import { Divider } from "./Ornaments";

/**
 * Page heading pairing a fantasy title with its plain professional meaning.
 */
export default function PageHeader({ eyebrow, title, plain, description, children }) {
  return (
    <header className="pv-page-header">
      {eyebrow && <p className="pv-page-header__eyebrow">{eyebrow}</p>}
      <h1 className="pv-page-header__title">{title}</h1>
      {plain && <p className="pv-page-header__plain">{plain}</p>}
      <Divider className="pv-page-header__divider" />
      {description && <p className="pv-page-header__description">{description}</p>}
      {children}
    </header>
  );
}
