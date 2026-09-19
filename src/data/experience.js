// Easy to edit: Add work experience, volunteer work, and skills here

export const workExperience = [
  {
    id: 4,
    title: "Research Intern",
    company: "National Research Council Canada",
    location: "Ottawa, ON",
    date: "May 2026 – Aug. 2026",
    description: "Researching trust loss in human-autonomy teaming using multimodal biosensors and machine learning.",
    skills: ["Human-Autonomy Teaming", "iMotions", "GSR", "Eye Tracking", "Machine Learning", "Experimental Design"],
    achievements: [
      "Conducted literature reviews on trust measurement in human-autonomy teaming to design 2 trust-violation scenarios, author their experimental protocol, and conduct pilot studies to detect indicators of trust loss",
      "Integrated and calibrated non-invasive sensors (GSR, eye tracking, facial expressions, voice) using iMotions to capture physiological and behavioural responses across 75 participants following REB approval",
      "Analyzed and cross-referenced sensor streams with post-hoc surveys to identify indicators of trust; developing a binary trust classification framework evaluating multiple ML models on raw multimodal sensor data"
    ]
  },
  {
    id: 1,
    title: "Guest Services Associate",
    company: "Fleetway Bowling Alley - ESAM Group",
    location: "London, ON",
    date: "Sep. 2023 – Aug. 2025",
    description: "Handled day-to-day guest services at a bowling alley, from reservations to POS operations.",
    skills: ["Customer Service", "POS Systems", "Operations"],
    achievements: [
      "Delivered high-quality customer service by managing reservations, POS transactions, and guest inquiries",
      "Resolved customer concerns calmly and effectively, maintaining a safe and positive atmosphere for guests",
      "Performed opening and closing duties including cleaning and inspecting workplace to ensure smooth operations"
    ]
  },
  {
    id: 2,
    title: "Information Officer",
    company: "Elections Canada",
    location: "London, ON",
    date: "Apr. 2025",
    description: "Supported polling station operations for a federal election, focused on accessibility and voter flow.",
    skills: ["Voter Support", "Compliance", "Operations Management"],
    achievements: [
      "Directed voters and managed polling station flow to ensure accessibility and efficiency throughout election day",
      "Provided accurate instructions on voting procedures, ID verification, and confidentiality requirements",
      "Optimized setup, takedown, and ballot counting processes while upholding confidentiality, integrity and compliance with federal standards"
    ]
  },
  {
    id: 3,
    title: "Summer Camp Counsellor",
    company: "London Islamic School Camp SHINE",
    location: "London, ON",
    date: "Jun. 2022 – Aug. 2024",
    description: "Supervised campers at a STEM-focused summer camp, including those with special needs.",
    skills: ["Child Supervision", "STEM Education", "Special Needs Support"],
    achievements: [
      "Supervised and supported 15–20 campers, including those with special needs, ensuring a safe, inclusive, and engaging environment",
      "Planned and led STEM-based and creative activities that encouraged problem-solving, curiosity, and teamwork",
      "Coordinated volunteers and responded to camper and parent concerns with quick judgment to maintain safety"
    ]
  }
];

export const extracurricularExperience = [
  {
    id: 1,
    title: "Tech Lead",
    organization: "Muslim Student Association",
    location: "Waterloo, ON",
    date: "Jan. 2026 – Present",
    description: "Leading development of a privacy-first AI search tool for the MSA executive team.",
    skills: ["RAG", "PostgreSQL", "pgvector", "Document Ingestion", "System Design"],
    achievements: [
      "Evaluated and selected a privacy-first RAG stack for an internal AI search tool serving 20+ executive users; pitched the solution to a non-technical audience emphasizing data safety and document confidentiality",
      "Built a document ingestion pipeline (PDF, DOCX, XLSX) for chunking and embedding-based retrieval, integrated with PostgreSQL + pgvector for semantic search with citation-backed, document-restricted responses"
    ]
  },
  {
    id: 2,
    title: "Electrical Sub-team Member",
    organization: "UW Biomedical Engineering Society",
    location: "Waterloo, ON",
    date: "Oct. 2025 – Present",
    description: "Building EMG acquisition hardware and BLE firmware for an assistive knee brace.",
    skills: ["EMG Signal Acquisition", "ESP32", "BLE", "GATT", "Python"],
    achievements: [
      "Researched analog filtering techniques for EMG signal acquisition and supported circuit testing",
      "Programmed ESP32s to stream multi-channel EMG over BLE via custom GATT services for an assistive knee brace",
      "Built a Python BLE client with a GUI to stream, filter, and visualize live EMG signals; validated against expected muscle activation patterns and supported device testing"
    ]
  },
  {
    id: 4,
    title: "Treasurer",
    organization: "UW Pre-Med Club",
    location: "Waterloo, ON",
    date: "Sep. 2025 – Present",
    description: "Managing club finances and sponsorship funding for the UW Pre-Med Club.",
    skills: ["Budgeting", "Sponsorship", "Financial Management"],
    achievements: [
      "Managed budgeting, expense tracking, and financial documentation for club initiatives",
      "Secured $300 in funding through proposals and sponsorship outreach, representing 50% of the total funding allocated to science clubs",
      "Established partnerships with 3 external sponsors to support academic and club initiatives",
      "Led sponsorship outreach and academic funds proposals while coordinating event logistics for campus initiatives"
    ]
  }
];

