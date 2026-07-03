"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Blog } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE_TYPE } from "@/lib/siteConfig";
export default function DashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    pending: 0,
  });
  const [recent, setRecent] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [allBlogs, published, draft, pendingComments] = await Promise.all([
        api.get(`/admin/blogs?limit=${SITE_TYPE}`),
        api.get(`/admin/blogs?status=published&limit=${SITE_TYPE}`),
        api.get(`/admin/blogs?status=draft&limit=${SITE_TYPE}`),
        api.get("/admin/comments?status=pending"),
      ]);

      setStats({
        total: allBlogs.pagination?.total || 0,
        published: published.pagination?.total || 0,
        draft: draft.pagination?.total || 0,
        pending: pendingComments.comments?.length || 0,
      });
      setRecent(allBlogs.blogs || []);
      setLoading(false);
    }
    load();
  }, []);

  const cards = [
    { label: "Total blogs", value: stats.total },
    { label: "Published", value: stats.published },
    { label: "Drafts", value: stats.draft },
    { label: "Pending comments", value: stats.pending, alert: true },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Overview
          </p>
          <h1 className="text-xl font-bold sm:text-2xl">Dashboard</h1>
        </div>
        <Link
          href="/admin/blogs/new"
          className={cn(buttonVariants(), "w-full sm:w-auto")}
        >
          + New blog
        </Link>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4">
        {cards.map((c) => (
          <Card
            key={c.label}
            className={cn(
              "p-3 sm:p-4",
              c.alert && stats.pending > 0 && "border-amber-400 bg-amber-50",
            )}
          >
            <span className="mb-1.5 block text-[11px] leading-tight text-muted-foreground sm:mb-2 sm:text-xs">
              {c.label}
            </span>
            <span className="font-mono text-xl font-bold sm:text-2xl">
              {loading ? "—" : String(c.value).padStart(3, "0")}
            </span>
          </Card>
        ))}
      </div>

      <Card className="p-4 sm:p-5">
        <h2 className="mb-3 text-sm font-bold">Recent blogs</h2>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : recent.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No blogs yet.{" "}
            <Link href="/admin/blogs/new" className="font-bold text-primary">
              Write your first blog →
            </Link>
          </p>
        ) : (
          <>
            <div className="flex flex-col gap-3 sm:hidden">
              {recent.map((b) => (
                <div
                  key={b._id}
                  className="rounded-lg border p-3 last:mb-0"
                >
                  <p className="mb-2 text-sm font-medium leading-snug">
                    {b.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        b.status === "published" ? "success" : "default"
                      }
                    >
                      {b.status}
                    </Badge>
                    <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                      <span>{b.views} views</span>
                      <span>
                        {new Date(b.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="border-b text-left text-xs uppercase text-muted-foreground">
                    <th className="pb-2">Title</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Views</th>
                    <th className="pb-2">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((b) => (
                    <tr key={b._id} className="border-b last:border-0">
                      <td className="max-w-[240px] truncate py-2.5">
                        {b.title}
                      </td>
                      <td className="py-2.5">
                        <Badge
                          variant={
                            b.status === "published" ? "success" : "default"
                          }
                        >
                          {b.status}
                        </Badge>
                      </td>
                      <td className="py-2.5 font-mono text-xs">{b.views}</td>
                      <td className="py-2.5 font-mono text-xs">
                        {new Date(b.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}