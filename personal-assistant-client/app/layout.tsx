import type { Metadata } from "next";
import Providers from "./state/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Assistant",
  description: "Welcome to Personal Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body
      ><Providers> 
        {children}
        </Providers>
      </body>
    </html>
    
  );
}
