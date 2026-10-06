import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="display-title">Page not found</h1>
      <p className="prose-copy">That page is not part of this site.</p>
      <Link href="/" className="mt-6 inline-block text-heading underline">
        Back to home
      </Link>
    </div>
  );
}
