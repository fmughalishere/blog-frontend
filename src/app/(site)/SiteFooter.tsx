import Link from "next/link";
import { Feather, Instagram, Facebook, Twitter } from "lucide-react";
import { categories } from "@/lib/categories";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Feather className="h-4 w-4" />
            </span>
            Ink<span className="text-gradient">well</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Captions and stories for every mood — handpicked words for the moments that matter.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-wide text-foreground">Categories</p>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/categories/${cat.slug}`} className="transition-colors hover:text-primary">
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-wide text-foreground">Explore</p>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="transition-colors hover:text-primary">
                All blogs
              </Link>
            </li>
            <li>
              <Link href="/login" className="transition-colors hover:text-primary">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="transition-colors hover:text-primary">
                Register
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-wide text-foreground">Stay inspired</p>
          <p className="text-sm text-muted-foreground">
            New captions and stories every week, straight from our writers' desk.
          </p>
        </div>
      </div>

      <div className="border-t border-border py-6">
        <p className="container text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Blogs. Made with care for storytellers and caption-lovers.
        </p>
      </div>
    </footer>
  );
}
