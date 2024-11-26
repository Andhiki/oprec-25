"use client";
// next
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MailWarning, MessageSquare, CircleHelp, Octagon } from "lucide-react";

// components
import Title from "./Title";
import Container from "./Container";
import Logout from "./Logout";

interface DashboardNavbarProps {
  admin?: boolean;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ admin = false }) => {
  const pathname = usePathname();

  const nav = admin
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
      ];

  return (
    <Container parentClass="block lg:hidden">
      <Title />
      {/* Nav Button */}
      <div className="mt-12 flex max-w-full items-center justify-between gap-2 font-medium">
        {nav.map((item, index) => (
          <Link className="w-auto min-w-0 grow" href={item.href} key={index}>
            <div
              className={`flex w-full cursor-pointer items-center justify-start gap-2 rounded-md p-2 transition-all duration-200 ${
                pathname === item.href
                  ? "border-2 border-custom-gray-dark bg-custom-gray-dark"
                  : "border-[1.5px] border-custom-gray text-custom-gray hover:text-custom-silver"
              }`}
              style={{ transition: "color 0.2s ease-in-out" }}
            >
              {item.icon}
              <span className="truncate">{item.tag}</span>
            </div>
          </Link>
        ))}
        <Help />
        <Logout />
      </div>
    </Container>
  );
};

const Help = () => (
  <Link
    href="https://wa.me/6289603375791"
    target="_blank"
    rel="noopener noreferrer"
    className="flex aspect-square shrink-0 items-center justify-center gap-4 rounded-md bg-custom-gray px-2 py-3 text-white hover:bg-custom-gray/90"
  >
    <CircleHelp className="h-5" />
  </Link>
);

export default DashboardNavbar;
