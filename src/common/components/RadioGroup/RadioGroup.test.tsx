import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { RadioGroup } from "./RadioGroup";

describe("RadioGroup", () => {
  const options = [
    {
      value: "name-asc",
      label: "Nome A-Z",
    },
    {
      value: "name-desc",
      label: "Nome Z-A",
    },
    {
      value: "stars-desc",
      label: "Mais estrelas",
    },
  ];

  it("should render group label", () => {
    render(
      <RadioGroup
        label="Ordenar por"
        name="sort"
        options={options}
        value="name-asc"
        onChange={vi.fn()}
      />,
    );

    expect(
      screen.getByText("Ordenar por"),
    ).toBeInTheDocument();
  });

  it("should render all options", () => {
    render(
      <RadioGroup
        name="sort"
        options={options}
        value="name-asc"
        onChange={vi.fn()}
      />,
    );

    expect(
      screen.getByLabelText("Nome A-Z"),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Nome Z-A"),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Mais estrelas"),
    ).toBeInTheDocument();
  });

  it("should mark the selected option", () => {
    render(
      <RadioGroup
        name="sort"
        options={options}
        value="stars-desc"
        onChange={vi.fn()}
      />,
    );

    expect(
      screen.getByLabelText("Mais estrelas"),
    ).toBeChecked();

    expect(
      screen.getByLabelText("Nome A-Z"),
    ).not.toBeChecked();
  });

  it("should call onChange when selecting an option", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <RadioGroup
        name="sort"
        options={options}
        value="name-asc"
        onChange={onChange}
      />,
    );

    await user.click(
      screen.getByLabelText("Nome Z-A"),
    );

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("name-desc");
  });
});