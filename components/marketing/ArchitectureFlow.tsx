"use client";

import React from "react";
import { Badge } from "@/components/catalyst/badge";
import { ClipboardCheck, Filter, Send, Wrench } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: ClipboardCheck,
    title: "Audit",
    desc: "Every hour, runs its eleven audit modules: ports, packages, SSH, file integrity, permissions, persistence, processes, firewall, fail2ban/CrowdSec, failed logins and an inventory of Let's Encrypt certificates.",
    tag: "Read-only",
  },
  {
    step: "02",
    icon: Filter,
    title: "Normalize",
    desc: "Tags each finding with the host name, a severity and a suggested fix, drops duplicates within a scan and, for some checks, sends a resolved event when the problem goes away.",
    tag: "Event engine",
  },
  {
    step: "03",
    icon: Send,
    title: "Report",
    desc: "Posts each finding as JSON to the SecuryBlack API with your token, hands it to the local SecuryBlack agent over gRPC, or writes it to a local JSONL file.",
    tag: "Outbound only",
  },
  {
    step: "04",
    icon: Wrench,
    title: "Fix on request",
    desc: "Runs a remediation only when a command arrives on its token-protected local socket, normally sent from the panel.",
    tag: "Explicit",
  },
];

export function ArchitectureFlow() {
  return (
    <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="neutral" className="mb-3">
          How it works
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Four steps, one binary
        </h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
          Open source under Apache 2.0. Read it on GitHub.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/30 flex flex-col justify-between relative group hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 font-bold">
                    STEP {item.step}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {item.tag}
                  </span>
                </div>

                <div className="size-10 rounded-xl bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-center text-[var(--agent-primary-dark)] dark:text-[var(--agent-primary-light)] mb-4">
                  <Icon className="size-5" />
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
