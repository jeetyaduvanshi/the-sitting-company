import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Sitting Company | Premium Chairs for Office, Home & Events",
  description: "Exquisite seating crafted for spaces that inspire. Explore high-end ergonomic, office, lounge, and dining chairs by India's luxury furniture maker. Custom bulk orders available.",
  metadataBase: new URL("https://thesittingcompany.com"),
  openGraph: {
    title: "The Sitting Company | Premium Chairs for Office, Home & Events",
    description: "Exquisite seating crafted for spaces that inspire. Explore high-end ergonomic, office, lounge, and dining chairs by India's luxury furniture maker. Custom bulk orders available.",
    url: "https://thesittingcompany.com",
    siteName: "The Sitting Company",
    images: [
      {
        url: "/images/about_lifestyle.png",
        width: 1200,
        height: 630,
        alt: "The Sitting Company Premium Chairs",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Sitting Company | Premium Chairs for Office, Home & Events",
    description: "Exquisite seating crafted for spaces that inspire. Explore high-end ergonomic, office, lounge, and dining chairs by India's luxury furniture maker. Custom bulk orders available.",
    images: ["/images/about_lifestyle.png"],
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
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="antialiased selection:bg-brand-gold selection:text-brand-black">
        {/* Grain overlay for luxury feel */}
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
