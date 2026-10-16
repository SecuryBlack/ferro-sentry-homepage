import type { Metadata } from "next";
import { activeAgentConfig } from "@/config/agent.config";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ferrosentry.dev"),
  title: `${activeAgentConfig.name}: ${activeAgentConfig.tagline}`,
  description: activeAgentConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: activeAgentConfig.name,
    title: `${activeAgentConfig.name}: ${activeAgentConfig.tagline}`,
    description: activeAgentConfig.description,
  },
  twitter: { card: "summary" },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="theme-script"
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                const stored = localStorage.getItem('theme');
                const isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            })();`,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --agent-primary: ${activeAgentConfig.theme.primary};
                --agent-primary-dark: ${activeAgentConfig.theme.primaryDark};
                --agent-primary-light: ${activeAgentConfig.theme.primaryLight};
                --agent-glow: ${activeAgentConfig.theme.glow};
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#09090b] dark:text-zinc-100 flex flex-col justify-between selection:bg-[var(--agent-primary)] selection:text-zinc-950">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
