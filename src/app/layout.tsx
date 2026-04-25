import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Igreja Relevans",
  description:
    "Um lugar onde você pode crescer em fé, se conectar com Deus e encontrar propósito para sua vida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
