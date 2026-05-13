import { GameData } from "@/utils/type";
import { useState } from "react";

export const useGameData = (roomId?: string) => {
  const [gameData, setGameData] = useState<GameData>();

  return { gameData };
};
