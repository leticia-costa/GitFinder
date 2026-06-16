import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import styles from "./Button.module.scss";

import { Button } from "./Button";

describe("Button", () => {
  it("should render button text", () => {
    render(<Button>Salvar</Button>);

    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
  });

  it("should call onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Salvar</Button>);

    await user.click(screen.getByRole("button", { name: "Salvar" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button disabled>Salvar</Button>);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should be disabled while loading", () => {
    render(<Button isLoading>Salvar</Button>);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should hide children while loading", () => {
    render(<Button isLoading>Salvar</Button>);

    expect(screen.queryByText("Salvar")).not.toBeInTheDocument();
  });

  it("should render left icon", () => {
    render(
      <Button leftIcon={<span data-testid="left-icon">←</span>}>Voltar</Button>,
    );

    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
  });

  it("should render right icon", () => {
    render(
      <Button rightIcon={<span data-testid="right-icon">→</span>}>
        Próximo
      </Button>,
    );

    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  it("should apply primary variant by default", () => {
    render(<Button>Salvar</Button>);

    expect(screen.getByRole("button")).toHaveClass(styles.primary);
  });

  it("should apply the provided variant", () => {
    render(<Button variant="outline">Salvar</Button>);

    expect(screen.getByRole("button")).toHaveClass(styles.outline);
  });

  it("should apply md size by default", () => {
    render(<Button>Salvar</Button>);

    expect(screen.getByRole("button")).toHaveClass(styles.md);
  });

  it("should apply the provided size", () => {
    render(<Button size="lg">Salvar</Button>);

    expect(screen.getByRole("button")).toHaveClass(styles.lg);
  });
});
