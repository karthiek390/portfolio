"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackOperatorEvent } from "@/lib/operator-events";

const PROMPTS = [
  { key: "company", label: "[SYS]: State your organization's designation..." },
  { key: "email",   label: "[SYS]: Provide secure terminal routing address..." },
  { key: "message", label: "[SYS]: What is the nature of your anomaly?" },
] as const;

type FieldKey = (typeof PROMPTS)[number]["key"];
type FormData = Record<FieldKey, string>;
type Step = number;

const mono = "JetBrains Mono, monospace";
const S = {
  green:  { color: "#00FF41", fontFamily: mono },
  muted:  { color: "#00802B", fontFamily: mono },
  dark:   { color: "#003B00", fontFamily: mono },
  input:  { background: "transparent", border: "none", outline: "none",
            color: "#00FF41", fontFamily: mono, fontSize: "0.9rem",
            width: "100%", caretColor: "#00FF41" } as React.CSSProperties,
};

export default function TerminalContactForm() {
  const [step, setStep]       = useState<Step>(0);
  const [current, setCurrent] = useState("");
  const [data, setData]       = useState<FormData>({ company: "", email: "", message: "" });
  const [status, setStatus]   = useState<"idle" | "sending" | "sent" | "error">("idle");
  const inputRef              = useRef<HTMLInputElement>(null);
  const hasTrackedInit        = useRef(false);

  useEffect(() => { if (step < 3) inputRef.current?.focus(); }, [step]);

  useEffect(() => {
    if (hasTrackedInit.current) return;
    hasTrackedInit.current = true;
    trackOperatorEvent({
      type: "CONTACT_INIT",
      detail: "terminal contact form opened",
      page: "portfolio",
    });
  }, []);

  const [inputError, setInputError] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter" || !current.trim()) return;
    const key = PROMPTS[step]?.key;
    if (!key) return;
    if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(current)) {
      setInputError("[ERR]: Invalid routing address. Use format: user@domain.com");
      return;
    }
    setInputError("");
    setData((p) => ({ ...p, [key]: current.trim() }));
    setCurrent("");
    setStep((p) => p + 1);
  };

  const handleSubmit = async () => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) {
        trackOperatorEvent({
          type: "CONTACT_SENT",
          detail: `transmission sent from ${data.company}`,
          page: "portfolio",
          metadata: { company: data.company },
        });
        setStep(4);
      }
    } catch { setStatus("error"); }
  };

  return (
    <section id="contact" style={{ padding: "6rem 2.5rem", maxWidth: "780px", margin: "0 auto" }}>
      <p style={{ ...S.dark, fontSize: "0.7rem", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>
        // MORPHEUS_INTERROGATION_PROTOCOL
      </p>
      <h2 style={{ ...S.green, fontSize: "2rem", fontWeight: 700, marginBottom: "2.5rem" }}>
        Establish Contact
      </h2>

      <div style={{ backgroundColor: "#050505", border: "1px solid rgba(0,255,65,0.25)",
        borderRadius: "4px", padding: "2rem", minHeight: "320px",
        display: "flex", flexDirection: "column", gap: "1.25rem" }}>

        {PROMPTS.slice(0, step).map((p, i) => (
          <motion.div key={p.key} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <p style={{ ...S.dark, fontSize: "0.78rem" }}>{p.label}</p>
            <p style={{ ...S.muted, fontSize: "0.9rem", paddingLeft: "1rem" }}>
              &gt; {data[PROMPTS[i].key]}
            </p>
          </motion.div>
        ))}

        <AnimatePresence>
          {step < 3 && (
            <motion.div key={step} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <p style={{ ...S.muted, fontSize: "0.78rem" }}>{PROMPTS[step].label}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingLeft: "1rem" }}>
                <span style={{ ...S.green, fontSize: "0.9rem" }}>&gt;</span>
                <input ref={inputRef} value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  onKeyDown={handleKeyDown} style={S.input}
                  type={PROMPTS[step].key === "email" ? "email" : "text"}
                  autoComplete="off" spellCheck={false}
                  placeholder="type and press Enter..." />
              </div>
              {inputError && (
                <p style={{ ...S.dark, fontSize: "0.72rem", paddingLeft: "1rem", marginTop: "-0.25rem" }}>
                  {inputError}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {step === 3 && status !== "sent" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p style={{ ...S.muted, fontSize: "0.78rem" }}>
              [SYS]: Signal ready. Confirm transmission?
            </p>
            <button id="contact-submit-btn" onClick={handleSubmit}
              disabled={status === "sending"}
              style={{ alignSelf: "flex-start", padding: "0.65rem 1.5rem",
                backgroundColor: "transparent", border: "1px solid #00FF41",
                color: "#00FF41", fontFamily: mono, fontSize: "0.82rem",
                letterSpacing: "0.08em", cursor: "pointer", borderRadius: "2px",
                boxShadow: status === "sending" ? "0 0 12px #00FF4166" : "none" }}>
              {status === "sending" ? "TRANSMITTING..." : "[ BROADCAST TO ZION ]"}
            </button>
            {status === "error" && (
              <p style={{ ...S.dark, fontSize: "0.75rem" }}>
                [ERR]: Transmission failed. Try again or contact via LinkedIn.
              </p>
            )}
          </motion.div>
        )}

        {step === 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p style={{ ...S.green, fontSize: "0.9rem", textShadow: "0 0 8px #00FF41" }}>
              ✓ SIGNAL RECEIVED BY ZION MAINFRAME
            </p>
            <p style={{ ...S.muted, fontSize: "0.78rem", marginTop: "0.5rem" }}>
              Message from {data.company} logged. Response within 24 hours.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
