"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const BRAND = process.env.NEXT_PUBLIC_BRAND_COLOR ?? "#0e989d";

type Stage = "countdown" | "reveal" | "connect" | "waiting" | "spark";

// how long each stage of the loop holds, in ms
const TIMELINE: [Stage, number][] = [
  ["countdown", 2700],
  ["reveal", 2600],
  ["connect", 500],
  ["waiting", 2000],
  ["spark", 3800],
];

const STEPS: { title: string; body: string; stages: Stage[] }[] = [
  {
    title: "Your match drops at 7pm",
    body: "One person a day, picked for you. No feed, no swiping.",
    stages: ["countdown", "reveal"],
  },
  {
    title: "Connect, or let it pass",
    body: "Decide in private. Nobody ever sees a no.",
    stages: ["connect", "waiting"],
  },
  {
    title: "Both connect? It's a Jinx",
    body: "Get to know each other one question at a time.",
    stages: ["spark"],
  },
];

const EMBERS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  const dist = i % 2 ? 70 : 95;
  return {
    dx: Math.cos(angle) * dist,
    dy: Math.sin(angle) * dist,
    delay: (i % 3) * 60,
  };
});

const SparkGlyph = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill="currentColor"
  >
    <path d="M12 2c.9 5.6 3.4 8.6 10 10-6.6 1.4-9.1 4.4-10 10-.9-5.6-3.4-8.6-10-10 6.6-1.4 9.1-4.4 10-10Z" />
  </svg>
);

const DailyDrop = () => {
  const [stage, setStage] = useState<Stage>("countdown");
  const [seconds, setSeconds] = useState(3);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduceMotion(true);
      setStage("reveal");
    }
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const i = TIMELINE.findIndex(([s]) => s === stage);
    const id = setTimeout(
      () => setStage(TIMELINE[(i + 1) % TIMELINE.length][0]),
      TIMELINE[i][1],
    );
    return () => clearTimeout(id);
  }, [stage, reduceMotion]);

  useEffect(() => {
    if (stage !== "countdown") return;
    setSeconds(3);
    const id = setInterval(() => setSeconds((s) => Math.max(1, s - 1)), 900);
    return () => clearInterval(id);
  }, [stage]);

  const flipped = stage !== "countdown";

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center gap-12 pb-20 md:flex-row md:justify-between">
      <div className="max-w-sm">
        <h2 className="mb-8 text-3xl font-bold">One match. Every day.</h2>
        <ol className="flex flex-col gap-6">
          {STEPS.map((step) => {
            const active = step.stages.includes(stage);
            return (
              <li
                key={step.title}
                className={`border-l-4 pl-4 transition-all duration-500 ${active ? "opacity-100" : "opacity-40"}`}
                style={{ borderColor: active ? BRAND : "transparent" }}
              >
                <p className="text-lg font-semibold">{step.title}</p>
                <p className="text-gray-600">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="perspective-[1200px]" aria-hidden>
        <div
          className={`relative h-[440px] w-[300px] transition-transform duration-700 ease-in-out transform-3d motion-reduce:transition-none ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          {/* back of the card: waiting for today's drop */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-3xl bg-gray-900 text-white shadow-xl backface-hidden">
            <SparkGlyph className="h-12 w-12 animate-pulse" />
            <p className="text-sm uppercase tracking-widest text-white/60">
              Today&apos;s match in
            </p>
            <p className="font-mono text-4xl tabular-nums">00:00:0{seconds}</p>
          </div>

          {/* front of the card: the match */}
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl bg-white p-4 shadow-xl ring-1 ring-gray-100 backface-hidden rotate-y-180">
            <div className="relative h-52 overflow-hidden rounded-2xl">
              <Image
                src="/profile_image_example.jpg"
                alt=""
                fill
                sizes="268px"
                className="object-cover object-[50%_35%]"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-4 text-left">
                <p className="text-xl font-semibold text-white">Maya, 28</p>
                <p className="text-sm text-white/85">Less than 5 miles away</p>
              </div>
            </div>
            <div className="mt-4 flex-1">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                A perfect Sunday
              </p>
              <p className="mt-1 text-gray-800">
                Long walk, roast dinner, early night.
              </p>
            </div>

            {stage === "waiting" ? (
              <p className="flex h-11 items-center justify-center gap-1 text-gray-500">
                Waiting on them
                <span className="animate-pulse">…</span>
              </p>
            ) : (
              <div className="flex gap-2">
                <span className="flex h-11 flex-1 items-center justify-center rounded-full bg-gray-100 text-gray-700">
                  Decline
                </span>
                <span
                  className={`flex h-11 flex-1 items-center justify-center rounded-full font-semibold text-white transition-transform duration-200 ${
                    stage === "connect" ? "scale-95 ring-4 ring-offset-2" : ""
                  }`}
                  style={{
                    backgroundColor: BRAND,
                    ["--tw-ring-color" as string]: `${BRAND}55`,
                  }}
                >
                  Connect
                </span>
              </div>
            )}

            {/* the spark moment */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center gap-3 text-white transition-opacity duration-500 ${
                stage === "spark"
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
              style={{ backgroundColor: BRAND }}
            >
              {stage === "spark" && (
                <div className="relative mb-2 h-16 w-16">
                  {!reduceMotion &&
                    EMBERS.map((e) => (
                      <span
                        key={`${e.dx}-${e.dy}`}
                        className="absolute top-1/2 left-1/2 -mt-1 -ml-1 h-2 w-2 rounded-full bg-white animate-[spark-ember_0.9s_ease-out_both]"
                        style={{
                          ["--dx" as string]: `${e.dx}px`,
                          ["--dy" as string]: `${e.dy}px`,
                          animationDelay: `${e.delay}ms`,
                        }}
                      />
                    ))}
                  <SparkGlyph className="h-16 w-16 animate-[spark-pop_0.6s_ease-out_both] motion-reduce:animate-none" />
                </div>
              )}
              <p className="text-3xl font-bold">It&apos;s a Jinx!</p>
              <p className="text-white/85">You both connected.</p>
              <span
                className="mt-4 rounded-full bg-white px-5 py-2 text-sm font-semibold"
                style={{ color: BRAND }}
              >
                Start your first round
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyDrop;
