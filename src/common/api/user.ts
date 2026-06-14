import type { User } from "../../features/user/types/User";
import { request } from "../services/axiosService";

export const getUser = async (userName: string): Promise<User> => {
  const response = await request.get<User>(`/users/${userName}`);
  return response.data; 
};