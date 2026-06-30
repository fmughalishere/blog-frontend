"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AdminRegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", adminSecret: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/register", { ...form, role: "admin" });
      router.push("/admin/login");
    } catch (err: any) {
      setError(err.message || "Registration fail hui.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#12151c] p-6">
      <Card className="w-full max-w-sm p-8">
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-primary">Admin panel</p>
        <h1 className="mb-1 text-xl font-bold">Create admin account</h1>
        <p className="mb-6 text-sm text-muted-foreground">
  Only register if you have the admin secret code.
</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold">Full name</label>
            <Input value={form.name} onChange={(e) => update("name", e.target.value)} required />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold">Email</label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold">Password</label>
            <Input
              type="password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              required
              minLength={6}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold">Admin secret code</label>
            <Input
              type="password"
              value={form.adminSecret}
              onChange={(e) => update("adminSecret", e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Already have an Account?{" "}
          <Link href="/admin/login" className="font-bold text-primary">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
