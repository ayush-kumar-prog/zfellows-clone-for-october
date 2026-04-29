import type { Metadata } from "next";
import { Suspense } from "react";
import { Oswald, Poppins } from "next/font/google";
import "./globals.css";
import { PosthogProvider } from "@/components/PosthogProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zfellows-clone.vercel.app"),
  title: "TheSolids.co",
  description:
    "Premium essentials, oversized t-shirts, joggers, tank tops, and everyday solids.",
  icons: {
    icon: "/thesolids/penguin.svg",
  },
  openGraph: {
    title: "TheSolids.co",
    description:
      "Premium essentials, oversized t-shirts, joggers, tank tops, and everyday solids.",
    images: ["/thesolids/hero-frame-24.jpg"],
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
      className={`${poppins.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground font-sans">
        {children}
        <Suspense fallback={null}>
          <PosthogProvider />
        </Suspense>
      </body>
    </html>
  );
}
