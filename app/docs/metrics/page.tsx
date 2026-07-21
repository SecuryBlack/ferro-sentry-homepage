import type { Metadata } from "next";
import { Prose } from "@/components/ui/Prose";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = {
  title: "Modules & Security Findings",
  description: "Full list of security modules and finding event payloads for Ferro Sentry.",
};

const modulesList = [
  { name: "port_scanner",        status: "Available",        type: "Audit",    desc: "Audits listening interfaces, non-standard open ports, and unauthenticated exposed databases (Redis, Mongo)." },
  { name: "vuln_scanner",        status: "Available",        type: "Posture",  desc: "Audits SSH configs (PermitRootLogin, PasswordAuth), SUID/SGID binary permissions, world-writable files." },
  { name: "process_sentinel",    status: "In Development",   type: "EDR",      desc: "Real-time process spawn tracking, shell execution from /tmp, memory injection, dangling binary executables." },
  { name: "file_integrity",      status: "In Development",   type: "FIM",      desc: "inotify / ReadDirectoryChangesW tracking of /etc/passwd and binaries with SHA-256 baselines." },
  { name: "auth_guard",          status: "Roadmap",          type: "Logs",     desc: "SSH brute-force detection, auth.log tailing, and failed login attempt tracking." },
];

export default function ModulesPage() {
  return (
    <Prose>
      <h1>Modules & Security Findings</h1>
      <p>
        Ferro Sentry executes security audit modules and streams posture findings to SecuryBlack Cloud or your OTLP collector.
      </p>

      <h2>Module Reference & Status</h2>

      <div className="not-prose overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border)] my-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
              <th className="text-left px-4 py-3 font-semibold text-[var(--color-text)]">Module Name</th>
              <th className="text-left px-4 py-3 font-semibold text-[var(--color-text)]">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-[var(--color-text)]">Category</th>
              <th className="text-left px-4 py-3 font-semibold text-[var(--color-text)]">Description</th>
            </tr>
          </thead>
          <tbody>
            {modulesList.map((m) => (
              <tr key={m.name} className="border-b border-[var(--color-border)] last:border-0">
                <td className="px-4 py-3 font-mono text-[var(--color-primary)] text-xs">{m.name}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${m.status === "Available" ? "bg-emerald-950 text-emerald-400 border border-emerald-800" : "bg-amber-950 text-amber-400 border border-amber-800"}`}>
                    {m.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-[var(--color-muted)]">{m.type}</td>
                <td className="px-4 py-3 text-sm text-[var(--color-muted)]">{m.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Security Finding Payload Example</h2>
      <p>
        Each posture finding emitted by Ferro Sentry follows this JSON structure:
      </p>
      <CodeBlock
        code={`{
  "event_type": "finding",
  "category": "posture",
  "severity": "high",
  "timestamp": "2026-04-28T16:45:00Z",
  "host": "web-server-01",
  "agent": "ferro-sentry",
  "module": "ssh_auditor",
  "details": {
    "finding": "PermitRootLogin=yes",
    "recommendation": "Set PermitRootLogin=no in /etc/ssh/sshd_config",
    "file": "/etc/ssh/sshd_config",
    "benchmark": "CIS-5.2.8"
  }
}`}
        language="json"
        filename="Security Finding (JSON)"
      />
    </Prose>
  );
}
