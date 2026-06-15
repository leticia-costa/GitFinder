import { describe, expect, it } from "vitest";
import { sortRepos } from "./sortRepos";
import type { Repository } from "../../../repository/types/Repositoty";

const repos = [
  {
    id: 1,
    name: "react-app",
    stargazers_count: 100,
  },
  {
    id: 2,
    name: "angular-app",
    stargazers_count: 300,
  },
  {
    id: 3,
    name: "vue-app",
    stargazers_count: 50,
  },
] as Repository[];

 const reposWithSameStars = [
      { id: 1, name: "zebra", stargazers_count: 2 },
      { id: 2, name: "apple", stargazers_count: 2 },
      { id: 3, name: "banana", stargazers_count: 2 },
    ] as Repository[];

describe("sortRepos", () => {
  it("should sort repositories by name ascending", () => {
    const result = sortRepos(repos, "name-asc");

    expect(result.map((repo) => repo.name)).toEqual([
      "angular-app",
      "react-app",
      "vue-app",
    ]);
  });

  it("should sort repositories by name descending", () => {
    const result = sortRepos(repos, "name-desc");

    expect(result.map((repo) => repo.name)).toEqual([
      "vue-app",
      "react-app",
      "angular-app",
    ]);
  });

  it("should sort repositories by stars descending", () => {
    const result = sortRepos(repos, "stars-desc");

    expect(result.map((repo) => repo.stargazers_count)).toEqual([300, 100, 50]);
  });

  it("should sort repositories by stars ascending", () => {
    const result = sortRepos(repos, "stars-asc");

    expect(result.map((repo) => repo.stargazers_count)).toEqual([50, 100, 300]);
  });

  it("should not mutate original array", () => {
    const original = [...repos];

    sortRepos(repos, "name-asc");

    expect(repos).toEqual(original);
  });

  it("should sort repositories with same stars alphabetically when sorting by stars ascending", () => {
    const result = sortRepos(reposWithSameStars, "stars-asc");

    expect(result.map((repo) => repo.name)).toEqual([
      "apple",
      "banana",
      "zebra",
    ]);
  });

  it("should sort repositories with same stars alphabetically when sorting by stars descending", () => {
    const result = sortRepos(reposWithSameStars, "stars-desc");

    expect(result.map((repo) => repo.name)).toEqual([
      "apple",
      "banana",
      "zebra",
    ]);
  });
});
