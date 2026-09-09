import type { Metadata } from "next";
import Link from "next/link";
import { UserCog, ChevronDown, ChevronRight, CheckCircle2, AlertTriangle, ArrowLeft, Camera, Mail, AtSign, Info, Trash2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Account & Profile",
  description:
    "Manage your Yesp Accounts profile — update your name, display name, profile photo, and view your account details. Learn how to export or delete your account.",
  keywords: [
    "yesp account profile", "yesp display name", "yesp profile photo", "yesp avatar",
    "yesp update name", "yesp account settings", "yesp change email", "yesp account id",
    "yesp corporation account", "yesp accounts profile", "yesp one profile",
    "srinithin somasundaram yesp", "yesp delete account", "yesp account data",
    "yesp account help", "yesp profile settings",
  ],
  openGraph: {
    title: "Account & Profile | Yesp Accounts Help",
    description: "How to update your name, profile photo, and manage your Yesp account details.",
    url: "https://accounts.yesp.space/help/account",
    type: "article",
  },
  twitter: { title: "Account & Profile | Yesp Accounts Help", description: "Manage your Yesp Accounts profile and personal information." },
  alternates: { canonical: "https://accounts.yesp.space/help/account" },
  other: {
    "geo.region": "IN", "geo.placename": "India", "geo.position": "20.5937;78.9629", ICBM: "20.5937, 78.9629",
    "DC.title": "Yesp Accounts Profile Help", "DC.creator": "Srinithin Somasundaram",
    "DC.publisher": "Yesp Corporation", "DC.language": "en", "DC.coverage": "Worldwide",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How do I update my name on Yesp Accounts?", acceptedAnswer: { "@type": "Answer", text: "Go to Console → Account (Personal information). Click 'Edit' next to First name, Last name, or Display name. Enter the new values and click Save changes. Changes appear across all Yesp products." } },
    { "@type": "Question", name: "How do I change my profile photo on Yesp?", acceptedAnswer: { "@type": "Answer", text: "Go to Console → Account. In the Profile photo section, click 'Upload photo' or the camera icon on your avatar. Select a PNG, JPG, or WebP image under 5 MB. The photo is uploaded and updated immediately." } },
    { "@type": "Question", name: "Can I change my email address on Yesp Accounts?", acceptedAnswer: { "@type": "Answer", text: "Email addresses are used for account identity and sign-in. To change your email, contact support@yesp.space with your current email, the new email you want, and verification of ownership. This is for security." } },
  ],
};

const FAQS = [
  { q: "Can I change my email address?", a: "Email is your primary account identifier. To request an email change, contact support@yesp.space from your current registered email. Include the new email address you want. We verify ownership of both addresses before making the change. This is a manual process for security." },
  { q: "What's the difference between 'Name' and 'Display name'?", a: "First name + Last name are your legal/formal name. Display name is what appears in Yesp products — you can set it to a username, nickname, or brand name. If no display name is set, your first + last name is used. If those aren't set, your email username is used." },
  { q: "My profile photo upload is failing.", a: "Check the file size — photos must be under 5 MB. Supported formats: PNG, JPG, WebP, GIF. Try converting the image to JPG if another format isn't working. If uploads consistently fail, try a different browser or check your network connection." },
  { q: "What is my Account ID and where do I use it?", a: "Your Account ID is a unique identifier for your Yesp account. It's shown in Console → Account → Account details, formatted as a 16-character code. You might be asked for it when contacting support for account recovery. You don't use it for signing in." },
  { q: "How do I see when my account was created?", a: "Console → Account → Account details shows your account creation date. The full timestamp (including time zone) is stored internally but the display shows the date in your local format." },
  { q: "Does changing my name update it in Yesp One (CRM/ERP)?", a: "Yes — your Yesp identity is shared across all Yesp products. Updating your name in Yesp Accounts propagates to Yesp One, Yesp Studio, and any other Yesp product linked to your identity." },
  { q: "How do I export my account data?", a: "To request a data export (all information Yesp holds about your account), email support@yesp.space from your registered email with the subject 'Data Export Request'. We'll prepare an export within 30 days in compliance with applicable privacy laws." },
  { q: "How do I delete my Yesp account?", a: "Account deletion is permanent and cannot be undone. It removes your profile, sessions, passkeys, MFA settings, and removes you from all organizations (transferring ownership if you're the only Owner). To request deletion, email support@yesp.space with 'Account Deletion Request' in the subject line." },
];

