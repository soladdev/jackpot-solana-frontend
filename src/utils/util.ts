import { Connection } from "@solana/web3.js";
import { SOLANA_RPC } from "@/config";
import { COLORS } from "@/constans";
import { PlayerItemMap } from "./type";

export const solConnection = new Connection(SOLANA_RPC);

export const base58ToColor = (publicKey: string) => {
  // let hex = "";
  // for (let i = 0; i < publicKey.length; i++) {
  //   let code = publicKey.charCodeAt(i).toString(16);
  //   hex += code.padStart(2, "0");
  // }
  // return "#" + hex.slice(0, 6);

  let hash = 0;
  for (let i = 0; i < publicKey.length; i++) {
    const char = publicKey.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }

  // Ensure the hash is non-negative
  hash = Math.abs(hash);

  // Use the hash to select a color
  const index = hash % COLORS.length;

  return COLORS[index];
};

export function groupByWallet(players: PlayerItemMap[]): PlayerItemMap[] {
  const walletMap: { [wallet: string]: PlayerItemMap } = {};

  players.forEach((player) => {
    if (walletMap[player.wallet]) {
      // If the wallet already exists in the map, sum the amount
      walletMap[player.wallet].amount += player.amount;
    } else {
      // If the wallet does not exist, create a new entry
      walletMap[player.wallet] = { ...player }; // Create a copy of the player object
    }
  });

  // Convert the map back to an array
  return Object.values(walletMap);
}

export const roundToDecimalPlaces = (
  num: number,
  decimalPlaces: number
): number => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round((num + Number.EPSILON) * factor) / factor;
};
