import type { Repository } from "../../features/repository/types/Repositoty";
import { request } from "../services/axiosService";

export const getUserRepository = async (
  userName: string,
  repo: string
): Promise<Repository> => {
  const response = await request.get<Repository>(`/repos/${userName}/${repo}`);
  return response.data;
};