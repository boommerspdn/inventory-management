"use client";

import { useTheme } from "next-themes";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { SunMoon } from "lucide-react";

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
