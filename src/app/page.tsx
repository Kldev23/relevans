import Image from "next/image";
import { SlideUp, ScrollSlideUp } from "./components/SlideUp";

function Marquee() {
  const text = "RELEVANS \u00B7 ";
  const repeated = text.repeat(12);
  return (
    <div className="overflow-hidden whitespace-nowrap opacity-50 text-white text-[10px] tracking-[0.2em] font-medium py-3">
      <div
        className="inline-block"
        style={{ animation: "marquee 20s linear infinite" }}
      >
        <span>{repeated}</span>
        <span>{repeated}</span>
      </div>
    </div>
  );
}

function SocialIcon({
  src,
  alt,
  href,
}: {
  src: string;
  alt: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center justify-center w-[35px] h-[35px] transition-transform duration-300 ease-out hover:scale-[1.1]"
    >
      <Image
        src="/images/ellipse3.svg"
        alt=""
        width={35}
        height={35}
        className="absolute inset-0"
      />
      <Image
        src={src}
        alt={alt}
        width={22}
        height={22}
        className="relative z-10 object-contain"
      />
    </a>
  );
}

function Card({
  children,
  bgSrc,
  href = "#",
  contentClassName = "",
}: {
  children: React.ReactNode;
  bgSrc: string;
  href?: string;
  contentClassName?: string;
}) {
  return (
    <a
      href={href}
      className="group relative mx-4 block rounded-[20px] border border-[#b3b3b3] bg-[#d9d9d9] h-[187px] px-2 py-[7px] transition-transform duration-300 ease-out hover:scale-[1.05]"
    >
      <div className="relative w-full h-[174px] rounded-[14px] overflow-hidden">
        <Image
          src={bgSrc}
          alt=""
          fill
          className="object-cover grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0"
        />
      </div>
      <div className={`absolute inset-[7px_8px] z-10 flex flex-col ${contentClassName}`}>
        {children}
      </div>
    </a>
  );
}

