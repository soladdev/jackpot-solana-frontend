import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the type for your modal context
interface ChatContextType {
  isVisible: boolean;
  openChat: () => void;
  closeChat: () => void;
}

// Create the modal context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Define the modal provider component
export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);

  const openChat = () => {
    setIsVisible(true);
  };

  const closeChat = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      // Cleanup function to remove class when component unmounts
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    <ChatContext.Provider value={{ isVisible, openChat, closeChat }}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to access the modal context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
