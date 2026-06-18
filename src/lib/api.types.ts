export type EventType =
  | "page_view"
  | "section_view"
  | "project_view"
  | "link_click"
  | "resume_view"
  | "resume_download"
  | "contact_submit"
  | "comment_submit";

export interface LeadInput {
  name: string;
  email: string;
  company?: string;
  note?: string;
}

export interface PublicComment {
  id: string;
  name: string;
  message: string;
  targetSlug?: string;
  createdAt: string;
}

export interface CommentInput {
  name: string;
  email?: string;
  message: string;
  targetSlug?: string;
}

export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export interface LoginResponse {
  token: string;
}

/** Full comment shape returned to the authenticated admin (includes pending + private fields). */
export interface AdminComment {
  id: string;
  name: string;
  email?: string;
  message: string;
  targetSlug?: string;
  approved: boolean;
  country?: string;
  createdAt: string;
}
