"use client";

import { useEffect, useRef, useState } from "react";

// inView follows the element on and off screen; seen latches on first view
const useInView = <T extends HTMLElement>(threshold = 0.35) => {
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
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView, seen };
};

export default useInView;
