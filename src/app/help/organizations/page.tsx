import type { Metadata } from "next";
import Link from "next/link";
import { Building2, ChevronDown, ChevronRight, CheckCircle2, AlertTriangle, ArrowLeft, Users, Crown, ShieldCheck, UserMinus } from "lucide-react";

export const metadata: Metadata = {
  title: "Organizations",
  description:
    "Create and manage organizations on Yesp Accounts. Learn how to invite members, assign roles, manage permissions, and leave or delete an organization.",
  keywords: [
    "yesp organizations", "yesp create organization", "yesp org members", "yesp invite members",
    "yesp organization roles", "yesp org admin", "yesp team management", "yesp corporation org",
    "yesp accounts organization", "yesp one organization", "yesp crm organization",
    "srinithin somasundaram yesp", "yesp workspace", "yesp org help",
    "delete yesp organization", "leave yesp org", "yesp org slug",
  ],
  openGraph: {
    title: "Organizations | Yesp Accounts Help",
    description: "How to create, manage, and configure organizations on Yesp Accounts.",
    url: "https://accounts.yesp.space/help/organizations",
    type: "article",
  },
  twitter: { title: "Organizations | Yesp Accounts Help", description: "Create and manage Yesp organizations — invite members, set roles, and configure your workspace." },
  alternates: { canonical: "https://accounts.yesp.space/help/organizations" },
  other: {
    "geo.region": "IN", "geo.placename": "India", "geo.position": "20.5937;78.9629", ICBM: "20.5937, 78.9629",
    "DC.title": "Yesp Accounts Organizations Help", "DC.creator": "Srinithin Somasundaram",
    "DC.publisher": "Yesp Corporation", "DC.language": "en", "DC.coverage": "Worldwide",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      name: "How to create an organization on Yesp Accounts",
      step: [
        { "@type": "HowToStep", position: 1, name: "Sign in", text: "Sign in to your Yesp account at accounts.yesp.space." },
        { "@type": "HowToStep", position: 2, name: "Open Organizations", text: "Go to Console → Organizations from the sidebar." },
        { "@type": "HowToStep", position: 3, name: "Click New organization", text: "Click 'New organization' or 'Create organization' if you have no existing orgs." },
        { "@type": "HowToStep", position: 4, name: "Enter name and slug", text: "Enter your organization name. The URL identifier (slug) is auto-filled — customize it if needed. Use lowercase letters, numbers, and hyphens only." },
        { "@type": "HowToStep", position: 5, name: "Create", text: "Click 'Create organization'. You become the owner with full admin access." },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What are organization roles in Yesp?", acceptedAnswer: { "@type": "Answer", text: "Yesp organizations have three roles: Owner (full control, can delete the org), Admin (manage members and settings), and Member (standard access to org resources). The creator is always the Owner." } },
        { "@type": "Question", name: "How do I invite someone to my organization?", acceptedAnswer: { "@type": "Answer", text: "Go to Console → Organizations → your org → Members → Invite. Enter the person's email address. They'll receive an invitation email. They need a Yesp account (or will be prompted to create one)." } },
      ],
    },
  ],
};

const ROLES = [
  { icon: Crown, label: "Owner", color: "bg-amber-50 text-amber-700 border-amber-100", perms: ["Full control over the org", "Delete the organization", "Transfer ownership", "Manage all members & settings", "Access all org resources"] },
  { icon: ShieldCheck, label: "Admin", color: "bg-blue-50 text-blue-700 border-blue-100", perms: ["Invite and remove members", "Change member roles (not Owner)", "Manage org settings", "Access all org resources", "Cannot delete the org"] },
  { icon: Users, label: "Member", color: "bg-slate-50 text-slate-700 border-slate-200", perms: ["Access org-linked resources", "View org members list", "Cannot invite others", "Cannot change settings", "Can leave the org"] },
];

