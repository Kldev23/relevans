"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

if (typeof window !== "undefined") {
  (window as unknown as { __preloaderActive?: boolean }).__preloaderActive = true;
}

export function Preloader() {
  const [done, setDone] = useState(false);
  const [portalReady, setPortalReady] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const relevansRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const barWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (!portalReady) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = prevOverflow;
        (window as unknown as { __preloaderActive?: boolean }).__preloaderActive = false;
        window.dispatchEvent(new Event("preloader:done"));
        setDone(true);
      },
    });

    // 1. Curtain in (bottom → top)
    tl.fromTo(
      overlayRef.current,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.6, ease: "power3.out" }
    );

    // 2. RELEVANS reveal bottom-up
    tl.fromTo(
      relevansRef.current,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.5, ease: "power3.out" },
      "+=0.15"
    );

    // 3. EXPERIENCE reveal bottom-up
    tl.fromTo(
      experienceRef.current,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.6, ease: "power3.out" },
      "+=0.1"
    );

    // 4. Loading bar fill 0 → 100% via width
    tl.fromTo(
      barWrapRef.current,
      { width: "0%" },
      { width: "100%", duration: 2.0, ease: "none" },
      "+=0.2"
    );

    // 5. Curtain out (top → bottom)
    tl.to(
      overlayRef.current,
      { yPercent: -100, duration: 0.7, ease: "power3.inOut" },
      "+=0.2"
    );

    return () => {
      tl.kill();
      document.body.style.overflow = prevOverflow;
    };
  }, [portalReady]);

  if (done || !portalReady) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="flex flex-col items-center gap-4 w-[504px] max-w-[90vw]">
        {/* RELEVANS mask */}
        <div className="overflow-hidden w-[267px] max-w-full">
          <div ref={relevansRef}>
            <Image
              src="/images/vector-relevans.svg"
              alt="RELEVANS"
              width={267}
              height={24}
              priority
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* EXPERIENCE mask */}
        <div className="overflow-hidden w-full">
          <div ref={experienceRef}>
            <Image
              src="/images/vector-experience.svg"
              alt="EXPERIENCE"
              width={504}
              height={104}
              priority
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Loading bar — SVG sits inside wrapper that grows left→right */}
        <div className="relative w-full h-[6px]">
          <div
            ref={barWrapRef}
            className="absolute left-0 top-0 h-full overflow-hidden"
            style={{ width: "0%" }}
          >
            <Image
              src="/images/vector-loading.svg"
              alt=""
              width={504}
              height={6}
              priority
              className="h-full max-w-none"
              style={{ width: "504px" }}
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
