import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  KeyRound,
  Fingerprint,
  Shield,
  Building2,
  Activity,
  UserCog,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Help & Support",
  description:
    "Get help with Yesp Accounts — sign-in issues, passkeys, MFA, password reset, organizations, and account security. Browse FAQs or contact Yesp support directly.",
  keywords: [
    "yesp help",
    "yesp support",
    "yesp accounts help",
    "yesp corporation support",
    "yesp studio help",
    "yesp one support",
    "srinithin somasundaram",
    "srinithin yesp",
    "yesp accounts faq",
    "yesp login help",
    "yesp password reset",
    "yesp passkey help",
    "yesp mfa help",
    "yesp two factor authentication",
    "yesp sign in issues",
    "yesp account security",
    "yesp organizations",
    "yesp crm support",
    "yesp erp help",
    "yesp tech support",
    "accounts.yesp.space help",
    "identity management help",
    "access management support",
  ],
  openGraph: {
    title: "Help & Support | Yesp Accounts",
    description:
      "Find answers to common questions about Yesp Accounts — sign-in, passkeys, MFA, and account security.",
    url: "https://accounts.yesp.space/help",
    type: "website",
  },
  twitter: {
    title: "Help & Support | Yesp Accounts",
    description: "Get help with Yesp Accounts — FAQs, contact support, and troubleshooting guides.",
  },
  alternates: {
    canonical: "https://accounts.yesp.space/help",
  },
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
    "geo.position": "20.5937;78.9629",
    ICBM: "20.5937, 78.9629",
    "DC.title": "Yesp Accounts Help & Support",
    "DC.creator": "Srinithin Somasundaram",
    "DC.publisher": "Yesp Corporation",
    "DC.description": "Help and support documentation for Yesp Accounts identity platform",
    "DC.language": "en",
    "DC.coverage": "Worldwide",
    "DC.rights": "Copyright Yesp Corporation",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "I forgot my password. How do I reset it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Go to the sign-in page and click 'Forgot password'. Enter your email address and we'll send you a secure reset link. The link expires in 1 hour. Check your spam folder if you don't see it within a few minutes.",
      },
    },
    {
      "@type": "Question",
      name: "How do I set up two-factor authentication (MFA)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sign in to your account, go to Console → Security, and click 'Enable two-factor auth'. You'll need an authenticator app like Google Authenticator or Authy. Scan the QR code, enter the 6-digit code to verify, and save your recovery codes somewhere safe.",
      },
    },
    {
      "@type": "Question",
      name: "What is a passkey and how do I add one?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Passkeys are a modern, phishing-resistant alternative to passwords using your device's biometrics (Face ID, fingerprint, Windows Hello). To add a passkey, go to Console → Security → Passkeys and click 'Add passkey'. Your browser or device will prompt you to authenticate with biometrics.",
      },
    },
    {
      "@type": "Question",
      name: "My account says it doesn't exist. What should I do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you see 'No account found with this email', the email address is not registered with Yesp Accounts. Check for typos, or try the email you used to sign up with Google. If you're new, create a free account from the sign-in page.",
      },
    },
    {
      "@type": "Question",
      name: "I lost access to my authenticator app. How do I recover my account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you saved your recovery codes when you set up MFA, enter one of those codes on the MFA screen. Each code can only be used once. If you don't have recovery codes, contact Yesp support at support@yesp.space for identity verification and account recovery.",
      },
    },
    {
      "@type": "Question",
      name: "How do I sign in with Google?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On the sign-in page, click 'Continue with Google'. You'll be redirected to authenticate with your Google account. If this is your first time, a new Yesp account will be created automatically with your social profile.",
      },
    },
    {
      "@type": "Question",
      name: "How do I create or join an organization?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Once signed in, go to Console → Organizations. You can create a new organization by clicking 'New organization' and choosing a name and URL identifier. To join an existing organization, ask your administrator to send you an invitation to your registered email.",
      },
    },
    {
      "@type": "Question",
      name: "How do I revoke an active session or sign out of all devices?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Go to Console → Sessions. You'll see all active sessions across devices. Click 'Revoke' next to any session you don't recognise, or click 'Sign out of all sessions' to revoke all sessions at once — including the current one.",
      },
    },
    {
      "@type": "Question",
      name: "Is Yesp Accounts free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Yesp Accounts is free for all users. It provides secure identity management for all Yesp products including Yesp One (CRM/ERP). There are no fees for creating an account, enabling MFA, or adding passkeys.",
      },
    },
    {
      "@type": "Question",
      name: "How do I contact Yesp support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Email us at support@yesp.space. For security disclosures, use security@yesp.space. We respond within 24–48 hours on business days. For account recovery issues, include your registered email address and a description of the problem.",
      },
    },
  ],
};

