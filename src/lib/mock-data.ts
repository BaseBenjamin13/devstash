// Mock data for the dashboard UI. Temporary stand-in until Prisma/Neon are wired up.
// Shape mirrors the Prisma schema in context/project-overview.md.

export type ContentType = "text" | "url" | "file";

export interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  isPro: boolean;
}

export interface ItemType {
  id: string;
  name: string;
  icon: string; // lucide icon name
  color: string;
  isSystem: boolean;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Item {
  id: string;
  title: string;
  contentType: ContentType;
  content: string | null;
  url: string | null;
  description: string | null;
  language: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  itemTypeId: string;
  collectionIds: string[];
  tagIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export const currentUser: User = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
  image: null,
  isPro: false,
};

export const itemTypes: ItemType[] = [
  { id: "type-snippet", name: "Snippet", icon: "Code", color: "#3b82f6", isSystem: true },
  { id: "type-prompt", name: "Prompt", icon: "Sparkles", color: "#8b5cf6", isSystem: true },
  { id: "type-command", name: "Command", icon: "Terminal", color: "#f97316", isSystem: true },
  { id: "type-note", name: "Note", icon: "StickyNote", color: "#fde047", isSystem: true },
  { id: "type-file", name: "File", icon: "File", color: "#6b7280", isSystem: true },
  { id: "type-image", name: "Image", icon: "Image", color: "#ec4899", isSystem: true },
  { id: "type-link", name: "Link", icon: "Link", color: "#10b981", isSystem: true },
];

export const tags: Tag[] = [
  { id: "tag-react", name: "react" },
  { id: "tag-auth", name: "auth" },
  { id: "tag-hooks", name: "hooks" },
  { id: "tag-api", name: "api" },
  { id: "tag-error-handling", name: "error-handling" },
  { id: "tag-python", name: "python" },
  { id: "tag-git", name: "git" },
];

export const collections: Collection[] = [
  {
    id: "col-react-patterns",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    isFavorite: true,
    createdAt: "2026-01-05T09:00:00.000Z",
    updatedAt: "2026-01-15T09:00:00.000Z",
  },
  {
    id: "col-python-snippets",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    isFavorite: false,
    createdAt: "2026-01-05T09:00:00.000Z",
    updatedAt: "2026-01-10T09:00:00.000Z",
  },
  {
    id: "col-context-files",
    name: "Context Files",
    description: "AI context files for projects",
    isFavorite: true,
    createdAt: "2026-01-05T09:00:00.000Z",
    updatedAt: "2026-01-12T09:00:00.000Z",
  },
  {
    id: "col-interview-prep",
    name: "Interview Prep",
    description: "Technical interview preparation",
    isFavorite: false,
    createdAt: "2026-01-05T09:00:00.000Z",
    updatedAt: "2026-01-14T09:00:00.000Z",
  },
  {
    id: "col-git-commands",
    name: "Git Commands",
    description: "Frequently used git commands",
    isFavorite: true,
    createdAt: "2026-01-05T09:00:00.000Z",
    updatedAt: "2026-01-13T09:00:00.000Z",
  },
  {
    id: "col-ai-prompts",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    isFavorite: false,
    createdAt: "2026-01-05T09:00:00.000Z",
    updatedAt: "2026-01-11T09:00:00.000Z",
  },
];

export const items: Item[] = [
  {
    id: "item-use-auth-hook",
    title: "useAuth Hook",
    contentType: "text",
    content: "export function useAuth() {\n  // ...\n}",
    url: null,
    description: "Custom authentication hook for React applications",
    language: "typescript",
    isFavorite: true,
    isPinned: true,
    itemTypeId: "type-snippet",
    collectionIds: ["col-react-patterns"],
    tagIds: ["tag-react", "tag-auth", "tag-hooks"],
    createdAt: "2026-01-15T09:00:00.000Z",
    updatedAt: "2026-01-15T09:00:00.000Z",
  },
  {
    id: "item-api-error-handling",
    title: "API Error Handling Pattern",
    contentType: "text",
    content: "async function fetchWithRetry(url: string) {\n  // ...\n}",
    url: null,
    description: "Fetch wrapper with exponential backoff retry logic",
    language: "typescript",
    isFavorite: false,
    isPinned: true,
    itemTypeId: "type-snippet",
    collectionIds: ["col-react-patterns"],
    tagIds: ["tag-api", "tag-error-handling"],
    createdAt: "2026-01-12T09:00:00.000Z",
    updatedAt: "2026-01-12T09:00:00.000Z",
  },
  {
    id: "item-python-json-parse",
    title: "Safe JSON Parser",
    contentType: "text",
    content: "def safe_json_parse(raw: str):\n    ...",
    url: null,
    description: "Parse JSON without raising on malformed input",
    language: "python",
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type-snippet",
    collectionIds: ["col-python-snippets"],
    tagIds: ["tag-python"],
    createdAt: "2026-01-10T09:00:00.000Z",
    updatedAt: "2026-01-10T09:00:00.000Z",
  },
  {
    id: "item-project-overview",
    title: "project-overview.md",
    contentType: "text",
    content: "# Project Overview\n...",
    url: null,
    description: "High-level context file for AI-assisted development",
    language: "markdown",
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type-note",
    collectionIds: ["col-context-files"],
    tagIds: [],
    createdAt: "2026-01-11T09:00:00.000Z",
    updatedAt: "2026-01-11T09:00:00.000Z",
  },
  {
    id: "item-git-rebase-interactive",
    title: "Interactive Rebase",
    contentType: "text",
    content: "git rebase -i HEAD~5",
    url: null,
    description: "Squash and reorder the last 5 commits",
    language: "bash",
    isFavorite: true,
    isPinned: false,
    itemTypeId: "type-command",
    collectionIds: ["col-git-commands"],
    tagIds: ["tag-git"],
    createdAt: "2026-01-13T09:00:00.000Z",
    updatedAt: "2026-01-13T09:00:00.000Z",
  },
  {
    id: "item-code-explainer-prompt",
    title: "Code Explainer",
    contentType: "text",
    content: "Explain the following code as if teaching a junior developer:",
    url: null,
    description: "Prompt for breaking down unfamiliar code",
    language: null,
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type-prompt",
    collectionIds: ["col-ai-prompts"],
    tagIds: [],
    createdAt: "2026-01-09T09:00:00.000Z",
    updatedAt: "2026-01-09T09:00:00.000Z",
  },
  {
    id: "item-react-docs-link",
    title: "React Docs — useEffect",
    contentType: "url",
    content: null,
    url: "https://react.dev/reference/react/useEffect",
    description: "Official documentation for the useEffect hook",
    language: null,
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type-link",
    collectionIds: ["col-react-patterns", "col-interview-prep"],
    tagIds: ["tag-react"],
    createdAt: "2026-01-08T09:00:00.000Z",
    updatedAt: "2026-01-08T09:00:00.000Z",
  },
  {
    id: "item-big-o-cheatsheet",
    title: "Big O Cheat Sheet",
    contentType: "text",
    content: "Array access: O(1)\nArray search: O(n)\n...",
    url: null,
    description: "Time complexity reference for common data structures",
    language: null,
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type-note",
    collectionIds: ["col-interview-prep"],
    tagIds: [],
    createdAt: "2026-01-07T09:00:00.000Z",
    updatedAt: "2026-01-07T09:00:00.000Z",
  },
];
