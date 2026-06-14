import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../../../common/api/search";

export const useSearchUsers = (query: string) => {
  return useQuery({
    queryKey: ["github", "search", "users", query],
    queryFn: () => searchUsers(query),
    enabled: query.trim().length > 0,
  });
};
