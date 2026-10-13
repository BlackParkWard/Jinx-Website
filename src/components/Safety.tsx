"use client";

import useInView from "./useInView";

const POINTS = [
  {
    lead: "Nobody sees a no.",
    body: "Decisions are private. If it isn't mutual, you just get tomorrow's match.",
  },
  {
    lead: "Numbers stay private.",
    body: "Phone numbers, emails and handles are blocked until you both open chat.",
  },
  {
    lead: "Everything is checked.",
    body: "Photos are reviewed before a match sees them, and every answer and message is moderated.",
  },
  {
    lead: "The AI never sees who you are.",
    body: "It gets your interests and profile answers. Never your name, photos or location.",
  },
  {
    lead: "You can always leave.",
    body: "End a connection, block or report at any time. Blocking ends it straight away.",
  },
];

const Safety = () => {
  const { ref, seen } = useInView<HTMLElement>();

  return (
    <section
      id="safety"
      ref={ref}
      className={`mx-auto grid w-full max-w-4xl gap-8 px-2 pb-24 sm:px-6 md:px-12 transition-all duration-700 ease-out motion-reduce:transition-none md:grid-cols-[1fr_1.6fr] md:gap-16 ${
        seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div>
        <h2 data-flow-node className="mb-4 text-3xl font-bold">
          Built to feel safe.
        </h2>
        <p className="text-gray-600">
          Meeting someone new should feel calm, not risky. So the guardrails are
          built in from the first match.
        </p>
      </div>
      <ul className="divide-y divide-gray-200 border-t border-gray-200">
        {POINTS.map((point) => (
          <li key={point.lead} className="py-5 text-gray-600">
            <span className="font-semibold text-gray-900">{point.lead}</span>{" "}
            {point.body}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Safety;
