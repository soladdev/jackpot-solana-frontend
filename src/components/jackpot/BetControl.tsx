import React, { useMemo, useState } from "react";
import { SolanaIcon } from "../svgIcons";
import { usePathname } from "next/navigation";
import { solConnection } from "@/utils/util";
import { useWallet } from "@solana/wallet-adapter-react";
import SpinIcon from "../svgIcons/SpinIcon";
import {
  ComputeBudgetProgram,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  FEE_WALLET,
  GAME_FEE,
  GAME_WALLET_0,
  GAME_WALLET_1,
  GAME_WALLET_2,
} from "@/constans";
import enterGame from "@/utils/apis/enterGame";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { toast } from "react-toastify";
import { useData } from "@/contexts/PageContext";
import { GameDataItemByRooom } from "@/utils/type";

export default function BetControl() {
  const wallet = useWallet();
  const { gameData } = useData();
  const { setVisible: setWalletVisible } = useWalletModal();

  const query = usePathname();

  const roomId = query.split("/play/")[1];
  const defaultAmount = useMemo(() => {
    // Extract the roomId from the query string
    // Initialize default value
    let value = 0.01;
    // Update value based on roomId
    if (roomId === "1") {
      value = 0.1;
    } else if (roomId === "2") {
      value = 1;
    }
    return value;
    // eslint-disable-next-line
  }, [query, roomId]);

  const [loading, setLoading] = useState(false);
  const [betAmount, setBetAmount] = useState<number | string>(defaultAmount);

  const btnClass =
    "w-1/3 sm:w-auto border border-gray-700 rounded-lg sm:p-2 w-12 text-sm font-bold h-8 sm:h-12 text-white/80 hover:bg-gray-600 duration-200";
  const betBtnClass =
    "w-full py-2 sm:py-3 text-md sm:text-lg bg-yellow-500 hover:bg-yellow-600 duration-200 text-gray-950 font-bold uppercase border border-gray-700 rounded-lg mt-2 disabled:pointer-events-none disabled:opacity-70";

  async function handlePlay() {
    if (wallet.publicKey) {
      setLoading(true);
      try {
        const tx = new Transaction();
        const getWallet = () => {
          let roomWallet = GAME_WALLET_0;
          if (roomId === "1") {
            roomWallet = GAME_WALLET_1;
          } else if (roomId === "2") {
            roomWallet = GAME_WALLET_2;
          }
          return new PublicKey(roomWallet);
        };
        const toGameWallet = getWallet();
        const feeWallet = new PublicKey(FEE_WALLET);
        tx.add(
          SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: toGameWallet,
            lamports: (betAmount as number) * LAMPORTS_PER_SOL,
          })
        );
        tx.add(
          SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: feeWallet,
            lamports: (betAmount as number) * LAMPORTS_PER_SOL * GAME_FEE,
          })
        );

        const updateCpIx = ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: 5_000_000,
        });
        const updateCuIx = ComputeBudgetProgram.setComputeUnitLimit({
          units: 200_000,
        });

        tx.add(updateCpIx, updateCuIx);

        const { blockhash } = await solConnection.getLatestBlockhash();
        tx.feePayer = wallet.publicKey;
        tx.recentBlockhash = blockhash;

        if (wallet.signTransaction) {
          const signedTx = await wallet.signTransaction(tx);
          const signature = await solConnection.sendRawTransaction(
            signedTx.serialize(),
            {
              skipPreflight: true,
              maxRetries: 3,
              preflightCommitment: "confirmed",
            }
          );
          console.log("Signature:", signature, roomId);

          await solConnection.confirmTransaction(signature, "finalized");

          await enterGame(signature, roomId);
        }
        toast.success("Deposit done!");
        setLoading(false);
      } catch (error) {
        console.log("Send error", error);
        //toast.error("Something went wrong! Please try again");
        setLoading(false);
      }
    }
  }

  const handleButtonClick = (multiplier: number) => {
    setBetAmount((prev) => {
      const numericValue = typeof prev === "string" ? parseFloat(prev) : prev;
      return isNaN(numericValue) ? defaultAmount : numericValue * multiplier;
    });
  };

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setBetAmount(isNaN(value) ? "" : value);
  };

  const currentRoom = useMemo(() => {
    let room: GameDataItemByRooom | null | undefined = gameData?.room_0;
    if (roomId === "1") {
      room = gameData?.room_1;
    } else if (roomId === "2") {
      room = gameData?.room_2;
    }
    return room;
  }, [gameData, roomId]);

  const buttonDisable = useMemo(() => {
    const amount = betAmount as number;
    
    const rangeMin = roomId === "0" ? 0.01 : roomId === "1" ? 0.1 : 1;
    const rangeMax = roomId === "0" ? 0.1 : roomId === "1" ? 1 : 99999;
  
    const isWalletMissing = wallet.publicKey === null;
    const isPlayerInCurrentRoom = currentRoom?.players?.some(
      (player) => player.wallet === wallet.publicKey?.toBase58()
    );
    const isAmountOutOfRange = amount < rangeMin || amount > rangeMax;
    const isLoading = loading;
  
    return isWalletMissing || isPlayerInCurrentRoom || isAmountOutOfRange || isLoading;
  }, [wallet.publicKey, currentRoom, betAmount, roomId, loading]);
  
  return (
    <div className="max-w-[420px] mx-auto p-2 mt-10">
      <div className="flex gap-2 flex-col sm:flex-row">
        <div className="w-full sm:w-[calc(100%-160px)] border border-gray-700 rounded-lg h-12 flex justify-between items-center relative">
          <input
            placeholder="Enter SOL amount"
            className="bg-transparent h-12 px-3 w-full text-white/90 font-medium"
            min={defaultAmount}
            value={betAmount}
            type="number"
            step={defaultAmount}
            onChange={handleBetAmountChange}
          />
          <div className="h-12 w-12 grid place-content-center absolute right-0 top-0">
            <SolanaIcon className="" />
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className={btnClass} disabled={buttonDisable} onClick={() => handleButtonClick(0.5)}>
            0.5x
          </button>
          <button className={btnClass} disabled={buttonDisable} onClick={() => handleButtonClick(2)}>
            2.0x
          </button>
          <button className={btnClass} disabled={buttonDisable} onClick={() => handleButtonClick(4)}>
            4.0x
          </button>
        </div>
      </div>
      {wallet.publicKey ? (
        <button className={betBtnClass} disabled={buttonDisable} onClick={handlePlay}>
          {loading ? (
            <div className="flex items-center justify-center gap-1">
              <SpinIcon />
              waiting...
            </div>
          ) : (
            "place bet"
          )}
        </button>
      ) : (
        <button className={betBtnClass} onClick={() => setWalletVisible(true)}>
          connect wallet
        </button>
      )}
    </div>
  );
}
