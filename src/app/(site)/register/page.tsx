"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      await api.post("/auth/register", form);
      await refresh();
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Registration fail hui.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-65px)] items-center justify-center p-6">
      <Card className="w-full max-w-sm p-8">
        <h1 className="mb-1 font-serif text-2xl">Create your account</h1>
<p className="mb-6 text-sm text-muted-foreground">Read blogs and leave comments.</p>
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

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Already have an Account?{" "}
          <Link href="/login" className="font-bold text-primary">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}
