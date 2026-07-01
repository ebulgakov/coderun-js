import { describe, it, beforeEach, vi, expect } from "vitest";

import curry from "./curry.js";

describe("Каррирование", () => {
  describe("Базовые функции", () => {
    const join = (a, b, c) => `${a}_${b}_${c}`;

    it("Одна функция", () => {
      const curriedJoin = curry(join);

      expect(curriedJoin(1, 2, 3)).toEqual("1_2_3");
    });

    it("Две функции - с одним параметром и несколькими", () => {
      const curriedJoin = curry(join);

      expect(curriedJoin(1)(2, 3)).toEqual("1_2_3");
    });

    it("Две функции - с несколькими параметром и одним", () => {
      const curriedJoin = curry(join);

      expect(curriedJoin(1, 2)(3)).toEqual("1_2_3");
    });

    it("Три функции", () => {
      const curriedJoin = curry(join);

      expect(curriedJoin(1)(2)(3)).toEqual("1_2_3");
    });
  });

  it("Проверка потери контекста", () => {
    const logger = {
      prefix: "LOG:",
      log: function (a, b, c) {
        return `${this.prefix} ${a}, ${b}, ${c}`;
      }
    };

    logger.curriedLog = curry(logger.log);

    expect(logger.curriedLog(1)(2)(3)).toEqual("LOG: 1, 2, 3");
  });
});
