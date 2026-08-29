import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { ContentType, PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const DEMO_USER_EMAIL = "benmorgiewicz@gmail.com";

const SYSTEM_ITEM_TYPES = [
  { name: "snippet", icon: "Code", color: "#3b82f6" },
  { name: "prompt", icon: "Sparkles", color: "#8b5cf6" },
  { name: "command", icon: "Terminal", color: "#f97316" },
  { name: "note", icon: "StickyNote", color: "#fde047" },
  { name: "file", icon: "File", color: "#6b7280" },
  { name: "image", icon: "Image", color: "#ec4899" },
  { name: "link", icon: "Link", color: "#10b981" },
] as const;

async function upsertSystemItemType(name: string, icon: string, color: string) {
  const existing = await prisma.itemType.findFirst({
    where: { userId: null, name },
  });

  if (existing) {
    return prisma.itemType.update({
      where: { id: existing.id },
      data: { icon, color, isSystem: true },
    });
  }

  return prisma.itemType.create({
    data: { name, icon, color, isSystem: true, userId: null },
  });
}

interface SeedItem {
  title: string;
  contentType: ContentType;
  content?: string;
  url?: string;
  description?: string;
  language?: string;
  itemType: string;
}

interface SeedCollection {
  name: string;
  description: string;
  items: SeedItem[];
}

const COLLECTIONS: SeedCollection[] = [
  {
    name: "React Patterns",
    description: "Reusable React patterns and hooks",
    items: [
      {
        title: "useDebounce Hook",
        contentType: ContentType.text,
        language: "typescript",
        description: "Debounces a rapidly changing value, useful for search inputs.",
        itemType: "snippet",
        content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timeout);
  }, [value, delayMs]);

  return debouncedValue;
}`,
      },
      {
        title: "Compound Component Pattern (Tabs)",
        contentType: ContentType.text,
        language: "typescript",
        description: "Context provider + compound components example.",
        itemType: "snippet",
        content: `import { createContext, useContext, useState, ReactNode } from "react";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs.* components must be used within <Tabs>");
  return context;
}

