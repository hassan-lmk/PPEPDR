import type { Metadata } from "next";
import { PoliciesBrowser } from "@/components/PoliciesBrowser";
import { PageShell } from "@/components/PageShell";
import {
  fetchGovernmentPolicies,
  filterPoliciesByCategory,
  PPIS_CATEGORIES,
} from "@/lib/ppis";

export const metadata: Metadata = {
  title: "Agreements",
  description:
    "Model petroleum concession and production sharing agreements from PPIS.",
};

export default async function AgreementsPage() {
  let grouped: Awaited<ReturnType<typeof fetchGovernmentPolicies>>["data"] = {};
  let allPolicies: Awaited<
    ReturnType<typeof fetchGovernmentPolicies>
  >["allPolicies"] = [];
  let errorMessage: string | null = null;

  try {
    const result = filterPoliciesByCategory(
      await fetchGovernmentPolicies(),
      PPIS_CATEGORIES.MODEL_AGREEMENTS,
    );
    grouped = result.data;
    allPolicies = result.allPolicies;
  } catch (error) {
    console.error("Failed to load model agreements:", error);
    errorMessage =
      "Unable to load agreement documents right now. Please try again later.";
  }

  return (
    <PageShell title="Model Agreements">
      {errorMessage ? (
        <p className="prose-copy text-red-700">{errorMessage}</p>
      ) : (
        <PoliciesBrowser
          grouped={grouped}
          allPolicies={allPolicies}
          showCategoryNav={false}
          heading={PPIS_CATEGORIES.MODEL_AGREEMENTS}
          intro="Browse and download model petroleum concession and production sharing agreements. Documents are synced live from PPIS."
        />
      )}
    </PageShell>
  );
}
