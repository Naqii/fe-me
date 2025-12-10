import { cn } from "@/utils/cn";
import { Button, Listbox, ListboxItem } from "@heroui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { JSX } from "react";
import { CiLogout } from "react-icons/ci";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface PropTypes {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
}

const DashboardLayoutSidebar = ({ sidebarItems, isOpen }: PropTypes) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "fixed z-50 flex h-screen w-full max-w-[300px] flex-col justify-between border-r px-4 py-6 transition-all duration-300 lg:relative",
        "bg-background text-foreground border-default-200",
        { "-translate-x-full lg:translate-x-0": !isOpen },
      )}
    >
      {/* Logo */}
      <div>
        <div className="flex w-full justify-center">
          <Image
            src="/images/general/2.jpg"
            alt="logo"
            width={180}
            height={60}
            className="mb-6 w-32 cursor-pointer rounded-full transition-transform duration-300 hover:scale-105"
            onClick={() => router.push("/")}
          />
        </div>

        {/* Sidebar Menu */}
        <Listbox
          items={sidebarItems}
          variant="solid"
          aria-label="Dashboard Menu"
        >
          {(item) => (
            <ListboxItem
              key={item.key}
              as={Link}
              href={item.href}
              className={cn(
                "my-1 h-12 rounded-lg text-base font-medium transition-all duration-200",
                router.pathname.startsWith(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground data-[hover=true]:bg-default-100",
              )}
              startContent={item.icon}
              textValue={item.label}
              aria-labelledby={item.label}
              aria-describedby={item.label}
            >
              {item.label}
            </ListboxItem>
          )}
        </Listbox>
      </div>

      {/* Logout Button */}
      <Button
        color="danger"
        fullWidth
        variant="light"
        className="mt-4 flex justify-start gap-2 rounded-lg px-2 py-1.5 text-base dark:text-red-400 dark:hover:bg-red-500/10"
        size="lg"
        onPress={() => signOut()}
      >
        <CiLogout className="text-xl" />
        Logout
      </Button>
    </div>
  );
};

export default DashboardLayoutSidebar;
