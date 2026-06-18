// Single client for the portfolio backend: tracking, leads, comments, contact, admin.

import type {
  AdminComment,
  CommentInput,
  ContactInput,
  EventType,
  LeadInput,
  LoginResponse,
  PublicComment,
} from "./api.types";

export type {
  AdminComment,
  CommentInput,
  ContactInput,
  EventType,
  LeadInput,
  LoginResponse,
  PublicComment,
} from "./api.types";

const API_BASE = import.meta.env.VITE_API_URL ?? "";
const SESSION_KEY = "pf_session_id";
const TOKEN_KEY = "pf_admin_token";

/** A stable per-visitor id so the backend can tie all of one person's actions together. */
function getSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly details?: Record<string, string[]>,
  ) {
    super(message);
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Session-Id": getSessionId(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new ApiError(response.status, body.error ?? "Something went wrong", body.details);
  }

  return response.status === 204 ? (undefined as T) : (response.json() as Promise<T>);
}

// --- Admin auth ------------------------------------------------------------

export const getAdminToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const clearAdminToken = (): void => localStorage.removeItem(TOKEN_KEY);

function authHeaders(): Record<string, string> {
  const token = getAdminToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function adminLogin(email: string, password: string): Promise<LoginResponse> {
  const result = await request<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem(TOKEN_KEY, result.token);
  return result;
}

export function listAllComments(): Promise<AdminComment[]> {
  return request<AdminComment[]>("/comments/all", { headers: authHeaders() });
}

export function approveComment(id: string): Promise<AdminComment> {
  return request<AdminComment>(`/comments/${id}/approve`, { method: "PATCH", headers: authHeaders() });
}

export function deleteComment(id: string): Promise<void> {
  return request<void>(`/comments/${id}`, { method: "DELETE", headers: authHeaders() });
}

// --- Analytics -------------------------------------------------------------

/** Fire-and-forget: tracking must never block or break the UI. */
export function trackEvent(type: EventType, metadata?: Record<string, unknown>): void {
  request("/events", {
    method: "POST",
    body: JSON.stringify({ type, path: window.location.pathname, metadata }),
  }).catch(() => {});
}

export function trackLinkClick(href: string, label?: string): void {
  trackEvent("link_click", { href, label });
}

// --- Leads (resume gate) ---------------------------------------------------

/** Submits the visitor's details, then downloads the PDF the backend streams back. */
export async function downloadResume(input: LeadInput): Promise<void> {
  const response = await fetch(`${API_BASE}/api/leads/resume`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Session-Id": getSessionId() },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new ApiError(response.status, body.error ?? "Download failed", body.details);
  }

  triggerDownload(await response.blob(), "Jeet_Sharma_Resume.pdf");
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

// --- Comments (Q&A) --------------------------------------------------------

export function getComments(): Promise<PublicComment[]> {
  return request<PublicComment[]>("/comments");
}

export function submitComment(input: CommentInput): Promise<{ id: string }> {
  return request("/comments", { method: "POST", body: JSON.stringify(input) });
}

// --- Contact ---------------------------------------------------------------

export function submitContact(input: ContactInput): Promise<{ id: string }> {
  return request("/contact", { method: "POST", body: JSON.stringify(input) });
}
