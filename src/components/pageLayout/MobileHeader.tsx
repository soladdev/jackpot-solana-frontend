import React, { FC } from "react";
import { MenuOpenIcon, SolanaIcon, SoundOn } from "../svgIcons";
import ConnectButton from "../ConnectButton";
import Image from "next/image";
import Link from "next/link";
import { useSidebar } from "@/contexts/SidebarProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import useSolBalance from "@/hooks/useSolBalance";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

interface HeaderProps {
  title?: string;
}

const MobileHeader: FC<HeaderProps> = ({ title = "" }) => {
  const { openSidebar } = useSidebar();
  return (
    <header className="block lg:hidden relative bg-gray-800 border-b border-gray-700 z-[999] font-sans">
      <div className="py-2 px-3 md:px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="w-6 h-6" onClick={openSidebar}>
            <MenuOpenIcon fill="#ffffff90" />
          </button>
          <Link href={"/"}>
            <div className="w-9 h-9 rounded-full relative">
              <Image src="/images/logo.png" fill alt="" />
            </div>
          </Link>
          <h2 className="text-white font-medium text-xl">{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <BalanceBox />
          <ConnectButton />
          {/* <button className="border p-2 rounded-md border-gray-500 grid place-content-center h-9 w-10">
            <SoundOn fill="white" className="w-5 h-5" />
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;

const BalanceBox: FC = () => {
  const { publicKey } = useWallet();
  const { balance } = useSolBalance(publicKey);
  return (
    <div className="border p-2 flex items-center gap-3 rounded-md border-gray-500">
      <SolanaIcon className="w-4 h-4" />
      <span className="text-yellow-400 text-sm font-bold leading-[1]">
        {balance ? (balance / LAMPORTS_PER_SOL).toFixed(2) : 0}
      </span>
    </div>
  );
};
