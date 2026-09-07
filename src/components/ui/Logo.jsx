/**
 * Brand mark & wordmark — the official UKF logo (/public/logo.png).
 *
 * The logo file is dark green on transparent, so it reads directly on
 * light surfaces; `variant="light"` inverts it to white for dark
 * surfaces (footer). LogoMark shows only the UKF lettermark by cropping
 * the left portion of the same file (object-cover + object-left).
 */

const LOGO_SRC = "/logo.png"

export function LogoMark({ className = "h-10", variant = "dark" }) {
  return (
    <img
      src={LOGO_SRC}
      alt="UKF — Umer Khan Foundation"
      role="img"
      className={`object-cover object-left ${variant === "light" ? "brightness-0 invert" : ""} ${className}`}
      style={{ aspectRatio: "360 / 207" }}
    />
  )
}

export default function Logo({ variant = "dark", className = "" }) {
  return (
    <img
      src={LOGO_SRC}
      alt="Umer Khan Foundation"
      className={`inline-block h-9 w-auto sm:h-10 ${variant === "light" ? "brightness-0 invert" : ""} ${className}`}
    />
  )
}
