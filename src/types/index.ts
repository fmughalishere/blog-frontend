export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
  status: "draft" | "published";
  views: number;
  createdAt: string;
  author?: { name: string };
}

export interface Comment {
  _id: string;
  content: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  user: { name: string; email?: string };
  blog?: { title: string; slug: string };
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}
