"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Spinner } from "@/components/Spinner";
import { setTokens } from "@/lib/api";
import { getMsg } from "@/lib/messages";
import { navigateToConsole } from "@/lib/navigation";

function OAuthCallback() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
  const error = params.get("error");
  const next = params.get("next") ?? "/console";
  const [errorMsg, setErrorMsg] = useState<{ title: string; body?: string } | null>(null);

  useEffect(() => {
    if (error) {
      setErrorMsg(getMsg(error));
      return;
    }

    if (!code) {
      setErrorMsg(getMsg("AUTH_OAUTH_FAILED"));
      return;
    }

    fetch("/api/v1/auth/oauth/exchange", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })
      .then(async (res) => {
        if (!res.ok) {
          setErrorMsg(getMsg("AUTH_OAUTH_CODE_EXPIRED"));
          return;
        }
        const { accessToken, refreshToken } = await res.json() as {
          accessToken: string;
          refreshToken: string;
          idToken: string;
        };
        setTokens(accessToken, refreshToken);
        navigateToConsole(next, router);
      })
      .catch(() => setErrorMsg(getMsg("AUTH_NETWORK_ERROR")));
  }, [code, error, next, router]);

  if (errorMsg) {
    return (
      <div className="space-y-7">
        <div className="flex flex-col items-center text-center gap-4 pt-2">
          <div className="w-14 h-14 bg-red-50 border border-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">{errorMsg.title}</h1>
            {errorMsg.body && <p className="text-sm text-slate-500 mt-2">{errorMsg.body}</p>}
          </div>
        </div>
        <div className="space-y-3">
          <button className="btn-primary" onClick={() => router.push("/auth/login")}>
            Back to sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <Spinner className="w-7 h-7 text-blue-600" />
      <p className="text-sm text-slate-500">Completing sign-in…</p>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return <Suspense><OAuthCallback /></Suspense>;
}
