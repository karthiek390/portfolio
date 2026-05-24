import { NextRequest, NextResponse } from "next/server";

function hasPillChoice(req: NextRequest) {
  const value = req.cookies.get("pill_mode")?.value;
  return value === "blue" || value === "red";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const chosen = hasPillChoice(req);

  if (pathname === "/" && chosen) {
    return NextResponse.redirect(new URL("/portfolio", req.url));
  }

  if (pathname === "/portfolio" && !chosen) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/portfolio"],
};
