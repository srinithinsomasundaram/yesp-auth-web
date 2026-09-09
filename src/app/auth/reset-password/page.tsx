"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { AuthCard, AuthLink } from "@/components/AuthCard";
import { PasswordInput } from "@/components/PasswordInput";
import { Spinner } from "@/components/Spinner";
import { resetPassword, ApiError } from "@/lib/api";

function ResetForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  if (!token) {
    return (
      <div className="space-y-5 text-center pt-2">
        <p className="text-sm text-slate-500">This password reset link is invalid or has expired.</p>
        <AuthLink href="/auth/forgot-password">Request a new link</AuthLink>
      </div>
    );
  }

  if (done) {
    return (
      <div className="space-y-7">
        <div className="flex flex-col items-center text-center gap-4 pt-2">
          <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Password updated</h1>
            <p className="text-sm text-slate-500 mt-2">
              Your password has been changed. All existing sessions have been signed out for your security.
            </p>
          </div>
        </div>
        <button className="btn-primary" onClick={() => router.push("/auth/login")}>
          Sign in with new password
        </button>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (password.length < 12) { setError("Password must be at least 12 characters."); return; }

    setLoading(true);
    try {
      await resetPassword(token, password);
      setDone(true);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 400) setError("This reset link has already been used or has expired.");
        else if (err.status === 422) setError("Password is too weak. Use at least 12 characters.");
        else setError("Something went wrong. Please try again.");
      } else {
        setError("Network error. Check your connection.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Choose a new password"
      subtitle="Your new password must be at least 12 characters."
      footer={<AuthLink href="/auth/login">Back to sign in</AuthLink>}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="e-error">
            <AlertCircle size={15} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label htmlFor="password" className="e-label">New password</label>
          <PasswordInput id="password" autoComplete="new-password" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} placeholder="Minimum 12 characters" showStrength />
        </div>

        <div>
          <label htmlFor="confirm" className="e-label">Confirm new password</label>
          <PasswordInput id="confirm" autoComplete="new-password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} disabled={loading} placeholder="Repeat password" />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? <><Spinner /> Updating…</> : "Update password"}
        </button>
      </form>
    </AuthCard>
  );
}

export default function ResetPasswordPage() {
  return <Suspense><ResetForm /></Suspense>;
}
