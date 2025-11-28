"use client";

import { useState, useEffect } from "react";

interface BlogPostForm {
  title: string;
  subtitle: string;
  date: string;
  image: string;
  content: string;
}

export default function AdminDashboard() {
  const [formData, setFormData] = useState<BlogPostForm>({
    title: "",
    subtitle: "",
    date: "",
    image: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    // Set default date to current date
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, date: today }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Blog post created successfully!" });
        // Reset form
        setFormData({
          title: "",
          subtitle: "",
          date: new Date().toISOString().split("T")[0],
          image: "",
          content: "",
        });
        // Clear message after 3 seconds
        setTimeout(() => setMessage(null), 3000);
      } else {
        const data = await response.json();
        setMessage({ type: "error", text: data.error || "Failed to create blog post" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to create blog post. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin";
  };

  return (
    <main className="min-h-screen bg-[#0a4d5c] text-white">
      {/* Header */}
      <nav className="px-[clamp(1rem,4vw,4rem)] py-6 border-b border-white/10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-4 items-center">
            <a href="/blog" className="text-sm hover:underline">View Blog</a>
            <button
              onClick={handleLogout}
              className="text-sm hover:underline text-white/70"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Form */}
      <div className="px-[clamp(1rem,4vw,4rem)] py-12 max-w-2xl mx-auto">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
          <h2 className="text-2xl font-bold mb-6">Add New Blog Post</h2>

          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-500/20 text-green-300"
                  : "bg-red-500/20 text-red-300"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm mb-2">
                Title *
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                placeholder="Enter blog post title"
                required
              />
            </div>

            <div>
              <label htmlFor="subtitle" className="block text-sm mb-2">
                Subtitle *
              </label>
              <input
                id="subtitle"
                type="text"
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData({ ...formData, subtitle: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                placeholder="Enter subtitle"
                required
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm mb-2">
                Date *
              </label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                required
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm mb-2">
                Image URL *
              </label>
              <input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm mb-2">
                Content (optional)
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={6}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                placeholder="Enter blog post content"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              {loading ? "Creating..." : "Create Blog Post"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

