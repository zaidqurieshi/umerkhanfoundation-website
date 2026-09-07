import { LuExternalLink, LuInstagram, LuFacebook, LuMail, LuMapPin, LuPhone } from "react-icons/lu"
import SectionHeading from "./ui/SectionHeading"
import Reveal from "./ui/Reveal"
import { contact, org } from "../data/content"

/**
 * Contact — verified information only. Phone/email render automatically
 * once set in content.js. Right side: live Google map.
 */
export default function Contact() {
  const cards = [
    {
      icon: LuMapPin,
      label: "Visit us",
      value: (
        <>
          {org.address.line1}
          <br />
          {org.address.line2}
          <span className="mt-1 block text-xs font-normal text-ink/45">{org.address.landmark}</span>
        </>
      ),
      action: { label: "Get Directions", href: org.mapsUrl },
    },
    {
      icon: LuInstagram,
      label: "Message us",
      value: org.social.instagram.handle,
      action: { label: "Open Instagram", href: org.social.instagram.url },
    },
    {
      icon: LuFacebook,
      label: "Connect",
      value: org.social.facebook.handle,
      action: { label: "Open Facebook", href: org.social.facebook.url },
    },
  ]

  return (
    <section id="contact" className="scroll-mt-24 py-24 sm:py-32" aria-labelledby="contact-title">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* left — info & actions */}
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow={contact.eyebrow}
            title={contact.title}
            description={contact.description}
          />

          <div className="mt-10 flex flex-col gap-4">
            {cards.map((card, i) => (
              <Reveal key={card.label} delay={i * 0.06}>
                <div className="group flex items-center gap-4 rounded-3xl border border-black/[0.06] bg-white p-5 shadow-card transition-all duration-500 hover:-translate-y-0.5 hover:shadow-soft">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                    <card.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/45">{card.label}</p>
                    <p className="mt-1 text-[15px] font-medium leading-snug text-ink">{card.value}</p>
                  </div>
                  <a
                    href={card.action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-brand-300 hover:text-brand-700"
                  >
                    {card.action.label}
                    <LuExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </Reveal>
            ))}

            {/* phone / email — render automatically once set in content.js */}
            {(org.phone || org.email) && (
              <Reveal delay={0.18}>
                <div className="flex flex-col gap-3 sm:flex-row">
                  {org.phone && (
                    <a
                      href={`tel:${org.phone.replace(/\s/g, "")}`}
                      className="flex flex-1 items-center gap-4 rounded-3xl border border-black/[0.06] bg-white p-5 shadow-card transition-all duration-500 hover:-translate-y-0.5 hover:shadow-soft"
                    >
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                        <LuPhone className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-ink/45">Call</span>
                        <span className="mt-1 block text-[15px] font-medium text-ink">{org.phone}</span>
                      </span>
                    </a>
                  )}
                  {org.email && (
                    <a
                      href={`mailto:${org.email}`}
                      className="flex flex-1 items-center gap-4 rounded-3xl border border-black/[0.06] bg-white p-5 shadow-card transition-all duration-500 hover:-translate-y-0.5 hover:shadow-soft"
                    >
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                        <LuMail className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-ink/45">Email</span>
                        <span className="mt-1 block truncate text-[15px] font-medium text-ink">{org.email}</span>
                      </span>
                    </a>
                  )}
                </div>
              </Reveal>
            )}
          </div>
        </div>

        {/* right — map */}
        <Reveal delay={0.1} className="min-h-[420px]">
          <div className="relative h-full min-h-[420px] overflow-hidden rounded-[2rem] shadow-soft ring-1 ring-black/[0.06]">
            <iframe
              title={contact.mapTitle}
              src={contact.mapEmbed}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
            <div className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-white/60 bg-white/85 px-4 py-2 text-xs font-semibold text-ink/75 shadow-card backdrop-blur">
              {org.address.line1}, {org.address.line2}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
