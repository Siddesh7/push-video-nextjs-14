import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {Providers} from "./providers";
import {ConnectButton} from "@rainbow-me/rainbowkit";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="navbar bg-base-100">
            <div className="flex-1">
              <a className="btn btn-ghost text-xl">Push Video</a>
            </div>
            <div className="flex-none">
              <ConnectButton />
            </div>
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
