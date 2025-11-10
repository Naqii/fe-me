import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const NAV_ITEMS = [
  {
    label: "Me",
    href: "/",
  },
  {
    label: "Work",
    href: "/works",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "Assets",
    href: "/assets",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const BUTTON_ITEMS = [
  {
    label: "Sign In",
    href: "/auth/signin",
    variant: "bordered" as const,
  },
  {
    label: "Sign Up",
    href: "/auth/signup",
    variant: "solid" as const,
  },
];

const SOCIAL_ITEMS = [
  {
    label: "GitHub",
    href: "https://github.com/Naqii",
    icon: <FaGithub />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/its.hqq",
    icon: <FaInstagram />,
  },
  {
    label: "Linkedin",
    href: "https://www.linkedin.com/in/sunan-baihaqi-amrullah/",
    icon: <FaLinkedin />,
  },
];

export { BUTTON_ITEMS, SOCIAL_ITEMS, NAV_ITEMS };
