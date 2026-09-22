import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  LuArrowLeft,
  LuArrowUpRight,
  LuCheck,
  LuChevronRight,
  LuCopy,
  LuCreditCard,
  LuExternalLink,
  LuInfo,
  LuQrCode,
  LuSmartphone,
  LuX,
} from "react-icons/lu"
import { SiGooglepay, SiPaytm, SiPhonepe } from "react-icons/si"
import { LogoMark } from "./ui/Logo"
import { donation, org } from "../data/content"
import { useDonation } from "../context/DonationContext"

const STEPS = {
  choose: "Choose a method",
  qr: "Scan a QR code",
  online: "Pay online",
  done: "Thank you",
}

/* UPI intent deep links — open the payer's installed app with the payee
   pre-filled; the amount is entered inside the app. Only apps that publish
   a direct payment scheme get their own button; every other UPI app in
   India (Amazon Pay, CRED, bank apps, …) is reached through the generic
   `upi://pay` chooser, which lists all installed UPI apps. */
const UPI_APPS = [
  { name: "PhonePe", scheme: "phonepe://pay", Icon: SiPhonepe, bg: "bg-[#5f259f]", fg: "text-white" },
  { name: "Google Pay", scheme: "tez://upi/pay", Icon: SiGooglepay, bg: "bg-white", fg: "text-[#4285F4]", border: "border border-black/[0.08]" },
  { name: "Paytm", scheme: "paytmmp://pay", Icon: SiPaytm, bg: "bg-[#002970]", fg: "text-white" },
  { name: "BHIM", scheme: "bhim://pay", Icon: LuSmartphone, bg: "bg-[#00529a]", fg: "text-white" },
]

const upiAppHref = (scheme, upiId) =>
  `${scheme}?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(donation.orgName)}&cu=INR&tn=${encodeURIComponent("Donation")}`

/**
 * Premium donation sheet — Apple-style payment experience.
 * Desktop: centered modal · Mobile: bottom sheet.
 *
 * Payment methods are driven entirely by data/content.js → `donation`.
 * Until the foundation supplies verified QR codes / gateway details,
 * honest placeholder states are shown (never fake payment info).
 * Includes focus trap, Escape-to-close, scroll lock & focus restore.
 */
