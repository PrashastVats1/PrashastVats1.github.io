import { useRawNavigate } from "../../router";

/**
 * Navigation inside the Archive (the catalogue and its folios). Like the Hall,
 * it skips the global spell transition, which is reserved for moving between
 * major pages; the folio's own short entrance stands in for it.
 */
export default function ArchiveLink({ to, onClick, children, ...rest }) {
  const navigate = useRawNavigate();
  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={"#" + to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
