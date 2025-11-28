"use client";

import { useState, useEffect } from "react";

type TabType = "blog" | "fieldnotes" | "projects" | "work";

interface BlogPostForm {
  title: string;
  subtitle: string;
  date: string;
  image: string; // Not used for upload, but kept for form state
  content: string;
}

interface FieldNoteForm {
  title: string;
  image: string;
  className: string;
}

interface ProjectForm {
  title: string;
  img: string;
  description: string;
  tech: string;
  github: string;
}

interface WorkForm {
  logo: string;
  company: string;
  position: string;
  location: string;
  dates: string;
  bullets: string;
  tags: string;
  category: "tech" | "business";
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("blog");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Blog form state
  const [blogForm, setBlogForm] = useState<BlogPostForm>({
    title: "",
    subtitle: "",
    date: "",
    image: "",
    content: "",
  });

  // Field Note form state
  const [fieldnoteForm, setFieldnoteForm] = useState<FieldNoteForm>({
    title: "",
    image: "",
    className: "absolute top-10 left-[20%] rotate-[-5deg]",
  });

  // Project form state
  const [projectForm, setProjectForm] = useState<ProjectForm>({
    title: "",
    img: "",
    description: "",
    tech: "",
    github: "",
  });

  // Work form state
  const [workForm, setWorkForm] = useState<WorkForm>({
    logo: "",
    company: "",
    position: "",
    location: "",
    dates: "",
    bullets: "",
    tags: "",
    category: "tech",
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setBlogForm((prev) => ({ ...prev, date: today }));
  }, []);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleBlogSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Step 1: Upload image first
      const imageInput = (e.target as HTMLFormElement).querySelector('input[type="file"]') as HTMLInputElement;
      if (!imageInput?.files || imageInput.files.length === 0) {
        showMessage("error", "Please select an image file");
        setLoading(false);
        return;
      }

      const imageFile = imageInput.files[0];
      let imageUrl = '';

      // Upload image
      const uploadFormData = new FormData();
      uploadFormData.append('file', imageFile);

      const uploadResponse = await fetch("/api/blog/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (!uploadResponse.ok) {
        const uploadError = await uploadResponse.json().catch(() => ({ error: "Upload failed" }));
        showMessage("error", uploadError.error || "Failed to upload image");
        setLoading(false);
        return;
      }

      const uploadData = await uploadResponse.json();
      imageUrl = uploadData.url;

