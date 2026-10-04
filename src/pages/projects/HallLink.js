import { useRawNavigate } from "../../router";

/**
 * Navigation inside the Hall (the gallery and its artifact records). It skips
 * the global spell transition, which is reserved for moving between major
 * pages; the record's own short entrance stands in for it.
 */
export default function HallLink({ to, onClick, children, ...rest }) {
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
