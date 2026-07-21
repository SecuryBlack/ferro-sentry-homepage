"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Wifi,
  Shield,
  Key,
  FileCheck,
  Eye,
} from "lucide-react";
import { Card } from "@/components/ui/Card";

const features = [
  {
    icon: Eye,
    title: "Process Sentinel (EDR)",
    description:
      "Detects suspicious child processes, shell executions from /tmp, hidden PIDs, memory injections, and deleted execution binaries.",
  },
  {
    icon: FileCheck,
    title: "File Integrity Monitor (FIM)",
    description:
      "Real-time file change monitoring for critical system files (/etc/passwd, system binaries, certs) with SHA-256 baseline hash snapshots.",
  },
  {
    icon: Key,
    title: "Auth Guard & SSH Audit",
    description:
      "Monitors failed SSH logins, brute force attempts, sudo escalation, root access flags, and weak authentication settings.",
  },
  {
    icon: Shield,
    title: "Port & Firewall Auditing",
    description:
      "Scans local listening interfaces, checks UFW/iptables/Windows Firewall rules, and flags databases exposed to 0.0.0.0.",
  },
  {
    icon: Zap,
    title: "Ultralight Rust Agent",
    description:
      "~2 MB static binary running as a systemd / Windows Service with <0.1% CPU overhead and zero runtime dependencies.",
  },
  {
    icon: Wifi,
    title: "gRPC Tunneling via Nexus Agent",
    description:
      "Multiplexes real-time threat events and security posture findings with standard gRPC telemetry to SecuryBlack Cloud.",
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
            Why Ferro Sentry
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)]">
            Active defense & continuous compliance in one binary
          </h2>
          <p className="mt-4 text-[var(--color-muted)] max-w-xl mx-auto">
            Combines runtime threat detection with posture auditing to keep your VPS fleet hardened and compliant 24/7.
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
            return (
              <motion.div key={feature.title} variants={item}>
                <Card hover glow className="h-full flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-primary-glow)] border border-[var(--color-primary-dim)] flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text)] mb-1.5">
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
