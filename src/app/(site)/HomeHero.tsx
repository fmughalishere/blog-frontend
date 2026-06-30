"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[700px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-20 h-56 w-56 rounded-full bg-gold/20 blur-3xl"
      />

      <div className="container relative max-w-2xl py-20 text-center sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary"
        >
          <Sparkles className="h-3 w-3" />A space for ideas
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 font-serif text-4xl leading-tight sm:text-5xl"
        >
          Captions and stories{" "}
          <span className="text-gradient">worth keeping</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground"
        >
          500+ articles and growing — new blogs every week covering mood,
          relationships, food, travel, and events.{" "}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/blogs"
            className={cn(buttonVariants({ size: "lg" }), "group")}
          >
            Explore blogs
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/categories/relationship-captions"
            className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
          >
            Browse captions
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
