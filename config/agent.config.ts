export interface InstallCommand {
  os: "Linux" | "Windows";
  cmd: string;
  badge?: string;
  /** Shown under the command, for steps the command itself does not do. */
  note?: string;
}

export interface StatItem {
  label: string;
  value: string;
  note: string;
}

export interface BentoFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  colSpan?: "col-span-1" | "col-span-2" | "col-span-3";
  tag: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface AgentTheme {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  glow: string; // rgba
  accentTag: string; // Tailwind color class for badges
}

export interface EcosystemAgent {
  id: string;
  name: string;
  role: string;
  tagline: string;
  url: string;
  githubUrl: string;
  color: string;
  badge: string;
}

export const ecosystemAgents: EcosystemAgent[] = [
  {
    id: "oxipulse",
    name: "OxiPulse",
    role: "Metrics",
    tagline: "Host metrics agent that exports over OTLP.",
    url: "https://oxipulse.dev",
    githubUrl: "https://github.com/securyblack/oxi-pulse",
    color: "#33E1BF",
    badge: "OTLP Metrics",
  },
  {
    id: "ferrosentry",
    name: "FerroSentry",
    role: "Security audit",
    tagline: "Server security audit agent.",
    url: "https://ferrosentry.dev",
    githubUrl: "https://github.com/securyblack/ferro-sentry",
    color: "#F43F5E",
    badge: "Security",
  },
  {
    id: "cupraflow",
    name: "CupraFlow",
    role: "Networking (in development)",
    tagline: "Networking and high availability (in development).",
    url: "https://cupraflow.dev",
    githubUrl: "https://github.com/securyblack/cupra-flow",
    color: "#F97316",
    badge: "In development",
  },
  {
    id: "cromoforge",
    name: "CromoForge",
    role: "Docker & PostgreSQL",
    tagline: "Docker containers, logs and PostgreSQL management.",
    url: "https://cromoforge.dev",
    githubUrl: "https://github.com/securyblack/cromo-forge",
    color: "#6366F1",
    badge: "Containers",
  },
  {
    id: "titanvault",
    name: "TitanVault",
    role: "Backups",
    tagline: "Scheduled PostgreSQL and file backups to S3-compatible storage.",
    url: "https://titanvault.dev",
    githubUrl: "https://github.com/securyblack/titan-vault",
    color: "#06B6D4",
    badge: "Backups",
  },
];

export interface AgentConfig {
  id: string;
  name: string;
  binaryName: string;
  productTitle: string;
  badge: string;
  version: string;
  tagline: string;
  description: string;
  theme: AgentTheme;
  githubUrl: string;
  docsUrl: string;
  installCommands: InstallCommand[];
  stats: StatItem[];
  features: BentoFeature[];
  faq: FAQItem[];
}

