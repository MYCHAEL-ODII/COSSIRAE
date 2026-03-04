import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "KILENTAR — Dark Luxury Fashion",
    template: "%s | KILENTAR",
  },
  description:
    "Luxury fashion for those who understand that true style is a philosophy, not a trend. Discover our curated collections of dark, sophisticated pieces.",
  keywords: ["luxury fashion", "dark fashion", "designer clothing", "avant-garde", "minimalist"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kilentar.com",
    siteName: "KILENTAR",
    title: "KILENTAR — Dark Luxury Fashion",
    description: "Luxury fashion for those who understand that true style is a philosophy, not a trend.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KILENTAR — Dark Luxury Fashion",
    description: "Luxury fashion for those who understand that true style is a philosophy, not a trend.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0a0a0a] text-[#f5f5f5] antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
