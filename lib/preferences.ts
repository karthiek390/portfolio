const CLIENT_ID_KEY = "matrix_portfolio_client_id";

function makeClientId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `client_${Math.random().toString(36).slice(2)}_${Date.now()}`;
}

export function getClientId() {
  if (typeof window === "undefined") return null;

  const existing = window.localStorage.getItem(CLIENT_ID_KEY);
  if (existing) return existing;

  const next = makeClientId();
  window.localStorage.setItem(CLIENT_ID_KEY, next);
  return next;
}
