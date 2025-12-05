import type { Metadata } from "next";
import "./globals.css";
import FloatingCircle from "@/components/FloatingCircle";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Dayflow",
  description: "Gérez votre journée de manière fluide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased bg-slate-50">
        <Providers>
          {children}
          <FloatingCircle />
        </Providers>
      </body>
    </html>
  );
}
