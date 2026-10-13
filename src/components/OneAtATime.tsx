"use client";

import useInView from "./useInView";

const OneAtATime = () => {
  const { ref, seen } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`mx-auto max-w-xl pb-24 text-center transition-all duration-700 ease-out motion-reduce:transition-none ${
        seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <h2 data-flow-node className="mb-4 text-3xl font-bold">
        One person at a time.
      </h2>
      <p className="text-lg text-gray-600">
        While you&apos;re getting to know someone, new matches pause. End it
        whenever you like, and you&apos;re back in the next day&apos;s drop.
      </p>
    </section>
  );
};

export default OneAtATime;
