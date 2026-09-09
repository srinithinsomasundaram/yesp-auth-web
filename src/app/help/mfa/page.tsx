import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ChevronDown, ChevronRight, AlertTriangle, CheckCircle2, Smartphone, KeyRound, ArrowLeft, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Two-Factor Authentication (MFA)",
  description:
    "Set up two-factor authentication on Yesp Accounts. Learn how to use TOTP authenticator apps, recovery codes, and what to do if you're locked out of MFA.",
  keywords: [
    "yesp mfa", "yesp two factor authentication", "yesp 2fa", "yesp authenticator app",
    "yesp totp", "yesp mfa setup", "yesp recovery codes", "yesp mfa locked out",
    "yesp corporation 2fa", "yesp accounts security", "yesp one mfa", "yesp studio 2fa",
    "srinithin somasundaram yesp", "enable mfa yesp", "yesp google authenticator",
    "yesp authy", "disable yesp mfa", "yesp mfa help",
  ],
  openGraph: {
    title: "Two-Factor Authentication | Yesp Accounts Help",
    description: "Set up MFA on Yesp Accounts with TOTP authenticator apps. Manage recovery codes and troubleshoot 2FA issues.",
    url: "https://accounts.yesp.space/help/mfa",
    type: "article",
  },
  twitter: { title: "Two-Factor Auth (MFA) | Yesp Accounts Help", description: "How to set up and manage two-factor authentication on Yesp Accounts." },
  alternates: { canonical: "https://accounts.yesp.space/help/mfa" },
  other: {
    "geo.region": "IN", "geo.placename": "India", "geo.position": "20.5937;78.9629", ICBM: "20.5937, 78.9629",
    "DC.title": "Yesp Accounts MFA Help", "DC.creator": "Srinithin Somasundaram",
    "DC.publisher": "Yesp Corporation", "DC.language": "en", "DC.coverage": "Worldwide",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      name: "How to set up two-factor authentication on Yesp Accounts",
      description: "Enable TOTP-based MFA to secure your Yesp account with an authenticator app.",
      step: [
        { "@type": "HowToStep", position: 1, name: "Sign in and go to Security", text: "Sign in to your account, then navigate to Console → Security." },
        { "@type": "HowToStep", position: 2, name: "Click Enable two-factor auth", text: "Click the 'Enable two-factor auth' button in the Security section." },
        { "@type": "HowToStep", position: 3, name: "Install an authenticator app", text: "Download Google Authenticator, Authy,  Authenticator on your phone." },
        { "@type": "HowToStep", position: 4, name: "Scan the QR code", text: "Open your authenticator app, tap the + button, and scan the QR code shown on screen." },
        { "@type": "HowToStep", position: 5, name: "Enter the 6-digit code", text: "Your app will show a 6-digit code that refreshes every 30 seconds. Enter the current code to verify." },
        { "@type": "HowToStep", position: 6, name: "Save recovery codes", text: "Download or copy your recovery codes. Store them securely offline — they're your only backup if you lose your authenticator." },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What apps work for Yesp MFA?", acceptedAnswer: { "@type": "Answer", text: "Any TOTP-compatible authenticator app works: Google Authenticator, Authy Authenticator, 1Password, Bitwarden, or Apple's built-in Passwords app on iOS 17+." } },
        { "@type": "Question", name: "I lost my authenticator app. How do I get back in?", acceptedAnswer: { "@type": "Answer", text: "Use one of your saved recovery codes on the MFA screen. Each code works once. If you don't have recovery codes, contact support@yesp.space for manual identity verification." } },
        { "@type": "Question", name: "My TOTP code says it's invalid even though it looks right.", acceptedAnswer: { "@type": "Answer", text: "TOTP codes are time-sensitive. Ensure your phone's clock is set to automatic/sync. A clock even 2 minutes off can cause invalid codes. Try the next code that appears after 30 seconds." } },
      ],
    },
  ],
};

