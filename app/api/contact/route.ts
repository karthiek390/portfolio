import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

async function sendSlackAlert({
  company,
  email,
  message,
  createdAt,
}: {
  company: string;
  email: string;
  message: string;
  createdAt: Date;
}) {
  if (!SLACK_WEBHOOK_URL) return;

  const text = [
    "New portfolio contact received",
    `Company: ${company}`,
    `Email: ${email}`,
    `Message: ${message}`,
    `Received: ${createdAt.toISOString()}`,
  ].join("\n");

  const res = await fetch(SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "New portfolio contact",
          },
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Company*\n${company}`,
            },
            {
              type: "mrkdwn",
              text: `*Email*\n${email}`,
            },
          ],
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Message*\n${message}`,
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `Received ${createdAt.toISOString()}`,
            },
          ],
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`Slack webhook responded with ${res.status}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { company, email, message } = body as {
      company: string;
      email:   string;
      message: string;
    };

    if (!company?.trim())
      return NextResponse.json({ ok: false, error: "Organization name required." }, { status: 400 });
    if (!email?.trim() || !EMAIL_RE.test(email))
      return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
    if (!message?.trim())
      return NextResponse.json({ ok: false, error: "Message body required." }, { status: 400 });

    const normalizedCompany = company.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedMessage = message.trim();
    const createdAt = new Date();

    await prisma.contact.create({
      data: {
        company:   normalizedCompany,
        email:     normalizedEmail,
        message:   normalizedMessage,
        createdAt,
      },
    });

    try {
      await sendSlackAlert({
        company: normalizedCompany,
        email: normalizedEmail,
        message: normalizedMessage,
        createdAt,
      });
    } catch (slackErr) {
      console.error("[/api/contact] Slack alert failed", slackErr);
    }

    return NextResponse.json({ ok: true, message: "Signal received." });
  } catch (err) {
    console.error("[/api/contact]", err);
    return NextResponse.json({ ok: false, error: "Transmission failed. Try again." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
