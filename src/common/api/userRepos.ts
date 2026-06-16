import type { Repository } from "../../features/repository/types/Repositoty";
import { request } from "../services/axiosService";

export const getUserRepos = async (
  userName: string,
  page: number,
): Promise<Repository[]> => {
  const { data } = await request.get<Repository[]>(
    `/users/${userName}/repos`,
    {
      params: {
        page,
        per_page: 100,
        sort: "updated",
      },
    },
  );

  return data;
};