export default function DonationModal() {
  const { isOpen, closeDonation } = useDonation()
  const [step, setStep] = useState("choose")
  const [activeQr, setActiveQr] = useState(0)
  const [copied, setCopied] = useState(false)
  const [upiFail, setUpiFail] = useState(null)
  const [pendingMethod, setPendingMethod] = useState(null)
  const panelRef = useRef(null)
  const reduce = useReducedMotion()

  /* reset the flow each time the sheet opens */
  useEffect(() => {
    if (isOpen) {
      setStep("choose")
      setActiveQr(0)
      setCopied(false)
      setUpiFail(null)
      setPendingMethod(null)
    }
  }, [isOpen])

  /* Auto-detect the payer returning from the UPI app or payment tab and transition to thank you */
  useEffect(() => {
    if (!pendingMethod || step === "done") return undefined
    let left = false
    const onVis = () => {
      if (document.hidden) {
        left = true
      } else if (left) {
        setStep("done")
      }
    }
    document.addEventListener("visibilitychange", onVis)
    return () => document.removeEventListener("visibilitychange", onVis)
  }, [pendingMethod, step])

  /* focus trap + escape + scroll lock + focus restore */
  useEffect(() => {
    if (!isOpen) return undefined
    const previous = document.activeElement
    document.body.style.overflow = "hidden"

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [],
      )

    const t = setTimeout(() => focusables()[0]?.focus(), 80)

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault()
        closeDonation()
      }
      if (e.key === "Tab") {
        const els = focusables()
        if (!els.length) return
        const first = els[0]
        const last = els[els.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener("keydown", onKey)
    return () => {
      clearTimeout(t)
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
      if (previous && typeof previous.focus === "function") {
        previous.focus()
      }
    }
  }, [isOpen, closeDonation])

  const copyUpiId = (upiId) => {
    navigator.clipboard
      .writeText(upiId)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2200)
      })
      .catch(() => {})
  }

  const attemptUpi = (name) => () => {
    setUpiFail(null)
    setPendingMethod(name || "UPI")
    let opened = false
    const mark = () => {
      opened = true
    }
    const onVis = () => {
      if (document.hidden) mark()
    }
    const onGone = () => mark()
    document.addEventListener("visibilitychange", onVis)
    window.addEventListener("pagehide", onGone)
    window.addEventListener("blur", onGone)
    setTimeout(() => {
      document.removeEventListener("visibilitychange", onVis)
      window.removeEventListener("pagehide", onGone)
      window.removeEventListener("blur", onGone)
      if (!opened) setUpiFail(name)
    }, 2000)
  }

  const qrConfig = donation.qr.codes?.[activeQr] ?? donation.qr.codes?.[0]
  const qrReady = donation.qr.enabled && qrConfig?.image

  const gatewayReady = donation.gateway.enabled && donation.gateway.url

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="donation-title"
        >
          <motion.div
            className="absolute inset-0 bg-brand-950/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDonation}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            initial={reduce ? false : { y: 80, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { y: 60, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-lift sm:max-w-md sm:rounded-[2rem]"
          >
            {/* header */}
            <div className="flex items-start justify-between gap-4 px-6 pb-3 pt-6">
              <div className="flex items-center gap-3.5">
                <LogoMark className="h-11 w-auto shrink-0" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-600">{STEPS[step]}</p>
                  <h2
                    id="donation-title"
                    className="mt-0.5 font-display text-[22px] font-medium leading-tight tracking-tight text-ink"
                  >
                    {donation.chooseTitle}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={closeDonation}
                aria-label="Close donation dialog"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-black/5 hover:text-ink"
              >
                <LuX className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {step !== "choose" && step !== "done" && (
              <div className="px-6">
                <button
                  type="button"
                  onClick={() => {
                    setUpiFail(null)
                    setStep("choose")
                  }}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink/55 transition-colors hover:text-brand-700"
                >
                  <LuArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  Back to methods
                </button>
              </div>
            )}

            {/* body */}
            <div className="flex-1 overflow-y-auto px-6 pb-2 pt-4">
              {step === "choose" && (
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-ink/55">{donation.chooseSubtitle}</p>

                  <button
                    type="button"
                    onClick={() => setStep("qr")}
                    className="group flex items-center gap-4 rounded-2xl border border-black/[0.08] bg-white p-4 text-left transition-all duration-300 hover:border-brand-300 hover:bg-brand-50/60 hover:shadow-card"
                  >
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-100">
                      <LuQrCode className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-[15px] font-semibold text-ink">Scan QR Code</span>
                      <span className="mt-0.5 block text-[13px] text-ink/55">Pay using any UPI app</span>
                    </span>
                    <LuChevronRight
                      className="h-5 w-5 text-ink/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-brand-600"
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep("online")}
                    className="group flex items-center gap-4 rounded-2xl border border-black/[0.08] bg-white p-4 text-left transition-all duration-300 hover:border-brand-300 hover:bg-brand-50/60 hover:shadow-card"
                  >
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-100">
                      <LuCreditCard className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-[15px] font-semibold text-ink">Pay Online</span>
                      <span className="mt-0.5 block text-[13px] text-ink/55">Card, netbanking &amp; wallets</span>
                    </span>
                    <LuChevronRight
                      className="h-5 w-5 text-ink/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-brand-600"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              )}

              {step === "qr" && (
                <div className="flex flex-col gap-4">
                  {donation.qr.codes?.length > 1 && (
                    <div className="flex gap-2 rounded-2xl bg-brand-50/70 p-1">
                      {donation.qr.codes.map((c, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveQr(i)}
                          className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all ${
                            activeQr === i
                              ? "bg-white text-brand-800 shadow-card"
                              : "text-ink/60 hover:text-ink"
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {qrReady ? (
                    <>
                      <div className="relative mx-auto flex w-full max-w-[280px] flex-col items-center overflow-hidden rounded-3xl border border-black/[0.08] bg-white p-5 shadow-card">
                        <img
                          src={qrConfig.image}
                          alt={`Official payment QR code for ${donation.orgName}`}
                          className="aspect-square w-full rounded-2xl object-contain"
                          loading="eager"
                        />
                        <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-ink/50">
                          <span className="inline-block h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
                          Official UPI QR · {donation.orgName}
                        </div>
                      </div>

                      {qrConfig.upiId && (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between gap-2 rounded-2xl border border-black/[0.08] bg-mist/60 px-4 py-3">
                            <div className="min-w-0">
                              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">
                                UPI ID
                              </span>
                              <span className="block truncate font-mono text-xs font-semibold text-ink">
                                {qrConfig.upiId}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => copyUpiId(qrConfig.upiId)}
                              aria-label="Copy UPI ID to clipboard"
                              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-800 shadow-sm transition-colors hover:bg-brand-50"
                            >
                              {copied ? (
                                <>
                                  <LuCheck className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <LuCopy className="h-3.5 w-3.5" aria-hidden="true" />
                                  Copy
                                </>
                              )}
                            </button>
                          </div>

                          <div className="my-1 flex items-center gap-3">
                            <div className="h-px flex-1 bg-black/[0.06]" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">
                              or pay directly in app
                            </span>
                            <div className="h-px flex-1 bg-black/[0.06]" />
                          </div>

                          {upiFail && (
                            <p className="rounded-xl border border-amber-500/20 bg-amber-50 px-3.5 py-2.5 text-[12px] leading-relaxed text-amber-900">
                              Could not open {upiFail}. You can still copy the UPI ID above or scan the QR code from inside your UPI app.
                            </p>
                          )}

                          <div className="grid grid-cols-2 gap-3">
                            {UPI_APPS.map(({ name, scheme, Icon, bg, fg, border }) => (
                              <a
                                key={scheme}
                                href={upiAppHref(scheme, qrConfig.upiId)}
                                onClick={attemptUpi(name)}
                                className={`group flex items-center gap-2.5 rounded-2xl px-3.5 py-3 transition-all duration-300 hover:opacity-90 hover:shadow-card ${bg} ${border ?? ""}`}
                              >
                                <Icon
                                  className={`h-6 w-6 shrink-0 ${fg}`}
                                  aria-hidden="true"
                                />
                                <span className={`text-[13px] font-semibold ${fg}`}>{name}</span>
                              </a>
                            ))}
                          </div>
                          <a
                            href={upiAppHref("upi://pay", qrConfig.upiId)}
                            onClick={attemptUpi(null)}
                            className="rounded-full border border-black/10 py-2.5 text-center text-[13px] font-semibold text-ink transition-colors hover:border-brand-300 hover:text-brand-700"
                          >
                            Choose from all UPI apps
                          </a>
                          <p className="text-center text-[11px] leading-snug text-ink/40">
                            Opens your phone's app picker — Amazon Pay, CRED, bank apps and every other UPI app installed on your device.
                          </p>
                        </div>
                      )}
                      {qrConfig.note && <p className="text-[13px] leading-relaxed text-ink/55">{qrConfig.note}</p>}
                      <button
                        type="button"
                        onClick={() => {
                          setPendingMethod("UPI · QR code")
                          setStep("done")
                        }}
                        className="mt-1 w-full rounded-full bg-brand-600 py-3.5 text-sm font-semibold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-700"
                      >
                        {donation.qr.completedLabel}
                      </button>
                    </>
                  ) : (
                    <div className="rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50/50 px-6 py-10 text-center">
                      <LuQrCode className="mx-auto h-10 w-10 text-brand-300" aria-hidden="true" />
                      <p className="mx-auto mt-4 max-w-[260px] text-[13px] leading-relaxed text-ink/55">
                        The official donation QR code will appear here — it will be added once the foundation
                        provides its verified payment QR.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {step === "online" && (
                <div className="flex flex-col gap-4">
                  {gatewayReady ? (
                    <>
                      <a
                        href={donation.gateway.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setPendingMethod("Pay Online · Razorpay")}
                        className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-brand-600 py-3.5 text-sm font-semibold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-700"
                      >
                        <LuCreditCard className="h-4 w-4" aria-hidden="true" />
                        {donation.gateway.label}
                        <LuExternalLink className="h-4 w-4 opacity-60" aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setPendingMethod("Pay Online · Razorpay")
                          setStep("done")
                        }}
                        className="w-full rounded-full border border-black/10 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-brand-300 hover:text-brand-700"
                      >
                        {donation.gateway.completedLabel}
                      </button>
                    </>
                  ) : (
                    <div className="rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50/50 px-6 py-10 text-center">
                      <LuCreditCard className="mx-auto h-10 w-10 text-brand-300" aria-hidden="true" />
                      <p className="mx-auto mt-4 max-w-[270px] text-[13px] leading-relaxed text-ink/55">
                        The online payment gateway is being set up — card, netbanking and wallet donations will be
                        available here once the foundation connects its official gateway.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {step === "done" && (
                <div className="flex flex-col items-center py-6 text-center">
                  <motion.span
                    initial={reduce ? false : { scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700"
                  >
                    <LuCheck className="h-8 w-8" aria-hidden="true" />
                  </motion.span>
                  <h3 className="mt-5 font-display text-2xl font-medium tracking-tight text-ink">
                    Thank you for your support
                  </h3>
                  <p className="mt-2 max-w-[300px] text-sm leading-relaxed text-ink/55">
                    Your contribution helps the foundation reach more families across Srinagar &amp; Kashmir.
                  </p>
                  <a
                    href={org.social.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand-300 hover:text-brand-700"
                  >
                    Follow us on Instagram
                    <LuArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={closeDonation}
                    className="mt-3 rounded-full px-5 py-2.5 text-sm font-semibold text-ink/55 transition-colors hover:text-ink"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            {/* footer */}
            <div className="flex items-center gap-2 border-t border-black/[0.06] px-6 py-4">
              <LuInfo className="h-3.5 w-3.5 shrink-0 text-ink/35" aria-hidden="true" />
              <p className="text-[11px] leading-snug text-ink/45">
                Official payment details are published directly by {donation.orgName}.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
