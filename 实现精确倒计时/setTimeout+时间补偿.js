function intervalTimer(callback, interval = 1000) {
  let counter = 1;
  let timeoutId;
  const startTime = Date.now();

  function main() {
    const nowTime = Date.now();
    const nextTime = startTime + counter * interval;
    timeoutId = setTimeout(main, interval + (nextTime - nowTime)); // nextTime - nowTime就说偏移项

    // console.log("deviation", nowTime - nextTime);

    counter += 1;
    callback();
  }

  timeoutId = setTimeout(main, interval);

  return () => {
    clearTimeout(timeoutId);
  };
}

let value = 10;

const cancelTimer = intervalTimer(() => {
  if (value > 0) {
    value -= 1;
    console.log(value);
  } else {
    cancelTimer(); // 这里其实是调用了上面那个return
  }
}, 1000);
