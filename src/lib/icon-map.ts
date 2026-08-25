import { createElement, type CSSProperties } from "react";
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

// createElement (not JSX) avoids react-hooks/static-components: the rule can't
// tell this lookup always returns the same stable icon reference, so it flags
// the usual `const Icon = getTypeIcon(...); <Icon />` as a component created during render.
export function TypeIcon({
  name,
  className,
  style,
}: {
  name: string;
  className?: string;
  style?: CSSProperties;
}) {
  return createElement(getTypeIcon(name), { className, style });
}
