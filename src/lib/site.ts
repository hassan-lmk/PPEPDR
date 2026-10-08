export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const navItems: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Policies", href: "/policies" },
  { label: "Agreements", href: "/agreements" },
  { label: "Rules", href: "/rules" },
  {
    label: "Bids",
    href: "https://ppisonline.com/bidding-blocks/",
    external: true,
  },
  { label: "Subscribe", href: "/subscribe" },
  {
    label: "Data Review Request",
    href: "https://www.ppisonline.com/data-review",
    external: true,
  },
  { label: "Contact Us", href: "/contact" },
];

export type DocumentItem = {
  title: string;
  href: string;
};

export const highlights = [
  [
    "Faster project cycle time",
    "More data accessible",
    "Quality assured data (hence improved user confidence)",
    "More effective data flow from contractors",
    "Easier reporting",
    "Use of standards",
  ],
  [
    "Reduced software and hardware investment",
    "Reduced disk space needs",
    "Saving on data storage",
    "Reduced G&G archive activity",
    "Better internal and external data distribution",
    "Greater data version control",
    "Less data reformatting",
  ],
  [
    "Workstation-ready formatting",
    "More effective and safe data trading",
    "Easier culture data updates",
    "Better data selection and overview",
  ],
];

export type KeyFunction = {
  title: string;
  description: string;
  icon:
    | "selection"
    | "viewing"
    | "request"
    | "trading"
    | "external"
    | "security"
    | "maintenance";
};

export const keyFunctions: KeyFunction[] = [
  {
    title: "Data selection",
    description:
      "Filter and choose seismic, well, and physical datasets that match project needs.",
    icon: "selection",
  },
  {
    title: "Data viewing",
    description:
      "Review quality-assured E&P data online before requesting downloads or transfers.",
    icon: "viewing",
  },
  {
    title: "Data request",
    description:
      "Submit structured requests for digital or hardcopy data through the repository workflow.",
    icon: "request",
  },
  {
    title: "Data trading",
    description:
      "Support safer, more effective exchange of culture and petrotechnical data between parties.",
    icon: "trading",
  },
  {
    title: "External data access",
    description:
      "Connect subscribed users to integrated views across PetroBank and related systems.",
    icon: "external",
  },
  {
    title: "Data security",
    description:
      "Protect national E&P assets with controlled access, authentication, and secure delivery.",
    icon: "security",
  },
  {
    title: "Maintenance of data",
    description:
      "Keep the national archive current through ongoing quality control and version management.",
    icon: "maintenance",
  },
];

export const memberships = [
  {
    name: "Full Members",
    price: "US$ 21,000",
    period: "annum",
    summary: "Full membership for companies",
    benefits: [
      "Free access to Pakistan digital database",
      "Free online data review",
      "Free access to hardcopy data for review",
      "04 free subscriptions of PPIS",
      "02 user annual license access for Power Explorer",
    ],
  },
  {
    name: "Associate Members",
    price: "US$ 12,600",
    period: "annum",
    summary: "Associate membership for companies",
    benefits: [
      "Free access to Pakistan digital database",
      "Free online data review",
      "Free access to hardcopy data for review",
      "02 free subscriptions of PPIS",
      "Single user annual license access for Power Explorer",
    ],
  },
  {
    name: "Non Members",
    price: "US$ 105",
    period: "hour",
    summary: "Hourly rate for non-member companies within Pakistan",
    benefits: ["A subscription fee of US $105 per hour to access database"],
  },
  {
    name: "Temporary Members",
    price: "Free",
    period: null,
    summary:
      "Free subscription for companies with foreign operations registering interest with DGPC for potential investment",
    benefits: ["Free subscription allowing access to database"],
  },
];
