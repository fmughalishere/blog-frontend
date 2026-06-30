"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Feather, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/categories";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
];

export default function SiteHeader() {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 glass">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2 font-serif text-xl font-bold tracking-tight">
          <motion.span
            whileHover={{ rotate: -12, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 12 }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
          >
            <Feather className="h-4 w-4" />
          </motion.span>
          <span>
            Blogs
          </span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-full px-4 py-2 text-muted-foreground transition-colors hover:text-foreground",
                pathname === link.href && "text-foreground"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-primary"
                />
              )}
            </Link>
          ))}

          {/* Categories mega menu */}
          <div
            className="relative"
            onMouseEnter={() => setCategoriesOpen(true)}
            onMouseLeave={() => setCategoriesOpen(false)}
          >
            <button
              className={cn(
                "flex items-center gap-1 rounded-full px-4 py-2 text-muted-foreground transition-colors hover:text-foreground",
                categoriesOpen && "text-foreground"
              )}
              onClick={() => setCategoriesOpen((o) => !o)}
            >
              Categories
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", categoriesOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {categoriesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute right-0 top-full z-50 mt-2 w-[560px] rounded-2xl border border-border bg-card p-4 shadow-soft"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat, i) => (
                      <motion.div
                        key={cat.slug}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <Link
                          href={`/categories/${cat.slug}`}
                          onClick={() => setCategoriesOpen(false)}
                          className="block rounded-xl p-3 transition-colors hover:bg-secondary"
                        >
                          <p className="text-sm font-semibold text-foreground">{cat.label}</p>
                          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{cat.description}</p>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="ml-2 flex items-center gap-3 border-l border-border pl-4">
            {!loading && user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">{user.name}</span>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              !loading && (
                <>
                  <Link href="/login" className="text-muted-foreground hover:text-foreground">
                    Login
                  </Link>
                  <Link href="/register" className={cn(buttonVariants({ size: "sm" }))}>
                    Register
                  </Link>
                </>
              )
            )}
          </div>
        </nav>

        <button
          className="rounded-md p-2 text-foreground md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border bg-card md:hidden"
          >
            <div className="container flex flex-col gap-1 py-4 text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 font-medium hover:bg-secondary"
                >
                  {link.label}
                </Link>
              ))}

              <p className="mt-2 px-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Categories
              </p>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 hover:bg-secondary"
                >
                  {cat.label}
                </Link>
              ))}

              <div className="mt-3 flex items-center gap-3 border-t border-border px-3 pt-3">
                {!loading && user ? (
                  <div className="flex w-full items-center justify-between">
                    <span className="font-semibold">{user.name}</span>
                    <Button variant="ghost" size="sm" onClick={logout}>
                      Logout
                    </Button>
                  </div>
                ) : (
                  !loading && (
                    <>
                      <Link href="/login" onClick={() => setMobileOpen(false)} className="text-muted-foreground">
                        Login
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setMobileOpen(false)}
                        className={cn(buttonVariants({ size: "sm" }))}
                      >
                        Register
                      </Link>
                    </>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
