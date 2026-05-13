import React, { FC, useMemo } from "react";
import { SolanaIcon, SoundOn } from "../svgIcons";

import ConnectButton from "../ConnectButton";
import { useWallet } from "@solana/wallet-adapter-react";
import useSolBalance from "@/hooks/useSolBalance";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { usePathname } from "next/navigation";

interface HeaderProps {
  title?: string;
}

const Header: FC<HeaderProps> = ({ title = "" }) => {
  
  const pathname = usePathname();
  const roomId = pathname.split("/play/")[1];
  const pageName = useMemo(() => {
    let title = "";
    if (roomId === "0") {
      title = "🦐 Shrimp Room (0.01 SOL - 0.1 SOL)";
    } else if (roomId === "1") {
      title = "🦈 Shark Room (0.1 SOL - 1 SOL)";
    } else if (roomId === "2") {
      title = "🐳 Whale Room (1 SOL - Infinite)";
    }
    return title;
  }, [roomId]);
  
  return (
    <header className="hidden lg:block font-sans border-b border-gray-700 bg-gray-800 relative z-[999]">
      <div className="py-2 px-3 md:px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-white font-bold text-xl">{pageName}</h1>
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

export default Header;

const BalanceBox: FC = () => {
  const { publicKey } = useWallet();
  const { balance } = useSolBalance(publicKey);
  if (balance)
    return (
      <div className="border p-2 flex items-center gap-3 rounded-md border-gray-500 bg-gray-800">
        <SolanaIcon className="w-4 h-4" />
        <span className="text-yellow-400 text-sm font-bold leading-[1]">
          {balance ? (balance / LAMPORTS_PER_SOL).toFixed(2) : 0}
        </span>
      </div>
    );
  else {
    return <></>;
  }
};
