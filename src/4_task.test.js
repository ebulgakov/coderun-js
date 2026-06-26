import { describe, it, beforeEach, vi, expect } from "vitest";

import main, { baseInput } from "./4_task";

describe("Ход конём", () => {
  let logSpy;

  beforeEach(() => {
    // "mockImplementation" need to clear clutter from the test output
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("Ввод базового решения", () => {
    main(baseInput);

    expect(logSpy).toHaveBeenCalledWith(293930);
  });

  it("Ввод матрицы 8 9", () => {
    const baseInput = ["8 9"];

    main(baseInput);

    expect(logSpy).toHaveBeenCalledWith(10);
  });
});
