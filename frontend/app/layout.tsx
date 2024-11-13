import type { Metadata } from "next";
import "./globals.css";
import SmoothScrolling from "@/contexts/SmoothScroll";
import { Poppins } from "next/font/google";
import GSAPProvider from "@/contexts/GSAP";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Oprec Makomti",
  description: "Open Recruitment Himakom & OmahTI",
};

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-custom-silver`}>
        <SmoothScrolling>
          <GSAPProvider>
            {children}
            <Toaster />
          </GSAPProvider>
        </SmoothScrolling>
      </body>
    </html>
  );
}