export const activeAgentConfig: AgentConfig = {
  id: "ferro-sentry",
  name: "FerroSentry",
  binaryName: "ferro-sentry",
  productTitle: "FerroSentry — Server security audit agent",
  badge: "Open source · Apache 2.0 · Rust",
  version: "v0.2.33",
  tagline: "Security audits and real-time alerts for your servers",
  description:
    "A Rust agent that audits your Linux servers every hour and watches critical files and SSH logins in real time: open ports, SSH configuration, firewall and Docker bypass, pending security updates, SUID binaries, cron persistence, suspicious processes, failed logins and logins from new addresses, plaintext secrets, changes to SSH authorized keys and fail2ban/CrowdSec. Findings go to SecuryBlack Cloud, where you can also ask it to apply fixes.",
  theme: {
    primary: "#F43F5E", // Scarlet / Rose
    primaryDark: "#E11D48",
    primaryLight: "#FB7185",
    glow: "rgba(244, 63, 94, 0.15)",
    accentTag: "rose",
  },
  githubUrl: "https://github.com/securyblack/ferro-sentry",
  docsUrl: "https://github.com/securyblack/ferro-sentry#readme",
  installCommands: [
    {
      os: "Linux",
      cmd: "curl -fsSL https://install.ferrosentry.dev | sudo bash -s -- --endpoint https://api.securyblack.com --token <TOKEN>",
      badge: "Recommended",
      note: "Get the token for your server in the SecuryBlack panel. Without --endpoint and --token the script asks for them. Needs systemd; x86_64 and aarch64.",
    },
    {
      os: "Windows",
      cmd: "& ([scriptblock]::Create((irm https://install.ferrosentry.dev))) -Endpoint https://api.securyblack.com -Token <TOKEN>",
      note: "Run in PowerShell as Administrator. Installs the FerroSentry service; most audit modules are Linux-only today.",
    },
  ],
  stats: [
    { label: "Alert time", value: "10 s", note: "Critical files and logins; the rest hourly" },
    { label: "Audit modules", value: "12", note: "Ports, SSH, secrets, FIM…" },
    { label: "Changes", value: "On request", note: "Only on explicit commands" },
    { label: "Updates", value: "Signed", note: "ed25519-verified releases" },
  ],
  features: [
    {
      id: "posture",
      title: "Posture audit",
      subtitle: "Every hour",
      description:
        "Checks listening ports, the SSH settings sshd actually applies (root login, password authentication, port 22, X11 forwarding, MaxAuthTries), UFW and the iptables INPUT policy, Docker bypassing UFW, pending and security updates (apt, dnf, yum), unattended upgrades, SUID/SGID binaries in temporary directories, world-writable files in /etc and sudo logging.",
      colSpan: "col-span-2",
      tag: "Audit",
    },
    {
      id: "signals",
      title: "Intrusion signals",
      subtitle: "Within seconds",
      description:
        "Every 10 seconds: successful SSH logins from an address never seen for that user, and changes to /etc/passwd, /etc/shadow, /etc/sudoers, sshd_config, every user's authorized_keys and other critical files against a SHA-256 baseline. Every hour: failed logins in /var/log/auth.log, processes running from /tmp or /dev/shm or from deleted binaries and suspicious cron entries.",
      colSpan: "col-span-1",
      tag: "Detection",
    },
    {
      id: "secrets",
      title: "Plaintext secrets",
      subtitle: "What an intruder takes first",
      description:
        "Finds credentials left in plaintext: AWS keys, npm, PyPI, Docker, GitHub CLI and Kubernetes tokens, .git-credentials, .netrc, SSH private keys without a passphrase and .env files any user can read. Only the path and type are reported, never the content.",
      colSpan: "col-span-1",
      tag: "Detection",
    },
    {
      id: "remediation",
      title: "Fixes when you ask",
      subtitle: "From the SecuryBlack panel",
      description:
        "SSH hardening that checks sshd really applied it, UFW rules with anti-lockout protection, unattended upgrades, and installing and managing fail2ban and CrowdSec, including ban and unban. OS upgrades only run if you set allow_remote_os_upgrade = true on the server.",
      colSpan: "col-span-1",
      tag: "Remediation",
    },
    {
      id: "trust",
      title: "Signed updates and commands",
      subtitle: "ed25519",
      description:
        "The daily self-update only installs releases signed with SecuryBlack's offline ed25519 keys. Commands from the panel carry an ed25519 signature bound to your server (enforcement is rolling out). Every outbound connection is listed in SECURITY.md.",
      colSpan: "col-span-1",
      tag: "Trust",
    },
  ],
  faq: [
    {
      question: "Do I need a SecuryBlack account?",
      answer:
        "The install scripts are set up for SecuryBlack Cloud and require an endpoint and a token. To run it without an account, set mode = \"local_file\" in /etc/ferro-sentry/config.toml after installing; findings are then only written to a local JSONL file.",
    },
    {
      question: "Does it block attackers by itself?",
      answer:
        "No. FerroSentry audits and reports. It does not ban IPs or change firewall rules on its own; it can install and manage fail2ban, CrowdSec and UFW when you ask for it from the panel.",
    },
    {
      question: "What does it change on my server?",
      answer:
        "The audits are read-only. Changes only happen when an explicit command arrives on its local command socket, which is protected by a root-only token and is normally fed by the SecuryBlack companion agent from the panel.",
    },
    {
      question: "Which platforms are supported?",
      answer:
        "Linux x86_64 and aarch64 with systemd. Most checks target common Linux paths and tools (sshd_config, UFW, auth.log, apt or dnf). A Windows x86_64 build runs as a service, but most checks are Linux-only today.",
    },
    {
      question: "Does it run as root?",
      answer:
        "Yes. It reads root-only files such as sshd_config, firewall rules and auth logs, and the self-updater replaces its own binary. SECURITY.md lists what it runs and every host it contacts.",
    },
  ],
};
