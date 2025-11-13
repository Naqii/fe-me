/* eslint-disable react-hooks/set-state-in-effect */
import { motion } from "framer-motion";
import { SOCIAL_ITEMS } from "./HeroSection.constant";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const navRef = useRef<HTMLElement | null>(null);
  const [navHeight, setNavHeight] = useState(0);

  // Hitung tinggi navbar agar tidak nabrak, tapi tetap rapat
  useEffect(() => {
    const nav = document.querySelector("nav");
    if (nav) {
      navRef.current = nav as HTMLElement;
      setNavHeight(nav.offsetHeight + 6); // dikurangi dari 40 → 12px saja
    }
  }, []);

  return (
    <section
      style={{ paddingTop: `${navHeight}px` }}
      className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden px-6 pb-20 transition-colors duration-500"
    >
      <div className="container mx-auto flex flex-col items-center lg:flex-row lg:gap-16">
        {/* Left: Nama dan Sosial Media */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-foreground relative z-20 mb-12 space-y-6 text-center lg:mb-0 lg:w-1/3 lg:text-left"
        >
          <h1 className="relative text-5xl leading-tight font-extrabold transition-colors duration-500 md:text-7xl">
            Hey There
            <span className="text-primary block transition-colors duration-500">
              I&apos;m Haqi
            </span>
            <span className="text-foreground/5 absolute -top-12 -left-4 -z-10 text-[9rem] leading-none font-extrabold select-none md:text-[11rem] dark:text-white/5">
              Sunan Baihaqi Amrullah
            </span>
          </h1>

          {/* Social Media Icons */}
          <div className="flex items-center justify-center gap-5 pt-2 text-gray-500 lg:justify-start dark:text-gray-400">
            {SOCIAL_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary text-3xl transition-colors duration-300"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Center: Foto */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex justify-center lg:w-1/3"
        >
          <div className="group relative">
            <Image
              src="/images/Haqi.webp"
              alt="Haqi"
              width={400}
              height={400}
              priority
              className="transition-transform duration-500 group-hover:scale-105"
            />
            {/* Efek glow di belakang foto */}
            <div className="bg-primary/30 dark:bg-primary/20 absolute -right-6 -bottom-6 h-32 w-32 rounded-full blur-3xl transition-all duration-700 group-hover:scale-125" />
          </div>
        </motion.div>

        {/* Right: About Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-foreground relative mt-10 flex flex-col justify-center text-center transition-colors duration-500 lg:mt-0 lg:w-1/3 lg:text-left"
        >
          <p className="text-primary mb-2 text-sm tracking-wide uppercase transition-colors duration-500">
            — Sunan Baihaqi Amrullah
          </p>
          <h3 className="text-foreground mb-3 text-2xl font-semibold transition-colors duration-500 dark:text-gray-100">
            A creative enthusiast who loves both visual storytelling and web
            technology.
          </h3>
          <p className="text-sm leading-relaxed text-gray-500 transition-colors duration-500 dark:text-gray-400">
            I started my journey in video editing and documentation, capturing
            stories through cameras and drones. Over time, I discovered a deep
            interest in how design and interactivity come together on the web —
            blending aesthetic vision with functionality.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
