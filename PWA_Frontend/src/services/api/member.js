import { apiFetch } from "./config";

export const getMember = (userId) =>
  apiFetch(`/users/member/${userId}`, {
    headers: { Accept: "application/json" },
  }).then((response) => response.json());

export const createMember = (userId, data) =>
  apiFetch(`/users/${userId}/member`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  });