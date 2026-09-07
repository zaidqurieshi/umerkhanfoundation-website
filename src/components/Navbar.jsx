import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion"
import { LuArrowUpRight, LuFacebook, LuHeart, LuInstagram, LuMenu, LuX } from "react-icons/lu"
import Logo from "./ui/Logo"
import { navLinks, org } from "../data/content"
import { useDonation } from "../context/DonationContext"

const sectionIds = navLinks.map((l) => l.href.replace("#", ""))

/** Highlights the nav item for the section currently in view. */
function useActiveSection() {
  const [active, setActive] = useState("home")
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return active
}

/** Thin gradient reading-progress bar pinned to the very top. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[75] h-[3px] origin-left bg-gradient-to-r from-brand-600 via-brand-400 to-brand-600"
      aria-hidden="true"
    />
  )
}

/** Shared Donate pill button. */
export function DonateButton({ className = "", compact = false }) {
  const { openDonation } = useDonation()
  return (
    <button
      type="button"
      onClick={openDonation}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 font-semibold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-soft ${
        compact ? "px-4 py-2 text-[13px]" : "px-6 py-3 text-sm"
      } ${className}`}
    >
      <LuHeart className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
      Donate
    </button>
  )
}

/**
 * Floating sticky navigation — becomes a compact glass pill on scroll.
 * Mobile: hamburger opens an animated drawer below the bar.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection()
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return (
    <header className={`sticky top-0 z-[60] transition-all duration-300 ${scrolled || open ? "pt-2.5" : "pt-4"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          aria-label="Main"
          className={`flex items-center justify-between gap-3 rounded-2xl px-4 transition-all duration-300 sm:px-5 ${
            scrolled || open
              ? "h-14 border border-black/[0.06] bg-white/85 shadow-card backdrop-blur-xl"
              : "h-16 border border-transparent bg-transparent"
          }`}
        >
          <a href="#home" aria-label="Umer Khan Foundation — back to top" onClick={() => setOpen(false)}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.replace("#", "")
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive ? "bg-brand-50 text-brand-800" : "text-ink/65 hover:bg-black/[0.04] hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2.5">
            <DonateButton compact className="hidden sm:inline-flex" />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.06] bg-white/80 text-ink backdrop-blur transition-colors hover:bg-brand-50 lg:hidden"
            >
              {open ? <LuX className="h-5 w-5" aria-hidden="true" /> : <LuMenu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>
        {/* Mobile navigation drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-navigation"
              initial={reduce ? false : { opacity: 0, y: -10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.99 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2.5 rounded-3xl border border-black/[0.06] bg-white/95 p-3 shadow-lift backdrop-blur-xl lg:hidden"
            >
              <ul className="flex flex-col">
                {navLinks.map((link) => {
                  const isActive = active === link.href.replace("#", "")
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-medium transition-colors ${
                          isActive ? "bg-brand-50 text-brand-800" : "text-ink/75 hover:bg-mist"
                        }`}
                      >
                        {link.label}
                        <LuArrowUpRight className="h-4 w-4 text-ink/30" aria-hidden="true" />
                      </a>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-3 border-t border-black/[0.05] p-2 pt-4">
                <DonateButton className="w-full" />
                <div className="mt-3 flex items-center justify-center gap-5 py-1 text-sm text-ink/55">
                  <a
                    href={org.social.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-700"
                  >
                    <LuInstagram className="h-4 w-4" aria-hidden="true" />
                    Instagram
                  </a>
                  <span className="h-3 w-px bg-black/10" aria-hidden="true" />
                  <a
                    href={org.social.facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-700"
                  >
                    <LuFacebook className="h-4 w-4" aria-hidden="true" />
                    Facebook
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  )
}
