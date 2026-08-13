function debounce(fn, delay, options = { leading: false, trailing: true }) {
  let timeoutId = null;
  let isLeadingInvoked = false;

  return function callback(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (options.leading && !timeoutId) {
      fn.apply(this, args);
      isLeadingInvoked = true;
    } else {
      isLeadingInvoked = false;
    }

    timeoutId = setTimeout(() => {
      if (options.trailing && !isLeadingInvoked) {
        fn.apply(this, args);
      }

      timeoutId = null;
    }, delay);
  };
}

export default debounce;
