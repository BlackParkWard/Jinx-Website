import {
  Tagline,
  DailyDrop,
  Conversation,
  OneAtATime,
  Moments,
  Safety,
  Faq,
  Footer,
  FlowLine,
} from "@/components";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex font-sans bg-white h-full px-6 flex flex-col">
        <Tagline />
        <div className="flex  gap-2 justify-center h-max items-center pb-25 animate-[fade-up_0.7s_ease-out_320ms_both] motion-reduce:animate-none">
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

        <FlowLine>
          <DailyDrop />
          <Conversation />
          <OneAtATime />
          <Moments />
          <Safety />
          <Faq />
        </FlowLine>
        <Footer />
    </div>
  );
}
