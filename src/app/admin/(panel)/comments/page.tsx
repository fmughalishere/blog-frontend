"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Comment } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [actingId, setActingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const data = await api.get("/admin/comments?status=pending");
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
        <h1 className="text-2xl font-bold">Pending comments</h1>
      </div>

      <Card className="p-5">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No pending comments. All clear.
          </p>
        ) : (
          <ul className="space-y-4">
            {comments.map((c) => (
              <li key={c._id} className="rounded-md border border-border p-4">
                <div className="mb-2 flex flex-wrap items-baseline gap-2 text-xs text-muted-foreground">
                  <span className="font-bold text-foreground">
                    {c.user?.name}
                  </span>
                  <span>
                    on{" "}
                    <Link
                      href={`/blogs/${c.blog?.slug}`}
                      className="text-primary"
                    >
                      {c.blog?.title}
                    </Link>
                  </span>
                  <span className="ml-auto font-mono">
                    {new Date(c.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="mb-3 text-sm">{c.content}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    disabled={actingId === c._id}
                    onClick={() => act(c._id, "approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
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
