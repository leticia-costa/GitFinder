import { describe, expect, it } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("should format a string date", () => {
    const date = "2025-03-01T12:00:00Z";

    const expected = "01 de mar. de 2025";

    expect(formatDate(date)).toBe(expected);
  });

  it("should format a Date instance", () => {
    const date = new Date("2026-06-11T12:00:00Z");

    const expected = "11 de jun. de 2026";

    expect(formatDate(date)).toBe(expected);
  });

  it("should support custom locale", () => {
    const date = "2025-01-25T12:00:00Z";

    const expected = "Jan 25, 2025";

    expect(formatDate(date, "en-US")).toBe(expected);
  });
});