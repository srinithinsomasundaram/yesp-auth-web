"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CustomQRCode } from "@/components/QRCode";
import { ArrowLeft, CheckCircle2, XCircle, Loader2, RefreshCw } from "lucide-react";
import { Spinner } from "@/components/Spinner";
import { setTokens } from "@/lib/api";
import { navigateToConsole } from "@/lib/navigation";

type Status = "loading" | "pending" | "scanned" | "approved" | "declined" | "expired" | "error";

interface SlTokens {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  expiresIn: number;
}

export default function SmartLoginPage() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("loading");
  const [qrUrl, setQrUrl] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stopRef = useRef(false);

  useEffect(() => {
    init();
    return () => {
      stopRef.current = true;
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  async function init() {
    try {
      const res = await fetch("/api/v1/auth/smart-login/init", { method: "POST" });
      if (!res.ok) throw new Error();
      const { token: t, qrUrl: q } = await res.json() as { token: string; qrUrl: string };
      setToken(t);
      setQrUrl(q);
      setStatus("pending");
      startPolling(t);
    } catch {
      setStatus("error");
    }
  }

  function startPolling(t: string) {
    pollRef.current = setInterval(async () => {
      if (stopRef.current) return;
      try {
        const res = await fetch(`/api/v1/auth/smart-login/status?token=${t}`);
        const data = await res.json() as { status: string; tokens?: SlTokens };

        if (data.status === "scanned") {
          setStatus("scanned");
        } else if (data.status === "approved" && data.tokens) {
          clearInterval(pollRef.current!);
          setStatus("approved");
          setTokens(data.tokens.accessToken, data.tokens.refreshToken);
          setTimeout(() => navigateToConsole("/console", router), 1200);
        } else if (data.status === "declined") {
          clearInterval(pollRef.current!);
          setStatus("declined");
        } else if (data.status === "expired") {
          clearInterval(pollRef.current!);
          setStatus("expired");
        }
      } catch {
        // silent — network hiccup
      }
    }, 2000);
  }

  function handleRetry() {
    stopRef.current = false;
    setStatus("loading");
    setQrUrl("");
    setToken("");
    init();
  }

  // ── Approved ──────────────────────────────────────────────────────────────────
  if (status === "approved") {
    return (
      <div className="flex flex-col items-center gap-6 py-10 text-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={1.8} />
          </div>
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Identity verified</h1>
          <p className="text-sm text-slate-500 mt-1.5">Signing you in securely…</p>
        </div>
        <Spinner className="w-5 h-5 text-emerald-600" />
      </div>
    );
  }

  // ── Declined / Expired / Error ────────────────────────────────────────────────
  if (status === "declined" || status === "expired" || status === "error") {
    const messages = {
      declined: { title: "Request declined", body: "The sign-in request was declined on your other device." },
      expired:  { title: "Code expired", body: "Smart Login codes are only active for 5 minutes for your security." },
      error:    { title: "Something went wrong", body: "We couldn't create a Smart Login session. Please try again." },
    };
    const m = messages[status];
    return (
      <div className="flex flex-col items-center gap-6 py-8 text-center">
        <div className="w-18 h-18 w-[72px] h-[72px] rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
          <XCircle className="w-9 h-9 text-red-500" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-slate-900">{m.title}</h1>
          <p className="text-sm text-slate-500 mt-1.5 max-w-[280px] mx-auto">{m.body}</p>
        </div>
        <div className="flex flex-col gap-2.5 w-full">
          <button onClick={handleRetry} className="btn-primary flex items-center justify-center gap-2">
            <RefreshCw size={14} />
            Generate a new code
          </button>
          <button onClick={() => router.back()} className="btn-ghost">
            <ArrowLeft size={14} /> Use another method
          </button>
        </div>
      </div>
    );
  }

  // ── Loading ───────────────────────────────────────────────────────────────────
  if (status === "loading" || !qrUrl) {
    return (
      <div className="flex flex-col items-center gap-6 py-6">
        <div className="w-full">
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Smart Login</h1>
          <p className="text-sm text-slate-500 mt-1.5">Scan to sign in from a trusted device.</p>
        </div>
        <button
          onClick={() => router.back()}
          className="btn-secondary w-full flex items-center justify-center gap-1.5"
        >
          <ArrowLeft size={14} /> Use another sign-in method
        </button>

        {/* Skeleton QR card */}
        <div className="w-full rounded-2xl overflow-hidden border border-slate-200">
          <div className="bg-[#0d1117] p-6 flex flex-col items-center gap-4">
            <div className="w-[220px] h-[220px] rounded-xl bg-white/5 animate-pulse" />
          </div>
          <div className="bg-slate-50 px-5 py-4 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-slate-200 animate-pulse" />
            <div className="h-3 w-36 rounded bg-slate-200 animate-pulse" />
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-sm text-slate-400">
          <Spinner className="w-4 h-4 text-blue-500" />
          Preparing your code…
        </div>
      </div>
    );
  }

  // ── QR display ────────────────────────────────────────────────────────────────
  const isScanned = status === "scanned";

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Smart Login</h1>
        <p className="text-sm text-slate-500 mt-1.5">
          Scan this code using a device where you&apos;re already signed in.
        </p>
      </div>

      <button onClick={() => router.back()} className="btn-secondary">
        <ArrowLeft size={14} /> Use another sign-in method
      </button>

      {/* QR Card */}
      <div
        className="w-full rounded-2xl overflow-hidden border transition-all duration-300"
        style={{
          borderColor: isScanned ? "#f59e0b" : "#e2e8f0",
          boxShadow: isScanned ? "0 0 0 3px rgba(245,158,11,0.15)" : "none",
        }}
      >
        {/* Dark QR zone */}
        <div
          className="relative flex flex-col items-center justify-center px-6 py-7 transition-all duration-300"
          style={{ background: isScanned ? "#1a1200" : "#0d1117" }}
        >
          {/* Corner accents */}
          <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 rounded-tl-sm"
            style={{ borderColor: isScanned ? "#f59e0b" : "#334155" }} />
          <span className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 rounded-tr-sm"
            style={{ borderColor: isScanned ? "#f59e0b" : "#334155" }} />
          <span className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 rounded-bl-sm"
            style={{ borderColor: isScanned ? "#f59e0b" : "#334155" }} />
          <span className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 rounded-br-sm"
            style={{ borderColor: isScanned ? "#f59e0b" : "#334155" }} />

          {/* QR wrapper */}
          <div className="relative rounded-xl overflow-hidden bg-white p-3 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
            <CustomQRCode value={qrUrl} size={196} />

            {/* Scanned overlay */}
            {isScanned && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 rounded-xl">
                <Loader2 className="w-9 h-9 text-amber-500 animate-spin mb-2" strokeWidth={1.5} />
                <p className="text-xs font-semibold text-slate-800">Device detected</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Waiting for approval…</p>
              </div>
            )}
          </div>
        </div>

        {/* Status bar */}
        <div
          className="flex items-center gap-3 px-5 py-3.5 transition-colors duration-300"
          style={{ background: isScanned ? "#fffbeb" : "#f8fafc" }}
        >
          {isScanned ? (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <p className="text-xs font-medium text-amber-700">Confirm the sign-in on your other device</p>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0" />
              <p className="text-xs text-slate-500">Waiting for device scan…</p>
            </>
          )}
        </div>
      </div>

      {/* How-to */}
      <p className="text-xs text-slate-400 text-center">
        Open Yesp on a signed-in device · Go to Settings → Smart Login · Approve
      </p>

    </div>
  );
}
