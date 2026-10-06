import type { DocumentItem } from "@/lib/site";

export function DocumentList({ items }: { items: DocumentItem[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.title}>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="flex h-full items-start gap-3 border border-neutral-200 bg-white p-4 transition hover:border-brand hover:shadow-sm"
          >
            <span
              aria-hidden
              className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center bg-brand text-[11px] font-bold text-white"
            >
              PDF
            </span>
            <span className="font-medium text-[#01411c]">{item.title}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
