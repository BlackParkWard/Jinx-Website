"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// how long the logo holds the screen, then how long it takes to fade away
const SHOW = 2000;
const FADE = 500;

/*
  A white screen with the logo pulsing, over everything on the first load.
  It's rendered on the server so it's there before the page paints, then
  fades out and unmounts. The scroll lock is a server-rendered style tag
  too, so no scrollbar flashes before React takes over. It lives in the
  root layout, so moving between pages doesn't bring it back. The pulse
  lives in globals.css.
*/
const LoadingScreen = () => {
    const [leaving, setLeaving] = useState(false);
    const [gone, setGone] = useState(false);

    useEffect(() => {
        const fade = setTimeout(() => setLeaving(true), SHOW);
        const done = setTimeout(() => setGone(true), SHOW + FADE);
        return () => {
            clearTimeout(fade);
            clearTimeout(done);
        };
    }, []);

    if (gone) return null;

    return (
        <div
            aria-hidden
            className={`fixed inset-0 z-[100] flex items-center overflow-y-scroll justify-center bg-white transition-opacity ease-out ${
                leaving ? "pointer-events-none opacity-0" : ""
            }`}
            style={{ transitionDuration: `${FADE}ms` }}
        >
            {/* lock the page behind from the very first paint, not after hydration */}
            {!leaving && <style>{"html { overflow: hidden; }"}</style>}
            {/* hold anything marked data-intro on its first frame until the screen has gone */}
            <style>{"[data-intro], [data-intro] * { animation-play-state: paused !important; }"}</style>
            {/* the source is a padded square, so crop to the wordmark, as the header does */}
            <span className="loading-logo relative block h-20 aspect-[1510/758] overflow-hidden sm:h-24">
                <Image
                    src="/jinx_logo.svg"
                    alt=""
                    width={2000}
                    height={2000}
                    sizes="240px"
                    preload
                    className="absolute max-w-none"
                    style={{ width: "132.45%", height: "auto", left: "-13.58%", top: "-83.25%" }}
                />
            </span>
        </div>
    );
};

export default LoadingScreen;
