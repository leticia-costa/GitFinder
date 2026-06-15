import { describe, expect, it } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("should format ISO date to pt-BR", () => {
    const result = formatDate("2025-01-15T12:00:00Z");

    expect(result).toContain("15");
    expect(result.toLowerCase()).toContain("jan");
    expect(result).toContain("2025");
  });

  it("should accept Date instances", () => {
    const result = formatDate(new Date("2025-06-11T00:00:00Z"));

    expect(result).toContain("11");
    expect(result).toContain("2025");
  });

  it("should support custom locale", () => {
    const result = formatDate(
      "2025-01-15T12:00:00Z",
      "en-US",
    );

    expect(result).toContain("2025");
  });
});