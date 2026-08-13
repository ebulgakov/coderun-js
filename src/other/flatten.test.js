import { describe, it, beforeEach, vi, expect } from "vitest";

import { flattenRec, flattenInc } from "./flatten.js";

describe("Flatten", () => {
  it("flattenRec", () => {
    expect(flattenRec([1, [2, [3, [4]], 5]])).toEqual([1, 2, [3, [4]], 5]);
    expect(flattenRec([1, [2, [3, [4]], 5]], 2)).toEqual([1, 2, 3, [4], 5]);
    expect(flattenRec([1, [2, [3, [4]], 5]], Infinity)).toEqual([1, 2, 3, 4, 5]);
  });
  it("flattenInc", () => {
    expect(flattenInc([1, [2, [3, [4]], 5]])).toEqual([1, 2, [3, [4]], 5]);
    expect(flattenInc([1, [2, [3, [4]], 5]], 2)).toEqual([1, 2, 3, [4], 5]);
    expect(flattenInc([1, [2, [3, [4]], 5]], Infinity)).toEqual([1, 2, 3, 4, 5]);
  });
});
