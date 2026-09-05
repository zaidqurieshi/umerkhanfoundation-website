import { useState } from "react"
import { LuArrowUpRight, LuCheck, LuHandshake, LuHeart, LuHeartHandshake, LuShare2 } from "react-icons/lu"
import SectionHeading from "./ui/SectionHeading"
import Reveal from "./ui/Reveal"
import { helpOptions } from "../data/content"
import { useDonation } from "../context/DonationContext"

const icons = { heart: LuHeart, hands: LuHeartHandshake, share: LuShare2, partner: LuHandshake }

/**
 * How You Can Help — four conversion-focused cards.
 * "Donate" is the primary action (opens the donation sheet);
 * share uses the Web Share API with a clipboard fallback.
 */
export default function HowToHelp() {
  const { openDonation } = useDonation()
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: helpOptions.share.title, text: helpOptions.share.text, url })
      } catch {
        /* user dismissed the share sheet */
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2200)
      } catch {
        /* clipboard unavailable */
      }
    }
  }

  return (
    <section id="help" className="scroll-mt-24 bg-mist py-24 sm:py-32" aria-labelledby="help-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="help-title"
          eyebrow={helpOptions.eyebrow}
          title={helpOptions.title}
          description={helpOptions.description}
          align="center"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {helpOptions.items.map((option, i) => {
            const Icon = icons[option.icon] ?? LuHeart
            const isPrimary = option.primary

            return (
              <Reveal key={option.title} delay={i * 0.08} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1.5 ${
                    isPrimary
                      ? "bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-lift"
                      : "bg-white text-ink shadow-card ring-1 ring-black/[0.06] hover:shadow-soft"
                  }`}
                >
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${
                      isPrimary ? "bg-white/15 text-white" : "bg-brand-50 text-brand-700"
                    }`}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>

                  <h3 className="mt-5 font-display text-2xl font-medium tracking-tight">{option.title}</h3>
                  <p className={`mt-2 flex-1 text-sm leading-relaxed ${isPrimary ? "text-white/75" : "text-ink/60"}`}>
                    {option.description}
                  </p>

                  <div className="mt-6">
                    {option.action === "donate" && (
                      <button
                        type="button"
                        onClick={openDonation}
                        className="group inline-flex items-center gap-1.5 text-sm font-semibold text-white"
                      >
                        <span className="border-b border-white/30 pb-0.5 transition-colors group-hover:border-white">
                          {option.actionLabel}
                        </span>
                        <LuArrowUpRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </button>
                    )}

                    {option.action === "link" && (
                      <a
                        href={option.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700"
                      >
                        <span className="border-b border-brand-200 pb-0.5 transition-colors group-hover:border-brand-500">
                          {option.actionLabel}
                        </span>
                        <LuArrowUpRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    )}

                    {option.action === "share" && (
                      <button
                        type="button"
                        onClick={handleShare}
                        className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700"
                      >
                        <span className="border-b border-brand-200 pb-0.5 transition-colors group-hover:border-brand-500">
                          {copied ? "Link copied" : option.actionLabel}
                        </span>
                        {copied ? (
                          <LuCheck className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <LuArrowUpRight
                            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    )}

                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <span className="sr-only" aria-live="polite">
          {copied ? "Page link copied to clipboard" : ""}
        </span>
      </div>
    </section>
  )
}
