import { LuArrowUpRight } from "react-icons/lu"
import SectionHeading from "./ui/SectionHeading"
import Reveal from "./ui/Reveal"
import { initiatives } from "../data/content"

/**
 * Our Work — card grid of the foundation's six publicly stated
 * areas of support. Cards lift + images zoom on hover.
 */
export default function Initiatives() {
  return (
    <section
      id="work"
      className="scroll-mt-24 bg-mist py-24 sm:py-32"
      aria-labelledby="work-title"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="work-title"
            eyebrow={initiatives.eyebrow}
            title={initiatives.title}
            description={initiatives.description}
          />
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {initiatives.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.08} className="h-full">
              <a
                href={initiatives.learnMore.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.title} — ${initiatives.learnMore.label} (opens Instagram)`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-black/[0.06] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    width={900}
                    height={620}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-800 backdrop-blur">
                    {item.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-brand-800">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">{item.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    {initiatives.learnMore.label}
                    <LuArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
