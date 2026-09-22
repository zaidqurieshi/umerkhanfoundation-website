import { LuArrowRight } from "react-icons/lu"
import { ticker } from "../data/content"

/**
 * Top announcement ticker — continuously scrolling marquee.
 * Pause on hover · content managed in data/content.js → `ticker`.
 */
function TickerRow({ ariaHidden = false }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
      {ticker.items.map((item, i) => {
        const text = typeof item === "string" ? item : item.text || item.label
        const label = typeof item === "string" ? null : (item.text ? item.label : null)
        return (
          <span key={i} className="flex items-center gap-2.5 whitespace-nowrap px-5 text-[11px] sm:text-xs">
            <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-300" aria-hidden="true" />
            {label && <span className="font-semibold uppercase tracking-[0.18em] text-brand-300">{label}</span>}
            <span className="font-medium text-white/90">{text}</span>
            <span className="ml-3 text-white/20" aria-hidden="true">
              |
            </span>
          </span>
        )
      })}
      {ticker.cta && (
        <a
          href={ticker.cta.href}
          tabIndex={ariaHidden ? -1 : undefined}
          className="flex items-center gap-1.5 whitespace-nowrap px-5 text-xs font-semibold text-white transition-colors hover:text-brand-200"
        >
          {ticker.cta.label}
          <LuArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      )}
    </div>
  )
}

export default function NewsTicker() {
  return (
    <aside
      className="overflow-hidden bg-brand-950 py-2 text-white"
      aria-label="Latest updates from Umer Khan Foundation"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <TickerRow />
        <TickerRow ariaHidden />
      </div>
    </aside>
  )
}
