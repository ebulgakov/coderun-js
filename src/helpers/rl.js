const rl = {
  lines: [],
  push(line) {
    this.lines.push(line);
    if (this._resolve) {
      this._resolve();
      this._resolve = null;
    }
  },
  end() {
    this.push(null);
  },
  [Symbol.asyncIterator]() {
    return {
      next: async () => {
        while (this.lines.length === 0) {
          await new Promise(resolve => this._resolve = resolve);
        }

        if (this.lines[0] === null) {
          return { value: null, done: true };
        }

        return { value: this.lines.shift(), done: false };
      }
    };
  }
};

export default rl;
