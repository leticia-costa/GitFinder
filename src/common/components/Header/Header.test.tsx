import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";

import { Header } from "./Header";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render default "Voltar" label', () => {
    render(<Header />);

    expect(
      screen.getByRole("button", { name: "Voltar" }),
    ).toBeInTheDocument();
  });

  it("should render custom back button label", () => {
    render(
      <Header backButtonLabel="Voltar para Letícia" />,
    );

    expect(
      screen.getByRole("button", {
        name: "Voltar para Letícia",
      }),
    ).toBeInTheDocument();
  });

  it("should navigate back when button is clicked", async () => {
    const user = userEvent.setup();

    render(<Header />);

    await user.click(
      screen.getByRole("button", { name: "Voltar" }),
    );

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});