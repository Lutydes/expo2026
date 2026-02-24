import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UNIFECAF - ExpoTech 2026",
  description: "O maior evento de tecnologia e inovação da UniFECAF. Smart Building & Tecnologias Disruptivas. 13 de Junho de 2026.",
  keywords: ["ExpoTech", "UniFECAF", "Tecnologia", "Inovação", "Smart Building", "Projetos", "Evento"],
  authors: [{ name: "ExpoTech Team" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "UNIFECAF - ExpoTech 2026",
    description: "O maior evento de tecnologia e inovação da UniFECAF",
    url: "https://chat.z.ai",
    siteName: "Z.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Z.ai Code Scaffold",
    description: "AI-powered development with modern React stack",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
