import { describe, it, beforeEach, vi, expect } from "vitest";

import memoize from "./memo_ttl.js";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe("Memo TTL", () => {
  let logSpy;

  beforeEach(() => {
    // "mockImplementation" need to clear clutter from the test output
    logSpy = vi.spyOn(console, "log");
  });

  it("Вернёт один раз из выполнения, а второй раз из кеша", async () => {
    let callCount = 0;
    const fetchData = vi.fn(async id => {
      callCount++;
      return `Data for ${id} - count ${callCount}`;
    });

    const mockFn = vi.fn();

    const memoizedFetch = memoize(fetchData, 1000);
    memoizedFetch(1).then(mockFn); // Вызовет fetchData, вернет "Data for 1"
    memoizedFetch(1).then(mockFn); // Вернет из кэша, fetchData не вызовется

    await sleep(0);

    expect(callCount).toEqual(1);
    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it("Можно слать разное кол-во аргументов", async () => {
    let callCount = 0;
    const fetchData = vi.fn((id, message) => {
      callCount++;
      return `Data for ${id} - message ${message}`;
    });

    const mockFn = vi.fn();

    const memoizedFetch = memoize(fetchData, 1000);
    memoizedFetch(1, "hi").then(mockFn); // Вызовет fetchData, вернет "Data for 1"

    await sleep(0);

    expect(mockFn).toHaveBeenCalledWith("Data for 1 - message hi");
  });

  it("Вернёт два раза из выполнения, если умер TTL", async () => {
    let callCount = 0;
    const fetchData = vi.fn(id => {
      callCount++;
      return `Data for ${id} - count ${callCount}`;
    });

    const mockFn = vi.fn();

    const memoizedFetch = memoize(fetchData, 1000);
    memoizedFetch(1).then(mockFn); // Вызовет fetchData, вернет "Data for 1"

    await sleep(0);

    expect(mockFn).toHaveBeenCalledWith("Data for 1 - count 1");

    await sleep(1500);
    memoizedFetch(1).then(mockFn); // ttl истек, снова вызовет fetchData

    await sleep(0);

    expect(callCount).toEqual(2);
    expect(fetchData).toHaveBeenCalledTimes(2);
    expect(mockFn).toHaveBeenCalledWith("Data for 1 - count 2");
  });
});
