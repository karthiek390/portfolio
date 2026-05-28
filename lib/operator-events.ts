export const OPERATOR_EVENT_TYPES = [
  "PILL_SWITCH",
  "PAGE_NAV",
  "REPO_CLICK",
  "CONTACT_INIT",
  "CONTACT_SENT",
  "KEYMAKER",
  "SKILLS_CLICK",
  "AUDIO_TOGGLE",
  "DISCONNECT",
  "RECONNECT",
  "NODE_HOVER",
  "CAM_SESSION",
] as const;

export type OperatorEventType = (typeof OPERATOR_EVENT_TYPES)[number];

export interface OperatorEventPayload {
  type: OperatorEventType;
  detail?: string;
  page?: string;
  metadata?: Record<string, string | number | boolean | null>;
}

export interface OperatorEventRecord {
  id: number;
  type: string;
  detail: string | null;
  page: string | null;
  device: string | null;
  metadata: Record<string, string | number | boolean | null> | null;
  createdAt: string;
}

export function getTrafficSource(referrer?: string) {
  const value = (referrer ?? "").toLowerCase();
  if (!value) return "Direct";
  if (value.includes("linkedin")) return "LinkedIn";
  if (value.includes("github")) return "GitHub";
  return "Other";
}

export function trackOperatorEvent(payload: OperatorEventPayload) {
  if (typeof window === "undefined") return;

  fetch("/api/operator-events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
}
