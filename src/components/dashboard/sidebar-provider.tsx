"use client";

import { createContext, useContext, useState } from "react";

import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarContextValue {
  collapsed: boolean;
  mobileOpen: boolean;
  toggleSidebar: () => void;
  closeMobileSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function toggleSidebar() {
    if (isMobile) {
      setMobileOpen((open) => !open);
    } else {
      setCollapsed((value) => !value);
    }
  }

  function closeMobileSidebar() {
    setMobileOpen(false);
  }

  return (
    <SidebarContext.Provider
      value={{ collapsed, mobileOpen, toggleSidebar, closeMobileSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
