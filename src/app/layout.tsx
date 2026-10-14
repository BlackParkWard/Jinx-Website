import type { Metadata } from "next";
import { Inter, Titan_One, Bungee, Chango, Nunito } from "next/font/google";
import { Footer, Header } from "@/components";
import { SITE_URL } from "@/lib/site";
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
  title: "Jinx | The new way to date",
  description: "A dating app that helps you find meaningful connections, not just swipes.",
  openGraph: {
    title: "Jinx | The new way to date",
    description: "One match a day. Get to know each other one question at a time.",
    siteName: "Jinx",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jinx | The new way to date",
    description: "One match a day. Get to know each other one question at a time.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bungee.variable} ${chango.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className=" flex flex-col">
        <div className="w-full max-w-[1080px] min-h-full   mx-auto flex flex-col">
   
          {children}

       
        </div>

      </body>
    </html>
  );
}
