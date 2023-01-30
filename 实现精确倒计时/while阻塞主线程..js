/**
 *
 * @param {function} cb:每秒执行一次的函数
 * @param {number} time:倒计时总秒数
 */
function sleepInterval(cb, time) {
  let count = 0,
    startTime = Date.now();
  while (count < time) {
    let nextTime = count + 1000;
    let nowTime = Date.now() - startTime;
    if (nowTime >= nextTime) {
      count = nextTime;
      cb && cb();
    }
  }
}
function foo() {
  console.log("foo");
}

// sleepInterval(foo, 3000);

/**
 *
 * @param {number} time : 倒计时总数
 */
function sleepInterval2(time) {
  let count = 0,
    startTime = Date.now(),
    t = time / 1000;
  console.log(t);
  while (t > 0) {
    let nowTime = Date.now() - startTime;
    let nextTime = count + 1000;
    if (nowTime >= nextTime) {
      count = nextTime;
      //   t--;
      console.log(--t);
    }
  }
}
sleepInterval2(3000);
