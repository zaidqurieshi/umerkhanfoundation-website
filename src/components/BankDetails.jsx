import { useState, useRef } from "react"
import { LuCheck, LuCopy, LuShieldCheck, LuBuilding } from "react-icons/lu"
import SectionHeading from "./ui/SectionHeading"
import Reveal from "./ui/Reveal"
import { bankDetails } from "../data/content"
import { WhatsAppIcon, shareElementViaWhatsApp } from "../utils/shareCard"

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {})
  }

  return (
    <div className="flex items-center justify-between py-2.5 border-b border-black/[0.06] last:border-b-0 gap-3">
      <span className="text-xs sm:text-sm font-medium text-ink/55 shrink-0">{label}:</span>
      <div className="flex items-center gap-2 min-w-0">
        <span className="font-mono text-sm sm:text-base font-semibold text-ink tracking-tight truncate select-all">
          {value}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200 shrink-0 cursor-pointer ${
            copied
              ? "bg-brand-600 text-white shadow-xs"
              : "bg-black/[0.04] hover:bg-black/[0.08] text-ink/75 hover:text-ink"
          }`}
          title={`Copy ${label}`}
          aria-label={`Copy ${label}`}
        >
          {copied ? (
            <>
              <LuCheck className="w-3.5 h-3.5 text-white" aria-hidden="true" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <LuCopy className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden xs:inline">Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function AccountCard({ account }) {
  const cardRef = useRef(null)
  const [sharing, setSharing] = useState(false)
  const [shareStatus, setShareStatus] = useState("")

  const handleShare = async () => {
    if (!cardRef.current || sharing) return
    setSharing(true)
    setShareStatus("")

    const text =
      `*Umer Khan Foundation*\nBank Details for ${account.type}:\n\n` +
      `• Bank: ${account.bankName}\n` +
      `• Branch: ${account.branch}\n` +
      `• A/C Name: ${account.accountName}\n` +
      `• A/C No: ${account.accountNumber}\n` +
      `• IFSC Code: ${account.ifscCode}\n\n` +
      `Transfer via NEFT / RTGS / IMPS / mPay\n` +
      `Official Account · ${account.badge}\n` +
      `https://umerkhanfoundation.com/#bank-details`

    try {
      const result = await shareElementViaWhatsApp({
        element: cardRef.current,
        fileName: `${account.type.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-ukf.png`,
        title: `Umer Khan Foundation - ${account.type}`,
        text,
      })

      if (result.method === "whatsapp-link" || result.copied) {
        setShareStatus("Copied! Opening WhatsApp...")
      } else if (result.method === "native-share") {
        setShareStatus("Shared!")
      }
    } catch (err) {
      console.error("Failed to share bank details:", err)
      setShareStatus("Failed to share")
    } finally {
      setSharing(false)
      setTimeout(() => setShareStatus(""), 3500)
    }
  }

  return (
    <div className="h-full flex flex-col justify-between">
      {/* Captured visual card — exact replica of reference image */}
      <div
        ref={cardRef}
        className="flex-1 flex flex-col rounded-3xl border border-black/[0.08] bg-white shadow-card hover:shadow-soft transition-all duration-500 overflow-hidden group"
      >
        {/* Top header — light background with centered bank logo */}
        <div className="bg-[#f2f4f6] border-b border-black/[0.06] py-5 px-6 sm:py-6 sm:px-8 flex items-center justify-center min-h-[90px] sm:min-h-[110px]">
          <img
            src={account.logo}
            alt={account.bankName}
            crossOrigin="anonymous"
            className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Bottom content — details */}
        <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            {/* Header: Account type + Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between items-start gap-3 sm:gap-4 mb-5">
              <div className="min-w-0 flex flex-col">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-ink tracking-tight leading-snug whitespace-nowrap block">
                  {account.type}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-brand-700 mt-1 leading-normal whitespace-nowrap block">
                  {account.bankName}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-50 text-brand-800 border border-brand-200/60 shrink-0 self-start sm:self-auto">
                <LuShieldCheck className="w-3.5 h-3.5 text-brand-600 shrink-0" aria-hidden="true" />
                <span className="whitespace-nowrap">{account.badge}</span>
              </span>
            </div>

            {/* Account fields */}
            <div className="space-y-1 bg-black/[0.02] rounded-2xl p-4 border border-black/[0.04]">
              <div className="flex items-center justify-between py-2.5 border-b border-black/[0.06] gap-3">
                <span className="text-xs sm:text-sm font-medium text-ink/55 shrink-0">Bank:</span>
                <span className="text-xs sm:text-sm font-semibold text-ink text-right shrink-0 leading-normal">
                  {account.bankName}
                </span>
              </div>

              <div className="flex items-center justify-between py-2.5 border-b border-black/[0.06] gap-3">
                <span className="text-xs sm:text-sm font-medium text-ink/55 shrink-0">Branch:</span>
                <span className="text-xs sm:text-sm font-semibold text-ink text-right min-w-0 leading-normal">
                  {account.branch}
                </span>
              </div>

              <div className="flex items-center justify-between py-2.5 border-b border-black/[0.06] gap-3">
                <span className="text-xs sm:text-sm font-medium text-ink/55 shrink-0">A/C Name:</span>
                <span className="text-xs sm:text-sm font-bold text-ink text-right min-w-0 leading-normal">
                  {account.accountName}
                </span>
              </div>

              <CopyField label="A/C No" value={account.accountNumber} />
              <CopyField label="IFSC Code" value={account.ifscCode} />
            </div>
          </div>

          {/* Footnote instruction */}
          <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs text-ink/50">
            <span>Transfer via NEFT / RTGS / IMPS / mPay</span>
            <span className="font-semibold text-brand-700">Official Account</span>
          </div>
        </div>
      </div>

      {/* Share via WhatsApp action button */}
      <div className="mt-3.5" data-ignore-screenshot="true">
        <button
          type="button"
          onClick={handleShare}
          disabled={sharing}
          aria-label={`Share ${account.type} details via WhatsApp`}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
        >
          <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />
          <span>
            {sharing ? "Capturing card..." : shareStatus || "Share via WhatsApp"}
          </span>
        </button>
      </div>
    </div>
  )
}

export default function BankDetails() {
  return (
    <section
      id="bank-details"
      className="scroll-mt-24 py-10 sm:py-14 lg:py-16 bg-mist"
      aria-labelledby="bank-details-title"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="bank-details-title"
          eyebrow={bankDetails.eyebrow}
          title={bankDetails.title}
          description={bankDetails.description}
          align="center"
          className="sm:mx-auto"
        />

        <div className="mt-8 sm:mt-12 grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {bankDetails.accounts.map((account, i) => (
            <Reveal key={account.type} delay={i * 0.1} className="h-full">
              <AccountCard account={account} />
            </Reveal>
          ))}
        </div>

        {/* Global safety & trust note */}
        <div className="mt-10 max-w-2xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-ink/55 leading-relaxed">
            {bankDetails.note}
          </p>
        </div>
      </div>
    </section>
  )
}
