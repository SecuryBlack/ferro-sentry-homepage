"use client";

import { motion } from "framer-motion";
import { Github, GitFork, Star, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const highlights = [
  {
    icon: FileText,
    title: "Apache 2.0 / MIT Dual License",
    description:
      "Permissive license. Use it in commercial projects, modify rules, distribute it — total transparency.",
  },
  {
    icon: GitFork,
    title: "Custom Security Rules",
    description:
      "Write custom detection rules in YAML or YARA signatures. Contribute rules back to the global threat feed.",
  },
  {
    icon: Star,
    title: "Self-hostable & Auditable",
    description:
      "Run your own gRPC ingested proxy or local JSON logging. Complete control over your security data.",
  },
];

export function OpenSourceSection() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-3">
              Open Source
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-4">
              Built in the open,
              <br />
              transparent threat defense.
            </h2>
            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              Ferro Sentry is an open-source security agent maintained by SecuryBlack. Security through obscurity is dead — we believe host protection code must be public, performant, and auditable.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                href="https://github.com/securyblack/ferro-sentry"
                variant="primary"
                size="md"
                external
              >
                <Github size={16} />
                View source on GitHub
              </Button>
              <Button
                href="https://github.com/securyblack/ferro-sentry/blob/main/LICENSE"
                variant="outline"
                size="md"
                external
              >
                <FileText size={16} />
                Open Source License
              </Button>
            </div>
          </motion.div>

          {/* Right — cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} hover className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-[var(--radius-md)] bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={16} className="text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--color-text)] mb-1">{item.title}</p>
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
