"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const BRAND = process.env.NEXT_PUBLIC_BRAND_COLOR ?? "rgb(19, 19, 19)";

const LINKS = [
    { href: "/#how-it-works", label: "How it works" },
    { href: "/#safety", label: "Safety" },
    { href: "/#questions", label: "Questions" },
];

// the pill's height, and half the reading-progress stroke, so it sits on the border
const PILL = 52;
const INSET = 0.75;

// one half of the pill's outline, from the top middle round to the bottom middle,
// running a pixel past it so the two halves close without a seam
const half = (w: number, side: 1 | -1) => {
    const r = PILL / 2 - INSET;
    const mid = w / 2;
    const edge = side === 1 ? w - INSET : INSET;
    const corner = edge - side * r;
    const sweep = side === 1 ? 1 : 0;
    return `M ${mid} ${INSET} H ${corner} A ${r} ${r} 0 0 ${sweep} ${edge} ${PILL / 2} A ${r} ${r} 0 0 ${sweep} ${corner} ${PILL - INSET} H ${mid - side}`;
};

// a long expo-out, so the pill glides open and settles rather than stops
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const Header = () => {
    // the home hero is a dark photo, so the header floats over it in white
    const overHero = usePathname() === "/";
    // once the page moves, the bar condenses into a floating pill
    const [scrolled, setScrolled] = useState(false);
    // the hero already has a Get the app button, so only show ours past it
    const [pastHero, setPastHero] = useState(false);
    // the pill's width, to draw its outline at the right size
    const pillRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<SVGGElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const pill = pillRef.current;
        if (!pill) return;
        const observer = new ResizeObserver(() => setWidth(pill.offsetWidth));
        observer.observe(pill);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // where scroll-driven animations exist the browser draws the progress
        // itself (globals.css); otherwise it follows the scroll from here
        const cssDriven = CSS.supports("animation-timeline: scroll()");
        const onScroll = () => {
            setScrolled(window.scrollY > 24);
            setPastHero(window.scrollY > 380);
            const g = progressRef.current;
            if (cssDriven || !g) return;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
            g.style.strokeDashoffset = String(1 - progress);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const light = overHero && !scrolled;

    return (
        <header
            className={`sticky top-0 z-50 flex h-[72px] w-full shrink-0 items-center justify-between motion-reduce:transition-none ${
                overHero ? "-mb-[72px]" : ""
            }`}
            style={{
                // inside the pill the content steps in from its edges; the right
                // side hugs the round button so the two curves sit concentric
                paddingLeft: scrolled ? 32 : 24,
                paddingRight: scrolled ? (pastHero ? 18 : 32) : 24,
                transition: `padding 700ms ${EASE}`,
            }}
        >
            {/*
              content scrolling past above the pill blurs out rather than
              showing sharp in the gap, over the photo and the page alike
            */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-full backdrop-blur-md transition-opacity duration-500 [mask-image:linear-gradient(to_bottom,black_30%,transparent)]"
                style={{ opacity: scrolled ? 1 : 0 }}
            />
            {/* the shadow only arrives once the pill has finished opening */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-2 inset-y-2.5 -z-10 rounded-full shadow-[0_10px_30px_-12px_rgb(0_0_0/0.25)] motion-reduce:transition-none"
                style={{
                    opacity: scrolled ? 1 : 0,
                    transition: scrolled ? "opacity 400ms ease-out 350ms" : "opacity 150ms ease-in",
                }}
            />
            {/*
              the pill opens out from a sliver in the middle of the bar, dropping
              into place as it widens, and closes back into it on the way up
            */}
            <div
                ref={pillRef}
                aria-hidden
                className="pointer-events-none absolute inset-x-2 inset-y-2.5 -z-10 rounded-full border border-black/5 bg-white/92 backdrop-blur-xl motion-reduce:transition-none"
                style={{
                    clipPath: scrolled
                        ? "inset(0 0 round 999px)"
                        : "inset(30% calc(50% - 40px) round 999px)",
                    opacity: scrolled ? 1 : 0,
                    transform: scrolled ? "none" : "translateY(-12px)",
                    transition: scrolled
                        ? `clip-path 800ms ${EASE} 80ms, transform 500ms ${EASE}, opacity 200ms ease-out`
                        : `clip-path 400ms cubic-bezier(0.7, 0, 0.84, 0), transform 400ms ease-in, opacity 250ms ease-in 150ms`,
                }}
            >
                {/*
                  reading progress: the outline draws itself round the pill as
                  you go down the page, from the top middle, meeting at the
                  bottom by the end
                */}
                {width > 0 && (
                    <svg
                        className="absolute -inset-px overflow-visible"
                        width={width}
                        height={PILL}
                        viewBox={`0 0 ${width} ${PILL}`}
                    >
                        <g
                            ref={progressRef}
                            className="header-progress"
                            fill="none"
                            // a solid grey, not a see-through one, so the overlap at the seam can't darken
                            stroke="#8a8a8a"
                            strokeWidth={INSET * 2}
                            strokeLinecap="butt"
                            strokeDasharray="1 1"
                            strokeDashoffset={1}
                        >
                            <path d={half(width, 1)} pathLength={1} />
                            <path d={half(width, -1)} pathLength={1} />
                        </g>
                    </svg>
                )}
            </div>

            <div>
                <a href="/" aria-label="Jinx home" className="block">
                    {/* the source PNG is a padded square, so crop to the wordmark */}
                    <span
                        className={`relative block h-9 aspect-[1510/758] origin-left overflow-hidden transition-[scale] duration-700 motion-reduce:transition-none ${
                            scrolled ? "scale-[0.85]" : ""
                        }`}
                        style={{ transitionTimingFunction: EASE }}
                    >
                        <Image
                            src="/jinx_logo.svg"
                            alt="Jinx"
                            width={2000}
                            height={2000}
                            sizes="100px"
                            preload
                            className={`absolute max-w-none transition-opacity duration-500 ${light ? "opacity-0" : ""}`}
                            style={{ width: "132.45%", height: "auto", left: "-13.58%", top: "-83.25%" }}
                        />
                        {/* a white cut of the same wordmark, crossfaded in over the photo */}
                        <Image
                            src="/jinx-wordmark-white.png"
                            alt=""
                            fill
                            sizes="80px"
                            preload
                            className={`transition-opacity duration-500 ${light ? "" : "opacity-0"}`}
                        />
                    </span>
                </a>
            </div>

            <nav className="flex items-center">
                <ul
                    className={`hidden gap-8 text-sm transition-colors duration-500 md:flex ${
                        light ? "text-white/80" : "text-gray-600"
                    }`}
                >
                    {LINKS.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className={`transition-colors ${light ? "hover:text-white" : "hover:text-gray-900"}`}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
                {/*
                  on desktop the slot collapses to zero width while the button
                  is hidden, so the links sit flush right until it slides in.
                  On phones there are no links, so it just fades.
                */}
                <div
                    className={`grid grid-cols-[1fr] transition-all duration-300 ease-out ${
                        pastHero
                            ? "opacity-100 md:ml-8 md:grid-cols-[1fr]"
                            : "pointer-events-none opacity-0 md:ml-0 md:grid-cols-[0fr]"
                    }`}
                >
                    <div className="min-w-0 overflow-hidden">
                        <button
                            type="button"
                            tabIndex={pastHero ? 0 : -1}
                            aria-hidden={!pastHero}
                            className="flex items-center gap-1.5 whitespace-nowrap rounded-full py-1.5 pr-4 pl-3 text-sm font-medium text-white transition hover:brightness-95 active:scale-[0.98]"
                            style={{ backgroundColor: BRAND }}
                        >
                            <Image src="/apple.svg" alt="" width={16} height={16} />
                            Get the app
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;
