import type { Metadata } from "next";
import Link from "next/link";
import { Fingerprint, ChevronDown, ChevronRight, CheckCircle2, AlertTriangle, ArrowLeft, Info, Monitor, Smartphone, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Passkeys",
  description:
    "Add and manage passkeys on Yesp Accounts. Learn how passkeys work, which devices support them, and how to sign in with Face ID, fingerprint, or Windows Hello.",
  keywords: [
    "yesp passkey", "yesp accounts passkey", "yesp face id login", "yesp fingerprint login",
    "yesp windows hello", "yesp webauthn", "yesp biometric login", "yesp passkey setup",
    "yesp corporation passkey", "yesp one passkey", "add passkey yesp",
    "srinithin somasundaram yesp", "phishing resistant yesp", "passwordless yesp",
    "yesp passkey help", "yesp passkey not working", "yesp sign in without password",
  ],
  openGraph: {
    title: "Passkeys | Yesp Accounts Help",
    description: "Set up passkeys on Yesp Accounts to sign in with Face ID, fingerprint, or Windows Hello — no password needed.",
    url: "https://accounts.yesp.space/help/passkeys",
    type: "article",
  },
  twitter: { title: "Passkeys | Yesp Accounts Help", description: "How to add and use passkeys on Yesp Accounts." },
  alternates: { canonical: "https://accounts.yesp.space/help/passkeys" },
  other: {
    "geo.region": "IN", "geo.placename": "India", "geo.position": "20.5937;78.9629", ICBM: "20.5937, 78.9629",
    "DC.title": "Yesp Accounts Passkeys Help", "DC.creator": "Srinithin Somasundaram",
    "DC.publisher": "Yesp Corporation", "DC.language": "en", "DC.coverage": "Worldwide",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      name: "How to add a passkey to your Yesp account",
      step: [
        { "@type": "HowToStep", position: 1, name: "Sign in", text: "Sign in to Yesp Accounts with your email and password." },
        { "@type": "HowToStep", position: 2, name: "Open Security settings", text: "Go to Console → Security → Passkeys section." },
        { "@type": "HowToStep", position: 3, name: "Click Add passkey", text: "Click the 'Add passkey' button. Your browser will ask for permission to create a passkey." },
        { "@type": "HowToStep", position: 4, name: "Authenticate with your device", text: "Use Face ID, Touch ID, fingerprint, Windows Hello, or your device PIN when prompted." },
        { "@type": "HowToStep", position: 5, name: "Name your passkey", text: "Give the passkey a recognisable name like 'MacBook Pro' or 'iPhone 15' so you can identify it later." },
        { "@type": "HowToStep", position: 6, name: "Use your passkey to sign in", text: "Next time you sign in, click 'Sign in with passkey' and authenticate with your device biometrics. No password needed." },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What is a passkey?", acceptedAnswer: { "@type": "Answer", text: "A passkey is a cryptographic credential stored on your device that replaces passwords. It uses your device's biometrics (Face ID, fingerprint, Windows Hello) to authenticate you. Passkeys are phishing-resistant because they're tied to the specific website and never transmitted." } },
        { "@type": "Question", name: "Which devices support passkeys?", acceptedAnswer: { "@type": "Answer", text: "Passkeys work on: iPhone (iOS 16+), iPad (iPadOS 16+), Mac (macOS Ventura+ with Safari/Chrome), Android (9+ with Chrome/Brave), and Windows (10/11 with Windows Hello). Android and iOS also support hardware security keys." } },
      ],
    },
  ],
};

const DEVICE_SUPPORT = [
  { icon: Smartphone, label: "iPhone & iPad", detail: "iOS/iPadOS 16+ · Face ID or Touch ID · Syncs via iCloud Keychain", color: "bg-slate-100 text-slate-700" },
  { icon: Monitor, label: "Mac", detail: "macOS Ventura+ · Touch ID or Apple Watch · Safari, Chrome, Edge", color: "bg-slate-100 text-slate-700" },
  { icon: Monitor, label: "Windows", detail: "Windows 10/11 · Windows Hello (face, fingerprint, PIN) · Edge, Chrome", color: "bg-slate-100 text-slate-700" },
  { icon: Smartphone, label: "Android", detail: "Android 9+ · Fingerprint or face unlock · Chrome, Brave", color: "bg-slate-100 text-slate-700" },
  { icon: Globe, label: "Hardware key", detail: "YubiKey 5 series, Google Titan · USB-A/C or NFC · All major browsers", color: "bg-slate-100 text-slate-700" },
];

