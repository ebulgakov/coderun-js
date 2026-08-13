function curry(fn) {
  return function callback(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    const _self = this;
    return function (...nextArgs) {
      return callback.apply(_self, [...args, ...nextArgs]);
    };
  };
}

export default curry;
