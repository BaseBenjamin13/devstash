import {
  Code,
  File,
  FolderOpen,
  Image,
  Link,
  Sparkles,
  StickyNote,
  Terminal,
  type LucideIcon,
} from "lucide-react";

// Maps the icon name stored on ItemType (mock-data / future Prisma rows) to its lucide component.
const iconMap: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link,
};

export function getTypeIcon(name: string): LucideIcon {
  return iconMap[name] ?? FolderOpen;
}
