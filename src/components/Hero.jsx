import { motion, useReducedMotion } from "framer-motion"
import { LuArrowDown, LuHeart } from "react-icons/lu"
import { hero, org } from "../data/content"
import { useDonation } from "../context/DonationContext"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const { openDonation } = useDonation()
  const reduce = useReducedMotion()

  return (
    <section id="home" className="relative scroll-mt-24 overflow-hidden">
      {/* soft, green-tinted background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-mist via-white to-white" />
        <div className="absolute -top-40 right-[-12%] h-[520px] w-[520px] rounded-full bg-brand-100/60 blur-3xl" />
        <div className="absolute left-[-14%] top-64 h-[460px] w-[460px] rounded-full bg-brand-50 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 pb-24 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-32 lg:pt-24">
        {/* LEFT — copy */}
        <motion.div variants={container} initial={reduce ? undefined : "hidden"} animate="show">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full border border-brand-200/80 bg-white/70 px-4 py-1.5 backdrop-blur"
          >
            <span className="soft-pulse inline-block h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-700">{hero.eyebrow}</span>
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-ink/40 sm:inline">
              · {hero.location}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-7 font-display text-[2.85rem] font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl xl:text-7xl"
          >
            {hero.headlineLine1}
            <br />
            {hero.headlineLine2[0]}
            <em className="italic text-brand-600">{hero.headlineLine2[1]}</em>
            {hero.headlineLine2[2]}
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg">
            {hero.description}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={openDonation}
              className="group inline-flex items-center gap-2.5 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-soft sm:text-base"
            >
              <LuHeart
                className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
              {hero.primaryCta.label}
            </button>
            <a
              href={hero.secondaryCta.href}
              className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-7 py-3.5 text-sm font-semibold text-ink backdrop-blur transition-all duration-300 hover:border-brand-300 hover:text-brand-700 sm:text-base"
            >
              {hero.secondaryCta.label}
              <LuArrowDown
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink/50">
            <span className="font-medium text-ink/70">{org.tagline}</span>
            <a
              href={org.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-ink/60 transition-colors hover:text-brand-700"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden="true" />
              {org.social.instagram.handle}
            </a>
            <a
              href={org.social.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-ink/60 transition-colors hover:text-brand-700"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden="true" />
              Facebook
            </a>
          </motion.div>
        </motion.div>


          {/* RIGHT — image composition */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[540px]"
          >
            <div className="overflow-hidden rounded-[2.25rem] shadow-lift ring-1 ring-black/5">
              <img
                src={hero.image.src}
                alt={hero.image.alt}
                width={1100}
                height={1375}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>

            {/* small overlapping photo */}
            <motion.div
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-7 -left-5 hidden w-40 overflow-hidden rounded-2xl shadow-card ring-4 ring-white sm:block lg:-left-12 lg:w-48"
            >
              <img
                src={hero.imageSmall.src}
                alt={hero.imageSmall.alt}
                width={520}
                height={660}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
            </motion.div>

            {/* floating glass impact card */}
            <motion.div
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="absolute -right-3 -top-5 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-soft backdrop-blur-xl sm:-right-8 sm:p-5"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-600">
                {hero.impactCard.label}
              </p>
              <p className="mt-1.5 max-w-[190px] text-[13px] font-medium leading-snug text-ink/85">
                {hero.impactCard.text}
              </p>
            </motion.div>

            {/* featured campaign chip */}
            <motion.div
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
              className="absolute -bottom-5 right-5 flex items-center gap-2 rounded-full bg-brand-950/90 py-2.5 pl-4 pr-5 text-white shadow-card backdrop-blur"
            >
              <span className="soft-pulse inline-block h-1.5 w-1.5 rounded-full bg-brand-300" aria-hidden="true" />
              <span className="text-[11px] font-semibold tracking-wide sm:text-xs">{hero.chip.text}</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    )
  }

