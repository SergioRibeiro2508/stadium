import { apiFetch } from "./config";

export const login = (data) =>
  apiFetch("/auth/login", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  }).then((r) => r.json());