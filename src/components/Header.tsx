"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const BRAND = process.env.NEXT_PUBLIC_BRAND_COLOR ?? "#0e989d";

const LINKS = [
    { href: "/#how-it-works", label: "How it works" },
    { href: "/#safety", label: "Safety" },
    { href: "/#questions", label: "Questions" },
];

const Header = () => {
    // once the page moves, the header gets a backdrop so content reads under it
    const [scrolled, setScrolled] = useState(false);
    // the hero already has a Get the app button, so only show ours past it
    const [pastHero, setPastHero] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 8);
            setPastHero(window.scrollY > 380);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 flex h-[72px] w-full shrink-0 items-center justify-between px-6 transition-[background-color,box-shadow] duration-300 ${
                scrolled
                    ? "bg-white/92 shadow-[0_1px_0_rgb(0_0_0/0.06)] backdrop-blur-lg"
                    : "bg-white"
            }`}
        >
            <div>
                <a href="/" aria-label="Jinx home" className="block">
                    {/* the source PNG is a padded square, so crop to the wordmark */}
                    <span className="relative block h-9 aspect-[1510/758] overflow-hidden">
                        <Image
                            src="/jinx_logo.svg"
                            alt="Jinx"
                            width={2000}
                            height={2000}
                            sizes="100px"
                            preload
                            className="absolute max-w-none fill-blue-500"
                            style={{ width: "132.45%", height: "auto", left: "-13.58%", top: "-83.25%" }}
                        />
                    </span>
                </a>
            </div>

            <nav className="flex items-center">
                <ul className="hidden gap-8 text-sm text-gray-600 md:flex">
                    {LINKS.map((link) => (
                        <li key={link.href}>
                            <a href={link.href} className="transition-colors hover:text-gray-900">
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
