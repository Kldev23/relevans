import Image from "next/image";
import type { Metadata } from "next";
import { ScrollSlideUp, SlideUp } from "../components/SlideUp";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { TicketButton } from "../components/TicketModal";
import { Preloader } from "../components/Preloader";

export const metadata: Metadata = {
  title: "Relevans Experience — 16.Maio",
  description:
    "No dia 16 de Maio, das 16h às 22h, uma imersão profunda no DNA e direção profética da Relevans.",
};

const tuskerBold = {
  fontFamily: "'Tusker Grotesk', 'Helvetica Now Display', Arial, sans-serif",
  fontWeight: 700,
} as const;

const tuskerMed = {
  fontFamily: "'Tusker Grotesk', 'Helvetica Now Display', Arial, sans-serif",
  fontWeight: 600,
} as const;

const garamond = {
  fontFamily: "'Apple Garamond', Georgia, serif",
} as const;

export default function PreRelevansExperience() {
  return (
    <>
      <Preloader />
      <div
        className="relative min-h-screen w-full overflow-x-hidden"
        style={{ backgroundColor: "#f9f4ea" }}
      >
      {/* Noise/texture overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "url('/images/dot-bg.png')",
          backgroundSize: "1024px 1024px",
          backgroundPosition: "top left",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-12 pt-12 pb-16">
        {/* Title */}
        <SlideUp delay={0}>
          <div className="relative mx-auto w-full max-w-[1274px] select-none">
            <Image
              src="/images/title-experience.png"
              alt="Relevans Experience"
              width={1274}
              height={336}
              priority
              className="h-auto w-full"
            />
          </div>
        </SlideUp>

        {/* Hero video teaser — overlaps title bottom slightly */}
        <ScrollSlideUp>
          <div className="relative mx-auto -mt-[8%] w-full max-w-[1007px] aspect-[1007/566] overflow-hidden outline outline-[5px] outline-[#1E1E1E]">
            <HeroVideoDialog
              className="block h-full w-full [&>div:first-child]:h-full [&>div:first-child]:w-full"
              animationStyle="from-center"
              videoSrc="https://www.youtube.com/embed/8BBPzTEDHuY?autoplay=1"
              thumbnailSrc="/images/compressO-thumbmail-rlxexp.png"
              thumbnailAlt="Relevans Experience teaser"
            />
          </div>
        </ScrollSlideUp>

        {/* Date + CTA row */}
        <ScrollSlideUp delay={0.05}>
          <div className="mx-auto mt-6 max-w-[1007px] text-[#1e1e1e]">
            <div className="flex items-center justify-between text-[28px] md:text-[50px]">
              <span style={tuskerBold}>16.MAIO</span>
              <div className="hidden md:block">
                <TicketButton label="GARANTIR MEU INGRESSO" />
              </div>
              <span style={tuskerBold}>16H—22H</span>
            </div>
            <div className="mt-4 md:hidden">
              <TicketButton label="GARANTIR MEU INGRESSO" className="w-full" />
            </div>
          </div>
        </ScrollSlideUp>

        {/* Speaker 1 — PR. FELIPE PARENTE */}
        <ScrollSlideUp>
          <section className="mx-auto mt-32 md:mt-48 grid max-w-[1100px] grid-cols-1 items-center gap-10 md:grid-cols-[540px_1fr] md:gap-16">
            <div className="relative mx-auto w-full max-w-[540px] order-2 md:order-1">
              <div className="absolute inset-0 translate-x-5 translate-y-5 bg-[#d91d23]" />
              <div className="relative aspect-[540/566] overflow-hidden">
                <Image
                  src="/images/felipe-parente.png"
                  alt="Pr. Felipe Parente"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="text-[#1e1e1e] order-1 md:order-2">
              <h2
                className="text-[56px] md:text-[72px] leading-[1.05]"
                style={tuskerBold}
              >
                PR. FELIPE
                <br />
                PARENTE
              </h2>
              <p
                className="mt-4 text-[28px] md:text-[40px] leading-tight"
                style={tuskerMed}
              >
                Pastor na Igreja Conectados, em Curitiba.
              </p>
            </div>
          </section>
        </ScrollSlideUp>

        {/* Speaker 2 — PR. LIPÃO */}
        <ScrollSlideUp>
          <section className="mx-auto mt-24 md:mt-36 grid max-w-[1100px] grid-cols-1 items-center gap-10 md:grid-cols-[1fr_540px] md:gap-16">
            <div className="text-[#1e1e1e] md:pl-20">
              <h2
                className="text-[56px] md:text-[72px] leading-[1.05]"
                style={tuskerBold}
              >
                PR.LIPÃO
              </h2>
              <p
                className="mt-4 text-[28px] md:text-[40px] leading-tight"
                style={tuskerMed}
              >
                Pastor e Fundador da
                <br />
                Igreja Onda Dura
              </p>
            </div>
            <div className="relative mx-auto w-full max-w-[540px]">
              <div className="absolute inset-0 translate-x-5 translate-y-5 bg-[#d91d23]" />
              <div className="relative aspect-[540/566] overflow-hidden">
                <Image
                  src="/images/lipao.png"
                  alt="Pr. Lipão"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>
        </ScrollSlideUp>

        {/* Description */}
        <ScrollSlideUp>
          <p
            className="mx-auto mt-16 md:mt-[256px] max-w-[820px] text-center text-[#1e1e1e] text-[20px] md:text-[36px] leading-snug"
            style={tuskerMed}
          >
            No dia 16 de Maio, das 16h às 22h, abriremos nossas portas e nosso
            coração para uma imersão profunda naquilo que carregamos como DNA e
            direção profética.
          </p>
        </ScrollSlideUp>

        {/* CTA 2 */}
        <ScrollSlideUp delay={0.1}>
          <div className="mt-10 flex justify-center">
            <TicketButton label="GARANTIR MEU INGRESSO" className="w-full md:w-auto" />
          </div>
        </ScrollSlideUp>

        {/* Divider */}
        <div
          className="mt-16 md:mt-[20rem] border-t border-[#1e1e1e]/80 relative"
          style={{
            width: "100vw",
            left: "50%",
            right: "50%",
            marginLeft: "-50vw",
            marginRight: "-50vw",
          }}
        />

        {/* Footer */}
        <p
          className="mt-5 text-center text-[16px] md:text-[20px] text-black"
          style={garamond}
        >
          © 2026 Relevans - Todos os direitos reservados
        </p>
      </div>
    </div>
    </>
  );
}
