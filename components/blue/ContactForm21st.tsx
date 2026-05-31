"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { trackOperatorEvent } from "@/lib/operator-events";

type FormState = { company: string; email: string; message: string; };
type Status    = "idle" | "sending" | "sent" | "error";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BlueContactForm21st() {
  const [form,   setForm]   = useState<FormState>({ company: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error,  setError]  = useState("");
  const hasInteracted = useRef(false);

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (status !== "idle") setStatus("idle");
    if (error) setError("");
  };

  const trackFirstInteraction = () => {
    if (hasInteracted.current) return;
    hasInteracted.current = true;
    trackOperatorEvent({ type: "CONTACT_INIT", detail: "blue-contact-first-focus", page: "blue", metadata: { mode: "blue" } });
  };

  const validate = () => {
    if (!form.company.trim()) return "Company name is required.";
    if (!form.email.trim() || !EMAIL_RE.test(form.email)) return "Valid email is required.";
    if (!form.message.trim()) return "Message is required.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ve = validate();
    if (ve) { setError(ve); setStatus("error"); return; }
    setStatus("sending"); setError("");

    try {
      const res  = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company: form.company.trim(), email: form.email.trim(), message: form.message.trim() }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) { setStatus("error"); setError(data.error ?? "Submission failed."); return; }
      setStatus("sent");
      setForm({ company: "", email: "", message: "" });
      trackOperatorEvent({ type: "CONTACT_SENT", detail: "blue-contact-submitted", page: "blue", metadata: { mode: "blue", company: form.company.trim() } });
    } catch {
      setStatus("error");
      setError("Submission failed. Please try again.");
    }
  };

  const fieldBase: React.CSSProperties = {
    width: "100%",
    border: "1px solid var(--bp-border)",
    borderRadius: "5px",   /* hyper-dreams radius scale: 5px */
    backgroundColor: "#FDFAF6",
    color: "var(--bp-ink)",
    fontSize: "0.95rem",
    lineHeight: 1.5,
    padding: "0.9rem 1rem",
    outline: "none",
    fontFamily: "Inter, sans-serif",
    transition: "border-color 0.15s, box-shadow 0.15s",
  };

  const focusStyle = {
    borderColor: "var(--bp-accent)",
    boxShadow: "0 0 0 3px rgba(0,80,189,0.12)",
  };

  const Field = ({
    label, k, placeholder, type = "text", multiline = false,
  }: {
    label: string; k: keyof FormState; placeholder: string; type?: string; multiline?: boolean;
  }) => (
    <label style={{ display: "grid", gap: "0.5rem" }}>
      <span style={{ color: "var(--bp-ink)", fontSize: "0.9rem", fontWeight: 600 }}>{label}</span>
      {multiline ? (
        <textarea
          value={form[k]}
          onChange={(e) => update(k, e.target.value)}
          onFocus={(e) => { trackFirstInteraction(); Object.assign(e.target.style, focusStyle); }}
          onBlur={(e) => { e.target.style.borderColor = "var(--bp-border)"; e.target.style.boxShadow = "none"; }}
          placeholder={placeholder}
          rows={6}
          style={{ ...fieldBase, resize: "vertical", minHeight: "150px" }}
        />
      ) : (
        <input
          type={type}
          value={form[k]}
          onChange={(e) => update(k, e.target.value)}
          onFocus={(e) => { trackFirstInteraction(); Object.assign(e.target.style, focusStyle); }}
          onBlur={(e) => { e.target.style.borderColor = "var(--bp-border)"; e.target.style.boxShadow = "none"; }}
          placeholder={placeholder}
          style={fieldBase}
        />
      )}
    </label>
  );

  return (
    <section
      id="contact"
      className="bp-panel-a"
      style={{ padding: "96px 64px" }}
    >
      <div style={{
        maxWidth: "840px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "3rem",
        alignItems: "start",
      }}>

        {/* ── Left — typographic column ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{ position: "relative" }}
        >
          {/* Ampersand watermark — warm cream-amber (not cool blue) */}
          <span aria-hidden="true" style={{
            position: "absolute",
            top: "-1.5rem", left: "-1rem",
            fontSize: "clamp(6rem, 12vw, 10rem)",
            fontWeight: 900,
            color: "#F0EBDE",   /* warm cream-amber — surreal, handmade feel */
            lineHeight: 1,
            userSelect: "none", pointerEvents: "none",
            zIndex: 0, letterSpacing: "-0.04em",
          }}>
            &amp;
          </span>

          <div style={{ position: "relative", zIndex: 1 }}>
            <p className="bp-label" style={{ marginBottom: "1rem" }}>Contact</p>
            <h2 style={{
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              fontWeight: 800, color: "var(--bp-ink)",
              letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1rem",
            }}>
              Let&apos;s work<br />together.
            </h2>
            <p style={{ color: "var(--bp-ink-muted)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "1.75rem" }}>
              If you have an opportunity, project, or collaboration in mind, send me a message.
              I&apos;d be happy to connect.
            </p>
            <a
              href="https://www.linkedin.com/in/karthiek-duggirala/"
              target="_blank" rel="noopener noreferrer"
              className="bp-sweep"
              onClick={() => trackOperatorEvent({ type: "PAGE_NAV", detail: "linkedin-contact-click", page: "blue", metadata: { mode: "blue", destination: "linkedin" } })}
            >
              Prefer LinkedIn? Connect there →
            </a>
          </div>
        </motion.div>

        {/* ── Right — form ── */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#FDFAF6",
            border: "1px solid rgba(212,201,186,0.65)",
            borderRadius: "12px",
            padding: "2rem",
            boxShadow: "var(--bp-shadow-form)",
            display: "grid", gap: "1rem",
          }}
        >
          <p style={{
            fontSize: "0.78rem", fontWeight: 700, color: "var(--bp-accent)",
            letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 0.25rem",
          }}>
            Send a message
          </p>

          <Field label="Company"  k="company" placeholder="" />
          <Field label="Email"    k="email"   placeholder="" type="email" />
          <Field label="Message"  k="message" placeholder="" multiline />

          <button
            type="submit"
            disabled={status === "sending"}
            style={{
              width: "100%", padding: "0.9rem",
              border: "none", borderRadius: "999px",
              background: "var(--bp-grad-cta)",
              color: "#FFFFFF",
              fontSize: "0.95rem", fontWeight: 700,
              cursor: status === "sending" ? "wait" : "pointer",
              boxShadow: "var(--bp-shadow-accent)",
              fontFamily: "Inter, sans-serif",
              transition: "transform 0.12s ease, box-shadow 0.18s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px rgba(0,80,189,0.30)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "var(--bp-shadow-accent)";
            }}
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>

          {status === "sent" && (
            <div style={{
              borderRadius: "5px", padding: "0.9rem 1rem",
              backgroundColor: "#EEF5E8", color: "#2D6A2D",
              fontSize: "0.875rem", lineHeight: 1.6,
            }}>
              Thanks for reaching out. I&apos;ll get back to you soon.
            </div>
          )}
          {status === "error" && error && (
            <div style={{
              borderRadius: "5px", padding: "0.9rem 1rem",
              backgroundColor: "#FEF2F2", color: "#B91C1C",
              fontSize: "0.875rem", lineHeight: 1.6,
            }}>
              {error}
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
