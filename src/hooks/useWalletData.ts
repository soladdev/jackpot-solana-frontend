import { BASE_URL } from "@/config";
import { GameDataItemByRooom } from "@/utils/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface AttendInData {
  wallet: string;
  rounds: GameDataItemByRooom[];
}

const fetchWalletData = async (wallet: string): Promise<AttendInData> => {
  const response = await axios.get<AttendInData>(`${BASE_URL}api/round/user`, {
    params: { wallet },
  });
  return response.data;
};

const useWalletData = (wallet: string) => {
  return useQuery({
    queryKey: ["user-wallet-data", wallet],
    queryFn: () => fetchWalletData(wallet),
  });
};

export default useWalletData;
