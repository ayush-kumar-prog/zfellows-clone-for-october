# Z Fellows Design Tokens

Extracted via `getComputedStyle()` on `https://www.zfellows.com/`.

## Fonts

| Family | Source | Weights used | Where |
|---|---|---|---|
| **Inter** | Google Fonts | 400, 500, 600, 700, 800, 900 | Default UI font (`--_new-base---font-family: Inter, sans-serif`). Hero h1 uses 700. |
| **Inter Tight** | Google Fonts | 300, 400, 500 | Subheadings, body |
| **Outfit** | Google Fonts | 400 | Limited use (not yet identified per element) |
| **General Sans** | Fontshare (likely) | TBD | Brand wordmark "Z Fellows" in navbar (`.brand-logo_text`) AND article body on `/writings/[slug]` (`.w-richtext`, 16px/24px) |

Webflow CSS class signatures confirm activation: `wf-outfit-n4-active wf-inter-n4/n5/n6/n7/n8/n9-active wf-intertight-n3/n4/n5-active`.

### Wiring in Next.js

```ts
// src/app/layout.tsx
import { Inter, Inter_Tight, Outfit } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"], weight: ["400","500","600","700","800","900"], variable: "--font-inter" });
const interTight = Inter_Tight({ subsets: ["latin"], weight: ["300","400","500"], variable: "--font-inter-tight" });
const outfit = Outfit({ subsets: ["latin"], weight: ["400"], variable: "--font-outfit" });

// General Sans must be loaded from Fontshare or self-hosted (not on Google Fonts).
// Recommended: download from https://www.fontshare.com/fonts/general-sans and use next/font/local.
const generalSans = localFont({
  src: [
    { path: "./fonts/GeneralSans-Variable.woff2", style: "normal", weight: "200 700" }
  ],
  variable: "--font-general-sans"
});
```

## Color palette (from CSS variables on `:root`)

### Core
| Token | Value | Use |
|---|---|---|
| `--primary-blue` / `--_new-base---core-colors--primary-color-2067ff` | `#2067FF` | Primary CTA buttons + final blue CTA section bg |
| `--light-blue` | `#4AAEFF` | Accent |
| `--dark-blue` | `#000B1C` | Article body text color |
| `--dark-slate-blue` | `#313A48` | |
| `--_new-base---core-colors--pure-black-000000` | `#000000` | Body color |
| `--_new-base---core-colors--pure-white-ffffff` / `--white` | `#FFFFFF` | |
| `--_new-base---backgrounds--background-color-fffef8` | `#FFFDF3` | **Page background (cream)** |
| `--_new-base---neutral-colors--warm-white-f7f4e9` | `#F7F4E9` | Secondary warm white |
| `--off-white` | `#F6F6FA` | Cool off-white |
| `--ghost-white` | `#EDEAF5` | Pale lavender |
| `--dark-off-white` | `#EAECF5` | |

### Neutrals (greys)
| Token | Value |
|---|---|
| `--_new-base---neutral-colors--dark-grey-393939` | `#393939` |
| `--_new-base---neutral-colors--deep-grey-404040` | `#404040` |
| `--_new-base---neutral-colors--mid-grey-585858` | `#585858` |
| `--dim-grey` | `#565656` |
| `--_new-base---neutral-colors--black-grey-363636` | `#363636` (chevron stroke color in FAQ) |
| `--_new-base---neutral-colors--grey-706e6e` | `#706E6E` |
| `--silver` | `#BEBEBE` |
| `--_new-base---neutral-colors--light-grey-d4d4d4` | `#D4D4D4` |
| `--_new-base---neutral-colors--lighter-grey-ebebeb` | `#EBEBEB` |
| `--_new-base---neutral-colors--cool-grey-e1e4ea` | `#E1E4EA` |
| `--white-smoke` | `#EEEEEE` |

### Other
| Token | Value | Use |
|---|---|---|
| `--swiper-theme-color` | `#007AFF` | Swiper carousel dots/arrows |
| `--swiper-navigation-size` | `44px` | Swiper arrow size |

## Typography scale

Confirmed measurements:

| Element | Font | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|---|
| Hero h1 (`.section_hero h1`) | Inter | 80px | 700 | 80px | -3.2px |
| FAQ question (`.text-24px-semibold`) | Inter | 24px | 600 (semibold) | (TBD) | (TBD) |
| Apply Now button | Inter | 20px | 600 | (TBD) | -0.72px |
| Article body (`.w-richtext`) | General Sans | 16px | 400 | 24px | (TBD) |
| Section h2 (e.g., FAQs) | (`.new-heading-style-h2`) | (TBD — extract per section) | | | |

## Buttons

### Primary "Apply Now" (extracted)
- bg: `#2067FF`
- color: `#FFFDF3`
- padding: `13.6px 40px`
- border-radius: `15984px` (i.e., fully rounded pill — Webflow's "9999px+" hack)
- font: Inter 20px / 600
- letter-spacing: `-0.72px`
- box-shadow: `inset 0 4px 8px rgba(117,169,255,0.4), inset 0 -4px 8px rgba(117,169,255,0.2)`
- transition: `all`
- border: none

## Spacing

Webflow utility classes observed:
- `.spacer-80px` — 80px vertical spacer
- `.new-padding-global` — wraps every section's content for horizontal padding
- `.new-padding-section-medium` — vertical section padding
- `.container-large` — content width container

## Animations

- 41 elements on home have `data-w-id` (Webflow interaction triggers)
- Common pattern: `opacity: 0` initial state, fades to `opacity: 1` on viewport intersection
- FAQ accordion: `display: none` → `display: block` toggle, with chevron 3D transform rotation
- Mentor and testimonial sections use **Swiper.js v11**

## Smooth scroll
- No Lenis / Locomotive Scroll detected. Native browser scrolling.
- `scroll-behavior: auto`

## Tailwind CSS v4 token mapping (proposed)

```css
@theme {
  --color-background: #FFFDF3;        /* cream — page bg */
  --color-foreground: #000000;
  --color-primary: #2067FF;           /* primary blue CTA */
  --color-primary-foreground: #FFFDF3;
  --color-accent: #4AAEFF;
  --color-muted: #F7F4E9;
  --color-card: #FFFFFF;
  --color-border: #EBEBEB;
  --color-warm-white: #F7F4E9;
  --color-grey-deep: #404040;
  --color-grey-mid: #585858;
  --color-grey-cool: #E1E4EA;
  --color-dark-blue: #000B1C;         /* article body color */

  --font-sans: var(--font-inter);
  --font-display: var(--font-inter-tight);
  --font-brand: var(--font-general-sans);
  --font-accent: var(--font-outfit);
}
```