const FAQS = [
  { q: "What authenticator apps work with Yesp?", a: "Any TOTP-compatible app works. Recommended options: Google Authenticator (iOS/Android), Authy (cross-device sync) Authenticator, 1Password, Bitwarden, or Apple's built-in Passwords app (iOS 17+). All are free." },
  { q: "My 6-digit code says it's invalid.", a: "TOTP codes are time-based and expire every 30 seconds. The most common cause is your phone's clock being out of sync. Go to your phone's Settings → Date & Time and enable 'Set automatically'. Then try the next code after the timer resets." },
  { q: "I lost access to my authenticator app. What now?", a: "Use one of your one-time recovery codes on the MFA screen — click 'Use a recovery code' instead of entering the 6-digit code. If you've run out of recovery codes or never saved them, email support@yesp.space and we'll verify your identity manually. This process takes 24–72 hours." },
  { q: "How do I move my MFA to a new phone?", a: "Before switching phones, go to Console → Security → your current MFA method → 'View setup key'. Enter the same secret key in your authenticator app on the new phone. Alternatively, if Authy or 1Password sync is enabled, they restore automatically." },
  { q: "Can I use multiple authenticator apps?", a: "Currently Yesp supports one active TOTP method at a time. If you need multi-device coverage, use an authenticator with cloud sync like Authy or 1Password Authenticator." },
  { q: "How do I disable MFA?", a: "Sign in → Console → Security → your MFA method → 'Disable'. You'll need to enter a valid TOTP code to confirm. Disabling MFA reduces your account security — only do this if you're replacing it with a passkey or another strong method." },
  { q: "How many recovery codes do I get, and can I regenerate them?", a: "You receive 10 one-time recovery codes when you enable MFA. You can regenerate a fresh set from Console → Security → your MFA method — this invalidates all previous codes. Store the new ones somewhere safe offline." },
  { q: "Does MFA apply to Google/ sign-in too?", a: "When you sign in with Google OAuth, their own 2FA protects that account. Yesp MFA adds a second layer on top of that if you've enabled it — so you'd pass Google/ auth first, then Yesp TOTP." },
];

