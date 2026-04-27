"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { XIcon } from "lucide-react";

const tuskerBold = {
  fontFamily: "'Tusker Grotesk', 'Helvetica Now Display', Arial, sans-serif",
  fontWeight: 700,
} as const;

const tuskerMed = {
  fontFamily: "'Tusker Grotesk', 'Helvetica Now Display', Arial, sans-serif",
  fontWeight: 500,
} as const;

function Field({
  label,
  type = "text",
  name,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={label}
      className="w-full bg-[#f9f4ea] border-[3px] border-[#1e1e1e] p-4 text-[20px] md:text-[24px] text-[#1e1e1e] placeholder:text-[#1e1e1e]/50 focus:outline-none focus:ring-2 focus:ring-[#d91d23]"
      style={tuskerMed}
      required
    />
  );
}

export function TicketButton({ label, className }: { label: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", whatsapp: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  const openModal = () => {
    setMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOpen(true);
        setVisible(true);
      });
    });
  };

  const closeModal = () => {
    setVisible(false);
    setTimeout(() => {
      setMounted(false);
      setOpen(false);
    }, 250);
  };

  useEffect(() => {
    if (!mounted) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handler);
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [mounted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(
        "https://n8n-rockett-n8n.wormxu.easypanel.host/webhook/REXP2026-Forms",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
    } catch {
      // silently continue — don't block user on network error
    }
    window.location.href = "https://dub.sh/trafegoREXP";
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={`inline-flex items-center justify-center bg-[#d91d23] border-[3px] border-[#1e1e1e] text-[#1e1e1e] px-4 py-4 md:px-10 md:py-6 text-[20px] md:text-[32px] tracking-wide transition-transform duration-300 ease-out hover:scale-[1.05]${className ? ` ${className}` : ""}`}
        style={tuskerBold}
      >
        {label}
      </button>

      {mounted && portalReady && createPortal(
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center px-2 md:p-6 transition-opacity duration-300 ease-out ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundColor: "rgba(249,244,234,0.8)",
            width: "100vw",
            height: "100vh",
          }}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`relative w-full md:w-auto transition-all duration-300 ease-out ${
              visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Red offset shadow */}
            <div
              aria-hidden
              className="absolute bg-[#d91d23]"
              style={{
                inset: 0,
                transform: "translate(19px, 23px)",
              }}
            />

            {/* Close button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute -top-2 -right-2 z-10 bg-[#151515] text-[#f9f4ea] border-2 border-[#f9f4ea] rounded-full p-2 hover:scale-110 transition-transform"
              aria-label="Fechar"
            >
              <XIcon className="size-4" />
            </button>

            {/* Modal card */}
            <div
              className="relative bg-[#1e1e1e] border-[3px] border-[#151515] w-full max-w-[540px] px-6 py-8 md:px-[80px] md:py-[46px] flex flex-col items-center gap-8"
            >
              {/* RELEVANS wordmark */}
              <div
                className="text-[#f9f4ea] text-[36px] md:text-[42px] tracking-[0.05em] leading-none"
                style={tuskerBold}
              >
                RELEVANS
              </div>

              <p
                className="text-[#f9f4ea] text-[18px] md:text-[24px] text-center"
                style={tuskerMed}
              >
                Preencha seus dados abaixo
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-[11px]"
              >
                <Field
                  label="Nome"
                  name="nome"
                  value={form.nome}
                  onChange={(v) => setForm({ ...form, nome: v })}
                />
                <Field
                  label="Email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                />
                <Field
                  label="Whatsapp"
                  type="tel"
                  name="whatsapp"
                  value={form.whatsapp}
                  onChange={(v) => setForm({ ...form, whatsapp: v })}
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-[31px] w-full bg-[#f9f4ea] border-[3px] border-[#1e1e1e] text-[#1e1e1e] text-[16px] md:text-[24px] px-4 md:px-10 py-4 tracking-wide transition-transform duration-200 hover:scale-[1.02] disabled:opacity-60"
                  style={tuskerBold}
                >
                  {submitting ? "ENVIANDO..." : "COMPRAR INGRESSO AGORA"}
                </button>
              </form>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
