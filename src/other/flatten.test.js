import { describe, it, beforeEach, vi, expect } from "vitest";

import flatten from "./flatten.js";

describe("Flatten", () => {
  it("кейсы", () => {
    expect(flatten([1, [2, [3, [4]], 5]])).toEqual([1, 2, [3, [4]], 5]);
    expect(flatten([1, [2, [3, [4]], 5]], 2)).toEqual([1, 2, 3, [4], 5]);
    expect(flatten([1, [2, [3, [4]], 5]], Infinity)).toEqual([1, 2, 3, 4, 5]);
  });
});
