import { LuArrowUpRight, LuHeart, LuShieldCheck } from "react-icons/lu"
import Reveal from "./ui/Reveal"
import SectionHeading from "./ui/SectionHeading"
import { oxygenCampaign } from "../data/content"

/**
 * Featured Campaign Banner — Oxygen Concentrator Initiative.
 * Displays the newly updated ₹65,000 target campaign banner with:
 * 1. Pixel-perfect clickable HTML overlay on desktop/tablet over the baked-in "Pay Now" button.
 * 2. Mobile-optimized responsive layout with high-legibility copy, goal tracker, and large tap-friendly button.
 * 3. Consistent ₹65,000 goal display across headline, tracker, and CTAs without unverified progress claims.
 */
export default function CampaignBanner() {
  const handleBannerClick = () => {
    window.open(oxygenCampaign.paymentUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <section
      id="campaign"
      className="scroll-mt-24 py-8 sm:py-12 lg:py-14"
      aria-labelledby="campaign-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="campaign-heading"
            eyebrow={oxygenCampaign.eyebrow}
            title={oxygenCampaign.title}
            description={oxygenCampaign.description}
          />

          {/* Goal Tracker Badge */}
          <div className="inline-flex shrink-0 items-center gap-3 self-start rounded-2xl border border-brand-200/90 bg-brand-50/80 px-4 py-2.5 shadow-xs backdrop-blur sm:self-auto">
            <span className="soft-pulse h-2.5 w-2.5 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700">
                Fundraising Goal
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-brand-900">
                {oxygenCampaign.targetDisplay}
              </span>
            </div>
          </div>
        </div>

        {/* Campaign Banner Card */}
        <Reveal>
          <div className="group relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-card transition-all duration-300 hover:shadow-soft sm:rounded-3xl">
            {/* Visual Banner Media Container */}
            <div
              onClick={handleBannerClick}
              role="region"
              aria-label="Oxygen Concentrator Campaign Banner graphic"
              className="relative aspect-[16/9] w-full cursor-pointer overflow-hidden bg-slate-100"
            >
              <img
                src={oxygenCampaign.bannerImage}
                alt={oxygenCampaign.bannerAlt}
                width={1024}
                height={576}
                loading="eager"
                fetchPriority="high"
                className="h-full w-full select-none object-cover transition-transform duration-500 group-hover:scale-[1.01]"
              />

              {/* Desktop & Tablet: Clickable HTML Button Overlay mapped over the baked-in Pay Now button */}
              <a
                href={oxygenCampaign.paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Pay Now — Donate towards the ${oxygenCampaign.targetDisplay} Oxygen Concentrator campaign on Razorpay (opens in a new tab)`}
                style={{
                  position: "absolute",
                  top: "71.7%",
                  left: "5.18%",
                  width: "25.1%",
                  height: "7.81%",
                }}
                className="z-10 hidden sm:flex cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:ring-4 hover:ring-white/80 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-2"
              >
                <span className="sr-only">Pay Now — {oxygenCampaign.targetDisplay} Goal (Razorpay)</span>
              </a>
            </div>

            {/* Mobile-Optimized Content Block: Ensures 100% legibility, accessible touch targets, and clear goal tracker */}
            <div className="border-t border-black/[0.06] bg-gradient-to-b from-white to-mist p-5 sm:hidden">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  Target: {oxygenCampaign.targetDisplay}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/45">
                  Razorpay Verified
                </span>
              </div>

              <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-ink">
                {oxygenCampaign.title}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-ink/70">
                {oxygenCampaign.description}
              </p>

              {/* Winter Elderly Care Callout */}
              <div className="mt-3 rounded-xl border border-brand-200/70 bg-brand-50/70 p-3 text-[11px] leading-relaxed text-brand-900">
                <span className="mb-0.5 block font-semibold text-brand-800">Winter Medical Care</span>
                {oxygenCampaign.winterNote}
              </div>

              {/* Goal Tracker */}
              <div className="mt-3.5 rounded-xl border border-black/[0.06] bg-white p-3 shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-ink/60">Fundraising Target</span>
                  <span className="font-display font-bold text-ink">{oxygenCampaign.targetDisplay}</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-full rounded-full bg-brand-600" aria-hidden="true" />
                </div>
                <div className="mt-1 flex items-center justify-between text-[10px] text-ink/50">
                  <span>Goal: {oxygenCampaign.targetDisplay}</span>
                  <span className="font-medium text-brand-700">Campaign Active</span>
                </div>
              </div>

              {/* Standalone Accessible Tap-Friendly Action Button */}
              <div className="mt-4 flex flex-col gap-2">
                <a
                  href={oxygenCampaign.paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[#0a84ff] px-5 py-3.5 text-center text-sm font-semibold text-white shadow-card transition-all duration-200 active:scale-[0.99] hover:bg-[#0070e0]"
                >
                  <LuHeart className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                  <span>Pay Now ({oxygenCampaign.targetDisplay} Goal)</span>
                  <LuArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>

                <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-ink/50">
                  <LuShieldCheck className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
                  Secure payments powered by Razorpay
                </p>
              </div>

              {/* Key Features Chips */}
              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-black/[0.06] pt-3">
                {oxygenCampaign.features.map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[10px] font-medium text-ink/70">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
