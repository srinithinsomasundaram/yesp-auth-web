import type { Metadata } from "next";
import Link from "next/link";
import { Activity, ChevronDown, ChevronRight, CheckCircle2, AlertTriangle, ArrowLeft, Monitor, Smartphone, Globe, Shield, LogOut, RefreshCw, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Sessions & Devices",
  description:
    "View and manage your active sessions on Yesp Accounts. Learn how to revoke sessions, sign out of all devices, and identify suspicious access.",
  keywords: [
    "yesp sessions", "yesp active sessions", "yesp devices", "yesp revoke session",
    "yesp sign out all devices", "yesp session management", "yesp suspicious login",
    "yesp accounts security", "yesp corporation sessions", "yesp one sessions",
    "srinithin somasundaram yesp", "yesp account access", "yesp session expired",
    "yesp refresh token", "yesp logout all", "yesp session help",
  ],
  openGraph: {
    title: "Sessions & Devices | Yesp Accounts Help",
    description: "How to view, revoke, and manage active sessions across all your devices on Yesp Accounts.",
    url: "https://accounts.yesp.space/help/sessions",
    type: "article",
  },
  twitter: { title: "Sessions & Devices | Yesp Accounts Help", description: "Manage active sessions and revoke access on Yesp Accounts." },
  alternates: { canonical: "https://accounts.yesp.space/help/sessions" },
  other: {
    "geo.region": "IN", "geo.placename": "India", "geo.position": "20.5937;78.9629", ICBM: "20.5937, 78.9629",
    "DC.title": "Yesp Accounts Sessions Help", "DC.creator": "Srinithin Somasundaram",
    "DC.publisher": "Yesp Corporation", "DC.language": "en", "DC.coverage": "Worldwide",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is a Yesp session?", acceptedAnswer: { "@type": "Answer", text: "A session is created each time you sign in. It consists of an access token (15 min) and a refresh token (30 days). As long as your refresh token is valid, you stay signed in automatically without re-entering your password." } },
    { "@type": "Question", name: "How do I sign out of all devices?", acceptedAnswer: { "@type": "Answer", text: "Go to Console → Sessions and click 'Sign out of all sessions'. This revokes every active session including your current one. All devices will require a fresh sign-in." } },
    { "@type": "Question", name: "I see a session from a location I don't recognize. What should I do?", acceptedAnswer: { "@type": "Answer", text: "Immediately go to Console → Sessions and click 'Sign out of all sessions'. Then change your password and enable MFA if you haven't already. Contact support@yesp.space if you suspect your account was compromised." } },
  ],
};

const FAQS = [
  { q: "What is a session and how long does it last?", a: "A session is created each time you sign in. It uses two tokens: an access token (valid for 15 minutes, auto-renewed silently) and a refresh token (valid for 30 days). You stay signed in automatically as long as your refresh token is valid. Closing the browser tab doesn't end a session — only signing out or revoking it does." },
  { q: "Why was I unexpectedly signed out?", a: "Your refresh token (30-day expiry) expired naturally, you signed out on another device that revoked all sessions, an admin revoked your session, or your account password was changed (which invalidates all sessions). Simply sign in again." },
  { q: "Can someone else see that I'm signed in from multiple places?", a: "Only you can see your sessions — they're private to your account. Organization admins don't have visibility into individual member sessions." },
  { q: "What does 'Device' show in the sessions list?", a: "Sessions show the browser, OS, approximate location (city/country based on IP), and last activity time. The device name is derived from your browser's user-agent string. It's indicative, not exact." },
  { q: "What happens after I revoke a session?", a: "That session is immediately invalidated. The device using it will get a 401 error on the next API call and be redirected to the sign-in page. Revoking doesn't delete any data — the person can sign in again." },
  { q: "Is it safe to stay signed in on a shared computer?", a: "No — shared or public computers are risky. Always click 'Sign out' when done. After signing out, the session is fully revoked. If you forgot, you can revoke it remotely from Console → Sessions on another device." },
  { q: "How many sessions can I have active?", a: "There's no hard limit. You can have one session per device/browser you sign in with. Sessions are listed individually in Console → Sessions." },
  { q: "Revoking a session doesn't seem to be working.", a: "Try refreshing the Sessions page after revoking. If a device appears to still be active, it may be using a cached access token that expires within 15 minutes. After that window, it can't be renewed without a valid session." },
];

