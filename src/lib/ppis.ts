export type GovernmentPolicy = {
  id: string;
  category: string;
  title: string;
  description: string | null;
  file_url: string;
  file_size: number | null;
  file_type: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type GovernmentPoliciesResponse = {
  data: Record<string, GovernmentPolicy[]>;
  allPolicies: GovernmentPolicy[];
};

export const PPIS_CATEGORIES = {
  EP_RULES: "Pakistan Petroleum E&P Rules",
  MODEL_AGREEMENTS: "Model Agreements",
  INVESTMENT_BROCHURE: "Investment Brochure",
} as const;

const CATEGORY_DISPLAY_LABELS: Record<string, string> = {
  "Consession Application Process": "Concession Application Process",
};

export function displayCategoryLabel(category: string): string {
  return CATEGORY_DISPLAY_LABELS[category] ?? category;
}

const PPIS_POLICIES_URL =
  "https://ppisonline.com/api/government-policies";

const REVALIDATE_SECONDS = 600;

export async function fetchGovernmentPolicies(): Promise<GovernmentPoliciesResponse> {
  const response = await fetch(PPIS_POLICIES_URL, {
    next: { revalidate: REVALIDATE_SECONDS },
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch government policies (${response.status})`,
    );
  }

  const payload = (await response.json()) as GovernmentPoliciesResponse;

  return {
    data: payload.data ?? {},
    allPolicies: payload.allPolicies ?? [],
  };
}

export function filterPoliciesByCategory(
  response: GovernmentPoliciesResponse,
  category: string,
): GovernmentPoliciesResponse {
  const items = response.data[category] ?? [];
  return {
    data: items.length > 0 ? { [category]: items } : {},
    allPolicies: items,
  };
}

export function excludePolicyCategories(
  response: GovernmentPoliciesResponse,
  categories: readonly string[],
): GovernmentPoliciesResponse {
  const excluded = new Set(categories);
  const data = Object.fromEntries(
    Object.entries(response.data).filter(([category]) => !excluded.has(category)),
  );
  const allPolicies = response.allPolicies.filter(
    (policy) => !excluded.has(policy.category),
  );
  return { data, allPolicies };
}
