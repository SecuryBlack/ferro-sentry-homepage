import type { Metadata } from "next";
import { Prose } from "@/components/ui/Prose";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "Quick Start",
  description: "Install Ferro Sentry and start security auditing in under 5 minutes.",
};

export default function QuickStart() {
  return (
    <Prose>
      <h1>Quick Start</h1>
      <p>
        This guide gets Ferro Sentry installed and auditing your server security posture in under 5 minutes.
        You&apos;ll need a server running Linux (x86_64 or ARM64) or Windows.
      </p>

      <h2>Step 1 — Get your token</h2>
      <p>
        Log in to the SecuryBlack dashboard and generate an agent token from the{" "}
        <strong>Settings → Tokens</strong> page. It will look like{" "}
        <code>fs_live_xxxxxxxxxxxx</code>.
      </p>
      <Callout variant="info">
        If you&apos;re self-hosting your own OTLP collector, you can set{" "}
        <code>FERROSENTRY_ENDPOINT</code> directly to your collector&apos;s gRPC address.
      </Callout>

      <h2>Step 2 — Install the agent</h2>
      <h3>Linux / macOS</h3>
      <CodeBlock
        code={`curl -fsSL https://install.ferrosentry.dev | sudo bash`}
        language="bash"
        filename="Terminal"
      />
      <h3>Windows (PowerShell — run as Administrator)</h3>
      <CodeBlock
        code={`irm https://install.ferrosentry.dev | iex`}
        language="powershell"
        filename="PowerShell"
      />
      <p>
        The installer will prompt for your token, detect your architecture, download the correct
        binary, and register the agent as a system service with automatic restart.
      </p>

      <h2>Step 3 — Verify the agent is running</h2>
      <h3>Linux</h3>
      <CodeBlock
        code={`systemctl status ferrosentry`}
        language="bash"
      />
      <CodeBlock
        code={`● ferrosentry.service - Ferro Sentry Security Agent
     Active: active (running)`}
        language="bash"
        filename="Expected output"
        showCopy={false}
      />
      <h3>Windows</h3>
      <CodeBlock
        code={`Get-Service -Name FerroSentry`}
        language="powershell"
      />

      <h2>Step 4 — Check security auditing logs</h2>
      <p>
        Within minutes of starting the agent, posture findings should appear in your dashboard or
        gRPC backend. You can also tail the logs to confirm:
      </p>
      <CodeBlock
        code={`# Linux
journalctl -u ferrosentry -f

# Windows
Get-EventLog -LogName Application -Source FerroSentry -Newest 10`}
        language="bash"
        filename="Logs"
      />
      <CodeBlock
        code={`INFO ferro_sentry: agent started, auditing posture
INFO ferro_sentry: port scanner completed (0 unauth exposed DBs found)
INFO ferro_sentry: vuln scanner completed (SSH RootLogin disabled)`}
        language="bash"
        filename="Expected log output"
        showCopy={false}
      />

      <Callout variant="success">
        That&apos;s it. Ferro Sentry is now running and protecting your server posture.
        The agent will also check for updates daily and self-update automatically.
      </Callout>

      <h2>Next steps</h2>
      <ul>
        <li>
          <a href="/docs/configuration">Configuration reference</a> — customize intervals,
          log level, buffer path
        </li>
        <li>
          <a href="/docs/metrics">Modules</a> — full list of active and roadmap security sensors
        </li>
        <li>
          <a href="/docs/offline-buffer">Offline buffer</a> — how resilience works
        </li>
      </ul>
    </Prose>
  );
}
