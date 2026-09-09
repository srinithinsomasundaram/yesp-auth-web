import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create account",
  description:
    "Create your Yesp account and get access to all Yesp products — Yesp One, Yesp Studio, Yesp Deskport, Pass Live, and more. Free to get started.",
  alternates: { canonical: "https://auth.yesp.space/auth/register" },
  openGraph: {
    url: "https://auth.yesp.space/auth/register",
    title: "Create your Yesp account",
    description:
      "Sign up for Yesp and access all Yesp products — Yesp One, Yesp Studio, and more.",
  },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
