"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { isAuthenticated } from "@/lib/session";
import { getMe, setTokens, clearTokens } from "@/lib/api";
import { navigateToConsole, navigateToAdmin, AUTH_URL, ADMIN_URL, CONSOLE_URL } from "@/lib/navigation";

// Mid-auth flows — user may be partially authenticated (e.g. passed password, not MFA yet).
// Never redirect these away to the console/admin.
const MID_FLOW_PREFIXES = [
  "/auth/mfa",
  "/auth/smart-login",
  "/auth/oauth",
  "/auth/verify-email",
  "/auth/authorize",
];

function isMidFlow(path: string) {
  return MID_FLOW_PREFIXES.some((p) => path.startsWith(p));
}

// Trusted origins — only redirect to these to prevent open redirect attacks
const TRUSTED_ORIGINS = new Set(
  [ADMIN_URL, CONSOLE_URL, AUTH_URL].filter(Boolean)
);

function isTrustedNext(next: string): boolean {
  // Relative paths are always safe
  if (next.startsWith("/")) return true;
  // Full URLs must match a trusted origin exactly
  try {
    const url = new URL(next);
    return TRUSTED_ORIGINS.has(`${url.protocol}//${url.host}`);
  } catch {
    return false;
  }
}

/**
 * Resolves where to send the user after confirming they are already logged in.
 * Only redirects to trusted origins — prevents open redirect attacks.
 */
function resolveRedirect(
  next: string | null,
  router: Parameters<typeof navigateToConsole>[1]
) {
  if (next && isTrustedNext(next)) {
    // Full URL pointing to the admin app
    if (ADMIN_URL && next.startsWith(ADMIN_URL)) {
      const path = next.slice(ADMIN_URL.length) || "/admin";
      navigateToAdmin(path, router);
      return;
    }
    // Full URL pointing to the console app
    if (CONSOLE_URL && next.startsWith(CONSOLE_URL)) {
      const path = next.slice(CONSOLE_URL.length) || "/console";
      navigateToConsole(path, router);
      return;
    }
    // Relative path — infer the app from the leading segment
    if (next.startsWith("/admin")) {
      navigateToAdmin(next, router);
      return;
    }
    if (next.startsWith("/")) {
      navigateToConsole(next, router);
      return;
    }
  }

  // Default (or untrusted next): accounts console home
  navigateToConsole("/console", router);
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Start visible — redirect happens async. Prevents blank-page flash for
  // users who aren't logged in (the common case on auth pages).
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    // Skip guard on mid-auth pages
    if (isMidFlow(pathname)) return;

    const next = searchParams.get("next");

    const check = async () => {
      // If already has an in-memory token, redirect immediately (no flash)
      if (isAuthenticated()) {
        getMe()
          .then(() => resolveRedirect(next, router))
          .catch(() => clearTokens());
        return;
      }

      // No in-memory token: try silent refresh via the HttpOnly RT cookie in
      // the background. The form is already visible, so no blank-page flash.
      try {
        const res = await fetch("/api/v1/auth/token/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) return; // No valid session — stay on form

        const data = await res.json() as { accessToken: string };
        setTokens(data.accessToken, "");

        // Cookie restore worked — redirect away from auth page
        getMe()
          .then(() => resolveRedirect(next, router))
          .catch(() => clearTokens());
      } catch {
        // Network error — stay on form
      }
    };

    check();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!checked) return null;

  return <>{children}</>;
}
