import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { SuccessPattern } from "@/components/sections/SuccessPattern";
import { Connects } from "@/components/sections/Connects";
import { WhoAreZFellows } from "@/components/sections/WhoAreZFellows";
import { WhyZFellows } from "@/components/sections/WhyZFellows";
import { Program } from "@/components/sections/Program";
import { Mentors } from "@/components/sections/Mentors";
import { Testimonials } from "@/components/sections/Testimonials";
import { Investors } from "@/components/sections/Investors";
import { Gallery } from "@/components/sections/Gallery";
import { Faqs } from "@/components/sections/Faqs";
import { MoreQuestions } from "@/components/sections/MoreQuestions";
import { ApplyCta } from "@/components/sections/ApplyCta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SuccessPattern />
        <Connects />
        <WhoAreZFellows />
        <WhyZFellows />
        <Program />
        <Mentors />
        <Testimonials />
        <Investors />
        <Gallery />
        <Faqs />
        <MoreQuestions />
        <ApplyCta />
      </main>
      <Footer />
    </>
  );
}
