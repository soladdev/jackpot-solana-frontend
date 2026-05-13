import { BASE_URL } from "@/config";
import { ChatItemType } from "@/utils/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchChatData = async () => {
  const response = await axios.get(`${BASE_URL}api/chat/all`);
  return response.data;
};

const useChatData = () => {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["chat-data"],
    queryFn: () => fetchChatData(),
  });
  const msgs: ChatItemType[] = data
    ? data.map((item: any) => {
        return {
          username: item.sender,
          content: item.content,
          timestamp: item.created_at,
        };
      })
    : [];
  return {
    messages: msgs,
    isLoading,
    refetch,
    error,
  };
};

export default useChatData;
