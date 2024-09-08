import { useEffect, useState } from "react";
import { PiSun, PiMoon } from "react-icons/pi";
export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Check if a saved theme is available and apply it
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
    document.documentElement.className = savedTheme ? savedTheme : "light";

  })

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme;
  }

  return (
    <button id="theme-toggler-button" className="text-md rounded-full text-gray-600 dark:text-gray-200" onClick={handleThemeChange}>
      {theme === "light" ? <PiSun /> : <PiMoon />}
    </button>
  )
}
