"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { Comment } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CommentSection({ blogId }: { blogId: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");

  async function load() {
    setLoading(true);
    const data = await api.get(`/comments?blogId=${blogId}`);
    setComments(data.comments || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    setNotice("");

    try {
      await api.post("/comments", { blogId, content: text });
      setText("");
      setNotice(
        "Comment submitted. It will show here once approved by an admin.",
      );
    } catch (err: any) {
      setNotice(err.message || "Failed to submit comment.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-14 border-t border-border pt-8">
      <h2 className="mb-5 font-serif text-2xl">Comments</h2>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <Textarea
            placeholder="Write your comment..."
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            className="mb-3"
          />
          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit comment"}
          </Button>
          {notice && (
            <p className="mt-2 text-xs text-muted-foreground">{notice}</p>
          )}
        </form>
      ) : (
        <div className="mb-8 rounded-md bg-accent p-4 text-sm text-accent-foreground">
          Please{" "}
          <Link href="/login" className="font-bold underline">
            login
          </Link>{" "}
          or{" "}
          <Link href="/register" className="font-bold underline">
            register
          </Link>{" "}
          to comment.
        </div>
      )}

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No approved comments yet. Be the first to comment!
        </p>
      ) : (
        <ul className="flex flex-col gap-5">
          {comments.map((c) => (
            <li key={c._id} className="border-b border-border pb-4">
              <div className="mb-1 flex items-baseline gap-2">
                <span className="text-sm font-bold">{c.user?.name}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm leading-relaxed">{c.content}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
