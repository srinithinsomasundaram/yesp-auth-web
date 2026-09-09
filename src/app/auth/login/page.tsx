"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { AlertCircle, ArrowLeft, Fingerprint, ChevronRight, Building2, ChevronDown } from "lucide-react";
import { PasswordInput } from "@/components/PasswordInput";
import { Spinner } from "@/components/Spinner";
import { login, setTokens, getStoredTokens, getAccessToken, getMfaMethods, clearTokens, ApiError } from "@/lib/api";
import { setMfaPendingUser } from "@/lib/session";
import { getMsg } from "@/lib/messages";
import { navigateToConsole, navigateToAdmin, navigateToHireflow, ADMIN_URL, HIREFLOW_URL } from "@/lib/navigation";

type Step = "email" | "password" | "sso";

interface CheckResult {
  exists: boolean;
  sso: { connectionId: string; provider: string; domain: string } | null;
  hasPasskey: boolean;
  google: boolean;
}

interface AppContext {
  name: string;
  slug: string;
}

function SmartLoginLink() {
  return (
    <Link
      href="/auth/smart-login"
      className="group flex flex-col items-center gap-1.5 select-none"
      title="Smart Login — sign in from another device"
    >
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 text-slate-300 group-hover:text-slate-500 transition-colors">
        <rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
        <rect x="5" y="5" width="8" height="8" rx="1" fill="currentColor"/>
        <rect x="24" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
        <rect x="27" y="5" width="8" height="8" rx="1" fill="currentColor"/>
        <rect x="2" y="24" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
        <rect x="5" y="27" width="8" height="8" rx="1" fill="currentColor"/>
        <rect x="24" y="24" width="4" height="4" rx="0.5" fill="currentColor"/>
        <rect x="30" y="24" width="4" height="4" rx="0.5" fill="currentColor"/>
        <rect x="36" y="24" width="2" height="4" rx="0.5" fill="currentColor"/>
        <rect x="24" y="30" width="4" height="4" rx="0.5" fill="currentColor"/>
        <rect x="30" y="30" width="4" height="4" rx="0.5" fill="currentColor"/>
        <rect x="36" y="30" width="2" height="2" rx="0.5" fill="currentColor"/>
        <rect x="24" y="36" width="4" height="2" rx="0.5" fill="currentColor"/>
        <rect x="30" y="36" width="8" height="2" rx="0.5" fill="currentColor"/>
      </svg>
      <span className="text-[10px] font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
        Smart Login
      </span>
    </Link>
  );
}

interface TryAnotherMethodProps {
  showPasskey: boolean;
  showGoogle: boolean;
  passkeyLoading: boolean;
  busy: boolean;
  onPasskey: () => void;
}

function TryAnotherMethod({ showPasskey, showGoogle, passkeyLoading, busy, onPasskey }: TryAnotherMethodProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const hasAlternatives = showPasskey || showGoogle;

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-center gap-1.5 w-full text-sm text-slate-400 hover:text-slate-600 transition-colors"
      >
        Try another method
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div ref={panelRef} className="space-y-2">
          {showPasskey && (
            <button type="button" onClick={onPasskey} disabled={busy} className="btn-secondary">
              {passkeyLoading
                ? <><Spinner className="w-4 h-4" /> Waiting for device…</>
                : <><Fingerprint size={16} className="text-slate-400" /> Continue with passkey</>
              }
            </button>
          )}
          {showGoogle && (
            <a href="/api/v1/auth/google" className="btn-secondary">
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </a>
          )}
          {!hasAlternatives && (
            <p className="text-xs text-slate-400 text-center py-2">No other sign-in methods available for this account.</p>
          )}
          <SmartLoginLink />
        </div>
      )}
    </div>
  );
}

