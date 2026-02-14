"use client";

import { useState, useCallback, useEffect } from "react";

export interface GameState {
  started: boolean;
  currentQuest: number;
  questsCompleted: boolean[];
  quizAnswered: Record<string, number | null>;
  locationVerified: boolean[];
  quest5Phase: number;
  quest5Phase1Revealed: boolean[];
  quest5Phase2Revealed: boolean[];
  completed: boolean;
}

const STORAGE_KEY = "valentines-quest-julia";
const DEV_MODE_KEY = "devMode";

const defaultState: GameState = {
  started: false,
  currentQuest: 0,
  questsCompleted: [false, false, false, false, false],
  quizAnswered: {},
  locationVerified: [false, false, false, false, false],
  quest5Phase: 0,
  quest5Phase1Revealed: [false, false, false, false, false, false, false],
  quest5Phase2Revealed: [false, false, false, false],
  completed: false,
};

function loadState(): GameState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as GameState;
    return { ...defaultState, ...parsed };
  } catch {
    return defaultState;
  }
}

function saveState(state: GameState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // noop
  }
}

export function isDevMode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(DEV_MODE_KEY) === "true";
  } catch {
    return false;
  }
}

export function useProgress() {
  const [state, setState] = useState<GameState>(defaultState);
  const [hydrated, setHydrated] = useState(false);
  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    const loaded = loadState();
    setState(loaded);
    setDevMode(isDevMode());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      saveState(state);
    }
  }, [state, hydrated]);

  const updateState = useCallback(
    (updater: (prev: GameState) => Partial<GameState>) => {
      setState((prev) => ({ ...prev, ...updater(prev) }));
    },
    []
  );

  const startGame = useCallback(() => {
    updateState(() => ({ started: true, currentQuest: 0 }));
  }, [updateState]);

  const answerQuestion = useCallback(
    (questionId: string, selectedIndex: number) => {
      updateState((prev) => ({
        quizAnswered: { ...prev.quizAnswered, [questionId]: selectedIndex },
      }));
    },
    [updateState]
  );

  const verifyLocation = useCallback(
    (questIndex: number) => {
      updateState((prev) => {
        const v = [...prev.locationVerified];
        v[questIndex] = true;
        return { locationVerified: v };
      });
    },
    [updateState]
  );

  const completeQuest = useCallback(
    (questIndex: number) => {
      updateState((prev) => {
        const c = [...prev.questsCompleted];
        c[questIndex] = true;
        return {
          questsCompleted: c,
          currentQuest: Math.min(questIndex + 1, 4),
        };
      });
    },
    [updateState]
  );

  const setQuest5Phase = useCallback(
    (phase: number) => {
      updateState(() => ({ quest5Phase: phase }));
    },
    [updateState]
  );

  const revealQuest5Digit = useCallback(
    (phase: 1 | 2, digitIndex: number) => {
      updateState((prev) => {
        if (phase === 1) {
          const r = [...prev.quest5Phase1Revealed];
          r[digitIndex] = true;
          return { quest5Phase1Revealed: r };
        } else {
          const r = [...prev.quest5Phase2Revealed];
          r[digitIndex] = true;
          return { quest5Phase2Revealed: r };
        }
      });
    },
    [updateState]
  );

  const markCompleted = useCallback(() => {
    updateState((prev) => {
      const c = [...prev.questsCompleted];
      c[4] = true;
      return { questsCompleted: c, quest5Phase: 3, completed: true };
    });
  }, [updateState]);

  const resetProgress = useCallback(() => {
    setState(defaultState);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const toggleDevMode = useCallback(() => {
    setDevMode((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        if (next) {
          localStorage.setItem(DEV_MODE_KEY, "true");
        } else {
          localStorage.removeItem(DEV_MODE_KEY);
        }
      }
      return next;
    });
  }, []);

  return {
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
    toggleDevMode,
  };
}
