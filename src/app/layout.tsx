import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter, Titan_One, Bungee, Chango, Nunito } from "next/font/google";
import { ComingSoon, Header, LoadingScreen } from "@/components";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bungee = Bungee({
  variable: "--font-bungee",
  subsets: ["latin"],
  weight: "400"
});

// rounded, to sit with the logo
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const chango = Chango({
  variable: "--font-chango",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jinx | The dating app with one match a day",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Jinx",
    "dating app",
    "one match a day",
    "slow dating",
    "free dating app",
    "dating app Manchester",
    "no swipe dating app",
    "meaningful connections",
  ],
  authors: [{ name: "Jinx LTD", url: SITE_URL }],
  creator: "Jinx LTD",
  publisher: "Jinx LTD",
  category: "dating",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Jinx | The dating app with one match a day",
    description: "One match a day. Get to know each other one question at a time.",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jinx | The dating app with one match a day",
    description: "One match a day. Get to know each other one question at a time.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  appleWebApp: { title: SITE_NAME },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${bungee.variable} ${chango.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className=" flex flex-col">
        <LoadingScreen />
        <div className="w-full max-w-[1080px] min-h-full mx-auto flex flex-col">
          <Header />
          {children}
        </div>
        <ComingSoon />
        <Analytics />
      </body>
    </html>
  );
}
