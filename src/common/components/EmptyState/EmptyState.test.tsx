import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders title and description", () => {
    render(
      <EmptyState
        type="idle"
        title="Search GitHub users"
        description="Start typing to begin."
      />,
    );

    expect(
      screen.getByText("Search GitHub users"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Start typing to begin."),
    ).toBeInTheDocument();
  });

  it("renders the description for an error state", () => {
    render(
      <EmptyState
        type="error"
        title="Something went wrong"
        description="Please try again."
      />,
    );

    expect(
      screen.getByText("Please try again."),
    ).toBeInTheDocument();
  });

  it("renders the query in the not-found message", () => {
    render(
      <EmptyState
        type="not-found"
        query="react"
        title="No repositories found"
        description="Try a different repository name."
      />,
    );

    expect(
      screen.getByText(
        'Nenhum resultado para "react". Try a different repository name.',
      ),
    ).toBeInTheDocument();
  });

  it("renders the default description when query is not provided", () => {
    render(
      <EmptyState
        type="not-found"
        title="No repositories found"
        description="Try a different repository name."
      />,
    );

    expect(
      screen.getByText("Try a different repository name."),
    ).toBeInTheDocument();
  });

  it("renders an icon", () => {
    const { container } = render(
      <EmptyState
        type="idle"
        title="Search GitHub users"
        description="Start typing to begin."
      />,
    );

    expect(
      container.querySelector("svg"),
    ).toBeInTheDocument();
  });
});