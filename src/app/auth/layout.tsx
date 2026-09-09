import type { Metadata } from "next";
import Link from "next/link";
import { AuthGuard } from "@/components/AuthGuard";

export const metadata: Metadata = {
  metadataBase: new URL("https://auth.yesp.space"),
  title: {
    default: "Sign in — Yesp Accounts",
    template: "%s | Yesp Accounts",
  },
  description:
    "Sign in to your Yesp account. Secure authentication with email, passkeys, Google, or enterprise SSO. Access Yesp One, Yesp Studio, Yesp Deskport, Pass Live, and all Yesp products.",
  keywords: [
    "yesp login",
    "yesp sign in",
    "yesp accounts",
    "yesp corporation",
    "yesp studio",
    "yesp one",
    "srinithin somasundaram",
    "identity management",
    "access management",
    "IAM",
    "SSO",
    "MFA",
    "passkey login",
    "two-factor authentication",
    "secure login",
    "enterprise SSO",
    "Google sign in",
    "saas authentication",
    "account security",
  ],
  authors: [{ name: "Srinithin Somasundaram", url: "https://yesp.space" }],
  creator: "Yesp Corporation",
  publisher: "Yesp Corporation",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["en_IN", "en_GB", "en_AU", "en_SG", "en_CA"],
    url: "https://auth.yesp.space",
    siteName: "Yesp Accounts",
    title: "Sign in to Yesp — Secure Identity & Access",
    description:
      "Sign in to your Yesp account. Secure authentication with email, passkeys, Google, or enterprise SSO for all Yesp products.",
    images: [
      {
        url: "https://auth.yesp.space/auth/opengraph-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Yesp Accounts — Secure Sign In",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign in to Yesp — Secure Identity & Access",
    description:
      "Sign in to your Yesp account with email, passkeys, Google, or enterprise SSO.",
    images: ["https://auth.yesp.space/auth/twitter-image.png"],
    creator: "@yespcorp",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png", sizes: "512x512" },
    ],
    apple: { url: "/logo.png", type: "image/png", sizes: "512x512" },
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://auth.yesp.space",
    languages: {
      "en-US": "https://auth.yesp.space",
      "en-IN": "https://auth.yesp.space",
      "en-GB": "https://auth.yesp.space",
      "en-AU": "https://auth.yesp.space",
      "en-SG": "https://auth.yesp.space",
      "en-CA": "https://auth.yesp.space",
    },
  },
  category: "technology",
  classification: "Business/Technology",
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
    "geo.position": "20.5937;78.9629",
    ICBM: "20.5937, 78.9629",
    "DC.title": "Yesp Accounts — Sign In",
    "DC.creator": "Srinithin Somasundaram",
    "DC.publisher": "Yesp Corporation",
    "DC.description": "Secure authentication portal for the Yesp ecosystem",
    "DC.language": "en",
    "DC.coverage": "Worldwide",
    "DC.rights": "Copyright Yesp Corporation",
    "application-name": "Yesp Accounts",
    "msapplication-TileColor": "#1558d6",
    "msapplication-TileImage": "/logo.png",
    "theme-color": "#1558d6",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://yesp.space/#organization",
      name: "Yesp Corporation",
      alternateName: ["Yesp", "Yesp Studio", "Yesp One"],
      url: "https://yesp.space",
      logo: {
        "@type": "ImageObject",
        url: "https://auth.yesp.space/logo.png",
        width: 200,
        height: 200,
      },
      founder: {
        "@type": "Person",
        name: "Srinithin Somasundaram",
        url: "https://yesp.space",
      },
      foundingDate: "2023",
      description:
        "Yesp Corporation builds modern SaaS products including CRM, ERP, and identity management tools for businesses worldwide.",
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "Australia" },
        { "@type": "Country", name: "Singapore" },
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "United Arab Emirates" },
      ],
      sameAs: ["https://yesp.space", "https://app.yesp.space", "https://accounts.yesp.space"],
    },
    {
      "@type": "WebApplication",
      "@id": "https://auth.yesp.space/#webapp",
      name: "Yesp Accounts",
      url: "https://auth.yesp.space",
      description:
        "Secure authentication portal for all Yesp products. Sign in with email, Google, passkeys, or enterprise SSO.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: { "@id": "https://yesp.space/#organization" },
      featureList: [
        "Email and password authentication",
        "Passkey / WebAuthn login",
        "Google OAuth sign-in",
        "Enterprise SAML SSO",
        "Multi-factor authentication (MFA)",
        "Smart Login (QR code)",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://auth.yesp.space/#website",
      url: "https://auth.yesp.space",
      name: "Yesp Accounts",
      description: "Sign in to Yesp — Secure Identity & Access Management",
      publisher: { "@id": "https://yesp.space/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://auth.yesp.space/auth/login",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div className="min-h-screen bg-white flex flex-col">
      {/* Topbar */}
      <header className="flex items-center justify-between px-6 h-[60px] border-b border-slate-100 shrink-0">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Yesp" className="w-7 h-7 object-contain" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">
              Yesp Accounts
            </p>
            <p className="text-[10px] text-slate-400 leading-tight">Identity &amp; access</p>
          </div>
        </Link>

        <nav className="hidden sm:flex items-center gap-1">
          <a
            href="https://yespstudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
          >
            About Yesp
          </a>
          <Link
            href="/help"
            className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Support
          </Link>
        </nav>
        <Link
          href="/help"
          className="sm:hidden p-2 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
          title="Help & Support"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <path d="M12 17h.01"/>
          </svg>
        </Link>
      </header>

      {/* Centered content */}
      <main className="flex-1 flex items-start sm:items-center justify-center px-5 sm:px-6 py-8 sm:py-10">
        <div className="w-full max-w-[400px] animate-fade-slide-up">
          <AuthGuard>{children}</AuthGuard>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-center gap-5 py-5 shrink-0">
        <span className="text-xs text-slate-300">&copy; {new Date().getFullYear()} Yesp Corporation</span>
        <span className="text-slate-200">·</span>
        <a href="https://yespstudio.com/privacy" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Privacy</a>
        <span className="text-slate-200">·</span>
        <Link href="/security" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Security</Link>
        <span className="text-slate-200">·</span>
        <a href="https://yespstudio.com/contact" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Contact</a>
        <span className="text-slate-200">·</span>
        <Link href="/help" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Help</Link>
      </footer>
    </div>
    </>
  );
}
