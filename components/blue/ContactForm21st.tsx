"use client";

import { useState } from "react";

type FormState = {
  company: string;
  email: string;
  message: string;
};

type Status = "idle" | "sending" | "sent" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BlueContactForm21st() {
  const [form, setForm] = useState<FormState>({ company: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (status !== "idle") setStatus("idle");
    if (error) setError("");
  };

  const validate = () => {
    if (!form.company.trim()) return "Company name is required.";
    if (!form.email.trim() || !EMAIL_RE.test(form.email)) return "Valid email is required.";
    if (!form.message.trim()) return "Message is required.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: form.company.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setError(data.error ?? "Submission failed.");
        return;
      }

      setStatus("sent");
      setForm({ company: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setError("Submission failed. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      style={{
        padding: "6rem 2.5rem 7rem",
        background:
          "linear-gradient(180deg, rgba(241,245,249,0) 0%, rgba(241,245,249,0.9) 18%, #F8FAFC 100%)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(145deg, #0F172A 0%, #1E293B 55%, #2563EB 140%)",
            borderRadius: "24px",
            padding: "2.25rem",
            color: "#F8FAFC",
            boxShadow: "0 24px 80px rgba(15,23,42,0.22)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "-30% auto auto 60%",
              width: "220px",
              height: "220px",
              borderRadius: "999px",
              background: "radial-gradient(circle, rgba(255,255,255,0.22), transparent 68%)",
              pointerEvents: "none",
            }}
          />

          <p
            style={{
              margin: 0,
              color: "#93C5FD",
              fontSize: "0.78rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Contact
          </p>

          <h2
            style={{
              margin: "1rem 0 0",
              fontSize: "clamp(2rem, 4vw, 3.1rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
            }}
          >
            Let&apos;s work together.
          </h2>

          <p
            style={{
              margin: "1rem 0 0",
              maxWidth: "30rem",
              color: "rgba(248,250,252,0.82)",
              fontSize: "1rem",
              lineHeight: 1.8,
            }}
          >
            If you have an opportunity, project, or collaboration in mind, send me a message.
            I&apos;d be happy to connect.
          </p>

          <a
            href="https://www.linkedin.com/in/karthiek-duggirala/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "2rem",
              color: "#FFFFFF",
              textDecoration: "none",
              fontWeight: 600,
              borderBottom: "1px solid rgba(255,255,255,0.3)",
              paddingBottom: "0.2rem",
            }}
          >
            Prefer LinkedIn? Connect with me there. &rarr;
          </a>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "24px",
            padding: "2rem",
            boxShadow: "0 16px 48px rgba(37,99,235,0.08)",
            display: "grid",
            gap: "1rem",
          }}
        >
          <div style={{ marginBottom: "0.5rem" }}>
            <p
              style={{
                margin: 0,
                color: "#2563EB",
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Contact Form
            </p>
            <h3
              style={{
                margin: "0.55rem 0 0",
                color: "#0F172A",
                fontSize: "1.75rem",
                letterSpacing: "-0.03em",
              }}
            >
              Tell me what you are building.
            </h3>
            <p
              style={{
                margin: "0.7rem 0 0",
                color: "#64748B",
                fontSize: "0.95rem",
                lineHeight: 1.7,
              }}
            >
              If you have an opportunity, project, or collaboration in mind, send me a message.
            </p>
          </div>

          <Field
            label="Company"
            placeholder="Acme Corp"
            value={form.company}
            onChange={(value) => update("company", value)}
          />

          <Field
            label="Email"
            placeholder="you@company.com"
            value={form.email}
            type="email"
            onChange={(value) => update("email", value)}
          />

          <Field
            label="Message"
            placeholder="I want to talk about..."
            value={form.message}
            multiline
            onChange={(value) => update("message", value)}
          />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.9rem",
              alignItems: "center",
              marginTop: "0.5rem",
            }}
          >
            <button
              type="submit"
              disabled={status === "sending"}
              style={{
                padding: "0.9rem 1.3rem",
                border: "none",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                color: "#FFFFFF",
                fontSize: "0.95rem",
                fontWeight: 700,
                cursor: status === "sending" ? "wait" : "pointer",
                boxShadow:
                  status === "sending"
                    ? "0 12px 24px rgba(37,99,235,0.18)"
                    : "0 14px 28px rgba(37,99,235,0.24)",
              }}
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </button>

          </div>

          {status === "sent" && (
            <div
              style={{
                marginTop: "0.25rem",
                borderRadius: "16px",
                padding: "1rem 1.1rem",
                backgroundColor: "#EFF6FF",
                color: "#1D4ED8",
                fontSize: "0.92rem",
                lineHeight: 1.6,
              }}
            >
              Thanks for reaching out. I&apos;ll get back to you soon.
            </div>
          )}

          {status === "error" && error && (
            <div
              style={{
                marginTop: "0.25rem",
                borderRadius: "16px",
                padding: "1rem 1.1rem",
                backgroundColor: "#FEF2F2",
                color: "#B91C1C",
                fontSize: "0.92rem",
                lineHeight: 1.6,
              }}
            >
              {error}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  multiline = false,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  type?: React.HTMLInputTypeAttribute;
}) {
  const baseStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid #CBD5E1",
    borderRadius: "16px",
    backgroundColor: "#F8FAFC",
    color: "#0F172A",
    fontSize: "0.95rem",
    lineHeight: 1.5,
    padding: "0.95rem 1rem",
    outline: "none",
  };

  return (
    <label style={{ display: "grid", gap: "0.55rem" }}>
      <span
        style={{
          color: "#0F172A",
          fontSize: "0.9rem",
          fontWeight: 600,
        }}
      >
        {label}
      </span>

      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={6}
          style={{ ...baseStyle, resize: "vertical", minHeight: "150px" }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={baseStyle}
        />
      )}
    </label>
  );
}
