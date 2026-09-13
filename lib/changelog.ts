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
    version: "0.2.15",
    date: "2026-09-13",
    type: "patch",
    summary: "Consolidate findings by executable in Process Sentinel, scan cache reset, and well-known Windows port rules.",
    sections: [
      {
        label: "Fixed",
        items: [
          "Process Sentinel now consolidates findings by executable path instead of PID, preventing duplicate alerts across process restarts.",
          "Added scan cache reset mechanism so manual or periodic rescans re-evaluate active state cleanly.",
          "Eliminated test mock events from security scans and added well-known Windows system ports (RPC, NetBIOS, SMB) to avoid false positives.",
        ],
      },
    ],
  },
  {
    version: "0.2.14",
    date: "2026-09-13",
    type: "patch",
    summary: "Auto-resolve terminated processes and dynamic state transitions in Process Sentinel.",
    sections: [
      {
        label: "Added",
        items: [
          "Process Sentinel automatically detects when a flagged suspicious process terminates and emits a resolution event to clear the finding.",
          "Support for dynamic security finding state transitions and automated resolution dispatch through the local agent tunnel.",
        ],
      },
    ],
  },
  {
    version: "0.2.13",
    date: "2026-09-08",
    type: "patch",
    summary: "Windows static CRT runtime and Windows Server 2019 installer compatibility.",
    sections: [
      {
        label: "Fixed",
        items: [
          "Enabled static CRT linking (`windows-static-crt`) on Windows x86_64 MSVC targets, eliminating Visual C++ Redistributable runtime dependency.",
          "PowerShell installer now explicitly forces TLS 1.2+ and sets execution policy bypass for compatibility with Windows Server 2019 and PowerShell 5.1.",
        ],
      },
    ],
  },
  {
    version: "0.2.11",
    date: "2026-08-25",
    type: "minor",
    summary: "Intrusion prevention, authentication monitoring, sudo logging and auto-upgrades posture rules.",
    sections: [
      {
        label: "Added",
        items: [
          "New security audit rules: checks for active intrusion prevention (Fail2ban/CrowdSec), system authentication monitoring, sudo command logging, and unattended security upgrades.",
        ],
      },
    ],
  },
  {
    version: "0.2.10",
    date: "2026-08-24",
    type: "minor",
    summary: "Remote command intake for one-click updates and direct token synchronization.",
    sections: [
      {
        label: "Added",
        items: [
          "Remote command intake support: added `update_now` handler enabling one-click manual updates triggered from the SecuryBlack App.",
          "New `sync_direct_token` command handler to synchronize direct API tokens securely without daemon restart.",
        ],
      },
      {
        label: "Fixed",
        items: [
          "Findings now automatically resolve when the underlying insecure condition is rectified on the server.",
        ],
      },
    ],
  },
  {
    version: "0.2.3",
    date: "2026-08-23",
    type: "patch",
    summary: "Consume sb-agent-core from crates.io instead of a git dependency.",
    sections: [
      {
        label: "Changed",
        items: [
          "The shared `sb-agent-core` runtime is now pulled from crates.io as a versioned dependency instead of a git branch reference, matching normal Rust dependency practice.",
        ],
      },
    ],
  },
  {
    version: "0.2.2",
    date: "2026-08-23",
    type: "minor",
    summary: "Retrofitted onto sb-agent-core: shared config, logging, service wrapper, updater and a new local status socket + TUI.",
    sections: [
      {
        label: "Added",
        items: [
          "New local `status` and `top` CLI commands — `status` prints a JSON snapshot of the running agent (state, version, last scan time); `top` opens a live-refreshing terminal view of the same data. See the CLI & live status docs page.",
          "Status socket (Unix socket / Windows named pipe) that Nexus Agent now reads directly to detect whether FerroSentry is running, instead of relying on process/PATH heuristics.",
        ],
      },
      {
        label: "Fixed",
        items: [
          "The `log_level` setting in `config.toml` was loaded but never actually applied — logging always ran at the hardcoded default level regardless of configuration. Config is now loaded before logging initializes, so `log_level` takes effect as documented.",
        ],
      },
      {
        label: "Changed",
        items: [
          "Config loading, logging, the Windows Service wrapper, and the GitHub-Releases auto-updater now come from the shared `sb-agent-core` crate used by all SecuryBlack Rust agents, instead of duplicated per-agent code.",
        ],
      },
    ],
  },
  {
    version: "0.2.1",
    date: "2026-07-23",
    type: "patch",
    summary: "Auto-update daily check and SCM service restart policy.",
    sections: [
      {
        label: "Added",
        items: [
          "Daily auto-update check against GitHub Releases, matching the behavior already shipped in OxiPulse and Nexus Agent.",
          "Windows Service Manager restart policy so the service recovers automatically after an update or a crash.",
        ],
      },
    ],
  },
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