      // Step 2: Create blog post with image URL
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: blogForm.title,
          subtitle: blogForm.subtitle,
          date: blogForm.date,
          image: imageUrl,
          content: blogForm.content,
        }),
      });

      if (response.ok) {
        showMessage("success", "Blog post created successfully! Content saved as markdown file.");
        setBlogForm({
          title: "",
          subtitle: "",
          date: new Date().toISOString().split("T")[0],
          image: "",
          content: "",
        });
        // Reset file input
        if (imageInput) {
          imageInput.value = '';
        }
      } else {
        const data = await response.json().catch(() => ({ error: "Unknown error" }));
        const errorMsg = data.error || `Failed to create blog post (Status: ${response.status})`;
        console.error("Blog post creation failed:", errorMsg, data);
        showMessage("error", errorMsg);
      }
    } catch (error: any) {
      console.error("Blog post creation error:", error);
      showMessage("error", `Failed to create blog post: ${error.message || "Network error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldnoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/fieldnotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fieldnoteForm),
      });

      if (response.ok) {
        showMessage("success", "Field note created successfully!");
        setFieldnoteForm({
          title: "",
          image: "",
          className: "absolute top-10 left-[20%] rotate-[-5deg]",
        });
      } else {
        const data = await response.json();
        showMessage("error", data.error || "Failed to create field note");
      }
    } catch (error) {
      showMessage("error", "Failed to create field note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectForm),
      });

      if (response.ok) {
        showMessage("success", "Project created successfully!");
        setProjectForm({
          title: "",
          img: "",
          description: "",
          tech: "",
          github: "",
        });
      } else {
        const data = await response.json();
        showMessage("error", data.error || "Failed to create project");
      }
    } catch (error) {
      showMessage("error", "Failed to create project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleWorkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const bulletsArray = workForm.bullets.split("\n").filter(b => b.trim());
      const tagsArray = workForm.tags.split(",").map(t => t.trim()).filter(t => t);

      const response = await fetch("/api/work", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...workForm,
          bullets: bulletsArray,
          tags: tagsArray,
        }),
      });

      if (response.ok) {
        showMessage("success", "Work item created successfully!");
        setWorkForm({
          logo: "",
          company: "",
          position: "",
          location: "",
          dates: "",
          bullets: "",
          tags: "",
          category: "tech",
        });
      } else {
        const data = await response.json();
        showMessage("error", data.error || "Failed to create work item");
      }
    } catch (error) {
      showMessage("error", "Failed to create work item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin";
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: "blog", label: "Blog Posts" },
    { id: "fieldnotes", label: "Field Notes" },
    { id: "projects", label: "Projects" },
    { id: "work", label: "Work" },
  ];

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

      {/* Tabs */}
      <div className="px-[clamp(1rem,4vw,4rem)] py-4 border-b border-white/10">
        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-white/20 text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-[clamp(1rem,4vw,4rem)] py-12 max-w-2xl mx-auto">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
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

          {/* Blog Form */}
          {activeTab === "blog" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Add New Blog Post</h2>
              <form onSubmit={handleBlogSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm mb-2">Title *</label>
                  <input
                    type="text"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Subtitle *</label>
                  <input
                    type="text"
                    value={blogForm.subtitle}
                    onChange={(e) => setBlogForm({ ...blogForm, subtitle: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Date *</label>
                  <input
                    type="date"
                    value={blogForm.date}
                    onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Image *</label>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white/20 file:text-white hover:file:bg-white/30 focus:outline-none focus:border-white/40"
                    required
                  />
                  <p className="text-xs text-white/50 mt-2">
                    Accepted formats: JPEG, PNG, WebP, GIF
                  </p>
                </div>
                <div>
                  <label className="block text-sm mb-2">Content (Markdown) *</label>
                  <textarea
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    rows={12}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 font-mono text-sm"
                    placeholder="Write your blog post content in Markdown format..."
                    required
                  />
                  <p className="text-xs text-white/50 mt-2">
                    Content will be saved as a numbered markdown file (e.g., 01.md, 02.md)
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  {loading ? "Creating..." : "Create Blog Post"}
                </button>
              </form>
            </>
          )}

          {/* Field Notes Form */}
          {activeTab === "fieldnotes" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Add New Field Note</h2>
              <form onSubmit={handleFieldnoteSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm mb-2">Title *</label>
                  <input
                    type="text"
                    value={fieldnoteForm.title}
                    onChange={(e) => setFieldnoteForm({ ...fieldnoteForm, title: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Image URL *</label>
                  <input
                    type="url"
                    value={fieldnoteForm.image}
                    onChange={(e) => setFieldnoteForm({ ...fieldnoteForm, image: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">CSS Class (positioning)</label>
                  <input
                    type="text"
                    value={fieldnoteForm.className}
                    onChange={(e) => setFieldnoteForm({ ...fieldnoteForm, className: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    placeholder="absolute top-10 left-[20%] rotate-[-5deg]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  {loading ? "Creating..." : "Create Field Note"}
                </button>
              </form>
            </>
          )}

          {/* Projects Form */}
          {activeTab === "projects" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Add New Project</h2>
              <form onSubmit={handleProjectSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm mb-2">Title *</label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Image URL *</label>
                  <input
                    type="url"
                    value={projectForm.img}
                    onChange={(e) => setProjectForm({ ...projectForm, img: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Description *</label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Tech Stack *</label>
                  <input
                    type="text"
                    value={projectForm.tech}
                    onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    placeholder="Python, Next.js, React"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">GitHub URL (optional)</label>
                  <input
                    type="url"
                    value={projectForm.github}
                    onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  {loading ? "Creating..." : "Create Project"}
                </button>
              </form>
            </>
          )}

          {/* Work Form */}
          {activeTab === "work" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Add New Work Item</h2>
              <form onSubmit={handleWorkSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm mb-2">Company Logo URL *</label>
                  <input
                    type="url"
                    value={workForm.logo}
                    onChange={(e) => setWorkForm({ ...workForm, logo: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Company *</label>
                  <input
                    type="text"
                    value={workForm.company}
                    onChange={(e) => setWorkForm({ ...workForm, company: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Position *</label>
                  <input
                    type="text"
                    value={workForm.position}
                    onChange={(e) => setWorkForm({ ...workForm, position: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Location</label>
                  <input
                    type="text"
                    value={workForm.location}
                    onChange={(e) => setWorkForm({ ...workForm, location: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Dates *</label>
                  <input
                    type="text"
                    value={workForm.dates}
                    onChange={(e) => setWorkForm({ ...workForm, dates: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    placeholder="Aug 2025 – Present"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Bullets (one per line)</label>
                  <textarea
                    value={workForm.bullets}
                    onChange={(e) => setWorkForm({ ...workForm, bullets: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    placeholder="Enter bullet points, one per line"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={workForm.tags}
                    onChange={(e) => setWorkForm({ ...workForm, tags: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    placeholder="Machine Learning, NLP, Python"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Category *</label>
                  <select
                    value={workForm.category}
                    onChange={(e) => setWorkForm({ ...workForm, category: e.target.value as "tech" | "business" })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                    required
                  >
                    <option value="tech">Tech & STEM</option>
                    <option value="business">Business & Leadership</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  {loading ? "Creating..." : "Create Work Item"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
