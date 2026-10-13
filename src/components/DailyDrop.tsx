"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import useInView from "./useInView";

const BRAND = process.env.NEXT_PUBLIC_BRAND_COLOR ?? "#0e989d";

type Stage = "countdown" | "reveal" | "connect" | "waiting" | "spark";

// how long each stage of the loop holds, in ms
const TIMELINE: [Stage, number][] = [
  ["countdown", 2700],
  ["reveal", 2600],
  ["connect", 1000],
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

// Safari needs the prefixed property to reliably hide the flipped face
const FACE = "backface-hidden [-webkit-backface-visibility:hidden]";

const DailyDrop = () => {
  const [stage, setStage] = useState<Stage>("countdown");
  const [seconds, setSeconds] = useState(3);
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
    const id = setTimeout(() => {
      const next = TIMELINE[(i + 1) % TIMELINE.length][0];
      // reset in the same render as the stage change, so "01" never flashes
      if (next === "countdown") setSeconds(3);
      setStage(next);
    }, TIMELINE[i][1]);
    return () => clearTimeout(id);
  }, [stage, reduceMotion, inView]);

  useEffect(() => {
    if (stage !== "countdown" || !inView) return;
    const id = setInterval(() => setSeconds((s) => Math.max(1, s - 1)), 900);
    return () => clearInterval(id);
  }, [stage, inView]);

  const flipped = stage !== "countdown";
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

      <div ref={cardRef} className="relative perspective-[1200px]" aria-hidden>
        {/* soft glow behind the card when it's a match */}
        <div
          className={`absolute inset-6 rounded-full blur-3xl transition-all duration-700 ${
            stage === "spark" ? "scale-110 opacity-40" : "scale-90 opacity-0"
          }`}
          style={{ backgroundColor: BRAND }}
        />
        <div
          className={`relative h-[440px] w-[min(300px,calc(100vw-4rem))] transition-transform duration-700 ease-in-out will-change-transform transform-3d motion-reduce:transition-none ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          {/* back of the card: waiting for today's drop */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-3xl bg-white shadow-xl ring-1 ring-gray-100 ${FACE}`}
          >
            <Image
              src="/jinx-mark-brand.png"
              alt=""
              width={240}
              height={328}
              className="mb-2 h-16 w-auto animate-pulse motion-reduce:animate-none"
            />
            <p className="text-sm uppercase tracking-widest text-gray-500">
              Today&apos;s match in
            </p>
            <p className="font-nunito text-5xl font-extrabold text-gray-900 tabular-nums">
              00<span className="text-gray-300">:</span>00
              <span className="text-gray-300">:</span>
              <span style={{ color: BRAND }}>0</span>
              {/*
                the seconds roll up like an odometer. Only the transform
                changes, and the reset back to 3 snaps without a transition.
              */}
              <span className="inline-flex h-[1.1em] overflow-hidden leading-[1.1em]">
                <span
                  className={`flex flex-col will-change-transform ${
                    seconds === 3
                      ? ""
                      : "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                  }`}
                  style={{
                    color: BRAND,
                    transform: `translateY(${-(3 - seconds) * 1.1}em)`,
                  }}
                >
                  {[3, 2, 1].map((n) => (
                    <span key={n} className="h-[1.1em]">
                      {n}
                    </span>
                  ))}
                </span>
              </span>
            </p>
          </div>

          {/* front of the card: the match */}
          <div
            className={`absolute inset-0 flex flex-col overflow-hidden rounded-3xl bg-white p-4 shadow-xl ring-1 ring-gray-100 rotate-y-180 ${FACE}`}
          >
            <div className="relative h-52 overflow-hidden rounded-2xl">
              <Image
                src="/profile_image_example.jpg"
                alt=""
                fill
                sizes="268px"
                className="object-cover object-[50%_35%]"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
              <Image
                src="/jinx-wordmark-white.png"
                alt=""
                width={480}
                height={238}
                className="absolute top-3 left-4 h-5 w-auto opacity-90 drop-shadow"
              />
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

            {/* both states stay mounted and crossfade, so nothing jumps */}
            <div className="grid h-11 *:col-start-1 *:row-start-1">
              <div
                className={`flex gap-2 transition-opacity duration-300 ${
                  waiting ? "opacity-0" : "opacity-100"
                }`}
              >
                <span className="flex flex-1 items-center justify-center rounded-full bg-gray-100 text-gray-700">
                  Decline
                </span>
                {/*
                  The tap is keyframes on layers that are composited from the
                  start (no transitions, no box-shadow ring), which keeps iOS
                  Safari from flickering inside the 3D-flipped card.
                */}
                <span className="relative flex flex-1">
                  <span
                    className={`absolute inset-0 rounded-full will-change-transform ${
                      stage === "connect"
                        ? "animate-[tap-halo_700ms_ease-out_250ms_both]"
                        : "opacity-0"
                    }`}
                    style={{ backgroundColor: BRAND }}
                  />
                  <span
                    className={`relative flex flex-1 items-center justify-center rounded-full font-semibold text-white will-change-transform ${
                      stage === "connect"
                        ? "animate-[tap-press_450ms_ease-out_both]"
                        : ""
                    }`}
                    style={{ backgroundColor: BRAND }}
                  >
                    Connect
                  </span>
                  <span
                    className={`absolute top-1/2 left-1/2 -mt-5 -ml-5 h-10 w-10 rounded-full bg-black/15 will-change-transform ${
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
                Waiting on them
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

            {/*
              the spark moment. It fades in, but when the card flips back to
              the countdown it stays solid until the face has turned away
              (the flip is 700ms), otherwise a half-faded teal flashes past.
            */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center gap-3 text-white transition-opacity ${
                stage === "spark"
                  ? "opacity-100 duration-500"
                  : "pointer-events-none opacity-0 duration-0 delay-700"
              }`}
              style={{ backgroundColor: BRAND }}
            >
              {(stage === "spark" || stage === "countdown") && (
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
                  <Image
                    src="/jinx-mark-white.png"
                    alt=""
                    width={240}
                    height={328}
                    className="mx-auto block h-16 w-auto animate-[spark-pop_0.6s_ease-out_both] motion-reduce:animate-none"
                  />
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
