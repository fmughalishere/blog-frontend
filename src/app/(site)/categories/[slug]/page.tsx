import { notFound } from "next/navigation";
import { getCategoryBySlug, categories } from "@/lib/categories";
import BlogGrid from "../../BlogGrid";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  return (
    <div className="container py-12">
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Category</p>
      <h1 className="mb-3 font-serif text-3xl sm:text-4xl">{category.label}</h1>
      <p className="mb-10 max-w-xl text-muted-foreground">{category.description}</p>
      <BlogGrid limit={9} category={category.label} />
    </div>
  );
}
