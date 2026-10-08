import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase";

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

const REVALIDATE_SECONDS = 600;

function groupPolicies(
  policies: GovernmentPolicy[],
): GovernmentPoliciesResponse {
  const sorted = [...policies].sort((a, b) => {
    if (a.display_order !== b.display_order) {
      return a.display_order - b.display_order;
    }
    return a.title.localeCompare(b.title);
  });

  const data: Record<string, GovernmentPolicy[]> = {};
  for (const policy of sorted) {
    if (!data[policy.category]) data[policy.category] = [];
    data[policy.category].push(policy);
  }

  return { data, allPolicies: sorted };
}

export async function fetchGovernmentPolicies(): Promise<GovernmentPoliciesResponse> {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  const endpoint = new URL(`${url}/rest/v1/government_policies`);
  endpoint.searchParams.set("is_active", "eq.true");
  endpoint.searchParams.set("order", "display_order.asc,title.asc");
  endpoint.searchParams.set(
    "select",
    "id,category,title,description,file_url,file_size,file_type,display_order,is_active,created_at,updated_at",
  );

  const response = await fetch(endpoint, {
    next: { revalidate: REVALIDATE_SECONDS },
    headers: {
      Accept: "application/json",
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch government policies from ${url} (${response.status})`,
    );
  }

  const rows = (await response.json()) as GovernmentPolicy[];
  return groupPolicies(rows ?? []);
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
