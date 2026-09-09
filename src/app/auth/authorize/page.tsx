"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@/components/Spinner";
import { AlertCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { getStoredTokens, clearTokens } from "@/lib/api";

interface AppInfo {
  name: string;
  slug: string;
  logoUrl?: string;
}

function AuthorizeContent() {
  const router = useRouter();
  const params = useSearchParams();

  const clientId = params.get("client_id") ?? "";
  const redirectUri = params.get("redirect_uri") ?? "";
  const codeChallenge = params.get("code_challenge") ?? "";
  const codeChallengeMethod = params.get("code_challenge_method") ?? "S256";
  const state = params.get("state") ?? "";
  const scope = params.get("scope") ?? "openid profile email";
  const responseType = params.get("response_type") ?? "";

  const [status, setStatus] = useState<"checking" | "error" | "login_required">("checking");
  const [error, setError] = useState("");
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);

  useEffect(() => {
    // Basic param validation
    if (responseType !== "code") {
      setError("unsupported_response_type");
      setStatus("error");
      return;
    }
    if (!clientId || !redirectUri || !codeChallenge) {
      setError("invalid_request");
      setStatus("error");
      return;
    }

    // Check if user is already authenticated
    const tokens = getStoredTokens();
    if (!tokens) {
      // Not logged in — need to redirect to login with these params preserved
      setStatus("login_required");
      return;
    }

    // User has tokens — try silent SSO: call GET /api/v1/authorize with Bearer token
    const q = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      code_challenge: codeChallenge,
      code_challenge_method: codeChallengeMethod,
      scope,
    });
    if (state) q.set("state", state);

    fetch(`/api/v1/authorize?${q}`, {
      headers: { Authorization: `Bearer ${tokens.at}` },
    })
      .then((r) => r.json())
      .then((data: { redirectTo?: string; appName?: string; appSlug?: string; error?: string }) => {
        if (data.error) {
          if (data.error === "invalid_client" || data.error === "invalid_redirect_uri") {
            setError(data.error);
            setStatus("error");
          } else {
            // Token likely expired — fall back to login
            clearTokens();
            setStatus("login_required");
          }
          return;
        }
        if (data.redirectTo) {
          setAppInfo({ name: data.appName ?? clientId, slug: data.appSlug ?? "" });
          // Small delay so user sees the "Signing in to…" state
          setTimeout(() => { window.location.href = data.redirectTo!; }, 400);
        }
      })
      .catch(() => {
        clearTokens();
        setStatus("login_required");
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redirect to login, preserving all OIDC params so after login we come back here
  useEffect(() => {
    if (status !== "login_required") return;
    const q = new URLSearchParams({
      next: `/auth/authorize?${params.toString()}`,
    });
    router.replace(`/auth/login?${q}`);
  }, [status, params, router]);

  if (status === "error") {
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-3 px-4 py-3.5 bg-red-50 border border-red-200 rounded-[8px]">
          <AlertCircle size={16} className="text-red-600 shrink-0" />
          <div>
            <p className="text-sm font-medium text-red-900">Authorization error</p>
            <p className="text-xs text-red-700 mt-0.5 font-mono">{error}</p>
          </div>
        </div>
        <Link href="/auth/login" className="btn-secondary">Back to sign in</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5 py-6">
      <div className="w-11 h-11 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center">
        <ShieldCheck size={20} className="text-blue-600" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-slate-800">
          {appInfo ? `Signing in to ${appInfo.name}…` : "Verifying your session…"}
        </p>
        <p className="text-xs text-slate-400 mt-1">You&apos;ll be redirected automatically.</p>
      </div>
      <Spinner className="w-5 h-5 text-blue-600" />
    </div>
  );
}

export default function AuthorizePage() {
  return <Suspense><AuthorizeContent /></Suspense>;
}
