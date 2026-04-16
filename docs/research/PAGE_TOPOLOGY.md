# Z Fellows Page Topology

Source: `https://www.zfellows.com/` (and 3 other unique routes).

## Site-wide chrome

| Element | Class | Height | Notes |
|---|---|---|---|
| Navbar | `.new-navbar.w-nav` | 82px | `position: relative` (NOT sticky), bg `#FFFDF3`, no shadow, no scroll-state change |
| Footer | `.new-footer` | 231px | Same on every page |

The brand wordmark "Z Fellows" uses the **General Sans** typeface (the only place it's used outside `/writings/*` body copy).

## Routes

### `/` (Home) — 12,401px tall
Single `.main-wrapper.no-overflowhidden` with **14 sections**:

| # | Section | Class | Height | Heading | Notes |
|---|---|---|---|---|---|
| 0 | Hero | `.section_hero` | 1243px | "Your Fast-Track Into Silicon Valley." | h1 80px Inter 700, letter-spacing -3.2px. Multi-column collage of ~17 founder photos (Etched, Stripe, Apple, Mercor, Zuck, Google, Elon/PayPal, etc.) |
| 1 | Success/mentorship pattern | `.section_success-mentorship` | 2256px | "There's a pattern among the most successful founders." | 3 large founder cards (Google, Facebook, YouTube founder photos) |
| 2 | Connects | `.section_connects` | 900px | "Z Fellows connects really early builders with multi billion dollar founders." | |
| 3 | Who are Z Fellows? | `.section_who-are-zfellows` | 834px | "Who are Z Fellows?" | |
| 4 | Why Z Fellows? | `.section_why-zfellows` | 474px | "Why Z Fellows?" | iMessage screenshots (Ludvig, Ali, Selin) in card stack |
| 5 | Program (`#about`) | `.section_program` | 413px | (no heading) | Anchor target for `#about` |
| 6 | Mentors (`#mentors`) | `.section_new-mentors` | 1153px | "Meet the mentors" | Grid of 30 mentor cards on desktop; **Swiper carousel on mobile** (`.swiper-mentors.hide-desktop`) — Marc Randolph, Kevin Hartz, Naval Ravikant, Max Mullen, Trae Stephens, Julia Hartz, etc. |
| 7 | Testimonials | `.section_testimonials` | 910px | "Hear from our alumni" | Swiper carousel of rotating founder quotes |
| 8 | Investors | `.section_investors` | 677px | "Z Fellows alumni have raised hundreds of millions from top investors" | Logo wall |
| 9 | (spacer) | `.section_new-mentors` | 144px | | Empty/spacer |
| 10 | Gallery | `.section_gallery` | 862px | "It's happening now." | |
| 11 | FAQs (`#faqs`) | `.section_faqs` | 1429px | "FAQs" | Webflow accordion. Each item: `.faqs_wrapper > .faqs_accordian-header (p + chevron svg)` + hidden `.new-rich-text.w-richtext`. Toggled via `data-w-id` Webflow interaction (display:none → display:block) |
| 12 | More questions | `.section_text-cory` | 297px | "More questions?" | Cory contact CTA |
| 13 | Apply CTA | `.section_new-cta.new-background-color_primary-blue` | 500px | "When in doubt, apply. We're all winging it :)" | Blue (`#2067FF`) bg, white text |

### `/blog` — 8,816px tall
Single `.section_blog` (8226px). Heading "Blog". Grid of `.blog_collection-item.small-card.w-dyn-item.w-col.w-col-4` cards (3 columns on desktop, 432px tall each). 50+ posts. Each card: cover image, date, post title.

### `/startup-workshop` — 2,538px tall
Single `.worksshop_hero` (1948px). Heading "Startup Workshop".

### `/writings/[slug]` — variable (~3,500px example)
Template page with 4 sections:

| # | Section | Class | Height | Notes |
|---|---|---|---|---|
| 0 | Article body | `.section_writing-body` | ~2183px | h1 + meta + rich text. Body uses **General Sans** at 16px/24px, max-width 720px, color `#000B1C` |
| 1 | Related articles | `.section_writing-articles` | 594px | "Related articles" — grid of 3 related posts |
| 2 | Cory CTA | `.section-cta` | 174px | "Questions? Text Cory at 650-505-9984" |
| 3 | Newsletter | `.section-newsletter` | 270px | "Subscribe to our newsletter" |

## Z-index / overlay layers
- Navbar: `z-index: 1000`, but `position: relative` so it scrolls with the page (no fixed/sticky behavior).
- All sections flow normally (no overlapping z-index stacking).

## Apply Now
The "Apply Now" CTA is a primary blue button in the navbar AND embedded throughout the page. Link target is **external** Google Form: `https://docs.google.com/forms/u/0/d/1z5HG9Pj0hIxS2oZL_wcJS5QqDZlcVbkhYGHp5Kp_IGM/viewform?edit_requested=true` — we link out, do not clone.

## Out-of-scope routes
- `/writings-copy/*` — these ~55 URLs in the sitemap are Webflow CMS auto-copies of the writings collection. They render the same template with duplicate content. We render `/writings/[slug]` only.
