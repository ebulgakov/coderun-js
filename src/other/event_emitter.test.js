import { describe, it, beforeEach, vi, expect } from "vitest";

import EventEmitter from "./event_emitter.js";

describe("EventEmitter", () => {
  let logSpy;

  beforeEach(() => {
    // "mockImplementation" need to clear clutter from the test output
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("Подписывание", async () => {
    const emitter = new EventEmitter();
    const logData = data => console.log(`Событие сработало: ${data}`);

    emitter.on("data", logData);
    emitter.emit("data", "Первый вызов");

    expect(logSpy).toHaveBeenCalledWith("Событие сработало: Первый вызов");
  });

  it("Отписывание", async () => {
    const emitter = new EventEmitter();
    const logData = data => console.log(`Событие сработало: ${data}`);

    emitter.on("data", logData);
    emitter.off("data", logData);
    emitter.emit("data", "Второй вызов");

    expect(logSpy).not.toHaveBeenCalledWith("Событие сработало: Второй вызов");
  });

  it("Единственный вызов", async () => {
    const emitter = new EventEmitter();
    const logData = data => console.log(`Событие сработало: ${data}`);

    emitter.once("update", logData);

    emitter.emit("update", "Обновление 1");
    expect(logSpy).toHaveBeenCalledWith("Событие сработало: Обновление 1");

    emitter.emit("update", "Обновление 2");
    expect(logSpy).not.toHaveBeenCalledWith("Событие сработало: Обновление 2");
  });
});
