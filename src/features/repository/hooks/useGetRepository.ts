import { useQuery } from "@tanstack/react-query";
import { getUserRepository } from "../../../common/api/repository";

export const useGetRepository = (userName: string, repo: string) => {
  return useQuery({
    queryKey: ["github", "repo", userName, repo],
    queryFn: () => getUserRepository(userName, repo),
    enabled: userName.trim().length > 0 && repo.trim().length > 0,
  });
};