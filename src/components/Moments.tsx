"use client";

import Image from "next/image";
import useInView from "./useInView";

/*
  The panel waits, dim and colourless, until the scroll line reaches its
  node (FlowLine sets data-lit on the text). Then a camera flash pops, the
  photo eases back into colour and the words rise in. Scrolling back up plays it in reverse.
*/
const Moments = () => {
  const { ref, seen } = useInView<HTMLElement>();

  return (
    <section ref={ref} className="mx-auto w-full max-w-4xl pb-28">
      <div
        className={`group/moments relative isolate flex h-[440px] items-end overflow-hidden rounded-[28px] bg-gray-900 p-6 transition-all duration-700 ease-out motion-reduce:transition-none md:h-[480px] md:p-12 ${
          seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <Image
          src="/flash_photo3.jpg"
          alt=""
          fill
          sizes="(min-width: 896px) 896px, 100vw"
          className="-z-10 scale-110 object-cover object-[70%_45%] brightness-75 grayscale transition-[scale,filter] duration-[2000ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:scale-100 motion-reduce:transition-[filter] group-has-[[data-lit]]/moments:scale-100 group-has-[[data-lit]]/moments:brightness-100 group-has-[[data-lit]]/moments:grayscale-0"
        />
        {/* a camera flash as the line arrives, before the colour comes in */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-white opacity-0 motion-reduce:hidden group-has-[[data-lit]]/moments:animate-[camera-flash_900ms_ease-out_both]" />
        {/* the flash photo is small, so a wash hides the softness and carries the text */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/50 to-transparent" />

        {/*
          the flow node. The spans set their own colours so the line's
          grey-until-reached doesn't touch the text on the photo.
        */}
        <p
          data-flow-node
          className="text-2xl leading-tight font-bold tracking-tight sm:text-3xl md:text-5xl"
        >
          <span
            className="block translate-y-6 text-white opacity-0 transition-all delay-300 duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:transition-opacity group-has-[[data-lit]]/moments:translate-y-0 group-has-[[data-lit]]/moments:opacity-100"
          >
            Less time on your phone.
          </span>
          <span
            className="block translate-y-6 text-white/60 opacity-0 transition-all delay-500 duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:transition-opacity group-has-[[data-lit]]/moments:translate-y-0 group-has-[[data-lit]]/moments:opacity-100"
          >
            More nights like these.
          </span>
        </p>
      </div>
    </section>
  );
};

export default Moments;
