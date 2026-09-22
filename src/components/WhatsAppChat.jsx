import { SiWhatsapp } from "react-icons/si"
import { useDonation } from "../context/DonationContext"

const WHATSAPP_PHONE = "919596581009"
const WHATSAPP_MESSAGE = "He Umer Khan Foundation. I would like to enquire or require assistance."
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

/**
 * Floating WhatsApp Live Chat button.
 * Opens WhatsApp with prefilled enquiry/assistance message to +91 9596581009.
 * Stays elevated above the mobile donate bar on small screens and sits in
 * the bottom-right corner on desktop.
 */
export default function WhatsAppChat() {
  const { isOpen } = useDonation()

  if (isOpen) return null

  return (
    <aside aria-label="Live Chat Support" className="fixed bottom-20 right-4 z-[65] sm:bottom-7 sm:right-7">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Live chat with Umer Khan Foundation on WhatsApp"
        className="group flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#20ba5a] hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
        </span>
        <SiWhatsapp className="h-5 w-5 fill-current transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
        <span className="text-xs font-bold uppercase tracking-wider">Live Chat</span>
      </a>
    </aside>
  )
}

