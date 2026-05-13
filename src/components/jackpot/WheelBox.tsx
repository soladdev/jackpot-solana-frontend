"use client";

import React, { useEffect, useMemo, useState } from "react";
import BetControl from "./BetControl";
import GameInfo from "./GameInfo";
import dynamic from "next/dynamic";
import { useData } from "@/contexts/PageContext";
import { usePathname } from "next/navigation";
import { GameDataItemByRooom } from "@/utils/type";
import { useWallet } from "@solana/wallet-adapter-react";

const WinningConfetti = dynamic(
  () => import("@/components/jackpot/WinningConfetti"),
  {
    ssr: false,
  }
);

const Wheel = dynamic(() => import("./Wheel"), {
  ssr: false,
});

export default function WheelBox() {
  const [isShowWinner, setIsShowWinner] = useState(false);
  const { publicKey } = useWallet();

  const { gameData } = useData();
  const pathname = usePathname();
  const roomId = pathname.split("/play/")[1];
  const currentRoom = useMemo(() => {
    let room: GameDataItemByRooom | null | undefined = gameData?.room_0;
    if (roomId === "1") {
      room = gameData?.room_1;
    } else if (roomId === "2") {
      room = gameData?.room_2;
    }
    return room;
  }, [gameData, roomId]);

  const roomWinner = currentRoom?.winner;

  useEffect(() => {
    if (roomWinner?.wallet === "") {
      setIsShowWinner(false);
    }
  }, [roomWinner]);

  return (
    <div className="w-full md:w-2/3 xl:w-4/5 flex gap-2 flex-col xl:flex-row font-sans">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-2 xl:h-[calc(100vh-120px)] mt-2 md:mt-6 w-full xl:w-2/3 lg:min-h-[740px]">
        <div className="flex justify-between items-center text-white py-2 px-3">
          <span className="font-medium">Current Round</span>
        </div>
        <Wheel setIsShowWinner={setIsShowWinner} isShowWinner={isShowWinner} />
        <BetControl />
      </div>
      <GameInfo />
      {isShowWinner &&
        roomWinner &&
        roomWinner.wallet !== "" &&
        roomWinner.wallet === publicKey?.toBase58() && <WinningConfetti />}
    </div>
  );
}
