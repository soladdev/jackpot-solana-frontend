"use client";

import { BASE_URL } from "@/config";
import { GameData, ProfileData, WinnerType } from "@/utils/type";
import { useWallet } from "@solana/wallet-adapter-react";

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import io from "socket.io-client";

interface PageContextType {
  solPrice: number;
  isSignIn: boolean;
  userData: ProfileData | null;
  gameData: GameData | undefined;
  onlines: number;
}

export const PageContext = createContext<PageContextType | undefined>({
  solPrice: 180,
  isSignIn: false,
  userData: null,
  gameData: undefined,
  onlines: 0,
});

export function useData() {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("useData must be used within a ModalProvider");
  }
  return context;
}

interface PageProviderProps {
  children: ReactNode;
}

export function PageProvider({ children }: PageProviderProps) {
  const { publicKey, connected } = useWallet();
  const [solPrice, setSolPrice] = useState(168.47);
  const [gameData, setGameData] = useState<GameData>();
  const [onlines, setOnlines] = useState(0);

  const [isSignIn, setIsSignIn] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    wallet: publicKey?.toBase58() as string,
    pfp: "",
  });

  useEffect(() => {
    const socket = io(BASE_URL);
    // socket.on("winner", (winner) => {
    //   console.log(winner);
    //   setWinner(winner);
    //   setTimeout(() => {
    //     setWinner(null);
    //   }, 20_000);
    // });

    socket.on("price", (price) => {
      if (price) {
        setSolPrice(price.value);
      }
    });

    socket.on("round", (round) => {
      setGameData(round);
    });

    socket.on("count", (cnt: number) => {
      setOnlines(cnt);
    });

    socket.on("chat", (msgs) => {
      console.log(msgs);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (publicKey) {
      // toast.success("Your login was successful!");
      // const signinData = localStorage.getItem("signin");
      // if (signinData === null || signinData !== publicKey.toBase58()) {
      //   apiPosts
      //     .post("/nonce", {
      //       wallet: publicKey,
      //     })
      //     .then((res) => {
      //       const nonce = res.data.value;
      //       if (nonce) {
      //         web3Posts
      //           .req({ method: "POST", url: "/sign-in" }, nonce, {
      //             publicKey,
      //             signMessage: wallet.signMessage!,
      //           })
      //           .then((result: any) => {
      //             console.log({ result });
      //             setIsSignIn(true);
      //             // Set localStorage
      //             localStorage.setItem("signin", publicKey.toBase58());
      //             setUserData({
      //               username: result.username as unknown as string,
      //               wallet: publicKey.toBase58(),
      //               pfp: result.avatar,
      //             });
      //             toast.success("Your login was successful!");
      //           })
      //           .catch((error) => {
      //             console.log("sign error", error);
      //           });
      //       }
      //     })
      //     .catch((err) => console.log(err));
      // }
    }
  }, [publicKey, connected]);

  const pageContextValue: PageContextType = {
    solPrice: solPrice,
    gameData,
    isSignIn,
    userData,
    onlines,
  };

  return (
    <PageContext.Provider value={pageContextValue}>
      {children}
    </PageContext.Provider>
  );
}
