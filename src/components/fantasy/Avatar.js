import { AVATAR_FILES } from "../../assets/manifest";
import SafeImage from "./SafeImage";

const SIZES = { sm: 44, md: 96, lg: 168 };

const DEFAULT_ALT = {
  regular: "Prashast Vats as a software archmage",
  scholar: "Prashast Vats as a scholar",
};

/** Brass crest shown until the owner-supplied avatar artwork exists. */
function AvatarCrest({ variant, label }) {
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };
  return (
    <svg className="pv-avatar__crest" viewBox="0 0 100 100" focusable="false" {...a11y}>
      <circle cx="50" cy="50" r="47" fill="var(--pv-env-700)" stroke="var(--pv-gold)" strokeWidth="3" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="var(--pv-gold)" strokeWidth="0.75" strokeDasharray="1.5 3.5" opacity="0.7" />
      <path d="M50 14 C55 26 63 38 72 47 L28 47 C38 37 45 26 50 14 Z" fill="var(--pv-deep-blue)" stroke="var(--pv-gold)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M22 50 Q50 42 78 50 Q50 56 22 50 Z" fill="var(--pv-deep-blue)" stroke="var(--pv-gold)" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="54" cy="31" r="1.6" fill="var(--pv-gold-bright)" />
      <circle cx="47" cy="40" r="1.1" fill="var(--pv-gold-bright)" />
      {variant === "scholar" && (
        <path d="M34 82 h12 M54 82 h12 M46 82 q4 -3 8 0" fill="none" stroke="var(--pv-gold)" strokeWidth="2.5" strokeLinecap="round" />
      )}
      <text x="50" y="73" textAnchor="middle" fill="var(--pv-parchment-100)" fontFamily="var(--pv-font-display)" fontSize="19" letterSpacing="2">
        PV
      </text>
    </svg>
  );
}

/**
 * Reusable avatar for both character variants.
 * variant: "regular" (primary identity) | "scholar" (blog/writing)
 * Pass alt="" when the avatar is decorative (e.g. inside a labelled link).
 */
export default function Avatar({ variant = "regular", size = "md", alt, className = "" }) {
  const label = alt !== undefined ? alt : DEFAULT_ALT[variant] || DEFAULT_ALT.regular;
  const px = typeof size === "number" ? size : SIZES[size] || SIZES.md;

  return (
    <span className={`pv-avatar pv-avatar--${variant} ${className}`.trim()} style={{ width: px, height: px }}>
      <SafeImage
        path={AVATAR_FILES[variant]}
        alt={label}
        className="pv-avatar__image"
        width={px}
        height={px}
        fallback={<AvatarCrest variant={variant} label={label} />}
      />
    </span>
  );
}
