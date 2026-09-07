/**
 * Brand mark & wordmark.
 *
 * LogoMark: SVG recreation of the official UKF lettermark —
 *   a large U on the left, with K and F formed by two horizontal
 *   bars crossing a shared vertical stem on the right.
 *   Transparent background — works on light and dark surfaces.
 */

export function LogoMark({ className = "h-10 w-10", variant = "dark" }) {
  const fill = variant === "light" ? "#ffffff" : "#2d5a27"
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      role="img"
      aria-label="UKF — Umer Khan Foundation"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── U ── thick U shape: two legs + curved base */}
      {/* Left leg */}
      <rect x="0" y="0" width="18" height="65" rx="2" fill={fill} />
      {/* Right leg of U */}
      <rect x="40" y="0" width="18" height="65" rx="2" fill={fill} />
      {/* Curved base joining the two legs */}
      <path
        d="M0 55 Q0 80 29 80 Q58 80 58 55"
        stroke={fill}
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
      />

      {/* ── K & F share a vertical stem ── */}
      {/* Shared vertical stem */}
      <rect x="72" y="0" width="18" height="80" rx="2" fill={fill} />

      {/* K — upper diagonal arm (top-right) */}
      <path
        d="M90 38 L120 4"
        stroke={fill}
        strokeWidth="16"
        strokeLinecap="round"
      />
      {/* K — lower diagonal arm (bottom-right) */}
      <path
        d="M90 42 L120 76"
        stroke={fill}
        strokeWidth="16"
        strokeLinecap="round"
      />

      {/* F — top horizontal bar (shared with K top arm start) */}
      <rect x="72" y="0" width="46" height="16" rx="2" fill={fill} />
      {/* F — middle horizontal bar */}
      <rect x="72" y="32" width="36" height="14" rx="2" fill={fill} />
    </svg>
  )
}

export default function Logo({ variant = "dark", className = "" }) {
  const isLight = variant === "light"
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark
        className="h-8 w-auto shrink-0 sm:h-9"
        variant={variant}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[17px] font-semibold tracking-tight sm:text-lg ${
            isLight ? "text-white" : "text-ink"
          }`}
        >
          Umer Khan
        </span>
        <span
          className={`mt-1 text-[10px] font-bold uppercase tracking-[0.28em] ${
            isLight ? "text-brand-300" : "text-brand-600"
          }`}
        >
          Foundation
        </span>
      </span>
    </span>
  )
}
