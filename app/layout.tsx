import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lore - Capture once. Understand forever.",
  description: "Voice-first organizational memory platform. Grounded mentor and institutional intelligence.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#F7F9F6] text-[#1A241E] min-h-screen antialiased selection:bg-[#DEECE2] selection:text-[#1B3629]">
        {children}
      </body>
    </html>
  );
}
