import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./globals.css";
import Navbar from "./_components/navbar/page";
import { Toaster } from "@/components/ui/sonner";
import MySessionProvider from "@/MySessionProvider/MySessionProvider";
import { CartContextProvider } from "@/context/cartContext";
import Footer from "./_components/footer/footer";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart Ecommerce",
  description: "Best ecommerce platform for your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MySessionProvider>
          <CartContextProvider>
            <Navbar />
            {children}
            <Toaster />
            <Footer />
          </CartContextProvider>
        </MySessionProvider>
      </body>
    </html>
  );
}
