"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "/images/hero-seismic-waves.jpg",
    alt: "Seismic waveform visualization over a dark survey field",
  },
  {
    src: "/images/hero-geology-map.jpg",
    alt: "Topographic and geological map with contour lines",
  },
  {
    src: "/images/hero-wave-field.jpg",
    alt: "Acoustic wave field propagating through subsurface layers",
  },
  {
    src: "/images/hero-basin-survey.jpg",
    alt: "3D seismic volume and basin survey track visualization",
  },
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <section
      className="relative isolate min-h-[78vh] overflow-hidden bg-ink text-white md:min-h-[85vh]"
      aria-roledescription="carousel"
      aria-label="PPEPDR introduction"
    >
      <div className="absolute inset-0">
        {slides.map((slide, slideIndex) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={slideIndex === 0}
            sizes="100vw"
            className={`object-cover brightness-[0.95] contrast-[1.02] transition-opacity duration-700 ease-out motion-reduce:transition-none ${
              slideIndex === index
                ? "opacity-100 hero-fade"
                : "opacity-0"
            }`}
          />
        ))}
        {/* Light scrim only — keep imagery visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/45 via-ink/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/20" />
      </div>

      <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-end px-4 pb-20 pt-28 md:min-h-[85vh] md:justify-center md:pb-28 md:pt-20 lg:px-6">
        <div className="max-w-2xl reveal">
          <p className="mb-4 text-sm font-semibold tracking-[0.22em] text-white/80 uppercase">
            PPEPDR
          </p>
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Pakistan Petroleum Exploration &amp; Production Data
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            Secure online access to quality-assured seismic, well, and physical
            E&amp;P data for Pakistan&apos;s energy industry.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/subscribe"
              className="bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-dark"
            >
              Subscribe for access
            </Link>
            <Link
              href="/about"
              className="border border-white/70 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              About the repository
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
