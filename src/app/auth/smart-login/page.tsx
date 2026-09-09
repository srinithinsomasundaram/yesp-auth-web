"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, CheckCircle2, XCircle, Loader2 } from "lucide-react";
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
          setTimeout(() => {
            navigateToConsole("/console", router);
          }, 1200);
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

  // ── Approved ─────────────────────────────────────────────────────────────────
  if (status === "approved") {
    return (
      <div className="flex flex-col items-center gap-5 py-10 text-center">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Identity verified</h1>
          <p className="text-sm text-slate-500 mt-1.5">Signing you in securely…</p>
        </div>
        <Spinner className="w-5 h-5 text-blue-600" />
      </div>
    );
  }

  // ── Declined / Expired / Error ────────────────────────────────────────────────
  if (status === "declined" || status === "expired" || status === "error") {
    const messages = {
      declined: { title: "Sign-in not approved", body: "The sign-in request was declined on your other device." },
      expired: { title: "This code has expired", body: "For your security, Smart Login codes are only active for 5 minutes." },
      error: { title: "Something went wrong", body: "We couldn't create a Smart Login request. Please try again." },
    };
    const m = messages[status];
    return (
      <div className="flex flex-col items-center gap-5 py-10 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
          <XCircle className="w-8 h-8 text-red-500" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-slate-900">{m.title}</h1>
          <p className="text-sm text-slate-500 mt-1.5">{m.body}</p>
        </div>
        <div className="flex flex-col gap-2.5 w-full">
          <button onClick={handleRetry} className="btn-primary">Generate a new code</button>
          <button onClick={() => router.back()} className="btn-ghost">
            <ArrowLeft size={14} /> Use another sign-in method
          </button>
        </div>
      </div>
    );
  }

  // ── Loading ───────────────────────────────────────────────────────────────────
  if (status === "loading" || !qrUrl) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <Spinner className="w-7 h-7 text-blue-600" />
        <p className="text-sm text-slate-500">Preparing Smart Login…</p>
      </div>
    );
  }

  // ── QR display ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-7">
      <div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back
        </button>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Smart Login</h1>
        <p className="text-sm text-slate-500 mt-1.5">
          Scan this code using a device where you&apos;re already signed in to Yesp.
        </p>
      </div>

      <div className="flex flex-col items-center gap-5">
        {/* QR code */}
        <div className="relative p-4 bg-white border-2 border-slate-200 rounded-[12px]">
          <QRCodeSVG
            value={qrUrl}
            size={200}
            bgColor="#ffffff"
            fgColor="#0f172a"
            level="M"
          />
          {/* Overlay for scanned state */}
          {status === "scanned" && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-[10px]">
              <div className="text-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
                <p className="text-xs font-medium text-slate-700">Device detected</p>
              </div>
            </div>
          )}
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          {status === "pending" && (
            <>
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <p className="text-sm text-slate-500">Waiting for approval</p>
            </>
          )}
          {status === "scanned" && (
            <>
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <p className="text-sm text-slate-700 font-medium">Confirm the request on your other device</p>
            </>
          )}
        </div>
      </div>

      <div className="e-divider"><span>or</span></div>

      <button onClick={() => router.back()} className="btn-secondary">
        Use another sign-in method
      </button>
    </div>
  );
}
