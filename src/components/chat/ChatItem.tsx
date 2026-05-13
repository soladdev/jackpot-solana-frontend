"use client";

import React from "react";
import { base58ToColor } from "@/utils/util";
import { UserIcon } from "../svgIcons/UserIcon";
import moment from "moment";
import { useWallet } from "@solana/wallet-adapter-react";

export interface ChatItemProps {
  username: string;
  content: string;
  timestamp: Date;
}

export default function ChatItem({
  username,
  content,
  timestamp,
}: ChatItemProps) {
  const { color: bgColor, text: textColor } = base58ToColor(username);
  const { publicKey } = useWallet();
  return (
    <div className="rounded-lg p-2 bg-gray-950 mb-1">
      <div className="flex gap-2">
        <div
          className="w-8 h-8 rounded-full grid place-content-center"
          style={{
            background: bgColor,
          }}
        >
          {/* {pfp !== "" ? (
            <Image src={pfp} className="" width={32} height={32} alt="" />
          ) : ( */}
          <UserIcon className="w-5 h-5" fill={textColor} />
          {/* )} */}
        </div>
        <div className="w-[calc(100%-40px)]">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-sm">
              {/* {username !== ""
                ? username
                : `${username.slice(0, 3)}..${username.slice(-3)}`} */}
              {publicKey && publicKey.toBase58() === username
                ? "You"
                : `${username.slice(0, 3)}..${username.slice(-3)}`}
            </span>
            <span className="text-xs text-gray-400">
              {moment(timestamp).format("YYYY-MM-DD hh:mm:ss")}
            </span>
          </div>
          <p className="text-sm text-gray-400">{content}</p>
        </div>
      </div>
    </div>
  );
}
