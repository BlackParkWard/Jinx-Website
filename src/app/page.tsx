import { Features, Tagline } from "@/components";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex font-sans bg-white h-full px-6 flex flex-col">
        <Tagline />
        <div className="flex gap-2 justify-center items-center pb-20">
            <button 
              style={{ backgroundColor: process.env.NEXT_PUBLIC_BRAND_COLOR }}
              className="text-white px-5 pl-4 py-2 rounded-full text-lg hover:brightness-90 transition-colors flex gap-2 items-center justify-center"
            >
              <Image src="/apple.svg" alt="App Store" width={24} height={24} />
              Get the app
            </button>
            <button className=" px-5 py-2 rounded-full  text-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors">
              Create account
            </button>
        </div>

        
    </div>
  );
}
