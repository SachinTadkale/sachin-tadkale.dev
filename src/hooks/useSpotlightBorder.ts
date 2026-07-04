"use client";

import { useRef, useCallback } from "react";

/**
 * Attaches a radial spotlight gradient effect to a card element via CSS custom properties.
 * --spotlight-x / --spotlight-y: cursor position as percentages within the element.
 * --spotlight-active: 1 when hovering, 0 when not.
 *
 * The mousemove handler is rAF-throttled so CSS vars update at most once per frame.
 */
export function useSpotlightBorder<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const rafId = useRef<number | null>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<T>) => {
    if (!ref.current) return;

    // Cancel any pending frame to prevent stacking
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
    }

    // Capture values synchronously (the event object is pooled in React)
    const clientX = e.clientX;
    const clientY = e.clientY;

    rafId.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      ref.current.style.setProperty("--spotlight-x", `${x.toFixed(1)}%`);
      ref.current.style.setProperty("--spotlight-y", `${y.toFixed(1)}%`);
      rafId.current = null;
    });
  }, []);

  const onMouseEnter = useCallback(() => {
    ref.current?.style.setProperty("--spotlight-active", "1");
  }, []);

  const onMouseLeave = useCallback(() => {
    ref.current?.style.setProperty("--spotlight-active", "0");
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }, []);

  return { ref, onMouseMove, onMouseEnter, onMouseLeave };
}
