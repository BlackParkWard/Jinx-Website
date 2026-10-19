"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import useInView from "./useInView";

const BRAND = process.env.NEXT_PUBLIC_BRAND_COLOR ?? "rgb(19, 19, 19)";

type Stage = "options" | "chosen" | "answering" | "reveal";

// how long each stage of the loop holds, in ms
const TIMELINE: [Stage, number][] = [
  ["options", 2000],
  ["chosen", 1300],
  ["answering", 2800],
  ["reveal", 3800],
];

const PROMPTS = [
  "What's a small thing that always makes your day?",
  "Which film could you rewatch forever?",
  "What's the best meal you've ever had?",
];
const CHOSEN = 1;

const YOURS = "Paddington 2, no contest.";
const THEIRS = "Paddington 2. It fixes any bad week.";

// rounds before free chat can open, and the one shown in the card
const ROUNDS = 5;
const ROUND = 2;

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

// the two screens of a round swap with a short gap, so they never overlap
const SCREEN = "absolute inset-0 flex flex-col transition-opacity";
const shown = (on: boolean) =>
  on
    ? "opacity-100 duration-300 delay-200"
    : "pointer-events-none opacity-0 duration-200";

const Conversation = () => {
  const [stage, setStage] = useState<Stage>("options");
  // how much of your answer has been typed
  const [typed, setTyped] = useState(0);
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
      setTyped(YOURS.length);
      setStage("reveal");
    }
  }, []);

  useEffect(() => {
    if (reduceMotion || !inView) return;
    const i = TIMELINE.findIndex(([s]) => s === stage);
    const id = setTimeout(() => {
      const next = TIMELINE[(i + 1) % TIMELINE.length][0];
      if (next === "answering") setTyped(0);
      setStage(next);
    }, TIMELINE[i][1]);
    return () => clearTimeout(id);
  }, [stage, reduceMotion, inView]);

  // type your answer out once the answer screen has faded in
  useEffect(() => {
    if (stage !== "answering" || !inView) return;
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      id = setInterval(
        () => setTyped((n) => Math.min(YOURS.length, n + 1)),
        45,
      );
    }, 500);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [stage, inView]);

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
        <p className="mt-8 flex gap-3 rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 fill-none stroke-gray-500 stroke-2"
          >
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          <span>
            The AI only sees your interests and profile answers. Never your
            name, photos or where you are. Numbers and handles stay blocked
            until you both open chat.
          </span>
        </p>
      </div>

      {/* the round card */}
      <div
        ref={cardRef}
        aria-hidden
        className="relative flex h-[460px] w-[min(300px,calc(100vw-4rem))] shrink-0 flex-col rounded-[28px] bg-white p-5 shadow-[0_24px_48px_-16px_rgb(0_0_0/0.25)] ring-1 ring-black/5"
      >
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
            Round {ROUND} · {picking ? "Your pick" : "With Maya"}
          </p>
          <Image
            src="/jinx-mark-brand.png"
            alt=""
            width={240}
            height={328}
            className="h-5 w-auto brightness-0"
          />
        </div>

        {/* rounds so far, out of the five before free chat */}
        <div className="mt-3 flex gap-1">
          {Array.from({ length: ROUNDS }, (_, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length row
              key={i}
              className="h-1 flex-1 rounded-full"
              style={{
                backgroundColor:
                  i < ROUND - 1 || (i === ROUND - 1 && revealed)
                    ? BRAND
                    : i === ROUND - 1
                      ? "#d1d5db"
                      : "#f3f4f6",
                transition: "background-color 500ms",
              }}
            />
          ))}
        </div>

        <div className="relative mt-5 flex-1">
          {/* choosing a question */}
          <div className={`${SCREEN} gap-2 ${shown(picking)}`}>
            <p className="mb-2 text-lg leading-snug font-semibold text-gray-900">
              Pick a question for you and Maya
            </p>
            {PROMPTS.map((prompt, i) => {
              const chosen = stage === "chosen" && i === CHOSEN;
              const faded = stage === "chosen" && i !== CHOSEN;
              return (
                <div
                  key={prompt}
                  className={`rounded-2xl border p-3 text-sm leading-snug transition-all duration-500 ${
                    chosen
                      ? "scale-[1.02] text-white shadow-md"
                      : "border-gray-200 text-gray-800"
                  } ${faded ? "opacity-35" : ""}`}
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
            <p className="mt-auto flex items-center justify-center gap-1.5 text-sm text-gray-400">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-3.5 w-3.5 fill-none stroke-current stroke-2"
              >
                <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
              </svg>
              Shuffle for 3 new ones
            </p>
          </div>

          {/* answering and the reveal */}
          <div className={`${SCREEN} gap-3 ${shown(!picking)}`}>
            <p className="mb-1 text-lg leading-snug font-semibold text-gray-900">
              {PROMPTS[CHOSEN]}
            </p>

            {/* their answer stays sealed until you've both replied */}
            <div className="mr-8 rounded-2xl rounded-bl-md bg-gray-100 p-3">
              <p className="mb-1 text-xs font-semibold text-gray-500">Maya</p>
              <div className="grid *:col-start-1 *:row-start-1">
                <p
                  className={`text-gray-800 transition-opacity duration-500 ${
                    revealed ? "opacity-100 delay-200" : "opacity-0"
                  }`}
                >
                  {THEIRS}
                </p>
                <p
                  className={`flex items-center gap-1.5 text-sm text-gray-500 transition-opacity duration-300 ${
                    revealed ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-3.5 w-3.5 fill-none stroke-current stroke-2"
                  >
                    <rect x="4" y="11" width="16" height="10" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                  Answered
                </p>
              </div>
            </div>

            <div
              className="relative ml-8 rounded-2xl rounded-br-md p-3 text-white"
              style={{ backgroundColor: BRAND }}
            >
              <p className="mb-1 text-xs font-semibold text-white/70">You</p>
              {/* the full answer holds the bubble's height while it types */}
              <p className="grid *:col-start-1 *:row-start-1">
                <span className="invisible">{YOURS}</span>
                <span>
                  {YOURS.slice(0, typed)}
                  {stage === "answering" && (
                    <span className="ml-px inline-block h-[1.05em] w-px translate-y-[0.15em] bg-white/80 animate-pulse" />
                  )}
                </span>
              </p>
              {revealed && (
                <span className="absolute -bottom-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-base shadow-md ring-1 ring-gray-100 animate-[spark-pop_0.5s_ease-out_0.9s_both] motion-reduce:animate-none">
                  😂
                </span>
              )}
            </div>

            <div className="mt-auto grid *:col-start-1 *:row-start-1">
              <p
                className={`text-center text-sm text-gray-400 transition-opacity duration-300 ${
                  revealed ? "opacity-0" : "opacity-100"
                }`}
              >
                Your answer stays hidden until Maya answers too.
              </p>
              <span
                className={`justify-self-center rounded-full px-5 py-2 text-sm font-semibold text-white transition-opacity duration-500 ${
                  revealed ? "opacity-100 delay-1000" : "opacity-0"
                }`}
                style={{ backgroundColor: BRAND }}
              >
                Next round
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Conversation;
