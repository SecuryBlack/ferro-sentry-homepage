import type { Metadata } from "next";
import { Prose } from "@/components/ui/Prose";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "Offline Buffer",
  description: "How Ferro Sentry handles connectivity loss without dropping security findings.",
};

export default function OfflineBufferPage() {
  return (
    <Prose>
      <h1>Offline buffer</h1>
      <p>
        Ferro Sentry is designed to never lose security events or posture findings due to temporary network failures. When the
        local Nexus Agent or cloud endpoint is unreachable, the agent automatically switches to a local disk buffer
        and replays accumulated data once connectivity is restored.
      </p>

      <h2>How it works</h2>
      <ol>
        <li>
          On each security finding or audit tick, the agent attempts to send event envelopes to the configured endpoint.
        </li>
        <li>
          If the send fails (connection refused, timeout, DNS failure), the batch is written to a
          local buffer file on disk instead of being discarded.
        </li>
        <li>
          On the next successful connection, the agent replays all buffered batches in order before
          resuming normal operation.
        </li>
        <li>
          If the buffer reaches the configured maximum size (<code>FERROSENTRY_BUFFER_MAX_MB</code>,
          default 100 MB), the oldest events are dropped to make room for new threat alerts.
        </li>
      </ol>

      <Callout variant="info">
        Security findings in the buffer retain their original event timestamps, ensuring historical audit accuracy even after network outages.
      </Callout>

      <h2>Buffer location</h2>
      <p>Default locations by platform:</p>
      <ul>
        <li>Linux: <code>/var/lib/ferrosentry/buffer/</code></li>
        <li>Windows: <code>C:\ProgramData\ferro-sentry\buffer\</code></li>
      </ul>
      <p>Override with the <code>FERROSENTRY_BUFFER_PATH</code> environment variable:</p>
      <CodeBlock
        code={`FERROSENTRY_BUFFER_PATH=/data/ferrosentry/buffer`}
        language="bash"
      />

      <h2>Monitoring buffer state</h2>
      <p>The agent logs buffer activity at <code>info</code> level:</p>
      <CodeBlock
        code={`INFO ferro_sentry: endpoint unreachable, buffering findings (buffer: 4 MB / 100 MB)
INFO ferro_sentry: connection restored, replaying 12 buffered event batches
INFO ferro_sentry: buffer drained, resuming live stream`}
        language="bash"
        filename="Log output"
        showCopy={false}
      />
    </Prose>
  );
}
