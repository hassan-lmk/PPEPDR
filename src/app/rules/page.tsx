import type { Metadata } from "next";
import { PoliciesBrowser } from "@/components/PoliciesBrowser";
import { PageShell } from "@/components/PageShell";
import {
  fetchGovernmentPolicies,
  filterPoliciesByCategory,
  PPIS_CATEGORIES,
} from "@/lib/ppis";

export const metadata: Metadata = {
  title: "Rules",
  description:
    "Pakistan Petroleum (Exploration and Production) Rules published via PPIS.",
};

export default async function RulesPage() {
  let grouped: Awaited<ReturnType<typeof fetchGovernmentPolicies>>["data"] = {};
  let allPolicies: Awaited<
    ReturnType<typeof fetchGovernmentPolicies>
  >["allPolicies"] = [];
  let errorMessage: string | null = null;

  try {
    const result = filterPoliciesByCategory(
      await fetchGovernmentPolicies(),
      PPIS_CATEGORIES.EP_RULES,
    );
    grouped = result.data;
    allPolicies = result.allPolicies;
  } catch (error) {
    console.error("Failed to load E&P rules:", error);
    errorMessage =
      "Unable to load rules documents right now. Please try again later.";
  }

  return (
    <PageShell title="Pakistan Petroleum (Exploration and Production) Rules">
      {errorMessage ? (
        <p className="prose-copy text-red-700">{errorMessage}</p>
      ) : (
        <PoliciesBrowser
          grouped={grouped}
          allPolicies={allPolicies}
          showCategoryNav={false}
          heading={PPIS_CATEGORIES.EP_RULES}
          intro="Browse and download Pakistan Petroleum Exploration & Production Rules. Documents are synced live from PPIS."
        />
      )}
    </PageShell>
  );
}
