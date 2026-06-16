import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TextInput } from "./TextInput";

describe("TextInput", () => {
  it("should render input", () => {
    render(<TextInput />);

    expect(
      screen.getByRole("textbox"),
    ).toBeInTheDocument();
  });

  it("should render label when provided", () => {
    render(
      <TextInput
        id="search"
        label="Buscar usuário"
      />,
    );

    expect(
      screen.getByText("Buscar usuário"),
    ).toBeInTheDocument();
  });

  it("should render left icon", () => {
    render(
      <TextInput
        leftIcon={<span data-testid="search-icon">🔍</span>}
      />,
    );

    expect(
      screen.getByTestId("search-icon"),
    ).toBeInTheDocument();
  });

  it("should forward input props", () => {
    render(
      <TextInput
        placeholder="Digite um usuário"
      />,
    );

    expect(
      screen.getByPlaceholderText("Digite um usuário"),
    ).toBeInTheDocument();
  });

  it("should allow typing", async () => {
    const user = userEvent.setup();

    render(<TextInput />);

    const input = screen.getByRole("textbox");

    await user.type(input, "torvalds");

    expect(input).toHaveValue("torvalds");
  });

  it("should call onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <TextInput
        onChange={onChange}
      />,
    );

    await user.type(
      screen.getByRole("textbox"),
      "abc",
    );

    expect(onChange).toHaveBeenCalled();
  });
});