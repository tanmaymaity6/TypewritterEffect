import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TypewriterEffect from "./TypewriterEffect";

describe("TypewriterEffect", () => {
  it("types sentence with interval", async () => {
    vi.useFakeTimers();

    render(<TypewriterEffect />);

    const user = userEvent.setup({
      advanceTimers: vi.advanceTimersByTime
    });

    await act(async () => {
      await user.type(screen.getByPlaceholderText("Type a sentence"), "hi");
      await user.click(screen.getByText("Display with typewriter effect"));
    });

    const output = screen.getByTestId("output");

    expect(output.textContent).toBe("");

    await act(async () => vi.advanceTimersByTime(500));
    expect(output.textContent).toBe("h");

    await act(async () => vi.advanceTimersByTime(500));
    expect(output.textContent).toBe("hi");

    vi.useRealTimers();
  });
});
