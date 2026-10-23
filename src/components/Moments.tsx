"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import useInView from "./useInView";

// where each print lands in the fan, from the middle of the stack
const PRINTS = [
  { src: "/flash_photo2.jpg", caption: "the long way home", x: -150, y: 36, r: -8, focus: "50% 50%" },
  { src: "/flash_photo1.jpg", caption: "tacos, then the late film", x: 0, y: 0, r: 2, focus: "50% 30%" },
  { src: "/flash_photo3.jpg", caption: "karaoke. regrettably.", x: 150, y: 48, r: 7, focus: "70% 50%" },
];

/*
  Three instant prints, waiting in a pile until the scroll line reaches the
  heading (FlowLine sets data-lit on it). Then they're dealt out into a fan
  and each one develops, from a pale blank into the photo, one after the
  other. Scrolling back up gathers them in again. The motion lives in
  globals.css under .moments-print.
*/
const Moments = () => {
  const { ref, seen } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`moments mx-auto flex w-full max-w-4xl flex-col items-center gap-16 pb-32 transition-all duration-700 ease-out motion-reduce:transition-none md:flex-row md:justify-between ${
        seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="max-w-sm">
        <h2 data-flow-node className="mb-4 text-3xl font-bold">
          Less time on your phone.
          <span className="block text-gray-400">More nights like these.</span>
        </h2>
        <p className="text-lg text-gray-600">
          The rounds build up to one question: what would a first date look
          like? After that, it&apos;s over to you.
        </p>
      </div>

      <div className="relative h-[300px] w-full max-w-[420px] sm:h-[340px]">
        {PRINTS.map((print, i) => (
          <div
            key={print.src}
            className="moments-print absolute top-4 left-1/2 w-[150px] sm:w-[190px]"
            style={
              {
                "--x": `${print.x}px`,
                "--y": `${print.y}px`,
                "--r": `${print.r}deg`,
                "--i": i,
              } as CSSProperties
            }
          >
            <figure className="moments-card rounded-[3px] bg-white p-2 pb-0 shadow-[0_1px_2px_rgb(0_0_0/0.08),0_12px_32px_-12px_rgb(0_0_0/0.3)] sm:p-2.5 sm:pb-0">
              <div className="relative aspect-square overflow-hidden bg-gray-900">
                <Image
                  src={print.src}
                  alt=""
                  fill
                  sizes="190px"
                  className="moments-photo object-cover"
                  style={{ objectPosition: print.focus }}
                />
              </div>
              <figcaption className="py-3 text-center font-[family-name:var(--font-nunito)] text-xs text-gray-500 sm:py-4 sm:text-sm">
                {print.caption}
              </figcaption>
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Moments;
