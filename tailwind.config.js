/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      keyframes: {
        fadeUp:    { "0%": { opacity:"0", transform:"translateY(22px)" }, "100%": { opacity:"1", transform:"translateY(0)" } },
        blink:     { "0%,100%": { opacity:"1" }, "50%": { opacity:"0" } },
        orb:       { "0%,100%": { transform:"translate(0,0) scale(1)" }, "33%": { transform:"translate(50px,-35px) scale(1.08)" }, "66%": { transform:"translate(-35px,50px) scale(0.94)" } },
        spinSlow:  { to: { transform:"rotate(360deg)" } },
        pulseGlow: { "0%,100%": { opacity:"1" }, "50%": { opacity:"0.35" } },
        scrollDot: { "0%": { transform:"translateY(0)", opacity:"1" }, "100%": { transform:"translateY(10px)", opacity:"0" } },
        marquee:   { "0%": { transform:"translateX(0)" }, "100%": { transform:"translateX(-50%)" } },
      },
      animation: {
        "fade-up":    "fadeUp 0.65s ease both",
        "blink":      "blink 1s step-end infinite",
        "orb":        "orb 18s ease-in-out infinite",
        "orb2":       "orb 24s ease-in-out infinite",
        "spin-slow":  "spinSlow 22s linear infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "scroll-dot": "scrollDot 1.6s ease-in-out infinite",
        "marquee":    "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};
