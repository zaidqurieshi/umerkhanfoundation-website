import { createContext, useCallback, useContext, useMemo, useState } from "react"

/**
 * Global state for the donation modal — any component (navbar, hero,
 * CTA sections, mobile sticky button) can open the donation sheet.
 */
const DonationContext = createContext(null)

export function DonationProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const openDonation = useCallback(() => setIsOpen(true), [])
  const closeDonation = useCallback(() => setIsOpen(false), [])

  const value = useMemo(() => ({ isOpen, openDonation, closeDonation }), [isOpen, openDonation, closeDonation])

  return <DonationContext.Provider value={value}>{children}</DonationContext.Provider>
}

export function useDonation() {
  const ctx = useContext(DonationContext)
  if (!ctx) throw new Error("useDonation must be used within a DonationProvider")
  return ctx
}
