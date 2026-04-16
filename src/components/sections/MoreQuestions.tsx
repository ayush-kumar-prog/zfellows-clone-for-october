export function MoreQuestions() {
  return (
    <section className="w-full">
      <div className="max-w-[800px] mx-auto px-6 lg:px-10 py-12 lg:py-16 text-center">
        <h2 className="font-bold text-foreground tracking-[-0.04em] leading-[1] mb-3"
          style={{ fontSize: "clamp(28px, 3.5vw, 40px)", letterSpacing: "-1.5px" }}
        >
          More questions?
        </h2>
        <h3 className="text-foreground/85 text-[18px] lg:text-[24px] tracking-[-0.02em]">
          Text Cory (the founder) at{" "}
          <a href="sms:6505059984" className="text-blue underline" style={{ color: "#2067ff" }}>
            650-505-9984
          </a>
        </h3>
      </div>
    </section>
  );
}
