import type { Metadata } from "next";
import Link from "next/link";
import { KeyRound, ChevronDown, ChevronRight, AlertTriangle, CheckCircle2, Mail, Chrome, Building2, Fingerprint, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign-in & Passwords",
  description:
    "Learn how to sign in to Yesp Accounts with email, Google, or passkeys. Troubleshoot login issues, reset your password, and recover locked accounts.",
  keywords: [
    "yesp sign in help", "yesp login issues", "yesp password reset", "yesp forgot password",
    "yesp account not found", "yesp wrong password", "yesp login error", "yesp sign in with google",
    "yesp accounts login", "yesp corporation sign in",
    "srinithin somasundaram yesp", "accounts.yesp.space login", "yesp one login",
    "reset yesp password", "yesp email login", "yesp locked account",
  ],
  openGraph: {
    title: "Sign-in & Passwords | Yesp Accounts Help",
    description: "How to sign in, reset your password, and fix login issues on Yesp Accounts.",
    url: "https://accounts.yesp.space/help/signin",
    type: "article",
  },
  twitter: { title: "Sign-in & Passwords | Yesp Accounts Help", description: "Troubleshoot login issues and reset your Yesp password." },
  alternates: { canonical: "https://accounts.yesp.space/help/signin" },
  other: {
    "geo.region": "IN", "geo.placename": "India", "geo.position": "20.5937;78.9629", ICBM: "20.5937, 78.9629",
    "DC.title": "Yesp Accounts Sign-in Help", "DC.creator": "Srinithin Somasundaram",
    "DC.publisher": "Yesp Corporation", "DC.language": "en", "DC.coverage": "Worldwide",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      name: "How to reset your Yesp Accounts password",
      description: "Step-by-step guide to resetting your Yesp password via email link.",
      step: [
        { "@type": "HowToStep", position: 1, name: "Go to sign-in", text: "Visit accounts.yesp.space and click 'Forgot password' below the password field." },
        { "@type": "HowToStep", position: 2, name: "Enter your email", text: "Type the email address associated with your Yesp account and click Continue." },
        { "@type": "HowToStep", position: 3, name: "Check your inbox", text: "Open the password reset email from noreply@yesp.space. Check spam if you don't see it." },
        { "@type": "HowToStep", position: 4, name: "Set a new password", text: "Click the link in the email, enter a new strong password, and confirm it." },
        { "@type": "HowToStep", position: 5, name: "Sign in", text: "Use your new password to sign in. All other sessions will be revoked for security." },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Why does Yesp say my account doesn't exist?", acceptedAnswer: { "@type": "Answer", text: "Check for typos in your email. If you signed up with Google, use those buttons — the email may not have a password set. If you're new, create a free account." } },
        { "@type": "Question", name: "How long is a Yesp password reset link valid?", acceptedAnswer: { "@type": "Answer", text: "Reset links expire after 1 hour. If yours has expired, go back to the sign-in page and request a new one." } },
        { "@type": "Question", name: "I'm entering the correct password but it's not working.", acceptedAnswer: { "@type": "Answer", text: "Ensure Caps Lock is off. Try copying and pasting your password to rule out character issues. If it still fails, use 'Forgot password' to reset it." } },
      ],
    },
  ],
};

const FAQS = [
  { q: "Why does it say my account doesn't exist?", a: "Check for typos in your email address. If you originally signed up using Google, use those sign-in buttons instead — your email may not have a standalone password. If you've never created a Yesp account, click 'Create account' to register for free." },
  { q: "The reset link expired before I could use it.", a: "Password reset links are valid for 1 hour. If yours expired, go back to accounts.yesp.space, click 'Forgot password', and request a fresh link. The new link invalidates any previous ones." },
  { q: "I'm entering the right password but it says 'wrong password'.", a: "Make sure Caps Lock is off. Try typing your password slowly or paste it in. Passwords are case-sensitive. If you're still stuck, use 'Forgot password' to set a new one — it's the fastest resolution." },
  { q: "I'm not receiving the reset email.", a: "Check your spam, junk, and promotions folders. The email comes from noreply@yesp.space. Some corporate email servers block transactional emails — try a personal Gmail or Outlook account, or contact your IT team to whitelist the domain." },
  { q: "Can I sign in with a phone number instead of email?", a: "Currently Yesp Accounts uses email-based authentication. You can sign in with your email + password, Google, or a passkey registered to your device." },
  { q: "Why was I suddenly signed out?", a: "Yesp access tokens expire after 15 minutes and are automatically refreshed. If you were fully signed out, your refresh token may have expired (30 days), you signed out on another device, or your session was revoked. Simply sign in again." },
  { q: "I signed up with Google but now want to add a password.", a: "After signing in with Google, go to Console → Security → and use the 'Set password' option (if available). If you don't see it, contact support@yesp.space." },
];

const SIGNIN_METHODS = [
  { icon: Mail, label: "Email & password", color: "bg-slate-100 text-slate-600", steps: ["Enter your email address", "Enter your password", "Complete MFA if enabled", "You're in"] },
  { icon: Chrome, label: "Google", color: "bg-blue-50 text-blue-600", steps: ["Click 'Continue with Google'", "Choose your Google account", "Grant permission on first use", "Redirected back automatically"] },
  { icon: Fingerprint, label: "Passkey", color: "bg-emerald-50 text-emerald-600", steps: ["Click 'Sign in with passkey'", "Authenticate with Face ID / fingerprint / Windows Hello", "No password needed", "Instant and phishing-resistant"] },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border-b border-slate-100 last:border-0">
      <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none hover:bg-slate-50/60 transition-colors">
        <span className="text-sm font-medium text-slate-900">{q}</span>
        <ChevronDown size={15} className="text-slate-400 shrink-0 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="px-5 pb-5">
        <p className="text-sm text-slate-600 leading-relaxed">{a}</p>
      </div>
    </details>
  );
}

