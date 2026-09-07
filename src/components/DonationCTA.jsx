import { useState } from "react"
import { LuArrowUpRight, LuCheck, LuHeart, LuPhone } from "react-icons/lu"
import Reveal from "./ui/Reveal"
import { donationCta, org } from "../data/content"
import { useDonation } from "../context/DonationContext"

/**
 * Donation CTA — the page's emotional culmination. A large soft-green
 * gradient panel with the primary donation action.
 */
export default function DonationCTA() {
  const { openDonation } = useDonation()
  const [copied, setCopied] = useState(false)

  /* Copy the number to the clipboard, then the tel: link opens the dialer —
     donors on phones call directly; on desktop the number stays copied. */
  const callNow = () => {
    navigator.clipboard
      .writeText(org.phone)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2400)
      })
      .catch(() => {})
  }

  return (
    <section id="donate" className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-28 lg:px-8" aria-labelledby="donate-title">
      <Reveal>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950 px-6 py-20 text-center text-white shadow-lift sm:px-12 sm:py-24 lg:px-20">
          {/* decorative glows & rings */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-32 -top-40 h-[420px] w-[420px] rounded-full bg-brand-500/25 blur-3xl" />
            <div className="absolute -bottom-40 -right-24 h-[420px] w-[420px] rounded-full bg-brand-400/15 blur-3xl" />
            <div className="absolute -left-10 bottom-8 h-52 w-52 rounded-full border border-white/[0.08]" />
            <div className="absolute -right-14 top-10 h-64 w-64 rounded-full border border-white/[0.08]" />
            <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          <div className="relative mx-auto flex max-w-3xl flex-col items-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-100 backdrop-blur">
              <LuHeart className="h-3.5 w-3.5" aria-hidden="true" />
              {donationCta.eyebrow}
            </span>

            <h2
              id="donate-title"
              className="mt-7 font-display text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            >
              {donationCta.title}
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {donationCta.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={openDonation}
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-semibold text-brand-900 shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-50 sm:text-base"
              >
                <LuHeart className="h-[18px] w-[18px] text-brand-600 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                {donationCta.primaryCta.label}
              </button>
              <a
                href={`tel:${org.phone.replace(/\s/g, "")}`}
                onClick={callNow}
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 sm:text-base"
              >
                {copied ? (
                  <LuCheck className="h-4 w-4 text-brand-200" aria-hidden="true" />
                ) : (
                  <LuPhone
                    className="h-4 w-4 text-brand-200 transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  />
                )}
                Call {org.phone}
              </a>
              <a
                href={donationCta.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 sm:text-base"
              >
                {donationCta.secondaryCta.label}
                <LuArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <p className="mt-8 text-xs text-white/45">{donationCta.smallPrint}</p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
