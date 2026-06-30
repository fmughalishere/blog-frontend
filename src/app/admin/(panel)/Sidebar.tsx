"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/comments", label: "Comments" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.push("/admin/login");
  }

  return (
    <aside className="sticky top-0 flex h-screen w-60 flex-shrink-0 flex-col bg-[#12151c] p-4 text-[#b9bdc8]">
      <div className="mb-5 border-b border-white/10 pb-5">
        <span className="font-mono text-lg font-bold text-white">Blog</span>{" "}
        <span className="text-xs uppercase tracking-widest text-[#9aa0ad]">Admin</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm transition-colors ${
                active ? "bg-primary text-white" : "hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 pt-3">
        <p className="mb-2 truncate px-1 text-sm text-white">{user?.name || "Admin"}</p>
        <button
          onClick={handleLogout}
          className="w-full rounded-md border border-white/10 px-3 py-2 text-left text-sm hover:text-white"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
