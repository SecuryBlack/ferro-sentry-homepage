export interface PostData {
  slug: string;
  title: string;
  date: string;
  author: string;
  summary: string;
  tags: string[];
  content: string;
}

export const posts: PostData[] = [
  {
    slug: "zero-downtime-autoupdate-rust",
    title: "Zero-downtime auto-updates in a Rust security agent",
    date: "2026-07-15",
    author: "SecuryBlack",
    summary: "How Ferro Sentry replaces itself in place and delegates restart to the OS service manager — no downtime, no manual intervention.",
    tags: ["rust", "security", "engineering"],
    content: `
Ferro Sentry ships security updates silently. No package manager, no SSH session, no restart window to schedule.
Once a new release is tagged on GitHub, every running agent picks it up within 24 hours. Here is how it works.

## The constraints

A security agent has a critical update requirement:

1. Download the new binary without interrupting active threat monitoring
2. Replace itself atomically — a partially-written binary would break host security
3. Hand off cleanly so systemd / Windows SCM restarts it with the new version
4. Never brick a remote server if a download fails

## How Ferro Sentry solves it

The updater runs as an asynchronous background Tokio task that wakes up daily.

\`\`\`
startup
  └─ 1 min → check GitHub Releases API
              ├─ no new version → sleep 24 h → repeat
              └─ new version found
                  ├─ download binary for current platform/arch
                  ├─ verify SHA256 checksum
                  ├─ atomic rename (replace in place)
                  └─ std::process::exit(0)
\`\`\`

The key step is the atomic rename. On Linux, \`rename(2)\` is guaranteed atomic on the same filesystem.
On Windows, the agent uses \`MoveFileExW\` with \`MOVEFILE_REPLACE_EXISTING\`.
`,
  },
  {
    slug: "hardening-vps-ports-ssh",
    title: "Continuous VPS Hardening: SSH and Port Exposure Audit",
    date: "2026-07-10",
    author: "SecuryBlack",
    summary: "Why automated posture auditing beats manual sysadmin checks: auditing PermitRootLogin, open 0.0.0.0 ports, and exposed databases.",
    tags: ["security", "vps", "hardening"],
    content: `
Configuring a firewall once is not enough. Application deployments, Docker containers with published ports (\`-p 6379:6379\`), and configuration drift frequently expose internal services to the public internet.

Ferro Sentry performs periodic audits of listening interfaces and SSH settings to alert security teams before vulnerabilities are exploited by malicious scanners.
`,
  },
];
