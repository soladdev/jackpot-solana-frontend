"use client";

import MobileHeader from "@/components/pageLayout/MobileHeader";
import MobileSidebar from "@/components/pageLayout/MobileSidebar";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for your modal context
interface SidebarContextType {
  isVisible: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

// Create the modal context
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Define the modal provider component
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(true);

  const openSidebar = () => {
    setIsVisible((prev) => !prev);
    document.body.classList.add("modal-open");
  };

  const closeSidebar = () => {
    setIsVisible((prev) => !prev);
    document.body.classList.remove("modal-open");
  };

  return (
    <SidebarContext.Provider value={{ isVisible, openSidebar, closeSidebar }}>
      <MobileHeader />
      {children}
      <MobileSidebar />
    </SidebarContext.Provider>
  );
};

// Custom hook to access the modal context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