export const volunteerExperience = [
  {
    id: 1,
    title: "Humanitarian Volunteer Abroad",
    organization: "Islamic Relief Canada - Türkiye Cohort 2",
    location: "Türkiye",
    date: "2025 - Present",
    description: "I'm joining this trip to support real humanitarian work on the ground while fundraising for long-term impact.",
    skills: ["Humanitarian Work", "Fundraising", "Project Planning"],
    achievements: [
      "Selected as a volunteer 'changemaker' for a 10-day field visit in Türkiye, learning directly from humanitarian projects and communities on the ground",
      "Will participate in fundraising and awareness campaigns to support long-term service projects in the region",
      "Completing pre-departure training (fundraising, humanitarian standards, field safety, country profile, and project planning) and contributing to a post-trip passion project"
    ]
  },
  {
    id: 2,
    title: "Student Mural Project Lead",
    organization: "Our London Family Unity Mural",
    location: "London, ON",
    date: "2023 - 2025",
    description: "I led this mural to help my school heal and come together after the 2021 London attack.",
    skills: ["Project Leadership", "Community Engagement", "Event Coordination"],
    achievements: [
      "Coordinated school approvals and partnered with a local artist to design and install a community mural promoting unity and remembrance following the June 6, 2021 Islamophobic attack in London, Ontario that killed four members of the Afzaal family",
      "Organized a thumbprint wall contribution where students added their prints to symbolize collective support, solidarity, and community healing"
    ]
  },
  {
    id: 3,
    title: "General Volunteer",
    organization: "Islamic Relief Canada",
    location: "London, ON",
    date: "2022 - 2024",
    description: "I volunteer to turn community events into real donations and support for families who need it most.",
    skills: ["Event Management", "Fundraising", "Customer Service"],
    achievements: [
      "Ramadan Marketplace: Engaged with customers to sell merchandise and solicit donations for Islamic Relief",
      "Run for Palestine: Managed event photography, social media content creation, and children's activities",
      "Fundraising dinners: Welcomed guests, managed seating, and coordinated children's registration and entertainment",
      "Donation collecting: Collected school supply donations and processed payments using card reader"
    ]
  }
];

export const education = [
  {
    id: 1,
    degree: "Bachelor of Applied Science - BASc, Biomedical Engineering",
    institution: "University of Waterloo",
    location: "Waterloo, ON",
    date: "May 2025 - Jun 2030",
    details: "President's Scholarship of Distinction"
  },
  {
    id: 2,
    degree: "High School Diploma, French Immersion",
    institution: "Sir Frederick Banting Secondary School",
    location: "London, ON",
    date: "Sep 2021 - Jun 2025",
    details: "Treasurer of Muslim Student Association | Member of DECA Team (Business Law and Ethics) | Peer Tutor for all Subjects | Project-Lead: Our London Family Mural"
  }
];

export const technicalSkills = [
  { category: "Languages", skills: ["Python", "C", "C++", "MATLAB", "JavaScript", "HTML", "CSS", "Flask"] },
  { category: "Tools", skills: ["SolidWorks", "KiCad", "ESP32", "Arduino", "Node.js", "Express", "React", "REST APIs", "Git/GitHub", "Gemini API", "ElevenLabs", "Cloudinary", "FFmpeg"] },
  { category: "Systems Knowledge", skills: ["EMG Signal Acquisition", "Analog Filtering", "PCB Layout", "Sensor Integration", "Iterative Prototyping", "Hardware-Software Integration", "Experimental Troubleshooting", "Human-Centered Design", "BLE"] },
  { category: "I speak...", skills: ["English (Fluent)", "Arabic (Proficient)", "French (DELF-B1)"] }
];
