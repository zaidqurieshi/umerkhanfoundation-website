/**
 * Brand mark & wordmark.
 *
 * NOTE: The foundation's official logo image isn't publicly retrievable,
 * so this is a clean typographic mark (rounded green tile + heart).
 * To use the real logo: drop `logo.png` into /public and replace the
 * <LogoMark/> SVG below with <img src="/logo.png" alt="Umer Khan Foundation" />.
 */

export function LogoMark({ className = "h-10 w-10" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Umer Khan Foundation mark">
      <defs>
        <linearGradient id="ukf-mark-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#17925b" />
          <stop offset="100%" stopColor="#0a3d2a" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#ukf-mark-gradient)" />
      <path
        d="M32 45C23.4 38.9 18.6 33.6 18.6 28.4c0-4.1 3.1-7.2 7-7.2 2.7 0 5.1 1.6 6.4 4 1.3-2.4 3.7-4 6.4-4 3.9 0 7 3.1 7 7.2 0 5.2-4.8 10.5-13.4 16.6Z"
        fill="#fff"
      />
    </svg>
  )
}

export default function Logo({ variant = "dark", className = "" }) {
  const isLight = variant === "light"
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
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
