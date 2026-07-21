import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Prose } from "@/components/ui/Prose";
import { Callout } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "Introduction",
  description: "What is Ferro Sentry and how does it work.",
};

export default function DocsIntroduction() {
  return (
    <Prose>
      <h1>Introduction</h1>
      <p>
        Ferro Sentry is an <strong>ultralight, open-source security agent</strong> written in Rust.
        It provides Endpoint Detection and Response (EDR) alongside continuous posture auditing for Linux and Windows servers, streaming events via gRPC.
      </p>

      <Callout variant="success">
        Ferro Sentry is free and open source under the{" "}
        <a href="https://github.com/securyblack/ferro-sentry/blob/main/LICENSE">Apache 2.0 / MIT licenses</a>.
        The agent source code is fully auditable and customizable.
      </Callout>

      <h2>Why Ferro Sentry?</h2>
      <p>
        Traditional EDR software requires heavy system agents that consume gigabytes of RAM and heavy CPU.
        Ferro Sentry is compiled to a static Rust binary (~2 MB) with <strong>less than 0.1% CPU overhead</strong>, ensuring active threat detection without sacrificing VPS performance.
      </p>

      <h2>How it works</h2>
      <p>
        The agent runs dedicated sensor modules in asynchronous Tokio tasks to audit system events, monitor critical files via inotify / ReadDirectoryChangesW, check SSH/firewall posture, and forward security envelopes to the local Nexus Agent via gRPC at <code>127.0.0.1:4317</code>.
      </p>

      <h2>Core Modules</h2>
      <p>Ferro Sentry provides two main categories of modules:</p>
      <ul>
        <li>
          <strong>Real-Time EDR Sensors</strong> — Process Sentinel, File Integrity Monitor (FIM), Network Watch, Auth Guard, Persistence Hunter, and Log Watcher.
        </li>
        <li>
          <strong>Posture & Compliance Scanners</strong> — Port Scanner, Firewall Auditor, Vulnerability Scanner, SSH Auditor, Permission Auditor, and Secrets Hunter.
        </li>
      </ul>

      <h2>Licensing</h2>
      <p>
        Licensed under{" "}
        <a href="https://github.com/securyblack/ferro-sentry/blob/main/LICENSE">Apache 2.0 / MIT</a>. You can use it commercially, customize rule files, and extend it freely.
      </p>

      <h2>Next steps</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose mt-6">
        {[
          { title: "Quick Start", href: "/docs/quick-start", desc: "Install and start auditing in 5 minutes" },
          { title: "Configuration", href: "/docs/configuration", desc: "Environment variables and TOML configuration" },
          { title: "Modules", href: "/docs/metrics", desc: "Detailed list of sensors and audit scanners" },
          { title: "Contributing", href: "/docs/contributing", desc: "How to contribute rules and code" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-start justify-between gap-3 p-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary-dim)] transition-all duration-200"
          >
            <div>
              <p className="text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                {item.title}
              </p>
              <p className="text-xs text-[var(--color-muted)] mt-0.5">{item.desc}</p>
            </div>
            <ArrowRight size={14} className="text-[var(--color-muted)] group-hover:text-[var(--color-primary)] shrink-0 mt-0.5 transition-colors" />
          </Link>
        ))}
      </div>
    </Prose>
  );
}
