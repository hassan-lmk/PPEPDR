"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/site";

function isActive(pathname: string, href: string) {
  return href !== "/" && pathname === href;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const solidNav = scrolled || open;

  useEffect(() => {
    setOpen(false);
    setScrolled(window.scrollY > 16);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300 ${
        solidNav
          ? "border-b border-white/10 bg-forest/95 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:gap-4 lg:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="PPEPDR home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/logo.png"
            alt="PPEPDR"
            width={160}
            height={72}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        <nav
          id="site-nav"
          className={`${
            open ? "flex" : "hidden"
          } absolute inset-x-0 top-full max-h-[70vh] flex-col overflow-y-auto border-b border-white/10 bg-forest px-4 py-4 shadow-lg lg:static lg:ml-auto lg:flex lg:max-h-none lg:flex-1 lg:flex-row lg:flex-wrap lg:items-center lg:justify-end lg:gap-x-0.5 lg:overflow-visible lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none`}
        >
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            const className = `px-3 py-2.5 text-[13px] font-medium tracking-wide transition-colors lg:py-2 ${
              active
                ? "bg-white/10 text-accent lg:bg-transparent"
                : "text-white/90 hover:text-accent"
            }`;

            if (item.external) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={className}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={className}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/login"
            className="mt-3 inline-flex min-h-11 items-center border border-white/25 px-4 text-sm font-medium lg:hidden"
            onClick={() => setOpen(false)}
          >
            Member Login
          </Link>
        </nav>

        <button
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center border border-white/25 lg:hidden"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="flex flex-col gap-1.5" aria-hidden>
            <span className="block h-0.5 w-5 bg-white" />
            <span className="block h-0.5 w-5 bg-white" />
            <span className="block h-0.5 w-5 bg-white" />
          </span>
        </button>
      </div>
    </header>
  );
}
