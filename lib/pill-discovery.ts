"use client";

import type { PillMode } from "@/context/PillContext";

const STORAGE_KEY = "matrix-portfolio-mode-discovery";

type ModeDiscoveryState = {
  seenBlue: boolean;
  seenRed: boolean;
};

const DEFAULT_STATE: ModeDiscoveryState = {
  seenBlue: false,
  seenRed: false,
};

function readState(): ModeDiscoveryState {
  if (typeof window === "undefined") return DEFAULT_STATE;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;

    const parsed = JSON.parse(raw) as Partial<ModeDiscoveryState>;
    return {
      seenBlue: Boolean(parsed.seenBlue),
      seenRed: Boolean(parsed.seenRed),
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function writeState(state: ModeDiscoveryState) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Non-blocking UI hint state only.
  }
}

export function markModeSeen(mode: PillMode) {
  const state = readState();
  if (mode === "blue" && state.seenBlue) return;
  if (mode === "red" && state.seenRed) return;

  writeState({
    seenBlue: state.seenBlue || mode === "blue",
    seenRed: state.seenRed || mode === "red",
  });
}

export function hasSeenMode(mode: PillMode) {
  const state = readState();
  return mode === "blue" ? state.seenBlue : state.seenRed;
}
