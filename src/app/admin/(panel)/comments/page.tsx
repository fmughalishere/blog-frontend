"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Comment } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE_TYPE } from "@/lib/siteConfig";
export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [actingId, setActingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const data = await api.get(`/admin/comments?status=pending&siteType=${SITE_TYPE}`);
    setComments(data.comments || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function act(id: string, status: "approved" | "rejected") {
    setActingId(id);
    await api.patch(`/admin/comments/${id}`, { status });
    setComments((prev) => prev.filter((c) => c._id !== id));
    setActingId(null);
  }

  return (
    <div>
      <div className="mb-6">
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Moderation
        </p>
        <h1 className="text-xl font-bold sm:text-2xl">Pending comments</h1>
      </div>

      <Card className="p-4 sm:p-5">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No pending comments. All clear.
          </p>
        ) : (
          <ul className="space-y-3 sm:space-y-4">
            {comments.map((c) => (
              <li
                key={c._id}
                className="rounded-md border border-border p-3 sm:p-4"
              >
                <div className="mb-2 flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-2">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-bold text-foreground">
                      {c.user?.name}
                    </span>
                    <span className="min-w-0 truncate">
                      on{" "}
                      <Link
                        href={`/blogs/${c.blog?.slug}`}
                        className="text-primary"
                      >
                        {c.blog?.title}
                      </Link>
                    </span>
                  </div>
                  <span className="font-mono sm:ml-auto">
                    {new Date(c.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="mb-3 break-words text-sm">{c.content}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 sm:flex-none"
                    disabled={actingId === c._id}
                    onClick={() => act(c._id, "approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="flex-1 sm:flex-none"
                    disabled={actingId === c._id}
                    onClick={() => act(c._id, "rejected")}
                  >
                    Reject
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}