export default function SigninHelpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/help" className="hover:text-slate-700 transition-colors flex items-center gap-1"><ArrowLeft size={12} /> Help</Link>
          <ChevronRight size={12} />
          <span className="text-slate-600 font-medium">Sign-in & Passwords</span>
        </nav>

        {/* Hero */}
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 bg-blue-50 rounded-[12px] flex items-center justify-center shrink-0">
            <KeyRound size={22} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Sign-in & Passwords</h1>
            <p className="text-slate-500 mt-2 leading-relaxed">Everything you need to know about signing in to Yesp Accounts — methods, password resets, and fixing login issues.</p>
          </div>
        </div>

        {/* Sign-in methods */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-1">Sign-in methods</h2>
          <p className="text-sm text-slate-500 mb-5">Yesp Accounts supports four ways to sign in. Choose the one that fits your setup.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SIGNIN_METHODS.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="border border-slate-100 rounded-[12px] p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center ${m.color}`}>
                      <Icon size={15} />
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{m.label}</p>
                  </div>
                  <ol className="space-y-2">
                    {m.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <span className="w-4 h-4 bg-slate-100 rounded-full flex items-center justify-center shrink-0 text-slate-500 font-medium mt-0.5" style={{ fontSize: 10 }}>{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
        </section>

        {/* Password reset guide */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-1">How to reset your password</h2>
          <p className="text-sm text-slate-500 mb-5">Follow these steps to regain access to your account.</p>
          <div className="border border-slate-100 rounded-[12px] overflow-hidden">
            {[
              { n: 1, title: "Go to the sign-in page", body: "Visit accounts.yesp.space/auth/login and enter your email address, then click Continue." },
              { n: 2, title: "Click 'Forgot password'", body: "On the password step, click the 'Forgot password' link below the password field." },
              { n: 3, title: "Enter your email", body: "Confirm your email address and submit. A reset email will be sent from noreply@yesp.space within seconds." },
              { n: 4, title: "Open the email & click the link", body: "The email contains a secure one-time link valid for 1 hour. Check spam/junk if you don't see it. Click the link to open the reset form." },
              { n: 5, title: "Set a new password", body: "Choose a strong password — at least 8 characters with a mix of letters, numbers, and symbols. Confirm it and submit." },
              { n: 6, title: "Sign in with your new password", body: "You'll be redirected to the sign-in page. All other active sessions are automatically revoked for security." },
            ].map((step) => (
              <div key={step.n} className="flex items-start gap-4 px-5 py-4 border-b border-slate-100 last:border-0">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">{step.n}</div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                  <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common errors */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-5">Common errors & fixes</h2>
          <div className="space-y-3">
            {[
              { err: "No account found with this email", fix: "The email isn't registered. Check for typos, try your Google/ email, or create a new account.", icon: AlertTriangle, color: "text-amber-600 bg-amber-50" },
              { err: "Wrong password", fix: "Check Caps Lock. Try pasting your password. If it still fails, reset it — takes under 2 minutes.", icon: AlertTriangle, color: "text-red-600 bg-red-50" },
              { err: "Reset link expired or invalid", fix: "Links expire after 1 hour and can only be used once. Request a fresh link from the sign-in page.", icon: AlertTriangle, color: "text-amber-600 bg-amber-50" },
              { err: "Reset email not received", fix: "Check spam/junk. Add noreply@yesp.space to your contacts. Corporate email may block it — try a personal address.", icon: AlertTriangle, color: "text-amber-600 bg-amber-50" },
              { err: "Too many attempts — rate limited", fix: "For security, sign-in attempts are limited. Wait 15 minutes before trying again, or use 'Forgot password' to bypass the wait.", icon: AlertTriangle, color: "text-red-600 bg-red-50" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.err} className="flex items-start gap-3.5 p-4 border border-slate-100 rounded-[10px]">
                  <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 ${item.color.split(" ")[1]}`}>
                    <Icon size={14} className={item.color.split(" ")[0]} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.err}</p>
                    <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{item.fix}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-5">Frequently asked questions</h2>
          <div className="border border-slate-100 rounded-[12px] overflow-hidden">
            {FAQS.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </section>

        {/* Related topics */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-4">Related topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/help/passkeys", label: "Passkeys", desc: "Sign in without a password" },
              { href: "/help/mfa", label: "Two-Factor Auth", desc: "Add an extra layer of security" },
              { href: "/help/sessions", label: "Sessions", desc: "Manage where you're signed in" },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="flex items-center justify-between p-4 border border-slate-100 rounded-[10px] hover:border-slate-300 hover:bg-slate-50 transition-all group">
                <div>
                  <p className="text-sm font-medium text-slate-900">{t.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{t.desc}</p>
                </div>
                <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
              </Link>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <div className="flex items-center gap-4 p-5 bg-slate-50 border border-slate-100 rounded-[12px]">
          <CheckCircle2 size={18} className="text-slate-400 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900">Still need help?</p>
            <p className="text-xs text-slate-500 mt-0.5">Our support team responds within 24–48 hours on business days.</p>
          </div>
          <a href="mailto:support@yesp.space" className="shrink-0 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-[6px] hover:bg-blue-700 transition-colors">Email support</a>
        </div>
      </div>
    </>
  );
}
