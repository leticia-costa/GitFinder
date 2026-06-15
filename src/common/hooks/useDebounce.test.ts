import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("react", 1000));

    expect(result.current).toBe("react");
  });

  it("should update the value after the delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 1000),
      {
        initialProps: { value: "react" },
      },
    );

    rerender({ value: "vue" });

    expect(result.current).toBe("react");

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe("vue");
  });

  it("should not update the value before the delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 1000),
      {
        initialProps: { value: "react" },
      },
    );

    rerender({ value: "vue" });

    act(() => {
      vi.advanceTimersByTime(999);
    });

    expect(result.current).toBe("react");
  });

  it("should reset the timer when the value changes again", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 1000),
      {
        initialProps: { value: "react" },
      },
    );

    rerender({ value: "vue" });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    rerender({ value: "angular" });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("react");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("angular");
  });
});