"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, Mail } from "lucide-react";
import { PasswordInput } from "@/components/PasswordInput";
import { Spinner } from "@/components/Spinner";
import { register, ApiError } from "@/lib/api";

type Step = "form" | "verify";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    if (form.password.length < 12) { setError("Password must be at least 12 characters."); return; }

    setLoading(true);
    try {
      await register({ email: form.email, password: form.password, firstName: form.firstName || undefined, lastName: form.lastName || undefined });
      setStep("verify");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 409) setError("An account with this email already exists. Try signing in instead.");
        else if (err.status === 422) setError("Password is too weak. Use at least 12 characters with a mix of letters, numbers, and symbols.");
        else if (err.status === 429) setError("Too many sign-up attempts. Please wait a few minutes and try again.");
        else setError("Something went wrong. Please try again.");
      } else {
        setError("Network error. Check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (step === "verify") {
    return (
      <div className="space-y-7">
        <div className="flex flex-col items-center text-center gap-4 pt-2">
          <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Check your email</h1>
            <p className="text-sm text-slate-500 mt-2">
              We sent a verification link to <span className="font-medium text-slate-700">{form.email}</span>
            </p>
            <p className="text-xs text-slate-400 mt-1.5">Click the link in the email to activate your account. Check your spam folder if needed.</p>
          </div>
        </div>
        <div className="space-y-3">
          <button className="btn-primary" onClick={() => router.push("/auth/login")}>
            Back to sign in
          </button>
          <button
            className="w-full text-sm text-slate-500 hover:text-slate-800 transition-colors py-1.5"
            onClick={() => { setStep("form"); setError(""); }}
          >
            Use a different email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Create your account</h1>
        <p className="text-sm text-slate-500 mt-1.5">Sign up for Yesp Accounts</p>
      </div>

      {/* Social sign-up */}
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

      <div className="e-divider"><span>or sign up with email</span></div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="e-error">
            <AlertCircle size={15} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="firstName" className="e-label">First name</label>
            <input id="firstName" type="text" autoComplete="given-name" autoFocus value={form.firstName} onChange={update("firstName")} placeholder="Alex" className="e-input" disabled={loading} />
          </div>
          <div>
            <label htmlFor="lastName" className="e-label">Last name</label>
            <input id="lastName" type="text" autoComplete="family-name" value={form.lastName} onChange={update("lastName")} placeholder="Smith" className="e-input" disabled={loading} />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="e-label">Email address</label>
          <input id="email" type="email" autoComplete="email" required value={form.email} onChange={update("email")} placeholder="name@company.com" className="e-input" disabled={loading} />
        </div>

        <div>
          <label htmlFor="password" className="e-label">Password</label>
          <PasswordInput id="password" autoComplete="new-password" required value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} disabled={loading} placeholder="Minimum 12 characters" showStrength />
        </div>

        <div>
          <label htmlFor="confirm" className="e-label">Confirm password</label>
          <PasswordInput id="confirm" autoComplete="new-password" required value={form.confirm} onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))} disabled={loading} placeholder="Repeat password" />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? <><Spinner /> Creating account…</> : "Create account"}
        </button>

        <p className="text-xs text-slate-400 text-center pt-1">
          By creating an account you agree to Yesp&apos;s{" "}
          <a href="https://yesp.space/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600 transition-colors">
            Terms of Service
          </a>.
        </p>
      </form>

      <p className="text-sm text-slate-500 text-center">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-blue-600 font-medium hover:text-blue-700 hover:underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </div>
  );
}
