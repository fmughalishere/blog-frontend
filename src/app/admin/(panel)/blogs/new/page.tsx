"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/card";
import BlogForm from "../BlogForm";

export default function NewBlogPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values: any) {
    setError("");
    setLoading(true);
    try {
      await api.post("/admin/blogs", values);
      router.push("/admin/blogs");
    } catch (err: any) {
      setError(err.message || "Blog create nahi hua.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">Content</p>
        <h1 className="text-2xl font-bold">New blog</h1>
      </div>
      <Card className="p-6">
        <BlogForm onSubmit={handleSubmit} loading={loading} error={error} submitLabel="Publish blog" />
      </Card>
    </div>
  );
}
