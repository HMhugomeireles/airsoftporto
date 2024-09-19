import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Clube Airsoft Porto",
  description: "Airsoft games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={cn(
          "font-sans antialiased text-foreground w-full flex flex-col min-h-screen",
          fontSans.variable
        )}
      >
        <Toaster />
        <Header />
        <main className="container flex-1 py-10 h-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
