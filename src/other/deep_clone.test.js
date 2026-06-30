import { describe, it, beforeEach, vi, expect } from "vitest";

import deepClone from "./deep_clone.js";

describe("Deep Clone", () => {
  it("Обычные объекты и массивы", () => {
    const original = { a: 1, b: { c: 2, d: [3, 4] } };
    const copy = deepClone(original);

    copy.b.d[0] = 99;

    expect(original.b.d[0]).toEqual(3);
  });

  it("Цикличные ссылки (Circular Reference)", () => {
    const circularObj = { name: "Eugene" };
    circularObj.self = circularObj; // Ссылка на самого себя

    const circularCopy = deepClone(circularObj);

    expect(circularCopy !== circularObj).toBeTruthy();
    expect(circularCopy.self === circularCopy).toBeTruthy();
  });

  it("Даты", () => {
    const dateObj = { date: new Date("10/10/1970") };

    const dateCopy = deepClone(dateObj);
    dateCopy.date = new Date("05/05/1970");

    expect(dateObj.date !== dateCopy.date).toBeTruthy();
  });

  it("Map", () => {
    const mapObj = { mapO: new Map() };
    mapObj.mapO.set(1, "hello");

    const mapCopy = deepClone(mapObj);
    mapCopy.mapO.set(2, "hello2");

    expect(mapObj.mapO.size !== mapCopy.mapO.size).toBeTruthy();
  });

  it("Null", () => {
    const mapObj = { foo: "bar", some: null };

    const mapCopy = deepClone(mapObj);

    expect(mapObj !== mapCopy).toBeTruthy();
  });
});
