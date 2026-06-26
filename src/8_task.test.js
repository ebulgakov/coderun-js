import { describe, it, beforeEach, vi, expect } from "vitest";

import main, { baseInput } from "./8_task";

describe("Компоненты связности", () => {
  let logSpy;

  beforeEach(() => {
    // "mockImplementation" need to clear clutter from the test output
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("Ввод базового решения", () => {
    main(baseInput);

    expect(logSpy).toHaveBeenCalledWith(3);
    expect(logSpy).toHaveBeenCalledWith(3);
    expect(logSpy).toHaveBeenCalledWith("1 2 3");
    expect(logSpy).toHaveBeenCalledWith(2);
    expect(logSpy).toHaveBeenCalledWith("4 5");
    expect(logSpy).toHaveBeenCalledWith(1);
    expect(logSpy).toHaveBeenCalledWith("6");
  });

  it("Ввод графа 6 x 4", () => {
    main(["6 4", "4 2", "1 4", "6 4", "3 6"]);

    expect(logSpy).toHaveBeenCalledWith(2);
    expect(logSpy).toHaveBeenCalledWith(5);
    expect(logSpy).toHaveBeenCalledWith("1 4 6 3 2");
    expect(logSpy).toHaveBeenCalledWith(1);
    expect(logSpy).toHaveBeenCalledWith("5");
  });
});
