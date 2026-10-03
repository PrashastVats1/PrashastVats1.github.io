/** @type {import('tailwindcss').Config} */
// Tokens are defined as CSS variables in src/index.css; Tailwind only maps
// names onto them so utilities and hand-written CSS share one source.
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        env: {
          900: "var(--pv-env-900)",
          800: "var(--pv-env-800)",
          700: "var(--pv-env-700)",
          600: "var(--pv-env-600)",
        },
        parchment: {
          50: "var(--pv-parchment-50)",
          100: "var(--pv-parchment-100)",
          200: "var(--pv-parchment-200)",
          300: "var(--pv-parchment-300)",
        },
        ink: {
          DEFAULT: "var(--pv-ink)",
          soft: "var(--pv-ink-soft)",
          faint: "var(--pv-ink-faint)",
        },
        gold: {
          DEFAULT: "var(--pv-gold)",
          bright: "var(--pv-gold-bright)",
        },
        burgundy: "var(--pv-burgundy)",
        forest: "var(--pv-forest)",
        "deep-blue": "var(--pv-deep-blue)",
        arcane: "var(--pv-purple)",
        ember: "var(--pv-ember)",
      },
      fontFamily: {
        display: "var(--pv-font-display)",
        flourish: "var(--pv-font-flourish)",
        body: "var(--pv-font-body)",
      },
      boxShadow: {
        raised: "var(--pv-shadow-raised)",
        glow: "var(--pv-glow-magic)",
      },
    },
  },
  plugins: [],
};
