import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Lock,
  KeyRound,
  Fingerprint,
  Eye,
  Server,
  RefreshCw,
  CheckCircle2,
  Mail,
  ChevronRight,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Learn how Yesp Accounts protects your identity — encryption, passkeys, MFA, session management, and responsible disclosure. Security is core to everything Yesp builds.",
  keywords: [
    "yesp security", "yesp accounts security", "yesp corporation security", "yesp data protection",
    "yesp encryption", "yesp passkeys security", "yesp mfa security", "yesp session security",
    "yesp vulnerability disclosure", "yesp responsible disclosure", "yesp privacy security",
    "yesp studio security", "yesp one security", "srinithin somasundaram yesp",
    "accounts.yesp.space security", "yesp identity security", "yesp auth security",
    "yesp argon2", "yesp jwt", "yesp webauthn", "yesp zero trust",
  ],
  openGraph: {
    title: "Security | Yesp Accounts",
    description: "How Yesp Accounts keeps your identity and data secure — encryption, passkeys, MFA, and responsible disclosure.",
    url: "https://accounts.yesp.space/security",
    type: "website",
  },
  twitter: {
    title: "Security | Yesp Accounts",
    description: "Yesp Accounts security practices — encryption, passkeys, MFA, and vulnerability disclosure.",
  },
  alternates: { canonical: "https://accounts.yesp.space/security" },
  other: {
    "geo.region": "IN", "geo.placename": "India", "geo.position": "20.5937;78.9629", ICBM: "20.5937, 78.9629",
    "DC.title": "Yesp Accounts Security", "DC.creator": "Srinithin Somasundaram",
    "DC.publisher": "Yesp Corporation", "DC.language": "en", "DC.coverage": "Worldwide",
    "DC.rights": "Copyright Yesp Corporation",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Yesp Accounts Security",
  url: "https://accounts.yesp.space/security",
  description: "Security practices and vulnerability disclosure policy for Yesp Accounts by Yesp Corporation.",
  publisher: {
    "@type": "Organization",
    name: "Yesp Corporation",
    url: "https://yespstudio.com",
    founder: { "@type": "Person", name: "Srinithin Somasundaram" },
  },
};

const PRACTICES = [
  {
    icon: Lock,
    color: "bg-blue-50 text-blue-600",
    title: "End-to-end encryption",
    body: "All data in transit is encrypted with TLS 1.3. Passwords are never stored — only Argon2id hashes with per-user salts. Even if our database were compromised, passwords remain unrecoverable.",
  },
  {
    icon: KeyRound,
    color: "bg-violet-50 text-violet-600",
    title: "Signed JWT tokens",
    body: "Access tokens are RS256 signed JWTs with a 15-minute expiry. Refresh tokens are hashed before storage. Token rotation happens on every refresh, making stolen tokens short-lived.",
  },
  {
    icon: Fingerprint,
    color: "bg-emerald-50 text-emerald-600",
    title: "WebAuthn passkeys",
    body: "Passkeys use public-key cryptography per the FIDO2/WebAuthn standard. Private keys never leave your device — Yesp only stores the public key. Passkeys are phishing-resistant by design.",
  },
  {
    icon: Shield,
    color: "bg-amber-50 text-amber-600",
    title: "TOTP two-factor auth",
    body: "MFA uses RFC 6238 TOTP with 30-second codes. Recovery codes are hashed before storage. We support any standards-compliant authenticator app.",
  },
  {
    icon: RefreshCw,
    color: "bg-rose-50 text-rose-600",
    title: "Session management",
    body: "Sessions are tracked individually with unique refresh tokens per device. Revoking a session immediately invalidates its refresh token. Access tokens expire within 15 minutes regardless.",
  },
  {
    icon: Eye,
    color: "bg-slate-100 text-slate-600",
    title: "Audit logging",
    body: "Every security-relevant event — sign-ins, MFA changes, passkey additions, session revocations — is logged with timestamp and IP address. You can review your full activity log in the console.",
  },
  {
    icon: Server,
    color: "bg-blue-50 text-blue-600",
    title: "Rate limiting",
    body: "All authentication endpoints use Redis-backed sliding window rate limiting. Repeated failed attempts are throttled automatically to prevent brute-force and credential stuffing attacks.",
  },
  {
    icon: Globe,
    color: "bg-emerald-50 text-emerald-600",
    title: "CORS & origin validation",
    body: "API requests are restricted to allowed origins only. WebAuthn challenges are bound to the registered RP ID, preventing cross-origin replay. OAuth state parameters are CSRF-protected.",
  },
];

const CHECKLIST = [
  "Enable two-factor authentication (Console → Security)",
  "Add a passkey for your primary device",
  "Review active sessions regularly (Console → Sessions)",
  "Use a unique, strong password — at least 12 characters",
  "Check your activity log for unrecognised events",
  "Keep your recovery codes stored offline and securely",
  "Sign out of sessions on shared or unused devices",
];

