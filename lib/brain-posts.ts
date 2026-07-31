import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import type { BrainPostType } from "../data/blog-config";

const postsDirectory = path.join(process.cwd(), "data/blog");

export type BrainPost = {
  title: string;
  slug: string;
  date: string;
  type: BrainPostType;
  tags: string[];
  excerpt: string;
  published: boolean;
  contentHtml: string;
};

export async function getAllBrainPosts(): Promise<BrainPost[]> {
  if (!fs.existsSync(postsDirectory)) {
    console.warn("Blog folder not found:", postsDirectory);
    return [];
  }

  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"));

  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      const processedContent = await remark().use(html).process(content);
      const contentHtml = processedContent.toString();

      return {
        title: data.title,
        slug: data.slug,
        date: data.date,
        type: data.type,
        tags: data.tags ?? [],
        excerpt: data.excerpt ?? "",
        published: data.published ?? false,
        contentHtml,
      } as BrainPost;
    })
  );

  return posts
    .filter((post) => post.published)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}