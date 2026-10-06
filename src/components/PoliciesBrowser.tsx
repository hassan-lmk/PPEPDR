"use client";

import { useEffect, useMemo, useState } from "react";
import {
  displayCategoryLabel,
  type GovernmentPolicy,
} from "@/lib/ppis";
import { getSupabaseBrowserClient } from "@/lib/supabase";

const ITEMS_PER_PAGE = 9;

type PoliciesBrowserProps = {
  grouped: Record<string, GovernmentPolicy[]>;
  allPolicies: GovernmentPolicy[];
  intro?: string;
  showCategoryNav?: boolean;
  heading?: string;
};

function sanitizeFilename(title: string): string {
  return `${title.replace(/[^a-z0-9]/gi, "_")}.pdf`;
}

export function PoliciesBrowser({
  grouped,
  allPolicies,
  intro = "Browse and download official documents, regulations, and policies that govern Pakistan's petroleum sector. Documents are synced live from PPIS.",
  showCategoryNav = true,
  heading,
}: PoliciesBrowserProps) {
  const categories = useMemo(
    () =>
      Object.keys(grouped)
        .filter((category) => (grouped[category]?.length ?? 0) > 0)
        .sort((a, b) =>
          displayCategoryLabel(a).localeCompare(displayCategoryLabel(b)),
        ),
    [grouped],
  );

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    showCategoryNav ? null : (categories[0] ?? null),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const filteredPolicies = useMemo(() => {
    let items =
      selectedCategory === null
        ? allPolicies
        : (grouped[selectedCategory] ?? []);

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      items = items.filter(
        (policy) =>
          policy.title.toLowerCase().includes(query) ||
          displayCategoryLabel(policy.category).toLowerCase().includes(query) ||
          policy.category.toLowerCase().includes(query) ||
          (policy.description?.toLowerCase().includes(query) ?? false),
      );
    }

    return items;
  }, [allPolicies, grouped, searchQuery, selectedCategory]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPolicies.length / ITEMS_PER_PAGE),
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedPolicies = filteredPolicies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleDownload = async (policy: GovernmentPolicy) => {
    setDownloadError(null);
    setDownloadingId(policy.id);

    try {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase.storage
        .from("government-policies")
        .download(policy.file_url);

      if (error) throw error;
      if (!data) throw new Error("Empty file response");

      const url = window.URL.createObjectURL(data);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = sanitizeFilename(policy.title);
      document.body.appendChild(anchor);
      anchor.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(anchor);
    } catch (error) {
      console.error("Error downloading policy:", error);
      setDownloadError(
        "Failed to download file. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are configured.",
      );
    } finally {
      setDownloadingId(null);
    }
  };

  const activeHeading =
    heading ??
    (selectedCategory
      ? displayCategoryLabel(selectedCategory)
      : "All Categories");

  return (
    <div className="space-y-4">
      <p className="prose-copy">{intro}</p>

      {downloadError ? (
        <p
          role="alert"
          className="border border-danger-border bg-danger-bg px-3 py-2 text-sm text-danger"
        >
          {downloadError}
        </p>
      ) : null}

      <div className="flex flex-col overflow-hidden border border-neutral-200 bg-white md:flex-row">
        {showCategoryNav ? (
          <aside
            className="border-b border-neutral-200 md:w-64 md:shrink-0 md:border-b-0 md:border-r"
            aria-label="Document categories"
          >
            <div className="p-4">
              <h2 className="mb-3 border-b border-neutral-200 pb-2 text-sm font-bold uppercase tracking-wide text-brand-dark">
                Categories
              </h2>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className={`flex items-center justify-between gap-2 px-3 py-2 text-left text-sm transition ${
                    selectedCategory === null
                      ? "bg-brand text-white"
                      : "hover:bg-panel"
                  }`}
                >
                  <span>All Categories</span>
                  <span
                    className={`text-xs ${
                      selectedCategory === null
                        ? "text-white/80"
                        : "text-neutral-500"
                    }`}
                  >
                    {allPolicies.length}
                  </span>
                </button>
                {categories.map((category) => {
                  const active = selectedCategory === category;
                  const label = displayCategoryLabel(category);
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`flex items-center justify-between gap-2 px-3 py-2 text-left text-sm transition ${
                        active ? "bg-brand text-white" : "hover:bg-panel"
                      }`}
                    >
                      <span>{label}</span>
                      <span
                        className={`text-xs ${
                          active ? "text-white/80" : "text-neutral-500"
                        }`}
                      >
                        {grouped[category]?.length ?? 0}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        ) : null}

        <div className="min-w-0 flex-1 p-4 sm:p-6">
          <div className="mb-4">
            <h2 className="text-lg font-medium text-brand-dark">
              {activeHeading}
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              {filteredPolicies.length}{" "}
              {filteredPolicies.length === 1 ? "document" : "documents"}{" "}
              available
              {totalPages > 1 ? (
                <span>
                  {" "}
                  (Page {currentPage} of {totalPages})
                </span>
              ) : null}
            </p>
            <label className="mt-4 block max-w-sm">
              <span className="sr-only">Search documents</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search documents..."
                className="field-input w-full text-sm"
              />
            </label>
          </div>

          {filteredPolicies.length === 0 ? (
            <div className="flex h-48 items-center justify-center border border-dashed border-neutral-300">
              <p className="text-sm text-neutral-500">
                No documents found matching your criteria
              </p>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-neutral-200 border border-neutral-200">
                {paginatedPolicies.map((policy) => (
                  <li
                    key={policy.id}
                    className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center bg-brand text-[11px] font-bold text-white"
                      >
                        PDF
                      </span>
                      <div className="min-w-0">
                        <p className="font-medium text-brand-dark">
                          {policy.title}
                        </p>
                        {selectedCategory === null ? (
                          <p className="mt-1 text-xs uppercase tracking-wide text-neutral-500">
                            {displayCategoryLabel(policy.category)}
                          </p>
                        ) : null}
                        {policy.description ? (
                          <p className="mt-2 text-sm text-neutral-600">
                            {policy.description}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownload(policy)}
                      disabled={downloadingId === policy.id}
                      aria-label={
                        downloadingId === policy.id
                          ? `Downloading ${policy.title}`
                          : `Download ${policy.title}`
                      }
                      className="btn-primary shrink-0 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {downloadingId === policy.id
                        ? "Downloading..."
                        : "Download"}
                    </button>
                  </li>
                ))}
              </ul>

              {totalPages > 1 ? (
                <nav
                  className="mt-6 flex flex-wrap items-center justify-center gap-2"
                  aria-label="Document list pages"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((page) => Math.max(1, page - 1))
                    }
                    disabled={currentPage === 1}
                    className="border border-neutral-300 px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous page
                  </button>
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() => setCurrentPage(page)}
                          aria-current={page === currentPage ? "page" : undefined}
                          className={`min-w-9 px-3 py-1.5 text-sm ${
                            page === currentPage
                              ? "bg-brand text-white"
                              : "border border-neutral-300"
                          }`}
                        >
                          <span className="sr-only">Page </span>
                          {page}
                        </button>
                      );
                    }

                    if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span
                          key={page}
                          className="px-1 text-sm text-neutral-500"
                        >
                          …
                        </span>
                      );
                    }

                    return null;
                  })}
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((page) => Math.min(totalPages, page + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="border border-neutral-300 px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next page
                  </button>
                </nav>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
