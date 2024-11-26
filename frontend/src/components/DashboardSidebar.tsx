'use client'
import Logout from "./Logout";
import Link from "next/link";
import Title from "./Title";
import { CircleHelp, MailWarning, MessageSquare, Octagon } from "lucide-react";
import { usePathname } from "next/navigation";


const DashboardSidebar = ({ admin = false }: { admin?: boolean }) => {
  const pathname = usePathname();

  const NAV_LINKS = admin
    ? [
        {
          icon: <Octagon className="h-5 shrink-0" />,
          href: "/admin",
          tag: "Admin",
          newTab: false,
        },
      ]
    : [
        {
          icon: <Octagon className="h-5 shrink-0" />,
          href: "/divisi",
          tag: "Divisi",
          newTab: false,
        },
        {
          icon: <MessageSquare className="h-5 shrink-0" />,
          href: "/wawancara",
          tag: "Wawancara",
          newTab: false,
        },
        {
          icon: <MailWarning className="h-5 shrink-0" />,
          href: "/pengumuman",
          tag: "Pengumuman",
          newTab: false,
        },
        {
          icon: <CircleHelp className="h-5 shrink-0" />,
          href: "https://wa.me/6289603375791",
          tag: "Bantuan",
          newTab: true,
        },
      ];

  return (
    <nav className="sticky top-0 hidden h-screen w-[20vw] shrink-0 flex-col justify-between border-b-2 border-r-2 border-custom-gray-dark bg-custom-black px-[min(3vw,1.5rem)] pb-[7vh] pt-[3vh] lg:flex">
      <div className="space-y-[10vh]">
        <Title />
        <SidebarButtons NAV_LINKS={NAV_LINKS} pathname={pathname} />
      </div>
      <Logout />
    </nav>
  );
};

interface SidebarButtonsProps {
  NAV_LINKS: {
    icon: JSX.Element;
    href: string;
    tag: string;
    newTab: boolean;
  }[];
  pathname: string | null;
}

const SidebarButtons: React.FC<SidebarButtonsProps> = ({
  NAV_LINKS,
  pathname,
}) => (
  <div className="flex flex-col gap-[2vh]">
    {NAV_LINKS.map((navItem, index) => (
      <div
        key={index}
        className={`${
          pathname === navItem.href || "border-b-[1px] border-custom-gray-dark"
        }`}
      >
        <Link
          href={navItem.href}
          target={navItem.newTab ? "_blank" : "_self"}
          rel={navItem.newTab ? "noopener noreferrer" : undefined}
        >
          <div
            className={`flex cursor-pointer items-center gap-4 overflow-clip rounded-md px-[10px] py-3 transition-all duration-200 ${
              pathname === navItem.href
                ? "bg-custom-gray-dark"
                : "text-custom-gray hover:bg-custom-gray-dark/20"
            }`}
          >
            {navItem.icon}
            <h1 className="text-ellipsis">{navItem.tag}</h1>
          </div>
        </Link>
      </div>
    ))}
  </div>
);

export default DashboardSidebar;
