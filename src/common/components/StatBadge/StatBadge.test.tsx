import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StatBadge } from "./StatBadge";

describe("StatBadge", () => {
  it("should render label", () => {
    render(
      <StatBadge
        icon={<span data-testid="icon">★</span>}
        label="stars"
        value={100}
      />,
    );

    expect(
      screen.getByText("stars"),
    ).toBeInTheDocument();
  });

  it("should render icon", () => {
    render(
      <StatBadge
        icon={<span data-testid="icon">★</span>}
        label="stars"
        value={100}
      />,
    );

    expect(
      screen.getByTestId("icon"),
    ).toBeInTheDocument();
  });

  it("should format numeric values using pt-BR locale", () => {
    render(
      <StatBadge
        icon={<span>★</span>}
        label="stars"
        value={1234567}
      />,
    );

    expect(
      screen.getByText("1.234.567"),
    ).toBeInTheDocument();
  });

  it("should render string values without formatting", () => {
    render(
      <StatBadge
        icon={<span>★</span>}
        label="language"
        value="TypeScript"
      />,
    );

    expect(
      screen.getByText("TypeScript"),
    ).toBeInTheDocument();
  });
});