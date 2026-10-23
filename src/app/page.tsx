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
  LogoOutline
} from "@/components";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex font-sans bg-white h-full px-6 flex flex-col">
        {/*
          the header floats over the hero, so leave room for it at the top.
          On phones it's empty until you scroll, so the hero starts higher
        */}
        <section className="relative isolate -mx-6 mb-20 overflow-hidden pb-20 md:pt-[72px]">
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
            <button 
              style={{ backgroundColor: process.env.NEXT_PUBLIC_BRAND_COLOR }}
              className="text-white px-5 pl-4 py-2 rounded-full text-lg hover:brightness-95 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] transition duration-200 flex gap-2 items-center justify-center"
            >
              <Image src="/apple.svg" alt="App Store" width={24} height={24} />
              Get the app
            </button>
            <button className=" px-5 py-2 rounded-full  text-lg bg-gray-200 text-gray-800 hover:bg-gray-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition duration-200">
              Create account
            </button>
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
        <Footer />
    </div>
  );
}
