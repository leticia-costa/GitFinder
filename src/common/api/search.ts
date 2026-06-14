import type { UserSearchItem } from "../../features/search/types/UserSearchItem";
import { request } from "../services/axiosService";

export const searchUsers = async (query: string): Promise<UserSearchItem> => {
  const response = await request.get<UserSearchItem>("/search/users", {
    params: { q: query },
  });
  return response.data;
};
