import type { Metadata } from "next";
import { Prose } from "@/components/ui/Prose";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "Contributing",
  description: "How to contribute to the Ferro Sentry open-source project.",
};

export default function ContributingPage() {
  return (
    <Prose>
      <h1>Contributing</h1>
      <p>
        Ferro Sentry is an open-source security project and contributions are welcome. This guide explains how
        to set up a local development environment, write custom rules, and submit a pull request.
      </p>

      <h2>Prerequisites</h2>
      <ul>
        <li>
          <a href="https://rustup.rs" target="_blank" rel="noopener noreferrer">Rust</a> (stable,
          edition 2024 or later)
        </li>
        <li>Git</li>
        <li>Linux or Windows development environment</li>
      </ul>

      <h2>Local setup</h2>
      <CodeBlock
        code={`# Clone the repo
git clone https://github.com/securyblack/ferro-sentry.git
cd ferro-sentry

# Build in debug mode
cargo build

# Run the agent locally (using local debug output)
FERROSENTRY_ENDPOINT=127.0.0.1:4317 FERROSENTRY_TOKEN=test cargo run`}
        language="bash"
        filename="Getting started"
      />

      <h2>Project structure</h2>
      <CodeBlock
        code={`src/
├── main.rs          # Entry point, service loop
├── config.rs        # Config loading (env vars + TOML)
├── engine/          # Event engine, dedup, severity scoring
├── modules/         # Security modules (port_scanner, vuln_scanner)
├── output/          # Telemetry output layer (sb_agent, direct, file)
└── updater/         # Auto-update logic`}
        language="bash"
        filename="Source tree"
        showCopy={false}
      />

      <h2>Submitting a pull request</h2>
      <ol>
        <li>Fork the repository on GitHub.</li>
        <li>
          Create a branch: <code>git checkout -b feat/my-security-rule</code>
        </li>
        <li>Make your changes and ensure <code>cargo build</code> passes.</li>
        <li>
          Run <code>cargo clippy -- -D warnings</code> and fix any lint errors.
        </li>
        <li>Open a pull request against the <code>main</code> branch with a clear description.</li>
      </ol>

      <Callout variant="info">
        Keep dependencies <strong>Apache-2.0 or MIT only</strong>. No GPL or LGPL dependencies
        are accepted. This is a hard requirement to keep the project commercially usable.
      </Callout>

      <h2>Security issues</h2>
      <p>
        Please do not open public GitHub issues for security vulnerabilities. Instead, report them
        privately via{" "}
        <a href="mailto:security@securyblack.com">security@securyblack.com</a>.
      </p>

      <h2>Commit conventions</h2>
      <p>We use conventional commits for clean release notes:</p>
      <CodeBlock
        code={`feat: add SUID binary auditor
fix: prevent false positive on port scan
docs: update configuration reference
chore: bump tonic to 0.12`}
        language="bash"
        filename="Commit format examples"
        showCopy={false}
      />

      <h2>Code of conduct</h2>
      <p>
        Be respectful. We follow the{" "}
        <a
          href="https://www.contributor-covenant.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contributor Covenant
        </a>{" "}
        code of conduct.
      </p>
    </Prose>
  );
}
