"use client";

import React, { useMemo } from "react";
import { UserIcon } from "../svgIcons/UserIcon";
import { useRouter } from "next/navigation";
import useGameHistory from "@/hooks/useGameHistory";
import { GameDataItemByRooom } from "@/utils/type";
import { base58ToColor } from "@/utils/util";
import { SolanaIcon } from "../svgIcons";

interface PlayerStats {
  wallet: string;
  totalAmount: number;
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  biggestWin: {
    multiplier: number;
    gameId: string;
  };
}

export default function LeaderboardTable() {
  const { push } = useRouter();
  const { data: history } = useGameHistory();

  const tableData = useMemo(() => {
    if (!history || history.length === 0) return [];
    const playerStatsMap = new Map<string, PlayerStats>();

    history.forEach((game: any) => {
      game.players.forEach((player: any) => {
        const { wallet, amount } = player;

        // Initialize stats if not present
        if (!playerStatsMap.has(wallet)) {
          playerStatsMap.set(wallet, {
            wallet,
            totalAmount: 0,
            gamesPlayed: 0,
            gamesWon: 0,
            gamesLost: 0,
            biggestWin: {
              multiplier: 0,
              gameId: "",
            },
          });
        }

        const playerStats = playerStatsMap.get(wallet)!;

        // Update total amount
        playerStats.totalAmount += game.totalAmount;

        // Update games played
        playerStats.gamesPlayed++;

        // Update games won
        if (game.winner.wallet === wallet) {
          playerStats.gamesWon++;
          const multiplier = game.totalAmount / game.winner.amount;
          if (multiplier > playerStats.biggestWin.multiplier) {
            playerStats.biggestWin.multiplier = multiplier;
            playerStats.biggestWin.gameId = game.roomId.toString();
          }
        } else {
          // Update games lost
          playerStats.gamesLost++;
        }

        playerStatsMap.set(wallet, playerStats);
      });
    });

    // Convert map to array
    const playerStatsArray = Array.from(playerStatsMap.values());

    // Sort by total amount
    playerStatsArray.sort((a, b) => b.totalAmount - a.totalAmount);

    console.log(playerStatsArray);

    return playerStatsArray;
  }, [history]);

  return (
    <div className="mt-10">
      <table className="w-full">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="py-2">No</th>
            <th className="w-[240px]">Wallet</th>
            <th>Played</th>
            <th>Win</th>
            <th>Loss</th>
            <th>Biggest Win (x)</th>
            <th>
              <div className="flex items-center justify-center gap-1">
                Total Earning <SolanaIcon className="w-4 h-4" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {tableData.map((row, key) => (
            <tr
              className="text-gray-400 text-center hover:!bg-gray-700 cursor-pointer"
              style={{
                background: key % 2 === 1 ? `#ffffff10` : "translate",
              }}
              key={key}
              onClick={() => push(`/user/${row.wallet}`)}
            >
              <td className="py-4">{key + 1}</td>
              <td className="w-12">
                <div className="flex items-center justify-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full bg-gray-500 grid place-content-center"
                    style={{
                      backgroundColor: base58ToColor(row.wallet).color,
                    }}
                  >
                    <UserIcon className="w-5 h-5" fill={base58ToColor(row.wallet).text} />
                  </div>
                  <p className="w-[100px] text-left">{`${row.wallet.slice(
                    0,
                    4
                  )}..${row.wallet.slice(-5)}`}</p>
                </div>
              </td>
              <td>{row.gamesPlayed}</td>
              <td>{row.gamesWon}</td>
              <td>{row.gamesLost}</td>
              <td title={row.biggestWin.gameId}>
                {row.biggestWin.multiplier.toLocaleString()}
              </td>
              <td>{row.totalAmount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
