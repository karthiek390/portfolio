import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter, JetBrains_Mono, Geist } from "next/font/google";
import { PillMode, PillProvider } from "@/context/PillContext";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--next-font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--next-font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Matrix Portfolio — Choose Your Reality",
  description: "A Matrix-themed developer portfolio. Red pill or blue pill.",
  keywords: ["developer", "portfolio", "matrix", "fullstack", "react", "nextjs"],
};

function readInitialMode(value: string | undefined): PillMode {
  return value === "red" ? "red" : "blue";
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const initialMode = readInitialMode(cookieStore.get("pill_mode")?.value);

  return (
    <html lang="en" className={cn(inter.variable, jetbrainsMono.variable, "font-sans", geist.variable)}>
      <body>
        <PillProvider initialMode={initialMode}>{children}</PillProvider>
      </body>
    </html>
  );
}
