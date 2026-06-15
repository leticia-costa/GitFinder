import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserRepos } from "../../../common/api/userRepos";

export const useUserRepos = (userName: string) => {
  return useInfiniteQuery({
    queryKey: ["github", "repos", userName],
    queryFn: ({ pageParam = 1 }) =>
      getUserRepos(userName, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 50) {
        return undefined;
      }
      return allPages.length + 1;
    },
    enabled: !!userName,
  });
};