import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset password",
  description:
    "Forgot your Yesp account password? Enter your email to receive a secure password reset link.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://auth.yesp.space/auth/forgot-password" },
};

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return children;
}