const FAQS = [
  { q: "What exactly is a passkey and how is it different from a password?", a: "A passkey is a public-key cryptographic pair stored on your device. Your device holds the private key (never sent anywhere) and Yesp holds the public key. When you sign in, your device signs a challenge with the private key, proven by your biometric. Passwords can be phished, leaked, or guessed — passkeys can't, because the private key never leaves your device." },
  { q: "Can I use the same passkey on multiple devices?", a: "On Apple devices, passkeys sync automatically via iCloud Keychain across all your Apple devices signed into the same Apple ID. On Android, they sync via Google Password Manager. On Windows, passkeys are device-local unless using a cross-device authenticator (like your phone as a USB authenticator via Bluetooth)." },
  { q: "What happens if I lose the device with my passkey?", a: "If your passkey was synced (iCloud / Google), it's still available on your other devices. If it wasn't synced (hardware key, Windows local), you'll need to sign in with your password or use another passkey you added. You can then remove the lost passkey from Console → Security → Passkeys." },
  { q: "My passkey stopped working after a browser update.", a: "Clear your browser's passkey cache or try in a fresh browser profile. If you use Chrome, go to Settings → Passwords → Passkeys and check if the Yesp passkey is still listed. Re-registering a new passkey usually resolves post-update issues." },
  { q: "Can I add more than one passkey?", a: "Yes — you can add as many passkeys as you like. We recommend adding one for each primary device (e.g., MacBook, iPhone, Windows PC) so you always have a backup available." },
  { q: "Do passkeys replace MFA?", a: "Passkeys provide stronger protection than a password + TOTP combination, because biometric confirmation happens on-device. You don't need a separate MFA step when signing in with a passkey. However, you can still keep TOTP MFA enabled as an alternative sign-in method." },
  { q: "The passkey prompt never appears when I click 'Add passkey'.", a: "Your browser may not support WebAuthn, or it may be blocked by a browser extension. Try in Chrome 108+, Safari 16+, or Edge 108+. Disable extensions and try again. Also ensure your device has biometrics enrolled in system settings." },
  { q: "How do I remove a passkey I no longer use?", a: "Go to Console → Security → Passkeys. Each passkey shows its name and last-used date. Click the trash icon next to the one you want to remove. Removing a passkey from Yesp doesn't delete it from your device's keychain — do that separately if needed." },
];

