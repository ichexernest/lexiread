'use client';

import { usePathname } from "next/navigation";
import {
  FaAmilia,
  FaNewspaper
} from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { FaDoorOpen } from "react-icons/fa";
import MainButton from "../MainButton";

const links = [
  { href: "/Home", icon: <AiFillHome />, hint: "Home" },
  { href: "/Voc", icon: <FaAmilia />, hint: "Vocabularies" },
  { href: "/Article", icon: <FaNewspaper />, hint: "Articles" },
  { href: "/Login", icon: <FaDoorOpen />, hint: "Logout" }
];

export default function MainFunctionBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-3 left-0 right-0 flex justify-center items-center gap-4 p-4 md:left-0 md:flex-col md:right-auto">
      {links.map(({ href, icon, hint }) => {
        const isActive =
          pathname === href || pathname.startsWith(href);
        if (isActive || pathname === "/Quiz") return null;

        return (
          <MainButton
            key={href}
            href={href}
            icon={icon}
            hint={hint}
            haveHint={true}
          />
        );
      })}
    </div>
  );
}
