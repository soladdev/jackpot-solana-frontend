"use client";
import React, { ReactNode } from "react";
import { PageProvider } from "@/contexts/PageContext";
import { SolanaWalletProvider } from "@/contexts/SolanaWalletProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ChatProvider } from "@/contexts/ChatProvider";
import { SidebarProvider } from "@/contexts/SidebarProvider";
import Header from "./pageLayout/Header";
import Sidebar from "./pageLayout/Sidebar";
import ChatBox from "./chat/ChatBox";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SolanaWalletProvider>
      <QueryClientProvider client={queryClient}>
        <PageProvider>
          <SidebarProvider>
            <ChatProvider>
              <main className={`lg:min-h-screen backdrop-blur-lg bg-gray-800`}>
                <div className="flex">
                  <Sidebar />
                  <div className="w-full lg:w-[calc(100%-80px)]">
                    <Header />
                    {children}
                  </div>
                </div>
              </main>
              <ChatBox />
              <ToastContainer pauseOnFocusLoss={false} closeOnClick theme="colored" />
            </ChatProvider>
          </SidebarProvider>
        </PageProvider>
      </QueryClientProvider>
    </SolanaWalletProvider>
  );
}
