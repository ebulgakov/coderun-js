import { describe, it, beforeEach, vi, expect } from "vitest";

import main, { baseInput } from "./5_task";

describe("Кафе", () => {
  let logSpy;

  beforeEach(() => {
    // "mockImplementation" need to clear clutter from the test output
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("Ввод базовой матрицы", () => {
    main(baseInput);

    expect(logSpy).toHaveBeenCalledWith(235);
    expect(logSpy).toHaveBeenCalledWith("0 1");
    expect(logSpy).toHaveBeenCalledWith(5);
  });

  it("Ввод матрицы 7 - 115", () => {
    const baseInput = ["7", "56", "254", "11", "192", "4", "37", "115"];

    main(baseInput);

    expect(logSpy).toHaveBeenCalledWith(477);
    expect(logSpy).toHaveBeenCalledWith("1 1");
    expect(logSpy).toHaveBeenCalledWith(4);
  });
});
