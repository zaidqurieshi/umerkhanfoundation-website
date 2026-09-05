import { LuInstagram } from "react-icons/lu"
import SectionHeading from "./ui/SectionHeading"
import Reveal from "./ui/Reveal"
import { gallery } from "../data/content"

/**
 * Instagram gallery — an integrated mosaic grid (not a generic embed).
 * Tiles link to the foundation's official profile; the first photo is
 * featured at 2×2 and a green follow-card completes the mosaic.
 */
export default function InstagramGallery() {
  return (
    <section id="gallery" className="scroll-mt-24 py-24 sm:py-32" aria-labelledby="gallery-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading id="gallery-title" eyebrow={gallery.eyebrow} title={gallery.title} />

        <Reveal className="mt-12" delay={0.1}>
          <div
            className="grid auto-flow-dense grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
            role="list"
            aria-label="Photos from the foundation's Instagram"
          >
            {gallery.images.map((image, i) => {
              const featured = i === 0
              return (
                <a
                  key={image.src}
                  role="listitem"
                  href={gallery.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open the foundation's Instagram profile — ${image.alt}`}
                  className={`group relative overflow-hidden rounded-2xl bg-mist shadow-card ring-1 ring-black/[0.04] transition-all duration-500 hover:-translate-y-1 hover:shadow-soft sm:rounded-3xl ${
                    featured ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={900}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span
                    className="absolute inset-0 flex items-center justify-center bg-brand-950/0 opacity-0 transition-all duration-500 group-hover:bg-brand-950/35 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <span className="inline-flex h-11 w-11 scale-75 items-center justify-center rounded-full bg-white/90 text-brand-800 shadow-card transition-transform duration-500 group-hover:scale-100">
                      <LuInstagram className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </span>
                </a>
              )
            })}

            {/* Follow card */}
            <a
              role="listitem"
              href={gallery.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group col-span-2 row-span-2 flex flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-center text-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:rounded-3xl"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-transform duration-500 group-hover:scale-110">
                <LuInstagram className="h-7 w-7" aria-hidden="true" />
              </span>
              <span className="font-display text-2xl font-medium tracking-tight sm:text-3xl">{gallery.handle}</span>
              <span className="rounded-full border border-white/25 bg-white/10 px-5 py-2 text-xs font-semibold tracking-wide backdrop-blur transition-colors duration-300 group-hover:bg-white/20">
                {gallery.followLabel}
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
