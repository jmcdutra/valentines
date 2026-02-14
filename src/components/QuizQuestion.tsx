"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import type { QuizQuestion as QuizQuestionType } from "@/lib/quests";

interface QuizQuestionProps {
  question: QuizQuestionType;
  previousAnswer: number | null;
  onAnswer: (questionId: string, selectedIndex: number) => void;
  onCorrectDigit?: (digit: string) => void;
}

export default function QuizQuestion({
  question,
  previousAnswer,
  onAnswer,
  onCorrectDigit,
}: QuizQuestionProps) {
  const [selected, setSelected] = useState<number | null>(previousAnswer);
  const [revealed, setRevealed] = useState(previousAnswer !== null);

  const answered = revealed && selected !== null;
  const correct = selected === question.correctIndex;

  const handleSelect = (i: number) => {
    if (answered) return;
    setSelected(i);
    setRevealed(true);
    onAnswer(question.id, i);
    if (i === question.correctIndex && question.digit && onCorrectDigit) {
      onCorrectDigit(question.digit);
    }
  };

  const optionClass = (i: number) => {
    if (!answered) return "option";
    if (i === question.correctIndex) return "option correct";
    if (i === selected && !correct) return "option wrong";
    return "option";
  };

  return (
    <div className="animate-enter">
      <p className="text-sm font-medium mb-4 leading-relaxed" style={{ color: "var(--text)" }}>
        {question.question}
      </p>

      <div className="space-y-2.5">
        {question.options.map((opt, i) => (
          <button key={i} className={optionClass(i)} onClick={() => handleSelect(i)} disabled={answered}>
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
              style={{
                background: answered && i === question.correctIndex
                  ? "var(--success)"
                  : answered && i === selected && !correct
                  ? "var(--error)"
                  : "var(--bg-warm)",
                color: answered && (i === question.correctIndex || (i === selected && !correct))
                  ? "#fff"
                  : "var(--text-secondary)",
              }}
            >
              {String.fromCharCode(65 + i)}
            </span>
            <span className="flex-1">{opt}</span>
          </button>
        ))}
      </div>

      {answered && (
        <div
          className="mt-4 p-3.5 rounded-lg text-sm flex items-start gap-2.5 animate-fade"
          style={{
            background: correct ? "var(--success-bg)" : "var(--error-bg)",
            color: correct ? "var(--success)" : "var(--error)",
          }}
        >
          {correct ? <CheckCircle2 size={18} className="shrink-0 mt-0.5" /> : <XCircle size={18} className="shrink-0 mt-0.5" />}
          <div>
            {correct ? (
              <span>
                isso ai!{" "}
                {question.digit && (
                  <span className="font-semibold" style={{ color: "var(--purple)" }}>
                    digito desbloqueado: {question.digit}
                  </span>
                )}
              </span>
            ) : (
              <span>
                errou! a certa era: <strong>{question.options[question.correctIndex]}</strong>
                {question.digit && (
                  <span className="block mt-1 font-medium" style={{ color: "var(--purple)" }}>
                    mas relaxa, o digito ta liberado: {question.digit}
                  </span>
                )}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
