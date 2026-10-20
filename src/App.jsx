import { DonationProvider } from "./context/DonationContext"
import NewsTicker from "./components/NewsTicker"
import Navbar, { ScrollProgress } from "./components/Navbar"
import Hero from "./components/Hero"
import CampaignBanner from "./components/CampaignBanner"
import ImpactStats from "./components/ImpactStats"
import About from "./components/About"
import Initiatives from "./components/Initiatives"
import HowToHelp from "./components/HowToHelp"
import DonationCTA from "./components/DonationCTA"
import BankDetails from "./components/BankDetails"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import WhatsAppChat from "./components/WhatsAppChat"
import DonationModal from "./components/DonationModal"

/**
 * Umer Khan Foundation — one-page site.
 * Order: ticker → nav → hero → campaign → impact → about → work →
 * help → donate CTA → contact → footer.
 */
export default function App() {
  return (
    <DonationProvider>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:shadow-lift"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <div className="sm:hidden">
        <NewsTicker />
      </div>
      <Navbar />

      <main>
        <Hero />
        <CampaignBanner />
        <ImpactStats />
        <About />
        <Initiatives />
        <HowToHelp />
        <DonationCTA />
        <BankDetails />
        <Contact />
      </main>

      <Footer />
      <WhatsAppChat />
      <DonationModal />
    </DonationProvider>
  )
}