export default function SecurityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 px-6 py-14 sm:py-20 text-center">
        <div className="max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full text-xs font-medium text-blue-700 mb-6">
            <Shield size={12} />
            Yesp Accounts Security
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-snug">
            Security is core to<br className="hidden sm:block" /> everything we build
          </h1>
          <p className="text-slate-500 mt-3 text-base leading-relaxed">
            Yesp Accounts is built on modern cryptographic standards. Here&apos;s exactly how we protect your identity and data.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="mailto:security@yesp.space"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-[8px] hover:bg-blue-700 transition-colors"
            >
              <Mail size={14} />
              Report a vulnerability
            </a>
            <Link
              href="/help"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-[8px] hover:border-slate-300 hover:bg-slate-50 transition-colors"
            >
              Help & Support
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 sm:py-16 space-y-14">

        {/* Security practices */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">How we protect your account</h2>
          <p className="text-sm text-slate-500 mb-6">Every layer of Yesp Accounts is designed with security as a first principle.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRACTICES.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="border border-slate-100 rounded-[12px] p-5">
                  <div className={`w-9 h-9 rounded-[8px] flex items-center justify-center mb-3 ${p.color}`}>
                    <Icon size={17} />
                  </div>
                  <p className="text-sm font-semibold text-slate-900 mb-1">{p.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{p.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Infrastructure */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Infrastructure security</h2>
          <div className="border border-slate-100 rounded-[12px] overflow-hidden divide-y divide-slate-100">
            {[
              { label: "Transport security", value: "TLS 1.3 on all connections. HSTS enforced. No mixed content." },
              { label: "Password hashing", value: "Argon2id · 64 MB memory · 3 iterations · 4 parallelism · unique salt per user" },
              { label: "Token signing", value: "RS256 (2048-bit RSA) · Access tokens: 15 min · Refresh tokens: 30 days, hashed at rest" },
              { label: "Passkey standard", value: "FIDO2 / WebAuthn Level 2 via SimpleWebAuthn. RP ID: yesp.space (covers auth.yesp.space and accounts.yesp.space)." },
              { label: "Database", value: "PostgreSQL with encrypted connections. Sensitive fields hashed, never stored in plaintext." },
              { label: "Secrets management", value: "Environment variables, never committed to source control. RSA key pairs stored outside the codebase." },
              { label: "Rate limiting", value: "Redis sliding window per endpoint. Global limit + per-route limits on all auth paths." },
              { label: "Dependency security", value: "Dependencies audited regularly. Production builds use lockfile checksums." },
            ].map((row) => (
              <div key={row.label} className="flex items-start gap-4 px-5 py-3.5">
                <p className="text-xs font-semibold text-slate-500 w-40 shrink-0 mt-0.5">{row.label}</p>
                <p className="text-xs text-slate-700 leading-relaxed">{row.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Account security checklist */}
        <section className="bg-emerald-50 border border-emerald-100 rounded-[12px] p-6">
          <div className="flex items-start gap-3 mb-5">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-emerald-900">Your account security checklist</p>
              <p className="text-xs text-emerald-700 mt-0.5">Steps you can take right now to maximise your account protection.</p>
            </div>
          </div>
          <ul className="space-y-2.5">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-emerald-800">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1.5 mt-5 text-xs font-medium text-emerald-700 hover:text-emerald-900 hover:underline underline-offset-4 transition-colors"
          >
            Go to your security settings <ChevronRight size={12} />
          </Link>
        </section>

        {/* Responsible disclosure */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Responsible disclosure</h2>
          <p className="text-sm text-slate-500 mb-6">
            We take security reports seriously and commit to responding quickly and transparently.
          </p>
          <div className="border border-slate-100 rounded-[12px] overflow-hidden">
            {[
              {
                n: 1,
                title: "Email security@yesp.space",
                body: "Send a clear description of the vulnerability, steps to reproduce, potential impact, and any proof-of-concept. Encrypt your report using our PGP key if the issue is sensitive.",
              },
              {
                n: 2,
                title: "We acknowledge within 48 hours",
                body: "You'll receive an acknowledgement with a tracking reference. We triage all reports regardless of severity.",
              },
              {
                n: 3,
                title: "We investigate and patch",
                body: "Our team will investigate, develop a fix, and keep you updated. Critical vulnerabilities are prioritised and patched within 7 days.",
              },
              {
                n: 4,
                title: "Coordinated disclosure",
                body: "We ask for a reasonable embargo period (typically 90 days) before public disclosure. We credit researchers in our security acknowledgements unless anonymity is requested.",
              },
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

        {/* Contact CTA */}
        <div className="flex items-center gap-4 p-5 bg-slate-50 border border-slate-100 rounded-[12px]">
          <Mail size={18} className="text-slate-400 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900">Found a security issue?</p>
            <p className="text-xs text-slate-500 mt-0.5">Please disclose responsibly — do not post vulnerabilities publicly before we&apos;ve had a chance to fix them.</p>
          </div>
          <a href="mailto:security@yesp.space" className="shrink-0 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-[6px] hover:bg-blue-700 transition-colors">
            security@yesp.space
          </a>
        </div>

        {/* About */}
        <section className="text-center py-4">
          <p className="text-xs text-slate-400">
            Yesp Accounts is the identity platform by{" "}
            <a href="https://yespstudio.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Yesp Corporation
            </a>
            {" "}— founded by{" "}
            <a href="https://yespstudio.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Srinithin Somasundaram
            </a>
            . Security questions: security@yesp.space
          </p>
        </section>

      </div>
    </>
  );
}
