import Image from "next/image";

export function BlockAwardProcess() {
  return (
    <div className="mt-10 overflow-hidden">
      <Image
        src="/images/block-award-process-v2.png"
        alt="Block award process: application, in-house scrutiny, bids invitation, receipt and evaluation of bids, then grant of exploration licence, with timeline markers within 15 days, 60 days, and 90 days"
        width={1024}
        height={576}
        className="h-auto w-full"
        sizes="(max-width: 1280px) 100vw, 1280px"
        priority={false}
      />
    </div>
  );
}
