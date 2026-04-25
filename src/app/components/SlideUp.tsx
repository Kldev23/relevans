"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function waitForPreloader(cb: () => void): () => void {
  if (typeof window === "undefined") {
    cb();
    return () => {};
  }
  const active = (window as unknown as { __preloaderActive?: boolean })
    .__preloaderActive;
  if (!active) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener("preloader:done", handler, { once: true });
  return () => window.removeEventListener("preloader:done", handler);
}

export function SlideUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 50 });

    let tween: gsap.core.Tween | null = null;
    const cleanup = waitForPreloader(() => {
      tween = gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, delay, ease: "power2.out" }
      );
    });

    return () => {
      cleanup();
      tween?.kill();
      gsap.set(el, { opacity: 1, y: 0 });
    };
  }, [delay]);

  return <div ref={ref}>{children}</div>;
}

export function ScrollSlideUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 60 });

    let tween: gsap.core.Tween | null = null;
    const cleanup = waitForPreloader(() => {
      tween = gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        }
      );
    });

    return () => {
      cleanup();
      tween?.scrollTrigger?.kill();
      tween?.kill();
      gsap.set(el, { opacity: 1, y: 0 });
    };
  }, [delay]);

  return <div ref={ref}>{children}</div>;
}
