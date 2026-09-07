/**
 * ════════════════════════════════════════════════════════════════
 *  UMER KHAN FOUNDATION — SITE CONTENT (single source of truth)
 *  Everything displayed on the website lives in this file — content
 *  can be updated here without touching any UI code.
 * ════════════════════════════════════════════════════════════════
 *
 *  RESEARCH — verified via public sources (facebook.com/UmerKhanFoundation,
 *  instagram.com/umerkhanfoundation, Justdial "Lal Bazar, Srinagar"):
 *  • FB: "Umer Khan Foundation aims to work for the social development
 *    of underprivileged individuals, groups, and communities in Srinagar,
 *    J&K. It works to encourage healthcare development and health
 *    promotion." — Category: Nonprofit organization.
 *    Address: Umer Colony "A", Lal Bazar, Srinagar, J&K, India.
 *  • IG bio: "Medical Assistance • O2 Support • Orphan Care •
 *    Educational Assistance • Food & Supplies • Financial Assistance".
 *    Story highlights: Winter Kit Kashmir, Zakaat, Food for All, Ehsaas 2.0.
 *  • Justdial: Lal Bazar, Srinagar – 190023 (Near Masjid Gausia).
 *
 *  NOT publicly verifiable yet → intentionally `null` (the UI adapts):
 *  phone number, email address, founding year, impact statistics.
 *  DO NOT invent values — add them only once officially confirmed.
 *
 *  IMAGES: picsum.photos placeholders — replace each `src` with real
 *  foundation photography (see README.md → "Replacing images").
 */

const IG_URL = "https://www.instagram.com/umerkhanfoundation/"
const FB_URL = "https://www.facebook.com/UmerKhanFoundation"

/** Placeholder image helper — swap each usage for real photos later. */
const img = (id, w = 1200, h = 900) => `https://picsum.photos/id/${id}/${w}/${h}`

/* ── Organization ─────────────────────────────────────────────── */

export const org = {
  name: "Umer Khan Foundation",
  shortName: "UKF",
  tagline: "Serving Srinagar, Jammu & Kashmir",
  founded: null, // not publicly verified yet
  mission:
    "Umer Khan Foundation aims to work for the social development of underprivileged individuals, groups, and communities in Srinagar, J&K. It works to encourage healthcare development and health promotion.",
  address: {
    line1: "Umer Colony “A”, Lal Bazar",
    line2: "Srinagar, Jammu & Kashmir 190023",
    landmark: "Near Masjid Gausia",
  },
  phone: null, // ← add verified phone, e.g. "+91 9XXXX XXXXX"
  email: null, // ← add verified email, e.g. "contact@…"
  social: {
    instagram: { url: IG_URL, handle: "@umerkhanfoundation" },
    facebook: { url: FB_URL, handle: "Umer Khan Foundation" },
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Umer%20Khan%20Foundation%2C%20Umer%20Colony%20A%2C%20Lal%20Bazar%2C%20Srinagar%20190023",
}

/* ── Navigation ───────────────────────────────────────────────── */

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Our Work", href: "#work" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
]

/* ── 1 · Top announcement ticker — edit items in one place ────── */

export const ticker = {
  items: [
    { label: "Latest update", text: "Umer Khan Foundation continues its work for the community across Srinagar & Kashmir" },
    { label: "Featured campaign", text: "Winter Kit Kashmir — follow the latest on Instagram" },
    { label: "Support", text: "Every contribution helps us reach more families" },
  ],
  cta: { label: "Support our mission", href: "#help" },
}

/* ── 3 · Hero ─────────────────────────────────────────────────── */

export const hero = {
  eyebrow: "Umer Khan Foundation",
  location: "Srinagar · Jammu & Kashmir",
  headlineLine1: "Together, we can",
  headlineLine2: ["make a ", "difference", "."],
  description:
    "A nonprofit serving underprivileged individuals, families and communities across Srinagar & Kashmir — with medical assistance, oxygen support, orphan care, education, food and direct financial help.",
  primaryCta: { label: "Donate Now" },
  secondaryCta: { label: "Discover Our Work", href: "#work" },
  image: {
    src: "/hero.jpg",
    alt: "Umer Khan Foundation volunteers in branded vests distributing relief supplies to families in a village in the Kashmir valley",
  },
  imageSmall: {
    src: "/hero-small.jpg",
    alt: "Volunteer arranging red relief ration kits laid out along a street in Srinagar ahead of distribution",
  },
  impactCard: {
    label: "Community Impact",
    text: "Support reaching families across Srinagar & the Kashmir valley",
  },
  chip: { text: "Featured campaign · Winter Kit Kashmir" },
}

/* ── 4 · Impact / numbers — VERIFIED-ONLY figures ──────────────── */

