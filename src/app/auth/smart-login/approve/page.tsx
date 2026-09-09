"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Laptop, Globe, ShieldCheck, XCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { Spinner } from "@/components/Spinner";
import { isAuthenticated } from "@/lib/session";
import { getMe } from "@/lib/api";
import { navigateToAuth, navigateToConsole } from "@/lib/navigation";

type PageState = "loading" | "confirm" | "done" | "declined" | "expired" | "error";

interface RequestInfo {
  userAgent: string;
  ip: string;
  createdAt: string;
}

function parseUserAgent(ua: string): { browser: string; os: string } {
  const browser = ua.includes("Chrome")
    ? "Chrome"
    : ua.includes("Firefox")
    ? "Firefox"
    : ua.includes("Safari")
    ? "Safari"
    : ua.includes("Edge")
    ? "Edge"
    : "Unknown browser";

  const os = ua.includes("Windows")
    ? "Windows"
    : ua.includes("Mac")
    ? "macOS"
    : ua.includes("iPhone") || ua.includes("iPad")
    ? "iOS"
    : ua.includes("Android")
    ? "Android"
    : ua.includes("Linux")
    ? "Linux"
    : "Unknown OS";

  return { browser, os };
}

function ApproveContent() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";

  const [state, setState] = useState<PageState>("loading");
  const [requestInfo, setRequestInfo] = useState<RequestInfo | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [approving, setApproving] = useState(false);

  useEffect(() => {
    if (!token) { setState("error"); return; }
    if (!isAuthenticated()) {
      const returnUrl = encodeURIComponent(`/auth/smart-login/approve?token=${token}`);
      navigateToAuth(`/auth/login?next=${returnUrl}`, router);
      return;
    }

    Promise.all([
      fetch("/api/v1/auth/smart-login/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      }),
      getMe(),
    ])
      .then(async ([scanRes, me]) => {
        setUserName(me.displayName ?? me.firstName ?? me.email.split("@")[0]);

        if (!scanRes.ok) {
          const body = await scanRes.json() as { error: string };
          if (body.error === "expired") setState("expired");
          else if (body.error === "already_processed") setState("error");
          else setState("error");
          return;
        }

        const data = await scanRes.json() as { requestInfo: RequestInfo };
        setRequestInfo(data.requestInfo);
        setState("confirm");
      })
      .catch(() => setState("error"));
  }, [token, router]);

  async function handleDecision(approved: boolean) {
    if (!token) return;
    setApproving(true);
    try {
      const token_ = (await import("@/lib/api")).getAccessToken();
      const res = await fetch("/api/v1/auth/smart-login/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token_ ? { Authorization: `Bearer ${token_}` } : {}),
        },
        body: JSON.stringify({ token, approved }),
      });

      if (!res.ok) {
        const body = await res.json() as { error: string };
        if (body.error === "expired") { setState("expired"); return; }
        setState("error");
        return;
      }

      setState(approved ? "done" : "declined");
    } catch {
      setState("error");
    } finally {
      setApproving(false);
    }
  }

  const { browser, os } = requestInfo ? parseUserAgent(requestInfo.userAgent) : { browser: "", os: "" };

  if (state === "loading") {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <Spinner className="w-7 h-7 text-blue-600" />
        <p className="text-sm text-slate-500">Verifying sign-in request…</p>
      </div>
    );
  }

  if (state === "done") {
    return (
      <div className="flex flex-col items-center gap-5 py-10 text-center">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Sign-in approved</h1>
          <p className="text-sm text-slate-500 mt-1.5">The other device is now being signed in securely.</p>
        </div>
        <button onClick={() => navigateToConsole("/console", router)} className="btn-primary">
          Back to your account
        </button>
      </div>
    );
  }

  if (state === "declined") {
    return (
      <div className="flex flex-col items-center gap-5 py-10 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
          <XCircle className="w-8 h-8 text-slate-400" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Request declined</h1>
          <p className="text-sm text-slate-500 mt-1.5">The sign-in was not approved. If this was unexpected, review your account security.</p>
        </div>
        <button onClick={() => navigateToConsole("/console/security", router)} className="btn-secondary">
          Review security
        </button>
      </div>
    );
  }

  if (state === "expired") {
    return (
      <div className="flex flex-col items-center gap-5 py-10 text-center">
        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center">
          <XCircle className="w-8 h-8 text-amber-500" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-slate-900">This code has expired</h1>
          <p className="text-sm text-slate-500 mt-1.5">For your security, Smart Login codes are only active for 5 minutes. Ask the other device to generate a new code.</p>
        </div>
      </div>
    );
  }

  if (state === "error" || !requestInfo) {
    return (
      <div className="flex flex-col items-center gap-5 py-10 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
          <XCircle className="w-8 h-8 text-red-500" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-slate-900">This code can&apos;t be used</h1>
          <p className="text-sm text-slate-500 mt-1.5">Start a new Smart Login request and try again.</p>
        </div>
      </div>
    );
  }

  // ── Confirm screen ────────────────────────────────────────────────────────────
  return (
    <div className="space-y-7">
      <div className="flex flex-col items-center text-center gap-3 pt-2">
        <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center">
          <ShieldCheck className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Yesp Smart Login</h1>
          <p className="text-sm text-slate-500 mt-1.5">
            A sign-in request was received for <span className="font-medium text-slate-700">{userName}</span>&apos;s account.
          </p>
        </div>
      </div>

      {/* Request details */}
      <div className="e-card divide-y divide-slate-100 overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="w-8 h-8 bg-slate-100 rounded-[6px] flex items-center justify-center shrink-0">
            <Laptop size={15} className="text-slate-500" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Device</p>
            <p className="text-sm font-medium text-slate-900">{browser} on {os}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="w-8 h-8 bg-slate-100 rounded-[6px] flex items-center justify-center shrink-0">
            <Globe size={15} className="text-slate-500" />
          </div>
          <div>
            <p className="text-xs text-slate-400">IP address</p>
            <p className="text-sm font-medium text-slate-900 font-mono">{requestInfo.ip}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => handleDecision(false)}
          disabled={approving}
          className="flex-1 btn-danger justify-center py-2.5"
        >
          {approving ? <Spinner className="w-4 h-4" /> : "Decline"}
        </button>
        <button
          onClick={() => handleDecision(true)}
          disabled={approving}
          className="flex-[2] flex items-center justify-center gap-2 py-2.5 px-5 bg-blue-600 text-white text-sm font-medium rounded-[6px] hover:bg-blue-700 disabled:opacity-50 transition-all duration-150"
        >
          {approving ? <><Spinner className="w-4 h-4" /> Approving…</> : <><CheckCircle2 size={15} /> Approve sign-in</>}
        </button>
      </div>

      <p className="text-xs text-slate-400 text-center">
        Only approve sign-in requests you initiated. If this looks suspicious, decline and review your account security.
      </p>
    </div>
  );
}

export default function SmartLoginApprovePage() {
  return <Suspense><ApproveContent /></Suspense>;
}
