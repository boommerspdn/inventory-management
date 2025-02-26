"use client";

import { useTheme } from "next-themes";
import { SunMoon } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <SidebarMenuButton
      className="hover:cursor-pointer"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      asChild
    >
      <SunMoon />
    </SidebarMenuButton>
  );
};

export default ThemeSwitcher;
