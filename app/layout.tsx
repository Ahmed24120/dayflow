import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FloatingCircle from "@/components/FloatingCircle";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        {children}
        <FloatingCircle />
      </body>
    </html>
  );
}