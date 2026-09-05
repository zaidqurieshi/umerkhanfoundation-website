import { LuCheck } from "react-icons/lu"
import SectionHeading from "./ui/SectionHeading"
import Reveal from "./ui/Reveal"
import { about } from "../data/content"

/**
 * Editorial About section — magazine-style alternating image/text rows,
 * the foundation's verified mission as a pull-quote, and its six
 * publicly stated areas of support as a checklist.
 */
export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 sm:py-32" aria-labelledby="about-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={about.eyebrow} title={about.title} id="about-title" />

        {/* Row 1 — image | text */}
        <div className="mt-14 grid items-center gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div
              className="absolute -bottom-5 -right-5 h-full w-full rounded-[2rem] bg-brand-50"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[2rem] shadow-soft ring-1 ring-black/5">
              <img
                src={about.imageA.src}
                alt={about.imageA.alt}
                width={1000}
                height={1250}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
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

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {about.checklist.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-black/[0.05] bg-white px-4 py-3 shadow-card"
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

        {/* Row 2 — text | image */}
        <div className="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 lg:order-1" delay={0.1}>
            <p className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">{about.story.title}</p>
            <p className="mt-5 leading-relaxed text-ink/65">{about.story.text}</p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-ink/50">
              <span>Nonprofit organization</span>
              <span aria-hidden="true" className="h-1 w-1 self-center rounded-full bg-brand-400" />
              <span>Community-funded</span>
              <span aria-hidden="true" className="h-1 w-1 self-center rounded-full bg-brand-400" />
              <span>Srinagar, J&amp;K</span>
            </div>
          </Reveal>

          <Reveal className="relative order-1 lg:order-2">
            <div
              className="absolute -bottom-5 -left-5 h-full w-full rounded-[2rem] bg-brand-100/70"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[2rem] shadow-soft ring-1 ring-black/5">
              <img
                src={about.imageB.src}
                alt={about.imageB.alt}
                width={1100}
                height={825}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
