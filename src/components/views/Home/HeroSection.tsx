// HeroSection.tsx
import Image from "next/image";
import { motion } from "framer-motion";
import { SOCIAL_ITEMS } from "./HeroSection.constant";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden px-6 pt-(--nav-h,5rem) pb-20 transition-colors duration-500">
      <div className="container mx-auto flex flex-col items-center lg:flex-row lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-foreground mb-12 space-y-6 text-center lg:mb-0 lg:w-1/3 lg:text-left"
        >
          <h1 className="relative text-5xl leading-tight font-extrabold md:text-6xl">
            Hey There
            <span className="text-primary block">I&apos;m Haqi</span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 -left-4 -z-10 text-[8rem] leading-none font-extrabold text-emerald-500/15 select-none md:text-[10rem] dark:text-emerald-400/20"
            >
              Sunan Baihaqi Amrullah
            </span>
          </h1>

          <div className="flex items-center justify-center gap-5 pt-2 text-gray-500 lg:justify-start dark:text-gray-400">
            {SOCIAL_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary text-3xl transition-colors duration-300"
                aria-label={item.label}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </motion.div>

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
            <div className="bg-primary/30 dark:bg-primary/20 absolute -right-6 -bottom-6 h-32 w-32 rounded-full blur-3xl transition-all duration-700 group-hover:scale-125" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-foreground mt-10 flex flex-col justify-center text-center transition-colors duration-500 lg:mt-0 lg:w-1/3 lg:text-left"
        >
          <p className="text-primary mb-2 text-sm tracking-wide uppercase">
            — Sunan Baihaqi Amrullah
          </p>
          <h3 className="mb-3 text-2xl font-semibold dark:text-gray-100">
            A creative enthusiast who loves both visual storytelling and web
            technology.
          </h3>
          <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
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
