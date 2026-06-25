import { describe, it, beforeEach, vi, expect } from "vitest";

import main, { baseInput } from "./7_task";

describe("Поиск в глубину", () => {
  let logSpy;

  beforeEach(() => {
    // "mockImplementation" need to clear clutter from the test output
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("Ввод базовой матрицы", () => {
    main(baseInput);

    expect(logSpy).toHaveBeenCalledWith(4);
    expect(logSpy).toHaveBeenCalledWith("1 2 3 4");
  });
});
