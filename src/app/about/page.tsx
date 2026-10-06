import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { highlights, keyFunctions } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "PPEPDR is a centralized digital database for seismic, well, and physical petroleum data in Pakistan.",
};

export default function AboutPage() {
  return (
    <PageShell title="About us">
      <div className="prose-copy space-y-4">
        <p>
          Easy and secure access to online quality assured Petroleum
          Exploration &amp; Production Data. PPEPDR is a centralized digital
          database for all seismic, well, and physical data that can be
          accessed online. Saving cost and precious time, offline data
          management system as well as associated online data management
          services have been implemented providing, among other benefits, fast
          web-based access to E&amp;P data. Since its inception, the Pakistan
          National Data Repository has improved the speed and ease of accessing
          and sharing geotechnical data. With the establishment of Petrobank in
          2001, a significant milestone was achieved in the E&amp;P Industry of
          Pakistan when it was decided to introduce cutting-edge data
          management &amp; archival technology. The requirements for the
          project were tendered out and LMK Resources again emerged successful
          based on their expertise. The major objective was to make data
          available online for E&amp;P companies who wish to subscribe to such
          a service. The repository contains terabytes of secure petrotechnical
          data available to clients online.
        </p>
        <p>
          The new process for reviewing, purchasing, and data transfer involves
          simple subscriptions. Clients are able to view, select and download
          data to their desktops through a high bandwidth online access system.
          In Parallel, the existing system for data review and purchase will
          also be available. The highly scalable PetroBank architecture is an
          integrated system, accessible through the Power Explorer interface.
          It provides an integrated view of information from multiple external
          databases as well as data stored in PetroBank.
        </p>
      </div>

      <h2 className="section-heading">Highlights of PPEPDR</h2>
      <p className="mb-4 font-medium">Some key benefits are as under:</p>
      <div className="grid gap-6 md:grid-cols-3">
        {highlights.map((column) => (
          <ul key={column[0]} className="list-disc space-y-2 pl-5">
            {column.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ))}
      </div>

      <h2 className="section-heading">Key Functions</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {keyFunctions.map((column) => (
          <ul key={column[0]} className="list-disc space-y-2 pl-5">
            {column.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ))}
      </div>
    </PageShell>
  );
}
