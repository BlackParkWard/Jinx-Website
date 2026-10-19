"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { JI, JI_VIEWBOX } from "./LogoOutline";

const BRAND = process.env.NEXT_PUBLIC_BRAND_COLOR ?? "rgb(19, 19, 19)";

// where on screen the tip of the line sits, as a fraction of viewport height
const ANCHOR = 0.6;

// distance from the wrapper's top, ignoring transforms (sections slide in)
const offsetWithin = (el: HTMLElement, root: HTMLElement) => {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
};

/*
  A line down the left margin that draws itself as you scroll. Each element
  marked data-flow-node gets a ji mark, and gets data-lit once the line reaches it
  (globals.css greys out the ones not reached yet). The line ends at the last
  node.
*/
const FlowLine = ({ children }: { children: ReactNode }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<number[]>([]);
  const [reached, setReached] = useState(0);

  // measure the nodes, and again whenever the layout changes size
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const measure = () => {
      const els = root.querySelectorAll<HTMLElement>("[data-flow-node]");
      setNodes(
        Array.from(els, (el) => {
          // centre of the first line of the heading
          const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 32;
          return offsetWithin(el, root) + lineHeight / 2;
        }),
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // draw the line on scroll
  useEffect(() => {
    const root = rootRef.current;
    const fill = fillRef.current;
    if (!root || !fill || nodes.length < 2) return;
    const els = root.querySelectorAll<HTMLElement>("[data-flow-node]");
    const start = nodes[0];
    const end = nodes[nodes.length - 1];
    // where scroll-driven animations exist the browser draws the line itself
    // (globals.css), in step with the scroll. Drawing it from scroll events
    // lags a frame behind on iOS and looks jittery, so that's only a fallback.
    const cssDriven = CSS.supports("animation-timeline: view()");

    let frame = 0;
    const update = () => {
      frame = 0;
      const tip =
        window.innerHeight * ANCHOR - root.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, (tip - start) / (end - start)));
      if (!cssDriven) fill.style.transform = `scaleY(${progress})`;
      const count = nodes.filter((y) => tip >= y).length;
      els.forEach((el, i) => {
        el.toggleAttribute("data-lit", i < count);
      });
      setReached(count);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [nodes]);

  const start = nodes[0] ?? 0;
  const end = nodes[nodes.length - 1] ?? 0;

  return (
    // on phones the content is padded off the line; on desktop it sits in the margin
    <div ref={rootRef} className="relative pl-4 md:pl-0">
      {children}
      {nodes.length > 1 && (
        <div
          aria-hidden
          // in the page padding on phones, in the margin beside the content on desktop
          className="flow-track pointer-events-none absolute w-0.5 -translate-x-1/2"
          style={{
            left: "max(-8px, calc(50% - 486px))",
            top: start,
            height: end - start,
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gray-200" />
          <div
            ref={fillRef}
            className="flow-fill absolute inset-0 origin-top rounded-full will-change-transform"
            style={{ backgroundColor: BRAND }}
          />
          {/* each checkpoint is a small ji mark, grey until the line reaches it */}
          {nodes.map((y, i) => {
            const lit = i < reached;
            const current = i === reached - 1;
            return (
              <span
                key={y}
                // the white backing hides the line where it passes behind the mark
                className={`absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 bg-white px-0.5 py-1 transition-transform duration-500 ${
                  current ? "scale-125" : ""
                }`}
                style={{ top: y - start }}
              >
                <svg
                  viewBox={JI_VIEWBOX}
                  aria-hidden="true"
                  className="h-5 w-auto transition-[fill] duration-500"
                  style={{ fill: lit ? BRAND : "#d1d5db" }}
                >
                  {JI.map((d) => (
                    <path key={d.slice(0, 16)} d={d} />
                  ))}
                </svg>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FlowLine;
