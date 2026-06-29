import { describe, it, beforeEach, vi, expect } from "vitest";

import fetchWithRetry from "./fetch_retry.js";

// Мокаем fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

function mockRequest() {
  return new Promise((resolve, reject) => {
    fetchWithRetry("https://api.example.com/data", {
      retry: { retries: 3, delay: 50, multiplier: 2 }
    })
      .then(res => {
        console.log("Успех:", res?.status);
        resolve();
      })
      .catch(err => {
        console.error("Все попытки исчерпаны:", err.message);
        reject();
      });
  });
}

describe("Fetch Retry", () => {
  let logSpy;
  let errorSpy;

  beforeEach(() => {
    // "mockImplementation" need to clear clutter from the test output
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    mockFetch.mockClear();
  });

  it("Вернёт 200-299", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ message: "ALL GOOD!" })
    });

    try {
      await mockRequest();

      expect(logSpy).toHaveBeenCalledWith("Успех:", 200);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    } catch (e) {
      expect(errorSpy).not.toHaveBeenCalled();
    }
  });

  it("Вернёт ошибку 404 без повторов", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ message: "Not Found" })
    });

    try {
      await mockRequest();

      expect(logSpy).toHaveBeenCalledWith("Успех:", 404);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    } catch (e) {
      expect(errorSpy).not.toHaveBeenCalled();
    }
  });

  it("Вернёт ошибку в случае сетевого сбоя", async () => {
    const networkError = new TypeError("Failed to fetch");
    mockFetch.mockRejectedValue(networkError);

    try {
      await mockRequest();
      expect(logSpy).not.toHaveBeenCalled();
    } catch (e) {
      expect(errorSpy).toHaveBeenCalledWith("Все попытки исчерпаны:", networkError.message);
      expect(mockFetch).toHaveBeenCalledTimes(4);
    }
  });

  it("Вернёт ошибку в 500", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ message: "Internal Error" })
    });

    try {
      await mockRequest();
      expect(logSpy).not.toHaveBeenCalled();
    } catch (e) {
      expect(errorSpy).toHaveBeenCalledWith("Все попытки исчерпаны:", "Server returns status 500");
      expect(mockFetch).toHaveBeenCalledTimes(4);
    }
  });
});
