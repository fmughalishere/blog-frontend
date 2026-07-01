"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Props {
  initialValues?: {
    title?: string;
    excerpt?: string;
    content?: string;
    coverImage?: string;
    category?: string;
    tags?: string;
    status?: string;
  };
  onSubmit: (values: any) => void;
  loading?: boolean;
  error?: string;
  submitLabel?: string;
}

const CATEGORIES = [
  "Personality and Mood Captions",
  "Relationship Captions",
  "Food and Lifestyle Captions",
  "Travel and Nature Captions",
  "Events and Special Captions",
];

export default function BlogForm({ initialValues, onSubmit, loading, error, submitLabel = "Save" }: Props) {
  const [form, setForm] = useState({
    title: initialValues?.title || "",
    excerpt: initialValues?.excerpt || "",
    content: initialValues?.content || "",
    coverImage: initialValues?.coverImage || "",
    category: initialValues?.category || CATEGORIES[0],
    tags: initialValues?.tags || "",
    status: initialValues?.status || "published",
  });

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-semibold">Title</label>
        <Input value={form.title} onChange={(e) => update("title", e.target.value)} required />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold">Category</label>
          <select
            className="h-10 w-full rounded-md border border-input bg-card px-3 text-sm"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold">Status</label>
          <select
            className="h-10 w-full rounded-md border border-input bg-card px-3 text-sm"
            value={form.status}
            onChange={(e) => update("status", e.target.value)}
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold">Cover image URL</label>
        <Input
          value={form.coverImage}
          onChange={(e) => update("coverImage", e.target.value)}
          placeholder="https://..."
        />
        {form.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={form.coverImage}
            alt="Cover preview"
            className="mt-2 h-32 w-full rounded-md border border-input object-cover sm:h-40"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold">Tags (comma separated)</label>
        <Input
          value={form.tags}
          onChange={(e) => update("tags", e.target.value)}
          placeholder="nextjs, mongodb, tutorial"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold">Excerpt</label>
        <Textarea rows={2} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} required />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold">Content</label>
        <Textarea
          rows={10}
          className="font-mono text-sm sm:rows-14"
          value={form.content}
          onChange={(e) => update("content", e.target.value)}
          required
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}