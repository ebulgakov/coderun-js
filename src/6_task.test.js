import { describe, it, beforeEach, vi, expect } from "vitest";

import main, { baseInput } from "./6_task";

describe("НОП с восстановлением ответа", () => {
  let logSpy;

  beforeEach(() => {
    // "mockImplementation" need to clear clutter from the test output
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("Ввод базовой матрицы", () => {
    main(baseInput);

    expect(logSpy).toHaveBeenCalledWith("2 3");
  });

  it("Ввод матрицы 3", () => {
    const baseInput = ["3", "1 2 3", "3", "3 2 1"];

    main(baseInput);

    expect(logSpy).toHaveBeenCalledWith("3");
  });

  it("Ввод матрицы 5", () => {
    const baseInput = ["5", "1 1 1 1 1", "4", "1 1 1 1"];

    main(baseInput);

    expect(logSpy).toHaveBeenCalledWith("1 1 1 1");
  });

  it("Ввод матрицы 5_1", () => {
    const baseInput = ["5", "1 2 1 2 1", "5", "2 1 2 1 2"];

    main(baseInput);

    expect(logSpy).toHaveBeenCalledWith("2 1 2 1");
  });

  it("Ввод матрицы 8 2 3 5 1", () => {
    const baseInput = ["4", "1 2 3 4", "5", "8 2 3 5 1"];

    main(baseInput);

    expect(logSpy).toHaveBeenCalledWith("2 3");
  });
});
