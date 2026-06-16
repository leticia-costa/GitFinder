import { useInfiniteQuery } from "@tanstack/react-query";
import { searchUsers } from "../../../common/api/search";

export const useSearchUsers = (query: string) => {
  const query_ = useInfiniteQuery({
    queryKey: ["github", "search", "users", query],
    queryFn: ({ pageParam = 1 }) => searchUsers(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce(
        (total, page) => total + page.items.length,
        0,
      );
      return loaded < lastPage.total_count ? allPages.length + 1 : undefined;
    },
    enabled: query.trim().length > 0,
  });

  return {
    ...query_,
    users: query_.data?.pages.flatMap((p) => p.items) ?? [],
    total: query_.data?.pages[0]?.total_count ?? 0,
  };
};
