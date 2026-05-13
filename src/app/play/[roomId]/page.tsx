"use client";
import UserSidePanel from "@/components/jackpot/UserSidePanel";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import WheelBox from "@/components/jackpot/WheelBox";
import { useData } from "@/contexts/PageContext";
import { GameDataItemByRooom } from "@/utils/type";

export default function PlayPage() {
  const { push } = useRouter();
  const pathname = usePathname();
  const roomId = pathname.split("/play/")[1];

  const { gameData } = useData();

  const correntRoom = useMemo(() => {
    let room: GameDataItemByRooom | null | undefined = gameData?.room_0;
    if (roomId === "1") {
      room = gameData?.room_1;
    } else if (roomId === "2") {
      room = gameData?.room_2;
    }
    return room;
  }, [gameData, roomId]);

  useEffect(() => {}, [correntRoom]);

  useEffect(() => {
    if (roomId !== "0" && roomId !== "1" && roomId !== "2") {
      toast.error("Wrong room ID. Move to shrimp room");
      push("/play/0");
    }
  }, [pathname, push, roomId]);

  return (
    <div className="max-w-[1540px] mx-4 xl:mx-6 2xl:mx-auto flex gap-2 items-start flex-col-reverse md:flex-row">
      <UserSidePanel />
      <WheelBox  />
    </div>
  );
}
