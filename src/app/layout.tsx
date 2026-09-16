import type { Metadata } from "next";
import "./globals.css";
import { RegistrationProvider } from "@/context/RegistrationContext";
import { FloatingHelplineBot } from "@/components/layout/FloatingHelplineBot";

export const metadata: Metadata = {
  title: "SEST Sports Week 2026 | Jamia Hamdard",
  description: "The official sporting event platform of SEST, Jamia Hamdard, New Delhi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900 font-sans relative">
        <RegistrationProvider>
          {children}
          <FloatingHelplineBot />
        </RegistrationProvider>
      </body>
    </html>
  );
}
