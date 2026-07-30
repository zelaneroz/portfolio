export type ExperienceCategory =
  | "technical"
  | "community"
  | "research";

export type ExperienceItem = {
  id: string;
  org: string;
  role: string;

  startDate: string;
  endDate?: string;

  location?: string;
  description: string;

  tags?: string[];
  logo?: string;
  initials?: string;

  category: ExperienceCategory;

  /**
   * Controls whether this experience appears on the website.
   */
  show: boolean;

  /**
   * Lower numbers appear first within their category.
   */
  order?: number;
};

export const experiences: ExperienceItem[] = [
  // =========================================================
  // TECHNICAL EXPERIENCE
  // =========================================================

  {
    id: "issacs",
    org: "ISSACS Professional Services Group",
    role: "Developer",
    startDate: "May 2026",
    endDate: "Present",
    location: "Cleveland, OH",
    description:
      "Developing AI agents that review budgets proposals and spreadsheets for NIH grants & adapt to solicitation-specific requirements.",
    tags: ["AI Agents", "CI/CD","Python"],
    logo: "/logos/neosmart.avif",
    initials: "IS",
    category: "technical",
    show: true,
    order: 1,
  },

  {
    id: "kpmg",
    org: "MIT AI Alignment Initiative",
    role: "AI Safety Fellow",
    startDate: "July 2026",
    endDate: "May 2026",
    location: "Remote",
    description:
      "8-week program covering technical and governance aspects of AI safety including alignment, interpretability, and threat models.",
    tags: ["Responsible AI"],
    logo: "/logos/maia.svg",
    initials: "K",
    category: "technical",
    show: true,
    order: 2,
  },

  {
    id: "kpmg",
    org: "KPMG",
    role: "AI/ML Fellow",
    startDate: "Aug 2025",
    endDate: "Dec 2025",
    location: "Remote",
    description:
      "ML+Data pipelines for estimating energy demand and routing tasks toward more efficient models.",
    tags: ["PyTorch", "NLP","HuggingFace"],
    logo: "/logos/kpmg.png",
    initials: "K",
    category: "technical",
    show: true,
    order: 3,
  },
  {
  id: "wsm",
  org: "West Side Market",
  role: "Analyst",
  startDate: "Aug 2025",
  endDate: "Dec 2025",
  location: "Cleveland, OH",
  description:
    "Mapped basket-size opportunities across Cleveland, develop customer personas, and tailor operational changes supporting the market’s $7M renovation.",
  tags: [
    "Machine Learning",
    "Data Visualization",
    "Customer Segmentation"
  ],
  logo: "/logos/wsm.jpeg",
  initials: "WSM",
  category: "technical",
  show: true,
  order: 4,
},

  {
    id: "cwru-ta",
    org: "CWRU Department of Computer Science",
    role: "Teaching Assistant, Data Structures",
    startDate: "Jan 2025",
    endDate: "Dec 2025",
    location: "Cleveland, OH",
    description:
      "150+ students. Started freshman year, youngest in the team.",
    tags: ["Data Structures", "Teaching"],
    logo: "/logos/cwru.jpeg",
    initials: "C",
    category: "technical",
    show: true,
    order: 5,
  },

  // =========================================================
  // COMMUNITY & LEADERSHIP
  // =========================================================

  {
    id: "hackcwru",
    org: "HackCWRU",
    role: "Marketing Chair",
    startDate: "2026",
    endDate: "Present",
    location: "Cleveland, OH",
    description:
      "Leading full revamp and creative strategy of CWRU's biggest hackathon.",
    tags: ["Video Editing", "Graphic Design", "Social Media Strategy"],
    logo: "/logos/hackcwru.png",
    initials: "H",
    category: "community",
    show: true,
    order: 1,
  },

  {
    id: "phi-mu",
    org: "Phi Mu Fraternity",
    role: "Alumni Relations Chair",
    startDate: "2026",
    endDate: "Present",
    location: "Cleveland, OH",
    description:
      "Strengthening communication and relationships between current members and the chapter's broader alumni community.",
    tags: ["Community", "Communications"],
    logo: "/logos/phimu.png",
    initials: "ΦM",
    category: "community",
    show: true,
    order: 2,
  },

  {
    id: "uwc",
    org: "UWC Philippines",
    role: "Finance Committee",
    startDate: "Aug 2025",
    endDate: "Present",
    location: "Remote",
    description:
      "Supporting the national committee responsible for expanding access to the United World College movement for Filipino students.",
    tags: ["Education Access", "Finance", "Service"],
    logo: "/logos/uwcph.jpeg",
    initials: "U",
    category: "community",
    show: true,
    order: 3,
  },

  {
    id: "career-center",
    org: "CWRU Career Center",
    role: "Career Consulting Intern",
    startDate: "Nov 2024",
    endDate: "Dec 2025",
    location: "Cleveland, OH",
    description:
      "Developing career resources and communications for students pursuing opportunities in engineering, technology, and data.",
    tags: ["Career Education", "Writing", "Student Support"],
    logo: "/logos/cwru.jpeg",
    initials: "C",
    category: "community",
    show: true,
    order: 4,
  },

  // =========================================================
  // RESEARCH
  // =========================================================

  {
    id: "algoverse",
    org: "Algoverse",
    role: "Researcher",
    startDate: "Jul 2026",
    endDate: "Present",
    location: "Remote",
    description:
      "Investigated sycophancy in multimodal large language models by designing multi-turn experimental conditions, evaluation pipelines, and benchmark-based comparisons.",
    tags: ["LLM Sycophancy", "Multimodal Models", "Evaluation"],
    logo: "/logos/algoverse.jpeg",
    initials: "A",
    category: "research",
    show: true,
    order: 1,
  },

  {
    id: "biswas-lab",
    org: "Nanyang Technological University",
    role: "Research Assistant",
    startDate: "Feb 2026",
    endDate: "May 2026",
    location: "Singapore",
    description:
      "Sycophancy in LLMs",
    tags: ["NLP", "LLMs", "Healthcare AI", "Fairness"],
    logo: "/logos/ntu.png",
    initials: "UH",
    category: "research",
    show: true,
    order: 3,
  },

  {
    id: "biswas-lab",
    org: "University Hospitals x Biswas Lab",
    role: "Research Assistant",
    startDate: "Sep 2025",
    endDate: "Jan 2026",
    location: "Cleveland, OH",
    description:
      "Developing reproducible NLP pipelines for detecting intimate partner violence in clinical data while examining fairness, bias, and deployment considerations.",
    tags: ["NLP", "LLMs", "Healthcare AI", "Fairness"],
    logo: "/logos/university-hospitals.jpg",
    initials: "UH",
    category: "research",
    show: true,
    order: 3,
  },

  {
    id: "fish2meta",
    org: "Fish2Meta",
    role: "Researcher",
    startDate: "Sep 2022",
    endDate: "Jan 2024",
    location: "Karuizawa, Japan",
    description:
      "Investigate the neural mechanisms underlying motor control and learning.",
    tags: [],
    logo: "/logos/fish2meta.png",
    initials: "C",
    category: "research",
    show: true,
    order: 4,
  },
];