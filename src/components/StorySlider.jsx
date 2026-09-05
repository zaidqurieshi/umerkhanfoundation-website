import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { LuArrowLeft, LuArrowRight, LuArrowUpRight, LuClock } from "react-icons/lu"
import SectionHeading from "./ui/SectionHeading"
import { stories } from "../data/content"

const AUTOPLAY_MS = 6500

const slideVariants = {
  enter: (dir) => ({ x: dir >= 0 ? "55%" : "-55%", opacity: 0, scale: 1.04 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir >= 0 ? "-28%" : "28%", opacity: 0, scale: 0.97 }),
}

/**
 * Full-width cinematic story slider — autoplay (pauses on hover/focus),
 * swipe/drag support, keyboard arrows, segment progress bar.
 */
export default function StorySlider() {
  const [[index, direction], setState] = useState([0, 0])
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const count = stories.items.length

  const paginate = useCallback((dir) => setState(([i]) => [(i + dir + count) % count, dir]), [count])

  useEffect(() => {
    if (paused || reduce) return undefined
    const t = setTimeout(() => paginate(1), AUTOPLAY_MS)
    return () => clearTimeout(t)
  }, [index, paused, reduce, paginate])

  const onDragEnd = (e, { offset }) => {
    if (offset.x < -60) paginate(1)
    else if (offset.x > 60) paginate(-1)
  }

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      paginate(1)
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      paginate(-1)
    }
  }

  const story = stories.items[index]

  return (
    <section id="stories" className="scroll-mt-24 py-24 sm:py-32" aria-labelledby="stories-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="stories-title" eyebrow={stories.eyebrow} title={stories.title} />
          <p className="text-sm text-ink/45">{stories.hint}</p>
        </div>

        <div
          className="relative mt-10 h-[78vh] max-h-[720px] min-h-[540px] overflow-hidden rounded-[2.5rem] bg-brand-950 shadow-lift"
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured stories"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={onKeyDown}
        >
          <AnimatePresence custom={direction} initial={false}>
            <motion.article
              key={index}
              custom={direction}
              variants={reduce ? undefined : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              drag={reduce ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={onDragEnd}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}: ${story.title}`}
            >
              <img
                src={story.image.src}
                alt={story.image.alt}
                width={1800}
                height={1000}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/30 to-brand-950/10"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-4 p-6 text-white sm:p-10 lg:p-14">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] backdrop-blur">
                  {story.category}
                </span>
                <h3 className="max-w-2xl font-display text-3xl font-medium tracking-tight sm:text-5xl">{story.title}</h3>
                <p className="max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">{story.description}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={story.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-50"
                  >
                    View on Instagram
                    <LuArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                  {story.date && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-white/60">
                      <LuClock className="h-3.5 w-3.5" aria-hidden="true" />
                      {story.date}
                    </span>
                  )}
                </div>
              </div>

            </motion.article>
          </AnimatePresence>
          {/* segment progress */}
          <div
            className="absolute left-6 right-32 top-6 flex items-center gap-2 sm:left-10 sm:right-44 sm:top-8"
            aria-hidden="true"
          >
            {stories.items.map((s, i) => (
              <span key={s.title} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/25">
                {i === index && (
                  <span
                    key={index}
                    className={`block h-full bg-white ${reduce ? "w-full" : "slide-progress"}`}
                    style={reduce ? undefined : { animationPlayState: paused ? "paused" : "running" }}
                  />
                )}
              </span>
            ))}
          </div>

          {/* counter + controls */}
          <div className="absolute right-6 top-5 flex items-center gap-3 sm:right-10 sm:top-7">
            <span className="font-display text-sm tracking-widest text-white/80">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous story"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25"
              >
                <LuArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next story"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25"
              >
                <LuArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            Current story: {story.title}
          </p>
        </div>
      </div>
    </section>
  )
}
