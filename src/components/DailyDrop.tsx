"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import useInView from "./useInView";

const BRAND = process.env.NEXT_PUBLIC_BRAND_COLOR ?? "rgb(19, 19, 19)";

type Stage = "match" | "connect" | "waiting" | "spark";

// how long each stage of the loop holds, in ms
const TIMELINE: [Stage, number][] = [
  ["match", 2400],
  ["connect", 1000],
  ["waiting", 1900],
  ["spark", 3600],
];

const STEPS: { title: string; body: string; stages: Stage[] }[] = [
  {
    title: "Your match drops at 7pm",
    body: "One person a day, picked for you. No feed, no swiping.",
    stages: ["match"],
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
    delay: 150 + (i % 3) * 60,
  };
});

// both cards share a footprint and sit stacked in one grid cell
const CARD =
  "col-start-1 row-start-1 h-[460px] w-[min(300px,calc(100vw-4rem))] rounded-[28px] shadow-[0_24px_48px_-16px_rgb(0_0_0/0.25)] transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

const DailyDrop = () => {
  const [stage, setStage] = useState<Stage>("match");
  // bumps every loop so the spark's one-shot animations replay
  const [round, setRound] = useState(0);
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
    }
  }, []);

  useEffect(() => {
    if (reduceMotion || !inView) return;
    const i = TIMELINE.findIndex(([s]) => s === stage);
    const id = setTimeout(() => {
      const next = TIMELINE[(i + 1) % TIMELINE.length][0];
      if (next === "spark") setRound((r) => r + 1);
      setStage(next);
    }, TIMELINE[i][1]);
    return () => clearTimeout(id);
  }, [stage, reduceMotion, inView]);

  const spark = stage === "spark";
  const waiting = stage === "waiting";

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className={`mx-auto flex w-full max-w-4xl flex-col items-center gap-12 pb-20 transition-all duration-700 ease-out motion-reduce:transition-none md:flex-row md:justify-between ${
        seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="max-w-sm">
        <h2 data-flow-node className="mb-8 text-3xl font-bold">
          The new way to date.
        </h2>
        <ol className="flex flex-col gap-6">
          {STEPS.map((step) => {
            const active = step.stages.includes(stage);
            return (
              <li
                key={step.title}
                className={`border-l-4 pl-4 transition-all duration-500 ${active ? "translate-x-1 opacity-100" : "opacity-40"}`}
                style={{ borderColor: active ? BRAND : "transparent" }}
              >
                <p className="text-lg font-semibold">{step.title}</p>
                <p className="text-gray-600">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </div>

      {/*
        The profile and the Jinx screen are separate cards that crossfade.
        Laying one over the other let a hairline of the card beneath
        show round the rounded edges.
      */}
      <div ref={cardRef} className="grid" aria-hidden>
        {/* the match */}
        <div
          className={`${CARD} flex flex-col overflow-hidden bg-white p-3 ring-1 ring-black/5 ${
            spark
              ? "pointer-events-none scale-[0.94] opacity-0"
              : "scale-100 opacity-100"
          }`}
        >
          <div className="relative h-60 shrink-0 overflow-hidden rounded-[20px]">
            <Image
              src="/profile_image_example.jpg"
              alt=""
              fill
              sizes="276px"
              className="object-cover object-[50%_35%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/25" />
            <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-gray-900 uppercase backdrop-blur">
              Today&apos;s match
            </span>
            <div className="absolute bottom-3 left-4 text-left">
              <p className="text-2xl font-bold text-white">Maya, 28</p>
              <p className="text-sm text-white/85">Less than 5 miles away</p>
            </div>
          </div>

          <div className="flex-1 px-1 pt-4">
            <p className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
              A perfect Sunday
            </p>
            <p className="mt-1 leading-snug text-gray-800">
              Long walk, roast dinner, early night.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5 text-xs text-gray-600">
              {["Hiking", "Cooking", "Live music"].map((tag) => (
                <span key={tag} className="rounded-full bg-gray-100 px-2.5 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* both states stay mounted and crossfade, so nothing jumps */}
          <div className="grid h-11 *:col-start-1 *:row-start-1">
            <div
              className={`flex gap-2 transition-opacity duration-300 ${
                waiting ? "opacity-0" : "opacity-100"
              }`}
            >
              <span className="flex flex-1 items-center justify-center rounded-full bg-gray-100 font-medium text-gray-700">
                Pass
              </span>
              <span className="relative flex flex-1">
                <span
                  className={`absolute inset-0 rounded-full ${
                    stage === "connect"
                      ? "animate-[tap-halo_700ms_ease-out_250ms_both]"
                      : "opacity-0"
                  }`}
                  style={{ backgroundColor: BRAND }}
                />
                <span
                  className={`relative flex flex-1 items-center justify-center rounded-full font-semibold text-white ${
                    stage === "connect"
                      ? "animate-[tap-press_450ms_ease-out_both]"
                      : ""
                  }`}
                  style={{ backgroundColor: BRAND }}
                >
                  Connect
                </span>
                <span
                  className={`absolute top-1/2 left-1/2 -mt-5 -ml-5 h-10 w-10 rounded-full bg-white/30 ${
                    stage === "connect"
                      ? "animate-[tap-touch_500ms_ease-out_both]"
                      : "opacity-0"
                  }`}
                />
              </span>
            </div>
            <p
              className={`flex items-center justify-center gap-1.5 text-gray-500 transition-opacity duration-300 ${
                waiting ? "opacity-100 delay-150" : "opacity-0"
              }`}
            >
              Waiting on Maya
              <span className="flex gap-1 pt-1">
                {[0, 150, 300].map((d) => (
                  <span
                    key={d}
                    className="h-1 w-1 rounded-full bg-gray-400 animate-[dot-wave_1.2s_ease-in-out_infinite]"
                    style={{ animationDelay: `${d}ms` }}
                  />
                ))}
              </span>
            </p>
          </div>
        </div>

        {/* it's a Jinx */}
        <div
          className={`${CARD} relative flex flex-col items-center justify-center overflow-hidden bg-white px-6 text-center text-gray-900 ring-1 ring-black/5 ${
            spark
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-[1.04] opacity-0"
          }`}
        >
          {/* a soft wash from above, so the card has some depth */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-80 -translate-x-1/2 rounded-full bg-gray-100 blur-3xl" />

          <div key={round} className="relative flex flex-col items-center">
            <div className="relative mb-6 flex items-center">
              {!reduceMotion &&
                EMBERS.map((e) => (
                  <span
                    key={`${e.dx}-${e.dy}`}
                    className="absolute top-1/2 left-1/2 -mt-[3px] -ml-[3px] h-1.5 w-1.5 rounded-full animate-[spark-ember_0.9s_ease-out_both]"
                    style={{
                      backgroundColor: BRAND,
                      ["--dx" as string]: `${e.dx}px`,
                      ["--dy" as string]: `${e.dy}px`,
                      animationDelay: `${e.delay}ms`,
                    }}
                  />
                ))}
              {/* Maya and the ji mark slide in to meet */}
              <span className="relative h-16 w-16 overflow-hidden rounded-full ring-4 ring-white animate-[avatar-left_0.7s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none">
                <Image
                  src="/profile_image_example.jpg"
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover object-[50%_30%]"
                />
              </span>
              <span className="relative -ml-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 ring-4 ring-white animate-[avatar-right_0.7s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none">
                <Image
                  src="/jinx-mark-brand.png"
                  alt=""
                  width={240}
                  height={328}
                  className="h-8 w-auto brightness-0 animate-[spark-pop_0.6s_ease-out_250ms_both] motion-reduce:animate-none"
                />
              </span>
            </div>
            <Image
              src="/jinx-wordmark-white.png"
              alt=""
              width={480}
              height={238}
              className="h-12 w-auto brightness-0 animate-[fade-up_0.5s_ease-out_200ms_both] motion-reduce:animate-none"
            />
            <p className="mt-3 text-gray-500 animate-[fade-up_0.5s_ease-out_300ms_both] motion-reduce:animate-none">
              You and Maya both connected.
            </p>
            {/* <span
              className="mt-8 rounded-full px-5 py-2.5 text-sm font-semibold text-white animate-[fade-up_0.5s_ease-out_400ms_both] motion-reduce:animate-none"
              style={{ backgroundColor: BRAND }}
            >
              Start your first round
            </span> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyDrop;
