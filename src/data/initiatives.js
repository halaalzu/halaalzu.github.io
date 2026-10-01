// Things I started or led, as opposed to things I built. Same shape as
// projects.js so the home index and /work/<slug> render both from one code path.
//
// Short fields (slug, kind, year, cover, blurb) drive the home page index.
// cover: null just falls back to a gradient — add a photo when you have one.
// Ordered newest to oldest.

export const initiatives = [
  {
    id: 1,
    title: "Sponsor a Smile",
    slug: "sponsor-a-smile",
    kind: "Passion Project",
    year: "2026",
    cover: null,
    blurb: "A post-trip passion project turning 10 days volunteering in Türkiye into ongoing health, hygiene, and oral-health support for children through fundraising and kit distribution.",
    description: "After volunteering with Islamic Relief in Türkiye preparing hygiene and food packages for children and families, I started Sponsor a Smile to turn that short-term experience into ongoing support. The project raises funds to assemble and distribute health, hygiene, and oral-health kits, including toothbrushes, fluoride toothpaste, floss, soap, and shampoo, to children in Türkiye, with a focus on refugee and immigrant children who face barriers to dental care and hygiene resources.",
    organization: "Islamic Relief Canada",
    location: "Türkiye",
    date: "2026",
    tech: ["Fundraising", "Project Planning", "Volunteer Coordination"],
    type: "Humanitarian",
    keyAchievements: [
      "Set a SMART goal to raise at least $5,000 CAD within 8 months through a fundraising dinner, online fundraising, donations, and local business sponsorships",
      "Designed a $21.50/kit health, hygiene, and oral-health package (toothbrushes, fluoride toothpaste, floss, mouthwash, and educational materials) budgeted for 200 kits",
      "Grounded the project in first-hand field experience and published research on oral-health barriers for immigrant and refugee children in Türkiye",
      "Planning to recruit at least 20 volunteers for fundraising, outreach, and kit assembly, and to establish a plan for the project to continue beyond its first cycle"
    ],
    details: [
      "Goal: $5,000 CAD raised within 8 months",
      "200 health, hygiene, and oral-health kits for children in Türkiye",
      "Partnership with Islamic Relief Canada and Islamic Relief Türkiye"
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
    cover: "/assets/irc-2.webp",
    blurb: "Selected as a volunteer changemaker for a 10-day field visit, fundraising for long-term service projects in the region.",
    description: "I was selected as a volunteer 'changemaker' for Islamic Relief Canada's Türkiye Cohort 2, a 10-day field visit learning directly from humanitarian projects and the communities they serve. Alongside the trip I'm running a fundraising and awareness campaign supporting orphans and refugees, and completing pre-departure training in humanitarian standards, field safety, and project planning.",
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
    images: ['/assets/irc-1.webp', '/assets/irc-2.webp', '/assets/irc-3.webp', '/assets/irc-4.webp'],
    links: [
      {
        label: "Support the campaign",
        href: "https://fundraise.islamicreliefcanada.org/en_US/campaign/support-syrian-and-uygur-orphans-and-refugees-in-turkiye-with-hala-alzureiqi-3771"
      }
    ]
  },
  {
    id: 3,
    title: "Our London Family Unity Mural",
    slug: "unity-mural",
    kind: "Community Leadership",
    year: "2023–2025",
    cover: null,
    blurb: "I led a school mural to help my community heal after the 2021 London attack: approvals, a local artist partnership, and a thumbprint wall every student could add to.",
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
  }
];
