"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/card";
import BlogForm from "../../BlogForm";

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [initialValues, setInitialValues] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get(`/admin/blogs/${id}`)
      .then((data) => {
        setInitialValues({ ...data.blog, tags: (data.blog.tags || []).join(", ") });
      })
      .catch(() => setNotFound(true));
  }, [id]);

  async function handleSubmit(values: any) {
    setError("");
    setLoading(true);
    try {
      await api.put(`/admin/blogs/${id}`, values);
      router.push("/admin/blogs");
    } catch (err: any) {
      setError(err.message || "Update nahi hua.");
    } finally {
      setLoading(false);
    }
  }

  if (notFound) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-4 text-center">
        <p className="text-sm text-muted-foreground">Blog nahi mila.</p>
      </div>
    );
  }

  if (!initialValues) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-4 text-center">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Content
        </p>
        <h1 className="text-xl font-bold sm:text-2xl">Edit blog</h1>
      </div>
      <Card className="p-4 sm:p-6">
        <BlogForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          submitLabel="Save changes"
        />
      </Card>
    </div>
  );
}