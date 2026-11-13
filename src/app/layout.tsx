import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { getPersonJsonLd, metadata } from "@/lib/metadata";

const manrope = localFont({
  src: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  display: "swap",
  variable: "--font-manrope",
  weight: "200 800",
});

export { metadata };

export default function RootLayout({ children }: { children: ReactNode }) {
  const personJsonLd = getPersonJsonLd();

  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
