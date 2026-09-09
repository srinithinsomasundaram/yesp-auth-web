"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { AuthLink } from "@/components/AuthCard";
import { Spinner } from "@/components/Spinner";
import { verifyEmail, ApiError } from "@/lib/api";

function VerifyContent() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const [status, setStatus] = useState<"loading" | "success" | "error" | "no-token">(
    token ? "loading" : "no-token"
  );

  useEffect(() => {
    if (!token) return;
    verifyEmail(token)
      .then(() => setStatus("success"))
      .catch((err) => {
        if (err instanceof ApiError && err.status === 400) setStatus("error");
        else setStatus("error");
      });
  }, [token]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <Spinner className="h-8 w-8 text-blue-600" />
        <p className="text-sm text-slate-500">Verifying your email address…</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="space-y-7">
        <div className="flex flex-col items-center text-center gap-4 pt-2">
          <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Email verified</h1>
            <p className="text-sm text-slate-500 mt-2">Your email has been verified. You can now sign in to your Yesp account.</p>
          </div>
        </div>
        <button className="btn-primary" onClick={() => router.push("/auth/login")}>
          Continue to sign in
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="space-y-7">
        <div className="flex flex-col items-center text-center gap-4 pt-2">
          <div className="w-14 h-14 bg-red-50 border border-red-100 rounded-full flex items-center justify-center">
            <XCircle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Link expired</h1>
            <p className="text-sm text-slate-500 mt-2">This verification link has already been used or has expired. Sign in to request a new one.</p>
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
    <div className="space-y-7">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Verify your email</h1>
        <p className="text-sm text-slate-500 mt-1.5">We sent a verification link when you created your account.</p>
      </div>
      <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-[8px] text-sm text-slate-600">
        <RefreshCw size={15} className="shrink-0 mt-0.5 text-slate-400" />
        Check your inbox for a verification email. If it&apos;s been a while, sign in to request a new one.
      </div>
      <div className="space-y-3">
        <button className="btn-primary" onClick={() => router.push("/auth/login")}>
          Go to sign in
        </button>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return <Suspense><VerifyContent /></Suspense>;
}
