import HomeHero from "./HomeHero";
import CategoryShowcase from "./CategoryShowcase";
import BlogGrid from "./BlogGrid";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <CategoryShowcase />
      <div className="container pb-20">
        <h2 className="mb-8 font-serif text-2xl">Latest from the blog</h2>
        <BlogGrid limit={9} />
      </div>
    </>
  );
}
