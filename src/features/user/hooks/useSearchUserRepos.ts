import { useQuery } from '@tanstack/react-query'
import { getUserRepos } from '../../../common/api/userRepos'

export const useSearchUserRepos = (login: string) => {
  return useQuery({
    queryKey: ['github', 'repos', login],
    queryFn: () => getUserRepos(login),
    enabled: login.trim().length > 0,
    staleTime: 1000 * 60 * 5,
  })
}