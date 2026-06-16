import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Avatar } from "./Avatar";
import styles from "./Avatar.module.scss";

describe("Avatar", () => {
  it("should render the image", () => {
    render(
      <Avatar
        src="https://github.com/torvalds.png"
        alt="Linus Torvalds"
      />,
    );

    const image = screen.getByRole("img", {
      name: "Linus Torvalds",
    });

    expect(image).toBeInTheDocument();
  });

  it("should render the correct src and alt", () => {
    render(
      <Avatar
        src="https://github.com/torvalds.png"
        alt="Linus Torvalds"
      />,
    );

    const image = screen.getByRole("img");

    expect(image).toHaveAttribute(
      "src",
      "https://github.com/torvalds.png",
    );

    expect(image).toHaveAttribute(
      "alt",
      "Linus Torvalds",
    );
  });

  it("should use md size by default", () => {
    const { container } = render(
      <Avatar
        src="https://github.com/torvalds.png"
        alt="Linus Torvalds"
      />,
    );

    expect(container.firstChild).toHaveClass(styles.md);
  });

  it("should apply the provided size class", () => {
    const { container } = render(
      <Avatar
        src="https://github.com/torvalds.png"
        alt="Linus Torvalds"
        size="xl"
      />,
    );

    expect(container.firstChild).toHaveClass(styles.xl);
  });

  it("should lazy load the image", () => {
    render(
      <Avatar
        src="https://github.com/torvalds.png"
        alt="Linus Torvalds"
      />,
    );

    const image = screen.getByRole("img");

    expect(image).toHaveAttribute("loading", "lazy");
  });
});