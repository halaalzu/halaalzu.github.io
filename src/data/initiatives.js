// Things I started or led, as opposed to things I built. Same shape as
// projects.js so the home index and /work/<slug> render both from one code path.
//
// Short fields (slug, kind, year, cover, blurb) drive the home page index.
// cover: null just falls back to a gradient — add a photo when you have one.

export const initiatives = [
  {
    id: 1,
    title: "Our London Family Unity Mural",
    slug: "unity-mural",
    kind: "Community Leadership",
    year: "2023–2025",
    cover: null,
    blurb: "I led a school mural to help my community heal after the 2021 London attack — approvals, a local artist partnership, and a thumbprint wall every student could add to.",
    description: "After the June 6, 2021 Islamophobic attack in London, Ontario that killed four members of the Afzaal family, I led a student mural project to give my school a way to grieve together and to mark what happened. I coordinated school approvals, partnered with a local artist on the design and installation, and ran a thumbprint wall so every student could physically add themselves to it.",
    organization: "Sir Frederick Banting Secondary School",
    location: "London, ON",
    date: "2023 – 2025",
    tech: ["Project Leadership", "Community Engagement", "Event Coordination"],
    type: "Community Leadership",
    keyAchievements: [
      "Coordinated school approvals and partnered with a local artist to design and install a community mural promoting unity and remembrance",
      "Organized a thumbprint wall contribution where students added their prints to symbolize collective support, solidarity, and community healing",
      "Carried the project from proposal through installation across two school years"
    ],
    details: [
      "Student-led from proposal to installation",
      "Partnership with a local London artist",
      "Whole-school thumbprint participation"
    ],
    images: [],
    links: []
  },
  {
    id: 2,
    title: "Islamic Relief Türkiye Cohort",
    slug: "islamic-relief-turkiye",
    kind: "Humanitarian",
    year: "2025–present",
    cover: null,
    blurb: "Selected as a volunteer changemaker for a 10-day field visit, fundraising for long-term service projects in the region.",
    description: "I was selected as a volunteer 'changemaker' for Islamic Relief Canada's Türkiye Cohort 2 — a 10-day field visit learning directly from humanitarian projects and the communities they serve. Alongside the trip I'm running a fundraising and awareness campaign supporting orphans and refugees, and completing pre-departure training in humanitarian standards, field safety, and project planning.",
    organization: "Islamic Relief Canada",
    location: "Türkiye",
    date: "2025 – Present",
    tech: ["Humanitarian Work", "Fundraising", "Project Planning"],
    type: "Humanitarian",
    keyAchievements: [
      "Selected as a volunteer 'changemaker' for a 10-day field visit, learning directly from humanitarian projects and communities on the ground",
      "Running fundraising and awareness campaigns supporting long-term service projects in the region",
      "Completing pre-departure training in fundraising, humanitarian standards, field safety, country profile, and project planning, plus a post-trip passion project"
    ],
    details: [
      "10-day field visit with Cohort 2",
      "Ongoing fundraising campaign",
      "Pre-departure training and post-trip passion project"
    ],
    images: [],
    links: [
      {
        label: "Support the campaign",
        href: "https://fundraise.islamicreliefcanada.org/en_US/campaign/support-syrian-and-uygur-orphans-and-refugees-in-turkiye-with-hala-alzureiqi-3771"
      }
    ]
  },
  {
    id: 3,
    title: "MSA Internal Tools",
    slug: "msa-internal-tools",
    kind: "Tech Lead",
    year: "Sep 2025–present",
    cover: null,
    blurb: "Built and maintained web tools for 10+ execs, plus a documentation system that carries knowledge across exec terms.",
    description: "As Tech Lead for the Muslim Student Association, I built and maintain the internal web tools our executive team runs on — centralizing operational resources that used to live in scattered documents and group chats. I also designed a structured documentation system so that knowledge survives the annual exec turnover instead of being rebuilt from scratch each year.",
    organization: "Muslim Student Association",
    location: "Waterloo, ON",
    date: "Sep. 2025 – Present",
    tech: ["Web Development", "Documentation", "System Maintenance"],
    type: "Internal Tooling",
    keyAchievements: [
      "Developed and maintained internal web tools used by 10+ executive members to centralize operational resources",
      "Designed a structured documentation system to improve information organization, retrieval, and continuity across executive terms",
      "Supported ongoing web and application maintenance to ensure system reliability and consistent access"
    ],
    details: [
      "Internal tools for a 10+ person exec team",
      "Documentation system built for term-over-term continuity",
      "Ongoing maintenance and reliability work"
    ],
    images: [],
    links: []
  },
  {
    id: 4,
    title: "Pre-Med Club Sponsorships",
    slug: "premed-sponsorships",
    kind: "Treasurer",
    year: "Sep 2025–present",
    cover: null,
    blurb: "Secured $300 in funding — half of everything allocated to science clubs — and set up partnerships with three external sponsors.",
    description: "As Treasurer of the UW Pre-Med Club I handle budgeting, expense tracking, and financial documentation, but the part I went after was funding. I wrote the proposals and ran the sponsorship outreach that brought in $300 — 50% of the total funding allocated across all science clubs — and established partnerships with three external sponsors to support academic and club initiatives.",
    organization: "UW Pre-Med Club",
    location: "Waterloo, ON",
    date: "Sep. 2025 – Present",
    tech: ["Sponsorship Outreach", "Budgeting", "Financial Management"],
    type: "Club Funding",
    keyAchievements: [
      "Secured $300 in funding through proposals and sponsorship outreach, representing 50% of the total funding allocated to science clubs",
      "Established partnerships with 3 external sponsors to support academic and club initiatives",
      "Managed budgeting, expense tracking, and financial documentation for club initiatives",
      "Led sponsorship outreach and academic funds proposals while coordinating event logistics for campus initiatives"
    ],
    details: [
      "50% of all science-club funding secured",
      "3 external sponsor partnerships established",
      "Budget tracking and financial documentation"
    ],
    images: [],
    links: []
  }
];
