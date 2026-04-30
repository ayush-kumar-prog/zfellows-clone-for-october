import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Glass — Solids",
  description: "Drop your email. Take ten percent on the first cotton.",
};

export default function GlassPaywall() {
  return (
    <main className="glass">
      <img className="glass-bg" src="/thesolids/walls/glass-hero.jpg" alt="" />
      <div className="glass-scrim" aria-hidden />

      <article className="glass-card" role="dialog" aria-modal="true" aria-label="Email gate">
        <p className="glass-eyebrow">Welcome to Solids</p>
        <h1>
          Ten percent
          <br />
          <em>on the first cotton.</em>
        </h1>
        <p className="glass-sub">
          Drop your email below. We&rsquo;ll send a small code by reply post,
          then nothing else unless you ask. No newsletter storm, no daily
          sales, no pressure.
        </p>

        <form className="glass-form" aria-label="Email">
          <input type="email" placeholder="your@studio.com" aria-label="Email" />
          <button type="submit">
            Send my code
            <ArrowRight size={14} strokeWidth={1.6} />
          </button>
        </form>

        <p className="glass-foot">
          One code. Then quiet.
          <a href="#"> No thanks, take me to the cotton.</a>
        </p>
      </article>
    </main>
  );
}