function LoginContent() {
  const router = useRouter();
  const params = useSearchParams();

  const nextUrl     = params.get("next")         ?? "/console";
  const redirectUri = params.get("redirect_uri") ?? "";
  const clientId    = params.get("client_id")    ?? "";
  const urlStep     = params.get("step") as Step | null;
  const urlEmail    = params.get("email") ?? "";

  const [step, setStep]             = useState<Step>(urlStep ?? "email");
  const [email, setEmail]           = useState(urlEmail);
  const [password, setPassword]     = useState("");
  const [checkResult, setCheckResult] = useState<CheckResult | null>(null);
  const [loading, setLoading]       = useState(false);
  const [checking, setChecking]     = useState(false);
  const [passkeyLoading, setPasskeyLoading] = useState(false);
  const [error, setError]           = useState<{ title: string; body?: string; action?: "signup" | "forgot" } | null>(null);
  const [appContext, setAppContext]  = useState<AppContext | null>(null);
  const [redirectValid, setRedirectValid] = useState(false);

  // Validate redirect_uri on mount — server confirms it's a registered URI
  useEffect(() => {
    if (!redirectUri) return;
    const q = new URLSearchParams({ redirect_uri: redirectUri });
    if (clientId) q.set("client_id", clientId);
    fetch(`/api/v1/auth/redirect-validate?${q}`)
      .then((r) => r.json())
      .then((data: { valid: boolean; appName?: string; slug?: string }) => {
        if (data.valid && data.appName) {
          setAppContext({ name: data.appName, slug: data.slug ?? "" });
          setRedirectValid(true);
        }
      })
      .catch(() => {});
  }, [redirectUri, clientId]);

  // Sync URL step on browser back/forward
  useEffect(() => {
    const s = params.get("step") as Step | null;
    setStep(s ?? "email");
    if (!s) setPassword("");
  }, [params]);

  // Clear tokens when explicitly logged out — AuthGuard handles the general redirect
  useEffect(() => {
    if (params.get("logged_out") === "1") clearTokens();
  }, [params]);

  // Redirect after login — to the validated redirect_uri or the console
  const doRedirect = useCallback((at?: string, rt?: string) => {
    if (redirectValid && redirectUri) {
      const tokens = at && rt ? { at, rt } : getStoredTokens();
      if (tokens) {
        const hash = new URLSearchParams({ at: tokens.at, rt: tokens.rt, next: nextUrl }).toString();
        window.location.href = `${redirectUri}#${hash}`;
        return;
      }
    }
    // /auth/* paths stay on auth domain — bridge would store tokens on wrong origin
    if (nextUrl.startsWith("/auth/")) {
      router.replace(nextUrl);
      return;
    }
    // Full URL pointing at the admin origin → bridge tokens there.
    // Use the same fallback as navigateToAdmin so this works even when
    // NEXT_PUBLIC_ADMIN_URL is not set on the auth app deployment.
    const adminBase    = ADMIN_URL    || "https://admin.yesp.space";
    const hireflowBase = HIREFLOW_URL || "https://hireflow.yesp.space";
    if (nextUrl.startsWith(adminBase)) {
      const adminPath = nextUrl.slice(adminBase.length) || "/admin";
      navigateToAdmin(adminPath, router);
      return;
    }
    if (nextUrl.startsWith(hireflowBase)) {
      const hireflowPath = nextUrl.slice(hireflowBase.length) || "/dashboard";
      navigateToHireflow(hireflowPath, router);
      return;
    }
    // /console/* paths always belong on the accounts domain
    if (nextUrl.startsWith("/console") || nextUrl.startsWith("/bridge")) {
      navigateToConsole(nextUrl, router);
      return;
    }
    navigateToConsole(nextUrl, router);
  }, [redirectValid, redirectUri, nextUrl, router]);

  // Build extra query params to preserve through step navigation and MFA
  const extraParams = useCallback(() => {
    const sp = new URLSearchParams();
    if (nextUrl !== "/console") sp.set("next", nextUrl);
    if (redirectUri) sp.set("redirect_uri", redirectUri);
    if (clientId) sp.set("client_id", clientId);
    return sp;
  }, [nextUrl, redirectUri, clientId]);

  function pushStep(s: Step, em?: string) {
    const sp = extraParams();
    if (s !== "email") { sp.set("step", s); sp.set("email", em ?? email); }
    router.push(`/auth/login?${sp.toString()}`);
  }

  const handleAfterLogin = useCallback(
    async (accessToken: string, refreshToken: string) => {
      setTokens(accessToken, refreshToken);
      const methods = await getMfaMethods().catch(() => []);
      const activeMfa = methods.find((m) => m.status === "active");
      if (activeMfa) {
        const payload = JSON.parse(atob(accessToken.split(".")[1]));
        setMfaPendingUser(payload.sub);
        router.push(`/auth/mfa?${extraParams().toString()}`);
      } else {
        doRedirect(accessToken, refreshToken);
      }
    },
    [router, extraParams, doRedirect]
  );

  async function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !email.includes("@")) {
      setError({ title: "Enter a valid email address" });
      return;
    }
    setChecking(true);
    try {
      const res = await fetch("/api/v1/auth/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const result = await res.json() as CheckResult;
      setCheckResult(result);
      if (!result.exists) {
        setError({ title: "No account found", body: "There's no Yesp account for this email address.", action: "signup" });
        return;
      }
      if (result.sso) { pushStep("sso", email.trim().toLowerCase()); }
      else { pushStep("password", email.trim().toLowerCase()); }
    } catch {
      setCheckResult(null);
      pushStep("password", email.trim().toLowerCase());
    } finally {
      setChecking(false);
    }
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await login(email, password);
      await handleAfterLogin(data.accessToken, data.refreshToken);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 429) setError(getMsg("AUTH_TOO_MANY_ATTEMPTS"));
        else if (err.status === 401) { setError({ ...getMsg("AUTH_INVALID_CREDENTIALS"), action: "forgot" }); setPassword(""); }
        else setError(getMsg("AUTH_SERVER_ERROR"));
      } else {
        setError(getMsg("AUTH_NETWORK_ERROR"));
      }
    } finally {
      setLoading(false);
    }
  }

  async function handlePasskeySignIn() {
    setError(null);
    setPasskeyLoading(true);
    try {
      const { loginWithPasskey } = await import("@/lib/passkey");
      await loginWithPasskey(email.trim().toLowerCase());
      const stored = getStoredTokens();
      if (stored) await handleAfterLogin(stored.at, stored.rt);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (!msg.includes("cancel") && !msg.includes("abort") && !msg.includes("NotAllowed")) {
        setError(getMsg("AUTH_PASSKEY_FAILED"));
      }
    } finally {
      setPasskeyLoading(false);
    }
  }

  const busy = loading || passkeyLoading || checking;

  // ── App context banner (like "To continue to SheetPro") ────────────────────
  const appBanner = appContext && (
    <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[8px] mb-1 animate-scale-in">
      <div className="w-5 h-5 bg-blue-600 rounded-[4px] flex items-center justify-center shrink-0">
        <span className="text-white text-[9px] font-bold uppercase">{appContext.name[0]}</span>
      </div>
      <p className="text-xs text-slate-500">
        To continue to <span className="font-semibold text-slate-700">{appContext.name}</span>
      </p>
    </div>
  );

  // ── Step: SSO ───────────────────────────────────────────────────────────────
  if (step === "sso" && checkResult?.sso) {
    const sso = checkResult.sso;
    return (
      <div key="sso" className="space-y-7 animate-fade-slide-in">
        <button onClick={() => { setError(null); pushStep("email"); }} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft size={14} /> Use another account
        </button>
        {appBanner}
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Continue to sign in</h1>
          <p className="text-sm text-slate-500 mt-1.5">{email}</p>
        </div>
        <div className="flex items-start gap-3 px-4 py-3.5 bg-blue-50 border border-blue-100 rounded-[8px]">
          <Building2 size={15} className="text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">Organization SSO required</p>
            <p className="text-xs text-blue-700 mt-0.5">Your organization requires you to sign in using your company account.</p>
          </div>
        </div>
        <a href={`/api/v1/sso/connect/${sso.connectionId}/oidc/initiate`} className="btn-primary">
          Continue with company SSO
        </a>
        <div className="text-center">
          <button onClick={() => { setCheckResult(null); setError(null); pushStep("email"); }} className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
            Use another account
          </button>
        </div>
      </div>
    );
  }

  // ── Step: Password ──────────────────────────────────────────────────────────
  if (step === "password") {
    const showPasskey = checkResult?.hasPasskey ?? false;
    const showGoogle  = checkResult?.google ?? false;
    return (
      <div key="password" className="space-y-7 animate-fade-slide-in">
        <div>
          <button onClick={() => { setError(null); setPassword(""); pushStep("email"); }} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-6">
            <ArrowLeft size={14} /> Use another account
          </button>
          {appBanner}
          <div className="flex items-start justify-between">
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Welcome back</h1>
            <SmartLoginLink />
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[6px]">
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
            <span className="text-white text-[10px] font-bold uppercase">{email[0]}</span>
          </div>
          <span className="text-sm text-slate-700 flex-1 truncate">{email}</span>
        </div>

        {error && (
          <div className="e-error">
            <AlertCircle size={15} className="shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium">{error.title}</p>
              {error.body && <p className="text-xs mt-0.5 text-red-600">{error.body}</p>}
              {error.action === "forgot" && (
                <Link href="/auth/forgot-password" className="inline-block mt-1.5 text-xs font-medium text-red-700 underline underline-offset-4 hover:text-red-900">
                  Reset your password →
                </Link>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="password" className="e-label mb-0">Password</label>
              <Link href="/auth/forgot-password" className="text-xs text-blue-600 hover:text-blue-700 hover:underline underline-offset-4">
                Forgot password?
              </Link>
            </div>
            <PasswordInput id="password" autoComplete="current-password" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)} disabled={busy} placeholder="Your password" />
          </div>
          <button type="submit" className="btn-primary" disabled={busy}>
            {loading ? <><Spinner /> Signing in…</> : "Sign in"}
          </button>
        </form>

        <TryAnotherMethod showPasskey={showPasskey} showGoogle={showGoogle} passkeyLoading={passkeyLoading} busy={busy} onPasskey={handlePasskeySignIn} />
      </div>
    );
  }

  // ── Step: Email ─────────────────────────────────────────────────────────────
  return (
    <div key="email" className="space-y-7 animate-fade-slide-up">
      {appBanner}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Sign in</h1>
          <p className="text-sm text-slate-500 mt-1.5">Sign in to your Yesp account</p>
        </div>
        <SmartLoginLink />
      </div>

      {error && (
        <div className="e-error">
          <AlertCircle size={15} className="shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium">{error.title}</p>
            {error.body && <p className="text-xs mt-0.5 text-red-600">{error.body}</p>}
            {error.action === "signup" && (
              <Link href="/auth/register" className="inline-block mt-1.5 text-xs font-medium text-red-700 underline underline-offset-4 hover:text-red-900">
                Create a Yesp account →
              </Link>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleContinue} className="space-y-4">
        <div>
          <label htmlFor="email" className="e-label">Email address</label>
          <input id="email" type="email" autoComplete="email" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" className="e-input" disabled={busy} />
        </div>
        <button type="submit" className="btn-primary" disabled={busy}>
          {checking ? <><Spinner /> Checking…</> : <>Continue <ChevronRight size={15} /></>}
        </button>
      </form>

      <div className="e-divider"><span>or continue with</span></div>

      <div className="space-y-2.5">
        <a href="/api/v1/auth/google" className="btn-secondary">
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </a>
      </div>

      <p className="text-sm text-slate-500 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="text-blue-600 font-medium hover:text-blue-700 hover:underline underline-offset-4">Sign up</Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return <Suspense><LoginContent /></Suspense>;
}
