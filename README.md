# Umer Khan Foundation — Website

A premium, responsive one-page landing site for **Umer Khan Foundation**, a
nonprofit serving Srinagar, Jammu & Kashmir.

**Stack:** React 19 · Vite 7 · Tailwind CSS 4 · Framer Motion 12 · React Icons (Lucide)

---

## Quick start

```bash
npm install        # install dependencies
npm run dev        # start dev server (http://localhost:5173)
npm run build      # production build → dist/
npm run preview    # preview the production build
npm run og         # regenerate public/og-image.png (social share card)
```

---

## Research summary — what's verified vs. pending

All organization facts below were taken from **public sources only**
(Facebook page, Instagram bio/highlights, Justdial listing for Lal Bazar,
Srinagar). Nothing on the site is invented; anything unverifiable is left
empty in `src/data/content.js` and the UI adapts automatically.

**Verified & used on the site**

- Name & category: Umer Khan Foundation — Nonprofit organization
- Address: Umer Colony "A", Lal Bazar, Srinagar, J&K 190023 (Near Masjid Gausia)
- Mission (official Facebook description): *"…aims to work for the social
  development of underprivileged individuals, groups, and communities in
  Srinagar, J&K. It works to encourage healthcare development and health
  promotion."*
- Six areas of support (Instagram bio): Medical Assistance · O₂ Support ·
  Orphan Care · Educational Assistance · Food & Supplies · Financial Assistance
- Four campaigns (Instagram highlights): Winter Kit Kashmir · Zakaat ·
  Food for All · Ehsaas 2.0
- Social: instagram.com/umerkhanfoundation · facebook.com/UmerKhanFoundation

**Not yet public — intentionally empty (fields are `null`)**

- Phone number & email address → Contact section shows an honest
  "coming soon" card; the UI renders them automatically once set.
- Verified impact statistics → the Impact section animates only verifiable
  public figures (6 areas, 4 campaigns, 140+ posts, ~1.1K Facebook
  community) with a clear source note.
- Official logo → a clean typographic mark is used as a stand-in (see below).
- Founding year, payment details → absent until provided.

## Editing content (single source of truth)

Everything on the page lives in **`src/data/content.js`** — text, nav links,
ticker items, initiatives, stories, news, gallery, help options, contact
details, footer. Update that file; no UI changes are ever required.

| What                  | Where in `content.js`                     |
| --------------------- | ----------------------------------------- |
| Ticker announcements  | `ticker.items`                            |
| Hero copy & images    | `hero`                                    |
| Impact numbers        | `impact.stats` (counters animate)         |
| About / mission quote | `about`                                   |
| Programme cards       | `initiatives.items`                       |
| Slider stories        | `stories.items` (add real `date` strings) |
| News / updates        | `news.items` (add real `date` strings)    |
| Contact phone/email   | `org.phone` / `org.email`                 |
| Footer legal links    | `footer.legal`                            |

## Donation system (awaiting real details)

The donation modal is **fully built** but ships in a safe "awaiting details"
state — no fake QR codes, UPI IDs or gateway URLs are shown. When the
foundation provides them, edit `donation` in `content.js`:

```js
qr: {
  enabled: true,                 // ← flips the QR step live
  codes: [                       // one selectable card per QR code
    {
      label: "UPI · QR Code",
      image: "/donate-qr-1.png", // drop the file into /public
      upiId: "name@bank",        // enables the "Copy ID" button
      note: "Scan with any UPI app — GPay, PhonePe, Paytm, BHIM.",
    },
    // add a second QR code here when provided
  ],
},
gateway: {
  enabled: true,                 // ← flips the Pay Online step live
  url: "https://…",              // official gateway link (opens new tab)
  label: "Donate via Razorpay",  // button text
},
```

Setting either flag automatically enables the matching
**"I've Completed the Payment" → thank-you** flow.

## Replacing placeholder images

Every photo is currently a `picsum.photos` placeholder. Replace each
`src` in `src/data/content.js` with the foundation's real photography
(local files in `/public` or optimized remote URLs). Alt text is already
written to match the intended photo — keep it accurate.

## Using the official logo

The logo is a temporary typographic mark (`src/components/ui/Logo.jsx`).
Once the official logo file is available, drop it into `/public` and
replace the `<LogoMark/>` SVG with
`<img src="/logo.png" alt="Umer Khan Foundation" />`.

## SEO & share card

- Title, description, Open Graph/Twitter tags and NGO JSON-LD structured
  data are in `index.html` (only verified data included).
- `public/og-image.png` is a generated brand card (`npm run og`).
  When a real domain exists, make the `og:image`/`twitter:image` URLs absolute.

## Project structure

```
src/
├── data/content.js          ← ALL site content (edit here)
├── context/DonationContext  ← global donate-sheet state
├── components/
│   ├── NewsTicker           ← top announcement marquee
│   ├── Navbar               ← floating glass nav + mobile drawer + progress bar
│   ├── Hero                 ← editorial hero with floating cards
│   ├── ImpactStats          ← dark band, animated verified counters
│   ├── About                ← magazine layout, verified mission quote
│   ├── Initiatives          ← six programme cards
│   ├── StorySlider          ← cinematic autoplay/drag slider
│   ├── LatestNews           ← snap-scrolling update cards
│   ├── InstagramGallery     ← mosaic gallery + follow card
│   ├── HowToHelp            ← donate / volunteer / share / partner
│   ├── DonationCTA          ← green gradient conversion panel
│   ├── DonationModal        ← QR + gateway donation sheet (focus-trapped)
│   ├── Contact              ← verified details, phone/email-ready, live map
│   ├── Footer               ← brand, links, contact, donate
│   ├── MobileDonateCTA      ← sticky mobile donate pill
│   └── ui/                  ← Logo, Reveal, SectionHeading
└── index.css                ← Tailwind 4 theme (brand tokens, motion)
```

Accessibility: semantic landmarks, skip link, focus-visible rings,
focus-trapped dialog with Escape-to-close, aria-live slide announcements,
`prefers-reduced-motion` respected, descriptive alt text.

