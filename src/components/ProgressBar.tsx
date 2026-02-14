"use client";

import { Check } from "lucide-react";

interface ProgressBarProps {
  currentQuest: number;
  questsCompleted: boolean[];
}

export default function ProgressBar({ currentQuest, questsCompleted }: ProgressBarProps) {
  const total = 5;
  const done = questsCompleted.filter(Boolean).length;

  return (
    <div className="w-full px-5 py-3">
      <div className="max-w-sm mx-auto">
        <div className="flex items-center justify-between mb-2">
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-400 shrink-0"
                style={{
                  background: questsCompleted[i]
                    ? "var(--success)"
                    : i === currentQuest
                    ? "var(--purple)"
                    : "var(--surface)",
                  color: questsCompleted[i] || i === currentQuest
                    ? "#fff"
                    : "var(--text-muted)",
                  border: questsCompleted[i] || i === currentQuest
                    ? "none"
                    : "1.5px solid var(--border)",
                }}
              >
                {questsCompleted[i] ? <Check size={14} strokeWidth={3} /> : i + 1}
              </div>
              {i < total - 1 && (
                <div
                  className="h-px w-full mx-1.5 transition-all duration-500"
                  style={{
                    background: questsCompleted[i] ? "var(--success)" : "var(--border)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-xs" style={{ color: "var(--text-muted)" }}>
          {done === total ? "aventura completa" : `etapa ${currentQuest + 1} de ${total}`}
        </p>
      </div>
    </div>
  );
}