export default function PasskeysHelpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/help" className="hover:text-slate-700 transition-colors flex items-center gap-1"><ArrowLeft size={12} /> Help</Link>
          <ChevronRight size={12} />
          <span className="text-slate-600 font-medium">Passkeys</span>
        </nav>

        {/* Hero */}
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 bg-emerald-50 rounded-[12px] flex items-center justify-center shrink-0">
            <Fingerprint size={22} className="text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Passkeys</h1>
            <p className="text-slate-500 mt-2 leading-relaxed">Sign in to Yesp Accounts with your face, fingerprint, or device PIN — faster and more secure than any password.</p>
          </div>
        </div>

        {/* What is a passkey */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { emoji: "🔒", title: "Phishing-resistant", body: "Passkeys are cryptographically bound to accounts.yesp.space — they can't be stolen by fake login pages." },
            { emoji: "⚡️", title: "One tap to sign in", body: "No typing, no copy-pasting codes. Just your face or fingerprint." },
            { emoji: "☁️", title: "Syncs across devices", body: "Passkeys sync via iCloud Keychain or Google Password Manager to all your trusted devices." },
          ].map((card) => (
            <div key={card.title} className="border border-slate-100 rounded-[12px] p-5">
              <p className="text-2xl mb-3">{card.emoji}</p>
              <p className="text-sm font-semibold text-slate-900 mb-1">{card.title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </section>

        {/* Device support */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-1">Device & browser support</h2>
          <p className="text-sm text-slate-500 mb-5">Passkeys work on modern devices and browsers. Check if yours is supported.</p>
          <div className="border border-slate-100 rounded-[12px] overflow-hidden divide-y divide-slate-100">
            {DEVICE_SUPPORT.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.label} className="flex items-center gap-4 px-5 py-3.5">
                  <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 ${d.color}`}>
                    <Icon size={15} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{d.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{d.detail}</p>
                  </div>
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                </div>
              );
            })}
          </div>
        </section>

        {/* Add a passkey */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-1">How to add a passkey</h2>
          <p className="text-sm text-slate-500 mb-5">You need to be signed in. The whole process takes under 30 seconds.</p>
          <div className="border border-slate-100 rounded-[12px] overflow-hidden">
            {[
              { n: 1, title: "Go to Console → Security", body: "Sign in with your existing password, then navigate to Security from the left sidebar." },
              { n: 2, title: "Find the Passkeys section and click 'Add passkey'", body: "The button triggers your browser's WebAuthn flow — a native OS dialog will appear." },
              { n: 3, title: "Authenticate with your device", body: "Use Face ID, Touch ID, fingerprint reader, Windows Hello face/PIN, or a hardware security key when your device prompts you." },
              { n: 4, title: "Give it a name", body: "Label the passkey clearly — e.g., 'MacBook Pro 14\" M3' or 'iPhone 15 Pro'. You'll see this name when managing passkeys." },
              { n: 5, title: "Your passkey is registered", body: "You can now sign in by clicking 'Sign in with a passkey' on the login page and authenticating with your device." },
            ].map((step) => (
              <div key={step.n} className="flex items-start gap-4 px-5 py-4 border-b border-slate-100 last:border-0">
                <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">{step.n}</div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                  <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Using passkey to sign in */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-1">Signing in with a passkey</h2>
          <p className="text-sm text-slate-500 mb-5">Once registered, you can skip the password entirely.</p>
          <div className="border border-slate-100 rounded-[12px] overflow-hidden">
            {[
              { n: 1, title: "Go to accounts.yesp.space", body: "Click 'Sign in with a passkey' (or enter your email and click Continue to see the passkey option)." },
              { n: 2, title: "Choose your passkey", body: "Your browser shows a list of available passkeys. Select the one for your current device." },
              { n: 3, title: "Authenticate with your biometrics", body: "Complete Face ID, Touch ID, Windows Hello, or your PIN. This happens entirely on your device." },
              { n: 4, title: "You're signed in", body: "No password, no 6-digit code — just one biometric confirmation. Instant and secure." },
            ].map((step) => (
              <div key={step.n} className="flex items-start gap-4 px-5 py-4 border-b border-slate-100 last:border-0">
                <div className="w-6 h-6 bg-slate-700 text-white rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">{step.n}</div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                  <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-5">Troubleshooting</h2>
          <div className="space-y-3">
            {[
              { problem: "Passkey prompt never appears", fix: "Ensure your browser supports WebAuthn (Chrome 108+, Safari 16+, Edge 108+). Disable extensions and try again in a fresh browser window.", icon: AlertTriangle, color: "text-amber-600 bg-amber-50" },
              { problem: "Passkey registration failed", fix: "Make sure you have biometrics enrolled on your device. On iOS: Settings → Face ID & Passcode. On Android: Settings → Biometrics. On Windows: Settings → Sign-in options.", icon: AlertTriangle, color: "text-red-600 bg-red-50" },
              { problem: "'No passkeys available' when signing in", fix: "Passkeys are device-bound (unless synced). If you registered on a different device and don't have cloud sync, sign in with your password and add a passkey on this device.", icon: AlertTriangle, color: "text-amber-600 bg-amber-50" },
              { problem: "Lost device with only passkey, no password", fix: "If your passkeys are synced (iCloud/Google), access them from another device. Otherwise contact support@yesp.space for account recovery.", icon: AlertTriangle, color: "text-red-600 bg-red-50" },
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

        {/* Important note */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-[12px]">
          <Info size={15} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800 leading-relaxed">
            <strong>Keep your password as a backup.</strong> Even after adding passkeys, your password remains active. If you ever lose access to all your passkeys, you can still sign in with your password and add new ones.
          </p>
        </div>

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
              { href: "/help/signin", label: "Sign-in & Passwords", desc: "Other ways to access your account" },
              { href: "/help/mfa", label: "Two-Factor Auth", desc: "TOTP authenticator setup" },
              { href: "/help/sessions", label: "Sessions", desc: "See where you're signed in" },
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
            <p className="text-sm font-medium text-slate-900">Still having trouble with passkeys?</p>
            <p className="text-xs text-slate-500 mt-0.5">Include your device model and browser version in your support request.</p>
          </div>
          <a href="mailto:support@yesp.space" className="shrink-0 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-[6px] hover:bg-blue-700 transition-colors">Email support</a>
        </div>
      </div>
    </>
  );
}
