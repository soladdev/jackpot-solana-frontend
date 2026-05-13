export interface PlayerItemOnPool {
  username: string;
  wallet: string;
  deposit: number;
  pfp?: string;
  isWinner?: boolean;
}

export interface ChatItemType {
  id: string;
  username: string;
  wallet: string;
  content: string;
  pfp: string;
  timestamp: Date;
}

export interface ProfileData {
  wallet: string;
  pfp: string;
  username: string;
}

export interface HistoryItem {
  roomId: string;
  enterData: Date;
  betAmount: number;
  isWinner: boolean;
}

export interface PlayerItem {
  wallet: string;
  amount: number;
  range: {
    startPoint: number;
    endPoint: number;
  };
}

export interface PlayerItemMap {
  wallet: string;
  amount: number;
  range: {
    startPoint: number;
    endPoint: number;
  };
  pfp?: string;
  username: string;
}

export interface GameDataItemByRooom {
  roomId: number;
  startedAt: Date;
  created_at: Date;
  updated_at: Date;
  status: string;
  randomNumber: number;
  players: PlayerItem[];
  totalAmount: number;
  seed: string;
  winner: {
    wallet: string;
    amount: number;
    transaction: string;
  };
}

export interface GameData {
  room_0: GameDataItemByRooom;
  room_1: GameDataItemByRooom;
  room_2: GameDataItemByRooom;
}

export interface WinnerType {
  amount: number;
  range: {
    startPoint: number;
    endPoint: number;
  };
  rewardAmount: number;
  roomId: string;
  transaction: string;
  wallet: string;
  random: number;
}

export interface Winners {
  room_0: WinnerType | null;
  room_1: WinnerType | null;
  room_2: WinnerType | null;
}
