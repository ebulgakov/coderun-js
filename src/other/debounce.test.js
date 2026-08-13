import { describe, it, beforeEach, afterEach, vi, expect } from "vitest";
import debounce from "./debounce.js";

describe("Продвинутый Debounce", () => {
  let mockFn;

  beforeEach(() => {
    vi.useFakeTimers();
    mockFn = vi.fn();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("Дефолтное поведение (trailing: true, leading: false)", () => {
    const debounced = debounce(mockFn, 1000);

    debounced(1);
    debounced(2);
    debounced(3);

    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(3);
  });

  it("Только Leading (leading: true, trailing: false)", () => {
    const debounced = debounce(mockFn, 1000, { leading: true, trailing: false });

    debounced(1);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(1);

    debounced(2);
    debounced(3);

    vi.advanceTimersByTime(1000);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("Leading и Trailing вместе", () => {
    const debounced = debounce(mockFn, 1000, { leading: true, trailing: true });

    debounced(1);
    debounced(2);
    debounced(3);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(1);

    vi.advanceTimersByTime(1000);

    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(mockFn).toHaveBeenCalledWith(3);
  });

  it("Сохранение контекста (this)", () => {
    const obj = {
      val: 42,
      method: function () {
        mockFn(this.val);
      }
    };

    obj.debouncedMethod = debounce(obj.method, 1000);
    obj.debouncedMethod();

    vi.advanceTimersByTime(1000);

    expect(mockFn).toHaveBeenCalledWith(42);
  });
});
