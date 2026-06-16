import type { UserSearchItem } from "../../features/search/types/UserSearchItem";
import { request } from "../services/axiosService";

export const searchUsers = async (
  query: string,
  page: number,
): Promise<{ items: UserSearchItem[]; total_count: number }> => {
  const { data } = await request.get<{ items: UserSearchItem[]; total_count: number }>(
    '/search/users',
    { params: { q: query, page, per_page: 30 } },
  );
  return data;
};