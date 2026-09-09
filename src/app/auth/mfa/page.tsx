"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, ShieldCheck } from "lucide-react";
import { OtpInput } from "@/components/OtpInput";
import { Spinner } from "@/components/Spinner";
import { AuthLink } from "@/components/AuthCard";
import { challengeTotp, getStoredTokens, ApiError } from "@/lib/api";
import { getMfaPendingUser, clearMfaPendingUser } from "@/lib/session";
import { navigateToAuth, navigateToConsole, navigateToHireflow, HIREFLOW_URL } from "@/lib/navigation";

type Mode = "totp" | "recovery";

function MfaContent() {
  const router = useRouter();
  const params = useSearchParams();

  const nextUrl     = params.get("next")         ?? "/console";
  const redirectUri = params.get("redirect_uri") ?? "";
  const clientId    = params.get("client_id")    ?? "";

  const [userId, setUserId]         = useState<string | null>(null);
  const [code, setCode]             = useState("");
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [mode, setMode]             = useState<Mode>("totp");
  const [recoveryCode, setRecoveryCode] = useState("");

  useEffect(() => {
    const uid = getMfaPendingUser();
    if (!uid) {
      const sp = new URLSearchParams({ next: nextUrl });
      if (redirectUri) sp.set("redirect_uri", redirectUri);
      if (clientId) sp.set("client_id", clientId);
      navigateToAuth(`/auth/login?${sp}`, router);
      return;
    }
    setUserId(uid);
  }, [router, nextUrl, redirectUri, clientId]);

  function doRedirect() {
    clearMfaPendingUser();
    if (redirectUri) {
      const tokens = getStoredTokens();
      if (tokens) {
        const hash = new URLSearchParams({ at: tokens.at, rt: tokens.rt, next: nextUrl }).toString();
        window.location.href = `${redirectUri}#${hash}`;
        return;
      }
    }
    const hireflowBase = HIREFLOW_URL || "https://hireflow.yesp.space";
    if (nextUrl.startsWith(hireflowBase)) {
      navigateToHireflow(nextUrl.slice(hireflowBase.length) || "/dashboard", router);
      return;
    }
    navigateToConsole(nextUrl, router);
  }

  async function verifyTotp(otp: string) {
    if (!userId) return;
    setError("");
    setLoading(true);
    try {
      await challengeTotp(userId, otp);
      doRedirect();
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setError("Incorrect code. Check your authenticator app and try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      setCode("");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (code.length === 6 && mode === "totp" && !loading) {
      verifyTotp(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  async function handleRecovery(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/v1/mfa/recovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, code: recoveryCode.trim() }),
      });
      if (!res.ok) throw new ApiError("invalid_recovery_code", 401);
      doRedirect();
    } catch {
      setError("Invalid recovery code. Each code can only be used once.");
    } finally {
      setLoading(false);
    }
  }

  if (mode === "recovery") {
    return (
      <div key="recovery" className="space-y-7 animate-fade-slide-in">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Recovery code</h1>
          <p className="text-sm text-slate-500 mt-1.5">Enter one of your 10-character backup recovery codes.</p>
        </div>

        <form onSubmit={handleRecovery} className="space-y-4">
          {error && (
            <div className="e-error">
              <AlertCircle size={15} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          <div>
            <label htmlFor="recovery" className="e-label">Recovery code</label>
            <input
              id="recovery"
              type="text"
              autoFocus
              required
              value={recoveryCode}
              onChange={(e) => setRecoveryCode(e.target.value)}
              placeholder="Enter recovery code"
              className="e-input font-mono tracking-widest"
              disabled={loading}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading || !recoveryCode.trim()}>
            {loading ? <><Spinner /> Verifying…</> : "Verify recovery code"}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => { setMode("totp"); setError(""); }}
            className="text-sm text-blue-600 hover:text-blue-700 hover:underline underline-offset-4"
          >
            Use authenticator app instead
          </button>
        </div>
      </div>
    );
  }

  return (
    <div key="totp" className="space-y-8 animate-fade-slide-up">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center">
          <ShieldCheck className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Verify your identity</h1>
          <p className="text-sm text-slate-500 mt-1.5">
            Enter the 6-digit code from your authenticator app.
          </p>
        </div>
      </div>

      {error && (
        <div className="e-error">
          <AlertCircle size={15} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <OtpInput value={code} onChange={setCode} length={6} disabled={loading} />

      {loading && (
        <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
          <Spinner className="w-4 h-4 text-blue-600" />
          Verifying…
        </div>
      )}

      <div className="flex flex-col items-center gap-3 pt-2">
        <AuthLink href="/auth/login">← Back to sign in</AuthLink>
        <button
          onClick={() => { setMode("recovery"); setError(""); setCode(""); }}
          className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
        >
          Use a recovery code
        </button>
      </div>
    </div>
  );
}

export default function MfaPage() {
  return <Suspense><MfaContent /></Suspense>;
}
