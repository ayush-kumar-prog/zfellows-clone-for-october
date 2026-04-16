# Z Fellows Behaviors

Discovered via Playwright MCP scroll/click/responsive sweeps.

## Navbar
- **Position**: `relative` (NOT sticky / NOT fixed). Scrolls away with the page.
- **Z-index**: 1000 (irrelevant at relative positioning, kept for safety)
- **No scroll-state change**: bg, height, shadow, transform unchanged at scroll positions 0 and 1500. Confirmed via before/after `getComputedStyle()` diff.
- **Mobile**: Webflow `.w-nav` collapses to hamburger menu at narrow widths (Webflow default).

## Scroll-driven animations
- 41 elements on home page carry `data-w-id` attributes (Webflow interaction IDs)
- Common pattern: `opacity: 0` initial → `opacity: 1` on viewport intersection (typical Webflow `IX2` "fade in on scroll" preset)
- Implement with **IntersectionObserver** + CSS transition, OR use Framer Motion's `whileInView` (already a small lib but acceptable). Default to native IntersectionObserver to avoid dependency.

## FAQ accordion (`.section_faqs`)
- Each item: `.faqs_wrapper > .faqs_accordian-header (p.text-24px-semibold + chevron svg) + .new-rich-text.w-richtext`
- Initial: rich-text `display: none`, chevron `rotate(0deg)`
- On click of header: rich-text `display: block`, chevron `rotate(180deg)` (3D transform with `preserve-3d`)
- Webflow drives this via `data-w-id="1d04e3ad-ccff-1b12-6798-b1cdd57bc634"` (same ID for all items, they share the same interaction)
- **Implementation**: standard React `useState` + conditional render + CSS transition on chevron transform.

## Mentors carousel (mobile only)
- `.swiper.swiper-mentors.hide-desktop` — hidden on desktop (CSS `display: none` at >= breakpoint), visible on mobile
- 30 swiper-slides (one per mentor), each `.swiper-slide.section-mentors.w-dyn-item`
- Swiper.js v11 (loaded from `https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css`)
- **Implementation**: Use `swiper/react` (small dep — but cloner template forbids new deps). Alternative: build custom CSS `scroll-snap` carousel with no JS. Recommend `scroll-snap` for simplicity.

## Testimonials carousel (`.section_testimonials`)
- Auto-rotating Swiper. TODO: confirm autoplay duration and transition.
- **Implementation**: same as mentors — `scroll-snap` + JS auto-advance with `setInterval`.

## Hero image collage
- Multi-column grid of ~17 founder photos (some hidden at `<1280px` via `.hide-1280px` class)
- Static layout, no animation.

## Buttons hover
- "Apply Now" has `transition: all` declared. Hover behavior TBD — extract per-component during Phase 3.

## Responsive breakpoints (Webflow defaults observed)
- `>= 1280px` — full hero collage visible
- `< 1280px` — `.hide-1280px` images hidden
- `< 992px` — tablet layout (Webflow default)
- `< 768px` — mobile-large
- `< 479px` — mobile-small (mentor carousel kicks in)

## Smooth scroll
- None. Native browser scrolling.

## External links
- "Apply Now" → `https://docs.google.com/forms/u/0/d/1z5HG9Pj0hIxS2oZL_wcJS5QqDZlcVbkhYGHp5Kp_IGM/viewform?edit_requested=true`
- Footer social links (X/Twitter, LinkedIn) — TBD, footer extraction pending.

## Hover sweeps (TBD)
Phase 3 should hover over: nav links, mentor cards, blog post cards, FAQ items, footer social icons. Capture before/after for each.
