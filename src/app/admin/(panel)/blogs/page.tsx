"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Blog } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE_TYPE } from "@/lib/siteConfig";
const LIMIT = 20;

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function load(targetPage: number, query: string) {
    setLoading(true);
    const params = new URLSearchParams({ limit: String(LIMIT), page: String(targetPage), siteType: SITE_TYPE });
    if (query) params.set("search", query);
    const data = await api.get(`/admin/blogs?${params.toString()}`);
    setBlogs(data.blogs || []);
    setTotalPages(data.pagination?.pages || 1);
    setLoading(false);
  }

  useEffect(() => {
    load(page, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    load(1, search);
  }

  async function handleDelete(id: string) {
    if (!confirm("Yeh blog delete karna hai?")) return;
    setDeletingId(id);
    await api.delete(`/admin/blogs/${id}`);
    setBlogs((prev) => prev.filter((b) => b._id !== id));
    setDeletingId(null);
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Content
          </p>
          <h1 className="text-xl font-bold sm:text-2xl">Blogs</h1>
        </div>
        <Link
          href="/admin/blogs/new"
          className={cn(buttonVariants(), "w-full sm:w-auto")}
        >
          + New blog
        </Link>
      </div>

      <form onSubmit={handleSearchSubmit} className="mb-5 flex gap-2">
        <Input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm sm:max-w-sm"
        />
        <Button type="submit" variant="outline" className="shrink-0">
          Search
        </Button>
      </form>

      <Card className="p-4 sm:p-5">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : blogs.length === 0 ? (
          <p className="text-sm text-muted-foreground">No blog found.</p>
        ) : (
          <>
            {/* Card list on mobile */}
            <div className="flex flex-col gap-3 sm:hidden">
              {blogs.map((blog) => (
                <div key={blog._id} className="rounded-lg border p-3">
                  <p className="mb-1.5 text-sm font-medium leading-snug">
                    {blog.title}
                  </p>
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Badge
                      variant={blog.status === "published" ? "success" : "default"}
                    >
                      {blog.status}
                    </Badge>
                    <span>{blog.category}</span>
                    <span className="font-mono">{blog.views} views</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/blogs/${blog._id}/edit`}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "flex-1",
                      )}
                    >
                      Edit
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      disabled={deletingId === blog._id}
                      onClick={() => handleDelete(blog._id)}
                    >
                      {deletingId === blog._id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b text-left text-xs uppercase text-muted-foreground">
                    <th className="pb-2">Title</th>
                    <th className="pb-2">Category</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Views</th>
                    <th className="pb-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog._id} className="border-b last:border-0">
                      <td className="max-w-[280px] truncate py-2.5">
                        {blog.title}
                      </td>
                      <td className="py-2.5">{blog.category}</td>
                      <td className="py-2.5">
                        <Badge
                          variant={blog.status === "published" ? "success" : "default"}
                        >
                          {blog.status}
                        </Badge>
                      </td>
                      <td className="py-2.5 font-mono text-xs">{blog.views}</td>
                      <td className="flex justify-end gap-2 py-2.5">
                        <Link
                          href={`/admin/blogs/${blog._id}/edit`}
                          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                        >
                          Edit
                        </Link>
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={deletingId === blog._id}
                          onClick={() => handleDelete(blog._id)}
                        >
                          {deletingId === blog._id ? "Deleting..." : "Delete"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm sm:justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  ← Prev
                </Button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next →
                </Button>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}