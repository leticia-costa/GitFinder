import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../common/api/user";

export const useGetUser = (userName: string) => {
  return useQuery({
    queryKey: ["github", "user", userName], 
    queryFn: () => getUser(userName),
    enabled: userName.trim().length > 0,  
  });
};