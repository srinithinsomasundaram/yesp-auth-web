import { getStoredTokens } from "./api";

export const AUTH_URL    = (process.env.NEXT_PUBLIC_AUTH_URL    || "").replace(/\/$/, "");
export const CONSOLE_URL = (process.env.NEXT_PUBLIC_CONSOLE_URL || "").replace(/\/$/, "");
export const ADMIN_URL   = (process.env.NEXT_PUBLIC_ADMIN_URL   || "").replace(/\/$/, "");

function isCrossOrigin(targetUrl: string): boolean {
  if (!targetUrl || typeof window === "undefined") return false;
  try {
    return window.location.origin !== new URL(targetUrl).origin;
  } catch {
    return false;
  }
}

/**
 * Navigates to the accounts console (accounts.yesp.space / localhost:3002).
 * Passes tokens via /bridge fragment when crossing origins.
 */
export function navigateToConsole(
  targetPath: string = "/console",
  router?: { push: (url: string) => void; replace: (url: string) => void }
) {
  if (typeof window === "undefined") return;

  if (CONSOLE_URL && isCrossOrigin(CONSOLE_URL)) {
    const tokens = getStoredTokens();
    if (tokens) {
      const frag = new URLSearchParams({ at: tokens.at, next: targetPath });
      window.location.href = `${CONSOLE_URL}/bridge#${frag.toString()}`;
    } else {
      window.location.href = `${CONSOLE_URL}${targetPath}`;
    }
  } else {
    if (router) router.push(targetPath);
    else window.location.href = targetPath;
  }
}

/**
 * Navigates to the admin panel (admin.yesp.space / localhost:3003).
 * Passes tokens via /bridge fragment when crossing origins.
 */
export function navigateToAdmin(
  targetPath: string = "/admin",
  router?: { push: (url: string) => void; replace: (url: string) => void }
) {
  if (typeof window === "undefined") return;

  if (ADMIN_URL && isCrossOrigin(ADMIN_URL)) {
    const tokens = getStoredTokens();
    if (tokens) {
      const frag = new URLSearchParams({ at: tokens.at, next: targetPath });
      window.location.href = `${ADMIN_URL}/bridge#${frag.toString()}`;
    } else {
      window.location.href = `${ADMIN_URL}${targetPath}`;
    }
  } else {
    if (router) router.push(targetPath);
    else window.location.href = targetPath;
  }
}

/**
 * Navigates to auth (auth.yesp.space / localhost:3001).
 */
export function navigateToAuth(
  targetPath: string = "/auth/login",
  router?: { push: (url: string) => void; replace: (url: string) => void }
) {
  if (typeof window === "undefined") return;

  if (AUTH_URL && isCrossOrigin(AUTH_URL)) {
    window.location.href = `${AUTH_URL}${targetPath}`;
  } else {
    if (router) router.push(targetPath);
    else window.location.href = targetPath;
  }
}