const TOPICS = [
  {
    icon: KeyRound,
    label: "Sign-in & Passwords",
    desc: "Password reset, login issues, account not found",
    color: "bg-blue-50 text-blue-600",
    href: "/help/signin",
  },
  {
    icon: Shield,
    label: "Two-Factor Auth",
    desc: "Set up MFA, authenticator apps, recovery codes",
    color: "bg-violet-50 text-violet-600",
    href: "/help/mfa",
  },
  {
    icon: Fingerprint,
    label: "Passkeys",
    desc: "Add, manage, and troubleshoot passkeys",
    color: "bg-emerald-50 text-emerald-600",
    href: "/help/passkeys",
  },
  {
    icon: Building2,
    label: "Organizations",
    desc: "Create orgs, invite members, manage roles",
    color: "bg-amber-50 text-amber-600",
    href: "/help/organizations",
  },
  {
    icon: Activity,
    label: "Sessions & Devices",
    desc: "View active sessions, revoke devices",
    color: "bg-rose-50 text-rose-600",
    href: "/help/sessions",
  },
  {
    icon: UserCog,
    label: "Account & Profile",
    desc: "Update name, photo, email, and account info",
    color: "bg-slate-100 text-slate-600",
    href: "/help/account",
  },
];

const FAQS = [
  {
    id: "forgot-password",
    q: "I forgot my password. How do I reset it?",
    a: "Go to the sign-in page and click \"Forgot password\". Enter your email address and we'll send a secure reset link. The link expires in 1 hour. Check your spam/junk folder if you don't see it.",
  },
  {
    id: "setup-mfa",
    q: "How do I set up two-factor authentication (MFA)?",
    a: "Sign in → Console → Security → click \"Enable two-factor auth\". You'll need an authenticator app (Google Authenticator, Authy, etc.). Scan the QR code, verify with the 6-digit code, and save your recovery codes somewhere secure.",
  },
  {
    id: "what-passkey",
    q: "What is a passkey and how do I add one?",
    a: "Passkeys use your device's biometrics (Face ID, fingerprint, Windows Hello) instead of a password — they're phishing-resistant and much more secure. Go to Console → Security → Passkeys → \"Add passkey\" and follow your browser's prompt.",
  },
  {
    id: "no-account",
    q: "The sign-in page says my account doesn't exist. What do I do?",
    a: "Double-check for typos in your email. If you signed up via Google, try those buttons instead — the email might not have a password. If you're new to Yesp, create a free account from the sign-in page.",
  },
  {
    id: "lost-mfa",
    q: "I lost access to my authenticator app. How do I recover my account?",
    a: "Enter one of your saved recovery codes on the MFA screen — each code works once. If you don't have recovery codes, email support@yesp.space with your registered email address and we'll verify your identity manually.",
  },
  {
    id: "social-login",
    q: "How do I sign in with Google?",
    a: "Click \"Continue with Google\" or \"Continue with \" on the sign-in page. You'll authenticate through their official OAuth flow. A Yesp account is created automatically on first use with your social profile.",
  },
  {
    id: "create-org",
    q: "How do I create or join an organization?",
    a: "Console → Organizations → \"New organization\" to create one. To join an existing org, ask your admin to send an invitation to your Yesp email. You'll receive an email with a join link.",
  },
  {
    id: "revoke-session",
    q: "How do I sign out of all devices or revoke a session?",
    a: "Console → Sessions. You'll see all active sessions. Click \"Revoke\" next to any session, or \"Sign out of all sessions\" to clear everything — including your current device.",
  },
  {
    id: "free",
    q: "Is Yesp Accounts free?",
    a: "Yes — completely free. Yesp Accounts provides identity management for all Yesp products (Yesp One CRM/ERP, etc.). No fees for creating an account, enabling MFA, adding passkeys, or managing organizations.",
  },
  {
    id: "contact-support",
    q: "How do I contact Yesp support?",
    a: "Email support@yesp.space. For security disclosures, use security@yesp.space. We respond within 24–48 hours on business days. Include your registered email and a clear description of the issue.",
  },
];

function FaqItem({ faq }: { faq: typeof FAQS[number] }) {
  return (
    <details className="group border-b border-slate-100 last:border-0">
      <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none hover:bg-slate-50/60 transition-colors">
        <span className="text-sm font-medium text-slate-900">{faq.q}</span>
        <ChevronDown
          size={15}
          className="text-slate-400 shrink-0 transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <div className="px-5 pb-5 pt-0">
        <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
      </div>
    </details>
  );
}

