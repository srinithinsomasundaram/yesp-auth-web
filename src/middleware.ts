import { NextRequest, NextResponse } from "next/server";

const AUTH_ORIGIN    = (process.env.NEXT_PUBLIC_AUTH_URL    ?? "https://auth.yesp.space").replace(/\/$/, "");
const CONSOLE_ORIGIN = (process.env.NEXT_PUBLIC_CONSOLE_URL ?? "https://accounts.yesp.space").replace(/\/$/, "");

function corsHeaders(req: NextRequest, res: NextResponse): NextResponse {
  const origin = req.headers.get("origin") || req.headers.get("referer");
  if (origin) {
    try {
      const url = new URL(origin);
      res.headers.set("Access-Control-Allow-Origin", url.origin);
    } catch {
      res.headers.set("Access-Control-Allow-Origin", "*");
    }
  } else {
    res.headers.set("Access-Control-Allow-Origin", "*");
  }
  res.headers.set("Access-Control-Allow-Credentials", "true");
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.headers.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );
  return res;
}

export function middleware(request: NextRequest) {
  if (request.method === "OPTIONS") {
    return corsHeaders(request, new NextResponse(null, { status: 204 }));
  }

  const { pathname } = request.nextUrl;

  // Allow: auth pages, bridge, help, security, api proxy, root
  const allowed =
    pathname === "/" ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/bridge") ||
    pathname.startsWith("/help") ||
    pathname.startsWith("/security") ||
    pathname.startsWith("/api");

  if (!allowed) {
    // /console/* paths belong on the accounts app — redirect there instead of to login
    // (prevents a redirect loop when NEXT_PUBLIC_CONSOLE_URL is not set in the env)
    if (pathname.startsWith("/console") || pathname.startsWith("/bridge")) {
      return NextResponse.redirect(`${CONSOLE_ORIGIN}${pathname}${request.nextUrl.search}`);
    }
    return corsHeaders(request, NextResponse.redirect(`${AUTH_ORIGIN}/auth/login`));
  }

  return corsHeaders(request, NextResponse.next());
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|logo\\.png|og-image\\.png|manifest\\.json|sitemap\\.xml|robots\\.txt).*)"],
};