export default function AccountHelpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/help" className="hover:text-slate-700 transition-colors flex items-center gap-1"><ArrowLeft size={12} /> Help</Link>
          <ChevronRight size={12} />
          <span className="text-slate-600 font-medium">Account & Profile</span>
        </nav>

        {/* Hero */}
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 bg-slate-100 rounded-[12px] flex items-center justify-center shrink-0">
            <UserCog size={22} className="text-slate-600" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Account & Profile</h1>
            <p className="text-slate-500 mt-2 leading-relaxed">Manage your personal information, profile photo, and account details — all visible across every Yesp product you use.</p>
          </div>
        </div>

        {/* Update name */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-1">Updating your name</h2>
          <p className="text-sm text-slate-500 mb-5">Your name appears in Yesp Accounts and all connected Yesp products.</p>
          <div className="border border-slate-100 rounded-[12px] overflow-hidden">
            {[
              { n: 1, title: "Open Personal information", body: "Sign in → Console → Account (labeled 'Personal information' in the console)." },
              { n: 2, title: "Click 'Edit' next to any name field", body: "A dialog opens with fields for First name, Last name, and Display name. All three can be edited in one form." },
              { n: 3, title: "Update the fields", body: "First name and Last name are used formally. Display name overrides them in product UIs — you can set it to a username or nickname." },
              { n: 4, title: "Save changes", body: "Click 'Save changes'. The update takes effect immediately across all Yesp products." },
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

        {/* Profile photo */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-1">Changing your profile photo</h2>
          <p className="text-sm text-slate-500 mb-5">Your photo appears in the Yesp console header and org member lists.</p>
          <div className="border border-slate-100 rounded-[12px] overflow-hidden">
            {[
              { n: 1, title: "Go to Console → Account", body: "The 'Profile photo' card is at the top of the page." },
              { n: 2, title: "Click 'Upload photo' or the camera icon", body: "A file picker opens. You can also click the camera icon overlay on your current avatar." },
              { n: 3, title: "Choose your photo", body: "Select a PNG, JPG, WebP, or GIF image from your device. Maximum file size: 5 MB. Square photos look best — they'll be cropped to a circle." },
              { n: 4, title: "Photo is uploaded instantly", body: "A preview appears immediately. The upload happens in the background — if it fails, you'll see an error and can try again." },
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

          {/* Photo requirements */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Camera, label: "PNG, JPG, WebP, GIF", color: "text-blue-600 bg-blue-50" },
              { icon: Camera, label: "Max 5 MB", color: "text-blue-600 bg-blue-50" },
              { icon: Camera, label: "Square recommended", color: "text-blue-600 bg-blue-50" },
              { icon: Camera, label: "Displayed as circle", color: "text-blue-600 bg-blue-50" },
            ].map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.label} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-[8px]">
                  <Icon size={12} className="text-slate-400 shrink-0" />
                  <span className="text-xs text-slate-600">{r.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Account details */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-5">Your account details</h2>
          <div className="border border-slate-100 rounded-[12px] overflow-hidden divide-y divide-slate-100">
            {[
              { icon: Mail, label: "Email address", detail: "Your primary sign-in email. Shown as verified once you confirm it. Cannot be changed in self-service — contact support.", color: "text-slate-600 bg-slate-100", changeable: false },
              { icon: AtSign, label: "Username", detail: "Automatically derived from the part of your email before the @. Not currently editable separately.", color: "text-slate-600 bg-slate-100", changeable: false },
              { icon: UserCog, label: "Account ID", detail: "A unique 16-character identifier for your Yesp account. Used internally and in support requests.", color: "text-slate-600 bg-slate-100", changeable: false },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-4 px-5 py-4">
                  <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 ${item.color}`}>
                    <Icon size={14} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                      {!item.changeable && <span className="text-xs px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded-full">Read-only</span>}
                    </div>
                    <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Email change note */}
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-[12px]">
          <Info size={15} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong>Changing your email:</strong> Email changes require identity verification. Contact <a href="mailto:support@yesp.space" className="underline underline-offset-4">support@yesp.space</a> from your current registered email. Include the new email address you want to use.
          </p>
        </div>

        {/* Common issues */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-5">Common issues</h2>
          <div className="space-y-3">
            {[
              { problem: "Name changes aren't saving", fix: "Ensure all required fields are filled. If the save button is disabled, check for validation errors on the form fields. Try refreshing the page and editing again.", icon: AlertTriangle, color: "text-amber-600 bg-amber-50" },
              { problem: "Profile photo upload fails", fix: "Check file size (max 5 MB) and format (PNG/JPG/WebP/GIF). Try a different image or a different browser. Corporate proxies sometimes block multipart uploads.", icon: AlertTriangle, color: "text-red-600 bg-red-50" },
              { problem: "My name isn't updating in Yesp One / other products", fix: "Name propagation can take a few minutes. Refresh the other product's page. If it persists after 5 minutes, sign out and back in on that product.", icon: AlertTriangle, color: "text-amber-600 bg-amber-50" },
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

        {/* Data & deletion */}
        <section>
          <div className="p-5 border border-red-100 bg-red-50 rounded-[12px]">
            <div className="flex items-start gap-3 mb-3">
              <Trash2 size={16} className="text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-900">Data export & account deletion</p>
                <p className="text-xs text-red-700 mt-0.5 leading-relaxed">
                  To <strong>export your data</strong>, email support@yesp.space with "Data Export Request". To <strong>delete your account</strong>, email us with "Account Deletion Request". Account deletion is permanent, removes all data, and cannot be undone.
                </p>
              </div>
            </div>
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
              { href: "/help/signin", label: "Sign-in & Passwords", desc: "Change or reset your password" },
              { href: "/help/organizations", label: "Organizations", desc: "Manage your team workspaces" },
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
            <p className="text-sm font-medium text-slate-900">Still need help with your account?</p>
            <p className="text-xs text-slate-500 mt-0.5">Email us — include your registered email and what you need to change.</p>
          </div>
          <a href="mailto:support@yesp.space" className="shrink-0 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-[6px] hover:bg-blue-700 transition-colors">Email support</a>
        </div>
      </div>
    </>
  );
}
