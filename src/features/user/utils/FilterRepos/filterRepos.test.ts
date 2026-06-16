import { describe, expect, it } from "vitest";

import { filterRepos } from "./filterRepos";
import type { Repository } from "../../../repository/types/Repositoty";

const repos = [
  {
    name: "linux",
  },
  {
    name: "subsurface",
  },
  {
    name: "uemacs",
  },
] as Repository[];

describe("filterRepos", () => {
  it("returns all repositories when filter is empty", () => {
    expect(filterRepos(repos, "")).toEqual(repos);
  });

  it("filters repositories by name", () => {
    expect(
      filterRepos(repos, "linux"),
    ).toEqual([
      {
        name: "linux",
      },
    ]);
  });

  it("filters repositories case-insensitively", () => {
    expect(
      filterRepos(repos, "LINUX"),
    ).toEqual([
      {
        name: "linux",
      },
    ]);
  });

    it("filters repositories ignoring leading and trailing whitespace", () => {
    expect(
      filterRepos(repos, "    LINUX     "),
    ).toEqual([
      {
        name: "linux",
      },
    ]);
  });

  it("returns matching repositories containing the search term", () => {
    expect(
      filterRepos(repos, "s"),
    ).toEqual([
      {
        name: "subsurface",
      },
      {
        name: "uemacs",
      },
    ]);
  });

  it("returns an empty array when no repositories match", () => {
    expect(
      filterRepos(repos, "react"),
    ).toEqual([]);
  });
});