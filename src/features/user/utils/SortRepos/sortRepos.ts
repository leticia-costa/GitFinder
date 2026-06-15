import type { Repository } from "../../../repository/types/Repositoty";

type RepoSortKey = "name-asc" | "name-desc" | "stars-desc" | "stars-asc";

const SORT_REPO_OPTIONS = [
  { value: "name-asc", label: "Nome A-Z" },
  { value: "name-desc", label: "Nome Z-A" },
  { value: "stars-desc", label: "Mais estrelas" },
  { value: "stars-asc", label: "Menos estrelas" },
];

const compareByNameAsc = (a: Repository, b: Repository) =>
  a.name.localeCompare(b.name);

const compareByNameDesc = (a: Repository, b: Repository) =>
  b.name.localeCompare(a.name);

const sorters: Record<RepoSortKey, (a: Repository, b: Repository) => number> = {
  "name-asc": compareByNameAsc,

  "name-desc": compareByNameDesc,

  "stars-desc": (a, b) => {
    const starsDiff = b.stargazers_count - a.stargazers_count;

    return starsDiff !== 0 ? starsDiff : compareByNameAsc(a, b);
  },

  "stars-asc": (a, b) => {
    const starsDiff = a.stargazers_count - b.stargazers_count;

    return starsDiff !== 0 ? starsDiff : compareByNameAsc(a, b);
  },
};

const sortRepos = (repos: Repository[], key: RepoSortKey) => {
  return [...repos].sort(sorters[key]);
};

export { SORT_REPO_OPTIONS, sortRepos, type RepoSortKey };