export default function SessionsHelpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/help" className="hover:text-slate-700 transition-colors flex items-center gap-1"><ArrowLeft size={12} /> Help</Link>
          <ChevronRight size={12} />
          <span className="text-slate-600 font-medium">Sessions & Devices</span>
        </nav>

        {/* Hero */}
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 bg-rose-50 rounded-[12px] flex items-center justify-center shrink-0">
            <Activity size={22} className="text-rose-600" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Sessions & Devices</h1>
            <p className="text-slate-500 mt-2 leading-relaxed">Monitor every place your account is active. Revoke sessions you don't recognize and protect your account from unauthorized access.</p>
          </div>
        </div>

        {/* How sessions work */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-1">How sessions work</h2>
          <p className="text-sm text-slate-500 mb-5">Understanding the session lifecycle helps you manage security confidently.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Globe, label: "Sign-in creates a session", body: "Every time you sign in (any method), a new session is created with a unique access + refresh token pair.", color: "bg-blue-50 text-blue-600" },
              { icon: RefreshCw, label: "Access tokens auto-renew", body: "Your 15-minute access token is silently refreshed in the background. You stay signed in without re-entering your password for up to 30 days.", color: "bg-emerald-50 text-emerald-600" },
              { icon: Shield, label: "Revoking kills access", body: "Revoking a session invalidates its refresh token immediately. The device gets signed out within 15 minutes (when its current access token expires).", color: "bg-rose-50 text-rose-600" },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.label} className="border border-slate-100 rounded-[12px] p-5">
                  <div className={`w-9 h-9 rounded-[8px] flex items-center justify-center mb-3 ${card.color}`}>
                    <Icon size={17} />
                  </div>
                  <p className="text-sm font-semibold text-slate-900 mb-1">{card.label}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{card.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Viewing sessions */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-1">How to view your sessions</h2>
          <p className="text-sm text-slate-500 mb-5">See every device and browser where your account is currently active.</p>
          <div className="border border-slate-100 rounded-[12px] overflow-hidden">
            {[
              { n: 1, title: "Sign in and open the console", body: "Go to Console → Sessions from the left sidebar." },
              { n: 2, title: "Review the sessions list", body: "Each entry shows: device type (desktop/mobile), browser, OS, approximate location (city/country from IP address), and last active time." },
              { n: 3, title: "Identify your current session", body: "Your current session is marked with a 'This device' badge. All other sessions are other devices or browsers." },
              { n: 4, title: "Check for anything suspicious", body: "If you see a session from an unfamiliar location, device, or browser — especially one you didn't create — act immediately (see below)." },
            ].map((step) => (
              <div key={step.n} className="flex items-start gap-4 px-5 py-4 border-b border-slate-100 last:border-0">
                <div className="w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">{step.n}</div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                  <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Revoking */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-5">Revoking sessions</h2>
          <div className="space-y-3">
            {[
              { icon: LogOut, label: "Revoke one session", how: "Console → Sessions → click 'Revoke' next to the session you want to end. It's removed from the list immediately and that device will be signed out within 15 minutes.", color: "text-slate-700 bg-slate-100" },
              { icon: LogOut, label: "Sign out of all sessions", how: "Console → Sessions → 'Sign out of all sessions'. Every session including your current one is revoked. You'll be redirected to the sign-in page immediately.", color: "text-red-600 bg-red-50" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-3.5 p-4 border border-slate-100 rounded-[10px]">
                  <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 ${item.color.split(" ")[1]}`}>
                    <Icon size={14} className={item.color.split(" ")[0]} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                    <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{item.how}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Suspicious session */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-1">Suspicious session detected — what to do</h2>
          <p className="text-sm text-slate-500 mb-5">If you see a session you don't recognize, act quickly.</p>
          <div className="border border-red-100 bg-red-50 rounded-[12px] overflow-hidden">
            {[
              { n: 1, title: "Revoke all sessions immediately", body: "Console → Sessions → 'Sign out of all sessions'. This kicks out every active session including the suspicious one." },
              { n: 2, title: "Change your password", body: "Go to Console → Security → Change password. Use a strong, unique password not used anywhere else." },
              { n: 3, title: "Enable MFA if not already on", body: "Console → Security → 'Enable two-factor auth'. This prevents future unauthorized sign-ins even if your password is compromised." },
              { n: 4, title: "Check your activity log", body: "Console → Activity to see what actions were taken during the suspicious session." },
              { n: 5, title: "Contact support", body: "Email support@yesp.space describing what you found. We can investigate and help secure your account." },
            ].map((step) => (
              <div key={step.n} className="flex items-start gap-4 px-5 py-4 border-b border-red-100 last:border-0">
                <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">{step.n}</div>
                <div>
                  <p className="text-sm font-semibold text-red-900">{step.title}</p>
                  <p className="text-sm text-red-700 mt-0.5 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Devices breakdown */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-5">Understanding session details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: Monitor, label: "Desktop sessions", detail: "Shown with OS (Windows/macOS/Linux) and browser (Chrome/Safari/Edge/Firefox). Location is based on your IP address at sign-in time.", color: "bg-slate-100 text-slate-600" },
              { icon: Smartphone, label: "Mobile sessions", detail: "iOS or Android device with browser. Mobile apps show slightly different user-agents than desktop browsers.", color: "bg-slate-100 text-slate-600" },
              { icon: Globe, label: "Location accuracy", detail: "IP-based location is approximate — it shows city/country level, not your exact address. VPNs or corporate proxies may show a different city.", color: "bg-slate-100 text-slate-600" },
              { icon: RefreshCw, label: "Last active time", detail: "Updated every time your access token is refreshed (roughly every 15 minutes while you're using the app).", color: "bg-slate-100 text-slate-600" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-3.5 p-4 border border-slate-100 rounded-[10px]">
                  <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 ${item.color}`}>
                    <Icon size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                    <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Security tip */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-[12px]">
          <Info size={15} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800 leading-relaxed">
            <strong>Security tip:</strong> Enable MFA (Console → Security) to ensure that even if someone obtains your password, they can't create new sessions without your authenticator app or passkey.
          </p>
        </div>

        {/* Common issues */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-5">Common issues</h2>
          <div className="space-y-3">
            {[
              { problem: "Sessions page shows no sessions", fix: "You need to be signed in to see sessions. If the page is empty after sign-in, try refreshing. Sessions take a moment to load.", icon: AlertTriangle, color: "text-amber-600 bg-amber-50" },
              { problem: "A revoked device is still working", fix: "Access tokens last 15 minutes. A device with a recently revoked session can still make API calls for up to 15 minutes before its token expires and it can't renew.", icon: AlertTriangle, color: "text-amber-600 bg-amber-50" },
              { problem: "I'm being signed out repeatedly", fix: "Your session may be expiring or getting revoked. Check if you have browser settings that clear storage on close, or if a tab manager extension is clearing localStorage.", icon: AlertTriangle, color: "text-amber-600 bg-amber-50" },
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
              { href: "/help/signin", label: "Sign-in & Passwords", desc: "Sign in methods and password reset" },
              { href: "/help/mfa", label: "Two-Factor Auth", desc: "Protect against unauthorized access" },
              { href: "/help/passkeys", label: "Passkeys", desc: "Phishing-resistant sign-in" },
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
            <p className="text-sm font-medium text-slate-900">Think your account was compromised?</p>
            <p className="text-xs text-slate-500 mt-0.5">Sign out all sessions first, then contact us immediately.</p>
          </div>
          <a href="mailto:support@yesp.space" className="shrink-0 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-[6px] hover:bg-blue-700 transition-colors">Contact support</a>
        </div>
      </div>
    </>
  );
}
