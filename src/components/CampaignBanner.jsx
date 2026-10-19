import { useEffect, useState } from "react"
import { LuArrowUpRight, LuHeart, LuShieldCheck } from "react-icons/lu"
import { useReducedMotion } from "framer-motion"
import Reveal from "./ui/Reveal"
import { oxygenCampaign } from "../data/content"

const SLIDE_INTERVAL = 5000

export default function CampaignBanner() {
  const [activeSlide, setActiveSlide] = useState(0)
  const reduceMotion = useReducedMotion()
  const slides = oxygenCampaign.slides

  useEffect(() => {
    if (reduceMotion || slides.length < 2) return undefined

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, SLIDE_INTERVAL)

    return () => window.clearInterval(timer)
  }, [reduceMotion, slides.length])

  return (
    <section
      id="campaign"
      className="scroll-mt-24 py-6 sm:py-8 lg:py-10"
      aria-label="Featured campaigns"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center gap-2.5 sm:mb-5">
          <span className="h-px w-8 bg-brand-500/50" aria-hidden="true" />
          <h2 className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600">
            {oxygenCampaign.eyebrow}
          </h2>
        </div>

        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-card sm:rounded-3xl">
            <div
              className="relative aspect-[1920/820] w-full overflow-hidden bg-slate-100"
              role="region"
              aria-roledescription="carousel"
              aria-label="Foundation initiatives"
              onMouseEnter={(event) => event.currentTarget.setAttribute("data-paused", "true")}
              onMouseLeave={(event) => event.currentTarget.removeAttribute("data-paused")}
            >
              {slides.map((slide, index) => (
                <img
                  key={slide.src}
                  src={slide.src}
                  alt={slide.alt}
                  width={1920}
                  height={820}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  className={`absolute inset-0 h-full w-full select-none object-contain transition-opacity duration-700 sm:object-cover ${index === activeSlide ? "opacity-100" : "opacity-0"}`}
                  aria-hidden={index !== activeSlide}
                />
              ))}

              <a
                href={oxygenCampaign.paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pay Now with Razorpay"
                className="absolute left-[7.3%] top-[73%] z-10 hidden h-[11%] w-[22.5%] items-center justify-center rounded-full bg-transparent transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-2 sm:flex"
              >
                <span className="sr-only">Pay Now</span>
              </a>

              <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-2 sm:bottom-4">
                {slides.map((slide, index) => (
                  <button
                    key={slide.src}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Show campaign ${index + 1} of ${slides.length}: ${slide.alt}`}
                    aria-current={index === activeSlide ? "true" : undefined}
                    className={`h-2.5 w-2.5 rounded-full border border-white shadow-sm transition sm:h-3 sm:w-3 ${index === activeSlide ? "scale-110 bg-brand-700" : "bg-white/75 hover:bg-white"}`}
                  />
                ))}
              </div>
            </div>

            <div className="border-t border-black/[0.06] bg-mist/60 p-4 sm:hidden">
              <a
                href={oxygenCampaign.paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[50px] w-full items-center justify-center gap-2 rounded-2xl bg-brand-700 px-5 py-3 text-center text-sm font-semibold text-white shadow-card transition hover:bg-brand-800 active:scale-[0.99]"
              >
                <LuHeart className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                <span>Pay Now</span>
                <LuArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-[11px] text-ink/50">
                <LuShieldCheck className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
                Secure payments powered by Razorpay
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
