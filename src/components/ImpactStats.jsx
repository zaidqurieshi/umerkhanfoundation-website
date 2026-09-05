import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"
import { LuInfo } from "react-icons/lu"
import SectionHeading from "./ui/SectionHeading"
import Reveal from "./ui/Reveal"
import { impact } from "../data/content"

/** Animated number counter — counts up once the section enters view. */
function Counter({ value, suffix = "", format }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    let raf
    const t0 = performance.now()
    const duration = 1700
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(value * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, reduce])

  const text = format === "k" ? `${(display / 1000).toFixed(1).replace(/\.0$/, "")}K` : String(display)
  return (
    <span ref={ref} className="tabular-nums">
      {text}
      {suffix}
    </span>
  )
}

/**
 * Impact band — dark green panel with animated verified-only counters.
 * Figures come from the foundation's public channels; see content.js.
 */
export default function ImpactStats() {
  return (
    <section id="impact" className="scroll-mt-24 px-4 py-10 sm:px-6 sm:py-14 lg:px-8" aria-labelledby="impact-title">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-900 via-brand-950 to-brand-950 px-6 py-16 text-white shadow-lift sm:px-12 sm:py-20 lg:px-16">
        {/* decorative glows & rings */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-brand-400/10 blur-3xl" />
          <div className="absolute right-16 top-16 h-40 w-40 rounded-full border border-white/10" />
          <div className="absolute -right-8 bottom-10 h-56 w-56 rounded-full border border-white/[0.07]" />
        </div>

        <div className="relative">
          <SectionHeading eyebrow={impact.eyebrow} title={impact.title} dark id="impact-title" />

          <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {impact.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className={i > 0 ? "lg:border-l lg:border-white/10 lg:pl-8" : ""}>
                  <p className="font-display text-5xl font-medium tracking-tight sm:text-6xl">
                    <Counter value={stat.value} suffix={stat.suffix} format={stat.format} />
                  </p>
                  <p className="mt-3 text-sm font-semibold text-white sm:text-base">{stat.label}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">{stat.caption}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-14 flex max-w-2xl items-start gap-2.5 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/45">
              <LuInfo className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {impact.note}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
