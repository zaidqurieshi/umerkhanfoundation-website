import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { LuHeart } from "react-icons/lu"
import { useDonation } from "../context/DonationContext"

/**
 * Mobile-only sticky bottom donation CTA — appears after the hero,
 * hides while the donation sheet is open. Safe-area aware.
 */
export default function MobileDonateCTA() {
  const { isOpen, openDonation } = useDonation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && !isOpen && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-4 z-[70] sm:hidden"
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
        >
          <button
            type="button"
            onClick={openDonation}
            className="flex w-full items-center justify-center gap-2.5 rounded-full bg-brand-600 py-4 text-base font-semibold text-white shadow-lift transition-colors hover:bg-brand-700"
          >
            <LuHeart className="h-5 w-5 fill-current" aria-hidden="true" />
            Donate
            <span className="text-sm font-normal text-white/70">· Umer Khan Foundation</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
