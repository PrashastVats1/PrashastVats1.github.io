/** Temporary marker for pages whose full design arrives in a later phase. */
export default function PlaceholderNote({ children }) {
  return (
    <aside className="pv-placeholder-note">
      <svg className="pv-placeholder-note__seal" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
        <circle cx="20" cy="20" r="17" fill="var(--pv-burgundy)" />
        <circle cx="20" cy="20" r="12.5" fill="none" stroke="var(--pv-gold)" strokeWidth="1" />
        <path d="M20 11 L22.6 17.4 L29.5 17.6 L24 21.8 L26 28.5 L20 24.6 L14 28.5 L16 21.8 L10.5 17.6 L17.4 17.4 Z" fill="var(--pv-gold)" />
      </svg>
      <p>{children || "This chamber is still being prepared. The full page arrives in a later phase."}</p>
    </aside>
  );
}
