"use client";

import { Lock, Unlock } from "lucide-react";

interface CodeRevealProps {
  digits: string[];
  revealed: boolean[];
  label: string;
}

export default function CodeReveal({ digits, revealed, label }: CodeRevealProps) {
  const allRevealed = revealed.every(Boolean);

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-1.5 mb-3">
        {allRevealed ? (
          <Unlock size={14} className="text-[var(--success)]" />
        ) : (
          <Lock size={14} className="text-[var(--text-muted)]" />
        )}
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
          {label}
        </p>
      </div>

      <div className="flex items-center justify-center gap-1.5 flex-wrap">
        {digits.map((digit, i) => (
          <div
            key={i}
            className={`digit-cell ${revealed[i] ? "revealed" : ""}`}
            style={{ animationDelay: revealed[i] ? `${i * 80}ms` : undefined }}
          >
            {revealed[i] ? digit : "?"}
          </div>
        ))}
      </div>

      {allRevealed && (
        <div className="mt-4 animate-fade">
          <p className="text-xl font-bold tracking-[0.25em]" style={{ color: "var(--purple)", fontFamily: "var(--font-display)" }}>
            {digits.join("")}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--success)" }}>
            codigo completo
          </p>
        </div>
      )}
    </div>
  );
}