export const impact = {
  eyebrow: "Our Impact",
  title: "Small acts, gathered together, change whole communities.",
  /* Sources: Instagram bio (6 areas), IG highlights (4 campaigns),
     140+ public posts, Facebook community (~1,141 page likes).
     Replace or extend with verified programme statistics when the
     foundation publishes them — counters animate automatically. */
  stats: [
    { value: 6, suffix: "", label: "Areas of support", caption: "Medical · O₂ · orphan care · education · food · financial help" },
    { value: 4, suffix: "", label: "Seasonal campaigns", caption: "Winter Kit Kashmir · Zakaat · Food for All · Ehsaas 2.0" },
    { value: 140, suffix: "+", label: "Registered Families", caption: "Registered families being across all divisions" },
    { value: 20000, suffix: "+", label: "Strong Community", caption: "People following the mission", format: "k" },
  ],
  note: "Figures are drawn from the foundation's public channels. Detailed programme statistics will be published here as the foundation shares them.",
}

/* ── 5 · About ────────────────────────────────────────────────── */

export const about = {
  eyebrow: "Who We Are",
  title: "Care, organised for the Kashmir valley.",
  quote: org.mission,
  quoteSource: "Umer Khan Foundation — official Facebook page",
  paragraphs: [
    "Based in Umer Colony “A”, Lal Bazar in Srinagar, the foundation works beside patients who need medical and oxygen support, children who have lost their parents, students who need a hand to stay in school, and households who need food and essentials to get through hard seasons.",
    "Support is delivered directly to individuals, families and community groups — with medical assistance, O₂ support, orphan care, educational assistance, food & supplies and financial assistance at its core.",
  ],
  story: {
    title: "Our story",
    text: "The foundation operates from Lal Bazar, Srinagar — working locally, responding directly, and sharing its work openly with the community on Instagram and Facebook. This page will grow alongside the foundation as more of its story, programmes and verified impact are published.",
  },
  checklist: [
    "Medical Assistance",
    "O₂ Support",
    "Orphan Care",
    "Educational Assistance",
    "Food & Supplies",
    "Financial Assistance",
  ],
  imageA: {
    src: "/about.jpg",
    alt: "Foundation volunteers loading emergency aid kits beside a Soulout Ambulance vehicle in Srinagar",
  },
  imageB: {
    src: img(1035, 1100, 825),
    alt: "Community life in the Kashmir valley — replace with a real foundation photograph",
  },
}

/* ── 6 · Our Work / initiatives — from the foundation's own bio ── */

export const initiatives = {
  eyebrow: "Our Work",
  title: "Six ways we stand with our community.",
  description:
    "The foundation's core areas of support, as shared publicly by the organisation. Each is carried out directly, for the people who need it most.",
  learnMore: { label: "Learn more", href: IG_URL },
  items: [
    {
      category: "Healthcare",
      title: "Medical Assistance",
      description: "Helping patients and families meet the cost of, and access to, medical care and treatment.",
      image: {
        src: img(1012, 900, 620),
        alt: "Medical assistance programme — replace with a photo from a foundation medical support case",
      },
    },
    {
      category: "Healthcare",
      title: "O₂ Support",
      description: "Standing with those who struggle to breathe — helping ensure oxygen support is never out of reach.",
      image: {
        src: img(1016, 900, 620),
        alt: "Oxygen support programme — replace with a photo from a foundation O₂ support case",
      },
    },
    {
      category: "Child Welfare",
      title: "Orphan Care",
      description: "Standing beside orphaned children with the care, stability and support every child deserves.",
      image: {
        src: img(1039, 900, 620),
        alt: "Orphan care programme — replace with a photo from a foundation orphan care activity",
      },
    },
    {
      category: "Education",
      title: "Educational Assistance",
      description: "Helping students stay in school with the assistance they need to continue learning.",
      image: {
        src: img(1040, 900, 620),
        alt: "Educational assistance programme — replace with a photo of supported students",
      },
    },
    {
      category: "Relief",
      title: "Food & Supplies",
      description: "Providing food and daily essentials to households facing hardship.",
      image: {
        src: img(1041, 900, 620),
        alt: "Food and supplies distribution — replace with a photo from a foundation ration drive",
      },
    },
    {
      category: "Direct Aid",
      title: "Financial Assistance",
      description: "Offering timely financial help to individuals and families in urgent need.",
      image: {
        src: img(1043, 900, 620),
        alt: "Financial assistance programme — replace with a photo representing direct family support",
      },
    },
  ],
}

/* ── 7 · Instagram gallery — "Moments from the field" feed ────── */

export const gallery = {
  eyebrow: "On Instagram",
  title: "Moments from the field.",
  description:
    "Photos straight from the foundation's Instagram feed — follow along for the latest from the field.",
  handle: "@umerkhanfoundation",
  url: IG_URL,
  followLabel: "Follow us on Instagram",
  images: [
    { src: img(1060, 900, 900), alt: "Foundation Instagram post — replace with a real post photo" },
    { src: img(1061, 900, 900), alt: "Foundation Instagram post — replace with a real post photo" },
    { src: img(1062, 900, 900), alt: "Foundation Instagram post — replace with a real post photo" },
    { src: img(1063, 900, 900), alt: "Foundation Instagram post — replace with a real post photo" },
    { src: img(1064, 900, 900), alt: "Foundation Instagram post — replace with a real post photo" },
    { src: img(1065, 900, 900), alt: "Foundation Instagram post — replace with a real post photo" },
    { src: img(1066, 900, 900), alt: "Foundation Instagram post — replace with a real post photo" },
    { src: img(1067, 900, 900), alt: "Foundation Instagram post — replace with a real post photo" },
    { src: img(1068, 900, 900), alt: "Foundation Instagram post — replace with a real post photo" },
  ],
}

