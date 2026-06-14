export interface User {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  email: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  created_at: string;
  updated_at: string;
}