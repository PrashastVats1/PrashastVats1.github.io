export function CornerFlourish({ position }) {
  return (
    <svg className={`pv-corner pv-corner--${position}`} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path d="M4 60 V20 C4 10 10 4 20 4 H60" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 60 V24 C10 15 15 10 24 10 H60" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.7" />
      <path d="M18 18 c6 -2 10 2 8 7 c-2 4 -8 3 -8 -1" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="4" cy="60" r="1.8" fill="currentColor" />
      <circle cx="60" cy="4" r="1.8" fill="currentColor" />
    </svg>
  );
}

export function Divider({ className = "" }) {
  return (
    <svg className={`pv-divider ${className}`.trim()} viewBox="0 0 240 16" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M0 8 H104 M136 8 H240" stroke="currentColor" strokeWidth="1" />
      <path d="M120 1 L127 8 L120 15 L113 8 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="120" cy="8" r="2" fill="currentColor" />
      <circle cx="108" cy="8" r="1.4" fill="currentColor" />
      <circle cx="132" cy="8" r="1.4" fill="currentColor" />
    </svg>
  );
}
