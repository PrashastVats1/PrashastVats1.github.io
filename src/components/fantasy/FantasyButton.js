import { Link } from "../../router";

/**
 * variant: "primary" (wax seal) | "secondary" (inked outline)
 * Renders a router Link with `to`, an anchor with `href`, otherwise a button.
 * `hint` adds plain-language supporting text under a fantasy label.
 */
export default function FantasyButton({ variant = "primary", to, href, hint, children, className = "", ...rest }) {
  const cls = `pv-button pv-button--${variant} ${className}`.trim();
  const content = (
    <>
      <span className="pv-button__label">{children}</span>
      {hint && <span className="pv-button__hint">{hint}</span>}
    </>
  );

  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{content}</a>;
  return <button type="button" className={cls} {...rest}>{content}</button>;
}
