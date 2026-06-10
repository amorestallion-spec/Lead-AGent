"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook to detect when an element is visible in the viewport
 * for scroll-triggered animations
 * 
 * Uses a low threshold (5%) and early rootMargin for reliable
 * triggering on mobile viewports.
 */
export function useInView(
  options?: IntersectionObserverInit
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  // Store options in a ref to avoid re-creating the observer
  // when the options object reference changes on every render
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px",
        ...optionsRef.current,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}