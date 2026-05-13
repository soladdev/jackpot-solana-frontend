"use client";
import { SolanaIcon } from "@/components/svgIcons";
import { UserIcon } from "@/components/svgIcons/UserIcon";
import useWalletData from "@/hooks/useWalletData";
import { useWallet } from "@solana/wallet-adapter-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const pathname = usePathname();
  const wallet = pathname.split("/user/")[1];

  const { data, isLoading } = useWalletData(wallet);

  const history = data?.rounds;

  const played = history ? history.length : 0;

  const biggestWin = history
    ? history
        .filter((h) => h.winner.wallet === wallet)
        .map((h) => h.totalAmount / h.winner.amount)
        .sort((a, b) => b - a)[0]
    : "N/A";

  const wonNumber = history
    ? history.filter((h) => h.winner.wallet === wallet).length
    : 0;
  const lossNumber = played - wonNumber;

  return (
    <div className="max-w-full xl:max-w-[1200px] mx-auto mt-10 font-sans">
      <div className="flex items-center justify-center flex-col">
        <div className="w-[120px] h-[120px] rounded-full bg-gray-600 grid place-content-center">
          <UserIcon className="w-20 h-20" fill="yellow" />
        </div>
        <h2
          title="username"
          className="text-center mt-4 text-2xl text-gray-200"
        >
          {`${wallet.slice(0, 4)}...${wallet.slice(-4)}`}
        </h2>
        <div className="grid grid-cols-2 gap-3 p-3 w-full xl:w-[640px] mx-auto mt-10">
          <div className="border rounded-xl p-3 border-gray-700 shadow-lg bg-gray-800">
            <div className="flex items-center gap-2 font-bold text-gray-300 text-3xl">
              {played}
            </div>
            <p className="text-xs text-white/60 mt-1">Played</p>
          </div>
          <div className="border rounded-xl p-3 border-gray-700 shadow-lg bg-gray-800">
            <div className="flex items-center gap-2 font-bold text-gray-300 text-3xl">
              {biggestWin.toLocaleString()}
              {biggestWin !== "N/A" && <span className="text-xl">x</span>}
            </div>
            <p className="text-xs text-white/60 mt-1">Biggest Win</p>
          </div>
          <div className="border rounded-xl p-3 border-gray-700 shadow-lg bg-gray-800">
            <div className="flex items-center gap-2 text-3xl font-bold text-gray-300">
              <SolanaIcon />
              {wonNumber}
            </div>
            <p className="text-xs text-white/60 mt-1">Won</p>
          </div>
          <div className="border rounded-xl p-3 border-gray-700 shadow-lg bg-gray-800">
            <div className="flex items-center gap-2 text-3xl font-bold text-gray-300">
              {lossNumber}
            </div>
            <p className="text-xs text-white/60 mt-1">Loss</p>
          </div>
        </div>
      </div>
    </div>
  );
}
