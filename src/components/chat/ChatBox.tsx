"use client";

import { useChat } from "@/contexts/ChatProvider";
import React, { useEffect, useRef, useState } from "react";
import { ChatIcon, CloseIcon, SendIcon } from "../svgIcons";
import { ChatItemType } from "@/utils/type";
import ChatItem, { ChatItemProps } from "./ChatItem";
import { useData } from "@/contexts/PageContext";

import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import useChatData from "@/hooks/useChatData";
import { BASE_URL } from "@/config";

export default function ChatBox() {
  const { isVisible, openChat, closeChat } = useChat();
  const chatListRef = useRef<HTMLDivElement>(null);
  const { onlines } = useData();
  const { publicKey, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const { messages, refetch } = useChatData();

  const [content, setContent] = useState("");

  const send = async () => {
    if (publicKey === null || content === "") return;
    await axios
      .post(`${BASE_URL}api/chat/add`, {
        sender: publicKey.toBase58(),
        content: content,
      })
      .then((res) => {
        refetch();
        setContent("");
        if (chatListRef.current) {
          chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
        }
      })
      .catch((err) => console.log(err));
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat box when it mounts
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [isVisible]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc") {
        closeChat();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (isVisible) {
    return (
      <div className="fixed right-5 bottom-5 rounded-2xl w-[320px] h-[500px] bg-[#191f28] border border-[#ffffff17] shadow-2xl z-[999] overflow-hidden font-sans">
        <div className="p-2 px-3 flex items-end justify-between border-b border-gray-700">
          <span className="text-yellow-400 font-medium">Chat</span>
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            {onlines} online
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          </div>
        </div>
        <div
          className="p-1 h-[400px] overflow-auto mr-1 pb-5"
          ref={chatListRef}
        >
          {messages &&
            messages.map((chat, index) => <ChatItem {...chat} key={index} />)}
        </div>
        {connected ? (
          <div className="absolute left-0 bottom-0 w-full min-h-12 border-t border-[#242d39] flex items-center justify-between bg-[#232c39]">
            <div className="w-full ml-1">
              <input
                className="py-1 px-2 text-sm w-full text-gray-300 rounded-lg bg-transparent resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your message"
              />
            </div>
            <div className="flex gap-1">
              <button
                className="w-7 h-7 grid place-content-center"
                onClick={send}
              >
                <SendIcon className="w-6 h-6" fill="#929292" />
              </button>
              <button
                className="w-8 h-8 grid place-content-center"
                onClick={closeChat}
              >
                <CloseIcon className="w-7 h-7" fill="#979797" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <button
              className="w-[calc(100%-40px)] text-yellow-500 border mx-2.5 py-1 rounded border-yellow-600 mt-1"
              onClick={() => setVisible(true)}
            >
              Please connect wallet
            </button>
            <button
              className="w-8 h-8 grid place-content-center mr-2"
              onClick={closeChat}
            >
              <CloseIcon className="w-7 h-7" fill="#979797" />
            </button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="fixed right-5 bottom-5 rounded-xl shadow-xl">
        <button
          className="bg-yellow-400 w-12 h-12 rounded-full grid place-content-center"
          onClick={openChat}
        >
          <ChatIcon className="w-8 h-8" />
        </button>
      </div>
    );
  }
}
