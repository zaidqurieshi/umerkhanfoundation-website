import { LuArrowUpRight, LuFacebook, LuInstagram, LuMapPin } from "react-icons/lu"
import Logo from "./ui/Logo"
import { footer, navLinks, org } from "../data/content"
import { DonateButton } from "./Navbar"

/**
 * Premium minimal footer — brand, mission, navigation, verified
 * contact details and the standing Donate action.
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-950 pt-16 text-white sm:pt-20">
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 h-96 w-[720px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_1fr_1.2fr]">
          {/* brand */}
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">{footer.missionLine}</p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={org.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Umer Khan Foundation on Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/80 ring-1 ring-white/10 transition-all hover:bg-white/10 hover:text-white"
              >
                <LuInstagram className="h-4.5 w-4.5" aria-hidden="true" />
              </a>
              <a
                href={org.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Umer Khan Foundation on Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/80 ring-1 ring-white/10 transition-all hover:bg-white/10 hover:text-white"
              >
                <LuFacebook className="h-4.5 w-4.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* explore */}
          <nav aria-label="Footer">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-300">
              {footer.exploreLinksTitle}
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                    <LuArrowUpRight
                      className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-70"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* our work */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-300">
              {footer.workLinksTitle}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/60">
              <li>Medical Assistance</li>
              <li>O₂ Support</li>
              <li>Orphan Care</li>
              <li>Educational Assistance</li>
              <li>Food &amp; Supplies</li>
              <li>Financial Assistance</li>
            </ul>
          </div>

          {/* connect */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-300">
              {footer.connectLinksTitle}
            </h3>
            <div className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-white/60">
              <LuMapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
              <p>
                {org.address.line1}
                <br />
                {org.address.line2}
                <br />
                <span className="text-white/40">{org.address.landmark}</span>
              </p>
            </div>
            <a
              href={org.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 ml-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 transition-colors hover:text-brand-200"
            >
              Get Directions
              <LuArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <div className="mt-6">
              <DonateButton />
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 py-7 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {footer.legal.map((item) => (
              <a key={item.label} href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </a>
            ))}
            <span>{footer.locationLine}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
