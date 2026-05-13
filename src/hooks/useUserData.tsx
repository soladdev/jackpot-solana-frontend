import { useQuery } from "react-query";
import axios from "axios";
import { HistoryItem, ProfileData } from "@/utils/type";
import { BASE_URL } from "@/config";

interface UserData {
  profile: ProfileData;
  history: HistoryItem[];
  // Add other fields relevant to the user data
}

const fetchUserData = async (wallet: string): Promise<UserData> => {
  const { data } = await axios.get<UserData>(`${BASE_URL}api/user/${wallet}`);
  return data;
};

export const useUserData = (wallet: string) => {
  return useQuery<UserData, Error>(
    ["userData", wallet],
    () => fetchUserData(wallet),
    {
      enabled: !!wallet, // Only fetch if wallet is not empty
    }
  );
};
