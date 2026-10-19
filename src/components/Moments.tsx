"use client";

import Image from "next/image";
import useInView from "./useInView";

// object-position keeps the people in frame once cropped to portrait
const PHOTOS = [
  { src: "/flash_photo1.jpg", position: "50% 40%" },
  { src: "/flash_photo2.jpg", position: "45% 50%" },
  { src: "/flash_photo4.jpg", position: "50% 50%" },
  { src: "/flash_photo3.jpg", position: "75% 50%" },
];

const Moments = () => {
  const { ref, seen } = useInView<HTMLElement>();

  return (
    <section ref={ref} className="mx-auto w-full max-w-4xl pb-28">
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {PHOTOS.map((photo, i) => (
          <li
            key={photo.src}
            className={`relative aspect-[3/4] overflow-hidden rounded-[20px] bg-gray-100 transition-all duration-700 ease-out motion-reduce:transition-none ${
              seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="(min-width: 896px) 212px, (min-width: 768px) 24vw, 46vw"
              className="object-cover"
              style={{ objectPosition: photo.position }}
            />
          </li>
        ))}
      </ul>
      {/* the colour lives on the wrapper so the line can grey it out */}
      <div data-flow-node className="text-2xl sm:text-3xl">
        <p
          className={`mt-12 text-center leading-tight font-bold transition-all delay-300 duration-700 ease-out motion-reduce:transition-none ${
            seen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span className="block">Less time on your phone.</span>
          <span className="block text-gray-400">More nights like these.</span>
        </p>
      </div>
    </section>
  );
};

export default Moments;
