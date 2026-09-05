import { useRef } from "react"
import { LuArrowLeft, LuArrowRight, LuArrowUpRight, LuClock } from "react-icons/lu"
import SectionHeading from "./ui/SectionHeading"
import Reveal from "./ui/Reveal"
import { news } from "../data/content"

/**
 * Latest updates — horizontally scrollable, snap-aligned news cards
 * with desktop arrow controls and a "View All Updates" action.
 */
export default function LatestNews() {
  const scroller = useRef(null)
  const scrollByAmount = (dir) => scroller.current?.scrollBy({ left: dir * 390, behavior: "smooth" })

  return (
    <section id="news" className="scroll-mt-24 bg-mist py-24 sm:py-32" aria-labelledby="news-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="news-title" eyebrow={news.eyebrow} title={news.title} description={news.description} />
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByAmount(-1)}
              aria-label="Scroll updates backwards"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-ink shadow-card transition-all hover:border-brand-300 hover:text-brand-700"
            >
              <LuArrowLeft className="h-4.5 w-4.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(1)}
              aria-label="Scroll updates forwards"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-ink shadow-card transition-all hover:border-brand-300 hover:text-brand-700"
            >
              <LuArrowRight className="h-4.5 w-4.5" aria-hidden="true" />
            </button>
            <a
              href={news.viewAll.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group ml-1 inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-ink shadow-card transition-all hover:border-brand-300 hover:text-brand-700"
            >
              {news.viewAll.label}
              <LuArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        <Reveal className="relative mt-12" delay={0.1}>
          {/* edge fades */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-mist to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-mist to-transparent"
            aria-hidden="true"
          />

          <div
            ref={scroller}
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8"
          >
            {news.items.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.title} — open on Instagram`}
                className="group w-[300px] shrink-0 snap-start overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-black/[0.06] transition-all duration-500 hover:-translate-y-1 hover:shadow-soft sm:w-[360px]"
              >
                <div className="aspect-[16/11] overflow-hidden">
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    width={800}
                    height={560}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-700">
                      {item.category}
                    </span>
                    {item.date && (
                      <span className="inline-flex items-center gap-1 text-xs text-ink/40">
                        <LuClock className="h-3.5 w-3.5" aria-hidden="true" />
                        {item.date}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3.5 font-display text-xl font-medium leading-snug tracking-tight text-ink transition-colors duration-300 group-hover:text-brand-800">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/60">{item.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    Read update
                    <LuArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
