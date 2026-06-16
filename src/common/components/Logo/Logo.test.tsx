import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Logo } from "./Logo";
import styles from "./Logo.module.scss";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("Logo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render logo text", () => {
    render(<Logo />);

    expect(
      screen.getByRole("heading", {
        name: "Git Finder",
      }),
    ).toBeInTheDocument();
  });

  it("should render logo image", () => {
    render(<Logo />);

    expect(
      screen.getByAltText("GitFinder Logo"),
    ).toBeInTheDocument();
  });

  it("should navigate to home when clicked", async () => {
    const user = userEvent.setup();

    render(<Logo />);

    await user.click(
      screen.getByText("Git Finder"),
    );

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should apply lg size by default", () => {
    const { container } = render(<Logo />);

    expect(container.firstChild).toHaveClass(styles.lg);
  });

  it("should apply provided size", () => {
    const { container } = render(
      <Logo size="sm" />,
    );

    expect(container.firstChild).toHaveClass(styles.sm);
  });
});