function Badge({
  children,
  variant = "lime",
}: {
  children: React.ReactNode;
  variant?: "lime" | "white";
}) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[12px] italic text-black whitespace-nowrap ${
        variant === "lime" ? "bg-[#c1fc32]" : "bg-white"
      }`}
      style={{ fontFamily: "'Apple Garamond Light', Georgia, serif" }}
    >
      {children}
    </span>
  );
}

const helvetica = {
  fontFamily: "'Helvetica Now Display', Helvetica, sans-serif",
  fontWeight: 500,
} as const;

const garamond = {
  fontFamily: "'Apple Garamond', Georgia, serif",
} as const;

export default function Home() {
  return (
    <div className="bg-white min-h-screen w-screen max-w-[440px] mx-auto relative overflow-x-hidden">
      {/* Header with dark background */}
      <div className="relative">
        <div className="relative h-[216px] overflow-hidden">
          <Image
            src="/images/subtract.svg"
            alt=""
            width={402}
            height={216}
            className="absolute inset-0 w-full h-full"
            priority
          />
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/dot-bg.png"
              alt=""
              width={414}
              height={291}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
          </div>
          <Marquee />
        </div>

        {/* Vertical line */}
        <div className="absolute left-1/2 top-[609px] w-px h-[648px] -translate-x-1/2">
          <Image
            src="/images/vector5.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Logo */}
      <div className="flex justify-center -mt-[86px] relative z-10">
        <Image
          src="/images/logo.svg"
          alt="Relevans Logo"
          width={112}
          height={112}
        />
      </div>

      {/* Title */}
      <SlideUp delay={0}>
        <h1
          className="text-center text-[27px] text-black mt-4"
          style={helvetica}
        >
          Igreja Relevans
        </h1>
      </SlideUp>

      {/* Subtitle */}
      <SlideUp delay={0.15}>
        <p
          className="text-center text-[14px] text-black mx-auto mt-3 max-w-[270px] leading-normal"
          style={garamond}
        >
          Um lugar onde você pode crescer em fé, se conectar com Deus e encontrar
          propósito para sua vida.
        </p>
      </SlideUp>

      {/* Social icons */}
      <div className="flex justify-center gap-3.5 mt-6">
        <SlideUp delay={0.3}>
          <SocialIcon src="/images/tiktok.png" alt="TikTok" href="#" />
        </SlideUp>
        <SlideUp delay={0.42}>
          <SocialIcon src="/images/instagram.png" alt="Instagram" href="#" />
        </SlideUp>
        <SlideUp delay={0.54}>
          <SocialIcon src="/images/youtube.png" alt="YouTube" href="#" />
        </SlideUp>
      </div>

      {/* Card 1: Nosso Site */}
      <ScrollSlideUp>
      <div className="mt-8">
        <Card bgSrc="/images/card01-bg.png" contentClassName="justify-center gap-[40px] px-[30px]">
          <div className="flex flex-col items-end">
            <h2 className="text-[24px] text-white text-right w-full" style={helvetica}>
              Nosso Site
            </h2>
            <Badge variant="lime">acesse agora</Badge>
          </div>
          <div className="flex justify-between items-end">
            <p className="text-[#c1fc32] text-[12px] w-[124px] leading-normal" style={garamond}>
              Nossa história, Próximos eventos, GD e muito mais...
            </p>
            <p className="text-white text-[8px] opacity-30 text-right whitespace-nowrap" style={helvetica}>
              ///relevans.com.br
            </p>
          </div>
        </Card>
      </div>
      </ScrollSlideUp>

      {/* Card 2: D.N.A 2026 */}
      <ScrollSlideUp delay={0.1}>
      <div className="mt-5">
        <Card bgSrc="/images/card02-bg.png" contentClassName="justify-center gap-[40px] px-[24px]">
          <div className="flex flex-col items-end">
            <Badge variant="white">inscrições abertas</Badge>
            <div className="flex items-center gap-[3px]">
              <span className="text-[8px] text-white text-center" style={helvetica}>
                clique aqui
              </span>
              <Image src="/images/frame4.svg" alt="" width={8} height={8} />
            </div>
          </div>
          <div>
            <h2 className="text-[24px] text-white leading-normal" style={helvetica}>
              D.N.A 2026
            </h2>
            <p className="text-[#c1fc32] text-[12px] leading-normal" style={garamond}>
              Nosso primeiro curso
              <br />
              de membresia de 2026.
            </p>
          </div>
        </Card>
      </div>
      </ScrollSlideUp>

      {/* Card 3: Conheça os Novos modelos */}
      <ScrollSlideUp delay={0.1}>
      <div className="mt-5">
        <Card bgSrc="/images/card03-bg.png" contentClassName="justify-center gap-[25px] px-[30px]">
          <div className="flex flex-col items-end gap-[3px]">
            <h2
              className="text-[24px] text-white text-right w-full leading-[24px] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
              style={helvetica}
            >
              Conheça os
            </h2>
            <Badge variant="lime">compre pelo site</Badge>
            <div className="flex items-center gap-[3px] px-[18px]">
              <span className="text-[8px] text-white text-center" style={helvetica}>
                clique aqui
              </span>
              <Image src="/images/frame4.svg" alt="" width={8} height={8} />
            </div>
          </div>
          <div className="flex justify-between items-end">
            <h2 className="text-[24px] text-white leading-[24px] w-[93px]" style={helvetica}>
              Novos modelos
            </h2>
            <p className="text-white text-[8px] opacity-30 text-right whitespace-nowrap" style={helvetica}>
              ///lojakok.com.br
            </p>
          </div>
        </Card>
      </div>
      </ScrollSlideUp>

      {/* Card 4: Canal do Youtube */}
      <ScrollSlideUp delay={0.1}>
      <div className="mt-5">
        <Card bgSrc="/images/card04-bg.png" contentClassName="pt-[18px] gap-[51px] px-[30px]">
          <div className="flex flex-col items-start gap-[3px] w-[100px]">
            <Badge variant="white">últimas mensagens</Badge>
            <p className="text-white text-[8px] opacity-30 w-full" style={helvetica}>
              ///relevans church
            </p>
          </div>
          <div className="flex items-end justify-center w-full">
            <div className="relative w-[125px] h-[48px] shrink-0 px-[3px] py-[11px]">
              <div className="absolute top-0 left-0 w-[125px]" style={helvetica}>
                <p className="text-[24px] text-white leading-[24px]">Canal</p>
                <p className="text-[24px] text-white leading-[24px]">do Youtube</p>
              </div>
              <div className="absolute left-[68.83px] top-[11.98px] flex items-center gap-px">
                <span className="text-[#c1fc32] text-[8px] text-center whitespace-nowrap" style={helvetica}>
                  clique aqui
                </span>
                <div className="-rotate-45 flex items-center justify-center w-[12px] h-[12px]">
                  <Image src="/images/frame5-new.svg" alt="" width={8} height={8} />
                </div>
              </div>
            </div>
            <div className="flex-1" />
            <Image
              src="/images/youtube.png"
              alt="YouTube"
              width={22}
              height={22}
              className="object-contain shrink-0"
            />
          </div>
        </Card>
      </div>
      </ScrollSlideUp>

      {/* CTA: Visite Nosso Site */}
      <ScrollSlideUp delay={0.1}>
      <div className="mx-4 mt-8">
        <a
          href="#"
          className="flex items-center justify-center gap-3 bg-[#1e1e1e] text-white rounded-[20px] h-[56px] relative transition-transform duration-300 ease-out hover:scale-[1.05]"
        >
          <Image
            src="/images/internet.png"
            alt=""
            width={24}
            height={24}
            className="object-contain"
          />
          <span className="text-[20px] leading-[20px]" style={helvetica}>
            Visite Nosso Site
          </span>
          <div className="absolute right-6 -rotate-45">
            <Image src="/images/arrow1.svg" alt="" width={13} height={13} />
          </div>
        </a>
      </div>
      </ScrollSlideUp>

      {/* Footer */}
      <p
        className="text-center text-[14px] text-black mt-8 mb-8"
        style={garamond}
      >
        &copy; 2025 Relevans - Todos os direitos reservados
      </p>
    </div>
  );
}
