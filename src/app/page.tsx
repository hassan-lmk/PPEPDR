import Image from "next/image";
import Link from "next/link";
import { BlockAwardProcess } from "@/components/BlockAwardProcess";
import { FeatureCards } from "@/components/FeatureCards";
import { HeroCarousel } from "@/components/HeroCarousel";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <FeatureCards />

      <section
        className="home-section relative overflow-hidden"
        aria-labelledby="about-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(8,171,223,0.08),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(0,51,0,0.08),_transparent_45%)]"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:px-6">
          <div className="text-left">
            <p className="section-kicker text-left">About the repository</p>
            <h2 id="about-heading" className="display-title align-left">
              Built for secure, online E&amp;P data access
            </h2>
            <div className="prose-copy mt-5 space-y-4 text-neutral-700">
              <p>
                PPEPDR is Pakistan&apos;s centralized digital database for
                seismic, well, and physical petroleum data. It brings quality
                assured exploration and production information online so
                companies can review, select, and request data with less delay.
              </p>
              <p>
                Through PetroBank and the Power Explorer interface, subscribers
                gain an integrated view across external databases and
                repository holdings — supporting faster decisions across the
                national E&amp;P landscape.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="btn-primary">
                Read more about PPEPDR
              </Link>
              <Link
                href="/subscribe"
                className="border border-brand px-6 py-3 font-medium text-brand-dark transition hover:bg-brand hover:text-white"
              >
                View membership options
              </Link>
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden bg-brand md:min-h-[420px]">
            <Image
              src="/images/about-repository.jpg"
              alt="Secure petroleum data operations environment with seismic and basin visualization"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand/85 via-brand/15 to-transparent" />
            <p className="absolute inset-x-0 bottom-0 p-6 text-lg font-medium leading-snug text-white md:text-xl">
              Terabytes of secure petrotechnical data available to
              subscribed clients online.
            </p>
          </div>
        </div>
      </section>

      <section
        className="home-section relative overflow-hidden bg-forest text-white"
        aria-labelledby="how-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(8,171,223,0.18),_transparent_45%)]"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2 lg:gap-14 lg:px-6">
          <div className="text-left">
            <p className="section-kicker on-dark text-left">Overview</p>
            <h2 id="how-heading" className="display-title on-dark align-left">
              How it works
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-white/85">
              A short look at how PPEPDR helps teams access and work with
              national E&amp;P data.
            </p>
          </div>
          <div className="aspect-video w-full overflow-hidden border border-white/20 bg-black/40 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/1TQwNRmd7zA?rel=0"
              title="How PPEPDR works"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section
        id="block-award"
        className="home-section scroll-mt-28 bg-sand"
        aria-labelledby="block-award-heading"
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker">Process</p>
            <h2 id="block-award-heading" className="display-title">
              Block award process
            </h2>
            <p className="prose-copy mx-auto mt-3 max-w-xl text-neutral-700">
              Follow the national block award workflow from application through
              licence grant.
            </p>
          </div>
          <BlockAwardProcess />
        </div>
      </section>
    </>
  );
}
