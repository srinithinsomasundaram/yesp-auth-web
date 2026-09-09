import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to your Yesp account using email and password, passkey, Google, or enterprise SSO. Fast and secure access to all Yesp products.",
  alternates: { canonical: "https://auth.yesp.space/auth/login" },
  openGraph: {
    url: "https://auth.yesp.space/auth/login",
    title: "Sign in to Yesp",
    description:
      "Sign in to your Yesp account. Use email, passkey, Google, or enterprise SSO.",
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
