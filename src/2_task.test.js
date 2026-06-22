import { describe, it, beforeEach, vi, expect } from "vitest";

import main, { baseInput } from "./2_task";

describe("Самый дешевый путь", () => {
  let logSpy;

  beforeEach(() => {
    // "mockImplementation" need to clear clutter from the test output
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("Базовый случай", () => {
    main(baseInput);

    expect(logSpy).toHaveBeenCalledWith(11);
  });
});
