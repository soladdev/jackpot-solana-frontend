import React, { useMemo } from "react";
import { useData } from "@/contexts/PageContext";
import { usePathname } from "next/navigation";
import { GameDataItemByRooom } from "@/utils/type";
import { useWallet } from "@solana/wallet-adapter-react";
import { SolanaIcon } from "../svgIcons";

export default function GameInfo() {
  const { gameData } = useData();
  const { publicKey: userPubKey } = useWallet();
  const pathname = usePathname();
  const roomId = pathname.split("/play/")[1];

  const correntRoom = useMemo(() => {
    let room: GameDataItemByRooom | null | undefined = gameData?.room_0;
    if (roomId === "1") {
      room = gameData?.room_1;
    } else if (roomId === "2") {
      room = gameData?.room_2;
    }
    return room;
  }, [gameData, roomId]);

  const players = useMemo(() => {
    if (correntRoom) {
      return correntRoom?.players.map((p) => {
        return {
          ...p,
          pfp: "",
          username: "",
        };
      });
    } else {
      return [];
    }
  }, [correntRoom]);
  const sum = players ? players.reduce((sum, p) => sum + p.amount, 0) : 0;

  const winChange =
    ((players.find((p) => p.wallet === userPubKey?.toBase58())
      ?.amount as unknown as number) /
      sum) *
    100;
  const userData = players.find((p) => p.wallet === userPubKey?.toBase58());

  return (
    <div className="hidden md:block w-full xl:w-1/3 bg-gray-900 border border-gray-700 rounded-lg p-2 xl:mt-6 pb-10">
      <div className="flex justify-between items-center text-white py-2 px-3">
        <span className="font-medium">Round Detail</span>
      </div>
      <div className="grid grid-cols-2 gap-3 p-3">
        <div>
          <div className="flex items-center gap-2 font-bold text-gray-300">
            <SolanaIcon className="w-4 h-4" />
            {` `}
            {sum.toLocaleString()}
          </div>
          <p className="text-xs text-white/60 mt-1">Prize Pool</p>
        </div>
        <div>
          <div className="flex items-center gap-2 font-bold text-gray-300">
            {players.length}
          </div>
          <p className="text-xs text-white/60 mt-1">Players</p>
        </div>
        <div>
          <div className="flex items-center gap-2 font-bold text-gray-300">
            {userData ? (
              <>
                <SolanaIcon className="w-4 h-4" />
                {` `}
                {userData.amount.toLocaleString()}
              </>
            ) : (
              "N/A"
            )}
          </div>
          <p className="text-xs text-white/60 mt-1">Your Entries</p>
        </div>
        <div>
          <div className="flex items-center gap-2 font-bold text-gray-300">
            {userData ? `${winChange.toLocaleString()}%` : "N/A"}
          </div>
          <p className="text-xs text-white/60 mt-1">Your Win Chance</p>
        </div>
      </div>
    </div>
  );
}
