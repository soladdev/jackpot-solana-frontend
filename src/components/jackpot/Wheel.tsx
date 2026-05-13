"use client";

import { base58ToColor } from "@/utils/util";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { PlumbIcon, SolanaIcon } from "../svgIcons";
import { COOLDOWN, ROLL_TIME } from "@/constans";
import useCustomWindowSize from "@/hooks/useCustomWindowSize";
import { useWindowSize } from "react-use";
import { useData } from "@/contexts/PageContext";
import { usePathname } from "next/navigation";
import { GameDataItemByRooom } from "@/utils/type";
import { UserIcon } from "../svgIcons/UserIcon";
import Image from "next/image";

type ChatDataItem = {
  title: string;
  value: number;
  color: string;
};

type WheelPrps = {
  isShowWinner: boolean;
  setIsShowWinner: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Wheel({ setIsShowWinner, isShowWinner }: WheelPrps) {
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

  const players = useMemo(() => {
    if (currentRoom) {
      return currentRoom?.players.map((p) => {
        return {
          ...p,
          pfp: "",
          username: "",
        };
      });
    } else {
      return [];
    }
  }, [currentRoom]);

  const { width: initW, height: initH } = useWindowSize();
  const { width: windowWidth } = useCustomWindowSize(initW, initH);

  const time = useMemo(() => {
    const now = new Date().getTime();
    let startedAt = now;
    if (currentRoom) {
      startedAt = new Date(currentRoom.startedAt).getTime();
    }
    const distination = parseInt(((now - startedAt) / 1000).toFixed(0));
    if (distination <= COOLDOWN) {
      return distination;
    } else {
      return 0;
    }
  }, [currentRoom]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSpin, setIsSpin] = useState(false);
  const spinCalled = useRef(false);

  useEffect(() => {
    if (currentRoom) {
      const now = new Date().getTime();
      const startedAt = new Date(currentRoom.startedAt).getTime();
      const cooldownEnd = startedAt + COOLDOWN * 1000;

      if (now >= cooldownEnd) {
        setIsGenerating(true);

        if (roomWinner?.wallet !== "" && !spinCalled.current) {
          setIsSpin(true);
          console.log(currentRoom.randomNumber, currentRoom.randomNumber * 360);
          spin(360 * (10 + currentRoom.randomNumber), ROLL_TIME);
          
          //spin(currentRoom.randomNumber * 360, ROLL_TIME);
          spinCalled.current = true; // Ensure spin is only called once

          // Set isShowWinner to true after ROLL_TIME
          setTimeout(() => {
            setIsShowWinner(true);
          }, ROLL_TIME * 1000 + 2000);
        }
      } else {
        setIsGenerating(false);
      }
    } else {
      setIsGenerating(false);
    }

    if (roomWinner?.wallet === "") {
      spinCalled.current = false; // Reset spinCalled if roomWinner is not available
      setIsSpin(false);
      setIsGenerating(false);
      spin(0, 0);
    }
    // eslint-disable-next-line
  }, [currentRoom]);

  const pieData: ChatDataItem[] | undefined = players?.map(
    ({ username, wallet, amount }) => {
      return {
        title: username !== "" ? username : wallet,
        value: amount,
        color: base58ToColor(wallet).color,
      };
    }
  );

  const [angle, setAngle] = useState<number>(0);

  const spin = (target: number, totalTime: number) => {
    const startTime = Date.now();
    const st = [6000, 7000, 8600, 9000, 9500];

    const updateValue = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      let rate = 0;
      if (elapsedTime < st[0]) {
        rate = elapsedTime / 20000;
      } else if (elapsedTime < st[1]) {
        rate = st[0] / 20000 + (elapsedTime - st[0]) / 40000;
      } else if (elapsedTime < st[2]) {
        rate =
          st[0] / 20000 +
          (st[1] - st[0]) / 40000 +
          (elapsedTime - st[1]) / 80000;
      } else if (elapsedTime < st[3]) {
        rate =
          st[0] / 20000 +
          (st[1] - st[0]) / 40000 +
          (st[2] - st[1]) / 80000 +
          (elapsedTime - st[2]) / 160000;
      } else if (elapsedTime < st[4]) {
        rate =
          st[0] / 20000 +
          (st[1] - st[0]) / 40000 +
          (st[2] - st[1]) / 80000 +
          (st[3] - st[2]) / 160000 +
          (elapsedTime - st[3]) / 200000;
      } else {
        rate =
          st[0] / 20000 +
          (st[1] - st[0]) / 40000 +
          (st[2] - st[1]) / 80000 +
          (st[3] - st[2]) / 160000 +
          (st[4] - st[3]) / 200000 +
          (elapsedTime - st[4]) / 200000;
      }

      const newValue = Math.min(target, rate * target);
      console.log(">_", newValue)
      setAngle(newValue);

      if (elapsedTime < totalTime * 1000) {
        requestAnimationFrame(updateValue);
      }
    };

    requestAnimationFrame(updateValue);
  };

  const sum = players ? players.reduce((sum, p) => sum + p.amount, 0) : 0;
  const { solPrice } = useData();
  const getRadius = () => {
    if (windowWidth > 1240) {
      return 480;
    } else if (windowWidth >= 480) {
      return 420;
    } else {
      return windowWidth - 80;
    }
  };
  const radius = getRadius();

  const wheelNotice = useMemo(() => {
    if (isSpin) {
      return "Drawing Winner...";
    }

    if (isGenerating) {
      return "Generating randomness";
    }

    // Ensure solPrice and sum are numbers before formatting
    const total = (solPrice * sum).toLocaleString();
    return `$ ${total}`;
  }, [isGenerating, isSpin, solPrice, sum]);

  return (
    <div
      className="mx-auto relative grid place-content-center"
      style={{
        width: radius,
        height: radius,
      }}
    >
      <div className="absolute left-1/2 -translate-x-1/2 z-10">
        <PlumbIcon fill="#fff" />
      </div>
      {isShowWinner && roomWinner && roomWinner.wallet !== "" ? (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-30 flex items-center flex-col duration-100"
          style={{
            scale: isShowWinner ? 1 : 1,
          }}
        >
          <div
            className="w-[120px] relative"
            style={{
              aspectRatio: 120 / 96,
            }}
          >
            <Image
              src="/images/winner-frame.svg"
              className="object-contain"
              fill
              alt=""
            />
            <UserIcon
              className="w-[60px] h-[60px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              fill="#eab308"
            />
          </div>
          <p className="text-white text-lg">{`${roomWinner.wallet.slice(
            0,
            3
          )}...${roomWinner.wallet.slice(-3)}`}</p>
          <p className="text-yellow-500 font-bold">
            {`${currentRoom.totalAmount.toLocaleString()} SOL  ${(
              currentRoom.totalAmount / roomWinner.amount
            ).toFixed(2)}X`}
          </p>
        </div>
      ) : (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-30">
          {players.length !== 0 ? (
            <>
              <div className="flex items-center gap-2 text-3xl sm:text-5xl text-white/90 font-bold">
                <SolanaIcon className="w-8 sm:w-12 h-8 sm:h-12" />{" "}
                {sum.toLocaleString()}
              </div>
              <p className="text-white/70 mt-1 text-sm sm:text-md">
                {wheelNotice}
              </p>
            </>
          ) : (
            <>
              <p className="text-4xl font-bold text-white/80">No players</p>
              <p className="text-md mt-2 text-white/80">Waiting betting...</p>
            </>
          )}
        </div>
      )}

      <div
        className="z-10 flip-horizontal"
        style={{
          width: radius,
          height: radius,
        }}
      >
        <PieChart
          animate
          paddingAngle={0.2}
          rounded
          lineWidth={2}
          startAngle={-90}
          totalValue={COOLDOWN}
          data={[{ title: "", value: COOLDOWN - time, color: "#fff" }]}
        />
        <div className="absolute left-0 top-0 w-full h-full rounded-full border-[#ffffff30] border-[6px]"></div>
      </div>
      {players.length !== 0 ? (
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            transform: `translate(-50%, -50%) rotate(${angle}deg)`,
            width: radius - 24,
            height: radius - 24,
          }}
        >
          {pieData && (
            <PieChart
              animate={false}
              paddingAngle={0.2}
              lineWidth={28}
              startAngle={-90}
              data={pieData}
            />
          )}
        </div>
      ) : (
        <div
          className="absolute left-1/2 top-1/2 border-[60px] rounded-full border-[#ffffff70]"
          style={{
            transform: `translate(-50%, -50%)`,
            width: radius - 24,
            height: radius - 24,
          }}
        />
      )}
    </div>
  );
}
