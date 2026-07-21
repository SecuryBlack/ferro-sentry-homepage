import type { Metadata } from "next";
import { Prose } from "@/components/ui/Prose";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "Auto-Update",
  description: "How the Ferro Sentry agent updates itself automatically from GitHub Releases.",
};

export default function AutoUpdatePage() {
  return (
    <Prose>
      <h1>Auto-update</h1>
      <p>
        Ferro Sentry includes a built-in self-update mechanism. The agent performs an initial update check <strong>1 minute after startup</strong> and subsequently checks once per day on the
        GitHub Releases page for a newer version. If one is found, it downloads the correct binary
        for the current platform, replaces itself on disk, and exits cleanly so the system service
        manager can restart it.
      </p>

      <h2>Update flow</h2>
      <ol>
        <li>
          Agent performs an initial check <code>1 minute after startup</code> and then every 24 hours against <code>https://api.github.com/repos/securyblack/ferro-sentry/releases/latest</code>.
        </li>
        <li>
          Compares the remote version tag against the current binary version using semantic
          versioning.
        </li>
        <li>
          If a newer version exists, downloads the correct binary for the current OS and
          architecture.
        </li>
        <li>
          Verifies the download integrity via SHA256 checksum published in the release.
        </li>
        <li>
          Replaces the running binary on disk and calls <code>exit(0)</code> cleanly.
        </li>
        <li>
          systemd (Linux) or the Windows Service Manager restarts the process automatically,
          picking up the new binary.
        </li>
      </ol>

      <Callout variant="info">
        The update check uses the GitHub public API and requires outbound HTTPS access to{" "}
        <code>api.github.com</code> and <code>github.com</code>. No other external connections
        are made during the update process.
      </Callout>

      <h2>Logs</h2>
      <CodeBlock
        code={`INFO ferro_sentry::updater: initial check in 1 min (current: v0.1.6)
INFO ferro_sentry::updater: new version available: v0.2.0
INFO ferro_sentry::updater: downloading ferro-sentry-linux-x86_64 v0.2.0
INFO ferro_sentry::updater: checksum verified, replacing binary
INFO ferro_sentry::updater: update complete, restarting`}
        language="bash"
        filename="Update log output"
        showCopy={false}
      />

      <h2>Disabling auto-update</h2>
      <p>
        If you manage updates through your own package management or deployment pipeline, you can
        disable the auto-updater:
      </p>
      <CodeBlock
        code={`# Environment variable
FERROSENTRY_AUTO_UPDATE=false

# Or in config.toml
auto_update = false`}
        language="toml"
      />

      <h2>Pinning a version</h2>
      <p>
        To install a specific version instead of the latest, pass the version tag to the install
        script:
      </p>
      <CodeBlock
        code={`# Linux
FERROSENTRY_VERSION=v0.1.6 curl -fsSL https://install.ferrosentry.dev | sudo bash

# Windows
$env:FERROSENTRY_VERSION="v0.1.6"; irm https://install.ferrosentry.dev/windows | iex`}
        language="bash"
      />

      <Callout variant="warning">
        Pinned versions will not auto-update. You are responsible for monitoring and applying
        security releases manually if auto-update is disabled or a version is pinned.
      </Callout>
    </Prose>
  );
}
