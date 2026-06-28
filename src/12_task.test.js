import { describe, it, beforeEach, vi, expect } from "vitest";

import main, { baseInput } from "./12_task";

describe("Длина кратчайшего пути", () => {
  let logSpy;

  beforeEach(() => {
    // "mockImplementation" need to clear clutter from the test output
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("Ввод базового решения", () => {
    main(baseInput);

    expect(logSpy).toHaveBeenCalledWith(2);
  });

  it("Ввод графа 5", () => {
    main(["5", "0 1 0 0 1", "1 0 1 0 0", "0 1 0 0 0", "0 0 0 0 0", "1 0 0 0 0", "3 5"]);

    expect(logSpy).toHaveBeenCalledWith(3);
  });
});