export default function HelpPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 px-6 py-14 sm:py-20 text-center">
        <div className="max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full text-xs font-medium text-blue-700 mb-6">
            <HelpCircle size={12} />
            Yesp Accounts Support
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-snug">
            How can we help you?
          </h1>
          <p className="text-slate-500 mt-3 text-base leading-relaxed">
            Find answers to common questions about Yesp Accounts — sign-in, security, passkeys, and more.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="mailto:support@yesp.space"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-[8px] hover:bg-blue-700 transition-colors"
            >
              <Mail size={14} />
              Email support
            </a>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-[8px] hover:border-slate-300 hover:bg-slate-50 transition-colors"
            >
              Sign in to your account
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 sm:py-16 space-y-14">

        {/* Topics grid */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Browse by topic</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOPICS.map((topic) => {
              const Icon = topic.icon;
              return (
                <Link
                  key={topic.label}
                  href={topic.href}
                  className="group flex items-start gap-4 p-4 border border-slate-100 rounded-[12px] hover:border-slate-300 hover:bg-slate-50/60 hover:shadow-sm transition-all"
                >
                  <div className={`w-9 h-9 rounded-[8px] flex items-center justify-center shrink-0 ${topic.color}`}>
                    <Icon size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">{topic.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{topic.desc}</p>
                  </div>
                  <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors shrink-0 mt-0.5" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Frequently asked questions</h2>
          <p className="text-sm text-slate-500 mb-6">Answers to the most common questions about Yesp Accounts.</p>
          <div className="border border-slate-100 rounded-[12px] overflow-hidden divide-y divide-slate-100">
            {FAQS.map((faq) => (
              <FaqItem key={faq.id} faq={faq} />
            ))}
          </div>
        </section>

        {/* Contact & Status */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Contact */}
          <div className="border border-slate-100 rounded-[12px] p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-50 rounded-[8px] flex items-center justify-center">
                <Mail size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Contact support</p>
                <p className="text-xs text-slate-400">We respond within 24–48 hours</p>
              </div>
            </div>
            <div className="space-y-2.5">
              <a
                href="mailto:support@yesp.space"
                className="flex items-center justify-between p-3 bg-slate-50 rounded-[8px] hover:bg-slate-100 transition-colors group"
              >
                <div>
                  <p className="text-xs font-medium text-slate-900">General support</p>
                  <p className="text-xs text-slate-400">support@yesp.space</p>
                </div>
                <ExternalLink size={12} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
              </a>
              <a
                href="mailto:security@yesp.space"
                className="flex items-center justify-between p-3 bg-slate-50 rounded-[8px] hover:bg-slate-100 transition-colors group"
              >
                <div>
                  <p className="text-xs font-medium text-slate-900">Security disclosures</p>
                  <p className="text-xs text-slate-400">security@yesp.space</p>
                </div>
                <ExternalLink size={12} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
              </a>
            </div>
          </div>

          {/* Status + Tips */}
          <div className="border border-slate-100 rounded-[12px] p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-50 rounded-[8px] flex items-center justify-center">
                <CheckCircle2 size={16} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Service status</p>
                <p className="text-xs text-slate-400">All systems operational</p>
              </div>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 p-3 bg-emerald-50 rounded-[8px]">
                <span className="w-2 h-2 bg-emerald-500 rounded-full shrink-0 animate-pulse" />
                <p className="text-xs font-medium text-emerald-800">Authentication — Operational</p>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-emerald-50 rounded-[8px]">
                <span className="w-2 h-2 bg-emerald-500 rounded-full shrink-0 animate-pulse" />
                <p className="text-xs font-medium text-emerald-800">API & Sessions — Operational</p>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-emerald-50 rounded-[8px]">
                <span className="w-2 h-2 bg-emerald-500 rounded-full shrink-0 animate-pulse" />
                <p className="text-xs font-medium text-emerald-800">Email delivery — Operational</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="bg-amber-50 border border-amber-100 rounded-[12px] p-6">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900">Before contacting support</p>
              <p className="text-xs text-amber-700 mt-0.5">Try these quick fixes first — they resolve most issues.</p>
            </div>
          </div>
          <ul className="space-y-2">
            {[
              "Clear your browser cache and cookies, then try signing in again",
              "Try a different browser or disable browser extensions",
              "Check your spam/junk folder for verification or reset emails",
              "Make sure Caps Lock is off when entering your password",
              "If using MFA, ensure your device's clock is set to automatic time sync",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-xs text-amber-800">
                <Clock size={11} className="text-amber-500 shrink-0 mt-0.5" />
                {tip}
              </li>
            ))}
          </ul>
        </section>

        {/* About Yesp */}
        <section className="text-center py-4">
          <p className="text-xs text-slate-400">
            Yesp Accounts is the identity platform by{" "}
            <a href="https://yesp.space" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Yesp Corporation
            </a>
            {" "}— built for Yesp One, Yesp Studio, and all Yesp products.
            Founded by{" "}
            <a href="https://yesp.space" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Srinithin Somasundaram
            </a>
            .
          </p>
        </section>

      </div>
    </>
  );
}
