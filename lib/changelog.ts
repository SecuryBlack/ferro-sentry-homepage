export type ReleaseType = "major" | "minor" | "patch";

export interface ChangelogEntry {
  version: string;
  date: string;
  type: ReleaseType;
  summary: string;
  sections: {
    label: "Added" | "Fixed" | "Changed" | "Removed" | "Security";
    items: string[];
  }[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: "0.2.0",
    date: "2026-07-23",
    type: "minor",
    summary: "Comprehensive Security Posture Suite: SSH Auditor, File Integrity Monitor (FIM), SUID Permission Auditor, Persistence Hunter, Process Sentinel, Firewall, and SSL/TLS Auditor.",
    sections: [
      {
        label: "Added",
        items: [
          "SSH Auditor module (`ssh_auditor.rs`): Audits sshd_config settings (PermitRootLogin, PasswordAuthentication, custom port, X11Forwarding, MaxAuthTries).",
          "File Integrity Monitor (`fim.rs`): Baseline SHA-256 integrity hashing for critical files (/etc/passwd, /etc/shadow, /etc/sudoers, /etc/hosts).",
          "Permission Auditor (`permission_auditor.rs`): Audits SUID/SGID binaries in temporary paths and world-writable configuration files in /etc.",
          "Persistence Hunter (`persistence_hunter.rs`): Scans system cron entries (/etc/crontab, /etc/cron.d) for unauthorized commands or external downloaders.",
          "Process Sentinel (`process_sentinel.rs`): Scans running processes for executions from /tmp and unlinked/deleted binary handles.",
          "Firewall Auditor (`firewall_auditor.rs`): Audits UFW status and default iptables ACCEPT policies.",
          "SSL/TLS Auditor (`ssl_auditor.rs`): Audits Let's Encrypt certificates and expiry dates.",
        ],
      },
      {
        label: "Security",
        items: [
          "Enhanced security posture coverage and real-time detection capabilities across all 7 sensor modules.",
        ],
      },
    ],
  },
  {
    version: "0.1.6",
    date: "2026-07-21",
    type: "patch",
    summary: "Implement gRPC client communication to sb-agent / Nexus Agent via tonic and SecurityService.",
    sections: [
      {
        label: "Added",
        items: [
          "gRPC Client Output mode (`SbAgentOutput`) via tonic and `tunnel.proto` Protobuf definitions.",
          "Automatic finding streaming to Nexus Agent on port 4317 multiplexed into `TunnelEnvelope_SecurityEventPayload` envelopes.",
        ],
      },
      {
        label: "Security",
        items: [
          "Enforced TLS 1.3 encrypted tunnel transmission for security event ingestion.",
        ],
      },
    ],
  },
  {
    version: "0.1.5",
    date: "2026-07-15",
    type: "patch",
    summary: "Fix TOML escape sequence bug on Windows operating systems.",
    sections: [
      {
        label: "Fixed",
        items: [
          "Normalized file path strings using forward slashes in `local_file_path` configuration parsing to prevent TOML escape character panics.",
        ],
      },
    ],
  },
  {
    version: "0.1.4",
    date: "2026-07-08",
    type: "patch",
    summary: "Implement Windows Service controller and fix installer path mismatches.",
    sections: [
      {
        label: "Added",
        items: [
          "Native Windows Service wrapper using the `windows-service` crate for silent execution under Windows Service Control Manager (SCM).",
        ],
      },
      {
        label: "Fixed",
        items: [
          "Corrected binary installation directory path mismatches in `install.ps1` for Windows SCM registration.",
        ],
      },
    ],
  },
  {
    version: "0.1.3",
    date: "2026-07-02",
    type: "patch",
    summary: "Fix SecureString decoding in install.ps1 and update REST API endpoint.",
    sections: [
      {
        label: "Fixed",
        items: [
          "Fixed `SecureString` decoding in PowerShell installer script (`install.ps1`) by avoiding improper string type coercion.",
        ],
      },
    ],
  },
  {
    version: "0.1.2",
    date: "2026-06-25",
    type: "patch",
    summary: "Update direct REST API output endpoint path.",
    sections: [
      {
        label: "Changed",
        items: [
          "Updated direct REST API output ingestion endpoint to `/agents/me/security-events`.",
        ],
      },
    ],
  },
  {
    version: "0.1.1",
    date: "2026-06-10",
    type: "patch",
    summary: "Fix cross-compilation build target issues.",
    sections: [
      {
        label: "Fixed",
        items: [
          "Disabled default OpenSSL features in `reqwest` and enabled `rustls-tls` for smooth cross-compilation across Linux and Windows targets.",
        ],
      },
    ],
  },
  {
    version: "0.1.0",
    date: "2026-05-15",
    type: "minor",
    summary: "Initial release of Ferro Sentry security agent and GitHub Actions release workflow.",
    sections: [
      {
        label: "Added",
        items: [
          "Core Event Engine with deduplication, severity scoring, and rate-limiting throttles.",
          "Port Scanner module (`port_scanner.rs`) for detecting listening interfaces and unauthenticated database exposures.",
          "Vulnerability Scanner module (`vuln_scanner.rs`) for SSH configuration checks and SUID permission auditing.",
          "GitHub Actions workflow for automated cross-compilation of Linux (x86_64, arm64) and Windows (x86_64) binaries.",
        ],
      },
    ],
  },
];
