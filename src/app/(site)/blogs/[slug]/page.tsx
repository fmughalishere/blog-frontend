import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Eye, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Blog } from "@/types";
import FadeIn from "@/components/FadeIn";
import CommentSection from "./CommentSection";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://blogs-backend-e4fi.onrender.com/api";

async function getBlog(slug: string): Promise<Blog | null> {
  const res = await fetch(`${API_URL}/blogs/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  return data.blog;
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug);
  if (!blog) notFound();

  return (
    <article className="container max-w-3xl py-12">
      <FadeIn>
        <Link
          href="/blogs"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to blogs
        </Link>

        <Badge className="mb-4">{blog.category}</Badge>
        <h1 className="mb-3 font-serif text-3xl leading-tight sm:text-4xl">{blog.title}</h1>
        <div className="mb-7 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            {blog.author?.name || "Admin"}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="h-3.5 w-3.5" />
            {blog.views} views
          </span>
        </div>
      </FadeIn>

      {blog.coverImage && (
        <FadeIn delay={0.1}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="mb-8 max-h-[440px] w-full rounded-2xl object-cover shadow-soft"
          />
        </FadeIn>
      )}

      <FadeIn delay={0.15} className="whitespace-pre-wrap font-sans text-lg leading-relaxed text-foreground/90">
        {blog.content}
      </FadeIn>

      {blog.tags?.length > 0 && (
        <FadeIn delay={0.2} className="mt-8 flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <Badge key={tag} variant="success">
              {tag}
            </Badge>
          ))}
        </FadeIn>
      )}

      <div className="mt-12 border-t border-border pt-8">
        <CommentSection blogId={blog._id} />
      </div>
    </article>
  );
}
