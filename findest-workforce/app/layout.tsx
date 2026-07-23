import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Findest Workforce",
  description: "Your AI staff for Findest Sport — 12 real skills, 3 crews, one workspace.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${serif.variable} ${sans.variable}`}>
      <body>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
