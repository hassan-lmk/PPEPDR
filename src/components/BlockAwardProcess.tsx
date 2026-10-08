"use client";

import type { LucideIcon } from "lucide-react";
import {
  ClipboardPen,
  HandCoins,
  Handshake,
  Newspaper,
  ScanSearch,
  SearchCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

const steps: {
  n: number;
  title: string;
  Icon: LucideIcon;
}[] = [
  {
    n: 1,
    title: "Application for grant of Petroleum Rights (EL)",
    Icon: ClipboardPen,
  },
  {
    n: 2,
    title: "In-House Scrutiny",
    Icon: ScanSearch,
  },
  {
    n: 3,
    title: "Bids invitation through Press for the Block applied for",
    Icon: Newspaper,
  },
  {
    n: 4,
    title: "Receipt of bids",
    Icon: HandCoins,
  },
  {
    n: 5,
    title: "Evaluation of bids",
    Icon: SearchCheck,
  },
  {
    n: 6,
    title:
      "Grant of Exploration Licence to successful bidder and execution of agreement",
    Icon: Handshake,
  },
];

const phases = [
  {
    label: "Initial Scrutiny / Feedback",
    duration: "Within 15 days",
    span: "col-span-2",
    tone: "green",
  },
  {
    label: "Invitation to Evaluation",
    duration: "Within 60 days",
    span: "col-span-3",
    tone: "blue",
  },
  {
    label: "Approval and Grant",
    duration: "Within 15 days",
    span: "col-span-1",
    tone: "end",
  },
] as const;

const phaseBarClass = {
  green: "bg-brand",
  blue: "bg-accent",
  end: "bg-account",
} as const;

const STEP_HOLD_MS = 2200;
const LOOP_PAUSE_MS = 2800;

export function BlockAwardProcess() {
  const [activeStep, setActiveStep] = useState(1);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setActiveStep(steps.length);
      return;
    }

    let cancelled = false;
    let timeoutId = 0;

    const schedule = (fn: () => void, ms: number) => {
      timeoutId = window.setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
    };

    const advance = (current: number) => {
      if (current >= steps.length) {
        schedule(() => {
          setActiveStep(1);
          schedule(() => advance(1), STEP_HOLD_MS);
        }, LOOP_PAUSE_MS);
        return;
      }

      schedule(() => {
        const next = current + 1;
        setActiveStep(next);
        advance(next);
      }, STEP_HOLD_MS);
    };

    schedule(() => advance(1), STEP_HOLD_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [reduceMotion]);

  return (
    <div className="mt-10">
      <p className="mb-6 text-center text-sm font-semibold tracking-wide text-brand-dark uppercase">
        Grant of Petroleum Rights (EL)
      </p>

      <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {steps.map((step) => {
          const isLast = step.n === steps.length;
          const endOfSmRow = step.n % 2 === 0;
          const endOfLgRow = step.n % 3 === 0;
          const isActive = step.n <= activeStep;
          const lineFilled = activeStep > step.n;
          const { Icon } = step;

          return (
            <li
              key={step.n}
              className={`relative flex flex-col border p-4 transition-[background-color,border-color,box-shadow,color] duration-700 ease-out motion-reduce:transition-none ${
                isActive
                  ? "border-brand-dark bg-brand-dark text-white shadow-[0_8px_24px_rgba(1,65,28,0.28)]"
                  : "border-brand/15 bg-white text-brand-dark"
              }`}
            >
              {step.n === 1 ? (
                <span
                  className={`mb-3 inline-flex w-fit items-center gap-1 rounded-sm px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase transition-colors duration-500 ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "bg-brand/50 text-white"
                  }`}
                >
                  Start
                </span>
              ) : null}
              {step.n === 6 ? (
                <span
                  className={`mb-3 inline-flex w-fit items-center gap-1 rounded-sm px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase transition-colors duration-500 ${
                    isActive
                      ? "bg-accent text-white"
                      : "bg-accent/50 text-white"
                  }`}
                >
                  End
                </span>
              ) : step.n !== 1 ? (
                <span className="mb-3 h-[18px]" aria-hidden />
              ) : null}

              <div
                className={`mb-3 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-700 ${
                  isActive
                    ? "bg-white/15 text-white"
                    : step.n <= 2
                      ? "bg-brand/10 text-brand-dark"
                      : "bg-accent/10 text-account"
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </div>

              <p
                className={`text-[11px] font-bold tracking-wide uppercase transition-colors duration-500 ${
                  isActive ? "text-white/70" : "text-neutral-500"
                }`}
              >
                Step {step.n}
              </p>
              <p
                className={`mt-1 text-sm leading-snug font-semibold transition-colors duration-500 ${
                  isActive ? "text-white" : "text-brand-dark"
                }`}
              >
                {step.title}
              </p>

              {!isLast ? (
                <>
                  {/* Vertical connector — mobile */}
                  <span
                    className="pointer-events-none absolute top-full left-1/2 z-10 flex h-10 w-1.5 -translate-x-1/2 overflow-hidden rounded-full bg-brand/20 sm:hidden"
                    aria-hidden
                  >
                    <span
                      className={`block h-full w-full origin-top rounded-full bg-brand transition-transform duration-700 ease-out motion-reduce:transition-none ${
                        lineFilled ? "scale-y-100" : "scale-y-0"
                      }`}
                    />
                  </span>

                  {/* Horizontal connector — mid-card */}
                  <span
                    className={`pointer-events-none absolute top-1/2 left-full z-10 hidden h-1.5 w-10 -translate-y-1/2 overflow-hidden rounded-full bg-brand/20 sm:block ${
                      endOfSmRow ? "sm:hidden lg:block" : ""
                    } ${endOfLgRow ? "lg:hidden xl:block" : ""}`}
                    aria-hidden
                  >
                    <span
                      className={`block h-full w-full origin-left rounded-full bg-brand transition-transform duration-700 ease-out motion-reduce:transition-none ${
                        lineFilled ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </span>

                  {/* Vertical connector — row wrap */}
                  <span
                    className={`pointer-events-none absolute top-full left-1/2 z-10 hidden h-10 w-1.5 -translate-x-1/2 overflow-hidden rounded-full bg-brand/20 ${
                      endOfSmRow ? "sm:block lg:hidden" : "sm:hidden"
                    } ${endOfLgRow ? "lg:block xl:hidden" : ""}`}
                    aria-hidden
                  >
                    <span
                      className={`block h-full w-full origin-top rounded-full bg-brand transition-transform duration-700 ease-out motion-reduce:transition-none ${
                        lineFilled ? "scale-y-100" : "scale-y-0"
                      }`}
                    />
                  </span>
                </>
              ) : null}
            </li>
          );
        })}
      </ol>

      <div
        className="mt-6 hidden gap-2 xl:grid xl:grid-cols-6"
        aria-label="Process timeline"
      >
        {phases.map((phase) => (
          <div key={phase.label} className={phase.span}>
            <div className={`h-1 w-full ${phaseBarClass[phase.tone]}`} />
            <p
              className={`mt-2 text-xs font-semibold ${
                phase.tone === "end" ? "text-account" : "text-brand-dark"
              }`}
            >
              {phase.label}
            </p>
            <p className="text-xs text-neutral-600">{phase.duration}</p>
          </div>
        ))}
      </div>

      <ul
        className="mt-6 grid gap-2 sm:grid-cols-3 xl:hidden"
        aria-label="Process timeline"
      >
        {phases.map((phase) => (
          <li
            key={phase.label}
            className="border border-brand/10 bg-white px-3 py-2"
          >
            <div className={`mb-2 h-1 w-10 ${phaseBarClass[phase.tone]}`} />
            <p
              className={`text-xs font-semibold ${
                phase.tone === "end" ? "text-account" : "text-brand-dark"
              }`}
            >
              {phase.label}
            </p>
            <p className="text-xs text-neutral-600">{phase.duration}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
