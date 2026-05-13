import { BASE_URL } from "@/config";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

interface RequestPlayResponse {
  // Define the shape of the response data here
  // For example, if the response contains { success: boolean, data: any }
  success: boolean;
  data: any;
}

interface RequestPlayError {
  // Define the shape of the error data here
  // For example, if the error contains { message: string }
  message: string;
}

const enterGame = async (
  signature: string,
  roomId: string
): Promise<AxiosResponse<RequestPlayResponse>> => {
  try {
    const response = await axios.post<RequestPlayResponse>(
      `${BASE_URL}api/round/enter`,
      {
        signature,
        roomId,
      }
    );
    console.log(response);
    if (response.data.data?.content) {
      toast.warning(response.data.data?.content);
    }
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific error
      console.error("Axios error:", error.message);
      throw error.response?.data as RequestPlayError;
    } else {
      // Handle other errors
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export default enterGame;
