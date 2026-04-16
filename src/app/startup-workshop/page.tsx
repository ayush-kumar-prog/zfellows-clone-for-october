import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ApplyCta } from "@/components/sections/ApplyCta";

const APPLY_URL =
  "https://docs.google.com/forms/u/0/d/1z5HG9Pj0hIxS2oZL_wcJS5QqDZlcVbkhYGHp5Kp_IGM/viewform?edit_requested=true";

const FEATURES = [
  {
    title: "Live cohort sessions",
    body: "Work alongside ten ambitious builders, get rapid feedback from peers and mentors throughout the week.",
  },
  {
    title: "Mentor office hours",
    body: "1:1 time with founders of multi-billion dollar companies — the people who can actually move the needle for you.",
  },
  {
    title: "Lifetime alumni network",
    body: "The week ends, the connections don't. The Z Fellows community stays with you for the life of your company.",
  },
];

export default function StartupWorkshopPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="w-full">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-16 lg:pt-24 pb-12 text-center">
            <p className="font-display text-[14px] lg:text-[16px] tracking-[0.2em] uppercase text-grey-mid mb-6">
              The Z Fellows
            </p>
            <h1
              className="font-bold text-foreground tracking-[-0.04em] leading-[0.95] mb-6 lg:mb-8"
              style={{ fontSize: "clamp(48px, 8vw, 96px)", letterSpacing: "-3.5px" }}
            >
              Startup Workshop
            </h1>
            <p className="max-w-[640px] mx-auto text-foreground/80 text-[18px] lg:text-[22px] leading-snug mb-10">
              A one-week live workshop for technical builders ready to go all-in on their idea —
              built around the people, mentors and momentum that turn projects into companies.
            </p>
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-zf-primary inline-block"
            >
              Apply Now
            </a>
          </div>
        </section>

        <section className="w-full">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="rounded-[18px] border border-border bg-card p-6 lg:p-8"
                >
                  <h3 className="font-semibold text-foreground text-[20px] lg:text-[24px] tracking-[-0.02em] mb-3">
                    {f.title}
                  </h3>
                  <p className="text-foreground/75 text-[15px] lg:text-[17px] leading-snug">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ApplyCta />
      </main>
      <Footer />
    </>
  );
}
