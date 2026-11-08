import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/ui/animated-background";
import ScrollProgress from "@/components/ui/scroll-progress";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import Navbar from "@/components/Navbar/page";
import Footer from "@/components/Footer/page";
import PageEffects from "@/components/ui/page-effects";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayman Nasir",
  description: "Ayman Nasir | Full-Stack Developer",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body
        className={`${inter.className} min-h-full flex flex-col tracking-tight`}
      >
        {/* The moving colours sit behind everything */}
        <AnimatedBackground />
        <PageEffects />
        {/* All the page content sits above the background */}
        <div className="relative z-10 flex flex-1 flex-col">
          <SmoothScroll>
            <ScrollProgress />
            <Navbar />
            {children}
            <Footer />
          </SmoothScroll>
        </div>
      </body>
    </html>
  );
}
