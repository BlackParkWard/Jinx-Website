"use client";

import { QUESTIONS } from "@/lib/faq";
import useInView from "./useInView";

const Faq = () => {
  const { ref, seen } = useInView<HTMLElement>();

  return (
    <section
      id="questions"
      ref={ref}
      className={`mx-auto grid w-full max-w-4xl gap-8 px-2 pb-24 sm:px-6 md:px-12 transition-all duration-700 ease-out motion-reduce:transition-none md:grid-cols-[1fr_1.6fr] md:gap-16 ${
        seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <h2 data-flow-node className="text-3xl font-bold">
        Questions.
      </h2>
      <div className="divide-y divide-gray-200 border-t border-gray-200">
        {QUESTIONS.map(({ q, a }) => (
          <details key={q} className="faq-item group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
              {q}
              {/* a thin plus that turns into a minus */}
              <span aria-hidden className="relative h-3 w-3 shrink-0">
                <span className="absolute top-1/2 left-0 h-px w-3 bg-gray-400" />
                <span className="absolute top-0 left-1/2 h-3 w-px bg-gray-400 transition-transform duration-300 group-open:scale-y-0 motion-reduce:transition-none" />
              </span>
            </summary>
            <p className="pr-9 pb-5 text-gray-600">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default Faq;
