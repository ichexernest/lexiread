import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from '../providers/providers';


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});
export const metadata: Metadata = {
  title: "Lexiread",
  description: "A web app to learn vocabulary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${inter.variable}  antialiased`}
      >
          <Providers>
            {children}
          </Providers>
      </body>
    </html>
    </ClerkProvider>
  );
}