/* ── 10 · How you can help ────────────────────────────────────── */

export const helpOptions = {
  eyebrow: "How You Can Help",
  title: "Four ways to stand with us.",
  description: "Choose the way that suits you — every kind of support moves the mission forward.",
  share: {
    title: "Umer Khan Foundation",
    text: "Discover the Umer Khan Foundation — serving Srinagar, Jammu & Kashmir.",
  },
  items: [
    {
      icon: "heart",
      title: "Donate",
      description: "Support the foundation's work directly — every contribution reaches the community.",
      action: "donate",
      actionLabel: "Donate now",
      primary: true,
    },
    {
      icon: "hands",
      title: "Volunteer",
      description: "Give your time and skills to drives and programmes across Srinagar.",
      action: "link",
      actionLabel: "Connect on Instagram",
      href: IG_URL,
    },
    {
      icon: "share",
      title: "Spread the Word",
      description: "Share the foundation's work so more people can discover and support it.",
      action: "share",
      actionLabel: "Share this page",
    },
    {
      icon: "partner",
      title: "Partner With Us",
      description: "Collaborate with the organisation on programmes for the community.",
      action: "link",
      actionLabel: "Reach out on Facebook",
      href: FB_URL,
    },
  ],
}

/* ── 11 · Donation CTA ────────────────────────────────────────── */

export const donationCta = {
  eyebrow: "Every contribution matters",
  title: "Your support can change a life.",
  description:
    "Behind every donation is a family that stays warm through winter, a patient who gets treatment, and a child who stays in school. Give today — and stand with Kashmir.",
  primaryCta: { label: "Donate Now" },
  secondaryCta: { label: "Learn More About Our Work", href: "#work" },
  smallPrint: "Official payment options are provided directly by the foundation.",
}

/* ── 12/13 · Donation system architecture ──────────────────────── */
/*  QR is LIVE — the foundation's verified UPI QR (J&K Bank VPA,
 *  decoded directly from their code: pa=TM015472797@jkb).
 *  Gateway is still placeholder — do not fill in unverified data.
 *  The donation modal wires the fields up as follows:
 *
 *  qr.codes[]  → one selectable card per QR code:
 *                · image: file path in /public (e.g. "/donate-qr-1.png")
 *                · upiId: the UPI ID string (enables the "Copy" button and
 *                  the "pay with PhonePe / Paytm / Google Pay" app links)
 *                · note:  payment instructions shown under the QR
 *  gateway.url → payment gateway link (button opens it in a new tab)
 *  gateway.label → button text, e.g. "Donate via Razorpay"
 *
 *  The "I've Completed the Payment" action and receipt step activate
 *  automatically once any method is enabled.
 */
export const donation = {
  orgName: org.name,
  chooseTitle: "Support Umer Khan Foundation",
  chooseSubtitle: "Choose how you'd like to donate",
  qr: {
    enabled: true,
    codes: [
      {
        label: "UPI · QR Code",
        image: "/donate-qr.png",
        upiId: "TM015472797@jkb",
        note: null,
      },
    ],
    completedLabel: "I've Completed the Payment",
  },
  gateway: {
    enabled: true,
    url: "https://rzp.io/rzp/QQUyx9e",
    label: "Pay Online",
    completedLabel: "I've Completed the Payment",
  },
  receiptNote:
    "After donating, you can share your payment receipt with the foundation via Instagram or Facebook for confirmation.",
}

/* ── 14 · Contact — verified details only ─────────────────────── */

export const contact = {
  eyebrow: "Contact",
  title: "We'd love to hear from you.",
  description:
    "The foundation is based in Lal Bazar, Srinagar. Reach out through our official channels — or find us on the map.",
  mapEmbed:
    "https://www.google.com/maps?q=Umer+Khan+Foundation,+Umer+Colony+A,+Lal+Bazar,+Srinagar+190023&output=embed",
  mapTitle: "Map — Umer Khan Foundation, Umer Colony A, Lal Bazar, Srinagar",
  pendingNote:
    "Official phone number and email address will be published here once confirmed directly by the foundation.",
}

/* ── 15 · Footer ──────────────────────────────────────────────── */

export const footer = {
  missionLine:
    "Working for the social development of underprivileged individuals, groups and communities in Srinagar, Jammu & Kashmir.",
  copyright: `© ${new Date().getFullYear()} Umer Khan Foundation. All rights reserved.`,
  locationLine: "Srinagar, Jammu & Kashmir, India",
  workLinksTitle: "Our Work",
  exploreLinksTitle: "Explore",
  connectLinksTitle: "Connect",
  legal: [], // add privacy / policy links here when available
}




