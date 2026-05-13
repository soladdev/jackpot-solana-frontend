import { GameDataItemByRooom, PlayerItemMap } from "@/utils/type";
import Image from "next/image";
import React, { FC, useMemo } from "react";
import { UserIcon } from "../svgIcons/UserIcon";
import { base58ToColor } from "@/utils/util";
import { SolanaIcon } from "../svgIcons";
import { useData } from "@/contexts/PageContext";
import { usePathname } from "next/navigation";

export default function UserSidePanel() {
  const pathname = usePathname();
  const roomId = pathname.split("/play/")[1];
  const { gameData } = useData();

  const players = useMemo(() => {
    let currentRoom: GameDataItemByRooom | null | undefined = gameData?.room_0;
    if (roomId === "1") {
      currentRoom = gameData?.room_1;
    } else if (roomId === "2") {
      currentRoom = gameData?.room_2;
    }
    return currentRoom?.players.map((p) => {
      return {
        ...p,
        pfp: "",
        username: "",
      };
    });
  }, [gameData, roomId]);

  return (
    <div className="w-full md:w-1/3 xl:w-1/5 bg-gray-900 border border-gray-700 rounded-lg p-2 h-[500px] md:h-[calc(100vh-120px)] lg:min-h-[740px] md:mt-6">
      <div className="flex justify-between items-center text-white py-2 px-3">
        <span className="font-medium">
          {players ? `${players.length} players` : `No player`}{" "}
        </span>
      </div>
      <div className="h-[calc(100%-80px)] overflow-auto pr-1">
        {players &&
          players.length !== 0 &&
          players
            .sort((a, b) => b.amount - a.amount)
            .map((player, index) => (
              <UserItemOnSidebar
                player={player}
                poolSize={players.reduce((sum, p) => sum + p.amount, 0)}
                key={`${player.wallet}-${index}`}
              />
            ))}
      </div>
    </div>
  );
}

interface ItemProps {
  player: PlayerItemMap;
  poolSize: number;
}

export const UserItemOnSidebar: FC<ItemProps> = ({ player, poolSize }) => {
  const { username, wallet, pfp, amount } = player;
  const winPecent = ((amount / poolSize) * 100).toFixed(2);
  const bandColor = base58ToColor(wallet);
  return (
    <div
      className="mb-2 bg-gray-800 shadow-md flex justify-between rounded hover:bg-gray-700 py-2 px-2.5 border-r-[12px] font-sans"
      style={{ borderColor: bandColor.color }}
    >
      <div className="flex items-center gap-2">
        {pfp ? (
          <Image
            width={36}
            height={36}
            className="rounded-full"
            src={pfp}
            alt=""
          />
        ) : (
          <div
            className="w-9 h-9 rounded-full grid place-content-center"
            style={{
              backgroundColor: bandColor.color,
            }}
          >
            <UserIcon className="w-5 h-5" fill={bandColor.text} />
          </div>
        )}
        <div className="">
          <p className="text-yellow-400">
            {username !== ""
              ? username
              : `${wallet.slice(0, 3)}...${wallet.slice(-3)}`}
          </p>
          {/* <p className="text-xs text-white/60">{xp}XP</p> */}
        </div>
      </div>
      <div className="flex items-end flex-col">
        <p className="font-medium text-white/80">{winPecent}%</p>
        <div className="font-medium text-white/80 text-xs flex items-center gap-1 text-yellow-300">
          {amount}
          <SolanaIcon className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
};
