import { describe, it, beforeEach, vi, expect } from "vitest";

import { main, baseInput } from "./3_task";

describe("Вывести маршрут максимальной стоимости", () => {
  let logSpy;

  beforeEach(() => {
    // "mockImplementation" need to clear clutter from the test output
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("Ввод базовой матрицы", () => {
    main(baseInput);

    expect(logSpy).toHaveBeenCalledWith(74);
    expect(logSpy).toHaveBeenCalledWith("D D R R R R D D");
  });

  it("Ввод матрицы 3 x 4", () => {
    const baseInput = ["3 4", "1 1 1 1", "1 1 1 1", "1 1 1 1"];

    main(baseInput);

    expect(logSpy).toHaveBeenCalledWith(6);
    expect(logSpy).toHaveBeenCalledWith("D D R R R");
  });
});
