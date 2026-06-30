const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://blogs-backend-e4fi.onrender.com/api";

interface RequestOptions extends RequestInit {
  json?: unknown;
}

async function request(path: string, options: RequestOptions = {}) {
  const { json, headers, ...rest } = options;

  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    credentials: "include", // sends the httpOnly JWT cookie set by the Express backend
    headers: {
      ...(json ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: json ? JSON.stringify(json) : rest.body,
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}

export const api = {
  get: (path: string) => request(path, { method: "GET" }),
  post: (path: string, json?: unknown) => request(path, { method: "POST", json }),
  put: (path: string, json?: unknown) => request(path, { method: "PUT", json }),
  patch: (path: string, json?: unknown) => request(path, { method: "PATCH", json }),
  delete: (path: string) => request(path, { method: "DELETE" }),
};
