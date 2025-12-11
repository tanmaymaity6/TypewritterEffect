import { describe, it, expect, vi } from "vitest";

describe("timer test", () => {
  it("should run a setInterval with fake timers", () => {
    vi.useFakeTimers();
    let counter = 0;

    setInterval(() => {
      counter++;
    }, 500);

    vi.advanceTimersByTime(500);
    expect(counter).toBe(1);

    vi.advanceTimersByTime(500);
    expect(counter).toBe(2);
  });
});
