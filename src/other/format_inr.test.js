import { describe, it, beforeEach, vi, expect } from "vitest";

import formatINR from "./format_inr.ts";

describe("Форматирование цены", () => {
  it("кейсы", () => {
    expect(formatINR("12345")).toBe("₹123.45");
    expect(formatINR("1234567")).toBe("₹12,345.67");
    expect(formatINR("123456789")).toBe("₹12,34,567.89");
    expect(formatINR("12345678900")).toBe("₹12,34,56,789.00");
    expect(formatINR("0")).toBe("₹0.00");
    expect(formatINR("-50000")).toBe("-₹500.00");
  });
});
