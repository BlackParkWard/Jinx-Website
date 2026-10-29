import {
  Tagline,
  DailyDrop,
  Conversation,
  OneAtATime,
  Moments,
  Free,
  Safety,
  Faq,
  Footer,
  FlowLine,
  LogoOutline,
  ComingSoonButton,
} from "@/components";
import Image from "next/image";
import { QUESTIONS } from "@/lib/faq";
import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

// what search engines and AI answers read about Jinx: the company, the site,
// the app and the FAQ, linked by id so they read as one thing
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      legalName: "Jinx LTD",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      email: CONTACT_EMAIL,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: CONTACT_EMAIL,
        availableLanguage: "English",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en-GB",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "MobileApplication",
      "@id": `${SITE_URL}/#app`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}/opengraph-image.png`,
      operatingSystem: "iOS",
      applicationCategory: "LifestyleApplication",
      applicationSubCategory: "Dating",
      areaServed: { "@type": "City", name: "Manchester" },
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: QUESTIONS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <div className="flex font-sans bg-white h-full px-6 flex flex-col">
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON, with < escaped as Next's docs advise
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {/* contents, so the landmark doesn't change the layout */}
        <main className="contents">
        {/*
          the header floats over the hero, so leave room for it at the top.
          On phones it's empty until you scroll, so the hero starts higher
        */}
        {/* data-intro: its entrance waits for the loading screen to finish */}
        <section data-intro className="relative isolate -mx-6 mb-20 overflow-hidden pb-20 md:pt-[72px]">
          {/* the flash photo is small, so a dark wash hides the softness */}
          <Image
            src="/picnic-date.webp"
            alt=""
            fill
            preload
            sizes="100vw"
            className="-z-10 object-cover object-[50%_40%]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
          <Tagline />
          <div className="flex  gap-2 justify-center h-max items-center animate-[fade-up_0.7s_ease-out_320ms_both] motion-reduce:animate-none">
            <ComingSoonButton
              style={{ backgroundColor: process.env.NEXT_PUBLIC_BRAND_COLOR }}
              className="text-white px-5 pl-4 py-2 rounded-full text-lg hover:brightness-95 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] transition duration-200 flex gap-2 items-center justify-center"
            >
              <Image src="/apple.svg" alt="App Store" width={24} height={24} />
              Get the app
            </ComingSoonButton>
            <ComingSoonButton className=" px-5 py-2 rounded-full  text-lg bg-gray-200 text-gray-800 hover:bg-gray-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition duration-200">
              Create account
            </ComingSoonButton>
          </div>
        </section>

        <FlowLine>
          <DailyDrop />
          <Conversation />
          <OneAtATime />
          <Moments />
          <Free />
          <Safety />
          <Faq />
        </FlowLine>
        </main>
        <Footer />
    </div>
  );
}