const FAQS = [
  { q: "What happens when I create an organization?", a: "You become the Owner of that organization. You can then invite other Yesp users as Admins or Members. Organizations let you share resources (apps, settings, configurations) across your team within the Yesp ecosystem." },
  { q: "How do I invite someone who doesn't have a Yesp account yet?", a: "Send an invitation to their email address from Console → Organizations → your org → Members → Invite. They'll receive an email with a link. If they don't have a Yesp account, the link walks them through creating one and joining your org in the same flow." },
  { q: "The URL identifier (slug) I want is already taken.", a: "Organization slugs must be globally unique across Yesp. Try adding your company domain, a suffix, or a variation — for example 'acme-corp', 'acme-team', or 'acme-hq'. Once set, slugs can't be changed, so choose carefully." },
  { q: "Can I be in multiple organizations?", a: "Yes. Your Yesp identity can belong to any number of organizations simultaneously with different roles in each. All your orgs appear under Console → Organizations." },
  { q: "How do I transfer ownership to someone else?", a: "Go to Console → Organizations → your org → Members, find the person you want to transfer to, and select 'Transfer ownership' from their menu. They must already be an Admin. You'll be downgraded to Admin after the transfer." },
  { q: "How do I leave an organization I don't own?", a: "Console → Organizations → the org → Members → find yourself → 'Leave organization'. If you're the only Owner, you must transfer ownership before leaving, or delete the organization instead." },
  { q: "Can I delete an organization?", a: "Only the Owner can delete an organization. Go to Console → Organizations → the org → Settings → Danger zone → Delete. This is permanent and removes all members from the org. This action cannot be undone." },
  { q: "What is an org's domain used for?", a: "The domain field is optional and informational — it represents your company's web domain (e.g., acme.com). In future Yesp features, it may be used for SSO configuration and automatic org matching when users sign in with a company email." },
];

