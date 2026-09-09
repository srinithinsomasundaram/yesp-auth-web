"use client";

import { useState } from "react";
import { ArrowLeft, Mail, AlertCircle } from "lucide-react";
import { AuthCard, AuthLink } from "@/components/AuthCard";
import { Spinner } from "@/components/Spinner";
import { forgotPassword, ApiError } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const [rateLimited, setRateLimited] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setRateLimited(false);
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      if (err instanceof ApiError && err.status === 429) {
        setRateLimited(true);
      } else {
        // always show success on all other errors — no enumeration
        setSent(true);
      }
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="space-y-7">
        <div className="flex flex-col items-center text-center gap-4 pt-2">
          <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Check your email</h1>
            <p className="text-sm text-slate-500 mt-2">
              If an account exists for <span className="font-medium text-slate-700">{email}</span>, you&apos;ll receive a password reset link shortly.
            </p>
            <p className="text-xs text-slate-400 mt-1.5">The link expires in 1 hour. Check your spam folder if you don&apos;t see it.</p>
          </div>
        </div>
        <div className="space-y-3">
          <button
            className="btn-secondary"
            onClick={() => { setSent(false); setEmail(""); }}
          >
            Send another email
          </button>
          <div className="text-center">
            <AuthLink href="/auth/login">
              <span className="inline-flex items-center gap-1.5"><ArrowLeft size={13} />Back to sign in</span>
            </AuthLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthCard
      title="Reset your password"
      subtitle="Enter your email address and we'll send you a reset link."
      footer={
        <AuthLink href="/auth/login">
          <span className="inline-flex items-center gap-1.5"><ArrowLeft size={13} />Back to sign in</span>
        </AuthLink>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {rateLimited && (
          <div className="e-error">
            <AlertCircle size={15} className="shrink-0 mt-0.5" />
            <p>Too many attempts. Please wait a few minutes before trying again.</p>
          </div>
        )}
        <div>
          <label htmlFor="email" className="e-label">Email address</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            autoFocus
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="e-input"
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? <><Spinner /> Sending…</> : "Send reset link"}
        </button>
      </form>
    </AuthCard>
  );
}
