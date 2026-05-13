"use client";

import React, { useMemo } from "react";
import { UserIcon } from "../svgIcons/UserIcon";
import { useRouter } from "next/navigation";
import useGameHistory from "@/hooks/useGameHistory";
import { base58ToColor } from "@/utils/util";
import { SolanaIcon } from "../svgIcons";

export default function HistoryTable() {
  const { push } = useRouter();
  const { data } = useGameHistory();

  const tableData = useMemo(() => {
    if (data) {
      const rows = data?.map((item: any) => {
        return {
          ...item,
        };
      });
      return rows;
    } else {
      return [];
    }
  }, [data]);
  return (
    <div className="mt-10">
      <table className="w-full text-sm lg:text-md">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="w-12 py-1 lg:py-3">#</th>
            <th className="w-[120px]">Room</th>
            <th className="w-[160px] lg:w-[240px]">Winner</th>
            <th className="w-[160px]">
              <div className="flex items-center gap-1 justify-center">
                Pool size
                <SolanaIcon className="w-4 h-4" />
              </div>
            </th>
            <th>Nonce(seed)</th>
          </tr>
        </thead>
        <tbody>
          {tableData &&
            tableData.map((row: any, key: number) => (
              <tr
                className="text-gray-400 text-center hover:!bg-gray-700 cursor-pointer border-b border-gray-700/60"
                key={key}
                onClick={() => push(`/user/${row.winner.wallet}`)}
                style={{
                  backgroundColor: key % 2 === 1 ? `#ffffff10` : "translate",
                }}
              >
                <td className="py-4 px-3">{`${row._id.slice(
                  0,
                  2
                )}..${row._id.slice(-4)}`}</td>
                <td className="uppercase font-bold text-xs">
                  {row.roomId === 0
                    ? "🦐 Shrimp"
                    : row.roomId === 1
                    ? "🦈 Shark"
                    : "🐳 Whale"}
                </td>
                <td className="group" title={row.winner.wallet}>
                  <div className="flex items-center justify-center gap-2 group-hover:text-yellow-500">
                    <div
                      className="w-8 h-8 rounded-full grid place-content-center"
                      style={{
                        backgroundColor: base58ToColor(row.winner.wallet).color,
                      }}
                    >
                      <UserIcon
                        className="w-5 h-5"
                        fill={base58ToColor(row.winner.wallet).text}
                      />
                    </div>
                    <p className="w-[100px] text-left">
                      {`${row.winner.wallet.slice(
                        0,
                        4
                      )}..${row.winner.wallet.slice(-5)}`}
                    </p>
                  </div>
                </td>
                <td className="text-yellow-500">
                  {row.totalAmount.toLocaleString()}
                </td>
                <td title={row.seed}>{`${row.seed.slice(
                  0,
                  3
                )}..${row.seed.slice(-3)}`}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
