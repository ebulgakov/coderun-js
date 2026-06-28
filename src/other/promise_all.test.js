import { describe, it, beforeEach, vi, expect } from "vitest";

import myPromiseAll from "./promise_all.js";

describe("Promise.all", () => {
  it("Ввод трёх айтемов через 1 сек", async () => {
    const p1 = Promise.resolve(1);
    const p2 = new Promise(resolve => setTimeout(() => resolve(2), 1000));
    const p3 = 3; // Обычное значение

    expect(await myPromiseAll([p1, p2, p3])).toEqual([1, 2, 3]);
  });
  it("Ввод реджекта через 500мс", async () => {
    const p1 = Promise.resolve(1);
    const p2 = new Promise(resolve => setTimeout(() => resolve(2), 1000));
    const p4 = new Promise((_, reject) => setTimeout(() => reject("Error!"), 500));

    try {
      await myPromiseAll([p1, p2, p4]);
    } catch (error) {
      expect(error).toEqual("Error!");
    }
  });
  it("Вывод пустого массива", async () => {
    expect(await myPromiseAll([])).toEqual([]);
  });
});
