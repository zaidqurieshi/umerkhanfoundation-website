import { toBlob } from "html-to-image"

/**
 * Clean WhatsApp icon SVG component.
 */
export function WhatsAppIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

/**
 * Captures an element as an image, copies it to clipboard, and shares via WhatsApp.
 * Supports both mobile (native file share sheet) and desktop (copies image to clipboard + opens WhatsApp Web).
 */
export async function shareElementViaWhatsApp({
  element,
  fileName = "ukf-details.png",
  title = "Umer Khan Foundation",
  text = "",
}) {
  if (!element) return { success: false, error: "No element provided" }

  let blob = null
  const captureOptions = {
    pixelRatio: 2,
    backgroundColor: "#ffffff",
    style: {
      transform: "none",
    },
    filter: (node) => {
      // Exclude elements marked to be ignored in screenshots (e.g. the share button itself)
      if (node?.dataset?.ignoreScreenshot === "true") return false
      return true
    },
  }

  // Attempt 1: Standard high-res capture
  try {
    blob = await toBlob(element, captureOptions)
  } catch (err) {
    console.warn("Capture attempt 1 failed, retrying without external fonts:", err)
    // Attempt 2: Retry with skipFonts in case external @font-face rules block SVG foreignObject
    try {
      blob = await toBlob(element, { ...captureOptions, skipFonts: true })
    } catch (err2) {
      console.warn("Capture attempt 2 failed:", err2)
    }
  }

  let copied = false

  // 1. Copy image to clipboard if blob was generated (supported in modern Chrome, Edge, Safari, Firefox)
  if (blob && typeof navigator !== "undefined" && navigator.clipboard?.write) {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ])
      copied = true
    } catch (clipboardErr) {
      console.warn("Clipboard write image failed:", clipboardErr)
    }
  }

  // 2. If browser supports native Web Share API with files (iOS Safari, Android Chrome, mobile devices)
  if (blob && typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      const file = new File([blob], fileName, { type: "image/png" })
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title,
          text,
        })
        return { success: true, copied, method: "native-share" }
      }
    } catch (shareErr) {
      if (shareErr.name === "AbortError") {
        // User dismissed native share sheet
        return { success: true, copied, method: "cancelled" }
      }
      console.warn("Native file share failed, falling back to WhatsApp link:", shareErr)
    }
  }

  // 3. Desktop / Web fallback:
  // Open WhatsApp with pre-filled text.
  // The screenshot image is already in the clipboard, ready to paste with Ctrl+V.
  const encodedText = encodeURIComponent(text)
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`
  window.open(whatsappUrl, "_blank", "noopener,noreferrer")

  return { success: true, copied, method: "whatsapp-link" }
}
