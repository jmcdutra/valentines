"use client";

import { useState, useEffect } from "react";
import { Coffee, RotateCcw } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { useGeolocation } from "@/hooks/useGeolocation";
import { quests, quest5 } from "@/lib/quests";
import WelcomeScreen from "@/components/WelcomeScreen";
import ProgressBar from "@/components/ProgressBar";
import QuestCard from "@/components/QuestCard";
import Quest5Card from "@/components/Quest5Card";
import Confetti from "@/components/Confetti";

export default function Home() {
  const {
    state,
    hydrated,
    devMode,
    startGame,
    answerQuestion,
    verifyLocation,
    completeQuest,
    setQuest5Phase,
    revealQuest5Digit,
    markCompleted,
    resetProgress,
  } = useProgress();

  const geo = useGeolocation();
  const [showConfetti, setShowConfetti] = useState(false);
  const [justCompleted, setJustCompleted] = useState<number | null>(null);

  useEffect(() => {
    if (justCompleted !== null) {
      setShowConfetti(true);
      const t = setTimeout(() => {
        setShowConfetti(false);
        setJustCompleted(null);
      }, 3500);
      return () => clearTimeout(t);
    }
  }, [justCompleted]);

  if (!hydrated) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="text-center animate-fade">
          <Coffee size={32} className="mx-auto mb-3 text-[var(--warm)] animate-pulse-soft" />
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            preparando...
          </p>
        </div>
      </div>
    );
  }

  if (!state.started) {
    return <WelcomeScreen onStart={startGame} onPermissionGranted={geo.requestPermission} />;
  }

  const handleQuestComplete = (i: number) => {
    completeQuest(i);
    setJustCompleted(i);
  };

  const handleQuest5Complete = () => {
    markCompleted();
    setJustCompleted(4);
  };

  const current = state.currentQuest;
  const isQ5 = current === 4;

  return (
    <div className="min-h-dvh pb-8">
      <Confetti active={showConfetti} />

      {/* header */}
      <div
        className="sticky top-0 z-50"
        style={{ background: "var(--bg)", borderBottom: "1px solid var(--border-light)" }}
      >
        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <Coffee size={14} className="text-[var(--warm)]" />
            <p className="text-xs font-semibold tracking-wider" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-display)" }}>
              valentine&apos;s quest
            </p>
          </div>
          <button
            className="p-1.5 rounded-md transition-colors hover:bg-[var(--bg-warm)]"
            style={{ color: "var(--text-muted)", border: "none", background: "transparent", cursor: "pointer" }}
            onClick={() => {
              if (window.confirm("recomecar tudo? todo progresso vai ser perdido.")) {
                resetProgress();
              }
            }}
            title="recomecar"
          >
            <RotateCcw size={14} />
          </button>
        </div>
        <ProgressBar currentQuest={current} questsCompleted={state.questsCompleted} />
      </div>

      {/* content */}
      {!isQ5 ? (
        <QuestCard
          key={`q-${current}`}
          quest={quests[current]}
          questIndex={current}
          quizAnswered={state.quizAnswered}
          locationVerified={state.locationVerified[current]}
          isCompleted={state.questsCompleted[current]}
          devMode={devMode}
          onAnswerQuestion={answerQuestion}
          onVerifyLocation={() => verifyLocation(current)}
          onComplete={() => handleQuestComplete(current)}
          getCurrentPosition={geo.getCurrentPosition}
          geoLoading={geo.loading}
        />
      ) : (
        <Quest5Card
          key="q5"
          quest5={quest5}
          phase={state.quest5Phase}
          quizAnswered={state.quizAnswered}
          phase1Revealed={state.quest5Phase1Revealed}
          phase2Revealed={state.quest5Phase2Revealed}
          onAnswerQuestion={answerQuestion}
          onRevealDigit={revealQuest5Digit}
          onSetPhase={setQuest5Phase}
          onComplete={handleQuest5Complete}
        />
      )}
    </div>
  );
}
