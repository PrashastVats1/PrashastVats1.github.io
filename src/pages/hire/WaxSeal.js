import { useId } from "react";

/** The guild's wax seal: pressed burgundy wax with a star-and-quill device. Decorative. */
export default function WaxSeal({ className = "" }) {
  const wax = `pv-seal-wax-${useId().replace(/:/g, "")}`;
  return (
    <svg className={`pv-seal ${className}`.trim()} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={wax} cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#a8394a" />
          <stop offset="0.55" stopColor="#7a1f2b" />
          <stop offset="1" stopColor="#4a0f18" />
        </radialGradient>
      </defs>
      <path
        d="M60 4 C70 6 74 2 82 8 C90 13 97 11 101 19 C106 27 114 30 113 40 C112 49 118 55 115 64 C112 73 116 81 109 88 C103 95 102 104 93 107 C84 110 79 117 69 115 C60 113 53 118 45 113 C37 108 28 110 23 102 C18 94 9 91 8 81 C7 72 2 66 5 57 C8 48 4 40 10 32 C16 25 16 16 25 12 C34 8 39 2 48 4 C53 5 56 3 60 4 Z"
        fill={`url(#${wax})`}
      />
      <circle cx="60" cy="60" r="38" fill="none" stroke="#4a0f18" strokeWidth="3" opacity="0.55" />
      <circle cx="60" cy="60" r="34" fill="none" stroke="var(--pv-gold)" strokeWidth="1.2" opacity="0.8" />
      <circle cx="60" cy="60" r="30" fill="none" stroke="var(--pv-gold)" strokeWidth="0.6" strokeDasharray="1.5 3" opacity="0.7" />
      <path d="M60 36 L64.5 51 L80 51.5 L67.5 60.5 L72 76 L60 66.5 L48 76 L52.5 60.5 L40 51.5 L55.5 51 Z" fill="var(--pv-gold)" opacity="0.9" />
      <path d="M44 86 C56 78 70 70 84 56" fill="none" stroke="#f3e5c3" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
      <path d="M84 56 C80 64 74 70 66 74" fill="none" stroke="#f3e5c3" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      <ellipse cx="44" cy="34" rx="12" ry="6" fill="#ffffff" opacity="0.12" transform="rotate(-30 44 34)" />
    </svg>
  );
}
