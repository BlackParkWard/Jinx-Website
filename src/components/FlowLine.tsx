"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

// where on screen a section counts as reached, as a fraction of viewport height
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
  Lights the page's sections as you read. Each element marked data-flow-node
  gets data-lit once a mark 60% down the screen passes it (globals.css greys
  out the ones not reached yet, and Moments deals its prints on it). Reading
  progress itself is drawn by the header.
*/
const FlowLine = ({ children }: { children: ReactNode }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<number[]>([]);

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

  // light the nodes on scroll
  useEffect(() => {
    const root = rootRef.current;
    if (!root || nodes.length === 0) return;
    const els = root.querySelectorAll<HTMLElement>("[data-flow-node]");

    let frame = 0;
    const update = () => {
      frame = 0;
      const tip =
        window.innerHeight * ANCHOR - root.getBoundingClientRect().top;
      const count = nodes.filter((y) => tip >= y).length;
      els.forEach((el, i) => {
        el.toggleAttribute("data-lit", i < count);
      });
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

  return (
    <div ref={rootRef} className="relative">
      {children}
    </div>
  );
};

export default FlowLine;
