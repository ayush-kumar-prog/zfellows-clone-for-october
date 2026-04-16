const APPLY_URL =
  "https://docs.google.com/forms/u/0/d/1z5HG9Pj0hIxS2oZL_wcJS5QqDZlcVbkhYGHp5Kp_IGM/viewform?edit_requested=true";

export function ApplyCta() {
  return (
    <section
      className="w-full"
      style={{ backgroundColor: "#2067ff" }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-32 text-center">
        <h2
          className="font-bold text-cream tracking-[-0.04em] leading-[0.95] mb-10"
          style={{
            color: "#fffdf3",
            fontSize: "clamp(36px, 5.5vw, 64px)",
            letterSpacing: "-2px",
          }}
        >
          When in doubt, apply.
          <br />
          We&rsquo;re all winging it :)
        </h2>
        <a
          href={APPLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-12 py-4 rounded-full bg-background text-foreground font-sans font-semibold text-[20px] tracking-[-0.72px] hover:opacity-90 transition-opacity"
          style={{
            boxShadow:
              "inset 0 4px 8px rgba(255,255,255,0.4), inset 0 -4px 8px rgba(0,0,0,0.05)",
          }}
        >
          Apply Now
        </a>
      </div>
    </section>
  );
}
