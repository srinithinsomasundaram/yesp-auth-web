import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Set new password",
  description: "Create a new secure password for your Yesp account.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://auth.yesp.space/auth/reset-password" },
};

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return children;
}
