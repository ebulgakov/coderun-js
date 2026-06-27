import { describe, it, beforeEach, vi, expect } from "vitest";

import main, { baseInput } from "./9_task";

describe("Списывание", () => {
  let logSpy;

  beforeEach(() => {
    // "mockImplementation" need to clear clutter from the test output
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("Ввод базового решения", () => {
    main(baseInput);

    expect(logSpy).toHaveBeenCalledWith("YES");
  });

  it("Ввод графа NO", () => {
    main(["3 3", "1 2", "2 3", "1 3"]);

    expect(logSpy).toHaveBeenCalledWith("NO");
  });
});
