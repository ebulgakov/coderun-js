import { describe, it, beforeEach, vi, expect } from "vitest";

import { main } from "./1_task";

describe("Средний элемент", () => {
  let logSpy;

  beforeEach(() => {
    // "mockImplementation" need to clear clutter from the test output
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("Ввод 1 2 3", () => {
    main(["1 2 3"]);

    expect(logSpy).toHaveBeenCalledWith(2);
  });

  it("Ввод 1000 -1000 0", () => {
    main(["1000 -1000 0"]);

    expect(logSpy).toHaveBeenCalledWith(0);
  });

  it("Ввод 3 1 3", () => {
    main(["3 1 3"]);

    expect(logSpy).toHaveBeenCalledWith(3);
  });
});
