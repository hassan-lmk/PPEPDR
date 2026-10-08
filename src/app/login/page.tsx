import type { Metadata } from "next";
import { LoginForm } from "@/components/LoginForm";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Member Login",
  description: "Member login for the Pakistan Petroleum Exploration and Production Data Repository.",
};

export default function LoginPage() {
  return (
    <PageShell
      title="Member Login"
      bannerSrc="/images/banner-login.jpg"
      bannerAlt="Secure login and data vault motif"
    >
      <LoginForm />
    </PageShell>
  );
}
