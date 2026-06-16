import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserRepos } from "../../../common/api/userRepos";

export const useUserRepos = (userName: string) => {
  const query = useInfiniteQuery({
    queryKey: ['github', 'repos', userName],
    queryFn: ({ pageParam = 1 }) => getUserRepos(userName, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < 100 ? undefined : allPages.length + 1,
    enabled: !!userName,
  });

  return {
    ...query,
    repos: query.data?.pages.flat() ?? [],
  };
};