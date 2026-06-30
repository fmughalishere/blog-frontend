"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/categories";

export default function CategoryShowcase() {
  return (
    <section className="container pb-20">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">Browse by mood</p>
          <h2 className="font-serif text-2xl">Find captions for every moment</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
            whileHover={{ y: -5 }}
          >
            <Link
              href={`/categories/${cat.slug}`}
              className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-soft"
            >
              <div>
                <p className="font-serif text-lg leading-snug">{cat.label.replace(" Captions", "")}</p>
                <p className="mt-2 text-xs text-muted-foreground">{cat.description}</p>
              </div>
              <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-primary">
                Explore
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
