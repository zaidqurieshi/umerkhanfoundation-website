import { Fragment, useEffect, useState } from "react"
import { animate, motion, useReducedMotion } from "framer-motion"
import { LuArrowDown, LuFacebook, LuHeart, LuInstagram } from "react-icons/lu"
import { hero, org } from "../data/content"
import { useDonation } from "../context/DonationContext"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}
// The h1 itself stays static — it only reserves its slot in the hero's
// stagger sequence; the typed overlay below carries the animation.
const headline = { hidden: {}, show: {} }

// ── Typewriter headline ────────────────────────────────────────────
// The headline is a sequence of styled segments ("difference" is the
// italic, brand-colored one). An invisible copy of the full text keeps
// the exact final layout reserved (zero layout shift) while an overlay
// reveals it character by character, like a typewriter.
const TYPE_SEGMENTS = [
  { text: hero.headlineLine1, italic: false },
  { text: hero.headlineLine2[0], italic: false },
  { text: hero.headlineLine2[1], italic: true },
  { text: hero.headlineLine2[2], italic: false },
]
const TYPE_TOTAL = TYPE_SEGMENTS.reduce((n, s) => n + s.text.length, 0)
const TYPE_STARTS = TYPE_SEGMENTS.reduce(
  (acc, s) => [...acc, acc[acc.length - 1] + s.text.length],
  [0],
)

function useTypedCount(disabled) {
  const [count, setCount] = useState(disabled ? TYPE_TOTAL : 0)
  useEffect(() => {
    if (disabled) {
      setCount(TYPE_TOTAL)
      return undefined
    }
    const controls = animate(0, TYPE_TOTAL, {
      type: "tween",
      delay: 0.25,
      duration: 1.6,
      ease: "linear",
      onUpdate: (v) => setCount(Math.round(v)),
    })
    return () => controls.stop()
  }, [disabled])
  return count
}

function TypewriterHeadline() {
  const reduce = useReducedMotion()
  const typed = useTypedCount(Boolean(reduce))

  return (
    <motion.h1
      variants={headline}
      aria-label={`${hero.headlineLine1} ${hero.headlineLine2.join("")}`}
      className="relative mt-7 font-display text-[2.85rem] font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl xl:text-7xl"
    >
      {/* invisible copy of the full headline — reserves the final layout */}
      <span className="invisible select-none" aria-hidden="true">
        {hero.headlineLine1}
        <br />
        {hero.headlineLine2[0]}
        <em className="italic text-brand-600">{hero.headlineLine2[1]}</em>
        {hero.headlineLine2[2]}
      </span>

      {/* typed overlay — reveals the headline character by character */}
      <span className="absolute inset-0" aria-hidden="true">
        {TYPE_SEGMENTS.map((seg, i) => {
          const start = TYPE_STARTS[i]
          const visible = seg.text.slice(0, Math.max(0, Math.min(seg.text.length, typed - start)))
          const showCaret = typed < TYPE_TOTAL && typed >= start && typed < start + seg.text.length
          return (
            <Fragment key={i}>
              {i === 1 && <br />}
              {seg.italic ? <em className="italic text-brand-600">{visible}</em> : visible}
              {showCaret && (
                <motion.span
                  className="ml-0.5 inline-block h-[0.8em] w-[3px] rounded-full bg-brand-600 align-[-0.05em]"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
                />
              )}
            </Fragment>
          )
        })}
      </span>
    </motion.h1>
  )
}

export default function Hero() {
  const { openDonation } = useDonation()
  const reduce = useReducedMotion()

  return (
    <section id="home" className="relative scroll-mt-24 overflow-hidden">
      {/* soft, green-tinted background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-mist via-white to-white" />
        <div className="absolute -top-40 right-[-12%] h-[520px] w-[520px] rounded-full bg-brand-100/60 blur-3xl" />
        <div className="absolute left-[-14%] top-64 h-[460px] w-[460px] rounded-full bg-brand-50 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-5 pb-20 pt-12 text-center sm:px-8 sm:pt-16 lg:pb-28 lg:pt-20">
        <motion.div
          variants={container}
          initial={reduce ? undefined : "hidden"}
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full border border-brand-200/80 bg-white/70 px-4 py-1.5 backdrop-blur"
          >
            <span className="soft-pulse inline-block h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-700">{hero.eyebrow}</span>
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-ink/40 sm:inline">
              · {hero.location}
            </span>
          </motion.div>

          <TypewriterHeadline />

          <motion.p variants={item} className="mt-6 max-w-2xl text-base leading-relaxed text-ink/65 sm:text-lg">
            {hero.description}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={openDonation}
              className="group inline-flex items-center gap-2.5 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-soft sm:text-base"
            >
              <LuHeart
                className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
              {hero.primaryCta.label}
            </button>
            <a
              href={hero.secondaryCta.href}
              className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-7 py-3.5 text-sm font-semibold text-ink backdrop-blur transition-all duration-300 hover:border-brand-300 hover:text-brand-700 sm:text-base"
            >
              {hero.secondaryCta.label}
              <LuArrowDown
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-ink/50">
            <span className="font-medium text-ink/70">{org.tagline}</span>
            <a
              href={org.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-ink/60 transition-colors hover:text-brand-700"
            >
              <LuInstagram className="h-4 w-4 text-brand-600" aria-hidden="true" />
              {org.social.instagram.handle}
            </a>
            <a
              href={org.social.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-ink/60 transition-colors hover:text-brand-700"
            >
              <LuFacebook className="h-4 w-4 text-brand-600" aria-hidden="true" />
              Facebook
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

