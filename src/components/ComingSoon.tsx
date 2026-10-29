"use client";

import Image from "next/image";
import { type ComponentProps, useEffect, useRef } from "react";

const BRAND = process.env.NEXT_PUBLIC_BRAND_COLOR ?? "rgb(19, 19, 19)";

// the CTAs live in the header and the hero, so they open the one dialog with an event
const OPEN = "jinx:coming-soon";

export const openComingSoon = () => window.dispatchEvent(new Event(OPEN));

// a button that opens the dialog, for server components like the home page
export const ComingSoonButton = (props: ComponentProps<"button">) => (
    <button type="button" onClick={openComingSoon} {...props} />
);

/*
  The app isn't out yet, so every "Get the app" and "Create account" lands
  here. A native dialog, so focus, Escape and the backdrop come for free.
*/
const ComingSoon = () => {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const open = () => ref.current?.showModal();
        window.addEventListener(OPEN, open);
        return () => window.removeEventListener(OPEN, open);
    }, []);

    const close = () => ref.current?.close();

    return (
        // biome-ignore lint/a11y/useKeyWithClickEvents: the keyboard closes it with Escape, natively
        <dialog
            ref={ref}
            aria-labelledby="coming-soon-title"
            // the panel fills the dialog, so a click on the dialog itself is the backdrop
            onClick={(e) => e.target === e.currentTarget && close()}
            className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-3xl bg-white p-0 shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm open:animate-[fade-up_0.4s_ease-out_both] motion-reduce:open:animate-none"
        >
            <div className="flex flex-col items-center px-8 pt-10 pb-8 text-center">
                <Image src="/jinx-mark-brand.png" alt="" width={240} height={328} className="mb-6 h-14 w-auto" />
                <h2 id="coming-soon-title" className="mb-3 text-2xl font-bold text-gray-900">
                    Coming soon.
                </h2>
                <p className="mb-8 text-gray-600">
                    Jinx launches in Manchester in December 2026, on iPhone first.
                </p>
                <button
                    type="button"
                    onClick={close}
                    className="w-full rounded-full px-5 py-2.5 text-lg text-white transition hover:brightness-95 active:scale-[0.98]"
                    style={{ backgroundColor: BRAND }}
                >
                    Got it
                </button>
            </div>
        </dialog>
    );
};

export default ComingSoon;
