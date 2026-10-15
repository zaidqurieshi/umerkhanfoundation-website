import { LuArrowUpRight, LuHeart, LuShieldCheck } from "react-icons/lu"
import Reveal from "./ui/Reveal"
import { oxygenCampaign } from "../data/content"

/**
 * Featured Campaign Banner — Oxygen Concentrator Initiative.
 * Clean, non-duplicative presentation:
 * 1. Desktop & Tablet: Full 16:9 banner with pixel-perfect clickable HTML overlay on the "Pay Now" button.
 * 2. Mobile: Clean banner with accessible, tap-friendly standalone Pay Now button directly underneath.
 * 3. All duplicative headings and descriptions removed to let the banner graphic speak for itself.
 */
export default function CampaignBanner() {
  const handleBannerClick = () => {
    window.open(oxygenCampaign.paymentUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <section
      id="campaign"
      className="scroll-mt-24 py-6 sm:py-10 lg:py-12"
      aria-label="Oxygen Concentrator Campaign"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

            {/* Mobile-Optimized Standalone Tap-Friendly Action Button */}
            <div className="border-t border-black/[0.06] bg-mist/60 p-4 sm:hidden">
              <a
                href={oxygenCampaign.paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[50px] w-full items-center justify-center gap-2 rounded-2xl bg-[#0a84ff] px-5 py-3 text-center text-sm font-semibold text-white shadow-card transition-all duration-200 active:scale-[0.99] hover:bg-[#0070e0]"
              >
                <LuHeart className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                <span>Pay Now ({oxygenCampaign.targetDisplay} Goal)</span>
                <LuArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
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
