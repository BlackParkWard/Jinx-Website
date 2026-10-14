import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100dvh)] items-center justify-center bg-white px-6 font-sans flex-col gap-4">
      <span className="relative block h-18 aspect-[1510/758] overflow-hidden">
                              <Image
                                  src="/jinx_logo.svg"
                                  alt="Jinx"
                                  width={2000}
                                  height={2000}
                                  sizes="100px"
                                  preload
                                  className="absolute max-w-none fill-blue-500"
                                  style={{ width: "132.45%", height: "auto", left: "-13.58%", top: "-83.25%" }}
                              />
                          </span>

                          <p className="text-xs text-gray-500 ">© 2026 Jinx. All rights reserved.</p>
    </main>
  );
}
