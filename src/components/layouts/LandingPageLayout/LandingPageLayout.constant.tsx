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

export { BUTTON_ITEMS, NAV_ITEMS };
