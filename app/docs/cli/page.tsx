import type { Metadata } from "next";
import { Prose } from "@/components/ui/Prose";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "CLI & Live Status",
  description: "Inspect a running Ferro Sentry agent from the command line: version, JSON status, and a live TUI.",
};

export default function CliPage() {
  return (
    <Prose>
      <h1>CLI & live status</h1>
      <p>
        Since v0.2.2, Ferro Sentry exposes a small set of local commands to inspect a running
        agent without waiting for its next scan cycle to land in your dashboard. These read from
        a local status socket the agent keeps open while it runs — a Unix socket on Linux, a
        named pipe on Windows.
      </p>

      <h2><code>--version</code></h2>
      <p>Prints the installed version and exits.</p>
      <CodeBlock code={`ferro-sentry --version`} language="bash" />
      <CodeBlock
        code={`ferro-sentry 0.2.3`}
        language="bash"
        filename="Output"
        showCopy={false}
      />

      <h2><code>status</code></h2>
      <p>
        Prints a single JSON snapshot of the running agent&apos;s state — useful for scripting or
        health checks.
      </p>
      <CodeBlock code={`ferro-sentry status`} language="bash" />
      <CodeBlock
        code={`{
  "agent": "ferro-sentry",
  "version": "0.2.3",
  "state": "running",
  "since_unix": 1755970483,
  "details": {
    "last_scan_unix": 1755970779
  }
}`}
        language="json"
        filename="Output"
        showCopy={false}
      />
      <p>
        If the agent isn&apos;t running, the command fails with a connection error instead of
        printing a payload — safe to use as a liveness check in scripts.
      </p>

      <h2><code>top</code></h2>
      <p>
        Opens a live, auto-refreshing terminal view of the agent&apos;s status — state, version,
        uptime, and the time of its last completed scan cycle. Refreshes roughly once per second.
        Press <code>q</code> or <code>Esc</code> to quit.
      </p>
      <CodeBlock code={`ferro-sentry top`} language="bash" />

      <Callout variant="info">
        <code>status</code> and <code>top</code> only work while the agent service is actually
        running on that machine — they talk to the local socket/pipe directly, not to
        SecuryBlack&apos;s backend. They&apos;re a local debugging tool, not a replacement for the
        dashboard.
      </Callout>

      <h2>Under the hood</h2>
      <p>
        These commands are provided by{" "}
        <a href="https://crates.io/crates/sb-agent-core" target="_blank" rel="noreferrer">
          sb-agent-core
        </a>
        , the runtime Ferro Sentry shares with SecuryBlack&apos;s other Rust agents (OxiPulse,
        Nexus Agent, CupraFlow). All four expose the same <code>status</code>/<code>top</code>{" "}
        interface, so the same muscle memory works across agents.
      </p>
    </Prose>
  );
}
