import Reveal from "./Reveal"

/**
 * Consistent editorial section heading: small-caps eyebrow,
 * large serif title, optional description.
 */
export default function SectionHeading({ id, eyebrow, title, description, align = "left", dark = false, className = "" }) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left"

  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignCls} ${className}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] ${
            dark ? "text-brand-300" : "text-brand-600"
          }`}
        >
          <span className={`h-px w-8 ${dark ? "bg-brand-300/60" : "bg-brand-500/50"}`} aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2
        id={id}
        className={`font-display text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-base leading-relaxed sm:text-lg ${dark ? "text-white/65" : "text-ink/60"}`}>{description}</p>
      )}
    </Reveal>
  )
}
