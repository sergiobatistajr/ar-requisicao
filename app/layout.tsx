import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/themes/theme-provider";
import { ToastProvider } from "@/providers/toast-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AR Requisições",
  description: "Sistema de requisições para o almoxarifado do AR",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ToastProvider />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
