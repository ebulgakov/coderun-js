import { expect } from "vitest";

class EventEmitter {
  #eventsCollections = {};

  constructor() {}

  #getCollection(eventName) {
    this.#eventsCollections[eventName] = this.#eventsCollections[eventName] || new Map();
    return this.#eventsCollections[eventName];
  }

  #deleteCollection(eventName, callback) {
    this.#getCollection(eventName).delete(callback);

    // Избегаем утечки памяти
    if (this.#getCollection(eventName).size === 0) {
      delete this.#eventsCollections[eventName];
    }
  }

  on(eventName, callback) {
    this.#getCollection(eventName).set(callback, callback);
  }

  off(eventName, callback) {
    this.#deleteCollection(eventName, callback);
  }

  emit(eventName, ...args) {
    this.#getCollection(eventName).forEach(func => {
      func(...args);
    });
  }

  once(eventName, callback) {
    const onceCall = (...args) => {
      callback(...args);
      this.#deleteCollection(eventName, callback);
    };

    this.#getCollection(eventName).set(callback, onceCall);
  }
}

export default EventEmitter;
