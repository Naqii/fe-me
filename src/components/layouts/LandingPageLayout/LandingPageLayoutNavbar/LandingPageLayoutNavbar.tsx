/* eslint-disable react-hooks/set-state-in-effect */
import { useRouter } from "next/router";
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Switch,
} from "@heroui/react";
import Image from "next/image";
import { NAV_ITEMS } from "../LandingPageLayout.constant";
import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const LandingPageLayoutNavbar = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  // Handle scroll for floating effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);

  // Smooth fade transition when theme changes
  useEffect(() => {
    if (!mounted) return;
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 400);
    return () => clearTimeout(timer);
  }, [theme, mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* Navbar utama */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-full backdrop-blur-lg transition-all duration-500",
          scrolled
            ? "scale-[0.98] bg-white/60 shadow-lg dark:bg-gray-900/60"
            : "bg-white/80 shadow-lg dark:bg-gray-900/80",
          isTransitioning && "transition-colors duration-500 ease-in-out",
        )}
      >
        <Navbar
          maxWidth="full"
          isBordered
          isBlurred={false}
          className={cn(
            "rounded-full border border-gray-200 bg-transparent shadow-none dark:border-gray-700",
            "transition-colors duration-500 ease-in-out",
          )}
        >
          {/* Kiri: Logo */}
          <NavbarBrand as={Link} href="/">
            <Image
              src="/images/general/2.jpg"
              alt="logo"
              width={38}
              height={38}
              className="cursor-pointer rounded-full"
            />
          </NavbarBrand>

          {/* Tengah: Menu Desktop */}
          <NavbarContent
            justify="center"
            className="hidden items-center gap-6 md:flex"
          >
            {NAV_ITEMS.map((item) => (
              <NavbarItem
                key={`nav-${item.label}`}
                as={Link}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-300 md:text-base",
                  router.pathname === item.href
                    ? "text-primary font-bold"
                    : "hover:text-primary text-gray-700 dark:text-gray-300 dark:hover:text-white",
                )}
              >
                {item.label}
              </NavbarItem>
            ))}
          </NavbarContent>

          {/* Kanan: Toggle theme + Menu mobile */}
          <NavbarContent justify="end" className="items-center gap-2">
            {/* Tombol Hamburger - hanya tampil di mobile */}
            <div className="flex md:hidden">
              <motion.button
                onClick={() => setOpenMenu(!openMenu)}
                whileTap={{ scale: 0.9 }}
                className="rounded-full bg-gray-200 p-2 transition-all dark:bg-gray-800"
              >
                {openMenu ? (
                  <FaTimes className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <FaBars className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                )}
              </motion.button>
            </div>

            {/* Tombol dark/light mode */}
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center transition-all"
            >
              <Switch
                size="sm"
                color="primary"
                isSelected={theme === "dark"}
                onValueChange={(val) => setTheme(val ? "dark" : "light")}
                thumbIcon={({ isSelected }) =>
                  isSelected ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaMoon className="h-3 w-3 text-black dark:text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaSun className="h-3 w-3 text-yellow-500" />
                    </motion.div>
                  )
                }
              />
            </motion.div>
          </NavbarContent>
        </Navbar>
      </motion.nav>

      {/* Floating Bottom Sheet Menu (Mobile) */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 left-1/2 z-50 w-64 -translate-x-1/2 rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-xl backdrop-blur-lg md:hidden dark:border-gray-700 dark:bg-gray-900/80"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "block rounded-xl py-2 text-center font-medium text-gray-800 transition-colors hover:bg-gray-100/50 dark:text-gray-200 dark:hover:bg-gray-800/60",
                  router.pathname === item.href &&
                    "bg-primary/10 text-primary font-semibold",
                )}
                onClick={() => setOpenMenu(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LandingPageLayoutNavbar;
