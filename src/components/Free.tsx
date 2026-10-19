"use client";

import useInView from "./useInView";

const BRAND = process.env.NEXT_PUBLIC_BRAND_COLOR ?? "rgb(19, 19, 19)";

// keep in step with the terms page, which says Jinx is currently free
const POINTS = ["No subscription", "No paid boosts", "No premium tier"];

const Free = () => {
  const { ref, seen } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`mx-auto max-w-xl pb-28 text-center transition-all duration-700 ease-out motion-reduce:transition-none ${
        seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <h2 data-flow-node className="mb-4 text-3xl font-bold">
        Completely free.
      </h2>
      <p className="text-lg text-gray-600">
        Everyone gets the same one match a day. Nobody can pay to be seen more,
        and nothing sits behind a paywall.
      </p>
      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {POINTS.map((point, i) => (
          <li
            key={point}
            className={`flex items-center gap-2 rounded-full bg-gray-100 py-2 pr-4 pl-2.5 text-sm font-medium text-gray-800 transition-all duration-500 ease-out motion-reduce:transition-none ${
              seen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: `${300 + i * 100}ms` }}
          >
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: BRAND }}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-3 w-3 fill-none stroke-current stroke-[3]"
              >
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </span>
            {point}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Free;
