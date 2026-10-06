import type { Metadata } from "next";
import { PoliciesBrowser } from "@/components/PoliciesBrowser";
import { PageShell } from "@/components/PageShell";
import {
  excludePolicyCategories,
  fetchGovernmentPolicies,
  PPIS_CATEGORIES,
} from "@/lib/ppis";

export const metadata: Metadata = {
  title: "Policies & Regulations",
  description:
    "Official government policies, regulations, and petroleum sector documents from PPIS.",
};

export default async function PoliciesPage() {
  let grouped: Awaited<ReturnType<typeof fetchGovernmentPolicies>>["data"] = {};
  let allPolicies: Awaited<
    ReturnType<typeof fetchGovernmentPolicies>
  >["allPolicies"] = [];
  let errorMessage: string | null = null;

  try {
    const result = excludePolicyCategories(await fetchGovernmentPolicies(), [
      PPIS_CATEGORIES.EP_RULES,
      PPIS_CATEGORIES.MODEL_AGREEMENTS,
      PPIS_CATEGORIES.INVESTMENT_BROCHURE,
    ]);
    grouped = result.data;
    allPolicies = result.allPolicies;
  } catch (error) {
    console.error("Failed to load government policies:", error);
    errorMessage =
      "Unable to load policy documents right now. Please try again later.";
  }

  return (
    <PageShell title="Government Policies & Regulations">
      {errorMessage ? (
        <p className="prose-copy text-red-700">{errorMessage}</p>
      ) : (
        <PoliciesBrowser grouped={grouped} allPolicies={allPolicies} />
      )}
    </PageShell>
  );
}
