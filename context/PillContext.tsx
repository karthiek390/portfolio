"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type PillMode = "blue" | "red";

interface PillContextType {
  mode: PillMode;
  setMode: (mode: PillMode) => Promise<void>;
}

const PillContext = createContext<PillContextType | undefined>(undefined);

async function persistMode(mode: PillMode) {
  const res = await fetch("/api/pill-choice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode }),
  });

  if (!res.ok) {
    throw new Error(`Failed to persist pill choice: ${res.status}`);
  }
}

export function PillProvider({
  children,
  initialMode = "blue",
}: {
  children: React.ReactNode;
  initialMode?: PillMode;
}) {
  const [mode, setModeState] = useState<PillMode>(initialMode);

  const setMode = useCallback(async (nextMode: PillMode) => {
    setModeState(nextMode);

    try {
      await persistMode(nextMode);
    } catch (error) {
      console.error("[PillProvider] Failed to persist mode", error);
      throw error;
    }
  }, []);

  return (
    <PillContext.Provider value={{ mode, setMode }}>
      <div className={mode === "red" ? "mode-red" : "mode-blue"} style={{ minHeight: "100vh" }}>
        {children}
      </div>
    </PillContext.Provider>
  );
}

export function usePill(): PillContextType {
  const context = useContext(PillContext);
  if (!context) throw new Error("usePill must be inside <PillProvider>");
  return context;
}

export function usePillTransition() {
  const { setMode } = usePill();
  const [constructVisible, setConstructVisible] = useState(false);
  const [pendingMode, setPendingMode] = useState<PillMode | null>(null);

  const switchMode = useCallback((newMode: PillMode) => {
    setPendingMode(newMode);
    setConstructVisible(true);
  }, []);

  const onConstructComplete = useCallback(() => {
    if (pendingMode) {
      void setMode(pendingMode).catch((error) => {
        console.error("[PillTransition] Failed to persist mode", error);
      });
    }
    setConstructVisible(false);
    setPendingMode(null);
  }, [pendingMode, setMode]);

  return { constructVisible, switchMode, onConstructComplete };
}
