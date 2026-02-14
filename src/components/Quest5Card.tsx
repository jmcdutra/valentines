"use client";

import { useMemo } from "react";
import { KeyRound, ArrowRight, Home, Heart } from "lucide-react";
import type { Quest5Data } from "@/lib/quests";
import QuizQuestion from "./QuizQuestion";
import CodeReveal from "./CodeReveal";

interface Quest5CardProps {
  quest5: Quest5Data;
  phase: number;
  quizAnswered: Record<string, number | null>;
  phase1Revealed: boolean[];
  phase2Revealed: boolean[];
  onAnswerQuestion: (questionId: string, selectedIndex: number) => void;
  onRevealDigit: (phase: 1 | 2, digitIndex: number) => void;
  onSetPhase: (phase: number) => void;
  onComplete: () => void;
}

export default function Quest5Card({
  quest5,
  phase,
  quizAnswered,
  phase1Revealed,
  phase2Revealed,
  onAnswerQuestion,
  onRevealDigit,
  onSetPhase,
  onComplete,
}: Quest5CardProps) {
  const phase1Digits = quest5.phase1.questions.map((q) => q.digit || "?");
  const phase2Digits = quest5.phase2.questions.map((q) => q.digit || "?");

  const allP1Answered = useMemo(
    () => quest5.phase1.questions.every((q) => quizAnswered[q.id] !== null && quizAnswered[q.id] !== undefined),
    [quest5.phase1.questions, quizAnswered]
  );

  const allP2Answered = useMemo(
    () => quest5.phase2.questions.every((q) => quizAnswered[q.id] !== null && quizAnswered[q.id] !== undefined),
    [quest5.phase2.questions, quizAnswered]
  );

  const allP1Revealed = phase1Revealed.every(Boolean);
  const allP2Revealed = phase2Revealed.every(Boolean);

  return (
    <div className="w-full max-w-sm mx-auto px-5 py-8 animate-enter">
      {/* header */}
      <div className="text-center mb-8">
        <p className="text-xs uppercase tracking-[0.15em] mb-1.5 font-semibold" style={{ color: "var(--text-muted)" }}>
          etapa final
        </p>
        <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
          {quest5.title}
        </h2>
      </div>

      {/* intro */}
      {phase === 0 && (
        <div className="animate-enter">
          <div className="card card-purple p-5 mb-5">
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)", fontFamily: "var(--font-display)", fontStyle: "italic" }}
            >
              {quest5.intro}
            </p>
          </div>
          <button className="btn btn-primary w-full" onClick={() => onSetPhase(1)}>
            <KeyRound size={16} />
            desbloquear codigos
          </button>
        </div>
      )}

      {/* phase 1 */}
      {phase >= 1 && (
        <div className="mb-6">
          <div className="card p-5 mb-4">
            <h3 className="text-base font-bold mb-1.5" style={{ fontFamily: "var(--font-display)", color: "var(--purple)" }}>
              {quest5.phase1.title}
            </h3>
            <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {quest5.phase1.description}
            </p>

            <div className="mb-6">
              <CodeReveal digits={phase1Digits} revealed={phase1Revealed} label={quest5.phase1.codeLabel} />
            </div>

            {phase === 1 && (
              <div className="space-y-5">
                {quest5.phase1.questions.map((q, i) => {
                  const isAnswered = quizAnswered[q.id] !== null && quizAnswered[q.id] !== undefined;
                  const prevOk = i === 0 || (quizAnswered[quest5.phase1.questions[i - 1].id] !== null && quizAnswered[quest5.phase1.questions[i - 1].id] !== undefined);
                  if (!isAnswered && !prevOk) return null;

                  return (
                    <div key={q.id}>
                      <p className="text-xs mb-2.5 font-semibold" style={{ color: "var(--warm)" }}>
                        pergunta {i + 1} de {quest5.phase1.questions.length}
                      </p>
                      <QuizQuestion
                        question={q}
                        previousAnswer={quizAnswered[q.id] !== undefined ? quizAnswered[q.id] : null}
                        onAnswer={(qId, idx) => {
                          onAnswerQuestion(qId, idx);
                          onRevealDigit(1, i);
                        }}
                        onCorrectDigit={() => {}}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {allP1Answered && allP1Revealed && phase === 1 && (
              <button className="btn btn-warm w-full mt-5 animate-scale" onClick={() => onSetPhase(2)}>
                proximo codigo
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* phase 2 */}
      {phase >= 2 && (
        <div className="mb-6 animate-enter">
          <div className="card p-5 mb-4">
            <h3 className="text-base font-bold mb-1.5" style={{ fontFamily: "var(--font-display)", color: "var(--purple)" }}>
              {quest5.phase2.title}
            </h3>
            <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {quest5.phase2.description}
            </p>

            <div className="mb-6">
              <CodeReveal digits={phase2Digits} revealed={phase2Revealed} label={quest5.phase2.codeLabel} />
            </div>

            {phase === 2 && (
              <div className="space-y-5">
                {quest5.phase2.questions.map((q, i) => {
                  const isAnswered = quizAnswered[q.id] !== null && quizAnswered[q.id] !== undefined;
                  const prevOk = i === 0 || (quizAnswered[quest5.phase2.questions[i - 1].id] !== null && quizAnswered[quest5.phase2.questions[i - 1].id] !== undefined);
                  if (!isAnswered && !prevOk) return null;

                  return (
                    <div key={q.id}>
                      <p className="text-xs mb-2.5 font-semibold" style={{ color: "var(--warm)" }}>
                        pergunta {i + 1} de {quest5.phase2.questions.length}
                      </p>
                      <QuizQuestion
                        question={q}
                        previousAnswer={quizAnswered[q.id] !== undefined ? quizAnswered[q.id] : null}
                        onAnswer={(qId, idx) => {
                          onAnswerQuestion(qId, idx);
                          onRevealDigit(2, i);
                        }}
                        onCorrectDigit={() => {}}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {allP2Answered && allP2Revealed && phase === 2 && (
              <button
                className="btn btn-warm w-full mt-5 animate-scale"
                onClick={() => {
                  onSetPhase(3);
                  onComplete();
                }}
              >
                ver instrucoes
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* final instructions */}
      {phase === 3 && (
        <div className="animate-enter stagger">
          <div className="card p-5 mb-5 animate-enter" style={{ borderColor: "var(--success)" }}>
            <div className="flex items-center gap-2.5 mb-4">
              <Home size={18} className="text-[var(--success)]" />
              <h3 className="text-base font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--success)" }}>
                instrucoes pra entrar
              </h3>
            </div>

            <ol className="space-y-3.5">
              {quest5.instructions.map((inst, i) => (
                <li key={i} className="flex gap-3 animate-enter">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                    style={{ background: "var(--purple-bg)", color: "var(--purple)" }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {inst}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-5 pt-4 space-y-3" style={{ borderTop: "1px solid var(--border-light)" }}>
              <div className="text-center">
                <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: "var(--text-muted)" }}>
                  codigo da porta
                </p>
                <p className="text-2xl font-bold tracking-[0.25em]" style={{ fontFamily: "var(--font-display)", color: "var(--purple)" }}>
                  {phase1Digits.join("")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: "var(--text-muted)" }}>
                  codigo da caixa — 3o andar, direita
                </p>
                <p className="text-2xl font-bold tracking-[0.25em]" style={{ fontFamily: "var(--font-display)", color: "var(--purple)" }}>
                  {phase2Digits.join("")}
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-6 animate-enter">
            <Heart size={20} className="text-[var(--error)] mx-auto mb-2" fill="var(--error)" />
            <p className="text-sm" style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--text-secondary)" }}>
              feliz dia dos namorados, Ju.
            </p>
            <p className="text-xs mt-3" style={{ color: "var(--text-muted)" }}>
              &ldquo;He&apos;s her lobster!&rdquo; — Phoebe
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
