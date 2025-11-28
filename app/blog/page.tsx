"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/types";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch blog posts:", error);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }).toUpperCase();
  };

  return (
    <main className="min-h-screen bg-[#0a4d5c] text-white">
      {/* Navigation */}
      <nav className="px-[clamp(1rem,4vw,4rem)] py-6 border-b border-white/10">
        <div className="flex gap-6 items-center">
          <Link href="/" className="hover:underline text-sm">Profile</Link>
          <Link href="/blog" className="hover:underline text-sm font-semibold">Blog</Link>
          <Link 
            href="https://github.com/zelaneroz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline text-sm"
          >
            Github
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="px-[clamp(1rem,4vw,4rem)] py-12">
        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl mb-4">No blog posts yet.</p>
            <Link href="/admin" className="text-white/70 hover:underline">
              Add your first post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative w-full h-48 bg-gray-800">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 text-white">
                    {post.title}
                  </h2>
                  <p className="text-sm text-white/70 mb-4">{post.subtitle}</p>
                  <p className="text-xs text-green-400">{formatDate(post.date)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

