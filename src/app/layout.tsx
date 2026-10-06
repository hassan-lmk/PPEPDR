import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ppepdr.net"),
  title: {
    default: "Pakistan Petroleum Exploration & Production Data",
    template: "%s | PPEPDR",
  },
  description:
    "PPEPDR is a centralized digital database for all seismic, well, and physical data that can be accessed online.",
  keywords: [
    "LMKR",
    "PPEPDR",
    "digital database for all seismic",
    "pakistan",
    "Petroleum Exploration & Production Data",
    "Petrobank",
  ],
  openGraph: {
    locale: "en_US",
    type: "website",
    siteName: "PPEPDR",
    title: "Pakistan Petroleum Exploration & Production Data",
    description:
      "PPEPDR is a centralized digital database for all seismic, well, and physical data that can be accessed online.",
    images: ["/images/main-page-header.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pakistan Petroleum Exploration & Production Data",
    description:
      "PPEPDR is a centralized digital database for all seismic, well, and physical data that can be accessed online.",
    images: ["/images/main-page-header.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
