export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  markdownFile?: string; // e.g., "01.md", "02.md"
  content?: string; // Used when fetching, populated from markdown file
  createdAt: string;
}

