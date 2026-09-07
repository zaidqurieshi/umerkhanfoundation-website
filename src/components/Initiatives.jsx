import { LuArrowUpRight } from "react-icons/lu"
import SectionHeading from "./ui/SectionHeading"
import Reveal from "./ui/Reveal"
import { initiatives } from "../data/content"

/**
 * Our Work — text-only card grid of the foundation's six publicly stated
 * areas of support. Cards lift on hover.
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
                className="group flex h-full flex-col rounded-3xl bg-white p-6 shadow-card ring-1 ring-black/[0.06] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft"
              >
                <span className="self-start rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-800">
                  {item.category}
                </span>

                <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-brand-800">
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
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
