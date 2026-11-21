import { LuArrowRight } from "react-icons/lu"
import Reveal from "./ui/Reveal"
import { winterKitBanner } from "../data/content"
import { useDonation } from "../context/DonationContext"

/**
 * Winter Kit Programme banner — sits directly above Featured Campaigns.
 * The artwork contains its own call to action, so the whole image opens
 * the donation modal. Phones get a readable button below the image.
 */
export default function WinterKitBanner() {
  const { openDonation } = useDonation()

  return (
    <section id="winter-kit" className="scroll-mt-24 pt-6 sm:pt-8 lg:pt-10" aria-label={winterKitBanner.title}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <button
            type="button"
            onClick={openDonation}
            aria-label={winterKitBanner.ctaLabel}
            className="group block w-full overflow-hidden rounded-2xl border border-black/[0.08] bg-white text-left shadow-card transition-shadow duration-300 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:rounded-3xl"
          >
            <img
              src={winterKitBanner.src}
              alt={winterKitBanner.alt}
              width={1672}
              height={941}
              loading="eager"
              decoding="async"
              className="block h-auto w-full select-none"
            />
            <span className="flex min-h-[50px] items-center justify-center gap-2 bg-brand-700 px-5 py-3 text-center text-sm font-semibold text-white sm:hidden">
              {winterKitBanner.ctaLabel}
              <LuArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </button>
        </Reveal>
      </div>
    </section>
  )
}
