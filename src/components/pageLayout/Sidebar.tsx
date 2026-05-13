"use client";

import { LinkType, SIDE_LINKS } from "@/constans";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { SharkIcon, ShrimpIcon, WhaleIcon } from "../svgIcons";

export default function Sidebar() {
  return (
    <div className="w-[80px] border-r border-gray-700 relative hidden lg:block font-sans min-h-[900px]">
      <div className="flex flex-col items-center">
        <Link href={"/"}>
          <div className="w-10 h-10 rounded-full relative mt-3">
            <Image src="/images/logo.png" fill alt="" />
          </div>
        </Link>
        <nav className="mt-6 w-full">
          <ul className="flex flex-col items-center gap-6">
            {SIDE_LINKS.map((link, index) => (
              <LinkItem {...link} key={`${link.title}-${index}`} />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export const LinkItem: FC<LinkType> = ({ title, link, icon }) => {
  const pathname = usePathname();
  const isActive = pathname === link;
  const boxClass =
    "bg-gray-800 border border-gray-700 py-2 px-3 rounded-lg mt-3 shadow-lg flex items-center justify-between hover:bg-gray-900";

  return (
    <li className="group relative">
      <Link href={link}>
        <div className="flex items-center flex-row w-[240px] lg:w-auto lg:flex-col justify-start lg:justify-center">
          <div
            className="w-9 h-9 grid place-content-center"
            style={{
              opacity: isActive ? 1 : 0.6,
            }}
          >
            {icon}
          </div>
          <span
            className="text-md lg:text-xs capitalize"
            style={{
              color: isActive ? "yellow" : "#ffffff90",
            }}
          >
            {title}
          </span>
        </div>
      </Link>
      {link === "/play" && (
        <div className="lg:absolute lg:w-[280px] left-[30px] top-0 lg:bg-gray-800 lg:p-3 rounded-2xl shadow-2xl lg:border border-gray-700 lg:hidden group-hover:block z-10">
          <h2 className="hidden lg:block text-lg font-bold text-white">
            Games
          </h2>
          <Link href={"/play/0"}>
            <div className={boxClass}>
              <div>
                <h3 className="text-md lg:text-xl text-white/80 font-bold">
                  Shrimp Room
                </h3>
                <p className="text-xs text-yellow-400 font-medium">
                  0.01 SOL - 0.1 SOL
                </p>
              </div>
              <ShrimpIcon />
            </div>
          </Link>
          <Link href={"/play/1"}>
            <div className={boxClass}>
              <div>
                <h3 className="text-md lg:text-xl text-white/80 font-bold">
                  Shark Room
                </h3>
                <p className="text-xs text-yellow-400 font-medium">
                  0.1 SOL - 1.00 SOL
                </p>
              </div>
              <SharkIcon />
            </div>
          </Link>
          <Link href={"/play/2"}>
            <div className={boxClass}>
              <div>
                <h3 className="text-md lg:text-xl text-white/80 font-bold">
                  Whale Room
                </h3>
                <p className="text-xs text-yellow-400 font-medium">
                  1 SOL - Infinite
                </p>
              </div>
              <WhaleIcon />
            </div>
          </Link>
        </div>
      )}
    </li>
  );
};