export function Tabs({ defaultTab, children }: { defaultTab: string; children: ReactNode }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

Tabs.List = function TabsList({ children }: { children: ReactNode }) {
  return <div role="tablist">{children}</div>;
};

Tabs.Trigger = function TabsTrigger({ id, children }: { id: string; children: ReactNode }) {
  const { activeTab, setActiveTab } = useTabsContext();
  return (
    <button role="tab" aria-selected={activeTab === id} onClick={() => setActiveTab(id)}>
      {children}
    </button>
  );
};

Tabs.Panel = function TabsPanel({ id, children }: { id: string; children: ReactNode }) {
  const { activeTab } = useTabsContext();
  return activeTab === id ? <div role="tabpanel">{children}</div> : null;
};`,
      },
      {
        title: "Array & Object Utility Functions",
        contentType: ContentType.text,
        language: "typescript",
        description: "groupBy, uniqueBy, and pick helpers.",
        itemType: "snippet",
        content: `export function groupBy<T, K extends PropertyKey>(items: T[], keyFn: (item: T) => K): Record<K, T[]> {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    (acc[key] ??= []).push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

export function uniqueBy<T, K>(items: T[], keyFn: (item: T) => K): T[] {
  const seen = new Set<K>();
  return items.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce((result, key) => {
    result[key] = obj[key];
    return result;
  }, {} as Pick<T, K>);
}`,
      },
    ],
  },
  {
    name: "AI Workflows",
    description: "AI prompts and workflow automations",
    items: [
      {
        title: "Code Review Prompt",
        contentType: ContentType.text,
        description: "Reviews code for correctness, security, and readability.",
        itemType: "prompt",
        content: `Review the following code for correctness, security, and readability issues. For each issue found, explain the risk and suggest a specific fix. Do not suggest stylistic changes unless they affect correctness or maintainability.

\`\`\`{language}
{code}
\`\`\``,
      },
      {
        title: "Documentation Generator Prompt",
        contentType: ContentType.text,
        description: "Generates concise docs for a function or module.",
        itemType: "prompt",
        content: `Generate concise documentation for the following function or module. Include: a one-sentence summary, parameter descriptions with types, return value description, and one usage example. Avoid restating the code line-by-line.

\`\`\`{language}
{code}
\`\`\``,
      },
      {
        title: "Refactoring Assistance Prompt",
        contentType: ContentType.text,
        description: "Refactors code for readability without changing behavior.",
        itemType: "prompt",
        content: `Refactor the following code to improve readability and reduce duplication without changing its behavior. List each change you made and why. Do not introduce new dependencies or change the public API.

\`\`\`{language}
{code}
\`\`\``,
      },
    ],
  },
  {
    name: "DevOps",
    description: "Infrastructure and deployment resources",
    items: [
      {
        title: "Next.js Dockerfile (multi-stage)",
        contentType: ContentType.text,
        language: "dockerfile",
        description: "Multi-stage build producing a minimal production image.",
        itemType: "snippet",
        content: `FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]`,
      },
      {
        title: "Deploy to Production",
        contentType: ContentType.text,
        description: "Pulls latest main, rebuilds, and restarts the app process.",
        itemType: "command",
        content: "git pull origin main && npm ci && npm run build && pm2 restart devstash",
      },
      {
        title: "Docker Documentation",
        contentType: ContentType.url,
        description: "Official Docker documentation.",
        itemType: "link",
        url: "https://docs.docker.com/",
      },
      {
        title: "GitHub Actions Documentation",
        contentType: ContentType.url,
        description: "Official GitHub Actions documentation.",
        itemType: "link",
        url: "https://docs.github.com/en/actions",
      },
    ],
  },
  {
    name: "Terminal Commands",
    description: "Useful shell commands for everyday development",
    items: [
      {
        title: "Undo Last Commit (keep changes)",
        contentType: ContentType.text,
        description: "Reverts the last commit but keeps changes staged.",
        itemType: "command",
        content: "git reset --soft HEAD~1",
      },
      {
        title: "Remove All Stopped Docker Containers",
        contentType: ContentType.text,
        description: "Cleans up stopped containers to free up disk space.",
        itemType: "command",
        content: "docker container prune -f",
      },
      {
        title: "Find and Kill Process on Port 3000",
        contentType: ContentType.text,
        description: "Frees up a port held by a stuck dev server.",
        itemType: "command",
        content: "lsof -ti:3000 | xargs kill -9",
      },
      {
        title: "Clean Reinstall Node Modules",
        contentType: ContentType.text,
        description: "Wipes and reinstalls dependencies from a clean lockfile.",
        itemType: "command",
        content: "rm -rf node_modules package-lock.json && npm install",
      },
    ],
  },
  {
    name: "Design Resources",
    description: "UI/UX resources and references",
    items: [
      {
        title: "Tailwind CSS Documentation",
        contentType: ContentType.url,
        description: "Utility-first CSS framework reference.",
        itemType: "link",
        url: "https://tailwindcss.com/docs",
      },
      {
        title: "shadcn/ui Components",
        contentType: ContentType.url,
        description: "Composable component library built on Radix UI.",
        itemType: "link",
        url: "https://ui.shadcn.com",
      },
      {
        title: "Material Design 3",
        contentType: ContentType.url,
        description: "Google's open-source design system.",
        itemType: "link",
        url: "https://m3.material.io",
      },
      {
        title: "Lucide Icons",
        contentType: ContentType.url,
        description: "Open-source icon library.",
        itemType: "link",
        url: "https://lucide.dev",
      },
    ],
  },
];

async function main() {
  const passwordHash = await bcrypt.hash("12345678", 12);

  const user = await prisma.user.upsert({
    where: { email: DEMO_USER_EMAIL },
    update: {
      name: "Demo User",
      password: passwordHash,
      isPro: false,
      emailVerified: new Date(),
    },
    create: {
      email: DEMO_USER_EMAIL,
      name: "Demo User",
      password: passwordHash,
      isPro: false,
      emailVerified: new Date(),
    },
  });
  console.log(`Upserted demo user: ${user.email}`);

  const itemTypeIds = new Map<string, string>();
  for (const type of SYSTEM_ITEM_TYPES) {
    const itemType = await upsertSystemItemType(type.name, type.icon, type.color);
    itemTypeIds.set(type.name, itemType.id);
  }
  console.log(`Upserted ${SYSTEM_ITEM_TYPES.length} system item types`);

  await prisma.item.deleteMany({ where: { userId: user.id } });
  await prisma.collection.deleteMany({ where: { userId: user.id } });

  for (const seedCollection of COLLECTIONS) {
    const collection = await prisma.collection.create({
      data: {
        name: seedCollection.name,
        description: seedCollection.description,
        userId: user.id,
      },
    });

    for (const seedItem of seedCollection.items) {
      const itemTypeId = itemTypeIds.get(seedItem.itemType);
      if (!itemTypeId) {
        throw new Error(`Unknown item type "${seedItem.itemType}" for item "${seedItem.title}"`);
      }

      await prisma.item.create({
        data: {
          title: seedItem.title,
          contentType: seedItem.contentType,
          content: seedItem.content,
          url: seedItem.url,
          description: seedItem.description,
          language: seedItem.language,
          userId: user.id,
          itemTypeId,
          collections: {
            create: { collectionId: collection.id },
          },
        },
      });
    }

    console.log(`Seeded collection "${collection.name}" with ${seedCollection.items.length} items`);
  }
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
