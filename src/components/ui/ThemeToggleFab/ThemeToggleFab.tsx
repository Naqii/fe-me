import { useEffect, useState, MouseEvent } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa6";

type Props = {
  position?: "br" | "bl"; // bottom-right / bottom-left
  zIndex?: number;
};

const ThemeToggleFab = ({ position = "br", zIndex = 60 }: Props) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // hindari mismatch

  const isDark = theme === "dark";
  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTheme(isDark ? "light" : "dark");
  };

  const posClass =
    position === "br"
      ? "right-4 bottom-4 md:right-6 md:bottom-6"
      : "left-4 bottom-4 md:left-6 md:bottom-6";

  return (
    <motion.button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileTap={{ scale: 0.92 }}
      className={[
        "fixed",
        posClass,
        "rounded-full p-3 shadow-lg ring-1 ring-black/5 md:p-3.5",
        "backdrop-blur-md transition-colors",
        "bg-white/80 hover:bg-white dark:bg-gray-900/80 dark:hover:bg-gray-900",
      ].join(" ")}
      style={{ zIndex }}
    >
      {isDark ? (
        <FaMoon className="h-5 w-5 text-black" />
      ) : (
        <FaSun className="h-5 w-5 text-yellow-500" />
      )}
    </motion.button>
  );
};

export default ThemeToggleFab;
