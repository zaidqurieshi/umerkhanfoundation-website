import { DonationProvider } from "./context/DonationContext"
import NewsTicker from "./components/NewsTicker"
import Navbar, { ScrollProgress } from "./components/Navbar"
import Hero from "./components/Hero"
import ImpactStats from "./components/ImpactStats"
import About from "./components/About"
import Initiatives from "./components/Initiatives"
import InstagramGallery from "./components/InstagramGallery"
import HowToHelp from "./components/HowToHelp"
import DonationCTA from "./components/DonationCTA"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import MobileDonateCTA from "./components/MobileDonateCTA"
import DonationModal from "./components/DonationModal"

/**
 * Umer Khan Foundation — one-page site.
 * Order: ticker → nav → hero → impact → about → work →
 * gallery (Moments from the field) → help → donate CTA → contact → footer.
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
      <NewsTicker />
      <Navbar />

      <main>
        <Hero />
        <ImpactStats />
        <About />
        <Initiatives />
        <InstagramGallery />
        <HowToHelp />
        <DonationCTA />
        <Contact />
      </main>

      <Footer />
      <MobileDonateCTA />
      <DonationModal />
    </DonationProvider>
  )
}