export default function MfaHelpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/help" className="hover:text-slate-700 transition-colors flex items-center gap-1"><ArrowLeft size={12} /> Help</Link>
          <ChevronRight size={12} />
          <span className="text-slate-600 font-medium">Two-Factor Authentication</span>
        </nav>

        {/* Hero */}
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 bg-violet-50 rounded-[12px] flex items-center justify-center shrink-0">
            <Shield size={22} className="text-violet-600" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Two-Factor Authentication</h1>
            <p className="text-slate-500 mt-2 leading-relaxed">MFA adds a second verification step to every sign-in — even if your password is stolen, your account stays protected.</p>
          </div>
        </div>

        {/* Why MFA */}
        <div className="flex items-start gap-3 p-4 bg-violet-50 border border-violet-100 rounded-[12px]">
          <Info size={15} className="text-violet-600 shrink-0 mt-0.5" />
          <p className="text-sm text-violet-800 leading-relaxed">
            Two-factor authentication blocks over <strong>99.9%</strong> of automated account-takeover attacks. We strongly recommend enabling it on your Yesp account.
          </p>
        </div>

        {/* Setup guide */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-1">How to enable MFA</h2>
          <p className="text-sm text-slate-500 mb-5">Takes about 2 minutes. You'll need your phone with an authenticator app installed.</p>

          {/* Step 0: install app */}
          <div className="mb-5 p-4 border border-slate-100 rounded-[12px]">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Step 0 — Install an authenticator app</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["Google Authenticator", "Authy", " Authenticator", "1Password / Bitwarden"].map((app) => (
                <div key={app} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-[8px]">
                  <Smartphone size={13} className="text-slate-500 shrink-0" />
                  <span className="text-xs text-slate-700 font-medium leading-snug">{app}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-slate-100 rounded-[12px] overflow-hidden">
            {[
              { n: 1, title: "Sign in and open Security settings", body: "Navigate to Console → Security from the left sidebar." },
              { n: 2, title: "Click 'Enable two-factor auth'", body: "You'll see a setup screen with a QR code and a manual entry key." },
              { n: 3, title: "Scan the QR code", body: "Open your authenticator app → tap '+' or 'Add account' → choose 'Scan QR code'. Point your camera at the code shown on screen." },
              { n: 4, title: "Enter the 6-digit verification code", body: "Your app shows a 6-digit code that refreshes every 30 seconds. Enter the current code in the field on screen and click Verify." },
              { n: 5, title: "Save your recovery codes", body: "You'll receive 10 one-time recovery codes. Download or copy them and store them somewhere safe — a password manager, printed sheet, or offline document. These are your lifeline if you lose your phone." },
              { n: 6, title: "Done — MFA is active", body: "Every sign-in from now on will require your email/password plus a 6-digit code from your authenticator app." },
            ].map((step) => (
              <div key={step.n} className="flex items-start gap-4 px-5 py-4 border-b border-slate-100 last:border-0">
                <div className="w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">{step.n}</div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                  <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Using recovery codes */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-1">Using recovery codes</h2>
          <p className="text-sm text-slate-500 mb-5">If you can't access your authenticator app, recovery codes let you bypass MFA.</p>
          <div className="border border-slate-100 rounded-[12px] overflow-hidden">
            {[
              { n: 1, title: "Start signing in normally", body: "Enter your email and password. On the MFA screen, look for 'Use a recovery code' below the code input." },
              { n: 2, title: "Enter a recovery code", body: "Type or paste one of your 10-character recovery codes exactly as saved. Each code can only be used once." },
              { n: 3, title: "You're in — regenerate codes", body: "Once inside, immediately go to Console → Security → your MFA method and regenerate a new set of recovery codes. The used code is now invalid." },
            ].map((step) => (
              <div key={step.n} className="flex items-start gap-4 px-5 py-4 border-b border-slate-100 last:border-0">
                <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">{step.n}</div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                  <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common problems */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-5">Common problems</h2>
          <div className="space-y-3">
            {[
              { problem: "Code is always invalid", fix: "Your phone's clock is out of sync. Enable automatic time in Settings → Date & Time. TOTP codes drift when clocks diverge by even 30 seconds.", icon: AlertTriangle, color: "text-amber-600 bg-amber-50" },
              { problem: "Lost my phone / authenticator app deleted", fix: "Use a recovery code. If you don't have them, email support@yesp.space — manual verification takes 24–72 hours.", icon: AlertTriangle, color: "text-red-600 bg-red-50" },
              { problem: "QR code won't scan", fix: "Try the 'Enter key manually' option on your authenticator app and type in the secret key shown below the QR code.", icon: AlertTriangle, color: "text-amber-600 bg-amber-50" },
              { problem: "I used all my recovery codes", fix: "If you're signed in, regenerate codes from Console → Security. If you're locked out, contact support for identity verification.", icon: AlertTriangle, color: "text-red-600 bg-red-50" },
              { problem: "MFA wasn't asked during sign-in", fix: "MFA prompts after email + password. If you signed in via Google OAuth, the MFA step is skipped only if Yesp MFA isn't enabled — check Console → Security.", icon: KeyRound, color: "text-slate-600 bg-slate-100" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.problem} className="flex items-start gap-3.5 p-4 border border-slate-100 rounded-[10px]">
                  <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 ${item.color.split(" ")[1]}`}>
                    <Icon size={14} className={item.color.split(" ")[0]} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.problem}</p>
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
            {FAQS.map((f) => (
              <details key={f.q} className="group border-b border-slate-100 last:border-0">
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none hover:bg-slate-50/60 transition-colors">
                  <span className="text-sm font-medium text-slate-900">{f.q}</span>
                  <ChevronDown size={15} className="text-slate-400 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5"><p className="text-sm text-slate-600 leading-relaxed">{f.a}</p></div>
              </details>
            ))}
          </div>
        </section>

        {/* Related */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-4">Related topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/help/passkeys", label: "Passkeys", desc: "Stronger than MFA — sign in with biometrics" },
              { href: "/help/signin", label: "Sign-in & Passwords", desc: "Fix login issues" },
              { href: "/help/sessions", label: "Sessions", desc: "Revoke suspicious access" },
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

        {/* CTA */}
        <div className="flex items-center gap-4 p-5 bg-slate-50 border border-slate-100 rounded-[12px]">
          <CheckCircle2 size={18} className="text-slate-400 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900">Locked out and no recovery codes?</p>
            <p className="text-xs text-slate-500 mt-0.5">Email us with your registered email and a description of the issue.</p>
          </div>
          <a href="mailto:support@yesp.space" className="shrink-0 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-[6px] hover:bg-blue-700 transition-colors">Contact support</a>
        </div>
      </div>
    </>
  );
}
