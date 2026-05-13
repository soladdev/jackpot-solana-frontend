import { BASE_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchGameHistory = async () => {
  const response = await axios.get(`${BASE_URL}api/round/history`);
  return response.data;
};

const useGameHistory = () => {
  return useQuery({
    queryKey: ["user-wallet-data"],
    queryFn: () => fetchGameHistory(),
  });
};

export default useGameHistory;
