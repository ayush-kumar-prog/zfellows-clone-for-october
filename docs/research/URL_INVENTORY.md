# Z Fellows URL Inventory

Source: `https://www.zfellows.com/sitemap.xml` (110 URLs).

## Unique routes to clone

### Static pages (3)
1. `/` — Home (long-scroll, 14 sections, 12,401px)
2. `/blog` — Blog index (grid of all writings)
3. `/startup-workshop` — Standalone landing page

### Dynamic template (1 → ~50 instances)
4. `/writings/[slug]` — Article template. 50 unique posts in the sitemap. Below.

### External (linked, NOT cloned)
- Apply Now Google Form: `https://docs.google.com/forms/u/0/d/1z5HG9Pj0hIxS2oZL_wcJS5QqDZlcVbkhYGHp5Kp_IGM/viewform?edit_requested=true`

## Excluded
- `/writings-copy/*` (~55 URLs) — Webflow CMS auto-copies with duplicate content. Skip.

## All `/writings/*` slugs (50)

```
advice-for-ambitious-college-students-how-to-change-the-world-doing-great-work
angela-duckworth-on-grit-steve-jobs-on-focus-and-notions-founder-on-product-positioning
becoming-an-outlier
being-bold-hard-work-and-playing-the-long-game
being-relentless-early-career-hard-work-the-price-of-leadership
ben-horowitz-on-being-a-hero-why-to-pursue-mastery-and-jensen-huangs-linkedin
bending-the-world-to-your-will-elons-algorithm-the-shortness-of-life
choosing-your-lifes-work-changing-the-world-and-dealing-with-setbacks
defiance
dreaming-being-the-best-and-nikes-manifesto
elon-musks-first-startup-living-a-meaningful-life-and-michael-jordan-on-persistence
following-the-crowd-the-hiring-process-and-multi-disciplinary-learning
founder-mode-pettiness-and-being-pragmatic
growing-a-tolerance-for-failure-the-power-of-asking-and-what-to-work-on
how-to-be-elon-musk-tips-from-his-ex-wife-jensen-huang-on-character-and-airbnb-rejection-emails
how-to-be-successful-distribution-and-solo-projects
how-to-get-lucky-sales-101-masterclass-and-studying-the-greats
how-to-get-startup-ideas-build-wealth-and-embrace-imperfection
how-to-write-building-a-team-studying-greatness
incrementalism
inspiring-naval-ravikant-tweets-kobes-approach-to-learning-new-skills-and-the-difference-between-a-fixed-and-growth-mindset
jessica-livingston-on-acing-an-interview-jockos-tips-on-leadership-and-tom-bradys-high-school-resume
key-logs
life-advice-public-speaking-and-high-agency-people
maintaining-momentum
naval-ravikant-apples-marketing-philosophy-and-obsession
networking-career-advice-and-kobe-bryant-on-leadership
on-greatness-rejection-and-living-like-gladiators
paul-graham-on-what-to-unlearn-from-college-kobe-bryants-coach-on-showing-up-everyday-and-the-ipods-inventor-on-the-customer-journey
peter-thiels-management-framework-networking-and-landing-pages
productivity-pain-tolerance-and-kindness
pursuing-passion-doing-what-you-love-and-swinging-for-the-fences
pushing-the-urgency-thinking-differently-life-formulas
rejection-asking-finding-your-competitive-advantage
reversible-vs-irreversible-decisions-speed-and-the-love-for-reading
running-the-distance-maintaining-high-standards-and-setting-personal-goals
sam-altman-on-endurance-marc-andreessen-on-business-plans-and-getting-better-everyday
sam-altman-on-how-to-not-give-up-naval-ravikant-on-being-all-in-and-the-best-founder-personality-traits-according-to-zero-to-one
sam-altman-on-speed-steve-jobs-life-advice-and-the-4-types-of-luck
startup-athleticism
startup-ideas-work-life-balance-and-speed
steve-jobs-on-authenticity-ray-dalios-formula-for-progress-and-lessons-from-melanie-perkins
steve-jobs-values-peter-thiel-on-distribution-and-how-one-email-can-change-your-life
stripes-cofounder-on-tenacity-10-time-management-tips-from-ali-abdaal-and-rules-for-a-creative-life
taste-perseverance-and-kanye-west
the-price-of-leadership-the-perfect-meeting-warren-buffets-life-advice
tom-brady-on-consistency-lessons-from-peter-thiel-and-walt-disney-on-pursuing-ambitious-dreams
why-facebook-was-successful-market-sizes-and-life-changing-questions
why-plans-dont-matter-marc-andreessen-on-product-market-fit-and-inspiring-drive-in-people
writing-in-public-startup-make-believe-and-steve-jobs
```

## Fetching strategy

All `/writings/*` slugs render the SAME template with different content. We will:

1. Build the `[slug]` template once.
2. Write a content scraper (`scripts/scrape-writings.mjs`) that hits each URL via fetch, extracts `<h1>`, publish date, and the `.w-richtext` HTML, and writes to `src/data/writings/<slug>.json`.
3. Next.js `generateStaticParams()` reads the JSON dir and statically renders all 50 pages.
