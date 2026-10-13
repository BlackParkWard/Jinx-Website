"use client";

import { useEffect, useRef, useState } from "react";

/*
  inView follows the element on and off screen; seen latches on first view.

  By default it fires as soon as the element's top edge is a little way onto
  the screen. A percentage of the element would be wrong for reveals: on a
  phone, sections stack into tall columns and 35% of them can be more than
  the whole viewport, so they'd stay hidden until well after they're in view.
*/
const useInView = <T extends HTMLElement>({
  threshold = 0,
  rootMargin = "0px 0px -8% 0px",
}: {
  threshold?: number;
  rootMargin?: string;
} = {}) => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { threshold, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView, seen };
};

export default useInView;
