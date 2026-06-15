import type { Repository } from "../../features/repository/types/Repositoty"
import { request } from "../services/axiosService"

export const getUserRepos = async (login: string): Promise<Repository[]> => {
  const { data } = await request.get<Repository[]>(`/users/${login}/repos`, {
    params: { per_page: 100, sort: 'updated' },
  })
  return data
}