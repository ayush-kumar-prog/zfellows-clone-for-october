import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Inter_Tight, Outfit } from "next/font/google";
import "./globals.css";
import { PosthogProvider } from "@/components/PosthogProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Z Fellows | Get Fast-Tracked into Silicon Valley",
  description:
    "We give you $10k to go all in on your project/idea for a week. Join a cohort of early technical thinkers and learn from Silicon Valley's smartest mentors. Helping people build in consumer, social, enterprise, healthcare, edtech, fintech, cloud infrastructure, cybersecurity, crypto, Web3, AI, ML, climate, biotech, and more.",
  icons: {
    icon: "/seo/favicon.png",
  },
  openGraph: {
    title: "Z Fellows | Get Fast-Tracked into Silicon Valley",
    description:
      "1 week. $10,000. Z Fellows fast-tracks you into Silicon Valley.",
    images: ["/seo/social-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        {/* Fontshare: General Sans (used for brand wordmark + writings article body) */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500,600,700&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Suspense fallback={null}>
          <PosthogProvider>{children}</PosthogProvider>
        </Suspense>
      </body>
    </html>
  );
}
