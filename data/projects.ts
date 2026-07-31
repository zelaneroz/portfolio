export type ProjectCard = {
  id: string;
  title: string;
  date: string;
  tags: string;
  blurb: string;
  image: string;
  link: string;
};

export const projectCards: ProjectCard[] = [
{
  id: "kpmg-energy",
  title: "Energy Penalty Analysis for AI Inference",
  date: "(c. 2025)",
  tags: "Python, NLP, Energy Modeling, GPU Parallelism, ML Optimization",
  blurb:
    "Analyzed trade-off between speed, GPU parallelism, and energy cost. Quantified that scaling GPUs for faster inference increases energy use by up to 55%, giving KPMG a clearer framework for evaluating when performance gains justify added compute.",
  image: "/logos/kpmg.png",
  link: "https://github.com/zelaneroz/kpmg_1c_2025",
},
{
  id: "kincare",
  title: "KinCare",
  date: "(c. 2026)",
  tags: "SwiftUI, LLMs, RAG, Human-Centered AI",
  blurb:
    "Built an AI caregiving copilot that transforms fragmented family updates, care routines, and patient needs into actionable coordination support. Focused on context-aware assistance, reduced caregiver burden, and AI that fits into real family care workflows.",
  image: "/projects/kincare.png",
  link: "https://github.com/zelaneroz/KinCare",
},
{
  id: "baybai",
  title: "Baybai",
  date: "(c. 2023)",
  tags: "Python, Flask, Kivy, SQLite, Full-Stack Development",
  blurb:
    "My first full-stack project (2023): Baybayin is a pre-colonial Philippine writing system that is no longer widely used, and this simple but meaningful project was my first attempt at turning cultural inspiration into a working end-to-end application. Tested by 35 users.",
  image: "/projects/baybai.png",
  link: "https://github.com/zelaneroz/IB-CSHL-2024/tree/main/IA-Baybai",
},
  {
    id: "limit-order-book",
    title: "C++ Limit Order Book",
    date: "(c. 2026)",
    tags: "C++, Data Structures, Finance",
    blurb:
      "Implemented a limit order book in C++ to model matching logic, order flow, and market data structures.",
    image: "/projects/markets.webp",
    link: "https://github.com/zelaneroz/cpp-limit-order-book",
  },
{
  id: "my24",
  title: "My24",
  date: "(c. 2026)",
  tags: "Swift, SwiftUI, iOS Development, Data Visualization, UX Design",
  blurb:
    "Do you know where your 24 hours go? Designed simple logging and visual breakdowns to help users spot patterns in how they spend their day.",
  image: "/projects/my24.png",
  link: "https://github.com/zelaneroz/my24",
},
    {
    id: "cwru-women-feature",
    title: "Powering progress: Women driving science at CWRU",
    date: "(c. 2026)",
    tags: "Feature, CWRU, Women in STEM",
    blurb:
      "Featured by CWRU for International Women and Girls in Science Day 2026.",
    image: "/projects/cwru-women.jpg",
    link: "https://case.edu/news/powering-progress-women-driving-science-cwru?utm_source=sfmc&utm_medium=email&utm_campaign=thedaily_people",
  },
  {
    id: "west-side-market-feature",
    title: "Weatherhead students collaborate with iconic Cleveland market hub",
    date: "(c. 2024)",
    tags: "Feature, Data Analytics, Business Strategy",
    blurb:
      "Featured for work with the West Side Market on market strategy, customer insights, and renovation-related recommendations.",
    image: "/projects/wsm.avif",
    link: "https://case.edu/news/weatherhead-students-collaborate-iconic-cleveland-market-hub",
  },
      {
  id: "extended-essay",
  title: "EEG Signal Denoising Study",
  date: "(c. 2024)",
  tags: "Python, EEG, Signal Processing, Time Series, ICA, EMD",
  blurb:
    "Compared ICA and EMD for denoising simulated EEG time series, studying how stochastic and deterministic algorithms remove artifacts from electroencephalogram signals. This was my IB Computer Science extended essay: an early independent research project in signal processing and computational experimentation.",
  image: "/projects/ee.png",
  link: "https://github.com/zelaneroz/IB-CSHL-2024/tree/main/Extended-Essay",
},
  {
  id: "fish2meta",
  title: "Prism Adaptation Motor Learning Study",
  date: "(c. 2023)",
  tags: "Python, NumPy, SciPy, Matplotlib, Signal Analysis, Research",
  blurb:
    "Analyzed prism-adaptation experiments with 40+ participants to test whether motor learning transfers between different throwing movements. Led the Python pipeline for cleaning displacement data, visualizing adaptation patterns, and fitting exponential decay curves to estimate error-correction behavior.",
  image: "/projects/fish2meta.png",
  link: "https://github.com/zelaneroz/fish2meta",
}
];