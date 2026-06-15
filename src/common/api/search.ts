import type { UserSearchItem } from "../../features/search/types/UserSearchItem";
import { request } from "../services/axiosService";

export const searchUsers = async (query: string): Promise<{ items: UserSearchItem[]; total_count: number }> => {
  const response = await request.get<{ items: UserSearchItem[]; total_count: number }>("/search/users", {
    params: { q: query },
  });
  return response.data;
};
