"use client";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

type Props = {
  defaultTheme?: string;
};

export default function ThemeButton({ defaultTheme }: Props) {
  const [theme, setTheme] = useState(
    () => defaultTheme || Cookies.get("theme") || "light"
  );
  const ThemeIcon = theme === "dark" ? MoonIcon : SunIcon;

  const handleChangeTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      Cookies.set("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      Cookies.set("theme", "dark");
      setTheme("dark");
    }
  };

  useEffect(() => {
    const theme = Cookies.get("theme");

    if (!theme) {
      Cookies.set("theme", "light");
      setTheme("light");

      return;
    }

    setTheme(theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <ThemeIcon
      onClick={handleChangeTheme}
      className="ml-auto mr-6 h-6 w-6 cursor-pointer hover:scale-105 lg:block"
    />
  );
}