export default function OrganizationsHelpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/help" className="hover:text-slate-700 transition-colors flex items-center gap-1"><ArrowLeft size={12} /> Help</Link>
          <ChevronRight size={12} />
          <span className="text-slate-600 font-medium">Organizations</span>
        </nav>

        {/* Hero */}
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 bg-amber-50 rounded-[12px] flex items-center justify-center shrink-0">
            <Building2 size={22} className="text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Organizations</h1>
            <p className="text-slate-500 mt-2 leading-relaxed">Organizations group multiple Yesp users into a shared workspace. Invite your team, assign roles, and manage access to Yesp products.</p>
          </div>
        </div>

        {/* Create org guide */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-1">How to create an organization</h2>
          <p className="text-sm text-slate-500 mb-5">You can create an organization from your Yesp console in under a minute.</p>
          <div className="border border-slate-100 rounded-[12px] overflow-hidden">
            {[
              { n: 1, title: "Open Organizations", body: "Sign in → Console → Organizations in the left sidebar." },
              { n: 2, title: "Click 'New organization' or 'Create organization'", body: "If you have no existing orgs, you'll see a Create Organization button on the empty state. Otherwise, click 'New organization' in the top-right." },
              { n: 3, title: "Enter your organization name", body: "Type your company or team name. The URL identifier (slug) is auto-filled from the name — e.g., 'Acme Corp' becomes 'acme-corp'." },
              { n: 4, title: "Customize the URL identifier if needed", body: "The slug must be lowercase letters, numbers, and hyphens only. It's globally unique and cannot be changed after creation, so choose carefully." },
              { n: 5, title: "Click 'Create organization'", body: "You become the Owner with full control. The org is immediately available under your Organizations list." },
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

        {/* Invite members */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-1">Inviting members</h2>
          <p className="text-sm text-slate-500 mb-5">You need Owner or Admin access to invite new members.</p>
          <div className="border border-slate-100 rounded-[12px] overflow-hidden">
            {[
              { n: 1, title: "Open your organization", body: "Console → Organizations → click your organization name." },
              { n: 2, title: "Go to Members → Invite", body: "Click 'Invite member'. A dialog will ask for the person's email address and their role." },
              { n: 3, title: "Enter their email and choose a role", body: "Select Admin or Member. Admin can manage members and settings; Member gets standard access." },
              { n: 4, title: "Send the invitation", body: "The invitee receives an email from Yesp. If they already have an account, clicking the link adds them immediately. If not, they're walked through account creation first." },
              { n: 5, title: "They appear in Members once accepted", body: "Pending invitations are shown separately. You can resend or revoke them at any time." },
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

        {/* Roles */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-1">Roles & permissions</h2>
          <p className="text-sm text-slate-500 mb-5">Yesp organizations have three roles with different levels of access.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ROLES.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.label} className={`border rounded-[12px] p-5 ${r.color}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon size={16} />
                    <p className="text-sm font-semibold">{r.label}</p>
                  </div>
                  <ul className="space-y-1.5">
                    {r.perms.map((p) => (
                      <li key={p} className="flex items-start gap-1.5 text-xs opacity-80">
                        <span className="mt-1 w-1 h-1 rounded-full bg-current shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Managing members */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-5">Managing members</h2>
          <div className="space-y-3">
            {[
              { action: "Change a member's role", how: "Console → Organizations → your org → Members → find the member → click their role badge → select new role. Owners can promote to Admin; Admins can't promote to Owner.", icon: ShieldCheck, color: "text-blue-600 bg-blue-50" },
              { action: "Remove a member", how: "Console → Organizations → your org → Members → find the member → 'Remove from org'. They lose access immediately. They keep their Yesp account.", icon: UserMinus, color: "text-red-600 bg-red-50" },
              { action: "Leave an organization", how: "Console → Organizations → the org → Members → find yourself → 'Leave organization'. If you're the sole Owner, transfer ownership first.", icon: ArrowLeft, color: "text-slate-600 bg-slate-100" },
              { action: "Transfer ownership", how: "The current Owner must go to Members → find an existing Admin → 'Transfer ownership'. The new Owner gets full control; previous Owner becomes Admin.", icon: Crown, color: "text-amber-600 bg-amber-50" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.action} className="flex items-start gap-3.5 p-4 border border-slate-100 rounded-[10px]">
                  <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 ${item.color.split(" ")[1]}`}>
                    <Icon size={14} className={item.color.split(" ")[0]} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.action}</p>
                    <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{item.how}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Common problems */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-5">Common issues</h2>
          <div className="space-y-3">
            {[
              { problem: "The slug I want is already taken", fix: "Slugs are globally unique. Try adding a suffix: '-corp', '-team', '-hq', or include your domain abbreviation. Slugs can't be changed after creation.", icon: AlertTriangle, color: "text-amber-600 bg-amber-50" },
              { problem: "Invitation email not received", fix: "Ask the invitee to check spam/junk. The email comes from noreply@yesp.space. Corporate email filters sometimes block it — ask them to whitelist the domain.", icon: AlertTriangle, color: "text-amber-600 bg-amber-50" },
              { problem: "'Failed to create organization'", fix: "This is usually a duplicate slug conflict. Try a different URL identifier. If the error persists, ensure you're signed in and try refreshing the page.", icon: AlertTriangle, color: "text-red-600 bg-red-50" },
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
              { href: "/help/account", label: "Account & Profile", desc: "Manage your identity" },
              { href: "/help/sessions", label: "Sessions", desc: "See where you're signed in" },
              { href: "/help/signin", label: "Sign-in & Passwords", desc: "Access your account" },
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
            <p className="text-sm font-medium text-slate-900">Need help with your organization?</p>
            <p className="text-xs text-slate-500 mt-0.5">Include your org name and a description of the issue.</p>
          </div>
          <a href="mailto:support@yesp.space" className="shrink-0 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-[6px] hover:bg-blue-700 transition-colors">Email support</a>
        </div>
      </div>
    </>
  );
}
