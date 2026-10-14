"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import useInView from "./useInView";

const BRAND = process.env.NEXT_PUBLIC_BRAND_COLOR ?? "rgb(19, 19, 19)";

type Stage = "options" | "chosen" | "answering" | "reveal";

// how long each stage of the loop holds, in ms
const TIMELINE: [Stage, number][] = [
  ["options", 1600],
  ["chosen", 1400],
  ["answering", 2200],
  ["reveal", 3600],
];

const PROMPTS = [
  "What's a small thing that always makes your day?",
  "Which film could you rewatch forever?",
  "What's the best meal you've ever had?",
];
const CHOSEN = 1;

const STEPS = [
  {
    title: "Pick a question",
    body: "Each round, Jinx suggests three questions based on both your profiles. You take turns choosing.",
  },
  {
    title: "Answer, then reveal",
    body: "You both write a short answer. Neither of you sees the other's until you've both replied.",
  },
  {
    title: "Light, then deeper",
    body: "Early rounds are easy icebreakers. Later ones get into what matters to you, and what a first date might look like.",
  },
  {
    title: "Chat when you're both ready",
    body: "After five rounds you can both choose to open free chat. Nobody sees a “not yet”.",
  },
];

const Conversation = () => {
  const [stage, setStage] = useState<Stage>("options");
  const [reduceMotion, setReduceMotion] = useState(false);
  const { ref: sectionRef, seen } = useInView<HTMLElement>();
  // the loop runs only while the card itself is mostly on screen
  const { ref: cardRef, inView } = useInView<HTMLDivElement>({
    threshold: 0.5,
    rootMargin: "0px",
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduceMotion(true);
      setStage("reveal");
    }
  }, []);

  useEffect(() => {
    if (reduceMotion || !inView) return;
    const i = TIMELINE.findIndex(([s]) => s === stage);
    const id = setTimeout(
      () => setStage(TIMELINE[(i + 1) % TIMELINE.length][0]),
      TIMELINE[i][1],
    );
    return () => clearTimeout(id);
  }, [stage, reduceMotion, inView]);

  const picking = stage === "options" || stage === "chosen";
  const revealed = stage === "reveal";

  return (
    <section
      ref={sectionRef}
      className={`mx-auto flex w-full max-w-4xl flex-col items-center gap-12 pb-24 transition-all duration-700 ease-out motion-reduce:transition-none md:flex-row-reverse md:justify-between ${
        seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="max-w-sm">
        <h2 data-flow-node className="mb-8 text-3xl font-bold">
          One question at a time.
        </h2>
        <ol className="flex flex-col gap-6">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                style={{ backgroundColor: BRAND }}
              >
                {i + 1}
              </span>
              <div>
                <p className="text-lg font-semibold">{step.title}</p>
                <p className="text-gray-600">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
          The AI only sees your interests and profile answers. Never your name,
          photos or where you are. Numbers and handles stay blocked until you
          both open chat.
        </p>
      </div>

      {/* the round card */}
      <div
        ref={cardRef}
        aria-hidden
        className="mx-auto relative flex h-[440px] w-[min(300px,calc(100vw-4rem))] shrink-0 flex-col rounded-3xl bg-white p-5 shadow-xl ring-1 ring-gray-100"
      >
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Round 2 with Maya
          </p>
          <Image
            src="/jinx-mark-brand.png"
            alt=""
            width={240}
            height={328}
            className="h-5 w-auto brightness-0"
          />
        </div>

        <div className="relative mt-4 flex-1">
          {/* choosing a question */}
          <div
            className={`absolute inset-0 flex flex-col gap-2 transition-opacity duration-500 ${
              picking ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <p className="mb-1 text-sm text-gray-500">Your turn to choose</p>
            {PROMPTS.map((prompt, i) => {
              const chosen = stage === "chosen" && i === CHOSEN;
              const faded = stage === "chosen" && i !== CHOSEN;
              return (
                <div
                  key={prompt}
                  className={`rounded-2xl border p-3 text-sm transition-all duration-500 ${
                    chosen
                      ? "scale-[1.02] text-white shadow-md"
                      : "border-gray-200 text-gray-800"
                  } ${faded ? "opacity-40" : ""}`}
                  style={
                    chosen
                      ? { backgroundColor: BRAND, borderColor: BRAND }
                      : undefined
                  }
                >
                  {prompt}
                </div>
              );
            })}
          </div>

          {/* answering and the reveal */}
          <div
            className={`absolute inset-0 flex flex-col gap-3 transition-opacity duration-500 ${
              picking ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <p className="mb-1 text-lg font-semibold leading-snug text-gray-900">
              {PROMPTS[CHOSEN]}
            </p>

            <div className="mr-8 rounded-2xl rounded-bl-md bg-gray-100 p-3">
              <p className="mb-1 text-xs font-semibold text-gray-500">Maya</p>
              <p
                className={`text-gray-800 transition-[filter,opacity] duration-700 ${
                  revealed ? "opacity-100 blur-none" : "opacity-60 blur-sm"
                }`}
              >
                Paddington 2. It fixes any bad week.
              </p>
            </div>

            <div
              className="relative ml-8 rounded-2xl rounded-br-md p-3 text-white"
              style={{ backgroundColor: BRAND }}
            >
              <p className="mb-1 text-xs font-semibold text-white/75">You</p>
              <p
                className={`transition-[filter,opacity] duration-700 ${
                  revealed ? "opacity-100 blur-none" : "opacity-60 blur-sm"
                }`}
              >
                Paddington 2, no contest.
              </p>
              {revealed && (
                <span className="absolute -bottom-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-base shadow-md ring-1 ring-gray-100 animate-[spark-pop_0.5s_ease-out_0.9s_both] motion-reduce:animate-none">
                  😂
                </span>
              )}
            </div>

            <p
              className={`mt-auto text-center text-sm transition-opacity duration-500 ${
                revealed ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {revealed ? (
                "Both answered. Revealed together."
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  Waiting for both answers
                  <span className="flex gap-1 pt-1">
                    {[0, 150, 300].map((d) => (
                      <span
                        key={d}
                        className="h-1 w-1 rounded-full bg-gray-400 animate-[dot-wave_1.2s_ease-in-out_infinite]"
                        style={{ animationDelay: `${d}ms` }}
                      />
                    ))}
                  </span>
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Conversation;
