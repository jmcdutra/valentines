"use client";

import { useState, useMemo } from "react";
import { Clapperboard, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import type { Quest } from "@/lib/quests";
import { LOCATION_RADIUS } from "@/lib/quests";
import QuizQuestion from "./QuizQuestion";
import LocationCheck from "./LocationCheck";

interface QuestCardProps {
  quest: Quest;
  questIndex: number;
  quizAnswered: Record<string, number | null>;
  locationVerified: boolean;
  isCompleted: boolean;
  devMode: boolean;
  onAnswerQuestion: (questionId: string, selectedIndex: number) => void;
  onVerifyLocation: () => void;
  onComplete: () => void;
  getCurrentPosition: () => Promise<{ lat: number; lng: number } | null>;
  geoLoading: boolean;
}

export default function QuestCard({
  quest,
  questIndex,
  quizAnswered,
  locationVerified,
  isCompleted,
  devMode,
  onAnswerQuestion,
  onVerifyLocation,
  onComplete,
  getCurrentPosition,
  geoLoading,
}: QuestCardProps) {
  const [showQuiz, setShowQuiz] = useState(false);

  const allAnswered = useMemo(
    () => quest.quiz.every((q) => quizAnswered[q.id] !== null && quizAnswered[q.id] !== undefined),
    [quest.quiz, quizAnswered]
  );

  const gotAnyWrong = useMemo(
    () => quest.quiz.some((q) => quizAnswered[q.id] !== null && quizAnswered[q.id] !== undefined && quizAnswered[q.id] !== q.correctIndex),
    [quest.quiz, quizAnswered]
  );

  const canComplete = allAnswered && locationVerified && !isCompleted;

  return (
    <div className="w-full max-w-sm mx-auto px-5 py-8 animate-enter">
      {/* header */}
      <div className="text-center mb-8">
        <p className="text-xs uppercase tracking-[0.15em] mb-1.5 font-semibold" style={{ color: "var(--text-muted)" }}>
          etapa {questIndex + 1}
        </p>
        <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
          {quest.title}
        </h2>
      </div>

      {/* pista */}
      <div className="card card-warm p-5 mb-5">
        <div className="flex items-start gap-3">
          <MapPin size={18} className="text-[var(--warm)] shrink-0 mt-0.5" />
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold mb-1.5" style={{ color: "var(--warm)" }}>
              pista
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-display)", fontStyle: "italic" }}>
              {quest.clue}
            </p>
          </div>
        </div>
      </div>

      {/* quiz trigger */}
      {!showQuiz && !allAnswered && (
        <button className="btn btn-primary w-full mb-5" onClick={() => setShowQuiz(true)}>
          <Clapperboard size={16} />
          responder quiz
        </button>
      )}

      {/* quiz */}
      {(showQuiz || allAnswered) && (
        <div className="card p-5 mb-5">
          <p className="text-xs uppercase tracking-wider font-semibold mb-4" style={{ color: "var(--purple)" }}>
            quiz friends
          </p>
          <div className="space-y-5">
            {quest.quiz.map((q) => (
              <QuizQuestion
                key={q.id}
                question={q}
                previousAnswer={quizAnswered[q.id] !== undefined ? quizAnswered[q.id] : null}
                onAnswer={onAnswerQuestion}
              />
            ))}
          </div>

          {allAnswered && gotAnyWrong && (
            <div className="mt-4 p-3 rounded-lg text-xs text-center animate-fade" style={{ background: "var(--warm-bg)", color: "var(--warm)" }}>
              e dia dos namorados entao vou deixar voce passar gata s2
            </div>
          )}
        </div>
      )}

      {/* location */}
      {allAnswered && (
        <div className="card p-5 mb-5 animate-enter">
          <p className="text-xs uppercase tracking-wider font-semibold mb-3" style={{ color: "var(--text-muted)" }}>
            confirmar localizacao
          </p>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            agora vai ate <strong style={{ color: "var(--text)" }}>{quest.location.name}</strong> e confirma que voce ta la.
          </p>
          <LocationCheck
            targetLat={quest.location.lat}
            targetLng={quest.location.lng}
            targetName={quest.location.name}
            radius={LOCATION_RADIUS}
            verified={locationVerified}
            devMode={devMode}
            getCurrentPosition={getCurrentPosition}
            loading={geoLoading}
            onVerified={onVerifyLocation}
          />
        </div>
      )}

      {/* next */}
      {canComplete && (
        <button className="btn btn-warm w-full animate-scale" onClick={onComplete}>
          proxima etapa
          <ArrowRight size={16} />
        </button>
      )}

      {isCompleted && (
        <div className="text-center p-4 rounded-lg animate-scale" style={{ background: "var(--success-bg)" }}>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 size={16} className="text-[var(--success)]" />
            <p className="text-sm font-semibold" style={{ color: "var(--success)" }}>
              etapa completa
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
