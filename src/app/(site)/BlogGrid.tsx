"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CalendarDays, User } from "lucide-react";
import { api } from "@/lib/api";
import { Blog } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SITE_TYPE } from "@/lib/siteConfig";

export default function BlogGrid({
  limit = 9,
  showSearch = true,
  category,
}: {
  limit?: number;
  showSearch?: boolean;
  category?: string;
}) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function load(targetPage: number, query: string) {
    setLoading(true);
    const params = new URLSearchParams({
      limit: String(limit),
      page: String(targetPage),
    });
    if (query) params.set("search", query);
    if (category) params.set("category", category);
    params.set("siteType", SITE_TYPE);
    try {
      const data = await api.get(`/blogs?${params.toString()}`);
      setBlogs(data.blogs || []);
      setTotalPages(data.pagination?.pages || 1);
    } catch {
      setBlogs([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(page, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category]);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    load(1, search);
  }

  return (
    <div>
      {showSearch && (
        <form onSubmit={handleSearchSubmit} className="mb-10 flex gap-2">
          <Input
            placeholder="Search in blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm shadow-sm"
          />
          <Button type="submit" variant="outline">
            Search
          </Button>
        </form>
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: limit > 6 ? 6 : limit }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="aspect-video w-full bg-secondary" />
              <div className="space-y-3 p-5">
                <div className="h-3 w-1/3 rounded bg-secondary" />
                <div className="h-4 w-3/4 rounded bg-secondary" />
                <div className="h-3 w-full rounded bg-secondary" />
              </div>
            </div>
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center">
          <p className="text-sm text-muted-foreground">No blogs found.</p>{" "}
        </div>
      ) : (
        <>
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {blogs.map((blog, i) => (
                <motion.div
                  key={blog._id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.35,
                    delay: i * 0.05,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -6 }}
                >
                  <Card className="group flex h-full flex-col overflow-hidden shadow-sm transition-shadow hover:shadow-soft">
                    <div className="relative aspect-video w-full overflow-hidden bg-secondary">
                      {blog.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-serif text-3xl text-primary/30">
                          Blogs
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <Badge className="mb-3 w-fit">{blog.category}</Badge>
                      <h3 className="mb-2 font-serif text-lg leading-snug">
                        <Link
                          href={`/blogs/${blog.slug}`}
                          className="transition-colors hover:text-primary"
                        >
                          {blog.title}
                        </Link>
                      </h3>
                      <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5" />
                          {blog.author?.name || "Admin"}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                      >
                        Read more
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-4 text-sm">
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
    </div>
  );
}
