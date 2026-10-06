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

export const keyFunctions = [
  ["Data selection", "Data viewing", "Data request", "Data trading"],
  ["External data access", "Data security", "Maintenance of data"],
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
