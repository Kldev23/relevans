"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Play, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out";

interface HeroVideoProps {
  animationStyle?: AnimationStyle;
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
}

const enterStyles: Record<AnimationStyle, string> = {
  "from-bottom": "translate-y-0 opacity-100",
  "from-center": "scale-100 opacity-100",
  "from-top": "translate-y-0 opacity-100",
  "from-left": "translate-x-0 opacity-100",
  "from-right": "translate-x-0 opacity-100",
  fade: "opacity-100",
  "top-in-bottom-out": "translate-y-0 opacity-100",
  "left-in-right-out": "translate-x-0 opacity-100",
};

const exitStyles: Record<AnimationStyle, string> = {
  "from-bottom": "translate-y-full opacity-0",
  "from-center": "scale-50 opacity-0",
  "from-top": "-translate-y-full opacity-0",
  "from-left": "-translate-x-full opacity-0",
  "from-right": "translate-x-full opacity-0",
  fade: "opacity-0",
  "top-in-bottom-out": "-translate-y-full opacity-0",
  "left-in-right-out": "-translate-x-full opacity-0",
};

export function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
}: HeroVideoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  const open = () => {
    setMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
  };

  const close = () => {
    setVisible(false);
    setTimeout(() => {
      setMounted(false);
      setIsOpen(false);
    }, 300);
  };

  useEffect(() => {
    if (mounted) setIsOpen(true);
  }, [mounted]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [mounted]);

  return (
    <div className={cn("relative", className)}>
      {/* Thumbnail + play button */}
      <div
        className="relative cursor-pointer group"
        onClick={open}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && open()}
        aria-label="Play video"
      >
        <img
          src={thumbnailSrc}
          alt={thumbnailAlt}
          width={1920}
          height={1080}
          className="w-full h-full object-cover transition-all duration-200 group-hover:brightness-[0.8]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md size-28
              scale-[0.9] group-hover:scale-100 transition-transform duration-200 ease-out"
          >
            <div
              className="flex items-center justify-center rounded-full shadow-md size-20
                bg-gradient-to-b from-[#d91d23]/70 to-[#d91d23]
                scale-100 group-hover:scale-[1.2] transition-transform duration-200 ease-out"
            >
              <Play
                className="size-8 text-white fill-white"
                style={{
                  filter:
                    "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal — portal to body so ancestor transforms don't trap `fixed` */}
      {mounted && portalReady &&
        createPortal(
          <div
            ref={overlayRef}
            className={cn(
              "fixed inset-0 z-[9999] flex items-center justify-center",
              "transition-opacity duration-300 ease-out",
              visible ? "opacity-100" : "opacity-0"
            )}
            style={{
              backgroundColor: "rgba(249, 244, 234, 0.8)",
              width: "100vw",
              height: "100vh",
            }}
            onClick={close}
          >
            <div
              className={cn(
                "relative w-full max-w-4xl aspect-video mx-4 md:mx-0",
                "transition-all duration-300 ease-out",
                visible ? enterStyles[animationStyle] : exitStyles[animationStyle]
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-16 right-0 text-[#1e1e1e] bg-[#1e1e1e]/10 ring-1 ring-[#1e1e1e]/30 rounded-full p-2 transition-opacity hover:opacity-80"
                onClick={close}
                aria-label="Close video"
              >
                <XIcon className="size-5" />
              </button>
              <div className="size-full border-[3px] border-[#1e1e1e] overflow-hidden relative">
                {isOpen && (
                  <iframe
                    src={videoSrc}
                    className="size-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  />
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
