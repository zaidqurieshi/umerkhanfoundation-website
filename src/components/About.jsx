import { LuCheck } from "react-icons/lu"
import SectionHeading from "./ui/SectionHeading"
import Reveal from "./ui/Reveal"
import { about } from "../data/content"

/**
 * Editorial About section — feature photo beside the foundation's verified
 * mission pull-quote, supporting paragraphs, and its six publicly stated
 * areas of support as a checklist.
 */
export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 sm:py-32" aria-labelledby="about-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={about.eyebrow} title={about.title} id="about-title" />

        <div className="mt-12 grid items-start gap-10 lg:mt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <figure className="border-l-2 border-brand-500 pl-6">
              <blockquote className="font-display text-xl font-normal leading-relaxed text-ink/90 sm:text-2xl">
                “{about.quote}”
              </blockquote>
              <figcaption className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">
                {about.quoteSource}
              </figcaption>
            </figure>

            {about.paragraphs.map((p, i) => (
              <p key={i} className="mt-6 leading-relaxed text-ink/65">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {about.checklist.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3.5 rounded-2xl border border-black/[0.05] bg-white px-4 py-3.5 shadow-card"
                >
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <LuCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-ink/80">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
