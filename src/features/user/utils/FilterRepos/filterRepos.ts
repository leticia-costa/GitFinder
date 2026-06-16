import type { Repository } from "../../../repository/types/Repositoty";

export const filterRepos = (
  repos: Repository[],
  filter: string,
) => {
  if (!filter.trim()) {
    return repos;
  }

  const normalizedFilter = filter.trim().toLowerCase();

  return repos.filter((repo) =>
    repo.name.toLowerCase().includes(normalizedFilter),
  );
};