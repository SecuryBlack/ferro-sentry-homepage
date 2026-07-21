import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ferro Sentry — Active Server Defense & Posture Auditor",
    template: "%s | Ferro Sentry",
  },
  description:
    "Open-source EDR and security auditing agent written in Rust. Continuous SSH, port, FIM, and process posture audits.",
  keywords: ["security", "edr", "rust", "posture audit", "open-source", "grpc", "vps hardening", "securyblack"],
  authors: [{ name: "SecuryBlack", url: "https://securyblack.com" }],
  creator: "SecuryBlack",
  metadataBase: new URL("https://ferrosentry.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ferrosentry.dev",
    siteName: "Ferro Sentry",
    title: "Ferro Sentry — Active Server Defense & Posture Auditor",
    description:
      "Open-source EDR and security auditing agent written in Rust. Continuous SSH, port, FIM, and process posture audits.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ferro Sentry — Active Server Defense & Posture Auditor",
    description:
      "Open-source EDR and security auditing agent written in Rust. Continuous SSH, port, FIM, and process posture audits.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0361X97VSE"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0361X97VSE');
          `}
        </Script>
      </body>
    </html>
  );
}
