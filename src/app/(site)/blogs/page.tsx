import BlogGrid from "../BlogGrid";

export default function BlogsPage() {
  return (
    <div className="container py-12">
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Library</p>
      <h1 className="mb-8 font-serif text-3xl sm:text-4xl">All blogs</h1>
      <BlogGrid limit={9} />
    </div>
  );
}
