"use client";

import Image from "next/image";
import useInView from "./useInView";

const Moments = () => {
  const { ref, seen } = useInView<HTMLElement>();

  return (
    <section ref={ref} className="mx-auto w-full max-w-4xl pb-28">
      <div
        className={`relative isolate flex h-[440px] items-end overflow-hidden rounded-[28px] bg-gray-900 p-6 transition-all duration-700 ease-out motion-reduce:transition-none md:h-[480px] md:p-12 ${
          seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <Image
          src="/flash_photo3.jpg"
          alt=""
          fill
          sizes="(min-width: 896px) 896px, 100vw"
          className="-z-10 object-cover object-[70%_45%]"
        />
        {/* the flash photo is small, so a wash hides the softness and carries the text */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/50 to-transparent" />

        {/*
          a flow node, so the line greys it until reached. The spans set
          their own colours so the text stays white on the photo.
        */}
        <p
          data-flow-node
          className={`text-2xl leading-tight font-bold tracking-tight sm:text-3xl transition-all delay-300 duration-700 ease-out motion-reduce:transition-none md:text-5xl ${
            seen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span className="block text-white">Less time on your phone.</span>
          <span className="block text-white/60">More nights like these.</span>
        </p>
      </div>
    </section>
  );
};

export default Moments;
