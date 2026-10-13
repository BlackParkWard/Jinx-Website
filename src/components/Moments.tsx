"use client";

import Image from "next/image";
import useInView from "./useInView";

// object-position keeps the people in frame once cropped to portrait
const PHOTOS = [
  { src: "/flash_photo1.jpg", position: "50% 40%", tilt: "-rotate-3" },
  {
    src: "/flash_photo2.jpg",
    position: "45% 50%",
    tilt: "rotate-2",
    offset: true,
  },
  { src: "/flash_photo4.jpg", position: "50% 50%", tilt: "-rotate-2" },
  {
    src: "/flash_photo3.jpg",
    position: "75% 50%",
    tilt: "rotate-3",
    offset: true,
  },
];

const Moments = () => {
  const { ref, seen } = useInView<HTMLElement>(0.2);

  return (
    <section ref={ref} className="mx-auto w-full max-w-4xl pb-28">
      <ul className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
        {PHOTOS.map((photo, i) => (
          <li
            key={photo.src}
            className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
              photo.offset ? "md:mt-6" : ""
            } ${
              seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {/* the tilt is on the inner frame so hover can straighten it */}
            <div
              className={`bg-white p-2 pb-8 shadow-lg ring-1 ring-gray-100 transition-transform duration-300 hover:rotate-0 hover:-translate-y-1 ${photo.tilt}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 210px, 45vw"
                  className="object-cover"
                  style={{ objectPosition: photo.position }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* the colour lives on the wrapper so the line can grey it out */}
      <div data-flow-node className="text-2xl">
        <p
          className={`mt-14 text-center font-semibold transition-all delay-500 duration-700 ease-out motion-reduce:transition-none ${
            seen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Less time on your phone.{" "}
          <span className="text-gray-400">More nights like these.</span>
        </p>
      </div>
    </section>
  );
};

export default Moments;
