import { describe, it, beforeEach, vi, expect } from "vitest";

import runWithLimit from "./promise_concurrency.js";

const createTask = (id, delay) => () =>
  new Promise(res => {
    console.log(`Task ${id} started`);
    setTimeout(() => {
      console.log(`Task ${id} finished`);
      res(id);
    }, delay);
  });

const tasks = [
  createTask(1, 1000), // Начнет сразу
  createTask(2, 500), // Начнет сразу
  createTask(3, 300), // Должен начать через 500мс (когда завершится task 2)
  createTask(4, 400) // Должен начать через 800мс (когда завершится task 3)
];

describe("Promise Concurrency", () => {
  let logSpy;

  beforeEach(() => {
    // "mockImplementation" need to clear clutter from the test output
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  describe("Ввод тасок больше чем лимит", async () => {
    let result;

    beforeEach(async () => {
      result = await runWithLimit(tasks, 2);
    });

    it("Вывод результата", async () => {
      expect(result).toEqual([1, 2, 3, 4]);
    });

    it("Вывод промежуточных итогов", async () => {
      expect(logSpy).toHaveBeenCalledWith("Task 1 started");
      expect(logSpy).toHaveBeenCalledWith("Task 2 started");
      expect(logSpy).toHaveBeenCalledWith("Task 2 finished");
      expect(logSpy).toHaveBeenCalledWith("Task 3 started");
      expect(logSpy).toHaveBeenCalledWith("Task 3 finished");
      expect(logSpy).toHaveBeenCalledWith("Task 4 started");
      expect(logSpy).toHaveBeenCalledWith("Task 1 finished");
      expect(logSpy).toHaveBeenCalledWith("Task 4 finished");
    });
  });

  describe("Ввод тасок меньше чем лимит", async () => {
    let result;

    beforeEach(async () => {
      result = await runWithLimit(tasks, 10);
    });

    it("Вывод результата", async () => {
      expect(result).toEqual([1, 2, 3, 4]);
    });

    it("Вывод промежуточных итогов", async () => {
      expect(logSpy).toHaveBeenCalledWith("Task 1 started");
      expect(logSpy).toHaveBeenCalledWith("Task 2 started");
      expect(logSpy).toHaveBeenCalledWith("Task 3 started");
      expect(logSpy).toHaveBeenCalledWith("Task 4 started");
      expect(logSpy).toHaveBeenCalledWith("Task 3 finished");
      expect(logSpy).toHaveBeenCalledWith("Task 4 finished");
      expect(logSpy).toHaveBeenCalledWith("Task 2 finished");
      expect(logSpy).toHaveBeenCalledWith("Task 1 finished");
    });
  });

  it("Вывод пустого массива", async () => {
    const result = await runWithLimit([], 2);

    expect(result).toEqual([]);
  });
});
