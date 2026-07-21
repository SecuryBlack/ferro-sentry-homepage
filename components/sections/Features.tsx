"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Wifi,
  Shield,
  Key,
  FileCheck,
  Eye,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Card } from "@/components/ui/Card";

const features = [
  {
    icon: Shield,
    title: "Port & Listener Auditor",
    description:
      "Active SYN/TCP scanner that audits listening interfaces, detects non-standard open ports, and alerts on databases exposed to 0.0.0.0 (MongoDB, Redis, Elasticsearch).",
    status: "live",
    statusLabel: "Available",
  },
  {
    icon: Key,
    title: "Posture & Vulnerability Scanner",
    description:
      "Audits SSH configurations (PermitRootLogin, PasswordAuth), checks SUID/SGID suspicious binary permissions, world-writable files, and kernel CVE exposures.",
    status: "live",
    statusLabel: "Available",
  },
  {
    icon: Zap,
    title: "Ultralight Rust Engine",
    description:
      "~2 MB static binary running as a systemd or Windows Service with <0.1% CPU overhead, zero runtime dependencies, and memory safety guaranteed.",
    status: "live",
    statusLabel: "Available",
  },
  {
    icon: Wifi,
    title: "gRPC & Nexus Agent Tunnel",
    description:
      "Multiplexes posture findings over local gRPC (port 4317) to Nexus Agent, which forwards security envelopes through outbound TLS streams.",
    status: "live",
    statusLabel: "Available",
  },
  {
    icon: Eye,
    title: "Process Sentinel (EDR)",
    description:
      "Real-time monitoring of process spawning, interactive shell children, execution from /tmp, hidden PIDs, and deleted executable binary dangling references.",
    status: "dev",
    statusLabel: "In Development",
  },
  {
    icon: FileCheck,
    title: "File Integrity Monitor (FIM)",
    description:
      "Real-time inotify / ReadDirectoryChangesW tracking of critical configuration files (/etc/passwd, /etc/ssh, certs) with SHA-256 baseline snapshots.",
    status: "dev",
    statusLabel: "In Development",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Features() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-16">
          <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-3">
            Capabilities & Roadmap
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)]">
            Active defense & continuous compliance
          </h2>
          <p className="mt-4 text-[var(--color-muted)] max-w-xl mx-auto">
            Review live operational modules alongside upcoming EDR sensors currently under active development.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            const isLive = feature.status === "live";

            return (
              <motion.div key={feature.title} variants={item}>
                <Card hover glow className="h-full flex flex-col gap-4 relative">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-primary-glow)] border border-[var(--color-primary-dim)] flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-[var(--color-primary)]" />
                    </div>
                    {isLive ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 size={12} />
                        {feature.statusLabel}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2.5 py-0.5 rounded-full">
                        <Clock size={12} />
                        {feature.statusLabel}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-[var(--color-text)] mb-1.5 flex items-center gap-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
