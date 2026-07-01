export interface CategoryItem {
  label: string;
  slug: string;
  description: string;
}

export const categories: CategoryItem[] = [
  {
    label: "Personality and Mood Captions",
    slug: "personality-and-mood-captions",
    description: "Captions that capture your vibe, mood and personality.",
  },
  {
    label: "Relationship Captions",
    slug: "relationship-captions",
    description: "Sweet, romantic and honest captions for every relationship.",
  },
  {
    label: "Food and Lifestyle Captions",
    slug: "food-and-lifestyle-captions",
    description: "Tasty captions for food, coffee and everyday lifestyle moments.",
  },
  {
    label: "Travel and Nature Captions",
    slug: "travel-and-nature-captions",
    description: "Wanderlust-worthy captions for travel and nature photos.",
  },
  {
    label: "Events and Special Captions",
    slug: "events-and-special-captions",
    description: "Perfect lines for birthdays, festivals and special occasions.",
  },
];

export function getCategoryBySlug(slug: string): CategoryItem | undefined {
  return categories.find((c) => c.slug === slug);
}
