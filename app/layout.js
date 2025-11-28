import ReduxProvider from "@/components/ReduxProvider";
import SessionProvider from "@/components/SessionProvider";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BizConnect - Bangladesh's Leading B2B Marketplace",
  description: "Connect with verified sellers and buyers across Bangladesh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <ReduxProvider>
            {children}
            <Toaster position="top-right" />
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
